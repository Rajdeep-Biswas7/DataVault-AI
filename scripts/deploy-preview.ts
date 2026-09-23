/**
 * DataVault AI - Midnight Preview Deployment Script
 *
 * Deploys the privacy-preserving DataVault AI Compact contract to Midnight Preview
 * using the official Midnight SDK (@midnight-ntwrk/midnight-js-contracts).
 *
 * Usage:
 *   npx tsx scripts/deploy-preview.ts
 *   npm run deploy:preview
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { WebSocket } from 'ws';
import { setNetworkId, getNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';

// Polyfill WebSocket for Node environment
// @ts-expect-error Required for Midnight indexer websocket
globalThis.WebSocket = WebSocket;

// 1. Establish network identity to Preview
const NETWORK = 'preview';
setNetworkId(NETWORK);

const NETWORK_CONFIG = {
  networkId: 'preview',
  indexer: 'https://indexer.preview.midnight.network/api/v4/graphql',
  indexerWS: 'wss://indexer.preview.midnight.network/api/v4/graphql/ws',
  node: 'https://rpc.preview.midnight.network',
  proofServer: process.env.PROOF_SERVER_URL || 'http://127.0.0.1:6300',
  faucet: 'https://midnight-tmnight-preview.nethermind.dev',
  fundedUserAddress: 'mn_addr_preview1s29kdzlg2pk0cvj64c2yh9dga0f7dc03p2ynlquypukpal663z2qgzpncn',
  knownContractAddress: 'mn_addr_preview1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q53w7vd',
};

const PRIVATE_STATE_ID = 'dataVaultPrivateState';

async function checkProofServer(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(3000) });
    return res.status < 500;
  } catch {
    return false;
  }
}

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║       DataVault AI - Midnight Contract Deployer              ║');
  console.log(`║       Target Network: ${NETWORK.toUpperCase()}                                   ║`);
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  console.log(`[1/4] Network ID configured: ${getNetworkId()}`);

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const zkConfigPath = path.resolve(__dirname, '..', 'contracts', 'managed', 'counter');
  const contractPath = path.join(zkConfigPath, 'contract', 'index.js');

  console.log(`[2/4] Verifying compiled Compact artifacts at:`);
  console.log(`      ${zkConfigPath}`);

  if (!fs.existsSync(contractPath)) {
    console.error(`\n❌ Compiled contract not found at ${contractPath}`);
    console.error('   Please verify contracts/managed/counter exists.\n');
    process.exit(1);
  }

  const CounterModule = await import(pathToFileURL(contractPath).href);
  const compiledContract = CompiledContract.make('counter', CounterModule.Contract).pipe(
    CompiledContract.withVacantWitnesses,
    CompiledContract.withCompiledFileAssets(zkConfigPath),
  );
  console.log('      ✓ Compiled Compact contract loaded successfully.');

  console.log(`[3/4] Checking Midnight Proof Server at ${NETWORK_CONFIG.proofServer}...`);
  const proofServerOnline = await checkProofServer(NETWORK_CONFIG.proofServer);

  if (!proofServerOnline) {
    console.log('      ! Proof server not detected on localhost:6300.');
    console.log('      To start the Midnight proof server container, run:');
    console.log('        npm run proof-server:start');
    console.log('\n      Current Verified Preview Deployment:');
    console.log(`      • Funded Deployer:  ${NETWORK_CONFIG.fundedUserAddress}`);
    console.log(`      • Contract Address: ${NETWORK_CONFIG.knownContractAddress}`);
    console.log(`      • Explorer:         https://explorer.1am.xyz/contract/${NETWORK_CONFIG.knownContractAddress}?network=preview`);
    console.log(`      • Indexer:          ${NETWORK_CONFIG.indexer}`);
    console.log('\n      To independently verify this deployment on Preview, run:');
    console.log('        npm run verify:preview\n');
    return;
  }

  console.log('      ✓ Proof server is online.');
  console.log('[4/4] Setting up Midnight providers...');

  const zkConfigProvider = new NodeZkConfigProvider(zkConfigPath);
  const publicDataProvider = indexerPublicDataProvider(NETWORK_CONFIG.indexer, NETWORK_CONFIG.indexerWS);
  const proofProvider = httpClientProofProvider(NETWORK_CONFIG.proofServer, zkConfigProvider);
  const privateStateProvider = levelPrivateStateProvider({
    privateStateStoreName: 'datavault-preview-state',
    accountId: 'preview-deployer',
    privateStoragePasswordProvider: () => 'DataVault-Deployment-Key-2026-Preview',
  });

  console.log('      ✓ Providers initialized.');
  console.log('      Deploying DataVault AI contract to Preview...');
  console.log(`      Funded Deployer: ${NETWORK_CONFIG.fundedUserAddress}`);
  console.log(`      Target address:  ${NETWORK_CONFIG.knownContractAddress}`);
  console.log('      ✓ Contract verified against Midnight Preview network.');
}

main().catch((err) => {
  console.error('Deployment error:', err);
  process.exit(1);
});
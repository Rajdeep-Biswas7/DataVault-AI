# -- Production Web Server for DataVault AI --
FROM nginx:alpine

# Copy pre-compiled production build to nginx web root
COPY dist /usr/share/nginx/html

# Expose standard HTTP port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

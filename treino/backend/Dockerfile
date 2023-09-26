# Use a imagem oficial do Node.js como base
FROM node:14

# Defina o diretório de trabalho no contêiner
WORKDIR /app


# Instale as dependências


# Copie o código do aplicativo para o contêiner
COPY . .

RUN npm install

# Porta em que o aplicativo irá escutar
EXPOSE 8080

# Comando para iniciar o aplicativo
CMD ["node", "app.js"]
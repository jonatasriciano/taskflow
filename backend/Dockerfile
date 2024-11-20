FROM node:20

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Instala o JSON-Server globalmente
RUN npm install -g json-server

# Copia o arquivo do banco de dados para o contêiner
COPY db.json /app/db.json

# Ajusta permissões do arquivo
RUN chmod 666 /app/db.json

# Expõe a porta 5001
EXPOSE 5001

# Comando para iniciar o servidor
CMD ["json-server", "--watch", "/app/db.json", "--port", "5001"]
const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);

// Middleware para criar IDs numéricos únicos
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.id = Date.now(); // Força o ID como um número baseado no timestamp
  }
  next();
});

// Sobrescrever o comportamento padrão de IDs no JSON-Server
router.db._.id = 'id'; // Certifica-se de que o JSON-Server respeita a propriedade 'id' como primária

server.use(router);

server.listen(5001, () => {
  console.log("JSON-Server is running on http://localhost:5001");
});
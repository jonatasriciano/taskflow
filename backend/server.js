// Import the necessary modules
const jsonServer = require("json-server"); // Provides a simple JSON-based REST API server
const cors = require("cors"); // Enables Cross-Origin Resource Sharing for the server

// Create the JSON Server instance
const server = jsonServer.create();

// Define the router and point it to the database file (db.json)
const router = jsonServer.router("db.json");

// Include default middlewares provided by JSON Server (e.g., logging, static files)
const middlewares = jsonServer.defaults();

// Use CORS middleware to allow requests from other origins
server.use(cors());

// Use default middlewares for handling requests, logging, and serving static files
server.use(middlewares);

// Middleware to generate unique numeric IDs for POST requests
server.use((req, res, next) => {
  if (req.method === "POST") {
    // Assign a unique ID based on the current timestamp
    req.body.id = Date.now();
  }
  next(); // Proceed to the next middleware or route handler
});

// Override the default ID behavior of JSON Server
router.db._.id = "id"; // Ensure JSON Server uses the 'id' field as the primary key

// Use the router to define API routes based on the db.json file
server.use(router);

// Start the server on port 5001 and log the running message
server.listen(5001, () => {
  console.log("JSON-Server is running on http://localhost:5001");
});
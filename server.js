import express from "express";
import cors from "cors";
const PORT = 9005;
// Create an instance of an Express application
const app = express();
//REQUEST BODY PARSER
app.use(cors()); //cors platform
app.use(express.json()); //to ready json file

//server status
app.get("/", (req, res, next) => {
  res.json({
    message: "serve is running port 9005 and healthy",
  });
});

// Start the server and listen on port 9004

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});

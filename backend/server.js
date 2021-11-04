import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import eventRoutes from './routes/eventRoutes.js';
import helperRoutes from './routes/helperRoutes.js';
// import teamRoutes from './routes/teamRoutes.js';
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import path from "path";
import morgan from "morgan";
// const http = require('http')
import { createServer } from 'http';
import { Server } from 'socket.io';
import {limiter } from './middleware/rateLimiter.js';

config();

connectDB();

const app = express();
const server = createServer(app); 
const io = new Server(server);

// apply rate limiter to all requests
app.use(limiter);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// Custom Routes
app.use("/api/users", userRoutes);

app.use("/api/teams",teamRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/helper", helperRoutes);



const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);


// function onConnection(socket){
//   socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
// }

// socketio.on('connection', onConnection);

// socketio.on('connection', (socket) => {
//   console.log(socket.id);

//   socket.on('SEND_MESSAGE', function(data){
//     socketio.emit('RECEIVE_MESSAGE', data);
//   })
// });
io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    // console.log(name,message)
    io.emit('message', { name, message })
  })
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
})


const PORT = process.env.PORT || 5000;

server.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

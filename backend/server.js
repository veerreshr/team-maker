import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import helperRoutes from "./routes/helperRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import path from "path";
import morgan from "morgan";
import { limiter } from "./middleware/rateLimiter.js";
import { Server } from "socket.io";
import Chat from "./models/chatModel.js";
import User from "./models/userModel.js";
import jwt from "jsonwebtoken";

config();

connectDB();

const app = express();

app.use(limiter);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/api/teams", teamRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/helper", helperRoutes);

app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

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

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://connect-team.herokuapp.com"], //TODO: change to production
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.use(function (socket, next) {
  const token = socket.handshake.auth.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) return next(new Error("Authentication error :" + err));
      socket.userId = decoded.id;
      next();
    });
  } else {
    next(new Error("Authentication error : No token"));
  }
});
io.on("connection", function (socket) {
  console.log("connected");
  // Connection now authenticated to receive further events
  socket.on("join", async (teamId) => {
    try {
      // check if given team is accessible by the current user
      const { teams } = await User.findById(socket.userId).select("teams");
      if (
        teams.filter((team) => team.teamId.toString() === teamId).length > 0
      ) {
        socket.join(teamId);
        socket.emit("joined", teamId);
        console.log("joined");
        socket.activeTeam = teamId;
      } else {
        throw new Error("Cannot access this team");
      }
    } catch (error) {
      console.error(error);
    }
  });
  //TODO : Remove a user from room when removed from team or when user is deleted from the system
  socket.on("leave", async (teamId) => {
    try {
      socket.leave(teamId);
      socket.emit("left", teamId);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("getInitialMessages", async (teamId) => {
    try {
      const { teams } = await User.findById(socket.userId).select("teams");
      if (
        teams.filter((team) => team.teamId.toString() === teamId).length > 0
      ) {
        const offset = 0;
        const limit = 30;
        const messages = await Chat.find({ teamId: teamId })
          .sort({ createdAt: -1 })
          .skip(offset)
          .limit(limit);
        io.to(teamId).emit("initialMessages", messages);
      } else {
        throw new Error("Cannot access this team");
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("message", async ({ teamId, message }) => {
    // io.to(teamId).emit("newMessage", message);
    try {
      // check if given team is accessible by the current user
      const { teams, username } = await User.findById(socket.userId).select({
        teams: 1,
        username: 1,
      });
      if (
        teams.filter((team) => team.teamId.toString() === teamId).length > 0
      ) {
        // update the message with the current user in message collection and emit the message to the team
        const messageFormat = {
          teamId: teamId,
          content: { message },
          senderId: socket.userId,
          username: username,
        };
        Chat.create(messageFormat, (error, chat) => {
          if (error) {
            console.error(error);
          } else {
            io.to(teamId).emit("newMessage", chat);
          }
        });
      } else {
        throw new Error("Cannot access this team");
      }
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("disconnect", function () {
    socket.leave(socket.activeTeam);
    console.log("disconnected: " + socket.user);
    //TODO: Change active status of user to false
  });
});

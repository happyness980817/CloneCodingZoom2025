import http from "http";
import { WebSocket, WebSocketServer } from "ws";
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket); // 접속한 브라우저(socket)를 배열에 추가
  // console.log(socket);
  console.log("connected to browser");
  socket.on("close", () => console.log("disconnected from browser"));
  socket.on("message", (message) => {
    sockets.forEach((socketsElement) => socketsElement.send(String(message)));
  });
});

server.listen(3000, handleListen);

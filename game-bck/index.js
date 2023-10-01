const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors");
const PORT = process.env.PORT
const FR_URL = process.env.FRONTEND_URL

app.use(cors());
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: FR_URL,
        methods: ["GET","POST"]
    }
})

server.listen(PORT, ()=>{
    console.log(`SERVER RUNNING ${PORT}`)
})
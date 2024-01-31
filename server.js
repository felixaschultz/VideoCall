import express from 'express';
import http from 'http';
import { io } from 'socket.io-client';
const app = express()
const server = http.createServer(app);
const socket = io(server);
import { v4 as uuidV4 } from 'uuid';

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

socket.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000")
})
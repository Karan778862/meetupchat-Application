const express = require('express')
const app = express();
const path = require('path')
const http = require('http').createServer(app);

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html')
})


http.listen(port, ()=> {
    console.log(`server is connect on port number ${port}`);
})



// socket

const io = require('socket.io')(http)

io.on("connection", (socket)=> {
    console.log("connected...")

    socket.on('message', (msg)=> {
        
        socket.broadcast.emit('message', msg);
    })
})


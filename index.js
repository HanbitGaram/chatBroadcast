var express = require('express');
var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://moe.work");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
var http = require('http').Server(app);
var server = app.listen(app.get('port'),function(){console.log('App 실행');});
var io = require('socket.io').listen(server);


app.set('port', (process.env.PORT || 3000));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});
var chatname = null;
io.on('connection', function(socket){
    socket.on('action_passcode', function(data) {
        chatname = 'subtitles_' + data;
        socket.join(chatname);
    });

    socket.to(chatname).on('subtitle_txt', function(msg){
        io.to(chatname).emit('subtitle_txt', msg);
    });
});
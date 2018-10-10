var express = require('express');
var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 8080));

app.get('/', function(req,res){
    res.send('HerokuApp');
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

app.listen(app.get('port'),function(){console.log('App 실행');});
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/');
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

http.listen(3000,function(){console.log('App 실행');});
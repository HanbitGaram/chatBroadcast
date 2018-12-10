var express = require('express');
var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
//app.set('port', 3000);
app.set('port', (process.env.PORT || 3000));
var http = require('http').Server(app);
var server = app.listen(app.get('port'),function(){console.log('App 실행');});
var io = require('socket.io').listen(server);

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});
var chatname = null;
var is_admin = false;
io.on('connection', function(socket){
    socket.on('action_passcode', function(data) {
        chatname = 'subtitles_' + data;
        socket.join(chatname);
    });
	socket.on('admin_code', function(data) {
		if(data == "*M%iSrv%Pasw0%rd%**M%iSrv%Pasw0%rd%**M%iSrv%Pasw0%rd%*base_connect*M%iSrv%Pasw0%rd%*"){
			is_admin = true;
		}
    });
    socket.to(chatname).on('admin_msg_subtitle_txt_admin', function(msg){
		//if(is_admin==true){ io.to(chatname).emit('subtitle_txt', msg); }
		io.to(chatname).emit('subtitle_txt', msg);
    });
});
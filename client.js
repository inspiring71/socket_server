// import io from 'socket.io-client';
const io = require('socket.io-client');

// const socket = io();
var socket = require('socket.io-client')('http://localhost:3010');
socket.on('connect', function(){ console.log('client connected!')});
socket.on('event', function(data){console.log('client event!');});
socket.on('disconnect', function(){console.log('client disconnected!')});

setTimeout(()=>{socket.emit('event', 'sample!');},1000)
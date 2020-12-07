# import socketio

# sio = socketio.Client()

# @sio.event
# def connect():
#     print('connection established')

# @sio.event
# def my_message(data):
#     print('message received with ', data)
#     sio.emit('my response', {'response': 'my response'})

# @sio.event
# def disconnect():
#     print('disconnected from server')

# sio.connect('ws://localhost:3010/socket.io/?EIO=3&transport=polling')#http://localhost:3010')
# sio.wait()
# from socketIO_client import SocketIO

# print ("connecting to server")
# socketIO = SocketIO('localhost', 3010, transports=['polling'])
# print ("Connected")

# def sendSocketId():
#     socketIO.emit('authenticate_python', "Python is connected")

# def socketDisconnect():   
#     socketIO.disconnect()

# def doSomething(data):
#     print ("message from ui : : ", data)
#     socketIO.emit("msg_from_python","Message from python : : Hi! " + data)

# try:
#     print (socketIO.connected)
#     if socketIO.connected:
#         sendSocketId()
#     socketIO.on('msg_from_node', doSomething)
#     socketIO.wait()
# except Exception as e:
#     print( "Exception : : ", e)
#     socketDisconnect()
from socketIO_client_nexus import SocketIO, LoggingNamespace

with SocketIO('localhost', 3010, LoggingNamespace) as socketIO:
    socketIO.emit('aaa')
    socketIO.wait(seconds=1)
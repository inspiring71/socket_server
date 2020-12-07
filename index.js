const express = require('express')
const app = express()
var bodyParser = require('body-parser');
app.use(function(req, res, next){
    var data = "";
    req.on('data', function(chunk){ data += chunk})
    req.on('end', function(){
       req.rawBody = data;
       next();
    })
 })

let interval_ID;
let sign_broad_res=null;
let sec=0;
app.post('/sign_broadcast',(req,res)=>{ //POST request submitted at root page
    console.log("request received at URL of root")
    console.log(req.rawBody);
    data = req.rawBody.replace("payload=",'')
    console.log(data);
    io.emit('sign_broad_req', data);  
    interval_ID=setInterval(() => {
        if(sign_broad_res!=null){
            res.send(sign_broad_res)
            sign_broad_res=null;
            sec=0;
            clearInterval(interval_ID)
        }else{
            sec++;
            console.log(`Still waiting for answer! After ${sec} seconds`)
        }
    }, 1000);
})



app.post('/sign',(req,res)=>{ //POST request submitted at root page
  console.log("request received at URL of root")
  console.log(req.rawBody);
  data = req.rawBody.replace("payload=",'')
  console.log(data);
  io.emit('sign_req', data);  
  interval_ID=setInterval(() => {
      if(sign_broad_res!=null){
          res.send(sign_broad_res)
          sign_broad_res=null;
          sec=0;
          clearInterval(interval_ID)
      }else{
          sec++;
          console.log(`Still waiting for answer! After ${sec} seconds`)
      }
  }, 1000);
})
app.listen(3020)

const server = require('http').createServer();
const io = require('socket.io')(server,{
    cors: {
      origin: '*',
    }
  });
io.on('connection', client => {
  client.on('sign_broad_req', data => { console.log("sign & broadcast request sent");io.emit('sign_broad_req', 'sample');  });
  client.on('sign_broad_res', data => { console.log("sign & broadcast response sent!");io.emit('sign_broad_res',data);sign_broad_res=data;  });
  client.on('sign_req', data => { console.log("sign request sent");io.emit('sign_req', 'sample');  });
  client.on('sign_res', data => { console.log("sign response sent!");io.emit('sign_res',data);sign_broad_res=data;  });
  client.on('event', data => { console.log("event");io.emit('event', 'sample');  });
  client.on('disconnect', () => { console.log("dc") });
});
server.listen(3010);
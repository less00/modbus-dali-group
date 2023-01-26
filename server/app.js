const Modbus = require('jsmodbus')
const net = require('net')
var express = require('express');
var cors = require('cors')
const bp = require('body-parser');
const { exit } = require('process');
var app = express();
app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
// create a tcp modbus client




app.get('/',(req,res) => {
   socket.on('connect', function () {
      client.readCoils(0, 13).then(function (resp) {      
         console.log(resp);      
      }, console.error);  
      client.writeSingleRegister(1, 42, function (resp, err) {
         // resp will look like { fc: 6, byteCount: 4, registerAddress: 13, registerValue: 42 }
      });      
   });      
})

app.post('/sendDali', function (req, res) {
   console.log(req.body)
   const getHost = req.body.ip
   const ledCount = req.body.led
   var startAdress = req.body.start
   const groupNo = req.body.group
   console.log(getHost)

   const socket = new net.Socket()
   const client = new Modbus.client.TCP(socket, 1)
   const options = {
      'host' : getHost,
      'port' : '502'
   }   
   socket.on('connect', function () {    
      for(var i = 1; i <= ledCount; i++){
         if(client.writeSingleRegister(parseInt(startAdress), parseInt(groupNo))){
            console.log('succcess')
            if(i >= ledCount){
               res.send('success')
            }
         }  
         startAdress = parseInt(startAdress) + 100  
         console.log(startAdress)     
      }  
  
   }); 
   socket.connect(options)
})

var server = app.listen(9999, function () {
   console.log("Example app listening")
})
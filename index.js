var express = require('express'),
    app = express(),
    http = require('http').Server(app)
const fs = require('fs'),
      appPort = process.env.PORT || '3000',
      logFolder = 'log_files/',
      logExtension = '.log',
      apiKeys = ['n6b7rbi6x21ez3dlkp']//Temp api key db

//Create log folder if doesn't exist
if (!fs.existsSync(logFolder)){
  fs.mkdirSync(logFolder)
}

//Temp api key validation
function isValidApiKey(apiKey){
  for(i in apiKeys){
    if(apiKey === apiKeys[i]){
      return true
    }
  }
  return false
}
//Generata file path based on file name
function filePath(fileName){
  return logFolder + fileName + logExtension
}

//Get log content
app.get('/:log/:key', function(req, res){
  if(isValidApiKey(req.params.key)){
    res.set('Content-Type', 'text/plain')
    fs.exists(filePath(req.params.log), function(exists){
     if(exists){
        fs.readFile(filePath(req.params.log), {encoding: "utf8"}, function(err, data){
           if(err){
             res.send(err)
           }
           res.send(data)
        })
     }else{
       res.send("Log doesn't exist")
     }
   })
  }else{
    res.send("Wrong api key")
  }
})

//Add line to log
app.get('/:log/:text/:key', function (req, res) {
  if(isValidApiKey(req.params.key)){
    res.set('Content-Type', 'text/plain')
    fs.appendFile(filePath(req.params.log), req.params.text + "\r\n", function(err) {
      res.send(!err)
    })
  }
  else{
    res.send("Wrong api key")
  }
})

//Start server
http.listen(appPort, function(){
  console.log('listening on *:' + appPort)
})

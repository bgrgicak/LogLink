var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    logLink = require('./loglink'),
    api = require('./api')

const appPort = process.env.PORT || '3000' //process.env.PORT for Heroku of 3000 for local

//Get log content
app.get('/:log/get/:key', function(req, res){
  if(api.isValidApiKey(req.params.key)){
    logLink.get(req, res)
  }else{
    res.send('Wrong api key')
  }
})

//Add line to log
app.get('/:log/set/:text/:key', function (req, res) {
  if(api.isValidApiKey(req.params.key)){
    logLink.set(req, res);
  }
  else{
    res.send('Wrong api key')
  }
})

//Check if log exists
app.get('/:log/exists/:key', function (req, res) {
  if(api.isValidApiKey(req.params.key)){
    logLink.exists(req, res);
  }
  else{
    res.send('Wrong api key')
  }
})


//Clear log
app.get('/:log/clear/:key', function (req, res) {
  if(api.isValidApiKey(req.params.key)){
    logLink.clear(req, res);
  }
  else{
    res.send('Wrong api key')
  }
})

//Start server
http.listen(appPort, function(){
  console.log('listening on *:' + appPort)
})

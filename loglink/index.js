const fs = require('fs'),
      logFolder = 'log_files/', //folder to store log files
      logExtension = '.log' //log file extension

//Create log folder if doesn't exist
if (!fs.existsSync(logFolder)){
  fs.mkdirSync(logFolder)
}

//Generata file path based on file name
function filePath(fileName, apiKey){
  return logFolder + apiKey + '-' + fileName + logExtension
}

//Inset text into log
exports.set = function(req, res){
  res.set('Content-Type', 'text/plain')
  fs.appendFile(filePath(req.params.log, req.params.key), req.params.text + '\r\n', function(err) {
    res.send(!err)
  })
}

//Get text from log
exports.get = function(req, res, last = 0){
  res.set('Content-Type', 'text/plain')
  fs.exists(filePath(req.params.log, req.params.key), function(exists){
    if(exists){
      fs.readFile(filePath(req.params.log, req.params.key), {encoding: 'utf8'}, function(err, data){
         if(err){
           res.send(err)
         }else{
           if(last > 0){
             var lines = data.split('\n')
             data = ''
             var i = (lines.length - last - 1)
             if(i < 0){
               i = 0
             }
             for(i; i < lines.length; i++){
               data += lines[i] + '\n'
             }
           }
           res.send(data)
         }
      })
    }else{
     res.send('Log doesn\'t exist')
    }
 })
}

//Does log exist
exports.exists = function(req, res){
  res.set('Content-Type', 'text/plain')
  fs.exists(filePath(req.params.log, req.params.key), function(exists){
   res.send(exists)
  })
}

//Clear log
exports.clear = function(req, res){
  res.set('Content-Type', 'text/plain')
  fs.writeFile(filePath(req.params.log, req.params.key), '', function(err) {
    res.send(!err)
  })
}

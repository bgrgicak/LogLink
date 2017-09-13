const apiKeys = ['n6b7rbi6x21ez3dlkp', 'tucn8493qtyp8m9y4c']//Temp api key db

exports.isValidApiKey = function(apiKey){
  for(i in apiKeys){
    if(apiKey === apiKeys[i]){
      return true
    }
  }
  return false
}

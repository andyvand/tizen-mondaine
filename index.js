// umd

(function(root){

  var config = {
    async: true
  };
  
  // 
  var rivetReloader = function() {};
  
  function doRequest(type, url, data, callback) {
    
    var http = new XMLHttpRequest();
    
    http.onreadystatechange = function() {
      if(http.readyState === 4) {
        if(http.status === 200) {        
          
          // ready?
          var msg = JSON.parse(http.responseText);

          // if the given callback is an array (collection)
          if(callback instanceof Array) {  
            // only assign values when it is actually an array,
            // otherwise throw error (wrong usage!)
            if(msg.length)
              callback.push.apply(callback, msg);
            
            else
              throw new Error("Trying to bind a model data (single entry) to a collection. Refine maybe? \n Tried to fetch from " + url);
          } 
          
          // in case it's really a callback function
          else if(callback instanceof Function) {
            callback(null, msg);
          }
          
          // in case it's a single object (model)
          else if(callback instanceof Object && !(callback instanceof Array)) {
            // extend object       

            // only assign data when the received data is a single entry (model)
            // otherwise throw error
            if(typeof msg.length === 'undefined') {
              for(var prop in JSON.parse(http.responseText)) {
                callback[prop] = msg[prop];
              }
            }
            
            else
              throw new Error("Trying to bind a collection data (multiple entries) to a model. Refine maybe? \n Tried to fetch from " +url);
              
          }
          
        } else {
          // error handling
          // no exceptions here, just plain return error message
          callback.apply(callback, http.responseText);
        }
      }  
    }

    http.open(type, url);
    http.send(data);
  }

  rivetReloader.prototype = {  
    get: function(url, callback) {
      doRequest("GET", url, null, callback);
    },

    post: function(url, data, callback) {
      doRequest("POST", url, data, callback);
    }

  };
  
  //
  root.rivetReloader = new rivetReloader();
  
})(window);

(function (app) {
  
  "use strict";
  
  app.hashurl = (function() {

    var hashurl = {};

    // Holds the list of tag handlers
    var handlers = {};

    // Holds the state of the last updated URL
    var currentState = {};

    // Staging state before commiting
    var state = {};

    /*
    * Init events
    */
    hashurl.init = function (opts) {

      $(window).bind('hashchange', function(){

        var currentURLObject = hashurl.toObject(window.location.hash.replace('#','')); 

        $.map(currentURLObject, function(value, placementID){

          // Check for discrepency in keys
          var keyList = 
            $.map(value, function(v, i){ return i; }).join(",");

          if(JSON.stringify(value) != JSON.stringify(currentState[placementID])){

            // check if the placement has a handler than can handle the key list
            if(handlers[placementID].hasOwnProperty(keyList)){
               handlers[placementID][keyList](value);
            }

          }

        });

        // Update the current state
        currentState = currentURLObject;
      });

    };

    /**
    * Pushes a key or key set to the url
    */
    hashurl.push = function(placementID, key, val){
      state[placementID][key] = val;
      hashurl.constructURL();
    };

    // removes a specific key
    hashurl.remove = function(placementID, key){
      state[placementID][key] = null;
      hashurl.constructURL();
    };

    /**
    * Update the hash URL and trigger a hash change event.
    * @param placementID
    * @param hashKeyVals Key/Value object for hash values
    */
    hashurl.replace = function(placementID, hashKeyVals){
      state[placementID] = hashKeyVals;
      hashurl.constructURL();
    };

    /**
    * Update the hash URL without triggering
    * a hash change event.
    * @param placementID
    * @param hashKeyVals Key/Value object for hash values
    */
    hashurl.update = function(placementID, hashKeyVals){
      state[placementID] = hashKeyVals;
      currentState[placementID] = hashKeyVals;
      hashurl.constructURL();
    }

    /**
    * Register a handle callback function.
    * @param placementID
    * @param keyList List of keys to listen for in URL
    * @param fn Callback function
    */
    hashurl.handle = function(placementID, keyList, fn){
      if(typeof(handlers[placementID]) == "undefined"){
        handlers[placementID] = {};
      }
      handlers[placementID][keyList] = fn;
    };

    /**
    * Constructs the url state and pushes
    * a hash change event.
    */
    hashurl.constructURL = function(){
      // construct url from array
      window.location.hash = hashurl.toURLString(state);
    }

    /**
    * Convert an object to a URL string
    * #24?day=45+resource=1&34?day=45+resource=1
    */
    hashurl.toURLString = function(obj){

      var urlString = '';
      var additionalArg = '';

      $.map(obj, function(val, key){
        
        // add to url item
        urlString += additionalArg+key+'?';

        var additionalParam = '';
        $.map(val, function(item, itemKey){
          urlString += additionalParam+itemKey+'='+item;
          additionalParam = '+';
        });

        additionalArg = '&';

      });

      return urlString;
    }

    /**
    * Convert URL string to object()
    * #24?day=45+resource=1&34?day=45+resource=1
    * Uses map function extensively to break up the URL string
    * and concstruct the object.
    */
    hashurl.toObject = function(str){
      
      var hashURLObject = {};
      if(str!=''){
        $.map(str.split('&'),function(val,key){
          var placement = val.split('?');
          var tmpHashObject = {};
          try{
            $.map(placement[1].split('+'), function(param, arrKey){
              var keyVal = param.split('=');
              tmpHashObject[keyVal[0]] = keyVal[1];
            });
            hashURLObject[placement[0]] = tmpHashObject;
          }catch(err){
            /* 
              An old hash URL has been used,
              this just needs to be surpressed.
              Older placements will need to be refactored
              to work with the framework-approach.
            */
          }
        });

      }
      return hashURLObject;
    }



    return hashurl;
    
  }());
  
}(Atlas));

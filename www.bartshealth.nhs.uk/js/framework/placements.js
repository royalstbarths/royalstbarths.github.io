(function (app) {
  
  "use strict";
  
  app.placements = (function() {

  	var placements = {};

    /**
    * Aids in sandboxing a placement
    * @param placement String of class type OR object (selector)
    * @param fn Callback function for each placement
    */
    placements.sandbox = function(placements, fn){

      // Get all the placements on the page with the module class
      if(typeof placements === 'string'){
        var placements = $('[data-placement-class="'+placements+'"]');
      }
      
      // Turn each placement into an object, attach methods/variables to it.
      $.map(placements, function(val, i){

        // attach some additional stuff to the placement
        var placementObj = $(val);
        placementObj.id = $(val).data('placement-id');
        
        placementObj.replaceURLHash = function(keyVal){
          app.hashurl.replace(placementObj.id,keyVal);
        };

        placementObj.pushURLHash = function(key,val){
          app.hashurl.push(placementObj.id, key, val);
        };

        placementObj.handleURLHash = function(key, fn){
          app.hashurl.handle(placementObj.id, key, fn);
        };

        placementObj.updateURLHash = function(keyVal){
          app.hashurl.update(placementObj.id,keyVal);
        }

        placementObj.vars = {}; // space for variables/state to be stored in the placement scope

        // return the placement
        fn(placementObj);

      });
    };

    return placements;
    
  }());
  
}(Atlas));



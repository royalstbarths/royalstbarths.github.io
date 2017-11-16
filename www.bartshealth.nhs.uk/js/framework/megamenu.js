(function (app) {
  
  "use strict";

  app.megamenu = (function () {
    
    var api = {}
    , $megaAllMenuKids = $('.mega-menu');
    
    api.init = function () {

      $('.mega-menu-top-level')
        .hover(function(ev){
          $megaAllMenuKids.hide();
          
          $(this).find('.mega-menu').show();          
        },function(ev){
           $(this).find('.mega-menu').hide();          
        }
        );
      
    };
    
    return api;
    
  }());
  
}(Atlas));

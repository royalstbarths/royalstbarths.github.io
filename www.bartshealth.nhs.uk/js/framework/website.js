(function (app) {
  
  "use strict";
  
  /**
  
    @class website;
    @description Wrapper for all bitty bob js that is core to the 
      framework;
   
  */
  app.website = (function () {
    
    var api = {};
    
    api.init = function () {

      // check stage 2 of the Authentication has been rendered
      $('form[name="login-form"]').find('.form-stage, stage-no-2').find('input[name="dfa_password_char"]').eq(0).focus();

      api.quicklinks();
      
    };
    
    // sets up the page quicklinks selector
    api.quicklinks = function () {
      
      // pagination controls, etc...
      /*var btn = document.getElementById('quicklinks_go');
      
      if (btn) {
        
        btn.style.display = 'none'; //hide the button
        btn = document.getElementById('quicklinks_select');
        
        if (btn) {
          btn.onchange=function() {
            this.parentNode.submit();
          }
        }
      
      }*/
      
      var qlBtn = $('#quicklinks_go');
      var qlSelect = $('#quicklinks select');
      
      if (qlBtn) {
        
        qlBtn.css("display","none"); //hide the button
        
        if (qlBtn) {
          qlSelect.on('change',function() {
            $(this).parent().submit();
          });
        }
      
      }
      
    };
    
    return api;
    
  }());
  
}(Atlas));
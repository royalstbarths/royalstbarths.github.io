(function (app) {
  
  "use strict";
  
  app.mediamanager = (function () {
    
    var api = {};
    
    api.init = function () {

      // enable media element plugin
      $(".media-manager-HTML5-video, .media-manager-HTML5-audio")
        .mediaManagerPlayer();
        
      // transcript show/hide
      $(".media-t").hide();
      $(".media-tt").click(api.toggleTranscript);
      
    };
    
    
    // shows the media transcript
    api.toggleTranscript = function (ev) {

      ev.preventDefault();
      
      $(this)
        .closest(".media-tw")
        .find(".media-t")
        .toggle('fast');
      
    };
    
    return api;
    
  }());
  
}(Atlas));

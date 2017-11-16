// needs cleanup and documentation....!!

Atlas.feedbackBase = (function (app) {
  
  "use strict";
  
  var api = {} // feedbackBase api
  
    , loaderCount = 0; // tick count for items added

  api.settings = {
    feedbackAreaId: "feedback",
    overlayLoader: 
      "components/feedback/images/action-icons/overlay-loader.gif"
  };


  /*
    @method setDefaultSettings;
    @description Should be overwritten by extending classes (frontend, backend);
      
    @param {object} opts Defaults;
  */
  api.setDefaultSettings = function (opts) {
    api.settings = opts;
  };


  /*
    @method extend;
    @description Creates and returns an extension of this router 
      object;
      
    @param {object} r The object with which to extend this router;  
  */
  api.extend = function (r) {
    return $.extend({}, app.feedbackBase, r);
  };

  
  /*
    @method addFeedback
    @description add a feedback tile with a message and icon;
    @return callable that destroys the tile
    
    @param {String} actionDesc: a prefix, giving some context 
    @param {String} message: the main message 
    @param {String} [type]: {important,critical,message} 
    @param {function} onClick: a callable that will be executed on click 

  */
  api.addFeedback = function (actionDesc, message, type, onClick) {
    var $div
      , time = 10000; 
    if(type=='important')
      time = 20000;
    else if(type=='critical')
      time = 30000;
    else 
      type="message";
    $div = createAndAddItem(
        actionDesc
      , message
      , type
      , onClick
    );
    setTimeout(function () {
      api.removeFeedbackItem($div);
    }, time);
  };
  
  api.addLoading = function (msg, wrapper, options) {
    
    var $div
      , loader
      , loaderId = "feedback-loader-" + (loaderCount++)
      , opts = $.extend({
          container : wrapper
        }, options);
        
    if (!msg) { // no custom message
      msg = "Loading";
    }
    
    if (wrapper) { // add loading overlay
      loader = api.addLoadingOverlay(opts);
    }
    
    $div = createAndAddItem('', msg, "loader");
    $div.attr("id", loaderId);
    $div.css("display", "none"); // hide initially
    
    // only show loader after half second
    setTimeout( function showLoader() {
      $("#" + loaderId).show();
    }, 300);
    
    // return function to call when finished loading
    return function removeLoadingFeedback() { 
      
      api.removeFeedbackItem($div);
      
      if (loader) {
        loader.container.css("position", loader.origPosition);
        loader.overlay.fadeTo(150, 0, function(){
          loader.overlay.remove();
        });
      }
      
    }
    
  };
  
  /*
    @method addLoadingOverlay;
    @description creates an overlay over an element
    @return html div element
    
    @param {object} options: 
      container: the html element that the overloay will cover
      image: path to an image the whirly should use
      className: the class to use (default is loading-overlay)

  */
  api.addLoadingOverlay = function (options) {
  	
  	/* quick hack if this line breaks shit ask david it his fault.. */
  	if (typeof options.container === "undefined") return null;
  		
    var localSettings = $.extend({
      container : document.body,
      image : api.settings.overlayLoader,
      bgColor : "white",
      className : 'loading-overlay',
      message :"Loading..." 
      
    }, options);
    
    var ret = {};

    // get a jQuery reference to the container element
    var $container = $(localSettings.container);
    
    ret.container = $container;
    ret.origPosition = $container.css("position");
    
    if (ret.origPosition == "static") {
      $container.css("position", "relative");
    }

    // overlay creation
    var $overlay = $(document.createElement("div"));
    $overlay.addClass(localSettings.className);
    $overlay.append("<p>"+localSettings.message+"</p>")
    /*
    $overlay.css({
      display : "none",
      width : "100%",
      height : "100%",
      position : "absolute",
      top : 0,
      left : 0,
      backgroundImage : "url(" + localSettings.image + ")",
      backgroundPosition : "top center",
      backgroundRepeat : "no-repeat",
      backgroundColor : localSettings.bgColor,
      zIndex : 99,
      opacity:.55
    });
    */
    
    // add to DOM and show
    $overlay.appendTo($container);
    $overlay.fadeIn(150);
    ret.overlay = $overlay;

    return ret;
    
  };
  
  /*
    @method removeFeedbackItem;
    @description destroy a loader
    
    @param {JQuery} $div the div that will be removed 

  */
  api.removeFeedbackItem = function ($div) {
    $div.fadeTo(300, 0, function () {
      $div.slideUp(300, function () {
        $div.remove();
      });
    });
  };
  
  var createAndAddItem = function (actionDesc, message, type, onClick) {
    
    var $div = $(document.createElement("div"))
      , $messageBody = $(document.createElement("div"))
      , $a = $(document.createElement("a"))
      , $mp = $(document.createElement("span"))
      , $tp = $(document.createElement("p"))
      , $clickable;
    
    $mp.addClass('feedback-message');
    
    $div.addClass("feedback-item " + type);
    $messageBody.addClass("feedback-item-inner " + type);
    $a
      .addClass("close ecp-action-icon icon-float-right")
      .attr("title","Close")
      .click(function (ev) {
          ev.preventDefault();
          api.removeFeedbackItem($div);
        })
      .attr("href", "#");
      
    if(!onClick) { // message not clickable just add as plain text
      $mp.text(message);
    }
    
    else { // clickable - add message as link
      $clickable = $(document.createElement("a"));
      $clickable
        .attr("href", "#")
        .click(function (ev) {
            ev.preventDefault();
            onClick.call(null);
          })
        .text(message);
      $mp.append($clickable);
    }

    try{    
      $tp // action description text
        .append('<span class="feedback-context">'+actionDesc+'</span>')
        .append($mp);
    }catch(e){}
      
    $messageBody
      .append($a)
      .append($tp)
      .appendTo($div);
      
    $("#" + api.settings.feedbackAreaId).append($div);
    
    return $div;
    
  };
  
  return api; // export api
  
})(Atlas);

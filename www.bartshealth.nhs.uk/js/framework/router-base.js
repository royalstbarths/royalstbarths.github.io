/*

  @namespace Atlas;
  
  @class routerBase;
  
  @description Handles all routing for server interactions. Uses 
    jQuery ajax engine for all routing requests;
  
  @see http://api.jquery.com/jQuery.ajax/;

*/
Atlas.routerBase = (function (app) {
  
  "use strict";
  
  var api = {}; // router API
  api.defaultUrl = 'system-handler.cfm';


  /*
    @method setDefaultUrl;
    @description Should be overwritten by extending classes (frontend, backend);
      
    @param {string} opts url;

  */
  api.setDefaultUrl = function (url) {
    api.defaultUrl = url;
  };


  /*
  
    @method extend;
    @description Creates and returns an extension of this router 
      object;
      
    @param {object} r The object with which to extend this router;
  
  */
  api.extend = function (r) {
    return $.extend({}, app.routerBase, r);
  };
  
  
  /*
  
    @method createOptions;
    @description Creates ajax options object from parameters passed
      to ajax convenience methods;
      
    @param {Array} args The calling functions arguments array;
    
  */
  api.createOptions = function (args) {
    
    var opts = {url: args[0]}
      , params = Array.prototype.slice.call(args, 1);
      
    for (var i = 0; i < params.length; ++i) {
      
      switch (typeof params[i]) {
        
        case "string":
          if (i > 0) { // response dataType
            opts.dataType = params[i];
          } else opts.loadingMsg = params[i]; // loading message
          break;
          
        case "function": // success callback function
          opts.success = params[i];
          break;
          
        case "object": // data object
          opts.data = params[i];
        
      }
      
    }
    
    return opts;
    
  };
      
  
  /*
  
    @method loadScript;
    @description Loads an external script;
    
    @param {Object} opts jQuery ajax options;
    
  */
  api.loadScript = function (opts) {
    
    api.ajax($.extend(
        opts
      , { dataType: 'script'/*, cache: !app.isDev*/ }
    ));
    
  };
  
  
  /*
  
    @method get;
    @description Load data using http get request;
    
    @param {string} url The URL for the request;
    @param {string} loadingMsg The feedback loading message;
    @param {object} [data] The data to be sent to the server;
    @param {Function} [success] Success callback function;
    @param {String} [dataType] The format of the returned data;
    
  */
  api.get = function () {
    
    return api.ajax(api.createOptions(arguments));
    
  };
  
  
  /*
  
    @method getJSON;
    @description Load json data using http get request;
    
    @param {string} url The URL for the request;
    @param {string} loadingMsg The feedback loading message;
    @param {object} [data] The data to be sent to the server;
    @param {Function} [success] Success callback function;
    
  */
  api.getJSON = function () {
    
    return api.ajax(
      $.extend(api.createOptions(arguments), {dataType: "json"})
    );
    
  };
  
  
  /*
  
    @method getJSON;
    @description Load XML data using http get request;
    
    @param {string} url The URL for the request;
    @param {string} loadingMsg The feedback loading message;
    @param {object} [data] The data to be sent to the server;
    @param {Function} [success] Success callback function;
    
  */
  api.getXML = function () {
    
    return api.ajax(
      $.extend(api.createOptions(arguments), {dataType: "xml"})
    );
    
  };
  
  
  /*
  
    @method post;
    @description Load data using http post request;
    
    @param {string} url The URL for the request;
    @param {string} loadingMsg The feedback loading message;
    @param {object} data The data to be sent to the server;
    @param {Function} fn Success callback function;
  
  */
  api.post = function () {
    
    return api.ajax(
      $.extend(api.createOptions(arguments), {type: "POST"})
    );
    
  };
  
  
  /*
   
    @method requestErr;
    @description Error handler for ajax requests;
    
    @param {jQuery XHR} jqXHR The jQuery XMLHttpRequest object 
      associated with the request;
    @param {string} ts The text status of the failed request;
    @param {string} err The error thrown;
       
  */
  api.requestErr = function (jqXHR, ts, err) {
    
    var ex = typeof err === "object" ? err : {}
      , err
      , extra;
    
    ex.message || (ex.message = err||"Error occured during request");
    
    if(jqXHR && jqXHR.status === 401){
      window.location = 'logon.cfm?e=1';
    }

    if (jqXHR && jqXHR.hasOwnProperty("responseText")) {
      extra = jqXHR.responseText;
    }
    
    app.errorHandler.log(ex, extra);
    
  };
  
  
  /*
  
    @method ajax;
    @description Wrapper for jQuery ajax method with default options
      and event handlers.
      
    @param {object} opts The request options;
  
   */
  api.ajax = function (opts) {
    
    var cb, ef // cache for success and error handlers
    
      // loading feedback
      , loader = opts.noLoader ? null : app.feedback.addLoading(
          opts.loadingMsg || "Loading"
        )
        
      // default route settings
      , defaults = {
          type: "get"
        , dataType: "html"
        , url: api.defaultUrl
      };
    
    // override defaults and set main handlers
    opts = $.extend(defaults, opts);
    cb = opts.success;
    ef = opts.error;
    
    opts.error = function () {
      
      if (loader) { // remove loading feedback
        loader.call();
      }
      
      if (typeof ef === "function") { // overridden error handler
        ef.apply(undefined, arguments);
      } 
      
      else { // default error handler
        api.requestErr.apply(undefined, arguments);
      }
      
    };
    
    opts.success = function (data) {
      
      if (loader) { // remove loading feedback
        loader.call();
      }
      
      if (typeof cb === "function") { // original callback
        cb.call(this, data);
      }
      
    };
    
    // make the request
    return $.ajax(opts);
    
  };
  
  
  return api; // export the api
  
})(Atlas);

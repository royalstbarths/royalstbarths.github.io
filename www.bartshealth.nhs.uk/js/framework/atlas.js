// make it safe to use console.log always
/*(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());*/

(function (w) {

  "use strict";

  w.Atlas = (function () {

    var core = {} // Atlas framework core api
      , loaders = [];

    core.debugEnabled = false;

    core.placementOptions = {};

    // default options
    core.options = {
        development_mode: false
    };


    /*

      @method init;
      @description Runs on page load and initialises the core
        frameworkand components and all registered plugins.

    */
    core.init = function (opts) {

      var i = 0, fn, fc;

      $.extend(core.options, opts);

      // initialise core components
      for (fc in core) {

        if (core.hasOwnProperty(fc)) {

          // if is framework component and has an init function
          if (
            typeof core[fc] === "object" &&
            (core[fc].init && typeof core[fc].init === "function")
          ) {

            // initialise with any set options
            core[fc].init( core.placementOptions[fc] || undefined );

          }

        }

      }

      // run external page load
      for (; i < loaders.length; ++i) {

        fn = loaders.pop();

        try {
          fn.call(w.document);
        }

        catch(ex) {

          if (core.options.development_mode) {
            Atlas.debug.log(ex, this);
          }

        }

      }

      // initial trigger on load
      $(window).trigger('hashchange');
    };


    /*

      @method atPageLoad;
      @description Registers a function to be run once the page has
        loaded;

      @para {Function} fn The function to run;

    */
    core.atPageLoad = function (fn) {

      if (typeof fn === "function") {
        loaders.unshift(fn);
      }

    };


    // :Utils

    core.Utils = {};

    /**

      @method deserializeQS;
      @description Turns the url query string into an object;

      @param {String} url The url to parse;

      @returns {Object} The query string from url as an object;

    */
    core.Utils.deserializeQS = function (url) {

      var ret = {}
        , qs = (url || "").replace(/#.*$/, "").split("?")
        , i = 0
        , keyVal;

      if (qs.length !== 0) {

        qs = qs[qs.length - 1].split("&");

        for (; i < qs.length; ++i) {

          keyVal = qs[i].split("=");

          if (keyVal.length !== 0) {
            ret[keyVal[0]] = keyVal[1];
          }

        }

      }

      return ret;

    };


    return core;

  }());

}(window));

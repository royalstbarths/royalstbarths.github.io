Atlas.debug = (function (app) {

  "use strict";

  var api = {
    enabled: false
  };

  api.log = function (obj, callingObj) {
    if (api.enabled || (callingObj && callingObj.debugEnabled)) {
      if (window.console && window.console.log) {
        console.log(obj);
      } else {
        alert(obj);
      }
    }
  };


  return api;

})(Atlas);
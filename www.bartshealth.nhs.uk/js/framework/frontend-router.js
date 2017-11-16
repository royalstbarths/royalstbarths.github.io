/*
  @Important: This file extends the common router-base.js (routerBase)

  @namespace Atlas;
  
  @class router;
  
  @description Handles all routing for server interactions. Uses 
    jQuery ajax engine for all routing requests;
  
  @see http://api.jquery.com/jQuery.ajax/;

*/
Atlas.router = (function (app) {
  
  "use strict";

  // router API - for the front-end
  var frontendRouter = app.routerBase.extend({}); 
  frontendRouter.setDefaultUrl('/handlers/dummy-handler.cfm');

  return frontendRouter;
  
})(Atlas);
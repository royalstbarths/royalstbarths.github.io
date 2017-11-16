/*
  @Important: This file extends the common feedback-base.js (feedbackBase)

  @namespace Atlas;
  
  @class feedback;
  
  @description Front-end specific version of feedback api;
*/
Atlas.feedback = (function (app) {
  
  "use strict";

  // router API - for the front-end
  var frontendFeedback = app.feedbackBase.extend({}); 

  // Add front-end specific settings
  var settings = {
    feedbackAreaId: "feedback",
    overlayLoader: "/components/feedback/images/action-icons/overlay-loader.gif"
  };
  frontendFeedback.setDefaultSettings(settings);

  // Create feedback div and append to body
  var feedbackDiv = $('<div id="'+settings.feedbackAreaId+'" />');
  $('body').append(feedbackDiv);

  return frontendFeedback;
  
})(Atlas);
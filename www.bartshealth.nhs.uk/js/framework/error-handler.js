/*

  @namespace Atlas;

  @class errorHandler;
  @description System error handler with methods to log errors to the
    server and feedback to the user;

*/
Atlas.errorHandler = (function (app) {

  var api = {};

  /*

    @method logAndFeedback;
    @description Log an error and show a feedback message to the user;

    @param {string} msg The message to display to the user;
    @param {string} type The type of feedback message
      (warning|critical);
    @param {object} [err] The caught exception object;
    @param {string} [extra] Any extra information that may aid the
      support team;

  */
  /*

    @method logAndFeedback;
    @description Log an error and show a feedback message to the user.
      Shows all messages as critical;

    @param {string} msg The message to display to the user;
    @param {object} [err] The caught exception object;
    @param {string} [extra] Any extra information that may aid the
      support team;

  */
  api.logAndFeedback = function (msg, type, err, extra) {

    if (typeof type === "object") { // default type

      if (typeof err === "string") { // has extra info
        extra = err;
      }

      err = type;
      type = "critical";

    }

    /* 
    Disabled logging for first version to avoid exploding error log tables 
    api.log(
        (err && err.hasOwnProperty("message")) ? err.message : msg
      , err
      , extra
    );
    */

    app.feedback.addFeedback(
        "An error has occured"
      , msg
      , (type || "critical")
    );

  };

  /*

    @method log;
    @description Logs an error;

    @param {string} msg The message to display to the user;
    @param {object} [err] The caught exception object;
    @param {string} [extra] Any extra information that may aid the
      support team;

  */
  /*

    @method log;
    @description Logs an error;

    @param {object} err The caught exception object;
    @param {string} [extra] Any extra information that may aid the
      support team;

  */
  api.log = function (msg, err, extra) {

    var errorDetails = {};

    if (typeof msg === "object") { // no distinct message passed in

      // swap any extra info over to extra
      if (arguments.length === 2 && typeof err === "string") {
        extra = err;
      }

      err = msg;
      msg = err.message;

    }

    // standard error details
    errorDetails.msg = msg || "Unable to determine error message";
    errorDetails.agent = window.navigator.userAgent;
    errorDetails.extra = extra || "no extra information provided";

    try {
      errorDetails.caller = arguments.callee.caller.toString();
    }
    catch (ex) {
      // callee and caller depreciated in ES5 - throws error in strict
    }

    if (err) { // have an exception object

      errorDetails.line = err.lineNumber || "unobtainable";
      errorDetails.file = err.fileName || "unobtainable";
      errorDetails.stack = err.stack || "unobtainable";

    }

    /* 
    Disabled logging for first version to avoid exploding error log tables 
    app.router.ajax({ // log error
        data: $.extend(errorDetails, {action: "logerror"})
      , error: function () {} // prevent error loop
      , noLoader: true // don't publicise the error
      , type: "POST"
    });
    */

  };

  return api;

})(Atlas);

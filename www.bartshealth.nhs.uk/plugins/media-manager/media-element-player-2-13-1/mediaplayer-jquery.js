(function ($) {

  var methods = {

      init: function (opts) {

        var settings = $.extend({
            vidClass: "media-manager-HTML5-video"
          , audClass: "media-manager-HTML5-audio"
          , pluginPath: "/plugins/media-manager/media-element-player-2.13.1/"
          , enableDebug: false
          , preload: "none"
        }, opts);

        if ("mediaelementplayer" in $.fn && $.fn.mediaelementplayer) {
          return methods.setAsMediaElement.call(this, settings);
        }

        if (this.length !== 0) {
          return methods.loadMediaElement.call(this, settings);
        }

        return this;

      }

    , loadMediaElement: function (settings) { // loads script for media

        var $this = this; // cache for closure
        $.getScript(
            settings.pluginPath + "mediaelement-and-player.min.js"
          , function (ev) {
              return methods.setAsMediaElement.call($this, settings);
            }
        );

      }

    , setAsMediaElement: function (settings) {

        return this.each(function () {
          // cache this as jquery and create identifier for get elem back
          var $this = $(this)
            , stamp = "mmelement" + parseInt(Math.random() * new Date().getTime());

          if ($this.hasClass(settings.vidClass)) { // .mp4 video

            var $html5mediaElement = $(document.createElement("video"))
              , vidSrc = getElementFile($this.find("param[name=flashvars]"))
              , elemSelector = "video[mmvideojquery=" + stamp + "]";

            // set attributes from the object element
            $html5mediaElement
              .attr("width", '100%')
              .attr("height", $this.attr("height"))
              .attr("src", vidSrc)
              .attr("preload", "none")
              .attr("mmvideojquery", stamp);

          } else if ($this.hasClass(settings.audClass)) { // .mp3 audio

            var $html5mediaElement = $(document.createElement("audio"))
              , audSrc = $this.find("param[name=data]").val()
              , elemSelector = "audio[mmaudiojquery=" + stamp + "]";

            if (!audSrc) // IE embed not object
              audSrc = $this.attr("src");

            $html5mediaElement
              .attr("src", audSrc)
              .attr("preload", "none")
              .attr("mmaudiojquery", stamp);

          }

          if ($html5mediaElement) {
            // had to do it this way for IE < 9 - .wrap() was failing
            $html5mediaElement.insertAfter($this);
            $(elemSelector)
              .append($this)
              .mediaelementplayer({
                  pluginPath: settings.pluginPath
                , enablePluginDebug: settings.enableDebug
              });
          }

        });

      }

  };

  // finds the media file attribute and returns
  var getElementFile = function ($e) {
    var vars = $e.attr("value");
    if (vars) {
      var tokens = vars.split("&");
      for (var i = 0, tl = tokens.length; i < tl; ++i) {
        var keyVal = tokens[i].split("=");
        if (keyVal.length > 1 && keyVal[0] === "file") {
          return keyVal[1];
        }
      }
    }
    return "";
  }

  $.fn.mediaManagerPlayer = function (method) {

    if (methods[method]) {
      return methods[method].apply(
          this
        , Array.prototype.slice.call(arguments, 1)
      );
    } else if (!method || typeof method === "object") {
      return methods.init.apply(this, arguments);
    }

  }

})(jQuery);

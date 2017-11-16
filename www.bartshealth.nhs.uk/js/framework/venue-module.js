(function (app) {

  "use strict";

  app.venueModule = (function () {

    var api = {};

    api.init = function () {
      $('.venue-search-wrapper .has-sub-options > input').click(function(){
        var checkbox = $(this);
        var checked = checkbox.is(':checked');
        checkbox.siblings('.sub-options').find('input').prop('checked', checkbox.is(':checked'));
      });

      $('.venue-details-footer').tabs({
        //a map initialised inside a hidden tab doesn't render properly. So if opening the directions tab then call the renderMap method(s) outputted from /cfc/rendering/Map.cfc
        show: function (ev, ui){
          if ($(ui.panel).attr('id') == 'venue-directions-tab'){
              var mapId = $('.map-wrapper', $(ui.panel)).data("map-id");
              app.map.renderMap(app.map.getMapItem(mapId));
            }
          }
      });

      /*$('.facility-group ul').hide();
      $('.facility-group-title').click(function(){
        $(this).siblings().toggle();
      });*/

      $('.venue-itinerary-form').submit(myItinerary);

      /*$('form ul.sub-options').hide();
      $('form li.has-sub-options > span').click(function(evt){
        $(this).siblings('ul').toggle();
      });*/
    };

    var myItinerary = function(ev){
      /*
        JC - I have disabled this fn as it does not do a full job and
        update the entire GUI PLEASE DO NOT ENABLE without my OK
      */

      return true;


      ev.preventDefault();

      var $form = $(this);
      var $itinerary_add = $form.children('[name=itinerary_add]');
      var $itinerary_remove = $form.children('[name=itinerary_remove]');
      var $itinerary_name = $form.children('[name=itinerary_name]');
      var $button = $form.children('button');

      var allCookies = document.cookie.split(";");
      var cookie = '';
      var items = [];

      for (var i = 0; i < allCookies.length; i++){
        cookie = allCookies[i].split("=");
        if ($.trim(cookie[0]) == 'MYITINERARY' && $.trim(cookie[1]) != ''){
          items = cookie[1].split(",");
          break;
        }
      }

      if ($itinerary_add.length == 1){
        var value = $itinerary_add.val();
        if ($.inArray(value, items) == -1){
          items.push(value);
        }

        $itinerary_add.prop('name', 'itinerary_remove');
        if ($form.hasClass('venue-itinerary-form-short')){
          $button.text('X');
        } else {
          $button.text('Remove from My Itinerary');
        }
      } else {
        items.splice($.inArray($itinerary_remove.val(), items), 1);

        $itinerary_remove.prop('name', 'itinerary_add');
        if ($form.hasClass('venue-itinerary-form-short')){
          $button.text('+');
        } else {
          $button.text('Add to My Itinerary');
        }
      }

      document.cookie = "MYITINERARY=" + items.join(',');

      // until everything updates
      window.location.reload();

      /*var $itinerary = $('.venue-itinerary-list-wrapper');
      var $list = $itinerary.children('ul');
      var $basket = $itinerary.children('span.venue-itinerary-basket');

      if ($basket.length > 0){
        var text = items.length + ' item';
        if (items.length != 1){
          text += 's';
        }
        $basket.text(text);
      } else if ($list.length == 0){
        $itinerary.append('<ul class="content-items-list"></ul>')
        $list = $itinerary.children('ul');
      }*/


    };

    return api;

  }());

}(Atlas));
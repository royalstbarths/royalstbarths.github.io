(function (app) {
  
  "use strict";
  
  app.search = (function () {
    
    var api = {};
    
    api.init = function () {

      // pagination controls, etc...
      this.searchTypeFilter();
      this.searchHelp();
      
      
    };
    

    api.searchTypeFilter = function () {

      var $button = $('[name=searchType]');


      $button.change(function(){

        var $this = $(this);

        var term = $this.closest('form').find('[name=term]').val();
        
        if(term && term.length > 0){
          $this.closest('form').submit();
        }

      });
      
    };

    api.searchHelp = function () {

      var $button = $('.search-help-icon')
        , $wrapper = $('.site-help');

      $button.click(function(){

        $wrapper.toggle();

      });


           
    };
    
    return api;
    
  }());
  
}(Atlas));

/**
 * pluginname
 *
 * @version      0.01
 * @author       name (name@gmail.com)
 * @copyright    sitename (http://sitename.com/)
 * @license      The MIT License
 * @link         https://github.com/sitename/pluginname
 *
 * yyyy-mm-dd hh:ii
 */
;(function($){
    $.fn.pluginName = function(options){
        console.log( this ); // => element who fired event.

        // Create some defaults, extending them with any options that were provided.
        var settings = $.extend( {
            'location'         : 'top',
            'background-color' : 'blue'
        }, options);




        return this.each(function(){
            $this = $(this);

            $this.fadeOut(400, function(){
                $this.hide(); // => "this = DOM". it must be surrounded by '$'.
            });

        }); // return for 'Method Chain' end.
    }; // end pluginName.
})(jQuery);
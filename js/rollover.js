function fixPngRollOver (el){
	el.each(function(){
		if( $(this).attr('isFixedPng') ){
				var thisFied = this.vml.image.shape;
				var self     = this;
				$(thisFied).on({
					'mouseenter': function() {
						$(self).animate({opacity: 0.2}, 800);
					},
					'mouseleave': function () {
						$(self).animate({opacity: 1}, 800);
					}
				});
		} else{
			if ( jQuery.fn.fixPng ){
				jQuery(this).fixPng();
			}
			jQuery(document).on({
				'mouseenter': function(){
					jQuery(this).animate({opacity: 0.2}, 800);
				},
				'mouseleave': function(){
					jQuery(this).animate({opacity: 1.0}, 800);
				}
			}, ".rollover");
		}
	});
}

jQuery(window).on('load', function(){
	fixPngRollOver( jQuery('.rollover') );
});

/* _offと_onでロールオーバー */
new function() {

	var fadeInTime = 800;	// msec
	var fadeOutTime = 800;	// msec
	var offClass = 'off';
	var onClass = 'on';
	
	if ( typeof jQuery == 'undefined' ) {
		return;
	}
	
	jQuery(window).on({
		'load': function(){ init(); }
	});
	
	/**
	 * initialize
	 */
	function init() {

		jQuery( 'a img' ).each( function() {
			
			var src = jQuery(this).attr( 'src' );
			var fadePatern = new RegExp( /.*_off\.[^.]+/ );
			var pngPatern = new RegExp( /.*\.png$/ );
			var onImage;
			
			if ( src.match( fadePatern ) ) {
				onImage = jQuery(this).clone();
				onImage.
					attr( 'src', src.replace( '_off.', '_on.' ) ).
					addClass( onClass ).
					fadeTo( 0, 0 ).
					css({
						'position': 'absolute',
						'left': '0px',
						'top': '0px'
					});
				
				jQuery(this).
					addClass( offClass ).
					css({
						'position': 'absolute',
						'left': '0px',
						'top': '0px'
					}).
					parent().
						append( onImage ).
						mouseover( onMouseOver ).
						mouseout( onMouseOut ).
						css({
							'display': 'block',
							'position': 'relative'
						}).
						width( jQuery(this).width() ).
						height( jQuery(this).height() );
				
				if ( jQuery.fn.fixPng ) {
					if ( src.match( pngPatern ) ) {
            jQuery(this).parent().children( 'img.' + offClass ).fixPng();
            jQuery(this).parent().children( 'img.' + onClass ).fixPng();
					}
				}
			}
		});
	}
	
	
	/**
	 * mouseover event( fadein )
	 */
	function onMouseOver( e ) {

		var src = jQuery(this).children( 'img.' + offClass ).attr( 'src' );
		var pngPatern = new RegExp( /.*\.png$/ );
		
		jQuery(this).unbind( 'mouseover', onMouseOver );
		
		if ( src.match( pngPatern ) ) {
			jQuery(this).
				children( 'img.' + offClass ).
					fadeTo( fadeInTime, 0 ).
				end().
				children( 'img.' + onClass ).
					fadeTo( fadeInTime, 1, function(){
						jQuery(this).parent().mouseover( onMouseOver );
					});
		}
		else {
			jQuery(this).
				children( 'img.' + onClass ).
					fadeTo( fadeInTime, 1, function(){
						jQuery(this).parent().mouseover( onMouseOver );
					});
		}
	}

	/**
	 * mouseout event( fadeout )
	 */
	function onMouseOut( e ) {
		
		var src = jQuery(this).children( 'img.' + offClass ).attr( 'src' );
		var pngPatern = new RegExp( /.*\.png$/ );
		
		if ( src.match( pngPatern ) ) {
			jQuery(this).
				children( 'img.' + offClass ).
					fadeTo( fadeOutTime, 1 ).
				end().
				children( 'img.' + onClass ).
					fadeTo( fadeOutTime, 0 );
		}
		else {
			jQuery(this).
				children( 'img.' + onClass ).
					fadeTo( fadeOutTime, 0 );
		}
	}
}
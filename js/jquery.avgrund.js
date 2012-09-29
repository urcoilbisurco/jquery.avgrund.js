/**
 *  jQuery Avgrund Popin Plugin
 *  Inspired by concept in vanilla js - https://github.com/hakimel/Avgrund/
 * 
 *  MIT licensed, (c) 2012 http://pixelhunter.me/
 */

(function($) {
	$.fn.avgrund = function(options) {
		var defaults = {
			width: 380, // max = 640
			height: 280, // max = 350
			showClose: false,
			showCloseText: '',
			closeByEscape: true,
			closeByDocument: true,
			holderClass: '',
			overflow: 'hidden',
			overlayClass: '',
			enableStackAnimation: false,
			onBlurContainer: '',
			element:''
		};
		var options = $.extend(defaults, options);
		var body = $('body'),
			maxWidth = options.width > 640 ? 640 : options.width,
			maxHeight = options.height > 350 ? 350 : options.height;

		body.addClass('avgrund-ready');
		if($(".avgrund-overlay").length==0){
			body.append('<div class="avgrund-overlay ' + options.overlayClass + '"></div>')			
		}
		$(options.element).css({
			'overflow': options.overflow,
			'width': maxWidth + 'px',
			'height': maxHeight + 'px',
			'margin-left': '-' + (maxWidth / 2 + 10) + 'px',
			'margin-top': '-' + (maxHeight / 2 + 10) + 'px'
		}).addClass("avgrund-popin").addClass(options.holderClass);

		if (options.showClose == true) {
			$('.avgrund-popin').append('<a href="#" class="avgrund-close">' + options.showCloseText + '</a>');
		}

		if (options.enableStackAnimation == true) {
			$('.avgrund-popin').addClass('stack');
		}

		if (options.onBlurContainer != '') {
			$(options.onBlurContainer).addClass('avgrund-blur');
		}

		// close popup by clicking Esc button
		if (options.closeByEscape == true) {
			function onDocumentKeyup(e) {
				if (e.keyCode === 27) {
					deactivate();
				}
			}
		}

		// close popup only by 'close' button or by click on document too
		function onDocumentClick(e) {
			if (options.closeByDocument == true) {
				if ($(e.target).is('.avgrund-overlay, .avgrund-close')) {
					deactivate();
				}
			} else {
				if ($(e.target).is('.avgrund-close')) {
					deactivate();
				}
			}
		}

		// show popup
		function activate() {
			body.bind('keyup', onDocumentKeyup);
			body.bind('click', onDocumentClick);
			$(".popin-active").removeClass("popin-active")
			$(options.element).addClass("popin-active")
			body.addClass('avgrund-active');
		}

		// hide popup
		function deactivate() {
			body.unbind('keyup', onDocumentKeyup);
			body.unbind('click', onDocumentClick);
			body.removeClass('avgrund-active');
		}

		return this.each(function() {
			
			// init on click
			$(this).click(function(e) {
				e.stopPropagation();
				
				activate();
			});
		});

	}
})(jQuery)

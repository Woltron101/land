jQuery(document).ready(function ($) {
	$('.slider1').slick();
	$('.popup-gallery').slick();
	$('.cear__slider').slick({
		dots: true
	});
	$('.slider-for').slick({
		slidesToShow: 1,
		arrows: true,
		fade: true,
		asNavFor: '.slider-nav'
	});
	$('.slider-nav').slick({
		slidesToShow: 4,
		asNavFor: '.slider-for',
		dots: true,
		focusOnSelect: true,
		arrows: true
	});
	$('.questions__akard__item__question').on('click', function () {
		$('.questions__akard__item__question').removeClass('active');
		$(this).addClass('active');
		$('.questions__akard__item__ans').removeClass('active');
		$(this).closest('li').find('.questions__akard__item__ans').addClass('active');
	})

	// $('.popup-gallery').magnificPopup({
	//     delegate: 'a',
	//     type: 'image',
	//     tLoading: 'Loading image #%curr%...',
	//     mainClass: 'mfp-img-mobile',
	//     gallery: {
	//         enabled: true,
	//         navigateByImgClick: true,
	//         preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
	//     },
	//     image: {
	//         tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
	//         titleSrc: function(item) {
	//             return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
	//         }
	//     }
	// });
	// $('.open-popup-link').magnificPopup({
	// 	type: 'inline',
	// 	midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	// });






	// jQuery(document).ready(function ($) {
	// 	$('#banner-fade').bjqs({
	// 		'height': 320,
	// 		'width': 620,
	// 		'responsive': true
	// 	});
	// });


	// $('.gallery__item.col-md-3 img').on('click', function (event) {
	// 	event.preventDefault()
	// 	$('.gallery__item.col-md-3 img').each(function (i) {
	// 		if (this == event.target) {

	// 			$('.bjqs').find('li:visible').css('display', 'none');
	// 			$('.bjqs').find('li').eq(i).css('display', 'inline-block');
	// 			console.log('i ', i);
	// 			console.log('$(\'.popup-gallery\').find(\'.slick-slide\') ', $('.popup-gallery').find('.slick-slide'));
	// 			console.log('$(\'.popup-gallery\').find(\'.slick-slide\').eq(i) ', $('.popup-gallery').find('.slick-slide').eq(i));



	// 		}

	// 	});
	// });
	/**
	 * Overlay for images (gallery)
	 *
	 * @param {string} theme
	 */
	var openGallery = function (theme) {
		$(this).magnificPopup({
			mainClass: theme + ' mfp-with-zoom', // no zoom, just for bg fadeIn
			overflowY: 'hidden',
			delegate: '> li > a',
			type: 'image',
			gallery: {
				enabled: true
			},
			callbacks: {
				/**
				 * Adds custom parameters to markup
				 * For example data-description on <a> can be used as mfp-description in markup html
				 *
				 * @param template
				 * @param values
				 * @param item
				 */
				markupParse: function (template, values, item) {
					values.description = item.el.data('description'); // or item.img.data('description');
				}
			},
			image: {
				headerFit: true,
				captionFit: true,
				preserveHeaderAndCaptionWidth: false,
				markup: '<div class="mfp-figure">' +
					'<figure>' +
					'<header class="mfp-header">' +
					'<div class="mfp-top-bar">' +
					'<div class="mfp-title"></div>' +
					'<div class="mfp-close"></div>' +
					'<div class="mfp-decoration"></div>' +
					'</div>' +
					'</header>' +
					'<section class="mfp-content-container">' +
					'<div class="mfp-img"></div>' +
					'</section>' +
					'<footer class="mfp-footer">' +
					'<figcaption class="mfp-figcaption">' +
					'<div class="mfp-bottom-bar-container">' +
					'<div class="mfp-bottom-bar">' +
					'<div class="mfp-counter"></div>' +
					'<div class="mfp-description"></div>' +
					'<div class="mfp-decoration"></div>' +
					'</div>' +
					'</div>' +
					'</figcaption>' +
					'</footer>' +
					'</figure>' +
					'</div>',
				titleSrc: function (item) {
					return item.el.attr('title');
				}
			}
		});
	};

	// Galleries
	$('ul.magnific-gallery').each(function () {
		openGallery.call(this, 'mfp-example');
	});

	$(function () {
		/**
		 * Adds header & caption functionality
		 * @author Marcin Gil <mg@ovos.at>
		 */
		$.extend(true, $.magnificPopup.defaults, {
			/**
			 * Resizes the overlay to fit the screen together with header & caption
			 */
			resize: function () {
				// clear resize timeout
				clearTimeout(this.st.resizeTimeout);

				// resize event may be invoked before the overlay was opened or by other type of overlay
				if (!this.isOpen || this.currItem.type !== 'image') return;

				// remove class which enables table layout
				this.wrap.removeClass('mfp-table');
				// clear width on image container
				if (this.st.image.preserveHeaderAndCaptionWidth) {
					this.currItem.img.parent().css('width', '');
				}

				// ensure that DOM elements are rendered before we ask for sizes, otherwise we get random heights
				$.fn.redraw = function () {
					return this.hide(0, function () {
						$(this).show();
					});
				};
				this.content.redraw();

				// read max-height set by updateSize() at the end of open()
				var originalMaxHeight = parseInt(this.currItem.img.css('max-height'), 10);
				var maxHeight = originalMaxHeight;

				// find header & caption elements
				var figureHeader = this.content.find('.mfp-header');
				var figureCaption = this.content.find('.mfp-figcaption').children().first(); // first child is "table-caption"
				var originalFigureHeaderHeight, originalFigureCaptionHeight;

				// if headerFit is enabled and header exists, subtract it's height from max-height
				if (this.st.image.headerFit && figureHeader) {
					originalFigureHeaderHeight = figureHeader.outerHeight(true);
					maxHeight -= originalFigureHeaderHeight;
				}
				// if captionFit is enabled and caption exists, subtract it's height from max-height
				if (this.st.image.captionFit && figureCaption) {
					originalFigureCaptionHeight = figureCaption.outerHeight(true);
					maxHeight -= originalFigureCaptionHeight;
				}
				// set new max-height if it has changed
				if (maxHeight != originalMaxHeight) {
					this.currItem.img.css('max-height', maxHeight);
					originalMaxHeight = maxHeight;
				}

				// function changing layout from block to table when image is smaller than visible area
				// this prevents from header & caption from expanding the overlay
				var setWrapSize = function (currItem) {
					var imageWidth = currItem.img.outerWidth();
					var bodyWidth = $('body').width() - parseInt(this.container.css('padding-left'), 10) - parseInt(this.container.css('padding-right'), 10);
					if (imageWidth < bodyWidth) {
						this.wrap.addClass('mfp-table');
					}

					// apply necessary corrections if header or caption got higher
					var figureHeaderHeight, figureCaptionHeight;

					// if headerFit is enabled and header exists, subtract it's height from max-height
					if (this.st.image.headerFit && figureHeader) {
						figureHeaderHeight = figureHeader.outerHeight(true);
						if (figureHeaderHeight > originalFigureHeaderHeight) {
							maxHeight -= figureHeaderHeight - originalFigureHeaderHeight;
						}
					}
					// if captionFit is enabled and caption exists, subtract it's height from max-height
					if (this.st.image.captionFit && figureCaption) {
						figureCaptionHeight = figureCaption.outerHeight(true);
						if (figureCaptionHeight > originalFigureCaptionHeight) {
							maxHeight -= figureCaptionHeight - originalFigureCaptionHeight;
						}
					}

					// set new max-height if it has changed
					if (maxHeight != originalMaxHeight) {
						currItem.img.css('max-height', maxHeight);

						// when we change image's max-height, header and caption will get narrower
						// this creates a risk that text will fold into more lines
						// and header/caption won't fit on the screen anymore
						if (this.st.image.preserveHeaderAndCaptionWidth) {
							currItem.img.parent().css('width', imageWidth);
						}
					}

					delete this.st.callbacks.imageHasSize;
				};

				// if image is already loaded, call setWrapSize
				if (this.currItem.hasSize) {
					setWrapSize.call(this, this.currItem);
				}
				// if image is still loading, attach is to imageHasSize event
				else {
					this.st.callbacks.imageHasSize = setWrapSize;
				}
			},
			callbacks: {
				/**
				 * Open event
				 */
				open: function () {
					this.st.resize.call(this);
				},
				/**
				 * Resize event
				 */
				resize: function () {
					// buffered call
					var self = this;
					clearTimeout(this.st.resizeTimeout);
					this.st.resizeTimeout = setTimeout(function () {
						self.st.resize.call(self);
					}, 100);
				},
				/**
				 * After change event
				 */
				afterChange: function () {
					this.st.resize.call(this);
				}
			},
			image: {
				headerFit: true,
				captionFit: true,
				preserveHeaderAndCaptionWidth: false,
				markup: '<div class="mfp-figure">' +
					'<figure>' +
					'<header class="mfp-header">' +
					'<div class="mfp-top-bar">' +
					'<div class="mfp-title"></div>' +
					'<div class="mfp-close"></div>' +
					'</div>' +
					'</header>' +
					'<section class="mfp-content-container">' +
					'<div class="mfp-img"></div>' +
					'</section>' +
					'<footer class="mfp-footer">' +
					'<figcaption class="mfp-figcaption">' +
					'<div class="mfp-bottom-bar-container">' +
					'<div class="mfp-bottom-bar">' +
					'<div class="mfp-counter"></div>' +
					'<div class="mfp-description"></div>' +
					'</div>' +
					'</div>' +
					'</figcaption>' +
					'</footer>' +
					'</figure>' +
					'</div>'
			}
		});
	});


	// $('.open-popup-link').on('click', function () {
	// 	var index = $(this).index();

	// 	$('.popup-gallery').find('.slick-current.slick-active').removeClass('slick-current').removeClass('slick-active');
	// 	$('.popup-gallery').find('.slick-current.slick-active').eq(index).addClass('slick-current').addClass('slick-active');
	// })

});
(function () {
	var lastScrollTop = 0;
	$(window).scroll(function (event) {
		var st = $(this).scrollTop();
		if (st > lastScrollTop) {

			$('.proj').each(function () {
				var imagePos = $(this).offset().top;
				var topOfWindow = $(window).scrollTop() + $(window).height();
				if (imagePos < topOfWindow) {
					parallaxElem($('.slow'), 1, $('.proj'));
					parallaxElem($('.slow'), 1, $('.proj'));
					parallaxElem($('.slow'), 1, $('.proj'));
					parallaxElem($('.fast'), 3, $('.proj'));
				} else {
					setElTranslate($('.proj__gard-n'), 1);
					setElTranslate($('.proj__big'), 1);
					setElTranslate($('.proj__middle'), 1);
					setElTranslate($('.proj__small'), 1);
				}
			})
		} else {
			$('.proj').each(function () {
				var imagePos = $(this).offset().top + $(this).height();
				var topOfWindow = $(window).scrollTop();
				if (imagePos > topOfWindow) {
					parallaxElem($('.proj__gard-n'), -1, $('.proj'));
					parallaxElem($('.proj__big'), -1, $('.proj'));
					parallaxElem($('.proj__middle'), -1, $('.proj'));
					parallaxElem($('.proj__small'), -3, $('.proj'));
				} else {
					console.log(111)
					setElTranslate($('.proj__gard-n'), 90);
					setElTranslate($('.proj__big'), 50);
					setElTranslate($('.proj__middle'), 50);
					setElTranslate($('.proj__small'), 200);
				}
			});
		}
		lastScrollTop = st;
	});

	function parallaxElem(elem, speed, container) {


		elem.each(function (index, el) {
			var $this = $(this),
				height = $this.height(),
				trans,
				tansPers,
				matrix;

			function matrixToArray(str) {
				return str.match(/(-?[0-9\.]+)/g);
			}
			matrix = matrixToArray($this.css('transform'));
			trans = +matrix[5];
			tansPers = trans * 100 / height;
			if (elem.hasClass('proj__big')) {

				// console.log('tansPers ', tansPers);
			}
			// console.log(' ' + index, trans + " " + height + " " + tansPers);
			if (matrix) {
				$this.css({
					"-webkit-transform": "translateY(" + (tansPers + speed) + "%)",
					"-ms-transform": "translateY(" + (tansPers + speed) + "%)",
					"-moz-transform": "translateY(" + (tansPers + speed) + "%)",
					"transform": "translateY(" + (tansPers + speed) + "%)"
				});

				​

			}
		});


	}

	function setElTranslate(el, transl) {
		// console.log(el);
		el.css({
			"-webkit-transform": "translateY(" + transl + "%)",
			"-ms-transform": "translateY(" + transl + "%)",
			"-moz-transform": "translateY(" + transl + "%)",
			"transform": "translateY(" + transl + "%)"
		});
	}

})();
$(document).ready(function () {

});


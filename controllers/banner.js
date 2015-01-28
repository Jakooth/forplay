function BannerManager() {
	
	/** 
	 * PUBLIC
	 */
	
	this.updateBannerStyles = function() {
		var $covers = $('.covers'),
			$header = $('header'),
			$window = $(window);
		
		var top = $window.scrollTop();
			ratio = Number($window.width() / $window.height()).toFixed(1) > 1.8 ? 25 : 30,
			coversHeight = Math.round(((screen.width * ratio) / 100) - top);
		
		/**
		 * For devices or screen below 768, the header is fixed.
		 * Do not update the height in this use case.
		 */
		
		if (!$('main').hasClass('fixed') && !utils.isMobile()) {
					
			$covers.css('height', coversHeight);
			
			if (top > $header.height()) {
				$header.addClass('solid');
			} else {
				$header.removeClass('solid');	
			}
			
		/**
		 * News covers section has fixed height.
		 * Set the height to auto in this case.
		 */		
			
		} else {
			$covers.removeAttr('style')
		}
	}
	
	
	
	
	
	
	
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	/**
	 * This function will just load the next or previous cover.
	 */
	
	this.nextCover = function(n) {
		var $covers = $('.cover'),
			$thumbs = $('.thumbnail-cover'),
			$c3, $cover, $thumb;
			
		var l = $covers.length,
			i, order;
		
		for (i = 0; i <= l; i++) {
			$cover = $covers.eq(i),
			$thumb = $thumbs.eq(i);
			
			order = $cover.data('order');
			
			/**
			 * Move left n number of cover.
			 * Remember first cover will turn around to the end.
			 * When you move more than one cover the first will turn around n positions before end.
			 * E.g. for n = 1, c1 will become c4 and c2 will become 5,
			 * for n = 2, c1 will become c3, c2 will become c4 and c3 will become c5.
			 * To do the math we substract from the length.
			 * First substract the current order from n.
			 * If order is the maximum before turn around it will equal 0.
			 * E.g. n = 2, (n + 1) - order = 0, l - 0 = l or last cover.
			 * Remember we need to add 1 to n, because for n = 0 we shift 1 position and so on.
			 */
			
			if (order <= 1 + n) {
				$cover.removeClass('c' + order).addClass('c' + (l - ((n + 1) - order)));
				$cover.data('order', (l - ((n + 1) - order)));
				$thumb.data('order', (l - ((n + 1) - order)));
			} else {
				$cover.removeClass('c' + order).addClass('c' + (order - (1 + n)));
				$cover.data('order', (order - (1 + n)));
				$thumb.data('order', (order - (1 + n)));
			}
			
			$cover.attr('data-order', $cover.data('order'));
			$thumb.attr('data-order', $thumb.data('order'));
		}
		
		$c3 = $('.c3');
		
		$covers.find('.title').addClass('clip');
		$c3.find('.title').removeClass('clip');
	}
	
	this.prevCover = function(n) {
		var $covers = $('.cover'),
			$thumbs = $('.thumbnail-cover'),
			$c3, $cover, $thumb;
			
		var l = $covers.length,
			i, order;
		
		for (i = 0; i <= l; i++) {
			$cover = $covers.eq(i),
			$thumb = $thumbs.eq(i);
			
			order = $cover.data('order');
			
			if (order >= l - n) {
				$cover.removeClass('c' + order).addClass('c' + (1 + (order - (l - n))));
				$cover.data('order', (1 + (order - (l - n))));
				$thumb.data('order', (1 + (order - (l - n))));
			} else {
				$cover.removeClass('c' + order).addClass('c' + (order + (1 + n)));
				$cover.data('order', (order + (1 + n)));
				$thumb.data('order', (order + (1 + n)));
			}
			
			$cover.attr('data-order', $cover.data('order'));
			$thumb.attr('data-order', $thumb.data('order'));
		}
		
		$c3 = $('.c3');
		
		$covers.find('.title').addClass('clip');
		$c3.find('.title').removeClass('clip');
	}
	
	
	
	
	
	
	
	
	/**
	 * EVENTS
	 */
	
	$(window).scroll(function () {
		self.updateBannerStyles();
	});
	
	$(window).resize(function () {
		self.updateBannerStyles();
	});
	
	$('nav.menu h2').click(function () {
		$(this).parent().find('div.menu').toggleClass('selected');
	});
	
	$('nav.menu .collapse').click(function () {
		$(this).parent().removeClass('selected');
	});
	
	$('.covers').on('mouseover', 'article:not(.c3)', function (e) {
		var $this = $(this),
			$c1 = $('.cover.c1'),
			$c2 = $('.cover.c2'),
			$c3 = $('.cover.c3'),
			$c4 = $('.cover.c4'),
			$c5 = $('.cover.c5');
		
		$this.find('.clip').removeClass('clip');
		
		$c3.find('.title').addClass('clip');
		$c3.find('.worse').addClass('clip');
		$c3.find('.better').addClass('clip');
		$c3.find('.equal').addClass('clip');
		$c3.find('.social').css('display', 'none');
		
		if ($this.hasClass('c4') || $this.hasClass('c5')) {
			$c3.addClass('unfocus-left');
		} else {
			$c3.addClass('unfocus-right');
		}
		
		$this.hasClass('c5') ? $c4.addClass('unfocus') : null;
		$this.hasClass('c1') ? $c2.addClass('unfocus') : null;
	});
	
	$('.covers').on('mouseout', 'article:not(.c3)', function (e) {
		var $this = $(this),
			$c1 = $('.cover.c1'),
			$c2 = $('.cover.c2'),
			$c3 = $('.cover.c3'),
			$c4 = $('.cover.c4'),
			$c5 = $('.cover.c5');
		
		$this.find('.title').addClass('clip');
		$this.find('.worse').addClass('clip');
		$this.find('.better').addClass('clip');
		$this.find('.equal').addClass('clip');
		
		$c3.find('.clip').removeClass('clip');
		$c3.find('.social').css('display', 'block');
		$c3.removeClass('unfocus-left');
		$c3.removeClass('unfocus-right');

		$c4.removeClass('unfocus');
		$c2.removeClass('unfocus');
	});
	
	$(document).on('swipeleft', 'main:not(.read) .covers', function (e) {
		self.nextCover(0);
	});
	
	$(document).on('swiperight', 'main:not(.read) .covers', function (e) {
		self.prevCover(0);
	});
	
	$('.thumbnail-covers').on('click', '.thumbnail-cover:not([data-order=3])', function (e) {
		var $this = $(this),
			$covers = $('.cover');
		
		var order = $this.data('order'),
			l = $covers.length,
			half = Math.ceil(l/2);
		
		if (order > half) {
			self.nextCover((order - half) - 1);	
		} else {
			self.prevCover((half - order) - 1);
		}
	});
	
	$('main').on('click', '.logo', function (e) {
		var $this = $(this),
			$body = $('body');
		
		window.History.pushState({'type': 'portal', 'url': issue}, issue, '?' + 'portal' + '=' + issue);
	});
}

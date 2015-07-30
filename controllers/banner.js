function BannerManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	var coversHeight;
	
	
	
	
	
	
	
	
	/** 
	 * PUBLIC
	 */
	 
	this.setCoversHeight = function(h) {
		coversHeight = $.cookie('header') == 'static' ? 0 : h;
		
		self.updateHeaderPosition();
	}
	
	this.getCoversHeight = function() {
		return coversHeight;
	}
	
	this.updateHeaderPosition = function() {
		var $main = $('main'),
			$covers,
			$mainCoverHeading;
		
		
		if ($main.hasClass('read')) {
			$covers = $('#read .cover');
			$mainCoverHeading = $('#read .cover h3');
		} else {
			$covers = $('#covers');
			$mainCoverHeading = $('#covers article:eq(0) h3');
		}
		
		/**
		 * For devices or screen below 768, the header is fixed.
		 * Do not update the height in this use case.
		 */
		
		if (!utils.isMobile()) {
			
			/**
			 * TODO: Why *40?
			 */
			
			if ($(window).scrollTop() >= (coversHeight * 40) / 100) {
				$covers.css('height', '');
				$('header').addClass('fixed');
				$('main').addClass('fixed');
				
				return false;
			} else {
				$('header').removeClass('fixed');
				$('main').removeClass('fixed');
			}
			
			$covers.css('height', coversHeight - $(window).scrollTop());
			
			/**
			 * TODO: Why / 1.2?
			 */
			
			if ($covers.height() < coversHeight / 1.2) {
				$mainCoverHeading.addClass('invisible');
				$("#forLife").css('opacity', 0);
			} else {
				$mainCoverHeading.removeClass('invisible');
				$("#forLife").css('opacity', 1);
			}
		}
	}
	
	/**
	 * This function will just load the next or previous cover.
	 */
	
	this.nextCover = function(n) {
		var $covers = $('#covers .cover'),
			$thumbs = $('#thumbnails .thumbnail'),
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
		var $covers = $('#covers .cover'),
			$thumbs = $('#thumbnails .thumbnail'),
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
		self.updateHeaderPosition();
	});
	
	$(window).resize(function () {
		self.updateHeaderPosition();
	});
	
	$(window).on('load', function () {
		if ($.cookie('header') == 'static') {
			$('header').addClass('static fixed');
			$('main').addClass('static fixed');
			$('#hideHeaderButton').attr('aria-pressed', 'true');
		}
	});
	
	$('#covers').on('mouseover', 'article:not(:eq(0))', function (e) {												
		if (utils.isMobile()) {
			return false;
		}
		
		var $this = $(this),
			$c1 = $('#covers article:eq(1)'),
			$c2 = $('#covers article:eq(2)'),
			$c3 = $('#covers article:eq(0)'),
			$c4 = $('#covers article:eq(3)'),
			$c5 = $('#covers article:eq(4)');
		
		if ($this.index() > 2) {
			$c3.addClass('unfocus unfocus-left');
		} else {
			$c3.addClass('unfocus unfocus-right');
		}
		
		$this.index() == 4 ? $c4.addClass('unfocus') : null;
		$this.index() == 1 ? $c2.addClass('unfocus') : null;
		
		if ($('main').hasClass('fixed')) {
			return false;
		}
		
		switch($this.index()) {
			case 1:
				$('#forPlay').css('left', 0);
				break;
			case 2:
				$('#forPlay').css('left', '10%');
				break;
			case 3:
				$('#forPlay').css('left', '30%');
				break;
			case 4:
				$('#forPlay').css('left', '40%');
				break;	
		}
	});
	
	$('#covers').on('mouseout', 'article:not(:eq(0))', function (e) {
		if (utils.isMobile()) {
			return false;
		}														 
																 
		var $this = $(this),
			$c1 = $('#covers article:eq(1)'),
			$c2 = $('#covers article:eq(2)'),
			$c3 = $('#covers article:eq(0)'),
			$c4 = $('#covers article:eq(3)'),
			$c5 = $('#covers article:eq(4)');
		
		$c3.removeClass('unfocus unfocus-left');
		$c3.removeClass('unfocus unfocus-right');

		$c4.removeClass('unfocus');
		$c2.removeClass('unfocus');
		
		$('#forPlay').css('left', '20%');
	});
	
	$('#covers').on('swipeleft', function (e) {
		self.nextCover(0);
	});
	
	$('#covers').on('swiperight', function (e) {
		self.prevCover(0);
	});
	
	$('#thumbnails').on('click', '.thumbnail:not([data-order=3])', function (e) {
		var $this = $(this),
			$covers = $('#covers .cover');
		
		var order = $this.data('order'),
			l = $covers.length,
			half = Math.ceil(l/2);
		
		if (order > half) {
			self.nextCover((order - half) - 1);	
		} else {
			self.prevCover((half - order) - 1);
		}
	});
	
	$('nav').on('click', 'h3', function (e) {
		if ($('header').hasClass('read') || utils.isMobile()) {
			$('body').toggleClass('nav');
		}
	});
	
	$('header').on('click', '#hideHeaderButton', function (e) {
		if (utils.isMobile()) {
			return false;
		}
		
		var $this = $(this),
			$main = $('main'),
			$cover = $main.find('section.cover');
		
		if ($this.attr('aria-pressed') == 'true') {
			$this.attr('aria-pressed', 'false');
			
			if ($cover.hasClass('news') || $cover.hasClass('video')) {
				$.removeCookie('header');	
			} else {
				$('header').removeClass('static fixed');
				$('main').removeClass('static fixed');
				
				$.removeCookie('header');
				
				self.setCoversHeight($('#covers').height());
			}
		} else {
			$this.attr('aria-pressed', 'true');
			
			$('header').addClass('static fixed');
			$('main').addClass('static fixed');
			
			$.cookie('header', 'static', {expires: 365});
			
			self.setCoversHeight(0);
		}
	});
}

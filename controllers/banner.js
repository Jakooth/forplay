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
		coversHeight = localStorage.getItem('forplayHeader') == 'static' ? 0 : h;
		
		self.updateHeaderPosition();
	}
  
  this.getCoversCurrentHeight = function(h) {
    var $main = $('main');
    
    if ($main.hasClass('read')) {
      return $('header.cover').height();
    } else {
      return $('#covers').height();
    }
	}
	
	this.getCoversHeight = function() {
		return localStorage.getItem('forplayHeader') == 'static' ? 0 : coversHeight;
	}
  
  /**
   * This is corresponding to mixins.less.
   */
  
  this.getNavHeight = function() {
    return (window.screen.height) * 14 / 100;
  }
  
  this.getFixedHeight = function() {
    return (window.screen.height) * 10 / 100;
  }
	
	this.updateHeaderPosition = function() {
		var $main = $('main'),
        $covers,
        $mainCoverHeading,
        $mainCoverAuthor;
			
		var scrollFixedRatio = $main.hasClass('read') ? 40 : 40,
			  scrollHideRatio = $main.hasClass('read') ? 1.4 : 1;	
		
		if ($main.hasClass('read')) {
			$covers = $('#read .cover');
			$mainCoverHeading = $('#read .cover > h1');
			$mainCoverAuthor = $('#read .cover > p');
		} else {
			$covers = $('#covers');
			$mainCoverHeading = $('#covers h3');
		}
		
		/**
		 * For devices or screen below 768, the header is fixed.
		 * Do not update the height in this use case.
		 */
		
		if (!utils.isMobile()) {
			if ($(window).scrollTop() >= (coversHeight * scrollFixedRatio) / 100) {
				$covers.css('height', '');
				$('body > header').addClass('fixed collapsed');
				$('main').addClass('fixed collapsed');
				
				return false;
			} else {
				$('body > header').removeClass('fixed collapsed');
				$('main').removeClass('fixed collapsed');
			}
			
			$covers.css('height', coversHeight - $(window).scrollTop());
			
			if ($covers.height() < coversHeight / scrollHideRatio) {
				$mainCoverHeading.css('opacity', 0);
				
				if ($main.hasClass('read')) {
					$mainCoverAuthor.css('opacity', 0);
				}
			} else {
				$mainCoverHeading.css('opacity', 0.9);
				
				if ($main.hasClass('read')) {
					$mainCoverAuthor.css('opacity', 0.9);
				}
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
  
  this.showHeader = function($button) {
    var $this = $('#hideHeaderButton'),
        $main = $('main'),
        $header = $('body > header'),
        $cover = $main.find('header.cover');
        
    $this.attr('aria-pressed', 'false');
			
    if ($cover.hasClass('news') || $cover.hasClass('video')) {
      localStorage.removeItem('forplayHeader');	
    } else {
      $header.removeClass('static fixed');
      $main.removeClass('static fixed');
      
      localStorage.removeItem('forplayHeader');
      
      if ($main.hasClass('read')) {
        self.setCoversHeight($('header.cover').height());
      } else {
        self.setCoversHeight($('#covers').height());
      }
    }
  }
  
  this.hideHeader = function($button) {
    var $this = $('#hideHeaderButton'),
        $main = $('main'),
        $header = $('body > header'),
        $cover = $main.find('header.cover');
        
    $this.attr('aria-pressed', 'true');
			
    $header.addClass('static fixed');
    $main.addClass('static fixed');
    
    localStorage.setItem('forplayHeader', 'static');
    
    self.setCoversHeight(0);
  }
  
  this.setHeader = function(collapsed) {
    if (collapsed) {
      this.hideHeader();
    } else {
      this.showHeader();
    }
  }
	
	
	
	
	
	
	
	
	/**
	 * EVENTS
	 */
	
  /**
   * The only way to do the banner animation
   * is to use fixed height number.
   * Store them in the banner object from the start.
   */
  
  $(document).on('articleAppended', function(e, articleId) {
    self.setCoversHeight(Math.floor(self.getCoversHeight() * 1.5));
  });
  
  $(document).on('newsAppended', function(e, articleId) {
    self.setCoversHeight(0); 
  });
  
  $(document).on('coverAppended', function(e) {
    self.setCoversHeight(self.getCoversHeight());
  });
  
	$(window).scroll(function () {
		self.updateHeaderPosition();
	});
	
	$(window).resize(function () {
		self.updateHeaderPosition();
	});
	
	$(window).on('load', function () {
		if (localStorage.getItem('forplayHeader') == 'static') {
			$('body > header').addClass('static fixed');
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
		if ($('body > header').hasClass('read') || 
        $('body > header').hasClass('collapsed') || utils.isMobile()) {
          
			$('body').toggleClass('nav');
		}
	});
	
	$('body > header').on('click', '#hideHeaderButton', function (e) {
		if (utils.isMobile()) {
			return false;
		}
		
		if ($(this).attr('aria-pressed') == 'true') {
			self.showHeader();
		} else {
			self.hideHeader();
		}
	});
}

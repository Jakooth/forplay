function ArticlesManager() {
	
	/** 
	 * PRIVATE
	 */
	
	var self = this;
	
	function loadImage($img) {			
		var src = utils.formatTimThumbString($img.data('tag'), 
											 $img.data('count'),
											 $img.width(), 
											 $img.height());
		
		$img.data('proxy', false);
		$img.attr('data-proxy', $img.data('proxy'));
		
		$img.attr('src', src);
	}
	
	function loadBackground($div) {			
		var src = utils.formatTimThumbString($div.data('tag'), 
											 $div.data('count'),
											 $div.outerWidth(), 
											 $div.outerWidth());
		
		$div.data('proxy', false);
		$div.attr('data-proxy', $div.data('proxy'));
		$div.attr('style', 'background-image: url(' + src + ');');
	}
	
	function loadCover($div) {			
		var src = utils.formatTimThumbString($div.data('tag'), 
											 $div.data('count'),
											 $(window).width(), 
											 $(window).width() / (16/9));
		
		$div.data('proxy', false);
		$div.attr('data-proxy', $div.data('proxy'));
		$div.attr('style', 'background-image: url(' + src + ');');
	}
	
	var loadArticles = function(data, appender) {
		var d1 = $.get('data/' + issue + '/' + data + '-center.xml'),
			d2 = $.get('renderers/article.html'),
			d3 = $.get('renderers/layout.html');
			
		$.when(d1, d2, d3).done(function(data1, data2, data3) {
			var articles = $.xml2json(data1[0]),
				tmpls = $.templates({
					articleTemplate: data2[0],
					layoutTemplate: data3[0]
				}),
				node = articles.layout,
				html = $('<div />').append($.templates.layoutTemplate.render(node, 
							{trimText: utils.trimText, formatCommaString: utils.formatCommaString}));
			
			appender(html, parent);
		}).fail(function() {
			alert("Failed to load articles.");
		});
	}
	
	var loadArticlesWithCover = function(data, appender, isIndex) {
		var c1 = $.get('data/' + issue + '/' + data + '-cover.xml'),
			c2 = $.get('renderers/cover.html'),
			d1 = $.get('data/' + issue + '/' + data + '-center.xml'),
			d2 = $.get('renderers/article.html'),
			d3 = $.get('renderers/layout.html');
		
		$.when(c1, c2, d1, d2, d3).done(function(cdata1, cdata2, data1, data2, data3) {
			var covers = $.xml2json(cdata1[0]),
				articles = $.xml2json(data1[0]),
				tmpls = $.templates({
					coverTemplate: cdata2[0],
					articleTemplate: data2[0],
					layoutTemplate: data3[0]
				}),
				cnode = covers.cover,
				node = articles.layout,
				chtml = $('<div />').append($.templates.coverTemplate.render(cnode));
				html = $('<div />').append($.templates.layoutTemplate.render(node, 
							{
								trimText: utils.trimText, 
								formatCommaString: utils.formatCommaString}));
			
			appender(html, chtml, isIndex);
		}).fail(function() {
			alert("Failed to load articles.");
		});
	}
	
	var appendArticlesWithCover = function(html, chtml, isIndex) {
		var $body = $('body'),
			$main = $('main'),
			$c3 = chtml.find('article.c3'),
			$hype = chtml.find('article.c3 .hype');
		
		$('#forPlayCovers').after(chtml.find('article.p'));
		$('#coversSection').append(chtml.find('article.l'));
		
		/**
		 * First append Forplay thumbnails to keep the same order.
		 * Otherwise script to click on thumbnails will be incorect.
		 */
		
		$('#thumbnailCoversWidget').append(chtml.find('.thumbnail-cover.p'));
		$('#thumbnailCoversWidget').append(chtml.find('.thumbnail-cover.l'));
		
		if (isIndex) {
			$('#centerColumn').prepend(html.find('.high:not(.video-set)'));
			$('#latestVideo').after(html.find('.high.video-set'));
			$('#centerColumn').append(html.html());
		} else {
			$('#centerColumn').append(html.html());
			
			/**
			 * Append the score at the end of the main content.
			 * Only do this when reading review or feature with score.
			 */
			
			if ($hype.length) {
				$hype.clone()
					.removeClass('box')
					.insertAfter('#centerColumn .read-set:last > p:last-of-type')
					.children().removeClass('clip');
			}
		}
		
		/**
		 * Auto-size images and backgrounds.
		 */
		
		$('#centerColumn').find('.img-set > div:not(.inline-col) img').on('load', function() {
			if ($(this).data('proxy')) {
				loadImage($(this));
			}
		});
		
		$('#thumbnailCoversWidget').find('.thumbnail-cover').each(function() {
			loadBackground($(this));
		});
		
		$('#coversSection').find('.cover').each(function() {
			loadCover($(this));
		});
		
		/**
		 * Set theme color and upated banner style.
		 * Do this here, because the HTML string is ready.
		 * From loadPage the DOM must be used
		 * and there is risk for asynchronous get dealy.
		 */
		
		utils.setThemeColor($c3.data('color'));
		banner.updateBannerStyles();
	}
	
	var appendNews = function(html) {
		var $body = $('body'),
			$c3 = html.find('.cover-set');
		
		$('#latestVideo').after(html.find('.high.video-set'));
		$('#latestArticles').after(html.find('.article-set'));
		$('#centerColumn').prepend(html.html());
		
		$('#centerColumn').find('.img-set > div:not(.inline-col) img').on('load', function() {
			if ($(this).data('proxy')) {
				loadImage($(this));
			}
		});
		
		/**
		 * Set theme color and upated banner style.
		 * Do this here, because the HTML string is ready.
		 * From loadPage the DOM must be used
		 * and there is risk for asynchronous get dealy.
		 */
		
		utils.setThemeColor($c3.data('color'));
		banner.updateBannerStyles();
	}
	
	var loadIndexArticles = function(issue) {
		var $main = $('main');
		
		loadArticlesWithCover('_', appendArticlesWithCover, true);
		
		$main.removeClass();
	}
	
	var unloadArticles = function() {
		var $main = $('main');
		
		/**
		 * Make sure all players are destroyed.
		 * Otherwise video will not play again.
		 */
		
		if ($('#forVideo').length) {
			window.player.dispose();
		}
		
		$('#coversSection').children('article').remove();	
		$('#centerColumn').children('.layout').remove();
		
		$main.removeClass();
	}
	
	/**
	 * For accessibility reason headings are removed or restored in the code.
	 * This is not mandatory for a video games site, but I'm a maniac ;)
	 */
	
	var removeHeadings = function(lv, la) {
		var $body = $('body'),
			$forPlayLogo = $('#forLifeHeading'),
			$forPlayHeading = $('#forLifeCovers'),
			$forLifeLogo = $('#forLifeHeading'),
			$forLifeHeading = $('#forLifeCovers'),
			$latestVideo = $('#latestVideo'),
			$latestArticles = $('#latestArticles');
		
		var fpl, fph, fll, flh;
		
		if ($body.data('side') == 'p') {
			fpl = fph = false;
			fll = flh = true;
		} else {
			fpl = fph = true;
			fll = flh = false;
		}
		
		if (arguments.length == 0) {
			lv = la = true;	
		}
		
		/**
		 * Headings are stored in temporary array.
		 * Based on arguments some headings can be either removed or not.
		 * If heading is not remove it will be stored with false.
		 * When restoring false values will not append elements from temp.
		 */
		
		temp[0] = fpl ? $forPlayLogo.remove() : false;
		temp[1] = fph ? $forPlayHeading.remove() : false;
		temp[2] = fll ? $forLifeLogo.remove() : false;
		temp[3] = flh ? $forLifeHeading.remove() : false;
		temp[4] = lv ? $latestVideo.remove() : false;
		temp[5] = la ? $latestArticles.remove() : false;
	}
	
	var restoreHeadings = function(lv, la) {
		var $body = $('body'),
			$centerColumn = $('#centerColumn'),
			$coversSection = $('#coversSection'),
			$articlesSection = $('#articlesSection');
			
		var fpl, fph, fll, flh;		
		
		if ($body.data('side') == 'p') {
			fpl = fph = false;
			fll = flh = true;
		} else {
			fpl = fph = true;
			fll = flh = false;
		}
		
		if (arguments.length == 0) {
			lv = la = true;	
		}
		
		/**
		 * Test if there are any non converted SVG images.
		 * This can happen, if the fist loaded page is not the index.
		 */
		  
		if (fll && $(temp[3]).is('img.svg')) {
			banner.convertSVG($(temp[3]));
		}
		
		if (fpl && $(temp[2]).is('img.svg')) {
			banner.convertSVG($(temp[2]));
		}
		
		/**
		 * Append headings only, if they exists in temp.
		 */
		
		fpl ? $coversSection.append(temp[0]) : null;
		fph ? $coversSection.append(temp[1]) : null;
		fll ? $coversSection.append(temp[2]) : null;
		flh ? $coversSection.append(temp[3]) : null;
		lv ? $centerColumn.append(temp[4]) : null;
		la ? $centerColumn.append(temp[5]) : null;
		
		window.temp = [];
	}
	
	var loadPage = function(params) {
		var $this = $(this),
			$body = $('body'),
			$main = $('main'),
			$header = $('header');
			
		var type = params.type,
			url = params.url;
		
		unloadArticles();
		restoreHeadings();
		
		switch (type) {
			case 'portal':
				loadIndexArticles();
				break;
			case 'news':
			case 'video':
				loadArticles(url, appendNews);
				
				$header.addClass('solid');
				$main.addClass('read fixed');
				
				removeHeadings();
				
				break;
			case 'feature':
			case 'review':
				loadArticlesWithCover(url, appendArticlesWithCover);
				
				$main.addClass('read');
				
				removeHeadings();
				
				break;
		}
	}
	
	
	
	
	
	
	
	
	/**
	 * EVENTS
	 */
	
	window.History.Adapter.bind(window, 'statechange', function() {
		var State = window.History.getState();
		
		loadPage(utils.parseURL(State.cleanUrl));
	});
	
	$(window).on("load", function () {
		$.event.special.swipe.scrollSupressionThreshold = 10,
		
		/**
		 * Allow more time for the swipe to happen.
		 * This enables swipe to work on slower device.
		 */
		
		$.event.special.swipe.durationThreshold = 5000;
		$.event.special.swipe.horizontalDistanceThreshold = 30,
		$.event.special.swipe.verticalDistanceThreshold = 75;
	});
	
	$(window).on('load', function (e) {
		var State = window.History.getState();
		
		/**
		 * Replace SVG images with embed SVG data.
		 * This allows to change color with CSS.
		 */
		  
		$('img.svg').each(function() {
			banner.convertSVG($(this));
		});
		
		/**
		 * If you are loading the index push the portal state.
		 * In this case the statechange event will load the page.
		 */
		
		if ((State.cleanUrl.indexOf('?') != -1 
									&& State.cleanUrl.indexOf('portal') == -1 
									&& State.cleanUrl.indexOf('issue') == -1) || State.data.type) {
			
			loadPage(utils.parseURL(State.cleanUrl));
		} else {
			if (State.cleanUrl.indexOf('portal') != -1 && State.cleanUrl.indexOf('issue') != -1) {
				loadPage(utils.parseURL(State.cleanUrl));
			} else {
				window.History.pushState({'type': 'portal', 'url': issue}, issue, '?' + 'portal' + '=' + issue);
			}
		}
	});
	
	$('main').on('click', '.player a', function (e) {
		var $this = $(this),
			$img = $this.hasClass('img') ? $this : $this.parents('.img');
		
		/**
		 * For mobile always open the video and not the article.
		 */
		
		if (utils.isMobile()) {
			$this.attr('href', $img.data('url'));
			$this.attr('target', '_blank');
		}
		
		/**
		 * For video images and when not on mobile,
		 * prevent the link from open and play the video inline.
		 */
		
		if ($this.hasClass('img') && !utils.isMobile()) {
			e.preventDefault();
		
		/**
		 * Else prevent creating a player, when you click on the title link.
		 * This allows to either play video from the image
		 * or open the article in a new page from the title.
		 */
		  
		} else {
			e.stopPropagation();
		}			
	});
	
	$('main').on('click', 'article:not(.player) a', function (e) {			
		
		/**
		 * The click is available on the whole articles content,
		 * bur for accessibility the headign is link.
		 * So preven second click on the content.
		 */
		
		e.stopPropagation();
	});
	
	$('main').on('click', 'article:not(.player)', function (e) {
		var $this = $(this);
		
		/**
		 * First data-type is for articles.
		 * Second data-type is for covers.
		 * Third data-type is for video.
		 */
		
		var type = $this.find('[data-type]').data('type')
						|| $(this).data('type') 
						|| $(this).parent().parent().data('type')
			url = $this.data('url');
		
		/**
		 * Changing URL hash using history.js.
		 * Page is loaded on statechange event.
		 */
		
		window.History.pushState({'type': type, 'url': url}, url, '?' + type + '=' + url);
	});
}

function ArticlesManager() {
	
	/**
	 * PRIVATE
	 */
	
	var self = this;
	
	function loadImage($img) {			
		var src = utils.formatTimThumbString($img.data('tag'), 
											 $img.data('main'),
											 $img.width(), 
											 $img.height());
		
		$img.data('proxy', false);
		$img.attr('data-proxy', $img.data('proxy'));
		
		$img.attr('src', src);
	}
	
	function loadBackground($img, $div) {			
		var src = utils.formatTimThumbString($img.data('tag'), 
											 $img.data('main'),
											 $div.outerWidth(), 
											 $div.outerHeight());
		
		$img.data('proxy', false);
		$img.attr('data-proxy', $img.data('proxy'));
		
		$div.css('background-image', 'url(' + src + ')');
	}
	
	function loadCover($img, $div) {			
		var src = utils.formatTimThumbString($img.data('tag'), 
											 $img.data('cover'),
											 Math.round($(window).width() * 60/100), 
											 Math.round($(window).width() * 60/100 / (16/9)));
		
		$img.data('proxy', false);
		$img.attr('data-proxy', $img.data('proxy'));
		
		$div.css('background-image', 'url(' + src + ')');
	}
	
	var loadArticles = function(data, appender, covers) {
		var get1 = $.get('data/' + issue + '/' + data + '.xml'),
			get2 = $.get('renderers/article.html');
			
		$.when(get1, get2).done(function(data1, data2) {
			var articles = $.xml2json(data1[0]),
				tmpls = $.templates({
					articleTemplate: data2[0]
				}),
				node = articles.article,
				html = $('<div />').append($.templates
										    .articleTemplate
											.render(node));
			
			appender(html, covers);
		}).fail(function() {
			alert("Failed to load index articles.");
		});
	}
	
	var loadArticle = function(data, appender) {
		var get1 = $.get('data/' + issue + '/' + data + '.xml'),
			get2 = $.get('renderers/layout.html'),
			get3 = $.get('renderers/cover.html');
			
		$.when(get1, get2, get3).done(function(data1, data2, data3) {
			var article = $.xml2json(data1[0]),
				tmpls = $.templates({
					layoutTemplate: data2[0],
					coverTemplate: data3[0]
				}),
				node = article.layouts.layout,
				cover = $.templates
						 .coverTemplate
						 .render(article),
				html = $.templates
						.layoutTemplate
						.render(node, {versionTested:article.versionTested});
			
			appender(html, cover);
		}).fail(function() {
			alert("Failed to load index articles.");
		});
	}
	
	var loadAside = function(data, $appender, type, versionTested) {
		$appender.html('' + data + '::' + type);
		
		var get1 = $.get('data/' + type + '/' + data + '.xml'),
			get2 = $.get('renderers/gameInfo.html');
			
		$.when(get1, get2).done(function(data1, data2) {
			var aside = $.xml2json(data1[0]),
				tmpls = $.templates({
					layoutTemplate: data2[0]
				}),
				box = getBoxImg(aside.boxes.box, versionTested),
				html = $.templates
						.layoutTemplate
						.render(aside, {formatCommaString:utils.formatCommaString, 
										formatDate:utils.formatDate,
										box:box});
			
			$appender.html(html);
		}).fail(function() {
			alert("Failed to load aside.");
		});
	}
	
	var getBoxImg = function(boxes, versionTested) {

		/**
		 * In XML single child node will return object and not array.
		 */
		 
		if (versionTested) {
			if (boxes.hasOwnProperty('type')) {
				return boxes;
			}
			
			for (var i = 0; i < boxes.length; i++) {
				if (boxes[i].type == versionTested) {
					return boxes[i];
				}
			}
		} 
		
		return false;
	}
	
	var appendAsides = function() {
		$('#read .left, #read .right').each(function() {
			var $this = $(this);
			
			loadAside($this.data('url'), 
					  $this, 
					  $this.data('type'),
					  $this.data('box'));
		});
	}
	
	var appendArticle = function(html, cover) {
		$('main').addClass('read');
		$('header').addClass('read');
		
		if (cover) {
			$('#read').prepend(cover);	
		}
		
		var $cover = $('#read .cover'),
			$hype = $cover.find('li:nth-child(1) p');
		
		loadBackground($cover, $cover);
		
		/**
		 * Set theme color and upated banner style.
		 * Do this here, because the HTML string is ready.
		 * From loadPage the DOM must be used
		 * and there is risk for asynchronous get dealy.
		 */
		
		utils.setTheme($cover.data('theme'));
		
		$('#read').attr('aria-hidden', false);
		$('#read .read-set').append(html);
		
		/**
		 * Replace proxies with real images from the server.
		 */
		
		$('#read .read-set').find('img').on('load', function() {
			if ($(this).data('proxy')) {
				loadImage($(this));
			}
		});
		
		appendAsides();
		
		/**
		 * Append the score at the end of the main content.
		 * Only do this when reading review or feature with score.
		 */
			
		if ($hype.length) {
			$hype.clone()
				 .insertAfter('.read-set .layout:last .center > p:last-of-type')
				 .addClass('hype');
		}
		
		/**
		 * The only way to do the banner animation
		 * is to us fixed height number.
		 * Store them in the banner object from the start.
		 */
		
		banner.setCoversHeight($cover.height());
	}
	
	var appendPortal = function(html, covers) {
		if (covers) {
			appendCovers(html);
		}
		
		$('#topVideos').append(html.find('article.video:lt(5)'));
		
		var id = Math.round(Math.random() * 100000)
		var $players = $('#topVideos').find('.video'),
			$mainPlayer = $('#topVideos').find('.video:eq(2)');
		
		$mainPlayer.attr('id', 'player_' + id);
		$players.addClass('Player');
		$players.find('a').attr('data-player', id);
		$players.find('a').data('player', id);
		
		$('#topArticles').append(html.find('article:lt(5)'));
		$('#allArticles').append(html.html());
		
		/**
		 * Replace proxies with real images from the server.
		 */
		
		$('body').find('img').on('load', function() {
			if ($(this).data('proxy')) {
				loadImage($(this));
			}
		});
	}
	
	var appendCovers = function(html) {
		var $covers = $('#covers'),
			$mainCovers = html.find('article[data-priority=cover]:lt(5):gt(0)'),
			$mainCover = html.find('article[data-priority=cover]:eq(0)');
		
		$mainCovers.find('h3').addClass('clip');
		
		$covers.append(html.find('article[data-priority=cover]:lt(5)'));
		
		$covers.find('article').each(function() {
			loadCover($(this).find('img'), $(this));
		});
		
		$covers.find('img.svg').each(function() {
			utils.convertSVG($(this));
		});
		
		/**
		 * Set theme color and upated banner style.
		 * Do this here, because the HTML string is ready.
		 * From loadPage the DOM must be used
		 * and there is risk for asynchronous get dealy.
		 */
		
		utils.setTheme($mainCover.data('theme'));
		
		/**
		 * The only way to do the banner animation
		 * is to us fixed height number.
		 * Store them in the banner object from the start.
		 */
		
		banner.setCoversHeight($covers.height());
	}
	
	var unloadArticles = function() {
		
		/**
		 * Make sure all players are destroyed.
		 * Otherwise video will not play again.
		 */
		
		if ($('#forVideo').length) {
			window.videoJS.dispose();
		}
		
		$('#covers').children('article').remove();
		$('#thumbnails').children('.thumbnail').remove();
		$('main').children('article').remove();
	}
	
	var loadPage = function(params) {
		var type = params.type,
			url = params.url;
		
		switch (type) {
			case 'portal':
				loadArticles('articles', appendPortal, true);
				break;
			case 'news':
			case 'feature':
			case 'review':
				loadArticle(url, appendArticle);
				loadArticles('articles', appendPortal, false);
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
			utils.convertSVG($(this));
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
	
	/**
	 * Changing URL hash using history.js.
	 * Page is loaded on statechange event.
	 * This is disabled in version 2 and only links are used.
	 */
	
	/*
	$('main').on('click', 'article:not(.Player)', function (e) {
		var $this = $(this);
		
		var type = $(this).data('subtype'),
			url = $this.data('url');
		
		window.History.pushState({'type': type, 'url': url}, url, '?' + type + '=' + url);
	});
	*/
}

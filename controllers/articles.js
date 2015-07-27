function ArticlesManager() {
	
	/**
	 * PRIVATE
	 */
	
	var self = this;
	
	function loadImage($img) {	
	
		/**
		 * For mobile deliver the image for size in landscape.
		 */
		
		var ratio = utils.isMobile() ? 1 * (16/9) : 1,
			src = utils.formatThumborString($img.data('main'),
											Math.round($img.width() * ratio), 
											Math.round($img.height() * ratio));
		
		$img.data('proxy', false);
		$img.attr('data-proxy', $img.data('proxy'));
		
		$img.attr('src', src);
	}
	
	function loadBackground($img, $div) {			
		
		/**
		 * For mobile the image is square.
		 * Also deliver the image for size in landscape.
		 */
		
		var widthRatio = utils.isMobile() ? 1 : 16/9,
			heihgtRatio = utils.isMobile() ? 1 * (16/9) : 1,
			src = utils.formatThumborString($img.data('main'),
											Math.round($div.outerWidth() * heihgtRatio), 
											Math.round(($div.outerWidth() / widthRatio) * heihgtRatio));
		
		$img.data('proxy', false);
		$img.attr('data-proxy', $img.data('proxy'));
		
		$div.css('background-image', 'url(' + src + ')');
	}
	
	function loadCover($img, $div) {			
		
		/**
		 * For mobile the image is 100% width and not 60%.
		 * Also deliver the image for size in landscape.
		 */
		
		var ratio = utils.isMobile() ? 100 * (16/9) : 60, 
			src = utils.formatThumborString($img.data('cover'),
											Math.round($(window).width() * ratio/100), 
											Math.round($(window).width() * ratio/100 / (16/9)));
		
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
				
				/**
				 * Append to empty DIV, so we can find the parent.
				 */
				 
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
						.render(node, {versionTested: article.versionTested});
			
			appender(html, cover);
		}).fail(function() {
			alert("Failed to load index articles.");
		});
	}
	
	var loadAside = function(data, $appender, type, object, versionTested) {
		var get1 = $.get('data/' + type + '/' 
						 		 + object + '/' 
								 + data + '.xml'),
			get2 = $.get('renderers/' + object + '.html');
			
		$.when(get1, get2).done(function(data1, data2) {
			var aside = $.xml2json(data1[0]),
				tmpls = $.templates({
					asideTemplate: data2[0]
				}),
				box = object == 'game' ? getBoxImg(aside.boxes.box, versionTested) : aside.main,
				html = $.templates
						.asideTemplate
						.render(aside, {formatCommaString: utils.formatCommaString, 
										formatDate: utils.formatDate,
										box: box});
			
			$appender.html(html);
			
			/**
			 * Replace proxies with real images from the server.
			 */
			
			if (object == 'caret') {
				$('#read .read-set aside').find('img').on('load', function() {
					if ($(this).data('proxy')) {
						loadImage($(this));
					}
				});
			}
		}).fail(function() {
			alert("Failed to load aside.");
		});
	}
	
	var loadTracklist = function(data, $appender) {
		var get1 = $.get('data/music/album/' + data + '.xml'),
			get2 = $.get('renderers/tracklist.html');
			
		$.when(get1, get2).done(function(data1, data2) {
			var album = $.xml2json(data1[0]),
				tmpls = $.templates({
					tracklistTemplate: data2[0]
				}),
				html = $.templates
						.tracklistTemplate
						.render(album.tracks);
			
			$appender.html(html);
		}).fail(function() {
			alert("Failed to load tracklist.");
		});
	}
	
	var loadThumbnails = function($covers) {
		var get1 = $.get('renderers/thumbnail.html');
			
		$.when(get1).done(function(data1) {
			var html = data1;
			
			$covers.each(function() {
				var $this = $(this),
					$thumb = $(html);
					
				var index;
				
				/**
				 * Index is based on postion on screen.
				 * First cover is always in the middle.
				 */
				
				switch ($this.index()) {
					case 0:
						index = 3;
						break;
					case 1:
					case 2:
						index = $this.index();
						break;
					default:
						index = $this.index() + 1;
						
				}
				
				/**
				 * Cover and thumbnail have the same index.
				 */
				
				$thumb.css('background-image', $this.css('background-image'));
				$this.data('order', index);
				$this.attr('data-order', $this.data('order'));
				$thumb.data('order', index);
				$thumb.attr('data-order', $thumb.data('order'));
				
				$('#thumbnails').append($thumb);
			});
		}).fail(function() {
			alert("Failed to load thumbnail.");
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
		$('#read .left-col, #read .right-col').each(function(index) {
			var $this = $(this);
			
			loadAside($this.data('url'), 
					  $this, 
					  $this.data('type'),
					  $this.data('object'),
					  $this.data('box'));
		});
	}
	
	var appendTracklist = function() {
		$('#read .tracklist').each(function() {
			var $this = $(this);
			
			loadTracklist($this.data('tag'), 
					  	  $this);
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
		appendTracklist();
		
		/**
		 * Append the score at the end of the main content.
		 * Only do this when reading review or feature with score.
		 */
			
		if ($hype.length) {
			$hype.clone()
				 .insertAfter('.read-set .layout.text:last .center-col > p:last-of-type')
				 .addClass('hype');
		}
		
		/**
		 * The only way to do the banner animation
		 * is to use fixed height number.
		 * Store them in the banner object from the start.
		 */
		
		banner.setCoversHeight($cover.height());
	}
	
	var appendNews = function(html, cover) {
		$('main').addClass('read fixed static');
		$('header').addClass('read fixed static');
		
		var $cover = $(cover);
		
		if (cover) {
			$('#read').prepend($cover.filter('section'));
			$('#read .read-set').prepend($cover.filter('.layout'));
			
			$cover = $('#read .cover')
		}
		
		var $coverLayout = $('#read .read-set .layout:eq(0)'),
			$hype = $coverLayout.find('li:nth-child(1) p');
		
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
		
		$coverLayout.prepend($('#read .read-set .layout:eq(1)').find('.left-col'));
		$coverLayout.append($('#read .read-set .layout:eq(1)').find('.right-col'));
		
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
				 .insertAfter('.read-set .layout.text:last .center-col > p:last-of-type')
				 .addClass('hype');
		}
		
		/**
		 * The only way to do the banner animation
		 * is to use fixed height number.
		 * Store them in the banner object from the start.
		 */
		
		banner.setCoversHeight(0);
	}
	
	var appendPortal = function(html, covers) {
		if (covers) {
			appendCovers(html);
		}
		
		$('#topVideos').append(html.find('article.video:lt(5)'));
		
		var id = Math.round(Math.random() * 100000);
		
		var $players = $('#topVideos').find('.video'),
			$mainPlayer = $('#topVideos').find('.video:eq(2)');
		
		$mainPlayer.find('.img-proxy').attr('id', 'player_' + id);
		$players.find('.img-proxy').addClass('Player');
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
			$mainCovers = html.find('article[data-priority=cover]:lt(5)'),
			$mainCover = html.find('article[data-priority=cover]:eq(0)');
		
		$covers.append($mainCovers);
		$covers.find('article').each(function() {
			loadCover($(this).find('img'), $(this));
		});
		$covers.find('img.svg').each(function() {
			utils.convertSVG($(this));
		});
		
		loadThumbnails($mainCovers);
		
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
			case 'feature':
			case 'review':
				loadArticle(url, appendArticle);
				loadArticles('articles', appendPortal, false);
				break;
			case 'news':
			case 'video':
				loadArticle(url, appendNews);
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

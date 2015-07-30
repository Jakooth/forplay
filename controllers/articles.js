function ArticlesManager() {
	
	/**
	 * PRIVATE
	 */
	
	var self = this;
	
	function loadImage($img) {	
	
		/**
		 * For mobile deliver the image for size in landscape.
		 * For priority review use different visuals.
		 */
		
		var isCaret = $img.parents('#topReviews').length || 
					  $img.parents('[data-priority=review]').length > 0 ? true 
					  													: false,
		/**
		 * For the second top review use the solid main image.
		 */		
			
			main = isCaret && 
				   $img.parents('[data-priority=review]').index() != 2 ? $img.data('caret') 
				   												  	   : $img.data('main'),
			ratio = utils.isMobile() ? 1 * (16/9) 
									 : 1,
			height = isCaret ? $img.width() * ratio 
							 : $img.height() * ratio,
			src = utils.formatTimThumbString(main,
											 Math.round($img.width() * ratio), 
											 Math.round(height));
		
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
			src = utils.formatTimThumbString($img.data('main'),
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
			src = utils.formatTimThumbString($img.data('cover'),
											 Math.round($(window).width() * ratio/100), 
											 Math.round($(window).width() * ratio/100 / (16/9)));
		
		$img.data('proxy', false);
		$img.attr('data-proxy', $img.data('proxy'));
		
		$div.css('background-image', 'url(' + src + ')');
	}
	
	var loadArticles = function(data, appender, covers) {
		var get1 = $.get(encodeURI('data/' + issue + 
								   '/' + data + '.xml')),
			get2 = $.get('renderers/article.html');
		
		/**
		 * TODO: This bad practice will be removed,
		 * when the data is loaded from the database.
		 */
		
		if (utils.isIE9()) {
			get1 = $.get(encodeURI('data/' + issue + 
								   '/' + data + '.xml'));
		} else {
			get1 = $.get('data/' + issue + 
						 '/' + data + '.xml');
		}
		
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
			console.log("Failed to load index articles.");
		});
	}
	
	var loadArticle = function(data, appender) {
		var get1,
			get2 = $.get('renderers/layout.html'),
			get3 = $.get('renderers/cover.html');
		
		/**
		 * TODO: This bad practice will be removed,
		 * when the data is loaded from the database.
		 */
		
		if (utils.isIE9()) {
			get1 = $.get(encodeURI('data/' + issue + 
								   '/' + data + '.xml'));
		} else {
			get1 = $.get('data/' + issue + 
						 '/' + data + '.xml');
		}
			
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
			
			$(document).prop('title', article.title);
		}).fail(function() {
			console.log("Failed to load index articles.");
		});
	}
	
	var loadAside = function(data, $appender, type, object, versionTested) {
		var get1,
			get2 = $.get('renderers/' + object + '.html');
			
		
		/**
		 * TODO: This bad practice will be removed,
		 * when the data is loaded from the database.
		 */
		
		if (utils.isIE9()) {
			get1 = $.get(encodeURI('data/' + type + 
								   '/' + object + 
								   '/' + data + '.xml'));
		} else {
			get1 = $.get('data/' + type + 
						 '/' + object + 
						 '/' + data + '.xml');
		}
		
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
			console.log("Failed to load aside.");
		});
	}
	
	var loadTracklist = function(data, $appender) {
		var get1 = $.get(encodeURI('data/music/album/' + data + '.xml')),
			get2 = $.get('renderers/tracklist.html');
			
		/**
		 * TODO: This bad practice will be removed,
		 * when the data is loaded from the database.
		 */
		
		if (utils.isIE9()) {
			$.get(encodeURI('data/music/album/' + data + '.xml'));
		} else {
			$.get('data/music/album/' + data + '.xml');
		}
		
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
			console.log("Failed to load tracklist.");
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
			console.log("Failed to load thumbnail.");
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
		$('#topReviews').append(html.find('article[data-priority=review]' + 
										  '').filter(':lt(3)'));
		
		var id = Math.round(Math.random() * 100000);
		
		var $players = $('#topVideos').find('.video'),
			$mainPlayer = $('#topVideos').find('.video:eq(2)');
		
		$mainPlayer.find('.img-proxy').attr('id', 'player_' + id);
		$players.find('.img-proxy').addClass('Player');
		$players.find('a').attr('data-player', id);
		$players.find('a').data('player', id);
		
		$('#topArticles').append(html.find('article:not(.video):lt(5)'));
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
				
				/**
				 * TODO: Determine which portal anr remove the hardcoded strings.
				 */
				$(document).prop('title', 'Forplay Брой 1 Презареждане');
				
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
	
	$(window).on('load', function () {
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
		var href = window.location.href;
		
		/**
		 * Replace SVG images with embed SVG data.
		 * This allows to change color with CSS.
		 */
		  
		$('img.svg').each(function() {
			utils.convertSVG($(this));
		});
		
		loadPage(utils.parseURL(href));
		
		/**
		 * Always show the portal in the URL.
		 */
		
		if (href.indexOf('review') == -1 && 
			href.indexOf('feature') == -1 &&
			href.indexOf('video') == -1 &&
			href.indexOf('news') == -1 &&
			href.indexOf('portal') == -1 &&
			href.indexOf('?') == -1) {
			
			/**
			 * TODO: Determine which portal anr remove the hardcoded strings.
			 * Not working in IE9.
			 */
			 
			if (window.history.replaceState) {
				window.history.replaceState('portal-issue-1-reboot', 
											'Forplay Брой 1 Презареждане', 
											'?portal=issue-1-reboot');
			}
		}
	});
}

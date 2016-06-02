function ArticlesManager() {
	
	/**
	 * PRIVATE
	 */
	
	var self = this;
	var forplayAPI = '/forapi/forplay.php';
	var fotagsAPI = '/forapi/get.php';
	
	/**
	 * Lazy loading of articles.
	 */
	
	var firstArticles = 0;
	var lastArtcle = 50;
	var articlesOffset = 50;
	
	var getCurrentArticleSet = function() {
		var p = window.scrollY,
			
			/**
			 * @articlesAvarage number of articles on a row.
			 */
			
			articlesAvarage = utils.isMobile() ? 1 : 5,
			layoutHeight = $('#topArticles article').height(),
			
			/**
			 * @layoutsAvarage number of layouts in a set.
			 */
			
			layoutsAvarage = articlesOffset / articlesAvarage,
			offset = (Math.floor(p / layoutHeight / layoutsAvarage) + 1) * 
					 articlesOffset + 
					 articlesOffset;
		
		/**
		 * Sometimes the window will scroll on load
		 * or simply we did not scrolled enough to require more.
		 */
		
		if (offset <= lastArtcle || !layoutHeight) {
			return false;
		}
		
		return {lastArtcle: lastArtcle, 
				articleRange: offset}
	}
	
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
	
	var loadArticles = function(data, appender, covers, offset) {
		var offset = offset || 0,
			get1 = $.get(encodeURI(forplayAPI + '?offset=' + offset)),
			get2 = $.get('/renderers/article.html');
		
		$.when(get1, get2).done(function(data1, data2) {
			var data = data1[0].length ? JSON.parse(data1[0]) : data1,
				tmpls = $.templates({
					articleTemplate: data2[0]
				}),
				
				/**
				 * Append to empty DIV, so we can find the parent.
				 */
				 
				html = $('<div />').append($.templates
										    .articleTemplate
											.render(data.articles, {
													unescape: utils.unescape,
													translate: utils.translate}));
			
			appender(html, covers, data);
		}).fail(function() {
			console.log("Failed to load index articles.");
		});
	}
	
	var loadArticle = function(data, appender) {
		var get1 = $.get(encodeURI(forplayAPI + '?tag=' + data.id)),
			get2 = $.get('/renderers/layout.html'),
			get3 = $.get('/renderers/cover.html');
			
		$.when(get1, get2, get3).done(function(data1, data2, data3) {
			var article = data1[0].length ? 
						  JSON.parse(data1[0]).articles[0] : 
						  data1.articles[0],
				tmpls = $.templates({
					layoutTemplate: data2[0],
					coverTemplate: data3[0]
				});
			
			var	cover = $.templates
						 .coverTemplate
						 .render(article, {
								 unescape: utils.unescape,
								 translate: utils.translate,
								 hypeToString: utils.hypeToString}),
				html = $.templates
						.layoutTemplate
						.render(article.layouts, {
								unescape: utils.unescape,
								translate: utils.translate});
			
			appender(html, cover, article);
			
			
			
			/**
			 * Now injecting this with PHP for crawlers.
			 */
			
			/*
			$(document).prop('title', article.title + ' ' + utils.translate(article.subtype));			
			$('meta[name=description]').attr('content', article.subtitle + ', Aвтор: ' + 
														utils.getObjectPropertyAsString(article.authors, 'en_name') + ', Категория: ' +
														article.type + ', Относно: ' +
														utils.getObjectPropertyAsString(article.tags, 'en_name'));
			$('meta[property="og:url"]').attr('content', window.location.href);
			$('meta[property="og:type"]').attr('content', 'article');
			$('meta[property="og:title"]').attr('content', article.title);
			$('meta[property="og:description"]').attr('content', article.subtitle);
			$('meta[property="og:image"]').attr('content', utils.formatTimThumbString(article.cover_img, 1280, 720));
			*/
		}).fail(function() {
			console.log("Failed to load index articles.");
		});
	}
	
	/**
	 * The API for aside and quote is different.
	 */
	var loadAside = function($appender, tag, object, data) {
		var get1,
			get2 = $.get('/renderers/' + object + '.html');
			
		if (object == 'quote' || 
			object == 'review' || 
			object == 'feature' ||
			object == 'video' || 
			object == 'aside') {
			
			get1 = $.get(encodeURI(forplayAPI + '?tag=' + tag));
		} else {
			get1 = $.get(encodeURI(fotagsAPI + '?tag=' + tag + '&object=' + object));
		}	
		
		$.when(get1, get2).done(function(data1, data2) {
			var aside = data1[0].length ? 
						JSON.parse(data1[0]).tags ? 
							JSON.parse(data1[0]).tags[0] : 
							JSON.parse(data1[0]).articles[0] : 
						data1.tags ? 
							data1.tags[0] : 
							data1.articles[0], 	
				tmpls = $.templates({
					asideTemplate: data2[0]
				}),
				html = $.templates
						.asideTemplate
						.render(aside, {getObjectsByProperty: utils.getObjectsByProperty, 
										formatDate: utils.formatDate,
										versionTested: data.version_tested,
										unescape: utils.unescape});
			
			$appender.html(html);
			
			/**
			 * Replace proxies with real images from the server.
			 */
			
			if (object == 'aside') {
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
	
	var loadTracklist = function($appender, tag) {
		var get1 = $.get(encodeURI(fotagsAPI + '?tag=' + tag)),
			get2 = $.get('/renderers/tracklist.html');
		
		$.when(get1, get2).done(function(data1, data2) {
			var album = data1[0].length ? 
						JSON.parse(data1[0]).tags[0] : 
						data1.tags[0],
				tmpls = $.templates({
					tracklistTemplate: data2[0]
				}),
				html = $.templates
						.tracklistTemplate
						.render(album);
			
			$appender.html(html);
		}).fail(function() {
			console.log("Failed to load tracklist.");
		});
	}
	
	var loadThumbnails = function($covers) {
		var get1 = $.get('/renderers/thumbnail.html');
			
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
	
	var appendAsides = function(data) {
		$('#read .left-col, #read .right-col').each(function(index) {
			var $this = $(this);
			
			loadAside($this, 
					  $this.data('url'),
					  $this.data('object'),
					  data);
		});
	}
	
	var appendTracklist = function() {
		$('#read .tracklist').each(function() {
			var $this = $(this);
			
			loadTracklist($this,
						  $this.data('tag'));
		});
	}
	
	var appendArticle = function(html, cover, data) {
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
		
		appendAsides(data);
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
	
	var appendNews = function(html, cover, data) {
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
		
		appendAsides(data);
		
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
	
	/**
	 * This is used to dynamically load more articles on scroll.
	 */
	
	var appendArticles = function(html) {
		var lastImg = $('#allArticles img').length;
	
		$('#allArticles').append(html.html());
	
		$('#allArticles').find('img:gt(' + (lastImg - 1) + ')')
						 .on('load', function() {
			
			if ($(this).data('proxy')) {
				loadImage($(this));
			}
		});
	}
	
	/**
	 * The page is initialized with a portal.
	 */
	
	var appendPortal = function(html, covers, data) {
		if (covers) {
			appendCovers(html);
			
			/**
			 * Set the document title for the home page, 
			 * which is the issue of the most recent article.
			 */
			
			/*
			$(document).prop('title', 'Forplay брой ' + 
									  data.articles[0].issue_tag + ' ' + 
									  data.articles[0].issue);
			*/
		}
		
		/**
		 * Append 5 videos. Most recent is in the middle.
		 */
		
		$('#topVideos').append(html.find('article.video:gt(1):lt(2)'));
		$('#topVideos').append(html.find('article.video:lt(3)'));
		
		/**
		 * Append 3 reviews. Most recent is in the middle.
		 */
		
		$('#topReviews').append(html.find('article[data-priority=review]' + 
										  '').filter(':gt(1):lt(1)'));
		$('#topReviews').append(html.find('article[data-priority=review]' + 
										  '').filter(':lt(2)'));
		
		var id = Math.round(Math.random() * 100000);
		
		var $players = $('#topVideos').find('.video'),
			$mainPlayer = $('#topVideos').find('.video:eq(2)');
		
		$mainPlayer.find('.img-proxy').attr('id', 'player_' + id);
		$players.find('.img-proxy').addClass('Player');
		
		/**
		 * First, because there could be author or other links.
		 */
		 
		$players.find('a:eq(0)').attr('data-player', id);
		$players.find('a:eq(0)').data('player', id);
		
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
		switch (params.subtype) {
			case 'feature':
			case 'review':
				loadArticle(params, appendArticle);
				loadArticles('articles', appendPortal, false);
				
				break;
			case 'news':
			case 'video':
				loadArticle(params, appendNews);
				loadArticles('articles', appendPortal, false);
				
				break;
			default:
				loadArticles('articles', appendPortal, true);
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
	
	$(window).on('scroll', function () {
		var set = getCurrentArticleSet();
		
		if (set) {
			lastArtcle = set.articleRange;
			
			loadArticles('articles', appendArticles, false, set.lastArtcle);
		}
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
		
		loadPage(utils.parsePrettyURL(href));
	});
}

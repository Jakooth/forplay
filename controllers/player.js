function PlayerManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this; 
	
	/**
	 * Create video player element.
	 * For performance only one player is created at a time.
	 */	
	  
	function createVideo($div, url, tech, poster, autoplay) {
		var attributes = {
			'id': 'forVideo',
			'class': 'video-js vjs-default-skin'
		}
		
		$div.append($('<video />').attr(attributes));
		
		window.videoJS = videojs('forVideo', {
								 "controls": true,
								 "autoplay": autoplay,
								 "ytcontrols": true,
								 "playsInline": true,
								 "preload": "auto",
								 "techOrder": [tech],
								 "height": "100%",
								 "width": "100%",
								 "src": url,
								 "poster": poster}, function () {	
			
			this.show();
			this.src(url);
			
			this.one('ended', function() {
				$('.Player').removeClass('playing');
				this.hide();
			});
		});
	}
  
  function _createStandaloneVideo($a) {
	  var $player = $a.parents('.Player'), 
        $img = $player.find('img');

		var url = $a.data('video'),
        tech = $a.data('tech'),
        poster = $img.attr('src');
    
		var attributes = {
			'id': $player.prop('id') + '_forVideo',
			'class': 'video-js vjs-default-skin'
		}
		
		$player.append($('<video />').attr(attributes));
		
		videojs(attributes.id, {
								 "controls": true,
								 "autoplay": false,
								 "ytcontrols": true,
								 "playsInline": true,
								 "preload": "auto",
								 "techOrder": [tech],
								 "height": "100%",
								 "width": "100%",
								 "src": url,
								 "poster": poster}, function () {	
			
			this.show();
			this.src(url);
      
      $player.attr('aria-busy', false);
			
			this.one('ended', function() {
				this.hide();
			});
		});
	}
	
	function swapVideos(s, l) {
		var $sProxy = s.find('.img-proxy'),
			$lProxy = l.find('.img-proxy'),
			$sLink = s.find('.img-proxy a'),
			$lLink = l.find('.img-proxy a'),
			$sHeading = s.find('h3').eq(0),
			$lHeading = l.find('h3').eq(0),
			$sAuthor = s.find('p:eq(0)').eq(0),
			$lAuthor = l.find('p:eq(0)').eq(0),
			$sPreview = s.find('p:eq(1)').eq(0),
			$lPreview = l.find('p:eq(1)').eq(0);
			
		var	sSubtype = s.data('subtype'),
			lSubtype = l.data('subtype');
		
		s.data('subtype', lSubtype);
		l.data('subtype', sSubtype);
		s.attr('data-subtype', s.data('subtype'));
		l.attr('data-subtype', l.data('subtype'));
		$sProxy.data('subtype', lSubtype);
		$lProxy.data('subtype', sSubtype);
		$sProxy.attr('data-subtype', s.data('subtype'));
		$lProxy.attr('data-subtype', l.data('subtype'));
		
		$sProxy.after($lHeading);
		$sProxy.after($lAuthor);
		$sProxy.after($lPreview);
		$sProxy.prepend($lLink);
		$lProxy.after($sHeading);
		$lProxy.after($sAuthor);
		$lProxy.after($sPreview);
		$lProxy.prepend($sLink);	
	}
	
	/**
	 * @player is the link inside the Player class element.
	 */
	
	function _embedVideo($player, autoplay) {
		var $this = $player, 
        $img = $this.find('img'),
        $player = $this.parents('.Player');
        $mainPlayer = $('#player_' + $this.data('player'));
			
		var url = $this.data('video'),
        tech = $this.data('tech'),
        poster = $img.attr('src');													
		
		/**
		 * Check if the player is running to prevent clicks;
		 * This is done to not interfere with player controls.
		 */
		
		if ($player.hasClass('playing')) {
			return false;
		} else {
			$('.Player').removeClass('playing');
			$mainPlayer.addClass('playing');
		}
		
		/**
		 * Video.js does not allow reparenting existing players.
		 * So destroy player in another video set, if any.
		 */
		  
		if ($('#forVideo').length && !$mainPlayer.find('#forVideo').length) {
			window.videoJS.dispose();
		}
		
		/**
		 * Video.js has problem switching to vimeo and html5.
		 * So destroy it, if either current or next video is not youtube.
		 */
		
		if (window.videoJS && $mainPlayer.find('a').data('tech') != 'youtube') {
			window.videoJS.dispose();	
		}
		
		if (window.videoJS && tech != 'youtube') {
			window.videoJS.dispose();	
		}
		
		/**
		 * First swap videos and than create a player.
		 */
		  
		if (!$player.prop('id')) {
			swapVideos($player.parents('article'), 
					       $mainPlayer.parents('article'));		
		}
		
		/**
		 * Vimeo plug-in does not work with the src method,
		 * same goes for html5, 
		 * thus create new player every time.
		 * For all other cases just change the source.
		 */
		 
		if ($('#forVideo').length 
			  && window.videoJS
			  && $mainPlayer.find('#forVideo').length 
			  && tech == 'youtube') {
			
			window.videoJS.show();
			window.videoJS.src(url);
			window.videoJS.poster(poster);
			
			return false;
		} else {				
			createVideo($mainPlayer, url, tech, poster, autoplay);
			
			return false;
		}	
	}
	
	
	
	
	
	
	
	
	/** 
	 * PUBLIC
	 */
	 
	this.embedVideo = function($player, autoplay) {
		_embedVideo($player, autoplay)
	}
  
  this.createStandaloneVideo = function($player) {
		_createStandaloneVideo($player)
	}
	
	
	
	
	
	
	
	
	/** 
	 * EVENTS
	 */
	
	/**
	 * Replace an image with video stream.
	 * Small movies in a video set layout are displayed in a single large player.
	 */
	
	$('body').on('click', '#read .Player a', function (e) {	
		var $this = $(this);
		
		/**
		 * For mobile always open the video and not the article.
		 */
		
		if (utils.isMobile()) {
			$this.attr('href', $this.data('video'));
			$this.attr('target', '_blank');
			
			return;
		}
	});
	  
	$('body').on('click', '#topVideos .Player a, ' + 
                        '[data-subtype=video] #read .Player a[data-tech!=youtube], ' + 
                        '[data-subtype=news] #read .Player a[data-tech!=youtube], ' + 
                        '[data-subtype=news] #read .Player a[data-tech=youtube], ' + 
                        '[data-subtype=video] #read .Player a[data-tech=youtube], ' +
                        '[data-subtype=review] #read .Player a, ' + 
                        '[data-subtype=feature] #read .Player a', function (e) {
							  
		var $this = $(this);
		
		/**
		 * For mobile always open the video and not the article.
		 */
		
		if (utils.isMobile()) {
			$this.attr('href', $this.data('video'));
			$this.attr('target', '_blank');
			
			return;
		}
		
		e.preventDefault();
		
		_embedVideo($(this), true);
		
		return false;
	});
}

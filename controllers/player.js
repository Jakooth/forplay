function PlayerManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this; 
	
	/**
	 * Create video player element.
	 * For performance only one player is created at a time.
	 */	
	  
	function createVideo($div, url, tech, poster) {
		var attributes = {
			'id': 'forVideo',
			'class': 'video-js vjs-default-skin'
		}
		
		$div.append($('<video />').attr(attributes));
		
		window.videoJS = videojs('forVideo', {
								"controls": true, 
								"autoplay": true, 
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
	
	function swapVideos(s, l) {
		var $sProxy = s.find('.img-proxy'),
			$lProxy = l.find('.img-proxy'),
			$sLink = s.find('.img-proxy a'),
			$lLink = l.find('.img-proxy a'),
			$sHeading = s.find('h3').eq(0),
			$lHeading = l.find('h3').eq(0);
		
		$sProxy.after($lHeading);
		$sProxy.prepend($lLink);
		$lProxy.after($sHeading);
		$lProxy.prepend($sLink);
	}
	
	
	
	
	
	
	
	
	/** 
	 * EVENTS
	 */
	
	/**
	 * Replace an image with video stream.
	 * Small movies in a video set layout are displayed in a single large player.
	 */
	  
	$('main').on('click', '.Player a', function (e) {
		var $this = $(this), 
			$img = $this.find('img'),
			$player = $this.parents('.Player');
			$mainPlayer = $('#player_' + $this.data('player'));
			
		var url = $this.data('video'),
			tech = $this.data('tech'),
			poster = $img.attr('src');
		
		/**
		 * For mobile always open the video and not the article.
		 */
		
		if (utils.isMobile()) {
			$this.attr('href', $this.data('video'));
			$this.attr('target', '_blank');
			
			return;
		}													
		
		e.preventDefault();
		
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
			swapVideos($player, $mainPlayer);		
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
			createVideo($mainPlayer, url, tech, poster);
			
			return false;
		}		
	});
}

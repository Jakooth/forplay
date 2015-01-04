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
				$('.player').removeClass('playing');
				this.hide();
			});
		});
	}
	
	function swapVideos(smallImg, largeImg) {
		var $smallImg = smallImg.find('.img'),
			$largeImg = largeImg.find('.img'),
			$smallImgPoster = smallImg.find('img').eq(0),
			$largeImgPoster = largeImg.find('img').eq(0),
			$smallImgHeading = smallImg.find('h2').eq(0),
			$largeImgHeding = largeImg.find('h2').eq(0);
			
		var smallImgTech = $smallImg.data('tech'),
			largeImgTech = $largeImg.data('tech'),
			smallImgUrl = $smallImg.data('url'),
			largeImgUrl = $largeImg.data('url');		
		
		/**
		 * Swap attributes and children one bu one, to keep the player.
		 */
		
		$smallImg.prepend($largeImgHeding);
		$smallImg.prepend($largeImgPoster);
		$largeImg.prepend($smallImgHeading);
		$largeImg.prepend($smallImgPoster);
		$smallImg.data('tech', largeImgTech);
		$largeImg.data('tech', smallImgTech);
		$smallImg.data('url', largeImgUrl);
		$largeImg.data('url', smallImgUrl);
		
		/**
		 * jQuery will not set the data attribute.
		 * It will just change the bound data object value.
		 */
		
		$smallImg.attr('data-tech', $smallImg.data('tech'));
		$largeImg.attr('data-tech', $largeImg.data('tech'));
		$smallImg.attr('data-url', $smallImg.data('url'));
		$largeImg.attr('data-url', $largeImg.data('url'));
	}
	
	
	
	
	
	
	
	
	/** 
	 * EVENTS
	 */
	
	/**
	 * Replace an image with video stream.
	 * Small movies in a video set layout are displayed in a single large player.
	 */
	  
	$('main').on('click', '.player', function (e) {												 
		var $this = $(this), 
			$img = $this.find('img'), 
			$div = $this.find('.img'),
			$a = $this.find('a'),
			$player = $('#' + $div.data('player'));
			
		var url = $div.data('url'),
			tech = $div.data('tech'),
			poster = $img.attr('src');
		
		/**
		 * Check if the player is running to prevent clicks;
		 * This is done to not interfere with player controls.
		 */
		
		if ($this.hasClass('playing')) {
			return false;
		} else {
			$('.player').removeClass('playing');
			$player.addClass('playing');
		}
		
		/**
		 * Video.js does not allow reparenting existing players.
		 * So destroy player in another video set, if any.
		 */
		  
		if ($('#forVideo').length && !$player.find('#forVideo').length) {
			window.videoJS.dispose();
		}
		
		/**
		 * Video.js has problem switching to vimeo and html5.
		 * So destroy it, if either current or next video is not youtube.
		 */
		
		if (window.videoJS && $player.find('.img').data('tech') != 'youtube') {
			window.videoJS.dispose();	
		}
		
		if (window.videoJS && tech != 'youtube') {
			window.videoJS.dispose();	
		}
		
		/**
		 * First swap videos and than create a player.
		 */
		  
		if ($(this).hasClass('small')) {
			swapVideos($this, $player);		
		}
		
		/**
		 * Vimeo plug-in does not work with the src method,
		 * same goes for html5, 
		 * thus create new player every time.
		 * For all other cases just change the source.
		 */
		 
		if ($('#forVideo').length 
			  && window.videoJS
			  && $player.find('#forVideo').length 
			  && tech == 'youtube') {
			
			window.videoJS.show();
			window.videoJS.src(url);
			window.videoJS.poster(poster);
			
			return false;
		} else {				
			createVideo($player.find('.img'), url, tech, poster);
			
			return false;
		}		
	});
}

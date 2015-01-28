function UtilsManager() {
	
	/** 
	 * PUBLIC
	 */
	 
	var self = this; 
	
	this.convertSVG = function($img) {		
		var	imgID = $img.attr('id'),
			imgClass = $img.attr('class'),
			imgURL = $img.attr('src'),
			imgGet = $.get(imgURL);	
	
		$.when(imgGet).done(function(data) {
			var $svg = $(data).find('svg');
	
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
				
				/**
				 * The logic to set logo aspect ratio goes here.
				 */
				
				if (!utils.isMobile()) {
					if (imgID == "forPlayCovers") {
						$svg.attr('preserveAspectRatio', 'xMinYMin meet');
					}
					
					if (imgID == "forLifeCovers") {
						$svg.attr('preserveAspectRatio', 'xMaxYMax meet');
					}
				} else {
					$svg.attr('height', '12%');	
				}
			}
			
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}
			
			$img.replaceWith($svg);
		}).fail(function() {
			alert("Failed to convert SVG.");
		});
	}
	
	this.isMobile = function() {
		return screen.width > 960 ? false : true;
	}
	
	this.setThemeColor = function(color) {
		var $body = $('body');
		
		$body.removeClass();
		$body.addClass($body.data('side'));
		$body.addClass(color);
		
		/**
		 * Halloween ;)
		 */
		
		/* $body.addClass('dark'); */
	}
	
	this.trimText = function(html, symbols) {
		var text = $(html).html();
		
		if (symbols && symbols > 0) {
			text = text.slice(0, symbols);
			text += '...';
		} else if (!symbols) {
			text = text.slice(0, text.length - 1);
			text += '...';
		}
		
		return '<p>' + text + '</p>';	
	}
	
	this.formatCommaString = function (s) {
		/**
		 * In XML single child node will return string and not array.
		 */
		
		return typeof(s) == "string" ? s : s.join(', ');	
	}
	
	this.parseURL = function(url) {
		var url = url.split('?'),
			params = url[1] ? url[1].split('=') : ['portal', issue];
			
		return {type: params[0], url: params[1]};		
	}
	
	/**
	 * To change the format of the string needed from the image server
	 * just modify the correspoding function.
	 * For the basic ICN hosting unsafe TimThumb php script is used.
	 * The final version will use Thumbor with hash encryption.
	 * Because we append on the fly, the browser does not calculate
	 * the height correctly, thus we do this manually.
	 */
	
	this.formatTimThumbString = function(tag, count, width, height) {
		var service = 'http://forplay.bg/phplib/timthumb/timthumb.php';
		
		return service + '?src=/assets/articles/' + tag + 
						 '/' + tag + '-' + count + 
						 '&w=' + width + 
						 '&h=' + height;
	}
	
	this.formatThumborString = function(tag, count, width, height) {
		var service = 'http://192.168.1.166:8888/unsafe/';
		
		return service + width + 'x' + height + 
								 '/forplay.bg/assets/articles/' + tag + 
								 '/' + tag + '-' + count;
	}
}
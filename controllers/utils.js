function UtilsManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	
	
	
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	this.xml = function(obj, tmpl, appender) {
		var get1 = $.get('../foradmin/renderers/xml/' + tmpl + '.html'),
			get2 = $.get('../foradmin/renderers/xml/textLayout.html'),
			get3 = $.get('../foradmin/renderers/xml/imgLayout.html');
			
		$.when(get1, get2, get3).done(function(data1, data2, data3) {
			var tmpls = $.templates({
					xmlTemplate: data1[0],
					textLayout: data2[0],
					imgLayout: data3[0]
				}),
				xml = $.templates.xmlTemplate.render(obj);
				
			var $appender = $(appender);	
				
			$appender.text(xml);
			$appender.height($appender.prop('scrollHeight'));
		}).fail(function() {
			console.log("Failed to load xml template.");
		});
	}
	
	this.today = function() {
		var d = new Date();
		
		return d.getFullYear() +
			   (d.getMonth() > 9 ? '-' : '-0') +
			   d.getMonth() +
			   (d.getDate() > 9 ? '-' : '-0') +
			   d.getDate();
	}
	
	this.now = function() {
		var d = new Date();
		
		return (d.getHours() > 9 ? '' : '0') + 
			   d.getHours() +
			   ':' +
			   (d.getMinutes() > 9 ? '' : '0') +
			   d.getMinutes();
	}
	
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
			console.log("Failed to convert SVG.");
		});
	}
	
	this.isMobile = function() {
		return $(window).width() > 960 ? false : true;
	}
	
	this.setTheme = function(theme) {
		var $body = $('body');
		
		$body.removeClass();
		$body.addClass(theme);
		
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
	
	this.formatComaString = function (s) {
		
		/**
		 * In XML single child node will return string and not array.
		 */
		
		return typeof(s) == "string" ? s : s.join(', ');	
	}
	
	this.formatDate = function (d) {
		var d = new Date(d),
			m = ['Януари', 'Февруари', 'Март', 
				 'Април', 'Май', 'Юни',
				 'Юли', 'Август', 'Септеври',
				 'Октомври', 'Ноември', 'Декември'];
		
		if (!d.getDate()) {
			return "няма";
		}
		
		return d.getDate() + ' ' + m[d.getMonth()]  + ' ' + d.getFullYear();	
	}
	
	this.formatTag = function (s) {
		var tag = s.toLowerCase().replace(/[:?\.,!()'„“]|– |- /g, '');
		
		tag = tag.replace(/ /g, '-');
		
		return tag;	
	}
	
	this.parseImg = function (s) {
		var img = s.split('\\').pop().split('.')[0].toLowerCase();
		
		return img;	
	}
	
	this.parseStickerName = function (s) {
		var name = s.replace(/-/g, ' ');
		
		return name.charAt(0).toUpperCase() + name.slice(1);;	
	}
	
	this.parseImgIndex = function (s) {
		
		/**
		 * Images names are made from tag and number.
		 * Fisrst strip the path, than strip the tag.
		 * Only store the image index and format.
		 */
		
		var index = s.split('/').pop().split('-').pop();
		
		return index;	
	}
	
	this.getObjectPropertyByIndex = function(o, index) {
		return o[Object.keys(o)[index]];
	}
	
	this.parseURL = function(url) {
		var url = url.split('?'),
			params = url[1] ? url[1].split('=') : ['portal', issue];
			
		return {type: params[0], url: params[1]};		
	}
	
	/**
	 * To change the format of the string needed from the image server
	 * just modify the corresponding function.
	 * For the basic ICN hosting unsafe TimThumb PHP script is used.
	 * The final version will use Thumbor with hash encryption.
	 * Because we append on the fly, the browser does not calculate
	 * the height correctly, thus we do this manually.
	 */
	
	this.formatTimThumbString = function(tag, width, height) {
		var service = 'http://forplay.bg/phplib/timthumb/timthumb.php';
		
		return service + '?src=/assets/articles/' + 
						 tag.substring(0, tag.lastIndexOf('-')) + 
						 '/' + tag + 
						 '&w=' + width + 
						 '&h=' + height;
	}
	
	/**
	 * This is the Polygon resizing service.
	 * Using it only for local testing until we find hosting.
	 * The first service IP is the VM box IP (Linux ifconfig to get it).
	 * The second IP is the localhost network address (Windows ipconfig to get it).
	 */
	
	this.formatThumborString = function(tag, width, height) {
		var service = 'http://192.168.1.137:8888/unsafe/';
		
		return service + width + 'x' + height + 
								 '/192.168.1.124:8080/forplay/assets/articles/' + 
								 tag.substring(0, tag.lastIndexOf('-')) +
								 '/' + tag;
	}
	
	/**
	 * This is used for temporary solution to request XML files
	 * with unicode characters.
	 */
	
	this.isIE9 = function() {
   		return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10;
	}
}
function UtilsManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	
	
	
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	this.xml = function(obj, tmpl, appender) {
		var get1 = $.get('../renderers/xml/' + tmpl + '.html'),
			get2 = $.get('../renderers/xml/textLayout.html');
			
		$.when(get1, get2).done(function(data1, data2) {
			var tmpls = $.templates({
					xmlTemplate: data1[0],
					textLayout: data2[0]
				}),
				xml = $.templates.xmlTemplate.render(obj);
				
			var $appender = $(appender);	
				
			$appender.text(xml);
			$appender.height($appender.prop('scrollHeight'));
		}).fail(function() {
			alert("Failed to load xml template.");
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
			alert("Failed to convert SVG.");
		});
	}
	
	this.isMobile = function() {
		return screen.width > 960 ? false : true;
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
	
	this.formatCommaString = function (s) {
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
		
		
		return d.getDate() + ' ' + m[d.getMonth()]  + ' ' + d.getFullYear();	
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
	
	this.formatTimThumbString = function(tag, name, width, height) {
		var service = 'http://forplay.bg/phplib/timthumb/timthumb.php';
		
		return service + '?src=/assets/articles/' + tag + 
						 '/' + tag + '-' + name + 
						 '&w=' + width + 
						 '&h=' + height;
	}
	
	this.formatThumborString = function(tag, name, width, height) {
		var service = 'http://192.168.1.166:8888/unsafe/';
		
		return service + width + 'x' + height + 
								 '/forplay.bg/assets/articles/' + tag + 
								 '/' + tag + '-' + name;
	}
}
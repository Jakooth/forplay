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
			   ((d.getMonth() + 1) > 9 ? '-' : '-0') +
			   (d.getMonth() + 1) +
			   (d.getDate() > 9 ? '-' : '-0') +
			   d.getDate();
	}
	
	this.now = function() {
		var d = new Date();
		
		return (d.getHours() > 9 ? '' : '0') + 
			   d.getHours() +
			   ':' +
			   (d.getMinutes() > 9 ? '' : '0') +
			   d.getMinutes() +
			   ':00';
	}
  
  /**
   * There is more advanced function for articles.
   * Making a generic one, so we can use the load everywhere.
   */
  
  this.replaceProxyImages = function($target) {
    $target.find('img').on('load', function() {
      var $img = $(this);
      
      if ($img.data('proxy')) {
        var	src = utils.formatTimThumbString($img.data('img'),
                                             Math.round($img.width()), 
                                             Math.round($img.height()));
		
        $img.data('proxy', false);
        $img.attr('data-proxy', $img.data('proxy'));
        $img.attr('src', src);
      }
    });
	}
	
	this.convertSVG = function($img) {		
		var	imgID = $img.attr('id'),
			imgClass = $img.attr('class'),
			imgURL = $img.attr('src'),
			imgGet = $.get(imgURL);	
	
		$.when(imgGet).done(function(data) {
			var $svg = $(data).find('svg');
	
			if (typeof imgID !== 'undefined') {
				$svg.attr('id', imgID);
				$svg.attr('fill', '#ffffff');
				
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
			
			/**
			 * This is not applicable to the admin.
			 */
			
			if (typeof articles !== 'undefined') articles.hideLoading();
		}).fail(function() {
			console.log("Failed to convert SVG.");
		});
	}
	
	this.isMobile = function() {
		return $(window).width() >= 1280 ? false : true;
	}
	
	this.setTheme = function(theme, darkened) {
		var $body = $('body');
		
    if (theme == 'dark') {
      if (darkened) {
        $body.addClass(theme);
      } else {
        $body.removeClass(theme);
      }
      
      return;
    }
    
    if ($body.hasClass('dark')) {
      $body.removeClass().addClass('dark');
      $body.addClass(theme);
    } else {
      $body.removeClass();
		  $body.addClass(theme);
    }
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
	
	/**
	 * There is the same in Fortag.
	 */
   
  this.stripHTMLTags = function($parent, exceptions) {
    var $elements = $parent.find('*').not(exceptions);
    
    for (var i = $elements.length - 1; i >= 0; i --) {
      var e = $elements[i];
      
      $(e).replaceWith(e.innerHTML);
    }
    
    return $parent.html();
  } 
   
  this.escape = function(data) {
		if (!data) return null;
		if ((typeof data === 'number') && (data % 1 === 0)) return data;
    
    var s = data;
    
    s = he.decode(s);
    s = he.escape(s);
    s = s.trim(); 
    
		return s;
	} 
	 
	this.unescape = function(data) {
		if (!data) return null;
		if ((typeof data === 'number') && (data % 1 === 0)) return data;

		return he.unescape(data);
	}
	
	this.translate = function(data) {
		if (!data) return null;

		return i18next.t(data);
	}
	
	this.formatComaString = function (arr) {
		if (!arr) return;
		
		/**
		 * In XML single child node will return string and not array.
		 */
		
		return typeof(arr) == "string" ? arr : arr.join(', ');	
	}
	
	this.formatDate = function (d, returnObject) {
		if (!d) return;
		
		var d = new Date(d),
			m = ['Януари', 'Февруари', 'Март', 
				 'Април', 'Май', 'Юни',
				 'Юли', 'Август', 'Септеври',
				 'Октомври', 'Ноември', 'Декември'];
		
		if (!d.getDate()) {
			return 'няма';
		}
		
		if (returnObject) {
			return {
				date: d.getDate(),
				month: m[d.getMonth()],
				year: d.getFullYear()
			}
		}
		
		return d.getDate() + ' ' + m[d.getMonth()]  + ' ' + d.getFullYear();	
	}
	
	this.formatTag = function (s) {
		if (!s) return;
		
		var tag = s.toLowerCase().replace(/[:?\\.,!\/()'’&*„“`%]|– |- /g, '');
		
		tag = tag.replace(/\s+/g,  ' ');
		tag = tag.replace(/ /g, '-');
		
		return tag;	
	}
	
	this.parseSticker = function (s) {
		if (!s) return;
		
		var img = s.split('\\').pop().split('.')[0].toLowerCase();
		
		return img;	
	}
	
	this.parseStickerName = function (s) {
		if (!s) return;
		
		var name = s.replace(/-/g, ' ');
		
		return name.charAt(0).toUpperCase() + name.slice(1);
	}
	
	this.parseImg = function (s) {
		if (!s) return;
		
		var img = s.split('\\').pop().toLowerCase();
		
		return img;	
	}
	
	this.parseImgIndex = function (s) {
		if (!s) return;
		
		/**
		 * Images names are made from tag and number.
		 * Fisrst strip the path, than strip the tag.
		 * Only store the image index and format.
		 */
		
		var index = s.split('/').pop().split('-').pop();
		
		return index;
	}
	
	this.parseImgTag = function (s) {
		if (!s) return;
		
		var index = s.substring(s.lastIndexOf('\\') + 1, 
								s.lastIndexOf('-'));
		
		return index;
	}
	
	this.hypeToString = function(hype) {
		var hype = hype || this.hype;
			s = new String(hype);
			
		if (!hype) return null;	
		
		hype = s.slice(0, s.length - 1) + (
			   s.slice(s.length - 1) == 5 ? '+' : '');
			   
		return hype;
	}

	this.hypeToNumber = function(hype) {
		if (!hype) return null;	
		
		hype = hype.indexOf('+') != -1 ? hype.replace('+', 5) 
									   : hype + "0";
											
		return hype;
	}
	
	this.getObjectPropertyAsString = function(arr, prop) {
		var i,
			tArr = [];
	
		for (i = 0; i < arr.length; i ++) {
			tArr.push(arr[i][prop]);
		}
		
		return tArr.join(', ');
	}
	
	this.getObjectPropertyByIndex = function(o, index) {
		return o[Object.keys(o)[index]];
	}
	
	this.getObjectsByProperty = function(arr, key, value, prop) {
		if (!arr.length) return;
		
		var objects,
			props;
	
		objects = $.grep(arr, function(o, index) {
			return o[key] == value;
		});
		
		if (prop && objects.length) {
			props = $.map(objects, function(o, index) {
				return o[prop];
			});
			
			return self.formatComaString(props);
		}
		
		return objects;
	}
	
	this.parsePrettyURL = function(url) {
		var params = url.split('/'),
			o = {};
		
		if (url.indexOf('articles') != -1 && params.length >= 4) {
			o.type = params[params.length - 4];
			o.subtype = params[params.length - 3];
			o.id = params[params.length - 2];
			o.url = params[params.length - 1];
		}
		
		if (url.indexOf('portal') != -1 && params.length >= 1) {
			o.type = params[params.length - 2];
			o.subtype = params[params.length - 1];
		}
		
		if (url.indexOf('author') != -1 && params.length >= 3) {
			o.type = params[params.length - 4];
			o.subtype = params[params.length - 3];
			o.id = params[params.length - 2];
			o.url = params[params.length - 1];
		}
		
		return o;		
	}
	
	this.parseURL = function(url) {
		var params = url.split('?'),
			o = {};
		
		if (params[1]) {
			params = params[1].split('&');
			
			$.each(params, function(index, param)  {
				param = param.split('=');
				
				o[param[0]] = param[1];
			});
		}
		
		return o;		
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
		var service = 'https://forplay.bg/forapi/phplib/timthumb/timthumb.php',
			  extras = '';
		
		if (tag.indexOf('-caret') >= 0) extras = '_extras/';
		
		return service + '?src=/assets/articles/' + 
						 tag.substring(0, tag.lastIndexOf('-')) + 
						 '/' + extras + tag + 
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
		var service = 'http://192.168.56.101:8888/unsafe/',
			  extras = '';
		
		if (tag.indexOf('-caret') >= 0) extras = '_extras/';
		
		return service + width + 'x' + height + 
								 '/192.168.56.1:8080/forplay/assets/articles/' + 
								 tag.substring(0, tag.lastIndexOf('-')) +
								 '/' + extras + tag;
	}
	
	/**
	 * This is used for temporary solution to request XML files
	 * with unicode characters.
	 */
	
	this.isIE9 = function() {
   		return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10;
	}
}
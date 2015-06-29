function Layout(id) {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var $this = $('#' + id);
	var $layout = $this.parents('.layout');
	var $imgs = $this.find('.sublayout:visible .img-proxy');
	var $left = $layout.find('.left-col');
	var $right = $layout.find('.right-col');
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	this.id = id;
	this.subtype = "text";
	this.type = "text";
	this.center;
	this.left = false;
	this.right = false;
	this.imgs = [];
	
	this.setCenter = function() {
		self.center = CKEDITOR.instances[self.id].getData().replace(/\n/g, '');
	}
	
	this.setAside = function() {
		if ($left.data('type').length > 0) {
			self.left = {type: $left.data('type'), 
						 object: $left.data('object'), 
						 valign: $left.data('valign'), 
						 url: $left.data('url')};
		}
		
		if ($right.data('type').length > 0) {
			self.right = {type: $right.data('type'), 
						  object: $right.data('object'), 
						  valign: $right.data('valign'), 
						  url: $right.data('url')};
		}
	}
	
	this.setType = function() {
		self.type = $layout.find('> select').val();
	}
	
	this.setSubtype = function() {
		self.subtype = $this.find('> select').val();
	}


	
	
	/** 
	 * INIT
	 */
	 
	this.setType();
	
	if (this.type == 'text') {
		this.setCenter();
		this.setAside();
	} else if (this.type == 'img') {
		this.setSubtype();
		
		$imgs.each(function (index, value) {
			var $this = $(value),
				$p = $this.find('p'),
				$img = $this.find('input[type=file]'),
				$video  = $this.find('input[type=text]'),
				$tracklist = $this.find('select');
				
			var img = $img.val(),
				id = Math.round(Math.random() * 100000)
				alt = $p.length == 0 ? "" : $p.html().replace(/br/g, 'br /');
			
			self.imgs.push({tag: img.substring(img.lastIndexOf('\\') + 1, img.lastIndexOf('-')), 
							index: img.split('\\').pop().split('-').pop(), 
							pointer: $p.data('pointer'),
							video: $video.val(),
							player: id,
							alt: alt,
							tracklist: $tracklist.val()});
		});
	}
}
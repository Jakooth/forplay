function Layout(id) {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var $this = $('#' + id);
	var $layout = $this.parents('.layout');
	var $imgs = $this.find('.sublayout:visible .img');
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	this.id = id;
	this.subtype = "text";
	this.type = "text";
	this.center;
	this.left;
	this.right;
	this.imgs = [];
	
	this.setCenter = function() {
		self.center = CKEDITOR.instances[self.id].getData().replace(/\n/g, '');
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
	} else if (this.type == 'img') {
		this.setSubtype();
		
		$imgs.each(function (index, value) {
			var $p = $(value).find('p'),
				$img = $(value).find('input');
				
			var img = $img.val();
			
			self.imgs.push({tag: img.substring(img.lastIndexOf('\\') + 1, img.lastIndexOf('-')), 
							index: img.split('\\').pop().split('-').pop(), 
							pointer: $p.data('pointer'), 
							alt: $p.text()});
		});
	}
}
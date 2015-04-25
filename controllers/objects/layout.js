function Layout(id) {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var $layout = $('#' + id).parents('.layout');
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	this.id = id;
	this.subtype = "text";
	this.type = "text";
	this.center;
	this.left;
	this.right;
	
	this.setCenter = function() {
		self.center = CKEDITOR.instances[self.id].getData().replace(/\n/g, '');
	}
	
	this.setType = function() {
		self.type = $layout.find('> select').val();
	}


	
	
	/** 
	 * INIT
	 */
	 
	this.setType();
	
	if (this.type == 'text') {
		this.setCenter();
	}
}
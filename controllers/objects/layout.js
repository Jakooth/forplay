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
	this.subtype;
	this.type = "text";
	this.content;
	this.left;
	this.right;
	
	this.setContent = function() {
		self.content = CKEDITOR.instances[self.id].getData().replace(/\n/g, '');
	}
	
	this.setType = function() {
		self.type = $layout.find('> select').val();
	}


	
	
	/** 
	 * INIT
	 */
	 
	this.setType();
	
	if (this.type == 'text') {
		this.setContent();
	}
}
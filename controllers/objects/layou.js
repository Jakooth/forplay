function Layout(id) {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var layout = $(id).parents('.layout');
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	this.id = id;
	this.subtype;
	this.type = "text";
	this.content;
	this.preview;
	this.left;
	this.right;
	
	this.setContent = function() {
		self.content = CKEDITOR.instances[self.id].getData().replace(/\n/g, '');
	}
	
	this.setPreview = function() {
		self.preview = $('<div>' + CKEDITOR.instances[self.id].getData() + '</div>')
		.find('> p')
		.map(function(i, element) { 
			return $(element).text(); 
		}).get().join(' ');
	}


	
	
	/** 
	 * INIT
	 */
	 
	this.setContent();
	this.setPreview();
	
	return this;
}
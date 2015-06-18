function Quote() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var $characterInput = $('#quoteCharacterInput'),
		$tagInput = $('#quoteTagInput'),
		$saysInput = $('#quoteSaysInput');
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	/**
	 * Publish
	 */

	this.tag = "object-tag";
	this.character;
	this.text;
	
	/**
	 * TODO: Validate fields.
	 */
	
	this.save = function () {
		self.tag = $tagInput.val();
		self.character = $characterInput.typeahead().data('tagsinput').itemsArray[0];
		self.says = $saysInput.val();
	}
	
	/** 
	 * INIT
	 */
}
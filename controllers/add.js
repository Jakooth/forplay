function AddManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	this.addBox = function() {
		/** 
	 	 * TOOD: Add box image.
	 	 */
	}
	
	this.addLayout = function($appender) {
		var d1 = $.get('../renderers/admin/layout.html');
			
		$.when(d1).done(function(data1) {
			var html = data1,
				editor
				id = Math.round(Math.random() * 100000);
			
			$appender.before(html);
			
			self.hideLayouts($appender.parents('.Content'));
			self.showLayout('text');
			
			utils.convertSVG($appender.parents('.Content').find('img'));
			$appender.parents('.Content').find('.textLayout .center').attr('id',  'textLayout_' + id);
			
			CKEDITOR.disableAutoInline = true;
			editor = CKEDITOR.inline('textLayout_' + id, {
				extraPlugins: 'sourcedialog',
				toolbar: [
					{
						name: 'clipboard', 
						groups: [ 'clipboard', 'undo' ], 
						items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ]
					}, { 
						name: 'basicstyles', 
						groups: [ 'basicstyles', 'cleanup' ], 
						items: [ 'Bold', 'Italic', 'Underline', 'RemoveFormat' ] 
					}, { 
						name: 'paragraph', 
						groups: [ 'blocks' ], 
						items: [ 'Blockquote' ] 
					}, { 
						name: 'links', 
						items: [ 'Link', 'Unlink' ] 
					}, { 
						name: 'styles', 
						items: [ 'Format' ] 
					}, { 
						name: 'Sourcedialog', 
						items: [ 'Sourcedialog' ] 
					}
				]
			});
		}).fail(function() {
			alert("Failed to load layout.");
		});
	}
	
	this.showLayout = function(value) {
		$('.' + value + 'Layout').show();
	}
	
	this.hideLayouts =  function($appender) {
		$appender.find('[role=group]').hide();
	}
	
	this.addPlatform = function($appender) {
		var d1 = $.get('../renderers/admin/box.html');
			
		$.when(d1).done(function(data1) {
			var html = data1;
			
			$appender.before(html);
			
			utils.convertSVG($appender.parents('.Box').find('img'));
		}).fail(function() {
			alert("Failed to load platforms.");
		});
	}
	
	this.removePlatform = function($appender) {
		$appender.parents('.platform').remove();
	}
	
	
	
	
	
	
	/** 
	 * INIT
	 */
	
	 
	 
	 
	 
	/** 
	 * EVENTS
	 */
	 
	$('.Content').on('click', 'button.add', function (e) {
		self.addLayout($(this));
	});
	
	$('.Content').on('change', 'select', function (e) {
		$this = $(this);
		
		self.hideLayouts($this.parents('.Content'));
		self.showLayout($this.val());
	});
	
	$('.Box').on('click', 'button.add', function (e) {
		self.addPlatform($(this));
	});
	
	$('.Box').on('click', 'button.remove', function (e) {
		self.removePlatform($(this));
	});
}
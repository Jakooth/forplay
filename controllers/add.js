function AddManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var gamePlatforms = '../data/admin/platforms.json';
	
	var initAsideTextEditor = function() {
		CKEDITOR.disableAutoInline = true;
		CKEDITOR.inline('textLayout_aside', {
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
					name: 'links', 
					items: [ 'Link', 'Unlink' ] 
				}, { 
					name: 'Sourcedialog', 
					items: [ 'Sourcedialog' ] 
				}
			]
		});
	}
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	this.addLayout = function($appender) {
		var d1 = $.get('../renderers/admin/layout.html');
			
		$.when(d1).done(function(data1) {
			var html = data1,
				editor
				id = Math.round(Math.random() * 100000);
			
			$appender.before(html);
			
			self.hideLayouts($appender.prev());
			self.showLayout($appender.prev(), 'text');
			
			utils.convertSVG($appender.prev().find('img'));
			$appender.prev().find('.textLayout').attr('id',  'textLayout_' + id);
			$appender.prev().find('.imageLayout').attr('id',  'imageLayout_' + id);
			
			$(document).scrollTop($appender.offset().top);
			
			CKEDITOR.disableAutoInline = true;
			CKEDITOR.inline('textLayout_' + id, {
				extraPlugins: 'sourcedialog',
				toolbar: [
					{
						name: 'clipboard', 
						groups: [ 'clipboard', 'undo' ], 
						items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ]
					}, { 
						name: 'basicstyles', 
						groups: [ 'basicstyles', 'cleanup' ], 
						items: [ 'Bold', 'Italic', 'RemoveFormat' ] 
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
	
	this.showLayout = function($appender, value) {
		$appender.find('.' + value + 'Layout').show();
	}
	
	this.hideLayouts =  function($appender) {
		$appender.find('.center').hide();
	}
	
	this.addPlatform = function($appender) {
		var d1 = $.get('../renderers/admin/box.html');
			
		$.when(d1).done(function(data1) {
			var html = data1;
			
			var $box = $appender.parents('.Box');
			
			$appender.before(html)
			
			$(document).scrollTop($appender.offset().top);
			
			admin.loadOptions($box.find('select'), gamePlatforms, 'option');
			utils.convertSVG($box.find('img'));
		}).fail(function() {
			alert("Failed to load platforms.");
		});
	}
	
	this.removePlatform = function($appender) {
		$appender.parents('.platform').remove();
	}
	
	this.removeLayout = function($appender) {
		$appender.parents('.layout').remove();
	}
	
	this.addImage = function($input, e) {
		var d1 = $.get('../renderers/admin/image.html');
		
		$.when(d1).done(function(data1) {
			var html = data1, 
				files = e.target.files, 
				i, f, reader;
				
			var $ul = $input.parents('[role=listbox]');
			
			for (i = 0; f = files[i]; i++) {
				if (!f.type.match('image.*')) {
					continue;
				}
				
				reader = new FileReader();
				
				reader.onload = function(e) {
					$ul.append(html);
					$ul.find('[role=option]:last-child img').attr('src', e.target.result);
				}
				
				reader.readAsDataURL(f);
			}
		}).fail(function() {
			alert("Failed to load images.");
		});
	}
	
	this.removeImage = function($appender) {
		$appender.parents('[role=option]').remove();
	}
	
	
	
	
	/** 
	 * INIT
	 */
	 
	initAsideTextEditor();
	 
	 
	 
	 	 
	/** 
	 * EVENTS
	 */
	 
	$('.Content').on('click', 'button.add', function (e) {
		self.addLayout($(this));
	});
	
	$('.Content').on('change', '.layout > select', function (e) {
		$this = $(this);
		
		self.hideLayouts($this.parents('.layout'));
		self.showLayout($this.parents('.layout'), $this.val());
	});
	
	$('.Content').on('click', 'button.remove', function (e) {
		self.removeLayout($(this));
	});
	
	$('.Box').on('click', 'button.add', function (e) {
		self.addPlatform($(this));
	});
	
	$('.Box').on('click', 'button.remove', function (e) {
		self.removePlatform($(this));
	});
	
	$('.Box').on('click', 'button.remove', function (e) {
		self.removePlatform($(this));
	});
	
	$('.Box').on('change', '.file input', function (e) {
		var reader = new FileReader();
		
		var $file = $(e.target).parents('.file');
				
		reader.onload = function(e) {
			$file.css('background-image', 'url(' + e.target.result + ')');
		}
		
		reader.readAsDataURL(e.target.files[0]);
	});
	
	$('#images').on('click', 'button.remove', function (e) {
		self.removeImage($(this));
	});
	
	$('#images').on('change', '.file input', function (e) {
		self.addImage($(this), e);
	});
}
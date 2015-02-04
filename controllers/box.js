function Box() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	this.addBox = function() {
	
	}
	
	this.addPlatform = function(appender) {
		var d1 = $.get('../renderers/admin/box.html');
			
		$.when(d1).done(function(data1) {
			var html = data1;
			
			appender.before(html);
			utils.convertSVG(appender.parents('.Box').find('img'));
		}).fail(function() {
			alert("Failed to load platforms.");
		});
	}
	
	this.removePlatform = function(appender) {
		appender.parents('.platform').remove();
	}
	
	
	
	
	
	
	/** 
	 * INIT
	 */
	 
	
	 
	 
	 
	 
	/** 
	 * EVENTS
	 */
	 
	$('.Box').on('click', 'button.add', function (e) {
		self.addPlatform($(this));
	});
	
	$('.Box').on('click', 'button.remove', function (e) {
		self.removePlatform($(this));
	});
}
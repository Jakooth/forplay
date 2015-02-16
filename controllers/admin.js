function AdminManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var authors = '../data/admin/authors.json';
	var aside = '../data/admin/aside.json';
	var bgPosition = '../data/admin/bgPosition.json';
	var subtype = '../data/admin/subtype.json';
	var type = '../data/admin/type.json';
	var hype = '../data/admin/hype.json';
	var theme = '../data/admin/theme.json';
	var subtheme = '../data/admin/subtheme.json';
	var gameGenres = '../data/admin/gameGenres.json';
	var gamePlatforms = '../data/admin/gamePlatforms.json';
	var movieGenres = '../data/admin/movieGenres.json';
	
	var bloodhound = function(data) {
		return new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			prefetch: {
			url: data,
			filter: function(list) {
				return $.map(list, function(o) {
					return { name: o }; });
				}
			}
		});
	}
	
	var initTypeAhead = function(data, name, el) {
		data.initialize();
 
		$(el).typeahead({
			hint: true,
			highlight: true,
			minLength: 1
		}, {
		  name: name,
		  displayKey: 'name',
		  source: data.ttAdapter()
		});
	}
	
	var initTagInput = function(data, name, el) {
		data.initialize();
		
		$(el).tagsinput({
			typeaheadjs: {
				name: name,
				displayKey: 'name',
				valueKey: 'name',
				source: data.ttAdapter()
			},
			freeInput: false
		});
	}
	
	var tags = bloodhound('../data/admin/tags.json');
	var stickers = bloodhound('../data/admin/stickers.json');
	var publishers = bloodhound('../data/admin/publishers.json');
	var developers = bloodhound('../data/admin/developers.json');
	var games = bloodhound('../data/admin/games.json');
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	this.loadOptions = function(target, data, renderer) {
		var tmpl = $.get('../renderers/admin/' + renderer + '.html'),
			data = $.get(data.prefetch ? data.prefetch.url : data);
		
		$.when(tmpl, data).done(function(tmpl, data) {
			var tmpls = $.templates({
					tmpl: tmpl[0]
				}),
				html = $.templates.tmpl.render(data[0]);
			
			$(target).append(html);
		}).fail(function() {
			alert("Failed to load options.");
		});
	}
	
	this.hideSections = function() {
		$('section').hide();
	}
	
	this.showSection = function(section) {
		self.hideSections();
		
		if (section == "#main") {
			$('header').removeClass('compact');
			$('header h1').addClass('clip');
			$('header h1 a').attr('tabindex', -1);
			$('header nav').removeClass('clip');
			$('section').removeClass('active');
		} else {
			$('header').addClass('compact');
			$('header h1').removeClass('clip');
			$('header h1 a').attr('tabindex', 0);
			$('header nav').addClass('clip');
			$(section).show();
			$(section).find('h2').addClass('active');
		}
	}
	
	this.showOverlay = function() {
		$('.Overlay').show();
	}
	
	this.hideOverlay = function() {
		$('.Overlay').hide();
	}
	
	this.showSectionInWindow = function(appendee) {
		var d1 = $.get('../renderers/admin/window.html');
			
		$.when(d1).done(function(data1) {
			var html = $(data1).append($(appendee).show());
			
			self.showOverlay();
			
			$('body').append(html);
			$(window).scrollTop(0);
		}).fail(function() {
			alert("Failed to load window.");
		});
	}
	
	this.hideSectionInWindow = function($appendee) {
		$('main').append($appendee.hide());
		$('.Window').remove();
		
		self.hideOverlay();
	}
	
	
	
	
	/** 
	 * INIT
	 */
	 
	this.loadOptions('#articleAuthorSelect', authors, 'option');
	this.loadOptions('#articleBgPositionSelect', bgPosition, 'option');
	this.loadOptions('#articleSubtypeSelect', subtype, 'option');
	this.loadOptions('#articleHypeSelect', hype, 'option');
	this.loadOptions('#articleTypeSelect', type, 'option');
	this.loadOptions('#articleVersionTestedSelect', gamePlatforms, 'option');
	this.loadOptions('#asideTypeSelect', type, 'option');
	this.loadOptions('#articleThemeSelect', theme, 'option');
	this.loadOptions('#articleSubthemeSelect', subtheme, 'option');
	this.loadOptions('#gameGenreGroup', gameGenres, 'checkbox');
	this.loadOptions('#gamePlatformGroup', gamePlatforms, 'checkbox');
	this.loadOptions('#searchCategorySelect', aside, 'option');
	
	initTagInput(tags, 'tags', '#gamePersonTagsInput');
	initTagInput(tags, 'tags', '#articleTagsInput');
	initTagInput(tags, 'tags', '#asideTagsInput');
	initTagInput(tags, 'tags', '#gameCharacterTagsInput');
	initTagInput(stickers, 'stickers', '#gameStickersInput');
	initTypeAhead(publishers, 'publishers', '#gamePublisherInput');
	initTypeAhead(developers, 'developers', '#gameDeveloperInput');
	initTypeAhead(tags, 'tags', '#imagesTagInput');
	initTypeAhead(tags, 'tags', '#searchTagInput');
	initTagInput(games, 'games', '#gameSimilarInput');
	 
	 
	 
	 
	/** 
	 * EVENTS
	 */
	 
	$(window).on('load', function (e) {
		$('img.svg').each(function() {
			utils.convertSVG($(this));
		});
		
		self.showSection(window.location.hash);
	});
	
	$('body').on('click', 'nav a, header a', function (e) {
		self.showSection($(this).attr('href'));
	});
	
	$('form').on('click', '.create', function (e) {
		e.preventDefault();
		self.showSectionInWindow($(this).attr('href'));
	});
	
	$('body').on('click', '.Window button', function (e) {
		self.hideSectionInWindow($(this).parents('section'));
	});
	
	$('body').on('click', '.Window h2 a', function (e) {
		e.preventDefault();
	});
	
	$('form').on('focus', '.bootstrap-tagsinput input', function (e) {
		$(this).parents('.bootstrap-tagsinput').addClass('focus');
	});
	
	$('form').on('blur', '.bootstrap-tagsinput input', function (e) {
		$(this).parents('.bootstrap-tagsinput').removeClass('focus');
	});
}
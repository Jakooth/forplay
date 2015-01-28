function AdminManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var authors = '../data/admin/authors.json';
	var bgPosition = '../data/admin/bgPosition.json';
	var subtype = '../data/admin/subtype.json';
	var side = '../data/admin/side.json';
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
			data = $.get(data);
		
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
	
	
	
	
	/** 
	 * INIT
	 */
	 
	this.loadOptions('#authorsDropDown', authors, 'option');
	this.loadOptions('#bgPositionDropDown', bgPosition, 'option');
	this.loadOptions('#subtypeDropDown', subtype, 'option');
	this.loadOptions('#hypeDropDown', hype, 'option');
	this.loadOptions('#typeDropDown', type, 'option');
	this.loadOptions('#sideDropDown', side, 'option');
	this.loadOptions('#themeDropDown', theme, 'option');
	this.loadOptions('#subthemeDropDown', subtheme, 'option');
	this.loadOptions('#genreGroup', gameGenres, 'checkbox');
	this.loadOptions('#platformGroup', gamePlatforms, 'checkbox');
	
	initTagInput(tags, 'tags', '#tagsInput');
	initTagInput(stickers, 'stickers', '#stickersInput');
	initTypeAhead(publishers, 'publishers', '#publisherInput');
	initTypeAhead(developers, 'developers', '#developerInput');
	initTagInput(games, 'games', '#similarInput');
	 
	 
	 
	 
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
	
	$('form').on('focus', '.bootstrap-tagsinput input', function (e) {
		$(this).parents('.bootstrap-tagsinput').addClass('focus');
	});
	
	$('form').on('blur', '.bootstrap-tagsinput input', function (e) {
		$(this).parents('.bootstrap-tagsinput').removeClass('focus');
	});
}
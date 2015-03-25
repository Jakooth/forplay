function AdminManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var aside = '../data/admin/aside.json';
	var subtype = '../data/admin/subtype.json';
	var type = '../data/admin/type.json';
	var hype = '../data/admin/hype.json';
	var theme = '../data/admin/theme.json';
	var subtheme = '../data/admin/subtheme.json';
	var gameGenres = '../data/admin/gamegenres.json';
	var gamePlatforms = '../data/admin/platforms.json';
	var movieGenres = '../data/admin/moviegenres.json';
	
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
	var issues = bloodhound('../data/admin/issues.json');
	var series = bloodhound('../data/admin/series.json');
	var games = bloodhound('../data/admin/games.json');
	var movies = bloodhound('../data/admin/movies.json');
	var persons = bloodhound('../data/admin/persons.json');
	var authors = bloodhound('../data/admin/authors.json');
	
	
	
	
	/** 
	 * PUBLIC
	 */
	 
	this.selectTarget = null;
	this.publishTarget = null;
	
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
	
	this.showSection = function(section, isBreadcrumb) {
		var $section = $(section);
		
		self.hideSections();
		
		if (section == "#main") {
			$('header').removeClass('compact');
			$('header h1').addClass('clip');
			$('header h1 a').attr('tabindex', -1);
			$('header nav').removeClass('clip');
			$('header .breadcrumb').addClass('clip');
			$('header [role=toolbar]').removeClass('clip');
			
			self.removeAllBreadcrumbs();
		} else {
			$('header').addClass('compact');
			$('header h1').removeClass('clip');
			$('header h1 a').attr('tabindex', 0);
			$('header nav').addClass('clip');
			$('header .breadcrumb').removeClass('clip');
			$('header [role=toolbar]').addClass('clip');
			
			if (isBreadcrumb) {
				self.removeBreadcrumb();
			} else {
				self.addBreadcrumb($section);
			}
			
			$section.show();
			$section.find('h2').addClass('clip');
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
			$('.Window :tabbable').eq(1).focus();
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
	
	this.addBreadcrumb = function($section) {
		if ($('.breadcrumb li').length != 2) {
			var d1 = $.get('../renderers/admin/breadcrumb.html');
			
			$.when(d1).done(function(data1) {
				var html = $(data1);
				
				$('.breadcrumb a').removeClass('active');
				
				$section.find('h2 a').clone().addClass('active').appendTo(html);
				$('.breadcrumb').append(html);
			}).fail(function() {
				alert("Failed to load window.");
			});
		}
	}
	
	this.removeBreadcrumb = function() {
		$('.breadcrumb li:last-child').remove();
		$('.breadcrumb li:last-child a').addClass('active');
	}
	
	this.removeAllBreadcrumbs = function() {
		$('.breadcrumb li').remove();
	}
	
	
	
	
	/** 
	 * INIT
	 */
	 
	this.loadOptions('#articleSubtypeSelect', subtype, 'option');
	this.loadOptions('#articleHypeSelect', hype, 'option');
	this.loadOptions('#articleTypeSelect', type, 'option');
	this.loadOptions('#companyTypeSelect', type, 'option');
	this.loadOptions('#genreTypeSelect', type, 'option');
	this.loadOptions('#personTypeSelect', type, 'option');
	this.loadOptions('#characterTypeSelect', type, 'option');
	this.loadOptions('#serieTypeSelect', type, 'option');
	this.loadOptions('#articleVersionTestedSelect', gamePlatforms, 'option');
	this.loadOptions('#asideTypeSelect', type, 'option');
	this.loadOptions('#articleThemeSelect', theme, 'option');
	this.loadOptions('#articleSubthemeSelect', subtheme, 'option');
	this.loadOptions('#gameGenreGroup', gameGenres, 'checkbox');
	this.loadOptions('#gamePlatformGroup', gamePlatforms, 'checkbox');
	this.loadOptions('#searchCategorySelect', aside, 'option');
	
	initTagInput(tags, 'tags', '#personTagsInput');
	initTagInput(tags, 'tags', '#publishTagsInput');
	initTagInput(tags, 'tags', '#characterTagsInput');
	initTagInput(stickers, 'stickers', '#gameStickersInput');
	initTagInput(stickers, 'stickers', '#movieStickersInput');
	initTypeAhead(publishers, 'publishers', '#gamePublisherInput');
	initTypeAhead(developers, 'developers', '#gameDeveloperInput');
	initTypeAhead(series, 'series', '#gameSerieInput');
	initTypeAhead(series, 'series', '#movieSerieInput');
	initTypeAhead(tags, 'tags', '#imagesTagInput');
	initTypeAhead(tags, 'tags', '#searchTagInput');
	initTagInput(games, 'games', '#gameSimilarInput');
	initTagInput(movies, 'movies', '#movieSimilarInput');
	initTagInput(persons, 'persons', '#movieCastInput');
	initTagInput(persons, 'persons', '#movieDirectorInput');
	initTagInput(persons, 'persons', '#movieWriterInput');
	initTagInput(persons, 'persons', '#movieCameraInput');
	initTagInput(persons, 'persons', '#movieMusicInput');
	initTypeAhead(issues, 'issues', '#publishIssueInput');
	initTagInput(tags, 'tags', '#articleBetterInput');
	initTagInput(tags, 'tags', '#articleWorseInput');
	initTagInput(tags, 'tags', '#articleEqualInput');
	initTagInput(authors, 'authors', '#articleAuthorsInput');
	
	
	
	
	/** 
	 * EVENTS
	 */
	
	/**
	 * Views
	 */
	
	$(window).on('load', function (e) {
		$('img.svg').each(function() {
			utils.convertSVG($(this));
		});
		
		self.showSection(window.location.hash);
		
		/**
		 * Default input values
		 */
	
		$('#articleSubtypeSelect').val('news').change();
		$('#articleBgHSelect').val('center').change();
		$('#articleBgVSelect').val('top').change();
		$('#articleThemeSelect').val('').change();
		$('#articleSubthemeSelect').val('000000').change();
		$('#publishDateInput').val(utils.today());
		$('#publishTimeInput').val(utils.now());
	});
	
	$('body').on('click', 'nav a:not(.active), header a:not(.active)', function (e) {
		self.showSection($(this).attr('href'), $(this).parents().hasClass('breadcrumb'));
	});
	
	/**
	 * Header
	 */
	
	$('header').on('click', 'button.search', function (e) {
		self.showSection('#search');
	});
	
	$('header').on('click', 'button.logout', function (e) {
		window.location.href = "login.jsp";
	});
	
	/**
	 * Focus
	 */
	
	$('form').on('focus', '.bootstrap-tagsinput input', function (e) {
		$(this).parents('.bootstrap-tagsinput').addClass('focus');
	});
	
	$('form').on('blur', '.bootstrap-tagsinput input', function (e) {
		$(this).parents('.bootstrap-tagsinput').removeClass('focus');
	});
	
	/**
	 * Windows
	 */
	
	$('body').on('click', '.Window button', function (e) {
		self.hideSectionInWindow($(this).parents('section'));
	});
	
	$('body').on('click', '.Window h2 a', function (e) {
		e.preventDefault();
	});
	
	$('form').on('click', '.create', function (e) {
		e.preventDefault();
		self.showSectionInWindow($(this).attr('href'));
	});
	
	$('form').on('click', '.select', function (e) {
		e.preventDefault();
		self.showSectionInWindow('#search');
		
		window.admin.selectTarget = $(this);
	});
	
	$('section:not(#publish)').on('click', 'button.publish', function (e) {
		e.preventDefault();
		self.showSectionInWindow('#publish');
	});
	
	$('body').on('click', '.Window #search button.ok', function (e) {
		var img = $('#search input:checked').parents('label').find('img').attr('src');														 
		
		window.admin.selectTarget.focus();
		window.admin.selectTarget.find('input').val(img);
		window.admin.selectTarget.css('background-image', 'url(' + img + ')');
	});
	 
	/**
	 * Article & Publish
	 */
	 
	$('#article').on('change', '#articleSubtypeSelect', function (e) {
		if ($(this).val() != "review") {
			$('#reviewRegion').hide();
		} else {
			$('#reviewRegion').show();
		}
	});
	
	$('#article').on('change', '#articleBgHSelect, #articleBgVSelect', function (e) {
		$('.h-preview').css('background-position', $('#articleBgHSelect').val() + ' ' + $('#articleBgVSelect').val());
		$('.v-preview').css('background-position', $('#articleBgHSelect').val() + ' ' + $('#articleBgVSelect').val());
	});
	
	$('#article').on('change', '#articleThemeSelect', function (e) {
		var t1 = $(this).find(':selected').text(),
			t2 = $('#articleSubthemeSelect').find(':selected').text()
			v1 = $(this).val(),
			v2 = $('#articleSubthemeSelect').val();
		
		if (v1.length && v2.length) {
			t1 += " ";
			t1 += t2;
		} else if (!v1.length && v2.length) {
			t1 = t2;
		}
																
		$('#article').removeClass().addClass(t1);
	});
	
	$('#article').on('change', '#articleSubthemeSelect', function (e) {
		var t2 = $(this).find(':selected').text(),
			t1 = $('#articleThemeSelect').find(':selected').text()
			v2 = $(this).val(),
			v1 = $('#articleThemeSelect').val();
		
		if (v1.length && v2.length) {
			t1 += " ";
			t1 += t2;
		} else if (!v1.length && v2.length) {
			t1 = t2;
		}
		
		$('#article').removeClass().addClass(t1);
	});
	
	$('#article').on('click', 'button.save, button.publish', function (e) {
		var c = new Cover();
		
		c.save();
		
		window.admin.publishTarget = c;
		
		console.log(window.admin.publishTarget);
	});
	
	$('#publish').on('click', 'button.publish', function (e) {
		window.admin.publishTarget.publish();
		window.admin.publishTarget.hypeToString();
		
		utils.xml(window.admin.publishTarget, 'cover', '#xmlCodeOutput');	
		self.showSection('#xml');
		
		console.log(window.admin.publishTarget);
	});
	
	/**
	 * Article & Publish
	 */
	
	$('#game').on('click', 'button.save, button.publish', function (e) {
		var g = new Game();
		
		g.save();
		
		utils.xml(g, 'game', '#xmlCodeOutput');	
		self.showSection('#xml');
		
		console.log(g);
	});
}
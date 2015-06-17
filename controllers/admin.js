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
	var musicGenres = '../data/admin/musicgenres.json';
	var gamePlatforms = '../data/admin/platforms.json';
	var movieGenres = '../data/admin/moviegenres.json';
	var countries = '../data/admin/countries.json';
	
	var bloodhound = function(data, key) {
		return new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text', 'value'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			
			/**
			 * Append some random numuber, to makes sure
			 * the data source is not cached.
			 */
			 
			prefetch: data + '?v=' + Math.round(Math.random() * 100000)
		});
	}
	
	var initTypeAhead = function(data, 
								 text, 
								 input, 
								 displayKey) {
		data.initialize();
 
		$(input).typeahead({
			hint: true,
			highlight: true,
			minLength: 1
		}, {
		  	itemValue: 'value',
  			itemText: displayKey || 'text',
			name: text,
		  	displayKey: displayKey || 'text',
		  	source: data.ttAdapter()
		});
	}
	
	var initTagInput = function(data, 
								text, 
								input, 
								maxTags, 
								displayKey) {
		data.initialize();
		
		$(input).tagsinput({
			maxTags: maxTags || null,
			itemValue: 'value',
  			itemText: displayKey || 'text',
			typeaheadjs: [{
      			hint: true,
				highlight: true
			}, {
				name: text,
				displayKey: displayKey || 'text', 
				source: data.ttAdapter()
			}],
			freeInput: false
		});
	}
	
	var tags = bloodhound('../data/admin/tags.json');
	var stickers = bloodhound('../data/admin/stickers.json');
	var companies = bloodhound('../data/admin/companies.json');
	var issues = bloodhound('../data/admin/issues.json');
	var series = bloodhound('../data/admin/series.json');
	var movies = bloodhound('../data/admin/movies.json');
	var artists = bloodhound('../data/admin/artists.json');
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
	 
	this.loadOptions('#companyTypeSelect', type, 'option');
	this.loadOptions('#genreTypeSelect', type, 'option');
	this.loadOptions('#personTypeSelect', type, 'option');
	this.loadOptions('#characterTypeSelect', type, 'option');
	this.loadOptions('#serieTypeSelect', type, 'option');
	this.loadOptions('#asideTypeSelect', type, 'option');
	this.loadOptions('#searchCategorySelect', aside, 'option');
	
	initTagInput(tags, 'tags', '#personTagsInput');
	initTagInput(tags, 'tags', '#characterTagsInput');
	initTagInput(stickers, 'stickers', '#movieStickersInput');
	initTypeAhead(series, 'series', '#movieSerieInput');
	initTypeAhead(tags, 'tags', '#imagesTagInput');
	initTypeAhead(tags, 'tags', '#searchTagInput');
	initTagInput(movies, 'movies', '#movieSimilarInput');
	initTagInput(artists, 'artists', '#movieCastInput');
	initTagInput(artists, 'artists', '#movieDirectorInput');
	initTagInput(artists, 'artists', '#movieWriterInput');
	initTagInput(artists, 'artists', '#movieCameraInput');
	initTagInput(artists, 'artists', '#movieMusicInput');
	initTagInput(issues, 'issues', '#publishIssueInput', 1, 'value');
	initTagInput(tags, 'tags', '#publishTagsInput', null, 'value');
	
	/**
	 * ARTICLE
	 */
	
	this.loadOptions('#articleSubtypeSelect', subtype, 'option');
	this.loadOptions('#articleHypeSelect', hype, 'option');
	this.loadOptions('#articleTypeSelect', type, 'option');
	this.loadOptions('#articleVersionTestedSelect', gamePlatforms, 'option');
	this.loadOptions('#articleThemeSelect', theme, 'option');
	this.loadOptions('#articleSubthemeSelect', subtheme, 'option');
	
	initTagInput(tags, 'tags', '#articleBetterInput', 1);
	initTagInput(tags, 'tags', '#articleWorseInput', 1);
	initTagInput(tags, 'tags', '#articleEqualInput', 1);
	initTagInput(authors, 'authors', '#articleAuthorsInput');
	
	/**
	 * GAMES::GAME
	 */
	
	this.loadOptions('#gameGenreGroup', gameGenres, 'checkbox');
	this.loadOptions('#gamePlatformGroup', gamePlatforms, 'checkbox');
	
	initTagInput(series, 'series', '#gameSerieInput', 1);
	initTagInput(stickers, 'stickers', '#gameStickersInput');
	initTagInput(companies, 'companies', '#gamePublisherInput', 1);
	initTagInput(companies, 'companies', '#gameDeveloperInput', 1);
	initTagInput(tags, 'tags', '#gameSimilarInput');
	
	
	/**
	 * MUSIC::ALBUM
	 */
	
	this.loadOptions('#albumGenreGroup', musicGenres, 'checkbox');
	this.loadOptions('#albumCountrySelect', countries, 'option');
	
	initTagInput(artists, 'artists', '#albumArtistInput');
	initTagInput(stickers, 'stickers', '#albumStickersInput');
	initTagInput(tags, 'tags', '#albumSimilarInput');
	
	
	
	
	
	
	
	
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
		 * Default input values.
		 */
		
		$('#articleTypeSelect').val('games').change();
		$('#articleSubtypeSelect').val('news').change();
		$('#articleVideoTechSelect').val('').change();
		$('#articleAudioTechSelect').val('').change();
		$('#articleBgHSelect').val('center').change();
		$('#articleBgVSelect').val('top').change();
		$('#articleThemeSelect').val('').change();
		$('#articleSubthemeSelect').val('FFFFFF').change();
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
	
	$('#article').on('change', '#articleTypeSelect', function (e) {
		var $gameRegion = $('#articleReviewRegion').children(':gt(0)');
		
		if ($(this).val() == "music") {
			$gameRegion.hide();
		} else {
			$gameRegion.show();
		}
	});
	
	$('#article').on('change', '#articleSubtypeSelect', function (e) {
		var $reviewRegion = $('#articleReviewRegion'),
			$aVRegion = $('#articleAVRegion');
		
		if ($(this).val() == "review") {
			$reviewRegion.show();
		} else {
			
			$reviewRegion.hide();
		}
		
		if ($(this).val() == "news") {
			$aVRegion.show();
		} else {
			$aVRegion.hide();
		}
	});
	
	$('#article').on('change', '#articleVideoTechSelect', function (e) {
		var $videoTechSelect = $('#articleVideoUrlInput').parents('label');
																
		if ($(this).val() == "") {
			$videoTechSelect.hide();
		} else {
			$videoTechSelect.show();
		}
	});
	
	$('#article').on('change', '#articleAudioTechSelect', function (e) {
		var $audioFrameSelect = $('#articleAudioFrameInput').parents('label')
			$audioUrlSelect = $('#articleAudioUrlInput').parents('label');
																
		if ($(this).val() == "") {
			$audioFrameSelect.hide();
			$audioUrlSelect.hide();
		} else {
			$audioFrameSelect.show();
			$audioUrlSelect.show();
		}
	});
	
	$('#article').on('change', '#articleBgHSelect, #articleBgVSelect', function (e) {
		$('.h-preview').css('background-position', $('#articleBgHSelect').val() + ' ' + $('#articleBgVSelect').val());
		$('.v-preview').css('background-position', $('#articleBgHSelect').val() + ' ' + $('#articleBgVSelect').val());
	});
	
	$('#article').on('change', '#articleThemeSelect', function (e) {
		var $this = $(this);
		
		var t1 = $this.find(':selected').text(),
			t2 = $('#articleSubthemeSelect').find(':selected').text(),
			v1 = $this.val() || "",
			v2 = $('#articleSubthemeSelect').val() || "";
		
		if (v1.length && v2.length) {
			t1 += " ";
			t1 += t2;
		} else if (!v1.length && v2.length) {
			t1 = t2;
		}
																
		$('#article').removeClass().addClass(t1);
	});
	
	$('#article').on('change', '#articleSubthemeSelect', function (e) {
		var $this = $(this);
		
		var t2 = $this.find(':selected').text(),
			t1 = $('#articleThemeSelect').find(':selected').text(),
			v2 = $this.val() || "",
			v1 = $('#articleThemeSelect').val() || "";
		
		if (v1.length && v2.length) {
			t1 += " ";
			t1 += t2;
		} else if (!v1.length && v2.length) {
			t1 = t2;
		}
		
		$('#article').removeClass().addClass(t1);
	});
	
	$('#article').on('click', 'button.save, button.publish', function (e) {
		var a = new Article();
		
		a.save();
		
		window.admin.publishTarget = a;
		
		/**
		 * By default all news with video go with priority.
		 */
		
		if (a.video) {
			$('#publishPrioritySelect').val('video').change();
		}
		
		console.log(window.admin.publishTarget);
	});
	
	$('#publish').on('click', 'button.publish', function (e) {
		window.admin.publishTarget.publish();
		window.admin.publishTarget.hypeToString();
		
		self.showSection('#xml');
		utils.xml(window.admin.publishTarget, 'article', '#xmlCodeOutput');	
		
		console.log(window.admin.publishTarget);
	});
	
	/**
	 * Article & Publish
	 */
	
	$('#game').on('click', 'button.save', function (e) {
		var o = new Game();
		
		o.save();
		
		self.showSectionInWindow('#xml');
		utils.xml(o, 'game', '#xmlCodeOutput');	
		
		console.log(o);
	});
	
	$('#album').on('click', 'button.save', function (e) {
		var o = new Album();
		
		o.save();
		
		self.showSectionInWindow('#xml');
		utils.xml(o, 'album', '#xmlCodeOutput');	
		
		console.log(o);
	});
}
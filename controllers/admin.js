function AdminManager() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var authors = [
		{option: 'Koralsky'},
		{option: 'Snake'},
		{option: 'doomy'},
		{option: 'Major Mistake'},
		{option: 'Tosh'},
		{option: 'Ralitsa'}
	];
	
	var bgPositions = [
		{option: 'bg-top'},
		{option: 'bg-center'},
		{option: 'bg-left'},
		{option: 'bg-right'},
		{option: 'bg-25'},
		{option: 'bg-75'}
	];
	
	var subtype = [
		{option: 'ревю', value:'review'},
		{option: 'мнение', value:'feature'},
		{option: 'видео', value:'video'},
		{option: 'новина', value:'news'},
		{option: 'информация', value:'info'},
		{option: 'каре', value:'aside'},
		{option: 'цитат', value:'q'}
	];
	
	var side = [
		{option: 'forplay'},
		{option: 'forlife'}
	];
	
	var type = [
		{option: 'игри'},
		{option: 'кино'},
		{option: 'сериали'},
		{option: 'книги'},
		{option: 'настолни игри'},
		{option: 'музика'}
	];
	
	var hype = [
		{option: '1'},
		{option: '1+'},
		{option: '2'},
		{option: '2+'},
		{option: '3'},
		{option: '3+'},
		{option: '4'},
		{option: '4+'},
		{option: '5'},
		{option: '5+'},
		{option: '6'},
		{option: '6+'},
		{option: '7'},
		{option: '7+'},
		{option: '8'},
		{option: '8+'},
		{option: '9'},
		{option: '9+'},
		{option: '10'}
	];
	
	var theme = [
		{option: 'blood', value: 'B53634'},
		{option: 'sunset', value: 'EF822A'},
		{option: 'purple', value: '82446D'},
		{option: 'pink', value: 'DF3053'},
		{option: 'silver', value: '5C6974'},
		{option: 'green', value: '54FF00'},
		{option: 'forplay', value: 'FF6000'},
		{option: 'navy', value: '406080'}
	];
	
	var subtheme = [
		{option: 'lighten'},
		{option: 'darken'},
		{option: 'tuborg'}
	];
	
	var gameGenres = [
		{option: 'Шуутър от първо/трето лице'},
		{option: 'Екшън от първо/трето лице'},
		{option: 'Рейл шуутър'},
		{option: 'Стелт'},
		{option: 'Хорър'},
		{option: 'Сървайвъл хорър'},
		{option: 'Платформър'},
		{option: 'Екшън-адвенчър'},
		{option: 'Куест'},
		{option: 'Аркадна игра'},
		{option: 'ММО'},
		{option: 'MOBA'},
		{option: 'Ролева игра'},
		{option: 'Рейсър'},
		{option: 'Спортна игра'},
		{option: 'Симулатор'},
		{option: 'Стратегия в реално време'},
		{option: 'Походова стратегия'},
		{option: 'Кежуъл/парти/музикална игра'},
		{option: 'Инди'}
	];
	
	var gamePlatforms = [
		{option: 'Windows', value: 'Win'},
		{option: 'Mac OS', value: 'Mac'},
		{option: 'Xbox 360', value: '360'},
		{option: 'Xbox One', value: 'One'},
		{option: 'PlayStation 3', value: 'PS3'},
		{option: 'PlayStation 4', value: 'PS4'},
		{option: 'PlayStation Vita', value: 'Vita'},
		{option: 'Nintendo Wii', value: 'Wii'},
		{option: 'Nintendo 3DS', value: '3DS'},
		{option: 'iOS', value: 'iOS'},
		{option: 'Android', value: 'Android'}
	];
	
	var movieGenres = [
		{option: 'Драма'},
		{option: 'Екшън'},
		{option: 'Комедия'},
		{option: 'Приключенски'},
		{option: 'Анимация'},
		{option: 'Документален'},
		{option: 'Семеен'},
		{option: 'Ноар'},
		{option: 'Хорър'},
		{option: 'Мюзикъл'},
		{option: 'Романтика'},
		{option: 'Фентъзи'},
		{option: 'Фантастика'},
		{option: 'Трилър'},
		{option: 'Уестърн'}
	];
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	this.loadOptions = function(target, data, renderer) {
		var tmpl = $.get('../renderers/admin/' + renderer + '.html');
		
		$.when(tmpl).done(function(tmpl) {
			var tmpls = $.templates({
					tmpl: tmpl
				}),
				html = $.templates.tmpl.render(data);
			
			$(target).append(html);
		}).fail(function() {
			alert("Failed to load options.");
		});
	}
	
	
	
	
	/** 
	 * INIT
	 */
	 
	 this.loadOptions('#authorsDropDown', authors, 'option');
	 this.loadOptions('#bgPositionDropDown', bgPositions, 'option');
	 this.loadOptions('#subtypeDropDown', subtype, 'option');
	 this.loadOptions('#hypeDropDown', hype, 'option');
	 this.loadOptions('#typeDropDown', type, 'option');
	 this.loadOptions('#sideDropDown', side, 'option');
	 this.loadOptions('#themeDropDown', theme, 'option');
	 this.loadOptions('#subthemeDropDown', subtheme, 'option');
	 this.loadOptions('#genreGroup', gameGenres, 'checkbox');
	 this.loadOptions('#platformGroup', gamePlatforms, 'checkbox');
}
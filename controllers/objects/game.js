function Game() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var $mainInput = $('#gameMainInput'),
		$enNameInput = $('#gameEnNameInput'),
		$bgNameInput = $('#gameBgNameInput'),
		$serieInput = $('#gameSerieInput'),
		$tagInput = $('#gameTagInput'),
		$stickersInput = $('#gameStickersInput'),
		$genreInput = $('#gameGenreGroup'),
		$platformInput = $('#gamePlatformGroup'),
		$publisherInput = $('#gamePublisherInput'),
		$developerInput = $('#gameDeveloperInput'),
		$usDateInput = $('#gameUsDateInput'),
		$euDateInput = $('#gameEuDateInput'),
		$similarInput = $('#gameSimilarInput');
		$boxInputs = $('#game .Box select');
	
	
	
	
	/** 
	 * PUBLIC
	 */

	this.main = "gta-5-main.jpg";
	this.enName = "Grand Theft Auto 5";
	this.bgName = "Гранд Тефт Ауто 5";
	this.serie = "gta";
	this.tag = "gta-5";
	this.stickers = "girl,beer,18+";
	this.genre = "action,adventure,mmo";
	this.platform = "tps,racing,sport";
	this.publisher = "Rockstar Games";
	this.developer = "Rockstar North";
	this.usDate = new Date();
	this.euDate = new Date();
	this.similar = "saints-row,mafia,red-dead-redemption,crackdown";
	this.boxes = [];
	
	/**
	 * TODO: Validate fields.
	 */
	
	this.save = function () {
		self.main = $mainInput.val().split('/').pop() || self.main;
		self.enName = $enNameInput.val() || self.enName;
		self.bgName = $bgNameInput.val() || self.bgName;
		self.serie = $serieInput.val() || self.serie;
		self.tag = $tagInput.val() || self.tag;
		self.stickers = $stickersInput.val() || self.stickers;
		self.genre = $genreInput.find(':checked').map(function (i, element) {
			return $(element).val();
		}).get().join(",") || self.genre;
		self.platform = $platformInput.find(':checked').map(function (i, element) {
			return $(element).val();
		}).get().join(",") || self.platform;
		self.publisher = $publisherInput.val() || self.publisher;
		self.developer = $developerInput.val() || self.developer;
		self.usDate = new Date($usDateInput.val());
		self.euDate = new Date($euDateInput.val());
		self.similar = $similarInput.val() || self.similar;
		self.boxes = $boxInputs.map(function (i, element) {
			return {'type':$(element).val(),  
					'img':$(element).parents('.platform').find('[type=file]').val().split('\\').pop()};
		}).get();
	}
	
	
	
	
	/** 
	 * INIT
	 */
}
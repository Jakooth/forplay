function Cover() {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	var $tagsInput = $('#publishTagsInput'),
		$dateInput = $('#publishDateInput'),
		$timeInput = $('#publishTimeInput'),
		$issueInput = $('#publishIssueInput'),
		$typeInput = $('#articleTypeSelect'),
		$subtypeInput = $('#articleSubtypeSelect'),
		$titleInput = $('#articleTitleInput'),
		$subtitleInput = $('#articleSubtitleInput'),
		$authorsInput = $('#articleAuthorsInput'),
		$hypeInput = $('#articleHypeSelect'),
		$versionTestedInput = $('#articleVersionTestedSelect'),
		$betterInput = $('#articleBetterInput'),
		$worseInput = $('#articleWorseInput'),
		$equalInput = $('#articleEqualInput'),
		$coverInput = $('#articleCoverInput'),
		$bgHInput = $('#articleBgHSelect'),
		$bgVInput = $('#articleBgVSelect'),
		$themeInput = $('#articleThemeSelect'),
		$subthemeInput = $('#articleSubthemeSelect'),
		$mainInput = $('#articleMainInput'),
		$main640Input = $('#articleMain640Input'),
		$main320Input = $('#articleMain320Input');
	
	
	
	
	/** 
	 * PUBLIC
	 */
	
	/**
	 * Publish
	 */

	this.prime = "gta-5";
	this.tags = "";
	this.site = "forplay";
	this.url = "gta-5";
	this.date = new Date();
	this.issue = "issue-1-reboot";
	
	/**
	 * Subject
	 */
	
	this.type = "games";
	this.subtype = "review";
	this.title = "Grand Theft Auto V – сатирично менгеме. Вече и в 1080p!";
	this.subtitle = "Песен за Сам и Дан Хаузър...";
	this.authors = "Koralsky,Snake,Jakooth";
	this.hype = "95";
	this.versionTested = "PS4";
	
	/**
	 * Cover
	 */
	
	this.cover = "../assets/articles/gta-5/gta-5-cover.jpg";
	this.bgH = "center";
	this.bgV = "top";
	this.theme = "FF6000";
	this.subtheme = "FFFFFF";
	this.main = "../assets/articles/gta-5/gta-5-main.jpg";
	this.main320 = "../assets/articles/gta-5/gta-5-main-320.png";
	this.main640 = "../assets/articles/gta-5/gta-5-05.jpg";
	this.better = "gta";
	this.worse = "gta-5";
	this.equal = "diablo-3";
	
	/**
	 * TODO: Validate fields.
	 */
	
	this.save = function () {
		self.type = $typeInput.val();
		self.subtype = $subtypeInput.val();
		self.title = $titleInput.val() || self.title;
		self.subtitle = $subtitleInput.val() || self.subtitle;
		self.authors = $authorsInput.val() || self.authors;
		
		self.cover = $coverInput.val() || self.cover;
		self.bgH = $bgHInput.val();
		self.bgV = $bgVInput.val();
		self.theme = $themeInput.val() ? $themeInput.find(':selected').text() : "";
		self.subtheme = $subthemeInput.val() ? $subthemeInput.find(':selected').text() : "";
		self.main = $mainInput.val() || self.main;
		self.main320 = $main320Input.val() || self.main320;
		self.main640 = $main640Input.val() || self.main640;
		
		if (self.subtype == 'review') {
			self.hype = $hypeInput.val();
			self.versionTested = $versionTestedInput.val();
			
			self.better = $betterInput.val() || self.better;
			self.worse = $worseInput.val() || self.worse;
			self.equal = $equalInput.val() || self.equal;
		}
	}
	 
	this.publish = function () {
		self.save();
		
		/**
		 * In the input tags are stored in the sequence you add them,
		 * but we want them in the order they appear in the UI.
		 * Thus we return the SPAN elements and join the text in array.
		 * The result is === to the input value.
		 */
		
		self.prime = $tagsInput.parents('label').find('.tag').eq(0).text();
		self.tags = $tagsInput.parents('label').find('.tag').map(function (i, element) {
			return $(element).text();
		}).get().join(",");
		
		if (self.type == 'games') {
			self.site = 'forplay';
		} else {
			self.site = 'forlife';
		}
		
		if (self.subtype == 'review') {
			self.url = self.prime;
		} else {
			self.url = self.title.toLowerCase().replace(/[:?\.,!]|– |- /g, '');
			self.url = self.url.replace(/ /g, '-');
		}
		
		self.date = new Date($dateInput.val() + ' ' + $timeInput.val());
		self.issue = $issueInput.val() || self.issue;
		
		return self;
	}
	
	this.hypeToString = function(hype) {
		var hype = hype || self.hype;
			s = new String(hype);
		
		self.hype = s.slice(0, s.length - 1) + 
					(s.slice(s.length - 1) == 5 ? '+' : '');
	}
	
	this.hypeToNumber = function(hype) {
		self.hype = hype.indexOf('+') != -1 ? hype.replace('+', 5) 
											: hype + "0";
	}
	
	
	
	
	
	
	
	
	/** 
	 * INIT
	 */
}
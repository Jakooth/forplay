function Article() {
	
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
		$main320Input = $('#articleMain320Input'),
		$videoTechInput = $('#articleVideoTechSelect'),
		$audioTechInput = $('#articleAudioTechSelect'),
		$videoUrlInput = $('#articleVideoUrlInput'),
		$audioFrameInput = $('#articleAudioFrameInput'),
		$audioUrlInput = $('#articleAudioUrlInput');
	
	
	
	
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
	
	this.type;
	this.subtype;
	this.audio;
	this.video;
	this.title = "Grand Theft Auto V – сатирично менгеме. Вече и в 1080p!";
	this.subtitle = "Песен за Сам и Дан Хаузър...";
	this.authors = "Koralsky,Snake,Jakooth";
	this.hype;
	this.versionTested = "PS4";
	
	/**
	 * Cover
	 */
	
	this.cover = "gta-5-cover.jpg";
	this.bgH;
	this.bgV;
	this.theme;
	this.subtheme;
	this.main = "gta-5-main.jpg";
	this.main320 = "gta-5-main-320.png";
	this.main640 = "gta-5-05.jpg";
	this.better = "gta";
	this.worse = "gta-5";
	this.equal = "diablo-3";
	
	/**
	 * TODO: Validate fields.
	 */
	
	this.save = function () {
		self.type = {'tag':$typeInput.val(),
					 'bg':$typeInput.find(':selected').text()};
		self.subtype = {'tag':$subtypeInput.val(),
					 	'bg':$subtypeInput.find(':selected').text()};
		self.title = $titleInput.val() || self.title;
		self.subtitle = $subtitleInput.val() || self.subtitle;
		self.authors = $authorsInput.val() || self.authors;
		
		self.cover = $coverInput.val().split('/').pop() || self.cover;
		self.bgH = $bgHInput.val();
		self.bgV = $bgVInput.val();
		self.theme = $themeInput.val() ? $themeInput.find(':selected').text() : "";
		self.subtheme = $subthemeInput.val() ? $subthemeInput.find(':selected').text() : "";
		self.main = $mainInput.val().split('/').pop() || self.main;
		self.main320 = $main320Input.val().split('/').pop() || self.main320;
		self.main640 = $main640Input.val().split('/').pop() || self.main640;
		
		if (self.subtype.tag == 'review') {
			self.hype = $hypeInput.val();
			self.versionTested = $versionTestedInput.val();
			
			self.better = $betterInput.val() || self.better;
			self.worse = $worseInput.val() || self.worse;
			self.equal = $equalInput.val() || self.equal;
		} else {
			self.hype =
			self.versionTested =
			self.better =
			self.worse =
			self.equal = "";
		}
		
		if (self.subtype.tag == 'news') {
			if ($audioTechInput.val() == "") {
				self.audio = "";
			} else {
				self.audio = {'tech':$audioTechInput.val(), 
							 'url':$audioUrlInput.val(), 
							 'frame':$audioFrameInput.val()};
			}
			
			if ($videoTechInput.val() == "") {
				self.video = "";
			} else {
				self.video = {'tech':$videoTechInput.val(), 
							  'url':$videoUrlInput.val()};
			}
		} else {
			self.audio =
			self.video = "";
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
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

	this.prime;
	this.tags;
	this.site;
	this.url;
	this.date;
	this.issue;
	
	/**
	 * Subject
	 */
	
	this.type;
	this.subtype;
	this.title;
	this.subtitle;
	this.authors;
	this.hype;
	this.versionTested;
	
	/**
	 * Cover
	 */
	
	this.cover;
	this.bgH;
	this.bgV;
	this.theme;
	this.subtheme;
	this.main;
	this.main320;
	this.main640;
	this.better;
	this.worse;
	this.equal;
	
	/**
	 * TODO: Validate fields.
	 */
	
	this.save = function () {
		self.type = $typeInput.val();
		self.subtype = $subtypeInput.val();
		self.title = $titleInput.val();
		self.subtitle = $subtitleInput.val();
		self.author = $authorsInput.val();
		
		self.cover = $coverInput.val();
		self.bgH = $bgHInput.val();
		self.bgV = $bgVInput.val();
		self.theme = $themeInput.val();
		self.subtheme = $subthemeInput.val();
		self.main = $mainInput.val();
		self.main320 = $main320Input.val();
		self.main640 = $main640Input.val();
		
		if (self.subtype == 'review') {
			self.hype = $hypeInput.val();
			self.versionTested = $versionTestedInput.val();
			
			self.better = $betterInput.val();
			self.worse = $worseInput.val();
			self.equal = $equalInput.val();
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
		}).get().join(",")
		
		if (self.type == 'games') {
			self.site = 'forplay';
		} else {
			self.site = 'forlife';
		}
		
		if ($subtypeInput.val() == 'review') {
			self.url = prime;
		} else {
			self.url = $titleInput.val().toLowerCase().replace(' ', '-');
		}
		
		self.date = new Date($dateInput.val() + ' ' + $timeInput.val());
		self.issue = $issueInput.val();
		
		return self;
	}
	
	
	
	
	/** 
	 * INIT
	 */
}
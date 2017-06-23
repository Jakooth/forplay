$(document).ready(function() { 
	window.utils = new UtilsManager();
	window.banner = new BannerManager();
  
  /**
	 * Login depends on utiile and banner.
	 */
	 
	window.login = new LoginManager();												
	window.userProfile = null;
  
  /**
	 * Send the authorization header on all API requests.
	 * Note there is configuration in .htaccess to allow this.
   * Do this first, becaue there are dependencies.
	 */
	
	$.ajaxSetup({ 
		'beforeSend': function(xhr) { 
			if (localStorage.getItem('idToken')) { 
				xhr.setRequestHeader('Authorization',  
									 'Bearer ' + localStorage.getItem('idToken')); 
			} 
		} 
	});
  
  /**
	 * Comments depend on login.
	 */
  
  window.comment = new CommentManager();
	window.articles = new ArticlesManager();
	window.player = new PlayerManager();
  window.ads = new PiggyManager();
	
	/**
	 * Init user profile.
	 */
	
	login.getUserProfile();
	
	/**
	 * i18n
	 */
	
	i18next.use(new i18nextXHRBackend())
		   .use(new i18nextBrowserLanguageDetector())
		   .init();
		   
	i18next.changeLanguage('bg_BG');
	
	/**
	 * Google Analytics
	 */

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-77376926-1', 'auto');
	ga('send', 'pageview');
});
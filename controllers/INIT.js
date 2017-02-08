$(document).ready(function() {
	window.utils = new UtilsManager();
	window.banner = new BannerManager();
	window.articles = new ArticlesManager();
	window.player = new PlayerManager();
	
	/**
	 * Login
	 */
	
	window.lock = new Auth0Lock('P8wrSYlMVUu5rZDEFGSqFL18tVfgo9Gz',
								'forplay.eu.auth0.com' , 
								{avatar: null}); 
	window.login = new LoginManager();												
	window.userProfile = null; 
	
	login.getUserProfile();
	
	/**
	 * Send the authorization header on all API requests.
	 * Note there is configuration in .htaccess to allow this.
	 */
	
	$.ajaxSetup({ 
		'beforeSend': function(xhr) { 
			if (localStorage.getItem('userToken')) { 
				xhr.setRequestHeader('Authorization',  
									 'Bearer ' + localStorage.getItem('userToken')); 
			} 
		} 
	});
	
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
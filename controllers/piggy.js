function PiggyManager() {
  
  /**
	 * PRIVATE
	 */
	
	var self = this;
  var adsInterval;
  var adsIntervalDuration = 20000;
  /**
   * TODO: This will be replaced with data from the server.
   * This works for now, but we cannot track clicks.
   */
  
  var banners = [{
    "ad_id": "1",
    "img": "onfest-2017-gds.jpg?v=1.0.0",
    "url": "http://www.gamedevsummit.com/",
    "weight": 1
  }, {
    "ad_id": "2",
    "img": "onfest-2017-gaming.png?v=1.0.0",
    "url": "http://onfest.org/gaming.php",
    "weight": 3
    }
  ];
  
  var $topAds = $('#topPiggies');
  var $videoAds = $('#videoPiggies');
  
  var _renderAd = function() {
    var banner = _getRandomBanner();
    var renderer = $.get('renderers/piggy.html?v=1.0.0');
    
    $.when(renderer).done(function(rendererData) {
      var tmpls = $.templates({
				    adTemplate: rendererData
			    }), 
          html = $.templates.adTemplate.render(banner);
          
          $topAds.find('[role=complementary]').remove();
          $topAds.append(html);
    }).fail(function() {
			console.log("Failed to load ads.");
		});
  }

  /**
   * Credits go to:
   * http://www.ryanalynporter.com/2013/01/27/super-minimal/
   */

  var _getRandomBanner = function () {
    var totalWeight = 0, 
        cummulativeWeight = 0, 
        i,
        random;
        
    for (i = 0; i < banners.length; i++) {
        totalWeight += banners[i]['weight'];
    }
    
    random = Math.floor(Math.random() * totalWeight);

    for (i = 0; i < banners.length; i ++) {
      cummulativeWeight += banners[i]['weight'];
      
      if (random < cummulativeWeight) {
            return(banners[i]);
      }
    }
  }
  
  
  
  
  
  
  
  
  /**
	 * EVENTS
	 */
   
  $(window).on('load', function(e) {
    _renderAd();
    
    adInterval = setInterval(function() {
      _renderAd();
    }, adsIntervalDuration);
  });
}
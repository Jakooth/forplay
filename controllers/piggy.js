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

  var topBanners = [
    /*{
        "ad_id": "1",
        "title": "OnFest 2017 Geme Dev Summit banner",
        "start_date": "2017-06-01 12:00:00",
        "end_date": "2017-02-01 12:00:00",
        "img": "onfest-2017-gds.jpg?v=1.0.0",
        "url": "http://www.gamedevsummit.com/",
        "weight": 1
      },*/
    /*{
        "ad_id": "2",
        "title": "OnFest 2017 Gaming banner",
        "start_date": "2017-06-26 12:00:00",
        "end_date": "2017-02-26 12:00:00",
        "img": "onfest-2017-gaming.png?v=1.0.0",
        "url": "http://onfest.org/gaming.php",
        "weight": 3
      },*/
    {
      "ad_id": "3",
      "title": "Castle Design billboard",
      "start_date": "2017-08-01 12:00:00",
      "end_date": "2017-08-01 12:00:00",
      "video": "castle-design-billboard.mp4?v=1.0.0",
      "url": "https://www.forplay.bg/articles/games/news/18/castle-design",
      "weight": 2
    }, {
      "ad_id": "3",
      "title": "Forplay billboard",
      "start_date": "2017-08-01 12:00:00",
      "end_date": "2017-08-01 12:00:00",
      "video": "forplay-billboard.mp4?v=1.0.1",
      "url": "https://www.forplay.bg/articles/games/video/313/forplaybg",
      "weight": 2
    }
  ];

  var videoBanners = [{
    "ad_id": "3",
    "title": "Castle Design billboard",
    "start_date": "2017-08-01 12:00:00",
    "end_date": "2017-08-01 12:00:00",
    "video": "castle-design-billboard.mp4?v=1.0.0",
    "url": "https://www.forplay.bg/articles/games/news/18/castle-design",
    "weight": 2
  }, {
    "ad_id": "3",
    "title": "Forplay billboard",
    "start_date": "2017-08-01 12:00:00",
    "end_date": "2017-08-01 12:00:00",
    "video": "forplay-billboard.mp4?v=1.0.3",
    "url": "https://www.forplay.bg/articles/games/video/313/forplaybg",
    "weight": 2
  }];

  var readBanners = [{
    "ad_id": "4",
    "title": "Castle Design half page",
    "start_date": "2017-06-26 12:00:00",
    "end_date": "2017-02-26 12:00:00",
    "video": "castle-design-half-page.mp4?v=1.0.0",
    "url": "https://www.forplay.bg/articles/games/news/18/castle-design",
    "weight": 3
  }, {
    "ad_id": "5",
    "title": "Forplay half page",
    "start_date": "2017-06-26 12:00:00",
    "end_date": "2017-02-26 12:00:00",
    "video": "forplay-half-page.mp4?v=1.0.3",
    "url": "https://www.forplay.bg/articles/games/video/313/forplaybg",
    "weight": 3
  }];

  var $topAds = $('#topPiggies');
  var $videoAds = $('#videoPiggies');
  var $readAds = $('#readPiggies');

  var _renderAd = function () {
    var topBanner = _getRandomBanner(topBanners);
    var videoBanner = _getRandomBanner(videoBanners);
    var readBanner = _getRandomBanner(readBanners);
    var renderer = $.get('/renderers/piggy.html?v=1.0.0');

    $.when(renderer).done(function (rendererData) {
      var tmpls = $.templates({
          adTemplate: rendererData
        }),
        topHtml = $.templates.adTemplate.render(topBanner),
        videoHtml = $.templates.adTemplate.render(videoBanner),
        readHtml = $.templates.adTemplate.render(readBanner);

      if (topBanner) {
        $topAds.find('[role=complementary]').remove();
        $topAds.append(topHtml);
      }

      if (videoBanner) {
        $videoAds.find('[role=complementary]').remove();
        $videoAds.append(videoHtml);
      }

      if (readBanner) {
        $readAds.find('[role=complementary]').remove();
        $readAds.append(readHtml);
      }
    }).fail(function () {
      console.log("Failed to load ads.");
    });
  }

  /**
   * Credits go to:
   * http://www.ryanalynporter.com/2013/01/27/super-minimal/
   */

  var _getRandomBanner = function (banners) {
    if (banners.length == 0) return false;

    var totalWeight = 0,
      cummulativeWeight = 0,
      i,
      random;

    for (i = 0; i < banners.length; i++) {
      totalWeight += banners[i]['weight'];
    }

    random = Math.floor(Math.random() * totalWeight);

    for (i = 0; i < banners.length; i++) {
      cummulativeWeight += banners[i]['weight'];

      if (random < cummulativeWeight) {
        return (banners[i]);
      }
    }
  }








  /**
   * EVENTS
   */

  $(window).on('load', function (e) {
    _renderAd();

    adInterval = setInterval(function () {
      _renderAd();
    }, adsIntervalDuration);
  });
}
<!DOCTYPE html>
<html lang="bg_BG">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta content="width=device-width, initial-scale=1, maximum-scale=2, user-scalable=yes" name="viewport">
<?php include ('meta.php'); ?>
<link rel="stylesheet" type="text/css" href="/jslib/video-js/video-js.css" />
<link media="only screen and (min-width: 1280px)" rel="stylesheet" type="text/css" href="/assets/forplay.css?v=3.5.0" />
<link media="only screen and (max-width: 1279px)" rel="stylesheet" type="text/css" href="/assets/forplay-mobile.css?v=3.5.0" />
<link rel='stylesheet' type='text/css' href='https://fonts.googleapis.com/css?family=Open+Sans:300,800|Poiret+One&subset=cyrillic,latin' />
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<link rel="icon" href="/favicon.ico" type="image/x-icon">
<link href="https://www.forplay.bg/apple-touch-icon.png" rel="apple-touch-icon" />
<link href="https://www.forplay.bg/apple-touch-icon-76x76.png" rel="apple-touch-icon" sizes="76x76" />
<link href="https://www.forplay.bg/apple-touch-icon-120x120.png" rel="apple-touch-icon" sizes="120x120" />
<link href="https://www.forplay.bg/apple-touch-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
<!--EXTERNAL
	jQuery - selectors and DOM manipulations
  jQuery Mobile - mobile events handler
  jQuery Cookie - store user variable
  Video JS - html player for embed video
  Video JS Vimeo - vimeo add-on
  Video JS Youtube - youtube add-on 
  HE - encode and decode data
  jsRender - templating tool vor javascript
  Auth0 - single sign on system-->
<script src="/jslib/jquery-2.1.4.min.js" type="text/javascript">
	<!--script-->
</script>
<script src="/jslib/jquery.mobile.custom.min.js" type="text/javascript">
	<!--script-->
</script>
<script src="/jslib/video-js/video.js" type="text/javascript">
	<!--script-->
</script>
<script src="/jslib/video-js/vjs.vimeo.js" type="text/javascript">
	<!--script-->
</script>
<script src="/jslib/video-js/vjs.youtube.js" type="text/javascript">
	<!--script-->
</script>
<script src="/jslib/he.js" type="text/javascript">
	<!--script-->
</script>
<script src="/jslib/jsrender.min.js" type="text/javascript">
	<!--script-->
</script>
<script src="https://cdn.auth0.com/js/auth0/8.3.0/auth0.min.js">
	<!--script-->
</script>
<script src="https://cdn.auth0.com/js/lock/10.12.1/lock.min.js">
	<!--script-->
</script>
<!--LOCALIZATION
	i18next - handle some english strings-->
<script src="/jslib/i18next.min.js" type="text/javascript">
	<!--script-->
</script>
<script src="/jslib/i18nextXHRBackend.min.js" type="text/javascript">
	<!--script-->
</script>
<script src="/jslib/i18nextBrowserLanguageDetector.min.js" type="text/javascript">
	<!--script-->
</script>
<!--FORPLAY
	utils - common function for all modules
  banner - animations and interactions with the banner section
  comment - post a comment, reply, like, flag, etc.
  articles - main contant loading and placment
  player - embed video play support-->
<script src="/controllers/utils.js?v=3.0.0" type="text/javascript">
	<!--script-->
</script>
<script src="/controllers/banner.js?v=3.0.0" type="text/javascript">
	<!--script-->
</script>
<script src="/controllers/comment.js?v=3.0.0" type="text/javascript">
	<!--script-->
</script>
<script src="/controllers/articles.js?v=3.0.0" type="text/javascript">
	<!--script-->
</script>
<script src="/controllers/player.js?v=3.0.0" type="text/javascript">
	<!--script-->
</script>
<script src="/foradmin/controllers/login.js?v=3.0.1" type="text/javascript">
	<!--script-->
</script>
<script src="/controllers/INIT.js?v=3.0.0">
	<!--script-->
</script>
</head>
<body aria-busy="true">
<header>
  <h1> <a href="/"> <img id="forPlay" class="svg" 
            			 src="/assets/forplay.svg" 
            			 alt="Forplay&reg;" /></a> <a 
            			 href="/"> <img 
            			 id="forLife" class="svg" 
            			 src="/assets/forlife.svg" 
            			 alt="Forlife&reg;" /> </a> </h1>
  <section class="cover-set">
    <h2>Корици</h2>
    <div id="covers"> 
      <!--ArticlesManager: loadArticles--> 
    </div>
    <div id="thumbnails"> 
      <!--ArticlesManager--> 
    </div>
  </section>
  <section class="nav-set">
    <h2>Навигация, търсене и потребителски профил</h2>
    <div class="special" role="region">
      <button type="button" 
              id="hideHeaderButton"
              role="presentation"
              aria-pressed="false"><span>Скрии</span></button>
    </div>
    <nav>
      <h3><span>Навигация</span></h3>
      <ul>
        <li> <a href="/portals/video">Видео</a> </li>
        <li> <a href="/portals/review">Ревюта</a> </li>
        <li> <a href="/portals/feature">Мнения</a> </li>
        <li> <a href="/portals/news">Новини</a> </li>
        <li> <a href="http://www.gamersvoiceshop.com/" 
                target="_blank">GVS</a> </li>
        <li> <a href="http://forplay.bg/forums/" 
                target="_blank">Форум</a> </li>
      </ul>
    </nav>
    <div class="search" role="search">
      <h3><span>Търсене</span></h3>
      <form method="get" action="#search">
        <label for="search">Tърсене:</label>
        <input type="search" placeholder="пример Diablo, Диабло, 300" 
               name="search" id="search">
        <button type="submit">Търси</button>
      </form>
    </div>
    <div class="user" role="region">
      <h3><span>Профил</span></h3>
      <button id="userLogin" type="button" 
      		  aria-pressed="false"><i>Наздраве, </i><b>непознат</b></button>
    </div>
  </section>
</header>
<main>
  <h1>Съдържание</h1>
  <article id="read" aria-hidden="true">
    <section class="read-set"> 
      <!--ArticlesManager: loadArticles--> 
    </section>
    <section id="comment" class="comment-set" aria-busy="true"> 
      <!--ArticlesManager: loadArticles-->
      <form id="sendCommentForm" aria-hidden="true">
        <h3 id="addCommentHeading">Добави нов коментар.</h3>
        <div role="textbox" 
             tabindex="0" 
             contenteditable="true" 
             aria-multiline="true" 
             aria-readonly="false"></div>
        <div role="toolbar">
          <button data-icon="send" type="button"><span>Добави</span></button>
          <button data-icon="clear" type="button"><span>Изчисти</span></button>
          <button data-icon="bold" type="button"><span>Болд</span></button>
          <button data-icon="italic" type="button"><span>Италик</span></button>
        </div>
      </form>
    </section>
  </article>
  <section id="topArticles" class="article-set">
    <h2>Последни статии</h2>
    <!--ArticlesManager: loadArticles--> 
  </section>
  <section aria-hidden="true" class="adv-set">
    <h2>Реклама</h2>
    <!--Advertisement--> 
  </section>
  <section id="topVideos" class="video-set">
    <h2>Последни клипчета</h2>
    <!--ArticlesManager: loadArticles--> 
  </section>
  <section id="topReviews" class="article-set">
    <h2>Препоръчани ревюта</h2>
    <!--ArticlesManager: loadArticles--> 
  </section>
  <section aria-hidden="true" class="adv-set">
    <h2>Реклама</h2>
    <!--Advertisement--> 
  </section>
  <section id="allArticles" class="article-set">
    <h2>Всички статии</h2>
    <!--ArticlesManager: loadArticles--> 
  </section>
</main>
<section id="userProfile" class="profile" aria-hidden="true">
  <form>
    <button id="profileClose"  type="button"><span>Затвори</span></button>
    <button id="profileChange" type="button" 
    		aria-pressed="false"><span>Смени профила</span></button>
    <h1>Моят профил</h1>
    <input id="profileId" type="hidden" />
    <label>
      <input id="profileNickname" aria-label="Прякор" placeholder="Прякор" type="text" />
    </label>
    <label>
      <input id="profileGivenName" aria-label="Име" placeholder="Име" type="text" />
    </label>
    <label>
      <input id="profileFamilyName" aria-label="Фамилия" placeholder="Фамилия" type="text" />
    </label>
    <div role="region">
      <label class="switch">
      <input id="profileDarkened" type="checkbox" />
      <div class="slider"></div>
      <span>Притъмняло ми е</span>
      </label>
      <label class="switch">
      <input id="profileCollapsed" type="checkbox">
      <div class="slider"></div>
      <span>Скрии хедъра</span>
      </label>
    </div>
    <div role="toolbar">
      <button id="profileUpdate" type="button">Обнови профила</button>
      <button id="userLogout" type="button">Излез от Форплей</button>
    </div>
  </form>
</section>
<footer>
  <p>&copy; Copyright 2015 <a href="/articles/games/news/18/castle-design">Castle
    Design Ltd.</a> </p>
  <p>Тази страница се придържа към <a href="http://www.cencenelec.eu/News/Press_Releases/Pages/PR-2014-03.aspx">Европейските
    Изисквания за Достъпност на Обществени Продукти и Услуги.</a> </p>
  <p>Икони за кориците благодарение на <a href="http://game-icons.net/">Game-icons.net.</a> </p>
</footer>
</body>
</html>

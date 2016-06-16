<!DOCTYPE html>
<html lang="bg_BG">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta content="width=device-width, initial-scale=1, maximum-scale=2, user-scalable=yes" name="viewport">
<?php include ('meta.php'); ?>
<link rel="stylesheet" type="text/css" href="/jslib/video-js/video-js.css" />
<link media="only screen and (min-width: 1280px)" rel="stylesheet" type="text/css" href="/assets/forplay.css?v=2.1.1" />
<link media="only screen and (max-width: 1279px)" rel="stylesheet" type="text/css" href="/assets/forplay-mobile.css?v=2.1.1" />
<link href='https://fonts.googleapis.com/css?family=Open+Sans:300,800|Poiret+One&subset=cyrillic,latin' rel='stylesheet' type='text/css' />
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
    jsRender - templating tool vor javascript-->
<script src="/jslib/jquery-2.1.4.min.js" type="text/javascript">
	<!--script-->
</script>
<script src="/jslib/jquery.mobile.custom.min.js" type="text/javascript">
	<!--script-->
</script>
<script src="/jslib/jquery.cookie.js" type="text/javascript">
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
    articles - main contant loading and placment
    player - embed video play support-->
<script src="/controllers/utils.js?v=2.0.3" type="text/javascript">
	<!--script-->
</script>
<script src="/controllers/banner.js?v=2.0.2" type="text/javascript">
	<!--script-->
</script>
<script src="/controllers/articles.js?v=2.0.3" type="text/javascript">
	<!--script-->
</script>
<script src="/controllers/player.js?v=2.0.0" type="text/javascript">
	<!--script-->
</script>
<script src="/controllers/INIT.js?v=2.0.0">
	<!--script-->
</script>
</head>
<body>
<header>
    <h1> <a href="/"> <img 
            id="forPlay" class="svg" 
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
        <h2>Навигация, търсене и потребителски вход</h2>
        <div class="special">
            <button type="button" 
            		id="hideHeaderButton"
                    role="presentation"
                    aria-pressed="false"><span>Скрии</span></button>
        </div>
        <nav>
            <h3><span>Навигация</span></h3>
            <ul>
                <li> <a href="#topArticles">Новини</a> </li>
                <li> <a href="#topVideos">Видео</a> </li>
                <li> <a href="#topReviews">Ревюта</a> </li>
                <li> <a href="#topReviews">Мнения</a> </li>
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
        <div class="user">
            <h3><span>Потребителски вход</span></h3>
            <button type="button"><span>Влез</span></button>
            <ul>
                <li> <a href="#">Профил</a> </li>
                <li> <a href="#">Настройки</a> </li>
                <li> <a href="#">Изход</a> </li>
            </ul>
        </div>
    </section>
</header>
<main>
    <h1>Основно съдържание</h1>
    <article id="read" aria-hidden="true">
        <section class="read-set">
            <!--ArticlesManager: loadArticles-->
        </section>
    </article>
    <section id="topArticles" class="article-set">
        <h2>Избрани статии</h2>
        <!--ArticlesManager: loadArticles-->
    </section>
    <section aria-hidden="true" class="adv-set">
    	<h2>Реклама</h2>
        <!--Advertisement-->
    </section>
    <section id="topVideos" class="video-set">
        <h2>Най-нови клипчета</h2>
        <!--ArticlesManager: loadArticles-->
    </section>
    <section id="topReviews" class="article-set">
        <h2>Най-нови ревюта</h2>
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
<footer>
    <p>&copy; Copyright 2015 <a href="/articles/games/news/18/castle-design">Castle
            Design Ltd.</a> </p>
    <p>Тази страница се придържа към <a href="http://www.cencenelec.eu/News/Press_Releases/Pages/PR-2014-03.aspx">Европейските
            Изисквания за Достъпност на Обществени Продукти и Услуги.</a> </p>
    <p>Икони за кориците благодарение на <a href="http://game-icons.net/">Game-icons.net.</a> </p>
</footer>
</body>
</html>
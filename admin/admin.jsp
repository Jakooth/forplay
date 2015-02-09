<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/admin">
    <c:set var="language" value="${not empty param.language 
			? param.language : not empty language 
			? language : pageContext.request.locale}" scope="session" />
    <fmt:setLocale 	value="${language}" />
    <fmt:setBundle 	basename="i18n.admin" var="lang" scope="session" />
    <jsp:output 	doctype-root-element="html" 
					doctype-system="" />
    <jsp:directive.page contentType="text/html"/>
    <html xmlns="http://www.w3.org/1999/xhtml" lang="${language}">
    <head>
    <meta content="charset=utf-8" />
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Forplay Admin</title>
    <link rel="stylesheet" type="text/css" href="../assets/admin/bootstrap-tagsinput.css" />
    <link rel="stylesheet" type="text/css" href="../assets/admin/typeaheadjs.css" />
    <link rel="stylesheet" type="text/css" href="../assets/admin/admin.css" />
    <script src="../jslib/jquery-1.11.0.min.js" type="text/javascript">
                <!--script-->
            </script>
    <script src="../jslib/jsrender.min.js" type="text/javascript">
                <!--script-->
            </script>
    <script src="../jslib/admin/angular.min.js">
                <!--script-->
            </script>
    <script src="../jslib/admin/bootstrap.min.js">
                <!--script-->
            </script>
    <script src="../jslib/admin/bootstrap-tagsinput.min.js">
                <!--script-->
            </script>
    <script src="../jslib/admin/bootstrap-tagsinput-angular.min.js">
                <!--script-->
            </script>
    <script src="../jslib/admin/typeahead.bundle.js">
                <!--script-->
            </script>
    <script src="../controllers/utils.js?v=1.5.0" type="text/javascript">
                <!--script-->
            </script>
    <script src="../controllers/admin.js?v=1.5.0" type="text/javascript">
                <!--script-->
            </script>
    <script src="../controllers/box.js?v=1.0.0" type="text/javascript">
                <!--script-->
            </script>
    <script type="text/javascript">$(document).ready(function() { 
				window.utils = new UtilsManager(); 
				window.admin = new AdminManager(); 
				window.box = new Box(); });</script>
    </head>
    <body>
    <header id="main">
        <h1 class="clip">
            <admin:menuItem label="Основно меню" url="main" icon="plus-5" clipLabel="clip" />
        </h1>
        <nav aria-label="Категории основни обекти">
            <ul>
                <li>
                    <admin:menuItem label="Игри" url="games" icon="gamepad-9" />
                </li>
                <li>
                    <admin:menuItem label="Кино и Сериали" url="movies" icon="video-2" />
                </li>
                <li>
                    <admin:menuItem label="Музика" url="music" icon="audio-7" />
                </li>
                <li>
                    <admin:menuItem label="Книги" url="books" icon="book-17" />
                </li>
                <li>
                    <admin:menuItem label="Настолни Игри" url="board" icon="puzzle" />
                </li>
            </ul>
        </nav>
        <nav aria-label="Добавяне на информация">
            <ul>
                <li>
                    <admin:menuItem label="Статия" url="article" icon="font-size" />
                </li>
                <li>
                    <admin:menuItem label="Картинки" url="images" icon="picture-multi-2" />
                </li>
                <li>
                    <admin:menuItem label="Каре" url="aside" icon="side-right-view" />
                </li>
                <li>
                    <admin:menuItem label="Реклама" url="advert" icon="banknote-multi-10" />
                </li>
                <li>
                    <admin:menuItem label="Цитат" url="quote" icon="quote-15" />
                </li>
            </ul>
        </nav>
    </header>
    <main>
        <jsp:include page="views/games.jsp" />
        <jsp:include page="views/movies.jsp" />
        <jsp:include page="views/game.jsp" />
        <jsp:include page="views/article.jsp" />
        <jsp:include page="views/gameCompany.jsp" />
        <jsp:include page="views/platform.jsp" />
        <jsp:include page="views/gamePerson.jsp" />
        <jsp:include page="views/gameCharacter.jsp" />
        <jsp:include page="views/gameGenre.jsp" />
    </main>
    <footer>
        <p>&amp;copy; Copyright 2015
            <a href="?video=castle-design">Castle Design Ltd.</a>
        </p>
        <p>Тази страница се придържа към
            <a href="http://www.mandate376.eu/">Европейските Изисквания за Достъпност
            на Обществени Продукти и Услуги.</a>
        </p>
    </footer>
    <div class="Overlay">
        <!--admin.js-->
    </div>
    </body>
    </html>
</jsp:root>

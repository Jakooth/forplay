<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/admin">
    <section id="boardGames">
        <h2>
            <admin:menuItem label="Създай..." title="Настолни Игри" url="boardGames" />
        </h2>
        <nav aria-label="Обекти в настолни игри">
            <ul>
                <li>
                    <admin:menuItem label="dungeons-and-dragons-5th-edition-starter-set, star-wars-the-card-game-balance-of-the-force-expansion" title="Настолна Игра" url="boardGame" />
                </li>
                <li>
                    <admin:menuItem label="dungeons-and-dragons, star-wars-the-card-game" title="Поредица" url="movieSerie" />
                </li>
            </ul>
        </nav>
    </section>
</jsp:root>

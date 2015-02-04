<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/admin">
    <section id="games">
        <h2>
            <admin:menuItem label="Създай..." title="Игри" url="games" />
        </h2>
        <nav aria-label="Обекти в игри">
            <ul>
                <li><admin:menuItem label="gta, gta-5, diablo-3, alien-isolation" title="Игра" url="game" /></li>
                <li><admin:menuItem label="rockstar, take-two, blizzard-north" title="Компания" url="gameCompany" /></li>
                <li><admin:menuItem label="win, mac, 360, ps4, vita, android" title="Платформа" url="platform" /></li>
                <li><admin:menuItem label="shigeru-miyamoto, sam-houser" title="Персона" url="gamePerson" /></li>
                <li><admin:menuItem label="sonic, master-chief, duke-nukem" title="Герой" url="gameCharacter" /></li>
                <li><admin:menuItem label="action, adventure, open-mmo" title="Жанр" url="gameGenre" /></li>
            </ul>
        </nav>
    </section>
</jsp:root>

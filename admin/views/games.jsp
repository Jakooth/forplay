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
                <admin:menuItem label="gta, gta-5, diablo-3, alien-isolation" title="Игра" url="game" />
                <admin:menuItem label="rockstar, take-two, blizzard-north" title="Компания" url="company" />
                <admin:menuItem label="win, mac, 360, ps4, vita, android" title="Платформа" url="platform" />
                <admin:menuItem label="shigeru-miyamoto, sam-houser" title="Персона" url="person" />
                <admin:menuItem label="sonic, master-chief, duke-nukem" title="Герой" url="character" />
                <admin:menuItem label="action, adventure, open-world" title="Жанр" url="genre" />
            </ul>
        </nav>
    </section>
</jsp:root>

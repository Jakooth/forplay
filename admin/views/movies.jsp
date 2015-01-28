<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/admin">
    <section id="movies">
        <h2>
            <admin:menuItem label="Създай..." title="Кино и Сериали" url="movies" />
        </h2>
        <nav aria-label="Обекти в кино и сериали">
            <ul>
                <admin:menuItem label="true-blood, true-blood-season-3, avatar" title="Филм" url="movie" />
                <admin:menuItem label="hbo, walt-disney-animation-studios" title="Компания" url="company" />
                <admin:menuItem label="chuck-norris, david-fincher" title="Персона" url="person" />
                <admin:menuItem label="batman, fox-mulder, rapunzel" title="Герой" url="character" />
                <admin:menuItem label="drama, comedy, animation" title="Жанр" url="genre" />
            </ul>
        </nav>
    </section>
</jsp:root>

<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/admin">
    <section id="movies">
        <h2>
            <admin:menuItem label="Създай..." title="Кино и Телевизия" url="movies" />
        </h2>
        <nav aria-label="Обекти в кино и сериали">
            <ul>
                <li>
                    <admin:menuItem label="true-blood, true-blood-season-3, avatar" title="Филм" url="movie" />
                </li>
                <li>
                    <admin:menuItem label="hbo, walt-disney-animation-studios" title="Компания" url="movieCompany" />
                </li>
                <li>
                    <admin:menuItem label="chuck-norris, david-fincher" title="Персона" url="moviePerson" />
                </li>
                <li>
                    <admin:menuItem label="batman, fox-mulder, rapunzel" title="Герой" url="movieCharacter" />
                </li>
                <li>
                    <admin:menuItem label="star-wars, batman" title="Поредица" url="movieSerie" />
                </li>
                <li>
                    <admin:menuItem label="drama, comedy, animation" title="Жанр" url="movieGenre" />
                </li>
            </ul>
        </nav>
    </section>
</jsp:root>

<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/admin">
    <section id="books">
        <h2>
            <admin:menuItem label="Създай..." title="Музика" url="books" />
        </h2>
        <nav aria-label="Обекти в музика">
            <ul>
                <li>
                    <admin:menuItem label="a-game-of-thrones, the-colour-of-magic" title="Книга" url="book" />
                </li>
                <li>
                    <admin:menuItem label="terry-pratchett, patrick-modiano" title="Автор" url="bookPerson" />
                </li>
                <li>
                    <admin:menuItem label="rincewind, hodor" title="Герой" url="bookCharacter" />
                </li>
                <li>
                    <admin:menuItem label="a-song-of-ice-and-fire, discworld" title="Поредица" url="bookSerie" />
                </li>
                <li>
                    <admin:menuItem label="novel, fantasy, crime, science-fiction" title="Жанр" url="bookGenre" />
                </li>
            </ul>
        </nav>
    </section>
</jsp:root>

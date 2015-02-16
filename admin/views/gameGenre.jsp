<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/admin">
    <section id="gameGenre">
        <h2>
            <admin:menuItem label="Добави жанр и създай таг." title="Жанр" url="gameGenre" />
        </h2>
        <form>
            <admin:formItem id="gameGenreNameInput" label="Жанр" 
            				placeholder="Екшън от първо/трето лице, Куест, ММО" type="text" />
            <admin:formItem id="gameGenreTagInput" label="Таг" 
            				placeholder="action, adventure, mmo" type="text" />
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>

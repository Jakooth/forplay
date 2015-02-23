<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/admin">
    <section id="gameSerie">
        <h2>
            <admin:menuItem label="Добави поредица и създай таг." title="Поредица" url="gameSerie" />
        </h2>
        <form>
            <admin:formItem id="gameSerieNameInput" label="Поредица" 
            				placeholder="Grand Theft Auto, Halo" type="text" />
            <admin:formItem id="gameSerieTagInput" label="Таг" 
            				placeholder="gta, halo" type="text" />
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>

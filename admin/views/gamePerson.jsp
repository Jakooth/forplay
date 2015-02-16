<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/admin">
    <section id="gamePerson">
        <h2>
            <admin:menuItem label="Добави персона и създай таг." title="Персона" url="gamePerson" />
        </h2>
        <form>
            <admin:formItem id="gamePersonNameInput" label="Персона" 
            				placeholder="Шигеру Миямото, Сам Хаузър" type="text" />
            <admin:formItem id="gamePersonTagInput" label="Таг" 
            				placeholder="shigeru-miyamoto, sam-houser" type="text" />
        	<admin:formItem id="gamePersonTagsInput" label="Свързани игри, комапнии или други" 
            				placeholder="gta-5, rockstar" type="text" />
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>

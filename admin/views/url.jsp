<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/admin">
    <section id="url">
        <h2>
            <admin:menuItem label="Избери тип и адрес на статията." title="Адрес" url="url" />
        </h2>
        <form>
            <admin:formItem id="urlTypeSelect" label="Раздел" type="select" layout="two-cols" />
            <admin:formItem id="urlOjbectSelect" label="Категория" type="select" layout="two-cols" />
            <admin:formItem id="urlUrlInput" label="Адрес" type="text" />
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>

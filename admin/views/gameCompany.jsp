<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/admin">
    <section id="gameCompany">
        <h2>
            <admin:menuItem label="Добави компания и създай таг." title="Компания" url="gameCompany" />
        </h2>
        <form>
            <admin:formItem id="gameCompanyNameInput" label="Компания" 
            				placeholder="Crytek" type="text" />
            <admin:formItem id="gameCompanyTagInput" label="Таг" 
            				placeholder="crytek" type="text" />
            <admin:formItem id="gameCompanyTypeSelect" label="Тип" type="select">
            	<option>Разпространител</option>
                <option>Разработчик</option>
                <option>Разпространител и Разработчик</option>
                <option>Друго</option>
            </admin:formItem>
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>

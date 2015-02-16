<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/admin">
    <section id="gameCharacter">
        <h2>
            <admin:menuItem label="Добави герой и създай таг." title="Герой" url="gameCharacter" />
        </h2>
        <form>
            <admin:formItem id="gameCharacterNameInput" label="Герой" 
            				placeholder="Sonic, Master Chief, Duke Nukem" type="text" />
            <admin:formItem id="gameCharacterTagInput" label="Таг" 
            				placeholder="sonic, master-chief, duke-nukem" type="text" />
        	<admin:formItem id="gameCharacterTagsInput" label="Свързани игри, комапнии или други" 
            				placeholder="halo, bungie" type="text" />
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>

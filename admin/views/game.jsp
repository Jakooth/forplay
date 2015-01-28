<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/admin">
    <section id="game">
        <h2>
            <admin:menuItem label="Създай таг и добави информация за играта." title="Игра" url="games" />
        </h2>
        <div role="toolbar">
            <button>Save</button>
            <button>Cancel</button>
        </div>
        <form role="form">
            <admin:formItem id="enNameInput" label="Оригинално име" placeholder="Grand Theft Auto 5" type="text" />
            <admin:formItem id="enNameInput" label="Име на български" placeholder="Гранд Тефт Ауто 5" type="text" />
            <admin:formItem id="tagInput" label="Таг" placeholder="gta-5" type="text" />
            <admin:formItem id="stickersInput" label="Стикери" placeholder="girl, beer, 18+" type="text" />
            <admin:formItem id="genreGroup" label="Жанр" type="group">
                <!--AdminManager.js-->
            </admin:formItem>
            <admin:formItem id="platformGroup" label="Платформа" type="group">
                <!--AdminManager.js-->
            </admin:formItem>
            <admin:formItem id="publisherInput" label="Разпространител" placeholder="SEGA" type="text" autocomplete="off" />
            <admin:formItem id="developerInput" label="Разработчик" placeholder="Creative Assembly" type="text" autocomplete="off" />
            <admin:formItem id="usDateInput" label="Премиера за САЩ" type="date" />
            <admin:formItem id="euDateInput" label="Премиера за Европа" type="date" />
            <admin:formItem id="similarInput" label="Подобни" placeholder="saints-row, mafia, red-dead-redemption, crackdown" type="text" autocomplete="off" />
        </form>
    </section>
</jsp:root>

<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/admin">
    <section id="game">
        <h2>
            <admin:menuItem label="Добави информация за играта и създай таг." title="Игра" url="game" />
        </h2>
        <form>
            <admin:formItem id="gameEnNameInput" label="Оригинално име на играта" 
            				placeholder="Grand Theft Auto 5" type="text" />
            <admin:formItem id="gameBgNameInput" label="Име на играта на български" 
            				placeholder="Гранд Тефт Ауто 5" type="text" />
            <admin:formItem id="gameSeriesInput" label="Поредица" 
            				placeholder="gta, halo" type="text" 
                            autocomplete="off" url="gameSerie" layout="one-col" />
            <admin:formItem id="gameTagInput" label="Таг" 
            				placeholder="gta-5" type="text" />
            <admin:formItem id="gameStickersInput" label="Стикери" 
            				placeholder="girl, beer, 18+" type="text" />
            <admin:formItem id="gameGenreGroup" label="Жанр" type="group">
                <!--AdminManager.js-->
            </admin:formItem>
            <admin:formItem id="gamePlatformGroup" label="Платформа" type="group">
                <!--AdminManager.js-->
            </admin:formItem>
            <admin:formItem id="gamePublisherInput" label="Разпространител" 
            				placeholder="SEGA" type="text" 
                            autocomplete="off" url="gameCompany" layout="one-col" />
            <admin:formItem id="gameDeveloperInput" label="Разработчик" 
            				placeholder="Creative Assembly" type="text" 
                            autocomplete="off" url="gameCompany" layout="one-col" />
            <admin:formItem id="gameUsDateInput" label="Премиера за САЩ" type="date" layout="two-cols" />
            <admin:formItem id="gameEuDateInput" label="Премиера за Европа" type="date" layout="two-cols" />
            <admin:formItem id="gameSimilarInput" label="Подобни" 
            				placeholder="saints-row, mafia, red-dead-redemption, crackdown" 
                            type="text" autocomplete="off" />
            <div class="Add Box">
                <button class="add" type="button">Добави Обложка</button>
            </div>
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>

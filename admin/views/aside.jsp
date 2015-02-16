<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/admin">
    <section id="aside">
        <h2>
            <admin:menuItem label="Създай каре." title="Каре" url="aside" />
        </h2>
        <form>
        	<h3>Категоризиране</h3>
            <admin:formItem id="asideTypeSelect" label="Раздел" type="select" layout="two-cols" />
            <admin:formItem id="asideTagsInput" label="Тагове" 
            				placeholder="gta-5, sam-houser, rockstar" type="text" />
            <admin:formItem id="asideSiteInput" label="Страница"
            				placeholder="forplay, forlife" type="hidden" />
            <admin:formItem id="asideUrlInput" label="Адрес"
            				placeholder="the-title-to-lower-case-for-other" type="hidden" />
            <h3>Тема</h3>
            <admin:formItem id="asideTitle" label="Заглавие" 
            				placeholder="Grand Theft Auto 5" type="text" />
            <admin:formItem id="asideSubtitle" label="Подзаглавие" 
            				placeholder="Grand Theft Auto 5" type="text" />
            <admin:formItem id="asideAuthorSelect" label="Автор" type="select" layout="two-cols" />
            <h3>Съдържание</h3>
            <div class="Content">
                <div class="z0Layout">
                    <button class="select" type="button">
                        <span class="clip">Добави картинка</span>
                        <img src="../assets/helpers/16-9.png" alt="16:9" role="presentation" />
                    </button>
                </div>
                <div class="textLayout" id="textLayout_aside" contenteditable="true">
                    <p>Натиснете тук, за да редактирате текста, използвайки само
                        един параграф,
                        <strong>болд</strong>
                        ,
                        <em>италик</em>
                        и
                        <a href="#" target="_blank">връзки</a>
                        . Този едитор поддържа и стандартни функции, като копи,
                        пейст, ънду и реду. За да редактирата съдържанието директно
                        в HTML използвайте бутона
                        <em>Source</em>
                        .</p>
                </div>
            </div>
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>

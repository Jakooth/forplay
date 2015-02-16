<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/admin">
    <section id="article">
        <h2>
            <admin:menuItem label="Създай статия." title="Статия" url="games" />
        </h2>
        <form>
            <h3>Категоризиране</h3>
            <admin:formItem id="articleTypeSelect" label="Раздел" type="select" layout="two-cols" />
            <admin:formItem id="articleSubtypeSelect" label="Тип" type="select" layout="two-cols" />
            <admin:formItem id="articleTagsInput" label="Тагове" 
            				placeholder="gta-5, sam-houser, rockstar" type="text" />
            <admin:formItem id="articleSiteInput" label="Страница"
            				placeholder="forplay, forlife" type="hidden" />
            <admin:formItem id="articleUrlInput" label="Адрес"
            				placeholder="the-game-tag-for-reviews, the-title-to-lower-case-for-other" type="hidden" />
            <admin:formItem id="articleSiteInput" label="Дата на публикуване" type="date" layout="two-cols" />
            <admin:formItem id="articleSiteInput" label="Час на публикуване" type="time" layout="two-cols" />
            <h3>Тема</h3>
            <admin:formItem id="articleTitle" label="Заглавие" 
            				placeholder="Grand Theft Auto 5" type="text" />
            <admin:formItem id="articleSubtitle" label="Подзаглавие" 
            				placeholder="Grand Theft Auto 5" type="text" />
            <admin:formItem id="articleAuthorSelect" label="Автор" type="select" layout="two-cols" />
            <admin:formItem id="articleHypeSelect" label="Оценка" type="select" layout="two-cols" />
            <admin:formItem id="articleVersionTestedSelect" label="Тествана версия" type="select" />
            <h3>Корица</h3>
            <admin:formItem id="articleBgPositionSelect" label="Раздел" type="select" />
            <admin:formItem id="articleThemeSelect" label="Тип" type="select" layout="two-cols" />
            <admin:formItem id="articleSubthemeSelect" label="Раздел" type="select" layout="two-cols" />
            <div class="Add Content">
                <button class="add" type="button">Добави Съдържание</button>
            </div>
        </form>
        <div role="toolbar">
        	<button class="publish" type="button">Публикувай</button>
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>

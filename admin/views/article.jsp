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
            <h3>Тема</h3>
            <admin:formItem id="articleTypeSelect" label="Раздел" type="select" layout="two-cols" />
            <admin:formItem id="articleSubtypeSelect" label="Тип" type="select" layout="two-cols" />
            <admin:formItem id="articleTitleInput" label="Заглавие" 
            				placeholder="Grand Theft Auto 5" type="text" />
            <admin:formItem id="articleSubtitleInput" label="Подзаглавие" 
            				placeholder="Grand Theft Auto 5" type="text" />
            <admin:formItem id="articleAuthorsInput" label="Автори" 
            				placeholder="Snake, doomy" type="text" />
            <div id="reviewRegion" role="region">
                <admin:formItem id="articleHypeSelect" label="Оценка" type="select" layout="two-cols" />
                <admin:formItem id="articleVersionTestedSelect" label="Тествана версия" type="select" layout="two-cols" />
                <admin:formItem id="articleBetterInput" label="По-добра" type="text" />
                <admin:formItem id="articleWorseInput" label="По-лоша" type="text" />
                <admin:formItem id="articleEqualInput" label="Равностойна" type="text" />
            </div>
            <h3>Корица</h3>
            <div class="Cover">
                <img class="svg" src="../assets/forplay.svg" alt="Forplay&amp;reg;" />
                <div class="h-preview">
                    <!--preview-->
                </div>
                <div class="v-preview">
                    <!--preview-->
                </div>
                <button class="select" type="button">
                    <input id="articleCoverInput" type="hidden" />
                    <span class="clip">Добави корица</span>
                    <img src="../assets/helpers/16-9.png" alt="16:9" role="presentation" />
                </button>
            </div>
            <admin:formItem id="articleBgHSelect" label="Хоризонтално позициониране" type="select" layout="two-cols">
                <option value="left">Ляво</option>
                <option value="25%">25%</option>
                <option value="center">Среда</option>
                <option value="75%">75%</option>
                <option value="right">Дясно</option>
            </admin:formItem>
            <admin:formItem id="articleBgVSelect" label="Вертикално позициониране" type="select" layout="two-cols">
                <option value="top">Горе</option>
                <option value="center">Център</option>
                <option value="bottom">Долу</option>
            </admin:formItem>
            <admin:formItem id="articleThemeSelect" label="Тема" type="select" layout="two-cols" />
            <admin:formItem id="articleSubthemeSelect" label="Подтема" type="select" layout="two-cols" />
            <h3>Съдържание</h3>
            <div class="Add Content">
                <button class="add" type="button">Добави съдържание</button>
            </div>
        </form>
        <div role="toolbar">
            <button class="publish" type="button">Публикувай</button>
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>

<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="movie">
        <h2>
            <admin:menuItem label="Добави информация за филма и създай таг." title="Филми" url="movie" />
        </h2>
        <form>
            <admin:formItem id="movieEnNameInput" label="Оригинално име на филмът" 
            				placeholder="Star Wars: The Force Awakens" type="text" />
            <admin:formItem id="movieBgNameInput" label="Име на филмът на български" 
            				placeholder="Междузвездни Войни: Силата се Пробужда" type="text" />
            <admin:formItem id="movieSerieInput" label="Поредица" 
            				placeholder="star-wars" type="text" 
                            autocomplete="off" url="serie" layout="one-col" />
            <admin:formItem id="movieTagInput" label="Таг" 
            				placeholder="star-wars-episode-the-force-awakens" type="text" />
            <admin:formItem id="movieStickersInput" label="Стикери" 
            				placeholder="girl, beer, 18+" type="text" />
            <admin:formItem id="movieCastInput" label="Кастинг" 
            				placeholder="Бен Афлек, Розамунд Пайк, Нийл Патрик Харис, Тайлър Пери, Кери Куун, Ким Дикенс" type="text"
                            url="person" layout="one-col" />
            <admin:formItem id="movieDirectorInput" label="Режисьор" 
            				placeholder="Дейвид Финчър" type="text" 
                            url="person" layout="one-col" />
            <admin:formItem id="movieWriterInput" label="Сценарист" 
            				placeholder="Джилиън Флин" type="text" 
                            url="person" layout="one-col" />
            <admin:formItem id="movieCameraInput" label="Оператор" 
            				placeholder="Джеф Кроненует" type="text" 
                            url="person" layout="one-col" />
            <admin:formItem id="movieMusicInput" label="Музика" 
            				placeholder="Трент Резнър, Атикъс Рос" type="text" 
                            url="person" layout="one-col" />
            <admin:formItem id="gameBgDateInput" label="Премиера за България" type="date" layout="two-cols" />
            <admin:formItem id="gameWorldDateInput" label="Световна премиера" type="date" layout="two-cols" />
            <admin:formItem id="movieSimilarInput" label="Подобни" 
            				placeholder="turks-in-space" 
                            type="text" autocomplete="off" />
            <admin:formItem id="movieTimeInput" label="Времетраене" 
            				placeholder="149" type="text" />
            <div class="Box">
                <div class="file">
                    <label><span class="clip">Избери</span>
                        <input type="file" />
                    </label>
                </div>
            </div>
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>

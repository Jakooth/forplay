<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/admin">
    <section id="search">
        <h2>
            <admin:menuItem label="Намери игра, филм, статия, каре, картинка и т.н." 
            				title="Търсене" url="search" />
        </h2>
        <form>
            <admin:formItem id="searchTagInput" label="Таг" 
            				placeholder="gta-5, sam-houser, rockstar" 
                            type="search" autocomplete="off" />
            <admin:formItem id="searchCategorySelect" label="Категория" 
            				type="select" />
            <ul role="listbox">
                <li role="option">
                    <p>Grand Theft Auto 5</p>
                    <label>
                        <span class="clip">Grand Theft Auto 5</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li role="option">
                    <p>Grand Theft Auto V – сатирично менгеме. Вече и в 1080p!
                        <span>ревю</span>
                    </p>
                    <label>
                        <span class="clip">Grand Theft Auto V – сатирично менгеме.
                            Вече и в 1080p!</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li role="option">
                    <p>Каре
                        <span>каре</span>
                    </p>
                    <label>
                        <span class="clip">Каре</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li role="option">
                    <p>Новина
                        <span>новина</span>
                    </p>
                    <label>
                        <span class="clip">Новина</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li role="option">
                    <div class="img">
                        <img src="../assets/articles/gta-5/gta-5-01.jpg" alt="Без коментар." />
                    </div>
                    <label>
                        <span class="clip">gta-5-01.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li role="option">
                    <div class="img">
                        <img src="../assets/articles/gta-5/gta-5-02.jpg" alt="Без коментар." />
                    </div>
                    <label>
                        <span class="clip">gta-5-02.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li role="option">
                    <div class="img">
                        <img src="../assets/articles/gta-5/gta-5-03.jpg" alt="Без коментар." />
                    </div>
                    <label>
                        <span class="clip">gta-5-03.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li role="option">
                    <div class="img">
                        <img src="../assets/articles/gta-5/gta-5-04.jpg" alt="Без коментар." />
                    </div>
                    <label>
                        <span class="clip">gta-5-04.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li role="option">
                    <div class="img">
                        <img src="../assets/articles/gta-5/gta-5-05.jpg" alt="Без коментар." />
                    </div>
                    <label>
                        <span class="clip">gta-5-05.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li role="option">
                    <div class="img">
                        <img src="../assets/articles/gta-5/gta-5-06.jpg" alt="Без коментар." />
                    </div>
                    <label>
                        <span class="clip">gta-5-06.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li role="option">
                    <div class="img">
                        <img src="../assets/articles/gta-5/gta-5-07.jpg" alt="Без коментар." />
                    </div>
                    <label>
                        <span class="clip">gta-5-07.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li role="option">
                    <div class="img">
                        <img src="../assets/articles/gta-5/gta-5-main.jpg" alt="Без коментар." />
                    </div>
                    <label>
                        <span class="clip">gta-5-main.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li role="option">
                    <div class="img">
                        <img src="../assets/articles/gta-5/gta-5-main-320.png" alt="Без коментар." />
                    </div>
                    <label>
                        <span class="clip">gta-5-main-320.png</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li role="option">
                    <div class="img">
                        <img src="../assets/articles/gta-5/gta-5-cover.jpg" alt="Без коментар." />
                    </div>
                    <label>
                        <span class="clip">gta-5-cover.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
            </ul>
        </form>
        <div role="toolbar">
            <button class="ok" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>

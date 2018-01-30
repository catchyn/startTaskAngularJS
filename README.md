# startTaskAngularJS
<h3>Общее описание</h3>
Директива, которая содержит 2 списка. Первый список берет данные из контроллера модуля или посредством 
удаленного запроса. Элементы первого списка можно перетаскивать во второй. Результат - объект элементов 
второго листа доступный для получения из внешнего контроллера.

<h3>Установка</h3>
Для корректной работы нужно:
<ul>
<li>Выкачать проект</li>
<li>Установить npm и запустить установку из .json командой <code>npm install</code></li>
</ul>

<h3>Атрибуты директивы:</h3>
    initItems: '=',       <em>// объект списка init </em><br>
    initTitle: '@',       <em>// заголовок списка init </em><br>
    initValue: '@',       <em>// уникальное имя/id элемента списка Init </em><br>
    initText: '@',        <em>// отображаемое имя элемента списка Init </em><br>
    resultTitle: '@',     <em>// заголовок списка result </em><br>
    multiSelect: '@',     <em>// признак множественного выбора </em><br>
    method: '@',          <em>// имя метода </em><br>
    service: '@',         <em>// имя сервиса </em><br>
    resultItems: '=value' <em>// объект листа init</em><hr>


<h3>Подробное описание</h3>
Директива состоит из двух списков init и result.
Список init получает данные двумя способами:
<ol><li>Из контроллера модуля (в случае, если не указаны атрибуты method и service) через аттрибут initItems.</li>
<li>Если указаны атрибуты method и service, при запуске приложения элементы начитаются GET запросом из json
объекта db/db.json. (Реализовано через моудуль json-server)</li></ol>
<h4>Фичи</h4>
<ul><li>Заголовки списков задаются атрибутами.</li>
<li>Реализован хайлайт при наведение на элемент листа.</li>
<li>Реализовано одиночное перетаскивание элемента dragAndDrop между двумя списками с использованием директивы 
<em>angular-drag-and-drop-lists.js</em></li>
<li>Аттрибут multiselect включает dropdown меню в шапке заголовка каждого списка. Доступны для выбора: Выбрать несколько/Убрать
отметки, выбрать все, убрать все<ul>
<li>Отметить несколько позволяет добавить множественный выбор элементов в разрезе списка. Отображается кнопка Выполнить. 
При выборе нескольких элементов по нажатию на Выполнить происходит перенос элементов между списками.</li>
<li>Выбрать все отмечает все флаги в разрезе списка</li>
<li>Убрать все снимает все отметки</li>
</ul>
</li>
<li>Элементы result списка связаны двусторонним биндингом с DOM и для примера отображаются на странице после дерективы</li>



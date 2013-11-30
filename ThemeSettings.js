/**
 * @file
 * Позволяет "на лету" менять оформление сайта, для более детального понимания
 * желаний заказчика. Позволяет выбирать цвет и фон для сайта.
 *
 * Все находится в одном файле для мобильности и скорости установки и удаления.
 *
 * Зависимости:
 * - https://github.com/claviska/jquery-minicolors/ (jQuery Minicolors by Cory LaViska);
 * - http://fontawesome.io/
 *
 * Author: Nikita Malyshev (Niklan).
 * E-Mail: hello@niklan.net
 * Web: http://niklan.net/
 */

(function ($) {
    // Цвет по умолчанию.
    var default_color = "#4179B8";

    // Элементы у которых меняем цвет текста.
    var color_elements = [

    ];

    // Элементы у которых меняем фон.
    var background_elements = [

    ];

    // Функция установки цвета.
    function setColor(color) {
        // Устанавливаем цвет текста.
        for (var i = 0; i < color_elements.length; i++) {
            $(color_elements[i]).css('color', color);
        }

        // Устанавливаем цвет фона.
        for (var i = 0; i < background_elements.length; i++) {
            $(background_elements[i]).css('background', color);
        }
    }

    // Список фоновых изображений.
    var background_images = [
        '', // 0 пустой
        'http://andre.drupalife.com/sites/all/themes/Andre/images/bg.png',
        'http://andre.drupalife.com/sites/all/themes/Andre/images/bg2.png'
    ]

    // Функция установки фона.
    function setBackground(bg) {
        $('body').css("background", "url(" + background_images[bg] + ") repeat fixed center top");
    }

    // Убираем фоновое изображение.
    function unsetBackground() {
        $('body').css('background-image', 'none');
    }

    $(document).ready(function () {
        // Подключем CSS.
        $('head').append(
            '<link rel="stylesheet" href="//cdn.jsdelivr.net/jquery.minicolors/2.0.5/jquery.minicolors.css" type="text/css" />',
            '<link rel="stylesheet" href="//cdn.jsdelivr.net/fontawesome/4.0.3/css/font-awesome.min.css" type="text/css" />'
        );

        // Объявляем наше окно с настройками.
        var theme_settings_html = "" +
            "<div id='theme-settings'>" +
            "   <div id='open-close'><i class='fa fa-cog fa-spin'></i></div>" +
            "   <label>Цветовая схема сайта:</label>" +
            "   <input type='text' class='minicolors' id='theme-color' value='" + default_color + "'>" +
            "   <label>Фон для сайта:</label>" +
            "   <select id='bg-image'>" +
            "       <option disable>Без фона</option>" +
            "       <optgroup label='Паттерны'>" +
            "           <option value='1'>Паттерн 1</option>" +
            "           <option value='2'>Паттерн 2</option>" +
            "       </optgroup>" +
            "   </select>" +
            "" +
            "   <button id='theme-like' name='theme-like'>Мне нравится</button>" +
            "</div>"

        $('body').append(theme_settings_html);

        // Грузим скрипт jQuery Minicorols и цепляем его на наш инпут.
        $.getScript('//cdn.jsdelivr.net/jquery.minicolors/2.0.5/jquery.minicolors.js', function () {
            // Цепляем minicolors на наш инпут.
            $('.minicolors').minicolors({
                change: function (hex, opacity) {
                    setColor(hex);
                }
            });
        });

        // Кнопка открыть - закрыть.
        $("#open-close").click(function () {
            if ($('#theme-settings').css('left') == '0px') {
                $('#theme-settings').animate({
                    left: '-250'
                }, 1000);
            }
            else {
                $('#theme-settings').animate({
                    left: '0'
                }, 1000);
            }
        }).css({
                position: 'absolute',
                right: -32,
                background: 'white',
                border: '1px solid rgb(224,222,222)',
                'border-left': 'none',
                padding: 10,
                top: -1,
                cursor: 'pointer'
            });

        $('#bg-image').change(function () {
            var value = $(this).val();
            if (value == 'Без фона') {
                unsetBackground();
            }
            else {
                setBackground(value);
            }
        });


        // Оформляем наше окошечко.
        $("#theme-settings").css({
            'z-index': 1000,
            position: 'fixed',
            top: 150,
            left: -250,
            width: 250,
            background: 'white',
            border: '1px solid rgb(224, 222, 222)',
            'border-left': 'none',
            padding: 10
        });

        $("#theme-settings label").css({
            'font-weight': 'bold',
            'text-transform': 'uppercase',
            'text-align': 'center'
        });

        $("#theme-settings input, #theme-settings select").css({
            border: '1px solid rgb(228, 228, 228)',
            padding: 5,
            height: 'auto',
            width: 'auto',
            'box-shadow': 'inset 0 2px 4px rgba(0, 0, 0, .04)'
        });

        $("#theme-like").css({
            display: 'block',
            width: '100%',
            padding: 5,
            background: 'rgb(248, 248, 248)',
            border: '1px solid rgb(216, 216, 216)',
            color: 'rgb(133, 133, 133)'
        }).click(function () {
            alert(
                'Скопируйте эти данные и отошлите разработчику \n' +
                'Цвет: ' + $('#theme-color').val() + '\n' +
                'Фон: ' + $('#bg-image').val()
            )
            });
    })
})(jQuery);

/*
 (function ($, Drupal, window, document, undefined) {

 $(document).ready(function() {

 function setCookie (name, value, expires, path, domain, secure) {
 document.cookie = name + "=" + escape(value) +
 ((expires) ? "; expires=" + expires : "") +
 ((path) ? "; path=" + path : "") +
 ((domain) ? "; domain=" + domain : "") +
 ((secure) ? "; secure" : "");
 }

 function getCookie(name) {
 var cookie = " " + document.cookie;
 var search = " " + name + "=";
 var setStr = null;
 var offset = 0;
 var end = 0;
 if (cookie.length > 0) {
 offset = cookie.indexOf(search);
 if (offset != -1) {
 offset += search.length;
 end = cookie.indexOf(";", offset)
 if (end == -1) {
 end = cookie.length;
 }
 setStr = unescape(cookie.substring(offset, end));
 }
 }
 return(setStr);
 }

 // Картинки.
 var images_arr = [
 "",
 "bg.png",
 "bg2.png",
 "bg3.png",
 "bg4.png",
 "bg5.png",
 "bg6.png",
 "bg7.png"
 ];

 if (getCookie("demo_bg")) {
 $('body').css({"background": "url('http://andre.dev/sites/all/themes/Andre/images/" + images_arr[getCookie("demo_bg")]+"') repeat fixed center top"});
 change_color(getCookie("demo_color"));
 $('#page').css({'box-shadow': '0 0 10px 0 rgba(0,0,0,0.1)'})
 }

 // HTML формы с настройками
 var html = ""
 + 	"<div id='theme-settings-wrapper'>"
 +	"	<div id='theme-settings-button'><i class='fa fa-cog fa-spin'></i></div>"

 + 	"	<div id='theme-settings-content'>"
 +	"		<label>Выбор цвета сайта:</label>"
 +	"		<input type='text' class='minicolors' id='theme-color' value='#4179B8'>"
 +	"		<p class='theme-settings-description'>Позволяет изменить цветовую схему сайта.</p>"
 +	"		<label>Выбор фона сайта:</label>"
 +	"		<select id='background-image'>"
 +	"			<optgroup label='Паттерны'>"
 +	"				<option value='1'>Фон 1</option>"
 +	"				<option value='2'>Фон 2</option>"
 +	"				<option value='3'>Фон 3</option>"
 +	"				<option value='4'>Фон 4</option>"
 +	"				<option value='5'>Фон 5</option>"
 +	"				<option value='6'>Фон 6</option>"
 +	"				<option value='7'>Фон 7</option>"
 +	"			</optgtoup>"
 +	"		</select>"
 +	"		<p class='theme-settings-description'>Примеры фонов сайта. На загрузку картинок может потребоваться время.</p>"
 // +	"		<input type='button' value='Сохранить' id='theme-settings-save'>"
 //+	"		<input type='button' value='Сбросить' id='theme-settings-clear'>"
 //+	"		<p class='theme-settings-description'>Нажав на <i>Сохранить</i>, браузер запомнит установленные вами настройки (цвет и фон). Если вы не сохраните, то после обновления страницы все изменения пропадут.</p>"
 +	"	</div>";
 +	"</div>";

 $('body').append(html);

 $("#theme-settings-button").click(function() {
 if ($('#theme-settings-wrapper').css('left') == '0px') {
 $('#theme-settings-wrapper').animate({
 left: '-250'
 }, 1000);
 }
 else {
 $('#theme-settings-wrapper').animate({
 left: '0'
 }, 1000);
 }
 })

 var color = "#4179B8";
 $('.minicolors').minicolors({
 change: function(hex, opacity) {
 color = hex;
 change_color(color);
 }
 });

 // Функция смена цвета.
 // Каким элементам меняем цвет.
 // Элементы с background.
 function change_color(color) {
 var elements_bg = [
 '.product-teaser .product-full',
 '.product-teaser .product-buy',
 '.header__middle-fourth__cart .cart-block',
 '.tabs-primary li a.is-active'
 ];

 for (var i=0; i<elements_bg.length; i++) {
 console.log(elements_bg[i]);
 $(elements_bg[i]).css({'background': color});
 }

 // Элементы с color.
 var elements_color = [
 '.header__menu__link-home .fa',
 '#content .node-title a'
 ];

 for (var i=0; i<elements_color.length; i++) {
 $(''+elements_color[i]+'').css({'color': color});
 }

 var border_color = [
 '.header__menu',
 '.tabs-primary'
 ]

 for (var i=0; i<border_color.length; i++) {
 $(''+border_color[i]+'').css({'border-color': color});
 }
 }

 // Смена фона сайта.
 $('#background-image').change(function() {
 $('body').css({"background": "url('http://andre.dev/sites/all/themes/Andre/images/" + images_arr[$('#background-image').val()]+"') repeat fixed center top"});
 $('#page').css({'box-shadow': '0 0 10px 0 rgba(0,0,0,0.1)'})
 })

 // Сохранение настроек.
 $("#theme-settings-save").click(function() {
 setCookie("demo_bg", $('#background-image').val());
 setCookie("demo_color", $('#theme-color').val());
 });

 // Сброс настроек.
 $("#theme-settings-clear").click(function() {
 setCookie("demo_bg", $('#background-image').val(), "Mon, 01-Jan-2001 00:00:00 GMT");
 setCookie("demo_color", $('#theme-color').val(), "Mon, 01-Jan-2001 00:00:00 GMT");
 location.reload()
 });

 // Базовые стили.
 $('#theme-settings-wrapper').css({
 'display': 'block',
 'width': '250px',
 'padding': '10px',
 'position': 'fixed',
 'z-index': '1000',
 'top': '100px',
 'left': '-250px',
 'border': '1px solid rgb(194, 194, 194)',
 'background': 'white'
 })

 $('#theme-settings-button').css({
 'position': 'absolute',
 'right': '-39px',
 'top': '-1px',
 'cursor': 'pointer',
 'background': 'rgb(73, 73, 73)',
 'padding': '6px',
 'font-size': '30px',
 'color': 'white',
 'border-radius': '0px 5px 5px 0'
 })
 });



 })(jQuery, Drupal, this, this.document);

 */

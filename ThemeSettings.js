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
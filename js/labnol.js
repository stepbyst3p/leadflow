document.addEventListener('DOMContentLoaded', function () {
    setTimeout(isMarket, 100)
});

function addCSS() {
    var cssId = 'myCss';
    if (!document.getElementById(cssId)) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'css/labnol.css';
        link.media = 'all';
        head.appendChild(link);
    }
}



function renderBar(el, str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    while (div.children.length > 0) {
        el.appendChild(div.children[0]);
        getProductName();
    }


}

function renderPopup(el, str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    while (div.children.length > 0) {
        el.appendChild(div.children[0]);
    }
}

function getProductName() {
    var productName = document.getElementsByTagName('h1');
    var productNamePlace = document.getElementsByClassName('cr-product-name');
    //alert(productName)
    productNamePlace.innerHTML = productName.innerHTML;
}

function isMarket() {
    var bar = document.getElementById('cr-bar');
    // metrika — плохое название
    // переименовываем в...probability. т.е. вероятность
    // функция называется isMarket. и сразу понятно что
    // такое вероятность в этом контексте.
    // понятно?
    var probability = 0;

    // тут ты не правильно делаешь
    // тут вседа будет true
    // так как ф-ция это объект
    // чтобы узнать результат — нужно функцию запустить
    // чтобы запустить функцию, нужно поставить скобочки после названия
    // if (rule1) probability++;
    // if (rule2) probability++;
    // if (rule3) probability++;
    // if (rule4) probability++;

    // зацени, как сразу стало понятно что происходит

    var debugMessage = 'Информация о странице:\n'

    if (hasCtaButtons()) {
        probability++
        debugMessage += '- есть призывы к действию\n'
    }
    if (hasNumberInUrl()) {
        probability++
        debugMessage += '- есть номера в урле\n'
    }
    if (hasBreadCrumbs()) {
        probability++
        debugMessage += '- есть хлебные крошки\n'
    }
    if (hasKeywordsInTitle()) {
        probability++
        debugMessage += '- есть ключевые слова в тайтле\n'
    }

    debugMessage += '\nВсего правил сработало: ' + probability


    console.log(debugMessage)

    var barHtml = '<div id="cr-bar" style="display:block" onClick="openPopup()" data-toggle="tooltip" data-placement="bottom" title="" data-original-title=""><div class="row"><div class="col-md-8 col-xs-10 col-sm-10"><div id="cta" class="cta">Купите <span class="cr-product-name"></span> в рассрочку по самой выгодной цене: <span class="cr-price"></span></div><div id="cr-btn-box"><button class="btn  cr-btn" type="button" onClick="openPopup()">Купить в кредит</button></div></div><div class="col-md-4 col-xs-2 col-sm-2"><div class="cr-right"><button type="button" class="cr-control btn btn-primary"><span aria-hidden="true">?</span></button><button type="button" class="cr-control btn btn-primary"><span aria-hidden="true">×</span></button></div></div></div></div>';
    var popupHtml = '<div id="popup" style="display: none;"><div id="closePopupArea" style="display:none" onClick="closePopup()"></div><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" onClick="closePopup()"><span aria-hidden="true">×</span></button><h4 class="modal-title" id="myModalLabel">Купить <span class="cr-product-name"></span> в рассрочку</h4></div><div class="modal-body"><form class="contact-form" id="offer-form" role="form" method="POST">                            <h6 class="successContent" style="display:none"><i class="fa fa-check left" style="color: #5cb45d;"></i>Спасибо! Ваше сообщение было успешно отправлено.</h6>                                                <h6 class="errorContent" style="display:none"><i class="fa fa-exclamation-circle left" style="color: #e1534f;"></i>Неправильно заполнена форма, пожалуйста, проверьте!</h6>                        <div id="form-body"><p>Оставьте контактные данные и с вами свяжется сотрудник банка</p><input type="hidden" name="DATA[TITLE]" value="Заявка с сайта"><div class="form-group"><input class="form-control" type="text" name="DATA[NAME]" placeholder="Имя" autofocus required=""></div><div class="form-group"><input class="form-control" type="text" name="DATA[PHONE_MOBILE]" placeholder="Телефон" required=""></div><button class="btn btn-md btn-primary btn-popup btn-block">Получить звонок от банка</button></div><div id="gratz" style="display:none"><div class="text-success">Ваша заявка успешно отправлена. Сотрудник банка свяжется с вами<br>в ближайшее время</div></div></form></div></div></div></div>';
    if (probability >= 3) {
        addCSS();
        renderBar(document.body, barHtml);
        renderPopup(document.body, popupHtml);

    } else {
        return false
    }
}

// объявляем функции
function stringHasKeywords(string) {
    var keywords = [
    'Купить сейчас',
    'В корзину',
    'Добавить в корзину',
    'Купить'
  ]
    return keywords.some(function (k) {
        return k === string
    })
}

function getKeywordControls() {
    var controls = [].slice.call(document.querySelectorAll('a, input[type=button], button'))

    controls = controls.filter(function (node) {
        return stringHasKeywords(node.textContent)
    })

    return controls
}

function hasCtaButtons() {
    var buttons = getKeywordControls()
    if (buttons.length > 0) return true
    else return false
}

function hasNumberInUrl() {
    var url = window.location.href;
    // var segment = url.split("/").length - 1 - (url.indexOf("http://") == -1 ? 0 : 2);  
    // var productPath = $(location).attr('pathname');
    url.indexOf(1);
    url = url.split("/");
    var productPathLast = url[url.length - 1];
    var productPathAlmostLast = url[url.length - 2];
    if (productPathLast.match(/^[0-9]+$/) != null || productPathAlmostLast.match(/^[0-9]+$/) != null) {
        document.getElementById('cr-bar').style.display == 'block';
        return true
        console.log(' Урл в цифрах ')
    }
}

function hasBreadCrumbs() {
    // Тут дурацкая логика. А если чувак называет
    // крошки не breadcrumbs, а просто crumbs?
    // Я знаю чувака, который называет класс «hleb». Серьезно.
    // TODO:
    // В первую очередь нужно опираться на семантику.
    // В данном случае нужно искать элемент <nav>.

    var crumbs = document.querySelectorAll('.breadcrumb > *').length;

    if (crumbs > 2) {
        return true
        console.log(' Крошки кто-то не убрал ')
    }
}

function hasKeywordsInTitle() {
    var siteTitle = document.title;
    var keyWord1 = 'интернет-магазин'
    var keyWord2 = 'Интернет-магазин'
    var keyWord3 = 'Интернет магазин'
    var keyWord4 = 'интернет магазин'
    var keyWord5 = 'Интернет-Магазин'
    var keyWord6 = 'Интернет Магазин'
    if (siteTitle.indexOf(keyWord1) > -1 || siteTitle.indexOf(keyWord2) > -1 || siteTitle.indexOf(keyWord3) > -1 || siteTitle.indexOf(keyWord4) > -1 || siteTitle.indexOf(keyWord5) > -1 || siteTitle.indexOf(keyWord6) > -1) {
        return true;
    }
};

function openPopup() {
    var popup = document.getElementById('popup')
    var closePopupArea = document.getElementById('closePopupArea')
    popup.style.display = 'block'
    closePopupArea.style.display = 'block'
        //autofocus
    document.getElementById("name-input").focus();



}

function closePopup() {
    var popup = document.getElementById('popup')
    var closePopupArea = document.getElementById('closePopupArea')
    popup.style.display = 'none'
    closePopupArea.style.display = 'none'
}


$("#lead-form").submit(function (e) {
    e.preventDefault();
    var isSpam = Boolean(document.getElementById('antispam-input').value)
    var isAgreed = document.getElementById('agreement-checkbox').checked
    var fullPage = document.documentElement.innerHTML;
    document.getElementById('fullPage-input').value = fullPage;

    function timer() {
        var obj = document.getElementById('timer_inp');
        obj.innerHTML--;

        if (obj.innerHTML == 0) {
            setTimeout(function () {}, 1000);
            document.getElementById('popup').style.display = 'none';
            document.getElementById('cr-bar').style.display = 'none';
        } else {
            setTimeout(timer, 1000);
        }
    }

    if (!isSpam && isAgreed) {
        $.ajax({
            type: "POST",
            url: "rest.php",
            data: $(this).serialize()
        }).done(function () {
            document.getElementById('lead-form').style.display = 'none';
            document.getElementById('gratz').style.display = 'block';
            setTimeout(timer, 0);
        });
    } else {
        document.getElementById('agreement-fail-message').innerHTML = '<p>Подтвердите согласие на обработку ваших данных</p>';
        document.getElementById('agreement-fail-message').style.display = 'block';
    }
});

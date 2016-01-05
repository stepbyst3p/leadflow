// вот тут мы должны их вызывать 
// это коллбек на событие „всё загрузилось“
document.addEventListener('DOMContentLoaded', function () {
    isMarket()
});

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

    alert(debugMessage)

    // как только увидишь это — удали алерт, чтобы не бесил.
    console.log(debugMessage)

    if (probability > 3) {
        bar.style.display = 'block';
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

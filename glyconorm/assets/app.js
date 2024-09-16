

var statusPopup = {};

var helper = new Helper();

function Helper() {
    this.randomInteger = function (min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }

    this.availableStorage = function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }
    this.deserialize = function (element, data, clearForm) {
        var splits = decodeURIComponent(data).split('&'),
            i = 0,
            split = null,
            key = null,
            value = null,
            splitParts = null;

        if (clearForm) {
            $('input[type="checkbox"],input[type="radio"]', element).removeAttr('checked');
            $('select,input[type="text"],input[type="password"],input[type="hidden"],textarea', element).val('');
        }

        var kv = {};
        while (split = splits[i++]) {
            splitParts = split.split('=');
            key = splitParts[0] || '';
            value = (splitParts[1] || '').replace(/\+/g, ' ');

            if (key != '') {
                if (key in kv) {
                    if ($.type(kv[key]) !== 'array')
                        kv[key] = [kv[key]];

                    kv[key].push(value);
                } else
                    kv[key] = value;
            }
        }

        for (key in kv) {
            value = kv[key];

            $('input[type="checkbox"][name="' + key + '"][value="' + value + '"],input[type="radio"][name="' + key + '"][value="' + value + '"]', element).prop('checked', true);
            $('select[name="' + key + '"],input[type="text"][name="' + key + '"],input[type="password"][name="' + key + '"],input[type="hidden"][name="' + key + '"],textarea[name="' + key + '"]', element).val(value);
        }
    }
}

function posibleShow(type) {
    return !statusPopup[type];
}

function addShowWindow(type) {
    statusPopup[type] = true;
}

function delShowWindow(type) {
    if (posibleShow(type)) {
        statusPopup[type] = false;
    }
}

function addCountry(country, active) {
    $.each(country, function (key, value) {
        var el = $("<option></option>")
            .attr("value", key)
            .text(value);
        if (active == key) {
            el.attr('selected', 'selected');
        }
        $('.orderFormWrapperCountry').append(el);

        //trigger event after countries append
        $('.orderFormWrapperCountry').trigger('change');
    });
}

function set_cookie ( name, value, exp_y, exp_m, exp_d, exp_h, exp_mn, path, domain, secure )
{
    var cookie_string = name + "=" +  ( value );

    if ( exp_y )
    {
        var expires = new Date ( exp_y, exp_m, exp_d, exp_h, exp_mn );
        cookie_string += "; expires=" + expires.toGMTString();
    }

    if ( path )
        cookie_string += "; path=" +  ( path );

    if ( domain )
        cookie_string += "; domain=" +  ( domain );

    if ( secure )
        cookie_string += "; secure";

    document.cookie = cookie_string;
}

function get_cookie ( cookie_name )
{
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( results[2] );
    else
        return null;
}

$(function () {

    //убирает алерт закрытия окна при сабмите формы
    $('form').submit(function(){
        $(window).off('beforeunload');
    });

    //add input mask on backcall widget
    var inputMask = new Inputmask("phone");
    var masksObj = inputMask.aliases.phone.phoneCodes;

    $('body').on('change', '.orderFormWrapperCountry', function () {
        //change mask for selected country
        var cc = $(this).val();

        if(cc == '' || cc == undefined)
            cc = window.curent_country;

        var indexMask = masksObj.map(function(o){ return o.cc }).indexOf(cc);

        /*correct mask*/
        /*
        var currentMask = masksObj[indexMask].mask.replace(/_/g, 'x');

        if(cc !== 'BY') {
            $('#callback__phone, input[name="phone"]').inputmask({
                "mask": currentMask,
                showMaskOnFocus: false,
                showMaskOnHover: false,
                clearIncomplete: true
            });
        } else {
            $('#callback__phone, input[name="phone"]').inputmask('remove');
        }
        */
        /*------------*/


        $('#callback__phone, input[name="phone"]').attr('placeholder', masksObj[indexMask].mask);

        //меняем во всех селектах страну на выбранную
        $('.orderFormWrapperCountry').each(function(){
            $(this).val(cc);
        });


        var selectedCountry = window.allPrices[$(this).val()];

        //если это преленд
        if(window.pageType == 'layer'){
            //подставляем значения выбранной страны
            var newPrice = selectedCountry.cost + ' ' + selectedCountry.currency;
            var newPricenotnotify = selectedCountry.cost  + ' ' + selectedCountry.currency;
            var oldPrice = selectedCountry.oldPrice + ' ' + selectedCountry.currency;

            var priceNoCur      = selectedCountry.cost;
            var oldPriceNoCur   = selectedCountry.oldPrice;
            var currency        = selectedCountry.currency;
            var currency_notice = '';


            var starNewPrice        = selectedCountry.cost + (selectedCountry.type*1 == 2 || selectedCountry.type*1 == 3 || selectedCountry.type*1 == 99 || selectedCountry.type*1 == 8 ? (' ' + selectedCountry.currency + ' *') : ' ' + selectedCountry.currency);
            var starCurrency_notice = (selectedCountry.type*1 == 2 || selectedCountry.type*1 == 3 || selectedCountry.type*1 == 99 || selectedCountry.type*1 == 8 ? ' *' : '');
        } else {
            //подставляем значения выбранной страны
            var newPrice = selectedCountry.cost + (selectedCountry.type*1 == 2 || selectedCountry.type*1 == 3 || selectedCountry.type*1 == 99 || selectedCountry.type*1 == 8 ? (' ' + selectedCountry.currency + ' *') : ' ' + selectedCountry.currency);
            var newPricenotnotify = selectedCountry.cost  + ' ' + selectedCountry.currency;
            var oldPrice = selectedCountry.oldPrice + ' ' + selectedCountry.currency;


            var priceNoCur      = selectedCountry.cost;
            var oldPriceNoCur   = selectedCountry.oldPrice;
            var currency        = selectedCountry.currency;
            var currency_notice = (selectedCountry.type*1 == 2 || selectedCountry.type*1 == 3 || selectedCountry.type*1 == 99 || selectedCountry.type*1 == 8 ? ' *' : '');
        }

        var notice   = '';
        if(selectedCountry.type*1 == 2){
            notice   = '* За одну порцию';
        } else if(selectedCountry.type*1 == 3){
            notice   = '* При заказе полного курса';
        }

        $('.formDesc').each(function(){
            $(this).html(notice);
        });

        $('.new_prise .new_prise_number, .displayCurrentPriceNoCyr').text(priceNoCur);
        $('.new_prise .new_prise_currency, .displayCurrentCurrency').html(currency + currency_notice);
        $('.realPrice, .displayCurrentPrice').html(newPrice);
        $('.old_price, .displayPrevPrice').html(oldPrice);

        $('.realPrice, .displayCurrentPriceShortCyr').html(newPrice);
        $('.old_price, .displayPrevPriceShortCyr').html(oldPrice);

        $('.displayPrevPriceNoCyr').text(oldPriceNoCur);
        $('.displayPrevPriceShortCyr').html(currency + currency_notice);

        $('.onlycurrencyphldr').html(currency);
        $('.onlypricecurrencyphldr').html(newPricenotnotify);


        //новые классы для прелендов с формой (проставит цены со звездой для форм)
        $('.prelandStarPrice').html(starNewPrice);
        $('.displayPrevPriceShortCyr').html(currency + starCurrency_notice);

    });

    if (helper.availableStorage()) {
        if (localStorage["form"]) {
            $('.orderFormWrapperCountry').each(function (index) {
                helper.deserialize(this, localStorage["form"], false);
            });
        }
    }


    //всплытие попапа при уводе курсора за пределы окна
    $('html').mouseleave(function(){
        var x = get_cookie("leaveflag");

        if(x === undefined || x === null){
            $('.ma1leaveBlock').show();

            var current_date = new Date;
            var cookie_year = current_date.getFullYear ( );
            var cookie_month = current_date.getMonth ( );
            var cookie_day = current_date.getDate ( );
            var cookie_h = current_date.getHours ( );
            var cookie_m = current_date.getMinutes ( ) + 1;
            set_cookie ( "leaveflag", "1", cookie_year, cookie_month, cookie_day, cookie_h, cookie_m );
        }
    });

    $('.ma1leaveBlock').click(function(e){
        if(e.target == this){
            $(this).hide();
        }
    });

    //фильтрация ввода телефона (только 0-9, -, +, (, )) а так же  макс колво символов = 20
    $('#callback__phone, input[name="phone"]').keypress(function(e) {
        var keycode = e.keyCode;
        if(keycode == 8 || keycode == 46 || keycode == 37 || keycode == 39)
            return true;

        if($(this).val().length > 20 && !(keycode == 8 || keycode == 46 || keycode == 37 || keycode == 39))
            return false;

        var allowedCharRegex = /[0-9()\-+]/;
        return allowedCharRegex.test(e.key);
    });

    //добавим обязательным полям аттрибут required
    $('input[name="name"], input[name="phone"]').attr('required', 'required');


    //перенос старых ф-ций
    var elements = $('[data-click="true"]');
    for (var i = 0; i < elements.length; i++) {
        $(elements[i]).on("click", function(e){
            e.preventDefault();
            $($(this).data('target')).show();

            $($(this).data('target')).children().first().on('click', function(e){
                e.stopPropagation();
            });

            $($(this).data('target')).on('click', function(){
                $(this).hide();
            });
        });
    }

    var elements = $('[data-toggle="true"]');
    for (var i = 0; i < elements.length; i++) {
        $(elements[i]).on("click", function(e){
            e.preventDefault();
            $($(this).data('target')).slideToggle();
        });
    }


    if($('.orderFormWrapperCountry').val() !== null ){
        $('.orderFormWrapperCountry').trigger('change');
    }

});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


//js необходимый для эквайеринга
$(document).ready(function(){

    function payNotice(){
        if(document.location.toString().indexOf('?') !== -1) {
            var getVar = [];

            var query = document.location
                .toString()
                .replace(/^.*?\?/, '')
                .replace(/#.*$/, '')
                .split('&');

            for(var i=0, l=query.length; i<l; i++) {
                var aux = decodeURIComponent(query[i]).split('=');
                getVar[aux[0]] = aux[1];
            }

            //успешная оплата
            if(typeof(getVar['success']) != "undefined" && getVar['success'] !== null){
                $('body').prepend('<div onClick="$(this).remove()" style="cursor: pointer; padding: 20px;display: flex;align-items: center;justify-content: center;background: #000000d1;width: 100%;height: 100%;position: fixed;z-index: 9999999;"><div style="font-size: 20px;color: #fff;min-width: 300px;max-width: 90%;">Ihre Bestellung wurde erfolgreich bezahlt! Warten Sie auf einen Anruf vom Lieferservice, um die Details zu koordinieren.</div></div>');
            }

            //не успешная оплата
            if(typeof(getVar['fail']) != "undefined" && getVar['fail'] !== null){
                $('body').prepend('<div onClick="$(this).remove()" style="cursor: pointer; padding: 20px;display: flex;align-items: center;justify-content: center;background: #000000d1;width: 100%;height: 100%;position: fixed;z-index: 9999999;"><div style="font-size: 20px;color: #fff;min-width: 300px;max-width: 90%;">Etwas ist schief gelaufen, die Zahlung wurde nicht geleistet. Versuchen Sie es nochmal.</div></div>');
            }
        }
    }

    //payNotice();

    $('#payForm').submit(function(e){
        e.preventDefault();
        e.stopPropagation();

        return false;
    });

    $('#sendOrderAjax').click(function(e){
        e.preventDefault();
        e.stopPropagation();

        var phone      = $('input[name="pay_phone"]').val();
        var fullName   = $('input[name="pay_name"]').val();

        var city       = $('input[name="pay_city"]').val();
        var street     = $('input[name="pay_street"]').val();
        var home       = $('input[name="pay_home"]').val();

        var region     = $('input[name="pay_region"]').val();
        var zip        = $('input[name="pay_zip"]').val();
        var country    = $('select[name="pay_country"]').val();
        var clickId    = '';
        var orderId    = '';
        var sign       = '';
        var selfUrl    = window.location.href;
        var cd_count   = $('input[name="specialOfferCount"]').val();
        var full_price = $('input[name="specialOfferPrice"]').val();
        var price      = full_price;

        if(document.location.toString().indexOf('?') !== -1) {
            var query = document.location
                .toString()
                .replace(/^.*?\?/, '')
                .replace(/#.*$/, '')
                .split('&');

            for(var i=0, l=query.length; i<l; i++) {
                var aux = decodeURIComponent(query[i]).split('=');

                if(aux[0] == 'id') {
                    clickId = aux[1];
                }
            }
        }


        //в коммент будем писать комплектацию


        //запустим прелоадер
        $('body').prepend('<div id="payPreloader" style="display: flex;align-items: center;justify-content: center;background: #000000d1;width: 100%;height: 100%;position: fixed;z-index: 9999999;"><svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="64px" height="64px" viewBox="0 0 128 128" xml:space="preserve"><g transform="rotate(12.8571 64 64)"><path d="M75.4 126.63a11.43 11.43 0 0 1-2.1-22.65 40.9 40.9 0 0 0 30.5-30.6 11.4 11.4 0 1 1 22.27 4.87h.02a63.77 63.77 0 0 1-47.8 48.05v-.02a11.38 11.38 0 0 1-2.93.37z" fill="#ffffff" fill-opacity="1"></path><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1400ms" repeatCount="indefinite"></animateTransform></g></svg></div>');
        $('body').css('overflow', 'hidden');

        $.ajax({
            type: "POST",
            data : 'phone=' + phone + '&fullName=' + fullName + '&city=' + city + '&street=' + street + '&home=' + home + '&country=' + country + '&region=' + region + '&zip=' + zip + '&payAjax=1' + '&clickId=' + clickId + '&cd_count=' + cd_count + '&full_price=' + full_price,
            success: function(data, textStatus, jqXHR)
            {
                var answer = JSON.parse(data);
                orderId = answer.orderId*1;
                sign    = answer.sign;

                $('input[name="PIMPAY_EXTERNAL_ID"]').val(orderId);
                $('input[name="PIMPAY_AMOUNT"]').val(price);

                $('input[name="PIMPAY_SUCCESS_URL"]').val(selfUrl +  '&success=1&amount=' + price);
                $('input[name="PIMPAY_FAIL_URL"]').val(selfUrl + '&fail=1&amount=' + price);
                $('input[name="PIMPAY_SIGN"]').val(sign);

                $('#payPreloader').remove();
                $('body').css('overflow', 'initial');

                $('#pimpayForm').submit();
            },
            error: function (jqXHR, textStatus, errorThrown)
            {

            }
        });

        return false;
    });

    $('.dop2__btn').on('click', function(e){
        var currentCount = $(this).data('count');
        var currentPrice = $(this).data('price');

        $('input[name="specialOfferCount"]').val(currentCount);
        $('input[name="specialOfferPrice"]').val(currentPrice);

        $('#accordeonFormContainer').show();

        /*var efb = $('#exFormBlock');
        e.preventDefault();
        efb.slideDown(1000);
        $('html, body').animate({ scrollTop: efb.offset().top }, 1000);*/
    });

    $('.FOOTER_INFO').on('copy cut contextmenu', function(e){
        e.preventDefault();
        return false;
    })

});
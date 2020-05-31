$(document).ready(function() {

    'use strict';

    /* ======= Preloader ======= */
    $(window).load(function() {
        $('div.preloader').delay(1000).fadeOut('slow');
    });
    $('body').delay(1000).removeClass('no-scroll');
    

    /* ======= Scrollup Button ======= */
    $(".up").on('click', function() {
        return $("html, body").animate({
            scrollTop: 0
        }, 600), !1
    });

    /* ======= Mobile Menu ======= */
    $('a.mobile-menu-icon').on('click', function() {
        $('.mobile-menu').toggleClass('mobile-menu-open');
        $('a.mobile-menu-icon i').toggleClass('ion-close-round').toggleClass('ion-navicon-round');
    });

    $('.top-header li').on('click', function() {
       $(this).find('ul.dropdown').toggleClass('open-menu');
     });

    $('.mobile-menu ul li').children('ul').hide();
        $('.mobile-menu ul li').on('click', function() {
            $(this).siblings('li').children('ul').slideUp('');
            $(this).children('ul').slideUp('');

            $('.mobile-menu ul li a').each(function () {
                if ($(this).attr('rel') != '') {
                    $(this).removeClass($(this).attr('rel') + 'Over on')
                }
            });
            if ($(this).children('ul').is(':hidden') == true) {
                $(this).children('ul').slideDown('');
                $(this).children('a').addClass($(this).children('li a').attr('rel') + 'Over on');
                return false
            }
        });

    /* ======= Slider ======= */
    $('.slider-banner').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        autoplay: true,
        autoplaySpeed: 10000,
        slidesToShow: 1,
        responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            },
            {
                breakpoint: 992,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    /* ======= Domain Search ======= */
    $('.search-filter .dropdown-menu').find('a').on('click', function(e) {
        e.preventDefault();
        var param = $(this).attr("href").replace("#", "");
        var concept = $(this).text();
        $('.search-filter span#select-value').text(concept);
        $('.input-group #search_param').val(param)
    });

    /* ======= Clients ======= */
    $('.client').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        autoplay: false,
        responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    slidesToShow: 2
                }
            }
        ]
    });

    /* ======= FAQ`s ======= */
    var contents = $('.accordeon-content');
    var titles = $('.accordeon-title');
    titles.on('click', function() {
        var title = $(this);
        contents.filter(':visible').slideUp(function() {
            $(this).prev('.accordeon-title').removeClass('is-opened');
        });

        var content = title.next('.accordeon-content');

        if (!content.is(':visible')) {
            content.slideDown(function() { title.addClass('is-opened') });
        }
    });

    /* ======= Filter in team page ======= */
    var $grid = $('.grid').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
    });
    // filter functions
    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function() {
            var number = $(this).find('.number').text();
            return parseInt(number, 10) > 50;
        }, // show if name ends with -ium
        ium: function() {
            var name = $(this).find('.name').text();
            return name.match(/ium$/);
        }
    };
    // bind filter button click
    $('.filters-button-group').on('click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[filterValue] || filterValue;
        $grid.isotope({
            filter: filterValue
        });
    });
    // change is-checked class on buttons
    $('.button-group').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });

    /* ======= Portfolio page ======= */
    $('.test-popup-link').magnificPopup({
        type: 'image'
    });

    /* ======= Gallary Post ======= */
    $('.gallary-post').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        autoplay: true
    });
});

/* ======= WOW ======= */
wow = new WOW({
    boxClass: 'wow', // default
    animateClass: 'animated', // default
    offset: 0, // default
    mobile: true, // default
    live: true // default
})
wow.init();

/* ======= Contact Form ======= */

var contactForm = $("#contact-form");
var formValidateResult = $('#form-validate-result');
var formValidateHtml = '';
var contactResult = $('#contact-result');
contactForm.submit(function() {
    var formValidateHtml = '';
    $.ajax({
        type: "POST",
        url: "contact.php",
        data: $(contactForm).serialize(),
        beforeSend: function() {
            $('#ajax-spinner').show();
        },
        success: function(res) {
            contactForm.find('input,textarea').css('border', 'none');
            formValidateResult.html('');
            if (res.msg === 'fail') {
                $.each(Object.keys(res.errs), function(i, id) {
                    $('#' + id).css('border', '1px solid red');
                });
                formValidateHtml += '<ul class="list-unstyled error-result">';
                $.each(res.errs, function(i, el) {
                    formValidateHtml += '<li>' + el + '</li>';
                });
                formValidateHtml += '</ul>';
                formValidateResult.append(formValidateHtml);
            }
            if (res.msg === 'success') {
                $('#contactme').modal('hide');
                contactForm.find('input,textarea').val('');
            }
            $('#ajax-spinner').hide();
        },
        error: $('.thanks').show()
    });
    return false;
});

/* ======= Google Map ======= */

$('#googleMap').gMap({
    address: "Mansoura University, El Gomhouria St, Mansoura, Dakahlia, Egypt",
    zoom: 15,
    markers: [{
        address: "Mansoura, Egypt",
        maptype: 'ROADMAP'
    }]
});
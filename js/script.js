(function ($) {

    "use strict";

    // Preloder
    $(window).on('load', function () {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({ 'overflow': 'visible' });
    });

    // Navbar Fixed Top On Scroll
    var affixElement = '#navbar-main';

    $(affixElement).affix({
        offset: {
            // Distance of between element and top page
            top: function () {
                return (this.top = $(affixElement).offset().top)
            },
        }
    });

    // Counter / Funfact
    var startCount = $('.start-count');
    startCount.each(function () {
        var $this = $(this);
        $this.data('target', parseInt($this.html(), 10));
        $this.data('counted', false);
        $this.html('0');
    });

    $(window).on('scroll', function () {
        var speed = 4000;
        startCount.each(function () {
            var $this = $(this);
            if (!$this.data('counted') && $(window).scrollTop() + $(window).height() >= $this.offset().top) {
                $this.data('counted', true);
                $this.animate({
                    dummy: 1
                }, {
                    duration: speed,
                    step: function (now) {
                        var $this = $(this);
                        var val = Math.round($this.data('target') * now);
                        $this.html(val);
                        if (0 < $this.parent('.value').length) {
                            $this.parent('.value').css('width', val + '%');
                        }
                    }
                });
            }
        });
    })
        .triggerHandler('scroll');

    // Scroll 
    function doAnimations(elems) {
        //Cache the animationend event in a variable
        var animEndEv = 'webkitAnimationEnd animationend';

        elems.each(function () {
            var $this = $(this),
                $animationType = $this.data('animation');
            $this.addClass($animationType).one(animEndEv, function () {
                $this.removeClass($animationType);
            });
        });
    }

    //Variables on page load 
    var $myCarousel = $('#carousel-example-generic'),
        $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");

    //Initialize carousel 
    $myCarousel.carousel({
        interval: 5000,
    });

    //Animate captions in first slide on page load 
    doAnimations($firstAnimatingElems);

    //Other slides to be animated on carousel slide event 
    $myCarousel.on('slide.bs.carousel', function (e) {
        var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
        doAnimations($animatingElems);
    });

    $myCarousel.on('mouseover', function (e) {
        $myCarousel.carousel();
    });

    // Scroll To Top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').on('click', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1500);
        return false;
    });

    // makes the parallax elements JQUARY Start
    function parallaxIt() {
        // create variables
        var $fwindow = $(window);
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        var $contents = [];
        var $backgrounds = [];

        // for each of content parallax element
        $('[data-type="content"]').each(function (index, e) {
            var $contentObj = $(this);

            $contentObj.__speed = ($contentObj.data('speed') || 1);
            $contentObj.__fgOffset = $contentObj.offset().top;
            $contents.push($contentObj);
        });

        // for each of background parallax element
        $('[data-type="parallax"]').each(function () {
            var $backgroundObj = $(this);

            $backgroundObj.__speed = ($backgroundObj.data('speed') || 1);
            $backgroundObj.__fgOffset = $backgroundObj.offset().top;
            $backgrounds.push($backgroundObj);
        });

        // update positions
        $fwindow.on('scroll resize', function () {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            $contents.forEach(function ($contentObj) {
                var yPos = $contentObj.__fgOffset - scrollTop / $contentObj.__speed;

                $contentObj.css('top', yPos);
            })

            $backgrounds.forEach(function ($backgroundObj) {
                var yPos = -((scrollTop - $backgroundObj.__fgOffset) / $backgroundObj.__speed);

                $backgroundObj.css({
                    backgroundPosition: '50% ' + yPos + 'px'
                });
            });
        });

        // triggers winodw scroll for refresh
        $fwindow.trigger('scroll');
    };
    parallaxIt();
    // Parallax elements JQUARY End

    // owl-carousel for Testimonial 
    $('.tour-carousel').owlCarousel({
        loop: true,
        rtl: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: false,
        autoplaySpeed: 2000,
        animateOut: '',
        animateIn: 'zoomIn',
        navText: [
            '<i class="ion-ios-arrow-left"></i>',
            '<i class="ion-ios-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    // owl-carousel for Blog 
    $('#team-slider').owlCarousel({
        loop: false,
        rtl: true,
        margin: 15,
        nav: false,
        dots: false,
        autoplay: false,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        autoplaySpeed: 1000,
        navText: [
            '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
            '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    // owl-carousel for Testimonial 
    $('.testimonial-carousel').owlCarousel({
        loop: false,
        rtl: true,
        margin: 10,
        nav: false,
        dots: true,
        autoplay: false,
        autoplayTimeout: 2000,
        autoplayHoverPause: false,
        autoplaySpeed: 2000,
        animateOut: '',
        animateIn: 'zoomIn',
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            },
        }
    });

    // owl-carousel for partners
    $('#baner-slider').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        autoplaySpeed: 1000,
        navText: [
            '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
            '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1,
                center: false
            },
            480: {
                items: 1,
                center: false
            },
            600: {
                items: 1,
                center: false
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    });

    // Blog for partners
    $('#shop-3col-carousel').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        autoplaySpeed: 1000,
        navText: [
            '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
            '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1,
                center: false
            },
            480: {
                items: 1,
                center: false
            },
            600: {
                items: 1,
                center: false
            },
            768: {
                items: 1
            },
            992: {
                items: 3
            },
            1200: {
                items: 3
            }
        }
    });

    $('.client-carousel').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        margin: 50,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: false,
        autoplaySpeed: 1000,
        responsive: {
            0: {
                margin: 10,
                items: 2
            },
            480: {
                margin: 10,
                items: 4
            },
            600: {
                margin: 20,
                items: 5
            },
            1000: {
                items: 6
            }
        }
    });


    $('.gal-caro').owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        margin: 50,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: false,
        autoplaySpeed: 1000,
        navText: [
            '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
            '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                margin: 10,
                items: 1
            },
            480: {
                margin: 10,
                items: 2
            },
            600: {
                margin: 20,
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });

    //Setup Filterizr
    var filtrContainer = $('.filtr-container');
    if (filtrContainer.length) {
        filtrContainer.imagesLoaded(function () {
            var filterizr = $('.filtr-container').filterizr();
        });
    }

    // Fancybox
    $(document).ready(function () {
        $('.fancybox').fancybox();
    });

    //LightBox / Fancybox
    if ($('.lightbox-image').length) {
        $('.lightbox-image').fancybox();
    }

    // Video popup
    jQuery("a.demo").YouTubePopUp();

    // Fully video
    if ($('.player').length) {
        $('.player').mb_YTPlayer();
    }

    // Date picker
    $('.input-group.date').datepicker({ format: "dd.mm.yyyy" });

    // Video popup
    jQuery("a.demo").YouTubePopUp();

})(window.jQuery);
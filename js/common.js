$(document).ready(function() {

	setInterval(function(){
		$(".preloader__second").fadeIn(300);
	}, 500);
	setInterval(function(){
		$(".preloader__second").addClass("active");
		$(".preloader__first").fadeOut(0);
	}, 800);
	setInterval(function(){
		$(".preloader").fadeOut(0);
	}, 2000);

	/*animate*/
	new WOW().init();



	// Hide Header on on scroll down
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('.header').outerHeight();

	$(window).scroll(function(event){
		didScroll = true;
	});
	
	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	function hasScrolled() {
		var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
    	return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
        	$('.header').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}

setInterval(function(){
	$(".scrolldown").toggleClass("active");
}, 3000);

	//плавный скролл
	$(".navigat li a").mPageScroll2id();


	//кнопка sandwich
	$(".btn_nav").click(function() {
		$(".sandwich").toggleClass("active");
		if ($(".menu").is(":hidden")) {
			$(".menu").slideDown(200);
		} else {
			$(".menu").slideUp(200);
		}
		
	});

	$(".menu a").click(function() {
		$(".menu").slideUp(200);
		$(".sandwich").removeClass("active");
	});


	$('.swiper-entertainment').each(function(){
		var slides = $(this).find(".swiper-slide");
		var fraction = $(this).find(".swiper-fraction");
		var slideCount = slides.length;
		fraction.html(`1 / ${slideCount}`);

		var swiper = new Swiper(this, {
			slidesPerView: "auto",
			mousewheel: true,


  // Navigation arrows
  navigation: {
  	nextEl: (this, ".swiper-button-next"),
  	prevEl: (this, ".swiper-button-prev")
  },
  breakpoints: {
  	0: {
  		slidesPerView: 1,
  	},
    // when window width is >= 320px
    480: {
    	slidesPerView: 1,
    },
    // when window width is >= 480px
    768: {
    	slidesPerView: 1,
    },
    // when window width is >= 640px
    992: {
    	slidesPerView: "auto",
    }
},
on: {
	slideChange: () => {
		fraction.html(`${swiper.realIndex + 1} / ${slideCount}`);
	} }
});
	});
	//слайдер

	$('.slider').slick({
		arrows: true,
		dots: true,
		infinite: true,
		touchThreshold: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<div class="slick-prev slick-arrow"><i class="fas fa-chevron-left"></i><div/>',
		nextArrow: '<div class="slick-next slick-arrow"><i class="fas fa-chevron-right"></i><div/>',
	});

	//Letter wrap on hover
	const letterWrapClass = 'letter-wrap';
	const letterWrapElements = document.getElementsByClassName(letterWrapClass);
	[...letterWrapElements].forEach(el => {
		letterWrap(el, letterWrapClass);
		letterAnimation(el, letterWrapClass);
	});
	function letterWrap(el, cls) {
		const words = el.textContent.split(' ');
		const letters = []; 
		cls = cls || 'letter-wrap'  
		words.forEach(word => {
			let html = '';
			for (var letter in word) {
				html += `
				<span class="${cls}__char">
				<span class="${cls}__char-inner" data-letter="${word[letter]}">
				${word[letter]}
				</span>
				</span>
				`;
			};   
			let wrappedWords = `<span class="${cls}__word">${html}</span>`;
			letters.push(wrappedWords);
		});
		return el.innerHTML = letters.join(' ');
	}
	
	function letterAnimation(el, cls) {
		const tl = new TimelineMax({ paused: true });
		const characters = el.querySelectorAll(`.${cls}__char-inner`);
		const duration = el.hasAttribute('data-duration') ? el.dataset.duration : 0.4;
		const stagger = el.hasAttribute('data-stagger') ? el.dataset.stagger : 0.03; 
		el.animation = tl.staggerTo(characters, duration, {
			y: '-100%',
			delay: 0.1,
			ease: Power2.easeInOutCubic
		}, stagger);      
		el.addEventListener('mouseenter', (event) => event.currentTarget.animation.play());
		el.addEventListener('mouseout', (event) => el.animation.pause(0));
	}

	$(".input-phone").mask("+7 (999) 999-99-99");

	{
		if ($(window).width() < 992) { 
			$('.item-location').click(function() {
				$('html').animate({ 
					scrollTop: $("#map").offset().top - 0
				}, 1000 
				);
			}); 

		}
	}

	 // стайлер для select
	 $('select').styler();

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox();


	//Кнопка "Наверх"
	//Документация:
	//http://api.jquery.com/scrolltop/
	//http://api.jquery.com/animate/
	$(".btn_top").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});

	objectFitImages();


});


/*polifyl*/
/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages=function(){"use strict";function t(t,e){return"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+t+"' height='"+e+"'%3E%3C/svg%3E"}function e(t){if(t.srcset&&!p&&window.picturefill){var e=window.picturefill._;t[e.ns]&&t[e.ns].evaled||e.fillImg(t,{reselect:!0}),t[e.ns].curSrc||(t[e.ns].supported=!1,e.fillImg(t,{reselect:!0})),t.currentSrc=t[e.ns].curSrc||t.src}}function i(t){for(var e,i=getComputedStyle(t).fontFamily,r={};null!==(e=u.exec(i));)r[e[1]]=e[2];return r}function r(e,i,r){var n=t(i||1,r||0);b.call(e,"src")!==n&&h.call(e,"src",n)}function n(t,e){t.naturalWidth?e(t):setTimeout(n,100,t,e)}function c(t){var c=i(t),o=t[l];if(c["object-fit"]=c["object-fit"]||"fill",!o.img){if("fill"===c["object-fit"])return;if(!o.skipTest&&f&&!c["object-position"])return}if(!o.img){o.img=new Image(t.width,t.height),o.img.srcset=b.call(t,"data-ofi-srcset")||t.srcset,o.img.src=b.call(t,"data-ofi-src")||t.src,h.call(t,"data-ofi-src",t.src),t.srcset&&h.call(t,"data-ofi-srcset",t.srcset),r(t,t.naturalWidth||t.width,t.naturalHeight||t.height),t.srcset&&(t.srcset="");try{s(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}e(o.img),t.style.backgroundImage='url("'+(o.img.currentSrc||o.img.src).replace(/"/g,'\\"')+'")',t.style.backgroundPosition=c["object-position"]||"center",t.style.backgroundRepeat="no-repeat",t.style.backgroundOrigin="content-box",/scale-down/.test(c["object-fit"])?n(o.img,function(){o.img.naturalWidth>t.width||o.img.naturalHeight>t.height?t.style.backgroundSize="contain":t.style.backgroundSize="auto"}):t.style.backgroundSize=c["object-fit"].replace("none","auto").replace("fill","100% 100%"),n(o.img,function(e){r(t,e.naturalWidth,e.naturalHeight)})}function s(t){var e={get:function(e){return t[l].img[e?e:"src"]},set:function(e,i){return t[l].img[i?i:"src"]=e,h.call(t,"data-ofi-"+i,e),c(t),e}};Object.defineProperty(t,"src",e),Object.defineProperty(t,"currentSrc",{get:function(){return e.get("currentSrc")}}),Object.defineProperty(t,"srcset",{get:function(){return e.get("srcset")},set:function(t){return e.set(t,"srcset")}})}function o(){function t(t,e){return t[l]&&t[l].img&&("src"===e||"srcset"===e)?t[l].img:t}d||(HTMLImageElement.prototype.getAttribute=function(e){return b.call(t(this,e),e)},HTMLImageElement.prototype.setAttribute=function(e,i){return h.call(t(this,e),e,String(i))})}function a(t,e){var i=!y&&!t;if(e=e||{},t=t||"img",d&&!e.skipTest||!m)return!1;"img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):"length"in t||(t=[t]);for(var r=0;r<t.length;r++)t[r][l]=t[r][l]||{skipTest:e.skipTest},c(t[r]);i&&(document.body.addEventListener("load",function(t){"IMG"===t.target.tagName&&a(t.target,{skipTest:e.skipTest})},!0),y=!0,t="img"),e.watchMQ&&window.addEventListener("resize",a.bind(null,t,{skipTest:e.skipTest}))}var l="fregante:object-fit-images",u=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,g="undefined"==typeof Image?{style:{"object-position":1}}:new Image,f="object-fit"in g.style,d="object-position"in g.style,m="background-size"in g.style,p="string"==typeof g.currentSrc,b=g.getAttribute,h=g.setAttribute,y=!1;return a.supportsObjectFit=f,a.supportsObjectPosition=d,o(),a}();


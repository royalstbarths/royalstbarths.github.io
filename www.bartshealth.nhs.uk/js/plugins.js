(function(w, app) {
	"use strict"
	app.placementOptions["cycleslideshow"] = {
		".cycle-slideshow": {
			speed: 800,
			timeout: 8000,
			fx: "fade"
		}
	};

	/* -- tabs slideshow -- */
	app.placementOptions["tabslideshow"] = {
		".tabs-slider": {}
	};
	/* -------------- */

	/* -- carousel slideshow -- */
	app.placementOptions["carouselslideshow"] = {
		".carousel-slideshow": {
			visible: 3,
			wrap: 'circular',
			scroll: 1,
			auto: 0,
			buttonNextHTML: '<div class="carousel-control-wrap"><div class="carousel-control no-select"></div></div>',
			buttonPrevHTML: '<div class="carousel-control-wrap"><div class="carousel-control no-select"></div></div>',
			itemFallbackDimension: '500'
		}
	};

	app.atPageLoad(function() {
		/*  --------------  \/ add your code here \/  ----------------- */

		/*Accessibility Toggle*/
		$('<div class="dropdown"><a href="##" class="acc-dropdown-toggle" id="access-dropdown" data-toggle="dropdown">Accessibility Tools<span class="caret"></span></a>').insertBefore(".access-controls-wrapper");
		$('.acc-dropdown-toggle').click(function(e) {
			e.preventDefault();
			$('.access-controls-wrapper').fadeToggle(400);
			$('.acc-dropdown-toggle').toggleClass('open');
		});
    /*End Accessibility toggle*/
		
		/*Mobile Nav Toggle*/
		$('<div class="mobile-nav-toggle-wrap"><a class="mobile-nav-toggle" href="#"><span class="nav-icon"></span><span class="button-text">MENU</span><span class="nav-caret"></span></a></div>').insertAfter(".logo-container");
		$('.mobile-nav-toggle').click(function(e) {
			e.preventDefault();
			//$('#top-nav').toggleClass("menu-open").slideToggle(400);
			$(".mega-menu-wrapper").toggleClass("menu-open");
			$("html").toggleClass("top-nav-open");
			$('.mobile-nav-toggle-wrap').toggleClass('open');
		});
		/*End mobile nav toggle*/
		
		/*Togglable Blog Comments Form*/
			$('.blog-comment-toggle').on('click', function(e) {
				e.preventDefault();
				$("#blg-cmt-frm").slideToggle('fast');
				$('.blog-comment-toggle .blog-comment-toggle-icon').toggleClass('open');
			});
		/*End Togglable Comments Form*/
		
		// count number of items in a menu and add a counter with total
		$(".menu").each(function(i) {
			var lppCount = $(this).children().length;
			$(this).children().each(function(i) {
				$(this).addClass("item-" + (i + 1) + "-of-" + lppCount);
			});
		});

		// Left aligned images
		$('img').filter(function() {
			return $(this).css('float') === 'left';
		}).addClass('content-image-aligned-left');

		// Right aligned images
		$('img').filter(function() {
			return $(this).css('float') === 'right';
		}).addClass('content-image-aligned-right');

		// external links
		$('p a[target=_blank]')
			.attr('title', 'Opens in a new window')
			.addClass('newindow');

		// Blog Archives Toggle
		$('.archives-list.month:gt(0)').hide();

		$('.archives-list.month:eq(0)').parent().find('a').addClass('open');

		$('.archive-list-item-year-toggle').click(function(ev) {
			ev.preventDefault();
			$(this).toggleClass('open');
			$(this).next('.archives-list').slideToggle();
		});

		// Add a class to the last menu item in the top nav
		$('#top-nav li').last().addClass('last-menu-item');

		// Terms and Conditions toggle
		$('.terms-and-condition-link').click(function(ev) {
			var tandc = $('.t-and-c-wrapper');
			tandc.slideToggle('slow', function() {});
		});

		$('.cta-carousel .content-items-list .list-content-item').each(function(i, obj) {
			var linkHREF = $(this).find(".summary a").attr("href");
			$(this).find(".content-main-image").wrap("<a class='slide-link' target='_blank' href='" + linkHREF + "'></a>");
		});
		
		$(".cta-carousel.overlay .content-wrapper-inner").append("<div class='carousel-overlay ol-left'></div>");
		$(".cta-carousel.overlay .content-wrapper-inner").append("<div class='carousel-overlay ol-right'></div>");
		$('.cta-carousel .content-items-list').bxSlider({
		  minSlides: 3,
		  maxSlides: 100,
		  slideWidth: 600,
		  slideMargin: 0,
		  pager: false,
		  moveSlides: 1,
		  swipeThreshold: 150
		});
		
		function overlaySize() {
			var windowWidth = $(window).width();
			var extraSpace = windowWidth-1200;
			var overlayWidth = extraSpace/2;
			var slideOffset = overlayWidth-157;
			$(".carousel-overlay").css("width", overlayWidth + "px");
			$(".cta-carousel .bx-wrapper .bx-viewport .content-items-list").css("margin-left", overlayWidth + "px");
			$(".cta-carousel .bx-controls .bx-controls-direction .bx-prev").css("left", overlayWidth + "px");
			$(".cta-carousel .bx-controls .bx-controls-direction .bx-next").css("right", overlayWidth + "px");
		}
		
		overlaySize();
		
		$(window).resize(function() {
			overlaySize();
		});
		
		//homepage pale bg helper
		$(".home-page .placement-row-1-up .type-blogsminilist").closest(".placement-row-wrapper").addClass("pale-bg");
		$("#top .type-general .site-search #site-search-form input[type='search']").attr("placeholder","Search our website");
		$(".home-page #site-content-top-row .type-general .site-search #site-search-form input[type='search']").attr("placeholder","What are you looking for?");
		
		/*Accordion placements*/
	    $(".accordion-base .content-headline").click(function(e){
		    e.preventDefault();
		    $(this).nextAll(".content-wrapper-inner").first().slideToggle();
		    $(this).toggleClass('open');
	    });
	    
	    $(".left .side-navigation-menu").first().clone().addClass("mobile-sub-nav").prependTo(".main-wrapper");
	    $(".left .side-navigation-menu").first().addClass("hide-now");
	    if ($('.side-navigation-menu').length > 0) {
		    $('<div class="mobile-subnav-toggle-wrap"><a class="mobile-subnav-toggle" href="#"><span class="subnav-icon"></span><span class="button-text">In this section...</span><span class="subnav-caret"></span></a></div>').prependTo(".mobile-sub-nav");
			$('.mobile-subnav-toggle').click(function(e) {
				e.preventDefault();
				$('.mobile-sub-nav .menu').fadeToggle(400);
				$('.mobile-subnav-toggle-wrap').toggleClass('open');
			});
	    }

	    $(".alerts-ticker .content-items-list").bxSlider({
			ticker: ($('.alerts-ticker .content-items-list').children().length < 2) ? false : true,
			speed: 60000,
			tickerHover: true,
			slideMargin: 10,
			pager: false,
			controls: false,
			touchEnabled: false
		});
		/* ---------------------  /\ /\ /\ /\ /\   -------------------- */

	});

}(window, Atlas));
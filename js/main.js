 ( function( $ ) {

    "use strict";

    
 

    var mobileAnimation = true;
        
    var wow = '';

    /****** Touch device ******/

    var isTouchDevice = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    if (isTouchDevice) {
        $('body').addClass('is-touchable');
    }

    /****** Check for browser OS ******/
    var isMobile    = false,
        isiPhoneiPad= false,
        isSafari   = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }

    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        isiPhoneiPad = true;
    }
 
    /****** Wow animation ******/
    if( $( '.wow' ).length > 0 ) {
        wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animate__animated',
            offset: 30,
            mobile: mobileAnimation,
            live: true
        });
        $( document ).imagesLoaded( function () {
            wow.init();
        });
    }

    /****** Portfolio isotope & filter ******/
    $( '.portfolio-wrapper' ).each( function() {
        var _this = $( this );
        if( ! _this.find( '.wow' ).length > 0 ) {
            _this.find( '.grid-item' ).css( 'visibility', 'hidden' );
        }
        _this.imagesLoaded( function () {
            if( ! _this.find( '.wow' ).length > 0 ) {
                _this.find( '.grid-item' ).css( 'visibility', '' );
            } else if( ! isMobile ) {
                _this.find( '.grid-item' ).css( 'visibility', 'hidden' );
            }
            _this.removeClass( 'grid-loading' );
            _this.isotope({
                layoutMode: 'masonry',
                itemSelector: '.grid-item',
                percentPosition: true,
                stagger: 0,
                masonry: {
                    columnWidth: '.grid-sizer',
                }
            });
            isotopeObjs.push( _this );
        });
    });
    $( document ).on( 'click', '.portfolio-filter > li > a', function () {
        var _this           = $( this ),
            parentSectionObj= _this.parents( 'section' );
        parentSectionObj.find( '.portfolio-filter > li' ).removeClass( 'active' );
        _this.parent().addClass( 'active' );
        var selector        = _this.attr( 'data-filter' ),
            portfolioFilter = parentSectionObj.find( '.portfolio-wrapper' );
        // Remove animation
        removeWowAnimation( portfolioFilter );
        // Isotope filter
        portfolioFilter.isotope({ filter: selector });
        return false;
    });
 
    /****** Remove wow animation ******/
    function removeWowAnimation( gridObj ) {
        gridObj.find( '.grid-item' ).removeClass( 'animate__animated' ).css( 'visibility', '' ); // avoid problem to filter after sorting
        if( $( '.wow' ).length > 0 ) {
            gridObj.find( '.grid-item' ).each( function () {
                var _this = $( this );
                // remove perticular element from WOW array when you don't want animation on element after DOM lead
                wow.removeBox( this );
                _this.css( '-webkit-animation', 'none' );
                _this.css( '-moz-animation', 'none' );
                _this.css( '-ms-animation', 'none' );
                _this.css( 'animation', 'none' );
            });
        }
    }
  
 })( jQuery );
( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;
    var fapp        = sn('fapp' ); 



 
    fapp.initBurgerMenu_8_navDrawerShade = function()
    {
        ///================================================================
        /// //\\ 1) Menu: This controls the hamburger menu and nav drawer
        ///================================================================
        //$('.nav-drawer').hide();   
        $('.btn__menu').on('click', function() {
            $('.nav-drawer').toggleClass('animateIn');
            $('.btn__menu').toggleClass('exit-ani');
            //shows the overlay shade
            $('#shade').fadeToggle('fast');
        });

        $('#shade').on('click', function() {
           $('.nav-drawer').hide();
            $('.btn__menu').toggleClass('exit-ani');
            $('#shade').toggle();
        }); 
        ///================================================================
        /// \\// 1) Menu: This controls the hamburger menu and nav drawer
        ///================================================================
    };


})();


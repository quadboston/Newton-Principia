
( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);





    to_fconf =
    {
        hideSingleItemContentMenus : true,
        SHOW_EVEN_SINGLE_SUBESSAY_MENU_ITEM : false,
    }

    Object.keys( to_fconf ).forEach( function( key ) {
        fconf[ key ] = to_fconf[ key ];
    });

}) ();


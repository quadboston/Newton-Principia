// //\\// file where to set plugin main configuration
( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);
    var sconf   = ns.sn('sconf',fconf);




    //====================================================
    // //\\ optionally overriden by url-query-config
    //====================================================
    to_sconf =
    {
        mediaOffset : [ 0, 0 ],                 //in respect to media-root
        mediaDefaultWidthPercent : 40,          //in respect to total width
        MINIMAL_MEDIA_CONTAINER_WIDTH : 350,    //todm approximate
        main_horizontal_dividor_width_px : 21,

        //topics:
        DEFAULT_TP_SATUR : 99,
        DEFAULT_TP_OPACITY : 0.6,

        //:this solution is not good:
        //:some lemmas need bright red, but
        //:bright green text is hard to read ...
        //:so we resort to dark color LIGHT = 30
        DEFAULT_TP_LIGHT : 30,
    };
    //====================================================
    // \\// optionally overriden by url-query-config
    //====================================================

    //adds to_sconf to commong sconf
    Object.keys( to_sconf ).forEach( function( key ) {
        sconf[ key ] = to_sconf[ key ];
    });

}) ();


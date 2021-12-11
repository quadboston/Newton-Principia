
( function() {
    var {
        fconf, sconf, nspaste,
    } = window.b$l.apptree({
    });


    to_fconf =
    {
        hideSingleItemContentMenus : true,
        SHOW_EVEN_SINGLE_SUBESSAY_MENU_ITEM : false,
    }

    Object.keys( to_fconf ).forEach( function( key ) {
        fconf[ key ] = to_fconf[ key ];
    });

    to_sconf =
    {
        //***************************************************
        // in better design, this setting should come
        // from ns.dpdec.dimensions.WIDTH bsl-core,
        // to do this, this module should have
        // delayed execution of to_sconf based on setModue
        // machinery,
        //
        // in mean time, these 21px comes as a sum
        // for 5px of image width + 2*8px padding from
        //     subroots.css.js::#bsl-resizable-handle
        // and not from dpdec.dimensions.WIDTH as may appear,
        main_horizontal_dividor_width_px : 21,
        //***************************************************

        SVG_IMAGE_TOPIC_NON_HOVERED_OPACITY : 0.6,
    };

    //adds to_sconf to commong sconf
    nspaste( sconf, to_sconf );

}) ();


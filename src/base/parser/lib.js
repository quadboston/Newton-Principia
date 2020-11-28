( function() {
    var {
        ns, sn, $$,
        eachprop,
        sconf,
        sDomF,
        topics,
        normId2topic,
    } = window.b$l.apptree({
        ssFExportList :
        {
            colorArray_2_rgba,
            topics__2__topicsColorModel,
        },
    });
    sDomF.topicIdUpperCase_2_underscore = topicIdUpperCase_2_underscore;
    return;




















    ///apparently main color manager
    ///assigns colors to topics,
    ///assigns either zebra-colors or "fixed-color"s,
    ///high opacity returned = 1,
    function topics__2__topicsColorModel()
    {
        var SATUR   = sconf.DEFAULT_TP_SATUR;
        var LIGHT   = sconf.default_tp_lightness || sconf.DEFAULT_TP_LIGHT;
        var OPACITY = sconf.DEFAULT_TP_OPACITY;

        eachprop( normId2topic, ( topi_c, topicId, tcount, allTopicsCount ) => {
            var fc = topi_c['fixed-color'];
            if( fc ) {
                ////***********************************************
                ////color is predefined in "fixed-color" dictionary
                ////***********************************************
                ////builds low and high colors from this dictionary
                ////    predefined array[ 3 ] commands which opacity will be in
                ////    "low_color"
                ////    if opacity is missed in predefined-array, then
                ////    sconf.DEFAULT_TP_OPACITY is used.
                var lh = colorArray_2_rgba( fc ) //high op = 1
            } else {
                ////***********************************************
                ////generates pseudo-random zebra colors
                ////***********************************************
                ////with DEFAULT_TP_OPACITY
                var rem = tcount%2;
                var zebra = rem ? (tcount-rem)/2 : tcount/2 + Math.floor( allTopicsCount / 2 );
                var hue = 359 / allTopicsCount * zebra; // topicsCount * zebra;

                //returns high opacity = 1:
                var lh = hslo_2_low8high( hue, SATUR, LIGHT, OPACITY );
            }

            //result's format is:
            //topi_c.rgba_high:
            //topi_c.rgba_low:
            Object.assign( topi_c, lh );

        });
    }

    ///argument theOpacity goes to rgba_low,
    ///opacity 1           goes to rgba_high,
    function hslo_2_low8high( hue, sat, light, theOpacity )
    {
        //ns.pars2colors = function( HUE, SATURATION, LIGHTNESS, OPACITY )
        var corRack     = ns.pars2colors( hue, sat, light, theOpacity );
        rgba_low        = corRack.rgba;
        rgbaCSS         = corRack.rgbaCSS;
        var corRack     = ns.pars2colors( hue, sat, light, 1 );
        rgba_high       = corRack.rgba;
        return { rgba_low, rgba_high }; 
    }

    ///color low    goes to supplied-color or default,
    ///color height goes to opacity = 1
    function colorArray_2_rgba( colorArray )
    {
        var SATUR = sconf.DEFAULT_TP_SATUR;
        var LIGHT = sconf.default_tp_lightness || sconf.DEFAULT_TP_LIGHT;

        //.apparently does job as said: color to color
        var overridden = ns.rgba2hsla( colorArray );
        hue = overridden[ 0 ];
        var opacity = overridden[ 3 ] || overridden[ 3 ] === 0 ?
                        overridden[ 3 ] :
                        sconf.DEFAULT_TP_OPACITY;
        //.for grey or black color: we set satur to 0 manually
        var satur = overridden[1] === 0 ? 0 : SATUR;

        //returns high op = 1:
        //.apparently does the color as is
        return hslo_2_low8high( hue, satur, LIGHT, opacity );
    }

    ///converts "A" -> "_a",  ... and "," to "_-"
    function topicIdUpperCase_2_underscore( topicId )
    {
        return topicId.replace( /([A-Z,])/g,
            ( match, key1 ) => ( key1 === ',' ? '_-' : '_' + key1.toLowerCase() )
        );
    }


}) ();



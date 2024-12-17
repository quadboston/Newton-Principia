/*
 * "low8high" "interface signature" { rgb, rgba_low, rgba_high, lowOpacity, highOpacity }
 * following functions do return it:
 *      ns.hslo_2_rgba_low8high
 *      ssF.colorArray_2_rgba,
 * 
 *      ns.builds_zebraNColors_array (returns array of signatures)
 *      
        (topics__2__topicsColorModel builds following:)
 *      lcaseId2allLemTopics dictionary has elements with signature:
             *topi_c properties*:
                lowtpId //aka "circ-txt"

                fixed-color   //original raw color in array-format aka [x,x,x,...],
                tpOpacityHigh //used in topic-media-glocss
                              //by establishes__unhighlightedTopicsGlobalCss, ...
                tpOpacityLow  //"

                rgb,          //used in assigns_color_to_anchor
                rgba_high     //used in assigns_color_to_anchor
                rgba_low
                highOpacity
                lowOpacity
*/


( function() {
    var {
        ns, sn, $$, nsmethods, haz, has, eachprop,
        sconf, sDomF, topics, lcaseId2allLemTopics, originalPoints,
    } = window.b$l.apptree({
        ssFExportList :
        {
            colorArray_2_rgba,
            topics__2__topicsColorModel,
        },
    });
    sDomF.topicIdUpperCase_2_underscore = nsmethods.camelName2cssName;
    return;




















    ///assigns colors to topics,
    ///     assigns either zebra-colors or "fixed-color"s,
    ///     sets topi_c props including low8high signature which is =
    ///     { rgb, rgba_low, rgba_high, lowOpacity, highOpacity }
    function topics__2__topicsColorModel()
    {
        eachprop( lcaseId2allLemTopics,
                  ( topi_c, lowtpId, tcount, allTopicsCount ) => {
            var fc = haz( topi_c, 'fixed-color' );
            var isPoint = !!has( originalPoints, topi_c.camelId );
            if( fc ) {
                ////***********************************************
                ////color is predefined in "fixed-color" dictionary
                ////***********************************************
                ////builds lowOpacity and highOpacity colors from this dictionary,
                ////fc[3],fc[4] === lowOpacity,highOpacity opacity,
                ////    otherwise, defaults are used,
                var lh = colorArray_2_rgba(
                    fc,
                    sconf.TP_SATUR_FROM_fixed_colors,
                    sconf.TP_OPACITY_FROM_fixed_colors,
                    isPoint,
                );
            } else {
                ////***********************************************
                ////generates pseudo-random zebra colors
                //// todm: don in colors.js ... do replace this ...
                ////***********************************************
                ////with TP_OPACITY_LOW
                var rem = tcount%2;
                var zebra = rem ? (tcount-rem)/2 : tcount/2 + Math.floor( allTopicsCount / 2 );
                var hue = 359 / allTopicsCount * zebra; // topicsCount * zebra;

                var lh = ns.hslo_2_rgba_low8high(
                    hue,
                    sconf.DEFAULT_TP_SATUR,
                    sconf.default_tp_lightness,
                    isPoint ? sconf.TP_OPACITY_LOW_POINT : sconf.TP_OPACITY_LOW,
                    sconf.TP_OPACITY_HIGH,
                );
            }
            //lh==={ rgba_low, rgba_high, lowOpacity, highOpacity }
            Object.assign( topi_c, lh, );
        });
    }


    ///returns JS-object { rgba_low, rgba_high, lowOpacity, highOpacity }
    function colorArray_2_rgba(
        colorArray, //== [r,g,b,opacityLow,opacityHigh]
        saturFromColorArray,
        opacityFromColorArray,
        isPoint,
    ){
        var hsl_lh = ns.rgbaArr2hsla( colorArray );
        const sconfOPACITY_LOW = isPoint ?
            sconf.TP_OPACITY_LOW_POINT : sconf.TP_OPACITY_LOW;
        if( opacityFromColorArray && colorArray ) {
            if( colorArray[3] || colorArray[3]===0 ) {
                var lowOpacity = colorArray[3]; 
            } else {
                var lowOpacity = sconfOPACITY_LOW; 
            }
            if( colorArray[4] || colorArray[4]===0 ) {
                var highOpacity = colorArray[4]; 
            } else {
                var highOpacity = sconf.TP_OPACITY_HIGH; 
            }
        } else {
            var lowOpacity = sconfOPACITY_LOW;
            var highOpacity = sconf.TP_OPACITY_HIGH;
            //c cc( lowOpacity, highOpacity );
        }
        if( saturFromColorArray && colorArray ) {
            let rgb = ns.arr2rgb_a(
                colorArray[0], colorArray[1], colorArray[2]
            );
            let rgba_low = ns.arr2rgb_a(
                colorArray[0], colorArray[1], colorArray[2], lowOpacity
            );
            let rgba_high = ns.arr2rgb_a(
                colorArray[0], colorArray[1], colorArray[2], highOpacity
            );
            var result = { rgb, rgba_low, rgba_high, lowOpacity, highOpacity }; 

        } else {
            var result = ns.hslo_2_rgba_low8high(
                //hue
                hsl_lh[ 0 ],

                //satur,
                //for grey or black color: we set satur to 0 manually
                hsl_lh[1] === 0 ? 0 : sconf.DEFAULT_TP_SATUR,

                //light
                sconf.default_tp_lightness,

                //opacityLow,
                lowOpacity,
                
                //opacityHigh,
                highOpacity,
            );
        }
        return result;
    }

}) ();



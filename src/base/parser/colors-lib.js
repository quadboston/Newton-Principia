/*
 "low8high" "interface signature"
    { rgb, rgba_low, rgba_high, lowOpacity, highOpacity }
 following functions do return it:
       ns.hslo_2_rgba_low8high
       ssF.colorArray_2_rgba,
       ns.builds_zebraNColors_array (returns array of signatures)

       (lowtpid__2__glocss8anchorRack builds following:)
                low_tpID //aka "circ-txt"

                fixed-color   //original raw color in array-format aka [x,x,x,...],
                tpOpacityHigh //??? used in topic-media-glocss
                              //by topics_2_unhighCss, ...
                tpOpacityLow  //"

                rgb,          //used in assigns_color_to_anchor
                rgba_high     //used in assigns_color_to_anchor
                rgba_low
                highOpacity
                lowOpacity
*/
(function(){
    const {
        ns, sn, $$, nsmethods, haz, has, eachprop,
        sconf, rg, sDomF, topics, lowtpid_2_glocss8anchorRack,
    } = window.b$l.apptree({
        ssFExportList :
        {
            colorArray_2_rgba,
            lowtpid__2__glocss8anchorRack,
        },
    });
    sDomF.topicIdUpperCase_2_underscore = nsmethods.camelName2cssName;
    return;


    ///assigns colors to topics,
    ///     assigns either zebra-colors or "fixed-color"s,
    ///     sets gcssRack props including low8high signature which is =
    ///     { rgb, rgba_low, rgba_high, lowOpacity, highOpacity }
    function lowtpid__2__glocss8anchorRack (){
        eachprop( lowtpid_2_glocss8anchorRack,
                  ( gcssRack, low_tpID, tcount, allTopicsCount ) => {
            var fc = haz( gcssRack, 'fixed-color' );
            gcssRack.tcount = tcount;
            if( fc ) {
                colArray_2_flags( gcssRack );
                return;
            } else {
                ////***********************************************
                ////generates pseudo-random zebra colors
                //// todm: don in colors.js ... do replace this ...
                ////***********************************************
                ////with TP_OPACITY_LOW
                var rem = tcount%2;
                var zebra = rem ? (tcount-rem)/2 :
                            tcount/2 + Math.floor( allTopicsCount / 2 );
                var hue = 359 / allTopicsCount * zebra; // topicsCount * zebra;

                var lh = ns.hslo_2_rgba_low8high(
                    hue,
                    sconf.DEFAULT_TP_SATUR,
                    sconf.default_tp_lightness,
                    //fc.isPoint0Line ? sconf.TP_OPACITY_LOW_POINT :
                    //                  sconf.TP_OPACITY_LOW,
                    sconf.TP_OPACITY_LOW,
                    sconf.TP_OPACITY_HIGH,
                );
            }
            //lh==={ rgba_low, rgba_high, lowOpacity, highOpacity }
            Object.assign( gcssRack, lh, );

            //to coexist with version2, rid later
            gcssRack.rgba_own = gcssRack.rgba_low;
        });
    }

    function colArray_2_flags( gcssRack ){
        var colorArray = haz( gcssRack, 'fixed-color' );
        var { rgb, rgba } = ns.arr2rgb_rgba( colorArray );
        var ownHighOp = colorArray[4];
        var ownFlag = !!(ownHighOp || ownHighOp === 0);
        gcssRack.forAnchor = rgba; //patch
        if( ownFlag ) {
            ////low and high opacity do exist,
            ////moves them in global css,
            ////(and removes them from own color)
            gcssRack.highOpacity = ownHighOp;
            gcssRack.lowOpacity = colorArray[3];
            gcssRack.rgba_own = rgb;
        } else {
            ////high opacity does not exist,
            ////preserves own color and takes
            ////opacities from global setting
            let fc = gcssRack['fixed-color'];

            if (hasHigherOpacity(gcssRack)) {
                gcssRack.highOpacity = sconf.AREA_HIGHLIGHT_OPACITY;
                gcssRack.lowOpacity = sconf.AREA_DEFAULT_OPACITY;
            } else {
                gcssRack.highOpacity = gcssRack.lowOpacity = 1;
            }
            gcssRack.rgba_own = rgba;
        };

        var rgX = haz( rg, gcssRack.camelId );
        gcssRack.strokeOpacity = 1;
        gcssRack.fillOpacity = 1;

        var classmark = haz( rgX, 'classmark' );
        if( classmark ) {
            //legacy rubbish, rid
            let tofill = !!classmark.match( /(\s+|^)tofill(\s+|$)/ );
            let tostroke = !!classmark.match( /(\s+|^)tostroke(\s+|$)/ );

            if( tofill && !tostroke ) {
                gcssRack.strokeOpacity = 0;
            }
            if( !tofill && tostroke ) {
                gcssRack.fillOpacity = 0;
            }
        }
    }

    // kludge
    function hasHigherOpacity (gcssRack){
        return typeof gcssRack['fixed-color'][3] === 'number';
    }

    ///returns JS-object { rgba_low, rgba_high, lowOpacity, highOpacity }
    ///works only for anchors in text
    function colorArray_2_rgba(
        colorArray, //== [r,g,b,opacityLow,opacityHigh]
        saturFromColorArray,
        opacityFromColorArray,
        isPoint0Line,
    ){
        const sconfOPACITY_LOW = isPoint0Line ?
            sconf.TP_OPACITY_LOW_POINT : sconf.TP_OPACITY_LOW;
        //ccc(isPoint +  'tp P=' + sconf.TP_OPACITY_LOW_POINT, sconf.TP_OPACITY_LOW);
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
            var hsl_lh = ns.rgbaArr2hsla( colorArray );
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
})();
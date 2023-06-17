( function() {
    var {
        ns, sn, $$, nsmethods, haz, eachprop,
        sconf, sDomF, topics, lcaseId2allLemTopics,
    } = window.b$l.apptree({
        ssFExportList :
        {
            colorArray_2_rgba,
            topics__2__topicsColorModel,
        },
    });
    sDomF.topicIdUpperCase_2_underscore = topicIdUpperCase_2_underscore;
    return;




















    ///assigns colors to topics,
    ///     assigns either zebra-colors or "fixed-color"s,
    ///     topic elements obtain properties: { rgba_low, rgba_high }
    function topics__2__topicsColorModel()
    {
        eachprop( lcaseId2allLemTopics,
                  ( topi_c, topicId, tcount, allTopicsCount ) => {
            var fc = haz( topi_c, 'fixed-color' );
            if( fc ) {
                ////***********************************************
                ////color is predefined in "fixed-color" dictionary
                ////***********************************************
                ////builds low and high colors from this dictionary,
                ////fc[3],fc[4] === low,high opacity,
                ////    otherwise, defaults are used,
                var lh = colorArray_2_rgba( fc )

            } else {
                ////***********************************************
                ////generates pseudo-random zebra colors
                //// todm: don in colors.js ... do replace this ...
                ////***********************************************
                ////with OWN_SHAPE_OPACITY
                var rem = tcount%2;
                var zebra = rem ? (tcount-rem)/2 : tcount/2 + Math.floor( allTopicsCount / 2 );
                var hue = 359 / allTopicsCount * zebra; // topicsCount * zebra;

                var lh = ns.hslo_2_low8high(
                    hue,
                    sconf.DEFAULT_TP_SATUR, // SATUR,
                    sconf.default_tp_lightness || sconf.DEFAULT_TP_LIGHT, //=LIGHT,
                    sconf.OWN_SHAPE_OPACITY,
                    sconf.OWN_SHAPE_OPACITY_HIGH,
                );
            }
            //lh==={ rgba_low, rgba_high, lowOpacity, highOpacity }
            Object.assign( topi_c, lh, );
            Object.assign( topi_c, topic_opacity( fc ) );
        });
    }


    ///returns JS-object { rgba_low, rgba_high, lowOpacity, highOpacity }
    function colorArray_2_rgba(
        colorArray, //== [r,g,b,opacityLow,opacityHigh]
    ){
        var hsl_lh = ns.rgbaArr2hsla( colorArray );
        return ns.hslo_2_low8high(

            //hue
            hsl_lh[ 0 ],

            //satur,
            //for grey or black color: we set satur to 0 manually
            hsl_lh[1] === 0 ? 0 : sconf.DEFAULT_TP_SATUR,

            //light
            sconf.default_tp_lightness || sconf.DEFAULT_TP_LIGHT,

            //opacityLow,
            sconf.OWN_SHAPE_OPACITY,

            //opacityHigh,
            sconf.OWN_SHAPE_OPACITY_HIGH,
        );
    }



    ///returns JS-object { lowOpacity, highOpacity }
    function topic_opacity(
        colorArray, //== [r,g,b,opacityLow,opacityHigh]
    ){
        return {
            tpOpacityLow :
            colorArray && ( colorArray[ 3 ] || colorArray[ 3 ] === 0 ) ?
                colorArray[ 3 ] :
                //professor did not define color, using default:
                sconf.TOPIC_FILL_OPACITY_NOT_IN_FOCUS,

            tpOpacityHigh :
            colorArray && ( colorArray[ 4 ] || colorArray[ 4 ] === 0 ) ?
                colorArray[ 4 ] :
                //professor did not define color, using default:
                sconf.TOPIC_FILL_OPACITY_IN_FOCUS,
        };
    }





    ///converts "A" -> "_a",  ... and "," to "_-"
    function topicIdUpperCase_2_underscore( topicId )
    {
        return nsmethods.camelName2cssName( topicId );
    }


}) ();



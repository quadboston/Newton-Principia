( function() {
    var {
        ns, sn, $$, sv,
        sconf, ssF, ssD, sDomF, fixedColors,
        rg, amode, stdMod, toreg,
    } = window.b$l.apptree({
        setModule, //delayed till mods loaded
        stdModExportList : //delayed till mods loaded
        {
        },
    });
    var pointies2line;
    var pos2pointy;
    var paintTriangle;
    var ellipseColor;
    var balanceParColor;
    return;








    function setModule()
    {
        stdMod.media_upcreate   = media_upcreate;
        pointies2line           = ssF.pointies2line;
        pos2pointy              = ssF.pos2pointy;
        paintTriangle           = ssF.paintTriangle;
    }


    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    ///a candidate for replacement with 
    ///media_upcreate___before_basic
    function media_upcreate()
    {
        if( !ssF.mediaModelInitialized ) {
            ////note: it may create for all theoreons, not only for current
            ns.haff( stdMod, 'create_digital_legend' );
        }
        createMedia0updateMediaAUX();
        if( ssF.mediaModelInitialized ) {
            stdMod.medD8D && stdMod.medD8D.updateAllDecPoints();
        } else {
            $$.q( '.change-model-data-button' )
              .html( "function" )
              ;
        }
        var tlegend = ns.haz( rg[ 'main-legend' ], amode.logic_phase );
        if( tlegend ) {
            ///above lines do create legend for all theoreons, this line
            ///shows only for one:
            tlegend.upcreate_mainLegend();
        }
        ssF.mediaModelInitialized = true;
    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================


    //=========================================================
    // //\\ updater helper
    //=========================================================
    function createMedia0updateMediaAUX()
    {
        ssF.toogle_detectablilitySliderPoints4Tools( stdMod, ); //todm ... generalize in one spot

        var pictureLeft = rg.detected_user_interaction_effect_DONE;
        //-------------------------------------------------
        // //\\ colors
        //-------------------------------------------------
        var wwfc        = fixedColors;
        var arr2rgba    = ns.arr2rgba;
        var wwex        = wwfc[ "experimental" ];
        var wwap        = wwfc[ "approximator" ];
        var givenColor  = ssD.givenColor = arr2rgba( wwfc[ "given" ] ) || 'rgba(0,0,0,1)';
        var experColor  = ssD.experColor = arr2rgba( wwex ) || 'rgba(0,0,255,1)';
        //var experColorOpaq = ssD.experColorOpaq = arr2rgba( [ wwex[0], wwex[1], wwex[2] ] );
        //var approxColorOpaq = ssD.approxColorOpaq = arr2rgba( [ wwap[0], wwap[1], wwap[2] ] );
        var approxColor = ssD.approxColor = arr2rgba( wwap );
        //-------------------------------------------------
        // \\// colors
        //-------------------------------------------------



        //-------------------------------------------------
        // //\\ paints axis x
        //      only once? ... no we cannot, user can move origin ...
        //-------------------------------------------------
        ( function () {
            var mod2med = ssF.mod2inn;
            toreg( "abscissa" );
            rg.abscissa.svgel = sv.polyline({
                svgel   : rg.abscissa.svgel,
                stroke  : 'black',                    
                parent  : stdMod.mmedia,
                pivots  : [ mod2med([-1,0]), mod2med([5,0]) ],
                'stroke-width' : 1,
            });
        })();
        //-------------------------------------------------
        // \\// paints axis x
        //-------------------------------------------------



        //-------------------------------------------------
        // //\\ paints original experimental-curve
        //-------------------------------------------------
        drawCurveFromDividedDifferences = ( function() {
            var dd = rg.experimental.expFunction;
            var mod2med = ssF.mod2inn;
            return function( x ) {
                 return mod2med([ x, dd(x) ]); };
        })();
        rg.experimental.svg = ns.svg.curve({
            stepsCount      : 120,
            start           : -0.2,
            step            : 0.05,
            curve           : drawCurveFromDividedDifferences,
            stroke          : givenColor,
            "stroke-width"  : 2,
            svgel           : rg.experimental.svg,
            dontClose       : true,
            parent          : stdMod.mmedia,
        });
        $$.$(rg.experimental.svg).addClass( 'tostroke thickable tp-given' );
        //-------------------------------------------------
        // \\// paints original experimental-curve
        //-------------------------------------------------



        //-------------------------------------------------
        // //\\ paints approximator curve
        //-------------------------------------------------
        drawCurveFromDividedDifferences_A = ( function() {
            var dd = rg.approximator_curve.dividedDifferences.calculate_polynomial;
            var mod2med = ssF.mod2inn;
            return function( x ) { return mod2med([ x, dd(x) ]); };
        })();
        rg.approximator_curve.svg = ns.svg.curve({
            stepsCount      : 120,
            start           : -0.2,
            step            : 0.05,
            curve           : drawCurveFromDividedDifferences_A,
            stroke          : approxColor,
            "stroke-width"  : 2,
            svgel           : rg.approximator_curve.svg,
            dontClose       : true,
            parent          : stdMod.mmedia,
        });
        $$.$(rg.approximator_curve.svg).addClass( 'tostroke thickable tp-approximator' );
        //-------------------------------------------------
        // \\// paints approximator curve
        //-------------------------------------------------


        //-------------------------------------------------
        // //\\ adds to points their media position
        //      and sets point's color
        //-------------------------------------------------
        Object.keys( sconf.pname2point ).forEach( pname => {
            var point = sconf.pname2point[ pname ];
            point.pointWrap.pcolor = point.ptype === 'approximator' ?
                                                      approxColor : experColor;
            if( pname !== 'O' ) {
                point.pointWrap.doPaintPname = true;
            }
            pn2mp( pname );
        });
        //-------------------------------------------------
        // \\// adds to points their media position
        //-------------------------------------------------


        //-----------------------------------------------
        // //\\ draws vertical lines and points
        //      and adds methods to point
        //-----------------------------------------------
        //ccc( sconf.pname2point, sconf.basePairs );
        sconf.basePairs.forEach( (bpair,pix) => {
            var x = bpair[0];
            var y = bpair[1];
            var pcolor = x.pointWrap.pcolor;
            var ptype = x.ptype;
            var handleR = 10;
            var m = rg.m.value;

            var line = pointies2line(
                x.pname + '-' + y.pname,
                [ rg[ x.pname ], rg[ y.pname ]],
                {
                    tpclass         : ptype,
                    cssClass        :'tostroke thickable',
                    'stroke-width'  : 2,
                    stroke          : pcolor,
                }
            );
            line.svgel.style.display =
                 m <= pix && ptype === 'experimental' ?  'none' : 'block';

            ///placed over above line
            pos2pointy(
                x.pname,
                { 
                    //tpclass       : ptype, 

                    cssClass        : 'tostroke thickable',
                    'stroke'        : pcolor,
                    'fill'          : 'white',
                    'stroke-width'  : 2,
                    r               : handleR,
                }
            );
            rg[ x.pname ].svgel.style.display =
                 m <= pix && ptype === 'experimental' ?  'none' : 'block';
            ///paints latin letters for points
            if( x.pointWrap.doPaintPname && pictureLeft ) {
                x.pointWrap.pnameLabelsvg = ns.svg.printText({
                    text : x.pname,
                    stroke : pcolor,
                    fill : pcolor,
                    "stroke-width" : 2,
                    svgel : x.pointWrap.pnameLabelsvg,
                    parent : stdMod.mmedia,
                    x : x.pointWrap.medpos[0]-12,
                    y : x.pointWrap.medpos[1]+60,
                    style : { 'font-size' : '50px' },
                });
                x.pointWrap.pnameLabelsvg.style.display =
                     m <= pix && ptype === 'experimental' ?  'none' : 'block';
            }

            //ccc( x.pname, rg[ x.pname ] )
            ///placed over above line
            pos2pointy(
                y.pname,
                { 
                    //todm these fail ... why? ...
                    //??? remove tpfill to disable tp
                    //tpclass         : ptype,

                    cssClass        : 'tostroke thickable',
                    'stroke'        : pcolor,
                    'fill'          : pcolor,
                    //'fill'          : ptype === 'experimental' ? experColorOpaq : approxColor,
                    'stroke-width'  : 2,
                    r               : handleR,
                }
            );
            rg[ y.pname ].svgel.style.display =
                 m <= pix && ptype === 'experimental' ?  'none' : 'block';


            ///paints latin letters for points
            if( y.pointWrap.doPaintPname && pictureLeft ) {
                y.pointWrap.pnameLabelsvg = ns.svg.printText({
                    text : y.pname,
                    stroke : pcolor,
                    fill : pcolor,
                    "stroke-width" : 2,
                    svgel : y.pointWrap.pnameLabelsvg,
                    parent : stdMod.mmedia,
                    x : y.pointWrap.medpos[0]-12,
                    y : y.pointWrap.medpos[1]-20,
                    style : { 'font-size' : '50px' },
                });
                y.pointWrap.pnameLabelsvg.style.display =
                     m <= pix && ptype === 'experimental' ?  'none' : 'block';
            }
            //ccc( y.pname, rg[ y.pname ] )



            //-------------------------------------------------
            // //\\ adds methods to single base point only once
            //-------------------------------------------------
            ///attaches updater right to the point G to ease
            ///this function lookup right from dragger-of-G
            if( !ns.h( rg[ x.pname ], 'model8media_upcreate' )) {
                var pointWrap = rg[ x.pname ];
                pointWrap.model8media_upcreate = function() {
                    stdMod.model8media_upcreate();
                }
                ///for slider
                pointWrap.pos2value = function( newPos )
                {
                    var posX = newPos[ 0 ];
                    x.pos[0] = posX;
                    y.pos[0] = posX;
                    y.pos[1] = x.pname === 'S' ?
                        rg.approximator_curve.dividedDifferences.calculate_polynomial( posX ) :
                        rg.experimental.expFunction( posX );
                    pointWrap.model8media_upcreate();
                }
            }
            //-------------------------------------------------
            // \\// adds methods to single base point only once
            //-------------------------------------------------
        });
        //-----------------------------------------------
        // \\// draws vertical lines and points
        //-----------------------------------------------


        if( !ns.h( rg, 'slider-m' ) ) { //todo 'm' is wrong ... do a real flag
            ////if slider is not already created ...
            ssF.createSliderPlaceholder_m();
            //todm make svg-scale slider: createSliderPlaceholder_a();
        }
    }
    //=========================================================
    // \\// updater helper
    //=========================================================



    ///shortcut to build medpos property
    function pn2mp( ptname ) {
        var pt = rg[ ptname ];
        pt.medpos = ssF.mod2inn( pt.pos );
    }

}) ();


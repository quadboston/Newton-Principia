( function() {
    var SUB_MODEL   = 'common';
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var mat         = sn('mat');
    var bezier      = sn('bezier');
    var sv          = sn('svg');
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative',sapp);
    var studyMods   = sn('studyMods', sapp);

    var ss          = sn('ss',fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var tr; //      = ssF.tr;
    var tp; //      = ssF.tp;
    var rg          = sn('registry',ssD);
    var rgtools     = sn('tools',ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'mediaModel_create';
    srg_modules[ modName + '-' + mCount.count ] = setModule;



    var modpos2medpos;
    var pointies2line;
    var pos2pointy;
    var paintTriangle;
    var ellipseColor;
    var balanceParColor;
    return;








    function setModule()
    {
        sn(SUB_MODEL, studyMods).media_upcreate = media_upcreate;
        modpos2medpos   = ssF.modpos2medposLL;
        pointies2line   = ssF.pointies2lineLL;
        pos2pointy      = ssF.pos2pointyLL;
        paintTriangle   = ssF.paintTriangleLL;
    }


    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function media_upcreate()
    {
        tr          = ssF.tr;
        tp          = ssF.tp;

        var studmod = studyMods[SUB_MODEL];
        createMedia0updateMediaAUX();
        if( ssF.mediaModelInitialized ) {
            studmod.medD8D && studmod.medD8D.updateAllDecPoints();
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
        var pictureLeft = rg.detected_user_interaction_effect_DONE;
        //-------------------------------------------------
        // //\\ colors
        //-------------------------------------------------
        var wwfc        = ns.haz( ssD, 'fixed-colors' );
        var arr2rgba    = ns.arr2rgba;
        var givenColor  = ssD.givenColor = arr2rgba( wwfc[ "given" ] ) || 'rgba(0,0,0,1)';
        var experColor  = ssD.experColor = arr2rgba( wwfc[ "experimental" ] ) || 'rgba(0,0,255,1)';
        var approxColor = ssD.approxColor = arr2rgba( wwfc[ "approximator" ] ) || 'rgba(255,0,0,1)';
        //-------------------------------------------------
        // \\// colors
        //-------------------------------------------------



        //-------------------------------------------------
        // //\\ paints axis x only once
        //-------------------------------------------------
        if( pictureLeft && !rg.abscissa ) {
            ( function () {
                var mod2med = ssF.modpos2medposLL;
                tr( "abscissa" );
                rg.abscissa.svgel = sv.polyline({
                    svgel   : rg.abscissa.svgel,
                    stroke  : 'black',                    
                    parent  : studyMods[ SUB_MODEL ].mmedia,
                    pivots  : [ mod2med([-1,0]), mod2med([5,0]) ],
                    'stroke-width' : 1,
                });
            })();
        }
        //-------------------------------------------------
        // \\// paints axis x only once
        //-------------------------------------------------



        //-------------------------------------------------
        // //\\ paints original experimental-curve
        //-------------------------------------------------
        drawCurveFromDividedDifferences = ( function() {
            var dd = rg.experimental.dividedDifferences.calculate_polynomial;
            var mod2med = ssF.modpos2medposLL;
            return function( x ) {
                 return mod2med([ x, dd(x) ]); };
        })();
        rg.experimental.svg = ns.svg.curve({
            stepsCount:30,
            start:-0.2,
            step:0.2,
            curve : drawCurveFromDividedDifferences,
            stroke : givenColor,
            "stroke-width" : 2,
            svgel : rg.experimental.svg,
            dontClose : true,
            parent : studyMods[ SUB_MODEL ].mmedia
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
            var mod2med = ssF.modpos2medposLL;
            return function( x ) { return mod2med([ x, dd(x) ]); };
        })();
        rg.approximator_curve.svg = ns.svg.curve({
            stepsCount:30,
            start:-0.2,
            step:0.2,
            curve : drawCurveFromDividedDifferences_A,
            stroke : approxColor,
            "stroke-width" : 2,
            svgel : rg.approximator_curve.svg,
            dontClose : true,
            parent : studyMods[ SUB_MODEL ].mmedia
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
            var handleR = 8;
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
                    tpclass         : ptype,
                    cssClass        : 'tofill tostroke thickable',
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
                    parent : studyMods[ SUB_MODEL ].mmedia,
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
                    tpclass         : ptype,
                    cssClass        : 'tofill tostroke thickable',
                    'stroke'        : pcolor,
                    'fill'          : pcolor,
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
                    parent : studyMods[ SUB_MODEL ].mmedia,
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
                    studyMods[ SUB_MODEL ].model8media_upcreate();
                }
                ///for slider
                pointWrap.pos2value = function( newPos )
                {
                    var posX = newPos[ 0 ];
                    x.pos[0] = posX;
                    y.pos[0] = posX;
                    y.pos[1] = x.pname === 'S' ?
                        rg.approximator_curve.dividedDifferences.calculate_polynomial( posX ) :
                        rg.experimental.dividedDifferences.calculate_polynomial( posX );
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



        //if( !ns.h( rg.a, 'model8media_upcreate' ) ) {
            ////if slider is not already created ...
            //todm make svg-scale slider: createSliderPlaceholder_a();
        //}
        //if( !ns.h( rg.media_scale, 'model8media_upcreate' ) ) {
        if( !ns.h( rg, 'slider-m' ) ) { //todo 'm' is wrong ... do a real flag
            ////if slider is not already created ...
            ssF.createSliderPlaceholder_m();
            //todm make svg-scale slider: createSliderPlaceholder_a();
            if( sconf.enableTools ) {
                tr( 'media_scale', 'value', 1 );
                tr( 'thickness', 'value', 2 );
                ssF.createSliderPlaceholder_media_scale();
                ssF.createSliderPlaceholder_thickness();
            }
        }


        ///fixes slider pointer detectibility upon mode
        if( sconf.enableTools ) {
            rg.media_scale.hideD8Dpoint = rgtools.value === 'on' ? false : true;
            rg.thickness.hideD8Dpoint = rgtools.value === 'on' ? false : true;
        }
    }
    //=========================================================
    // \\// updater helper
    //=========================================================



    ///shortcut to build medpos property
    function pn2mp( ptname ) {
        var pt = rg[ ptname ];
        pt.medpos = ssF.modpos2medposLL( pt.pos );
    }

}) ();


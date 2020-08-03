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
    var handleR = 5;
    return;












    function setModule()
    {
        sn(SUB_MODEL, studyMods).media_upcreate = media_upcreate;
        modpos2medpos   = ssF.modpos2medposLL;
        pointies2line   = ssF.pointies2lineLL;
        pos2pointy      = ssF.pos2pointyLL;
    }


    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function media_upcreate()
    {
        var studmod = studyMods[ SUB_MODEL ];
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
        var givenColor  = sDomF.getFixedColor( "given" );
        var proofColor  = sDomF.getFixedColor( "proof" );



        //-------------------------------------------------
        // //\\ adds to points their media position
        //      and sets point's color
        //-------------------------------------------------
        Object.keys( sconf.pname2point ).forEach( pname => {
            var pWrap = rg[ pname ].pointWrap;
            pWrap.pcolor = sDomF.getFixedColor( pWrap.ptype );
            pWrap.doPaintPname = true;
            var svg = pos2pointy(
                pname,
                {
                    cssClass        : 'tostroke tofill thickable',
                    'stroke-width'  : 2,
                    r               : handleR,
                }
            );
            pWrap.medpos = rg[ pname ].medpos;
            rg[ pname ].svgel.style.display =
                ns.haz( rg[pname], 'undisplay' ) ? 'none' : 'block';
        });
        //-------------------------------------------------
        // \\// adds to points their media position
        //-------------------------------------------------


        //-------------------------------------------------
        // //\\ paints original givenCurve-curve
        //-------------------------------------------------
        //stub for d8d
        ///converts model-function to media-function
        ///returns "inner function" and 
        ///keeps converter in "inner function" closure
        var givenCurveFunction = ( function() {
            //var dd = rg.givenCurveFunction.value;
            var mod2med = ssF.modpos2medposLL;
            return function( x ) {
                var [xx,yy ] = rg.repoConf.value[0].fun( x );
                var res = mod2med([ xx, yy]);
                return res;
            }
        })();
        rg.givenMediaCurve = ns.sn( 'curve-AB', rg );
        var wwsteps = 100;
        rg.givenMediaCurve.svg = ns.svg.curve({
            xOFy            : false, //true,
            stepsCount      : wwsteps,
            start           : 0,
            step            : rg.B.pointWrap.unrotatedParameterX / wwsteps,
            curve           : givenCurveFunction,
            stroke          : givenColor,
            "stroke-width"  : 2,
            svgel           : rg.givenMediaCurve.svg,
            dontClose       : true,
            parent          : studyMods[ SUB_MODEL ].mmedia,
        });
        $$.$(rg.givenMediaCurve.svg).addClass( 'tostroke thickable tp-curve-_a_b tp-both-curves' );

        rg.givenMediaCurveFull = ns.sn( 'curve-AB-full', rg )
        rg.givenMediaCurveFull.svg = ns.svg.curve({
            xOFy            : false, //true,
            stepsCount      : 85, // we don't extend it beyound this value
                                  // where book-picture approximation fails
            start           : 0,
            step            : 0.01,
            curve           : givenCurveFunction,
            stroke          : givenColor,
            "stroke-width"  : 2,
            svgel           : rg.givenMediaCurveFull.svg,
            dontClose       : true,
            parent          : studyMods[ SUB_MODEL ].mmedia,
        });
        $$.$(rg.givenMediaCurveFull.svg).addClass(
            'tostroke thickable tp-curve-_a_b-full tp-both-curves' );
        //-------------------------------------------------
        // \\// paints original givenCurve-curve
        //-------------------------------------------------


        //-------------------------------------------------
        // //\\ paints magnified curve
        //-------------------------------------------------
        var magnitude = rg.magnitude.value;
        var magnifiedCurveFunction = ( function() {
            var mod2med = ssF.modpos2medposLL;
            return function( x ) {
                var [xx,yy ] = rg.repoConf.value[0].fun( x );
                var res = mod2med([ xx*magnitude, yy*magnitude]);
                return res;
            }
        })();
        rg.magnifiedCurve = ns.sn( 'magnifiedCurve', rg )
        rg.magnifiedCurve.svgel = ns.svg.curve({
            xOFy            : false, //true,
            stepsCount      : 85, // we don't extend it beyound this value
                                  // where book-picture approximation fails
            start           : 0,
            step            : 0.01,
            curve           : magnifiedCurveFunction,
            stroke          : proofColor,
            "stroke-width"  : 2,
            svgel           : rg.magnifiedCurve.svgel,
            dontClose       : true,
            parent          : studyMods[ SUB_MODEL ].mmedia,
        });
        $$.$( rg.magnifiedCurve.svgel ).addClass( 'tostroke thickable tp-curve-_ab tp-both-curves' );
        rg[ 'magnifiedCurve' ].svgel.style.display =
            ns.haz( rg[ 'magnifiedCurve' ], 'undisplay' ) ? 'none' : 'block';
        //-------------------------------------------------
        // \\// paints magnified curve
        //-------------------------------------------------

        ssF.pointnames2line( 'A', 'd', 'tp-angle-_r_a_d' );
        ssF.pointnames2line( 'A', 'r', 'tp-angle-_r_a_d' );
        ssF.pointnames2line( 'A', 'L' );
        ssF.pointnames2line( 'A', 'b' );
        ssF.pointnames2line( 'r', 'd' );
        ssF.pointnames2line( 'A', 'B' );
        ssF.pointnames2line( 'A', 'D' );

        //:l7
        ssF.pointnames2line( 'b', 'd' );
        ssF.pointnames2line( 'B', 'D' );
        ssF.pointnames2line( 'B', 'F' );
        ssF.pointnames2line( 'A', 'F' );
        ssF.pointnames2line( 'A', 'G' );
        ssF.pointnames2line( 'B', 'E' );
        ssF.pointnames2line( 'A', 'E' );
        ssF.pointnames2line( 'B', 'G' );
        //-----------------------------------------------
        // ... angle-RAD .... abandoned after ver 3079
        //-----------------------------------------------


        //-----------------------------------------------
        // //\\ paints latin letters for points
        //-----------------------------------------------
        ns.eachprop( sconf.pname2point, ( point, pname ) => {
            var pWrap = rg[ pname ].pointWrap;

            //optional?: if( pWrap.doPaintPname && pictureLeft ) {
            if( pWrap.doPaintPname ) {
                var lpos = rg[ pname ].medpos.concat([]);
                switch( pname ) {
                    case 'b' : lpos = [ lpos[0]+20, lpos[1]+10 ];
                    break;

                    case 'L' : lpos = [ lpos[0]-29, lpos[1]-16 ];
                    break;

                    case 'B' : lpos = [ lpos[0]+14, lpos[1]-5 ];
                    break;

                    default: lpos = [ lpos[0]-29, lpos[1]+30 ];
                }

                pWrap.pnameLabelsvg = ns.svg.printText({
                    tpclass : '',
                    text : pname,
                    stroke : pWrap.pcolor,
                    fill : pWrap.pcolor,
                    "stroke-width" : 2,
                    svgel : pWrap.pnameLabelsvg,
                    parent : studyMods[ SUB_MODEL ].mmedia,
                    x : lpos[0],
                    y : lpos[1],
                    style : { 'font-size' : '32px' },
                });
                pWrap.pnameLabelsvg.style.display =
                    ns.haz( rg[pname], 'undisplay' ) ? 'none' : 'block';
            }

            ///adds fake points over draggable points to
            ///make white kernels drawn above lines
            ///todo put in amode-state
            if( pname === 'L' || pname === 'B' ) {
                var fakeName = pname+'-kernel';
                var wp = rg[pname].pos;
                ssF.toreg( fakeName )( 'pos', [ wp[0], wp[1] ]  );
                pos2pointy(
                    fakeName,
                    {
                        //cssClass        : 'tostroke thickable',
                        'stroke'        : pWrap.pcolor,
                        'fill'          : 'white',
                        'stroke-width'  : 2,
                        r               : handleR,
                    }
                );
                rg[ fakeName ].svgel.style.display =
                    ns.haz( rg[ pname ], 'undisplay' ) ? 'none' : 'block';
            }
        });
        //-----------------------------------------------
        // \\// paints latin letters for points
        //-----------------------------------------------


        //-------------------------------------------------
        // //\\ adds methods to single base point only once
        //-------------------------------------------------
        // //\\ dragger B
        //-------------------------------------------------
        //todo create once but access based on amode-state
        if( !ns.h( rg[ 'B' ].pointWrap, 'model8media_upcreate' )) {
            ( function() {
                var pointWrap = rg[ 'B' ].pointWrap;
                pointWrap.model8media_upcreate = function() {
                    studyMods[ SUB_MODEL ].model8media_upcreate();
                }
                pointWrap.pos2value = function( new_unrotatedParameterX )
                {
                    ///we need to put some constraint here, to
                    ///prevent chord vanishing
                    if( new_unrotatedParameterX < 0.001 ) {
                        new_unrotatedParameterX = 0.001;
                    }
                    //.prevents user from playing with too big curves
                    if( new_unrotatedParameterX > 0.80 ) return;
                    pointWrap.unrotatedParameterX = new_unrotatedParameterX;
                    pointWrap.model8media_upcreate();
                }
            }) ();
        }
        //-------------------------------------------------
        // \\// dragger B
        //-------------------------------------------------


        //-------------------------------------------------
        // //\\ dragger L
        //-------------------------------------------------
        if( !ns.h( rg[ 'L' ].pointWrap, 'model8media_upcreate' )) {
            ( function() {
                var pointWrap = rg[ 'L' ].pointWrap;
                pointWrap.model8media_upcreate = function() {
                    studyMods[ SUB_MODEL ].model8media_upcreate();
                }
                pointWrap.pos2value = function( newPos )
                {
                    var fullAngle = Math.atan( newPos[1]/newPos[0] );

                    ///restricts converging tangent positions,
                    ///saves user from unexpected experiments,
                    if( fullAngle > 0.001 ) {
                        fullAngle = 0;
                    }
                    if( fullAngle < -0.7 ) {
                        fullAngle = -0.7;
                    }
                    rg.curveRotationAngle.angle = fullAngle - rg.originalGapTangent.angle;
                    pointWrap.model8media_upcreate();
                }
            }) ();
        }
        //-------------------------------------------------
        // \\// dragger L
        //-------------------------------------------------
        // \\// adds methods to single base point only once
        //-------------------------------------------------
        // \\// draws vertical lines and points
        //-----------------------------------------------



        ///creates tools for the first time and only once
        if( !ssF.mediaModelInitialized ) {
            ////if sliders are not yet created ...
            if( sconf.enableTools ) {
                ssF.toreg( 'media_scale' )( 'value', 1 );
                ssF.toreg( 'thickness' )( 'value', 2 );
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

}) ();


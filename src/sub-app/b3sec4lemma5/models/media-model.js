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
    var tr          = ssF.tr;
    var tp          = ssF.tp;
    var rg          = sn('registry',ssD);

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
        var studmod = studyMods[SUB_MODEL];
        createMedia0updateMediaAUX();
        if( ssF.mediaModelInitialized ) {
            studmod.medD8D && studmod.medD8D.updateAllDecPoints();
        }
        ssF.mediaModelInitialized = true;
    }


    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function createMedia0updateMediaAUX()
    {
        ///===================================================
        /// study-pars
        ///===================================================
        //var P = rg.P.pos;

        var wwfc            = ns.haz( ssD, 'fixed-colors' );
        function arr2rgba( arr ) {
            if( !arr ) return null;
            var r=Math.floor( arr[0] );
            var g=Math.floor( arr[1] );
            var b=Math.floor( arr[2] );
            var op= arr[3].toFixed(4);
            return 'rgba('+r+','+g+','+b+','+op+')';
        }

        ellipseColor        = arr2rgba( wwfc[ "ellipse" ] ) || 'rgba(0,100,0,1)';
        balanceParColor = arr2rgba( wwfc[ "balance-parameters" ] ) || '#ff0000';
        var GParamColor     = arr2rgba( wwfc[ "g-parameter" ] ) || '#ff0000';
        var gammaColor      = arr2rgba( wwfc[ "gamma" ] ) || '#ff0000';

        var RTColor         = arr2rgba( wwfc[ "RT" ] ) || '#ff0000';
        var basePointColor  =                           '#0000aa'; 
        var baseColor       = arr2rgba( wwfc[ "base-figure" ] )  || '#0000dd'; 
        var statGenColor    = arr2rgba( wwfc[ "static-generator" ] ) || '#eeaa00';
        var generatingColor = arr2rgba( wwfc[ "generators" ] ) || '#00aaee'; 
        var givenParallels  = arr2rgba( wwfc[ "given-paralellogram" ] ) || '#ff00ff';
        var lwidth          = sconf.defaultLineWidth;


        ///-------------------------------------------------
        ///makes conic first to put point over it later
        ///-------------------------------------------------
        var calculateConicPoint_algo = studyMods[SUB_MODEL].calculateConicPoint_algo;
        var curve = tr( 'curve' );
        (function () {
            var stepsCount = 400;
            //var start_g = - 1.5;
            //var end_g = 1.5;
            var start_g = - 5;
            var end_g = 5;
            var range_g = end_g - start_g;
            var step = range_g / stepsCount;
            curve.svgel = sv.curve({
                svgel:curve.svgel,
                stepsCount,
                start:start_g,
                step,
                curve:function( g ) {
                    var { D, G, AA } = calculateConicPoint_algo( g );
                    var med = ssF.modpos2medposLL( D );
                    return { x:med[0], y:med[1] };
                },
                parent : studyMods[ SUB_MODEL ].mmedia,
                'stroke-width':1,
                stroke  : ellipseColor,
                dontClose : true,
            });
            $$.$(curve.svgel).cls( 'tp-ellipse tostroke' );
        })();

        //-------------------------------------------------
        // //\\ adds to points their media position
        //-------------------------------------------------

        /*
        ///-------------------------------------------------
        ///builds center point first to be used in ellipse
        ///-------------------------------------------------
        pos2pointy(
            'O',
            {
                cssClass : 'tofill tostroke',
                'fill' : baseColor,
                tpclass : 'base-figure',
                r : 6,
            }
        );
        */

        pn2mp( 'O' );
        pn2mp( 'G' );
        pn2mp( 'D' );
        pn2mp( 'A' );
        pn2mp( 'AA' );
        pn2mp( 'B' );
        pn2mp( 'N' );
        pn2mp( 'H' );
        //-------------------------------------------------
        // \\// adds to points their media position
        //-------------------------------------------------


        //-------------------------------------------------
        // //\\ base sides
        //-------------------------------------------------
        pointies2line(
            'BHM-B',
            [ rg.B, rg.H ],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : gammaColor,
                tpclass : 'gamma',
            }
        );
        pointies2line(
            'BHM-M',
            [ rg.G, rg.H ],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : gammaColor,
                tpclass : 'gamma',
            }
        );
        pointies2line(
            'NG',
            [ rg.N, rg.G ],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : GParamColor,
                tpclass : 'g-parameter',
            }
        );
        pointies2line(
            'CH',
            [ rg.A, rg.H ],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : balanceParColor,
                tpclass : 'balance-parameters',
            }
        );
        pointies2line(
            'BA',
            [ rg.B, rg.A ],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : baseColor,
                tpclass : 'base-figure',
            }
        );
        pointies2line(
            'BD',
            [ rg.B, rg.D ],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : generatingColor,
                tpclass : 'generators',
            }
        );
        pointies2line(
            'AD',
            [ rg.A, rg.D],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : generatingColor,
                tpclass : 'generators',
            }
        );
        pointies2line(
            'AAA',
            [ rg.A, rg.AA],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : baseColor,
                tpclass : 'base-figure',
            }
        );
        pointies2line(
            'BAA',
            [ rg.B, rg.AA],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : baseColor,
                tpclass : 'base-figure',
            }
        );
        //-------------------------------------------------
        // \\// base sides
        //-------------------------------------------------



        //-------------------------------------------------
        // //\\ given static angles alpha, beta
        //-------------------------------------------------
        pointies2line(
            'AAABangleA',
            [ rg.A, rg.AA],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : baseColor,
                tpclass : 'angle-alpha',
            }
        );
        pointies2line(
            'AAABangleB',
            [ rg.A, rg.B],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : baseColor,
                tpclass : 'angle-alpha',
            }
        );

        //---------------------------------------
        // //\\ angles alpha and beta
        //---------------------------------------
        var ANGLE_SIZE = 0.1;
        var B_AA = mat.p1_to_p2(rg.B.pos, rg.AA.pos );
        rg.beta.angleSvg = sv.ellipseSector({
            stepsCount : 20,
            // //\\ todm ... mod2med_scale must be incapsulated in model
            //instead we are converting from model to media manually here 
            //it is very annoying to always remember to
            //make a correction with MONITOR_Y_FLIP ...
            //todm ... do a better programming
            x0 : rg.B.medpos[0],
            y0 : rg.B.medpos[1],
            a  : sconf.mod2med_scale*ANGLE_SIZE*0.5,
            b  : sconf.mod2med_scale*ANGLE_SIZE*0.5,
            t0 : Math.PI-rg.beta.value*sconf.MONITOR_Y_FLIP,
            // \\// todm ... mod2med_scale must be incapsulated in model

            t1 : Math.PI,
            svgel : rg.beta.angleSvg,
            parent : studyMods[ SUB_MODEL ].mmedia,
            //fill : 'rgba( 255, 0, 0, 0.1 )',
            fill : 'transparent',
            'stroke-width':1,
            //a, b, t0, t1
        });
        $$.$(rg.beta.angleSvg).cls( 'tp-angle-beta tostroke' );

        var A_AA = mat.p1_to_p2(rg.A.pos, rg.AA.pos );
        rg.alpha.angleSvg = sv.ellipseSector({
            stepsCount : 20,
            x0 : rg.A.medpos[0],
            y0 : rg.A.medpos[1],
            a  : sconf.mod2med_scale*ANGLE_SIZE*0.5,
            b  : sconf.mod2med_scale*ANGLE_SIZE*0.5,
            t0 : 0,
            t1 : rg.alpha.value*sconf.MONITOR_Y_FLIP,
            svgel : rg.alpha.angleSvg,
            parent : studyMods[ SUB_MODEL ].mmedia,
            fill : 'transparent',
            'stroke-width':1,
        });
        $$.$(rg.alpha.angleSvg).cls( 'tp-angle-alpha tostroke' );

        // //\\ applied angles
        // //\\ applied alpha
        var AG = mat.p1_to_p2(rg.A.pos, rg.G.pos );
        var cosAlphaS = AG.unitVec[0];
        var alphaS = Math.acos( cosAlphaS ) * ( AG.unitVec[1] < 0 ? -1 : 1 );
        rg.alpha.appliedAngleSvg = sv.ellipseSector({
            stepsCount : 20,
            x0 : rg.A.medpos[0],
            y0 : rg.A.medpos[1],
            //a  : sconf.mod2med_scale*AG.abs*0.3,
            //b  : sconf.mod2med_scale*AG.abs*0.3,
            a  : sconf.mod2med_scale*ANGLE_SIZE,
            b  : sconf.mod2med_scale*ANGLE_SIZE,
            t0 : alphaS*sconf.MONITOR_Y_FLIP,
            t1 : (alphaS + rg.alpha.value) * sconf.MONITOR_Y_FLIP,
            svgel : rg.alpha.appliedAngleSvg,
            parent : studyMods[ SUB_MODEL ].mmedia,
            fill : 'rgba( 155, 155, 0, 0.3 )',
            stroke: 'transparent',
            'stroke-width':1,
        });
        $$.$(rg.alpha.appliedAngleSvg).cls( 'tp-angle-alpha tofill' );
        // \\// applied alpha
        // //\\ applied beta
        var BG = mat.p1_to_p2(rg.B.pos, rg.G.pos );
        var cosBetaS = BG.unitVec[0];
        var betaS = Math.acos( cosBetaS ) * ( BG.unitVec[1] < 0 ? -1 : 1 );
        rg.beta.appliedAngleSvg = sv.ellipseSector({
            stepsCount : 20,
            x0 : rg.B.medpos[0],
            y0 : rg.B.medpos[1],
            a  : sconf.mod2med_scale*ANGLE_SIZE,
            b  : sconf.mod2med_scale*ANGLE_SIZE,
            t0 : betaS*sconf.MONITOR_Y_FLIP,
            t1 : (betaS - rg.beta.value) * sconf.MONITOR_Y_FLIP,
            svgel : rg.beta.appliedAngleSvg,
            parent : studyMods[ SUB_MODEL ].mmedia,
            fill : 'rgba( 155, 155, 0, 0.3 )',
            stroke: 'transparent',
            'stroke-width':1,
        });
        $$.$(rg.beta.appliedAngleSvg).cls( 'tp-angle-beta tofill' );
        // \\// applied alpha
        // \\// applied angles
        //---------------------------------------
        // \\// angles alpha and beta
        //---------------------------------------


        pointies2line(
            'AABAangleAA',
            [ rg.AA, rg.B],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : baseColor,
                tpclass : 'angle-beta',
            }
        );
        pointies2line(
            'AABAangleA',
            [ rg.A, rg.B],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : baseColor,
                tpclass : 'angle-beta',
            }
        );

        pointies2line(
            'BA',
            [ rg.A, rg.B],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : baseColor,
                tpclass : 'CB',
            }
        );
        //-------------------------------------------------
        // \\// given static angles alpha, beta
        //-------------------------------------------------




        //-----------------------------------------------
        // //\\ decorates draggers
        //-----------------------------------------------
        pointies2line(
            'GB',
            [ rg.G, rg.B],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : baseColor,
                tpclass : 'generators',
            }
        );
        pointies2line(
            'GA',
            [ rg.G, rg.A],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : baseColor,
                tpclass : 'generators',
            }
        );
        pos2pointy(
            'D',
            { 
                cssClass        : 'tofill tostroke',
                'stroke'        : generatingColor,

                //not yet ready for drag: 'fill'          : 'white',
                'fill'          : generatingColor,

                'stroke-width'  : 2,
                r               : 7,
                //tpclass         : 'generators',
            }
        );
        //-----------------------------------------------
        // \\// decorates draggers
        //-----------------------------------------------


        //-------------------------------------------------
        // //\\ makes points
        //      after lines to put points higher in z-order
        //-------------------------------------------------
        pos2pointy(
            'A',
            { 
                tpclass         : 'base-figure',
                cssClass        : 'tofill tostroke',
                'stroke'        : basePointColor,
                'fill'          : basePointColor,
                'stroke-width'  : 2,
                r               : 4,
            }
        );

        pos2pointy(
            'B',
            { 
                tpclass         : 'base-figure',
                cssClass        : 'tofill tostroke',
                'stroke'        : basePointColor,
                'fill'          : basePointColor,
                'stroke-width'  : 2,
                r               : 4,
            }
        );

        pos2pointy(
            'AA',
            { 
                tpclass         : 'base-figure',
                cssClass        : 'tofill tostroke aa-point',
                stroke          : GParamColor,
                'fill'          : 'white',
                'stroke-width'  : 2,
                r               : 6,
            }
        );


        pos2pointy(
            'G',
            {
                cssClass        : 'tofill tostroke',
                stroke          : GParamColor,
                'fill'          : 'white',
                'stroke-width'  : 2,
                r               : 6,
            }
        );
        pos2pointy(
            'N',
            { 
                cssClass        : 'tofill tostroke',
                stroke  : basePointColor,
                //'fill'          : 'white',
                'stroke-width'  : 2,
                r               : 4,
            }
        );
        pos2pointy(
            'H',
            {
                cssClass        : 'tofill tostroke h-point',
                stroke          : GParamColor,
                'fill'          : 'white',
                'stroke-width'  : 2,
                r               : 7,
            }
        );
        //-------------------------------------------------
        // \\// makes points
        //-------------------------------------------------





        //-----------------------------------------------
        // //\\ adds methods to rg.G only once
        //-----------------------------------------------
        ///attaches updater right to the point G to ease
        ///this function lookup right from dragger-of-G
        if( !ns.h( rg.G, 'model8media_upcreate' )) {
            ////cannot use this function till this subroutine is not
            ////ran ... and till init is done;
            ////used in drag ... so drag must wait:
            ////this is OK because drag8drop sliders created after
            ////model8media_upcreate;
            rg.G.model8media_upcreate = function() {
                studyMods[ SUB_MODEL ].model8media_upcreate();
            }

            ///for slider
            rg.G.pos2value = function( newPos )
            {
                var G = rg.G;
                var newValue = G.pos2Gpar( newPos )
                //protects drag from going outside the window
                if( newValue < -6.5 || newValue > 2.5 ) return;
                rg.g.value = newValue;
                G.model8media_upcreate();
            }

            rg.G.pos2Gpar = function( pos )
            {
                var H=rg.H.pos;
                var gamma = rg.gamma.value;
                var dd = [ pos[0]-H[0], pos[1]-H[1] ];
                //projects shift to direction of unit vector "gamma":
                var g = -dd[0]*Math.cos(gamma) - dd[1]*Math.sin(gamma);
                return g;
            }
        }
        //-----------------------------------------------
        // \\// adds methods to rg.G only once
        //-----------------------------------------------

        //-----------------------------------------------
        // //\\ adds methods to rg.A only once
        //-----------------------------------------------
        ///attaches updater right to the point G to ease
        ///this function lookup right from dragger-of-G
        if( !ns.h( rg.AA, 'model8media_upcreate' )) {
            rg.AA.model8media_upcreate = function() {
                studyMods[ SUB_MODEL ].model8media_upcreate();
            }

            ///for slider
            rg.AA.pos2value = function( newPos )
            {
                var AA = rg.AA;
                var { alpha, beta } = AA.pos2alpha8beta( newPos )
                rg.alpha.value = alpha;
                rg.beta.value = beta;
                AA.model8media_upcreate();
            }

            rg.AA.pos2alpha8beta = function( pos )
            {
                var BA = mat.p1_to_p2( rg.B.pos, pos );
                var cosBeta = -BA.unitVec[0];
                var beta = Math.acos( cosBeta ) * ( BA.unitVec[1] < 0 ? -1 : 1 );

                var A_AA = mat.p1_to_p2( rg.A.pos, pos );
                var cosAlpha = A_AA.unitVec[0];
                var alpha = Math.acos( cosAlpha ) * ( A_AA.unitVec[1] < 0 ? -1 : 1 );
                return { alpha, beta };
            }
        }
        //-----------------------------------------------
        // \\// adds methods to rg.A only once
        //-----------------------------------------------

        //-----------------------------------------------
        // //\\ adds methods to rg.H only once
        //-----------------------------------------------
        ///attaches updater right to the point G to ease
        ///this function lookup right from dragger-of-G
        if( !ns.h( rg.H, 'model8media_upcreate' )) {
            rg.H.model8media_upcreate = function() {
                studyMods[ SUB_MODEL ].model8media_upcreate();
            }
            ///for slider
            rg.H.pos2value = function( newPos )
            {
                var H = rg.H;
                rg.a.value = newPos[0] - rg.A.pos[0];
                H.model8media_upcreate();
            }
        }
        //-----------------------------------------------
        // \\// adds methods to rg.H only once
        //-----------------------------------------------


        //if( !ns.h( rg.a, 'model8media_upcreate' ) ) {
            ////if slider is not already created ...
            //todm make svg-scale slider: createSliderPlaceholder_a();
        //}
        //if( !ns.h( rg.media_scale, 'model8media_upcreate' ) ) {
        if( !ns.h( rg, 'media_scale' ) ) {
            tr( 'media_scale', 'value', 1 );
            tr( 'thickness', 'value', 2 );
            ////if slider is not already created ...
            //todm make svg-scale slider: createSliderPlaceholder_a();
            ssF.createSliderPlaceholder_media_scale();
            ssF.createSliderPlaceholder_thickness();
        }

    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================



    ///shortcut to build medpos property
    function pn2mp( ptname ) {
        var pt = rg[ ptname ];
        pt.medpos = ssF.modpos2medposLL( pt.pos );
    }

}) ();


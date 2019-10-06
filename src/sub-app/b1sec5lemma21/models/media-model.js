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

        ///-------------------------------------------------
        ///makes ellipse first to put point over it later
        ///-------------------------------------------------
        var calculateConicPoint = studyMods[SUB_MODEL].calculateConicPoint;
        var curve = tr( 'curve' );
        (function () {
            var stepsCount = 200;
            var start_g = - 1.5;
            var end_g = 1.5;
            var range_g = end_g - start_g;
            var step = range_g / stepsCount;
            curve.svgel = sv.curve({
                svgel:curve.svgel,
                stepsCount,
                start:start_g,
                step,
                curve:function( g ) {
                    var { D, G, AA } = calculateConicPoint( g );
                    var med = ssF.modpos2medposLL( D );
                    return { x:med[0], y:med[1] };
                },
                parent : studyMods[ SUB_MODEL ].mmedia,
                'stroke-width':1,
                stroke  : ellipseColor,
            });
            $$.$(curve.svgel).cls( 'tp-ellipse tostroke' );
        })();

        //-------------------------------------------------
        // //\\ adds to points their media position
        //-------------------------------------------------
        pn2mp( 'G' );
        pn2mp( 'D' );
        pn2mp( 'A' );
        pn2mp( 'AA' );
        pn2mp( 'B' );
        pn2mp( 'N' );
        //-------------------------------------------------
        // \\// adds to points their media position
        //-------------------------------------------------


        //-------------------------------------------------
        // //\\ base sides
        //-------------------------------------------------
        pointies2line(
            'BOM-B',
            [ rg.B, rg.O],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : gammaColor,
                tpclass : 'gamma',
            }
        );
        pointies2line(
            'BOM-M',
            [ rg.G, rg.O],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : gammaColor,
                tpclass : 'gamma',
            }
        );
        pointies2line(
            'OG',
            [ rg.O, rg.G],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : GParamColor,
                tpclass : 'g-parameter',
            }
        );
        pointies2line(
            'CO',
            [ rg.A, rg.O],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : balanceParColor,
                tpclass : 'balance-parameters',
            }
        );
        pointies2line(
            'BA',
            [ rg.B, rg.A],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : baseColor,
                tpclass : 'base-figure',
            }
        );
        pointies2line(
            'BD',
            [ rg.B, rg.D],
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
                cssClass        : 'tofill tostroke',
                'stroke'        : basePointColor,
                'fill'          : basePointColor,
                'stroke-width'  : 2,
                r               : 4,
            }
        );


        pos2pointy(
            'G',
            { 
                cssClass        : 'tofill tostroke',
                stroke  : GParamColor,
                'fill'          : 'white',
                'stroke-width'  : 2,
                r               : 7,
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
                G.pos[0] = newPos[0];
                G.pos[1] = newPos[1];
                G.model8media_upcreate();
            }

            //does project (pos-P) on Pt:
            rg.G.pos2Gpar = function( pos )
            {
                var O=rg.O.pos;
                var Opos = mat.p1_to_p2( O, pos );
                var g = Opos.abs * ( Opos.unitVec[1] > 0 ? -1 : 1 ) ; 
                return g;
            }
        }
        //-----------------------------------------------
        // \\// adds methods to rg.G only once
        //-----------------------------------------------


        if( !ns.h( rg.a, 'model8media_upcreate' ) ) {
            ////if slider is not already created ...
            createSliderPlaceholder_a();
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


    //----------------------------------------
    // //\\ param a slider
    //      creates slider only once per
    //      app model creation;
    //----------------------------------------
    function createSliderPlaceholder_a()
    {
        var neutral_a         = 1; //neutral value of a is for circle
        var max_a             = 0.999;
        var min_a             = 0.0001;
        var range_a           = max_a - min_a;

        var startX            = ( -sconf.centerOnPicture_X + sconf.innerMediaWidth*0.1 ) *
                                sconf.med2mod_scale;
        var endX              = startX + sconf.innerMediaWidth*sconf.med2mod_scale*0.8;
        var startY            = ( sconf.centerOnPicture_Y - sconf.innerMediaHeight*0.9 ) *
                                sconf.med2mod_scale;
        var railsLength       = endX - startX;

        var startPos          = [ startX, startY ];
        var endPos            = [ endX, startY ];

        // //\\ slider object
        //sets registry
        tp( 'sliderStart', startPos );
        tp( 'sliderEnd', endPos );

        var sliderStart = pos2pointy( 'sliderStart',
                          { fill : '#9999dd', tpclass:'balance-parameters', cssClass : 'tofill tostroke', } );
        var sliderEnd = pos2pointy( 'sliderEnd',
                          { fill : '#9999dd', tpclass:'balance-parameters', cssClass : 'tofill tostroke', } );
        ///draws rails
        var slider = pointies2line(
             'slider-a',
             [sliderStart, sliderEnd],
             {stroke:'#9999dd', 'stroke-width':3, tpclass:'balance-parameters', cssClass : 'tofill tostroke', }
        );
        $$.$(slider.svgel).cls( 'tp-balance-parameters' );
        // \\// slider object

        var a           = rg.a;
        var handleXpos  = ( a.value - min_a ) / range_a * railsLength + startX;
        a.pos           = [ handleXpos, startY ];
        a.startX        = startX;
        a.endX          = endX;
        a.railsLength   = railsLength;
        pos2pointy(
            'a',
            {
                cssClass : 'tostroke',
                stroke : balanceParColor,
                'stroke-width' : 3,
                fill : 'white',
                r : 8,
                tpclass : 'balance-parameters',
            }
        );

        a.text_svg = sv.printText({
            parent : studyMods[ SUB_MODEL ].mmedia,
            text :'c',
            //x : rg.a.medpos[0]-11,
            //y : rg.a.medpos[1]+11,
           'stroke-width' : 3,
            style : { 'font-size' : '30px' },
            stroke  : balanceParColor,
        });

        rg.a.model8media_upcreate = function() {
            studyMods[ SUB_MODEL ].model8media_upcreate();
        }

        ///for slider
        a.pos2value = function( newPos, dontUpdateModel )
        {
            var newValue = ( max_a - min_a ) * ( newPos[0] - startX ) / railsLength + min_a;
            if( newValue < min_a || newValue > max_a ) return;

            // //\\ todm: fullLength patch,
            //            to fit CB in window
            var fullLength = 1;
            //var lim = Math.max( newValue-0.45, 0.42 - newValue );
            //sconf.mod2med_scale = sconf.mod2med_scale_initial;
            //sconf.med2mod_scale = 1/sconf.mod2med_scale;
            //if( lim > 0 ) {
            //    var fullLength = 1 - lim*1.4;
                //not the best way: too many changes:
                //sconf.mod2med_scale = sconf.mod2med_scale_initial * (1 - lim*1.4);
                //sconf.med2mod_scale = 1/sconf.mod2med_scale;
            //}
            a.value = newValue * fullLength;
            rg.b.value = fullLength-a.value;
            // \\// todm: fullLength patch

            a.pos[0] = newPos[0];
            a.pos[1] = newPos[1];
            updateSliderHandlePos();
            if( !dontUpdateModel ) {
                a.model8media_upcreate();
            }
            return true;
        }

        function updateSliderHandlePos()
        {
            //var sliderXpos = (a.value - min_a ) / range_a * railsLength + startX;
            //a.pos[0] = sliderXpos;
            a.medpos = modpos2medpos( a.pos );
            sv.u({
                svgel   : a.svgel,
                parent  : studyMods[ SUB_MODEL ].mmedia,
                cx : a.medpos[0],
                cy : a.medpos[1],
            });
            a.text_svg.setAttributeNS( null, 'x', a.medpos[0]-8 );
            a.text_svg.setAttributeNS( null, 'y', a.medpos[1]+40 );
        };
        updateSliderHandlePos();
    }
    //----------------------------------------
    // \\// param a slider
    //----------------------------------------


}) ();


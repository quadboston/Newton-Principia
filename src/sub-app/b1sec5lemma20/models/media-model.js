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
        var P = rg.P.pos;

        var wwfc            = ns.haz( ssD, 'fixed-colors' );
        function arr2rgba( arr ) {
            if( !arr ) return null;
            var r=Math.floor( arr[0] );
            var g=Math.floor( arr[1] );
            var b=Math.floor( arr[2] );
            var op= arr[3].toFixed(4);
            return 'rgba('+r+','+g+','+b+','+op+')';
        }

        var keyColor        = arr2rgba( wwfc[ "key-triangle" ] ) || '#ff0000';
        var RTColor         = arr2rgba( wwfc[ "RT" ] ) || '#ff0000';
        var basePointColor  =                           '#0000aa'; 
        var baseColor       = arr2rgba( wwfc[ "base-figure" ] )  || '#0000dd'; 
        var statGenColor    = arr2rgba( wwfc[ "static-generator" ] ) || '#eeaa00';
        var ellipseColor    = arr2rgba( wwfc[ "ellipse" ] ) || 'rgba(0,100,0,1)';
        var generatingColor = arr2rgba( wwfc[ "generators" ] ) || '#00aaee'; 
        var givenParallels  = arr2rgba( wwfc[ "given-paralellogram" ] ) || '#ff00ff';
        var lwidth          = sconf.defaultLineWidth;

        ///-------------------------------------------------
        ///builds center point first to be used in ellipse
        ///-------------------------------------------------
        pos2pointy(
            'O',
            {
                cssClass: 'tofill tostroke',
                'fill' : baseColor,
                tpclass : 'base-figure',
                r : 6,
            }
        );

        ///-------------------------------------------------
        ///makes ellipse first to put point over it later
        ///-------------------------------------------------
        var ellipse = tr( 'ellipse' );
        ellipse.svgel = sv.ellipse({
            stepsCount      : 100,
            a               : rg.a.value*sconf.mod2med_scale,
            b               : rg.b.value*sconf.mod2med_scale,
            x0              : rg.O.medpos[0],
            y0              : rg.O.medpos[1],
            rotationRads    : Math.PI*0.180,
            svgel           : ellipse.svgel,
            parent          : studyMods[ SUB_MODEL ].mmedia,

            'stroke-width':5,
            stroke  : ellipseColor,
        });
        $$.$(ellipse.svgel).cls( 'tp-ellipse tostroke' );



        //-------------------------------------------------
        // //\\ adds to points their media position
        //-------------------------------------------------
        pn2mp( 'P' );
        pn2mp( 'T' );
        pn2mp( 'D' );
        pn2mp( 'A' );
        pn2mp( 'B' );
        pn2mp( 'C' );
        pn2mp( 'S' );
        pn2mp( 'Q' );
        pn2mp( 't' );
        pn2mp( 'r' );
        pn2mp( 'R' );
        //-------------------------------------------------
        // \\// adds to points their media position
        //-------------------------------------------------


        //-------------------------------------------------
        // //\\ base sides
        //-------------------------------------------------
        pointies2line(
            'PB',
            [ rg.P, rg.B],
            {
                cssClass:'tostroke',
                'stroke-width' : lwidth,
                stroke  : baseColor,
                tpclass : 'base-figure',
            }
        );
        pointies2line(
            'PC',
            [ rg.P, rg.C],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : baseColor,
                tpclass : 'base-figure',
            }
        );
        pointies2line(
            'CA',
            [ rg.C, rg.A],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : baseColor,
                tpclass : 'base-figure',
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
            'BC',
            [ rg.B, rg.C],
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




        //-------------------------
        // //\\ given paralellogram
        //-------------------------
        pointies2line(
            'rQ',
            [ rg.r, rg.Q],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : givenParallels,
                tpclass : 'given-paralellogram',
            }
        );
        pointies2line(
            'SP',
            [ rg.S, rg.P],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : givenParallels,
                tpclass : 'given-paralellogram',
            }
        );
        //-------------------------
        // \\// given paralellogram
        //-------------------------


        //------------------------
        // //\\ linear-generators
        //------------------------
        pointies2line(
            'BT',
            [ rg.B, rg.T],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : generatingColor,
                tpclass : 'generators',
            }
        );
        pointies2line(
            'CR',
            [ rg.C, rg.R],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : generatingColor,
                tpclass : 'generators',
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
            'CD',
            [ rg.C, rg.D],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : generatingColor,
                tpclass : 'generators',
            }
        );

        pointies2line(
            'Bt',
            [ rg.B, rg.t],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : ellipseColor,
                tpclass : 'tangent',
            }
        );
        //------------------------
        // \\// linear-generators
        //------------------------




        //------------------------
        // //\\ static triangle
        //------------------------
        pointies2line(
            'rt',
            [ rg.r, rg.t],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : statGenColor,
                tpclass : 'static-generator',
            }
        );
        pointies2line(
            'Pr',
            [ rg.P, rg.r],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : statGenColor,
                tpclass : 'static-generator',
            }
        );
        pointies2line(
            'Pt',
            [ rg.P, rg.t],
            {
                cssClass:'tostroke',
                'stroke-width':lwidth,
                stroke  : statGenColor,
                tpclass : 'static-generator',
            }
        );
        //------------------------
        // \\// static triangle
        //------------------------

        //------------------------
        // //\\ key triangle
        //------------------------
        pointies2line(
            'PR',
            [ rg.P, rg.R],
            {
                cssClass:'tostroke',
                'stroke-width':7,
                tpclass : 'key-triangle',
            }
        );
        pointies2line(
            'PT',
            [ rg.P, rg.T],
            {
                cssClass:'tostroke',
                'stroke-width':7,
                tpclass : 'key-triangle',
            }
        );
        pointies2line(
            'RT',
            [ rg.R, rg.T],
            {
                cssClass:'tostroke',
                'stroke-width':4,
                tpclass : 'key-triangle',
            }
        );
        rg.P.svgel = null; //changes "z-order"
        var pointS = pos2pointy(
            'P',
              { 
                cssClass: 'tofill tostroke',
                'stroke' : keyColor,
                'fill' : 'black',
                'stroke-width':2,
                r : 2,
                tpclass : 'base-figure',
              }
        );
        //------------------------
        // \\// key triangle
        //------------------------



        //-----------------------------------------------
        // //\\ decorates draggers
        //-----------------------------------------------
        pos2pointy(
            'D',
            { 
                cssClass        : 'tofill tostroke',
                'stroke'        : generatingColor,
                'fill'          : 'white',
                'stroke-width'  : 2,
                r               : 7,
                //tpclass         : 'generators',
            }
        );
        pos2pointy(
            'T',
            { 
                cssClass        : 'tofill tostroke',
                'stroke'        : keyColor,
                'fill'          : 'white',
                'stroke-width'  : 2,
                r               : 7,
                //at the moment, this collides with tp model:
                //tpclass         : 'key-triangle',
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
                cssClass: 'tofill tostroke',
                'fill' : basePointColor,
                tpclass : 'base-figure',
            }
        );

        pos2pointy(
            'B',
            { 
                cssClass: 'tofill tostroke',
                'fill' : basePointColor,
                tpclass : 'base-figure',
            }
        );

        pos2pointy(
            'C',
            { 
                cssClass: 'tofill tostroke',
                'fill' : basePointColor,
                tpclass : 'base-figure',
            }
        );

        //secondary points:
        pos2pointy(
            'S',
            { 
                cssClass: 'tofill tostroke',
                'fill' : basePointColor,
                tpclass : 'base-figure',
            }
        );
        pos2pointy(
            'Q',
            { 
                cssClass: 'tofill tostroke',
                'fill' : basePointColor,
                tpclass : 'base-figure',
            }
        );

        pos2pointy(
            't',
            { 
                cssClass: 'tofill tostroke',
                'fill' : statGenColor,
                tpclass : 'static-generator',
            }
        );

        pos2pointy(
            'r',
            { 
                cssClass: 'tofill tostroke',
                'fill' : statGenColor,
                tpclass : 'static-generator',
            }
        );

        pos2pointy(
            'R',
            { 
                cssClass: 'tofill tostroke',
                'fill' : keyColor,
                tpclass : 'key-triangle',
            }
        );
        //-------------------------------------------------
        // \\// makes points
        //-------------------------------------------------






        ///attaches updater right to the point T to ease
        ///this function lookup right from dragger-of-T
        if( !ns.h( rg.T, 'model8media_upcreate' )) {
            ////cannot use this function till this subroutine is not
            ////ran ... and till init is done;
            ////used in drag ... so drag must wait:
            ////this is OK because drag8drop sliders created after
            ////model8media_upcreate;
            rg.T.model8media_upcreate = function() {
                studyMods[ SUB_MODEL ].model8media_upcreate();
            }
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


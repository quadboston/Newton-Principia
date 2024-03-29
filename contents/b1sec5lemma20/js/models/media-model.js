( function() {
    var {
        $$, nssvg, has, haz,
        sconf, sDomF, sDomN, ssD, ssF,
        rg, toreg, stdMod,
    } = window.b$l.apptree({
        ssFExportList :
        {
        },
        stdModExportList :
        {
            media_upcreate,
        },
        setModule,
    });
    var mod2inn;
    var pointies2line;
    var pos2pointy;
    var paintTriangle;
    var ellipseColor;
    return;








    function setModule()
    {
        mod2inn         = ssF.mod2inn;
        pointies2line   = ssF.pointies2line;
        pos2pointy      = ssF.pos2pointy;
        paintTriangle   = ssF.paintTriangle;
    }


    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function media_upcreate()
    {
        createMedia0updateMediaAUX();
        if( ssF.mediaModelInitialized ) {
            stdMod.medD8D && stdMod.medD8D.updateAllDecPoints();
        }
        ssF.upcreate_mainLegend(); //placed into "slider"
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

        var wwfc            = haz( ssD, 'fixed-colors' );
        function arr2rgba( arr ) {
            if( !arr ) return null;
            var r=Math.floor( arr[0] );
            var g=Math.floor( arr[1] );
            var b=Math.floor( arr[2] );
            var op= arr[3].toFixed(4);
            return 'rgba('+r+','+g+','+b+','+op+')';
        }

        ellipseColor        = arr2rgba( wwfc[ "ellipse" ] ) || 'rgba(0,100,0,1)';
        var keyColor        = arr2rgba( wwfc[ "key-triangle" ] ) || '#ff0000';
        var RTColor         = arr2rgba( wwfc[ "RT" ] ) || '#ff0000';
        var basePointColor  =                           '#0000aa'; 
        var baseColor       = arr2rgba( wwfc[ "base-figure" ] )  || '#0000dd'; 
        var statGenColor    = arr2rgba( wwfc[ "static-generator" ] ) || '#eeaa00';
        var generatingColor = arr2rgba( wwfc[ "generators" ] ) || '#00aaee'; 
        var givenParallels  = arr2rgba( wwfc[ "given-parallelogram" ] ) || '#ff00ff';
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
        var ellipse = toreg( 'ellipse' )();
        ellipse.svgel = nssvg.ellipse({
            stepsCount      : 100,
            a               : rg.a.value*sconf.mod2inn_scale,
            b               : rg.b.value*sconf.mod2inn_scale,
            x0              : rg.O.medpos[0],
            y0              : rg.O.medpos[1],
            rotationRads    : sconf.rotationRads,
            svgel           : ellipse.svgel,
            parent          : stdMod.mmedia,

            'stroke-width':5,
            stroke  : ellipseColor,
        });
        $$.$(ellipse.svgel).cls( 'tp-ellipse tostroke thickable' );



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
        var plCls = 'tostroke thickable';
        pointies2line(
            'PB',
            [ rg.P, rg.B],
            {
                cssClass: plCls,
                'stroke-width' : lwidth,
                stroke  : baseColor,
                tpclass : 'base-figure',
            }
        );
        pointies2line(
            'PC',
            [ rg.P, rg.C],
            {
                cssClass: plCls,
                'stroke-width':lwidth,
                stroke  : baseColor,
                tpclass : 'base-figure',
            }
        );
        pointies2line(
            'CA',
            [ rg.C, rg.A],
            {
                cssClass: plCls,
                'stroke-width':lwidth,
                stroke  : baseColor,
                tpclass : 'base-figure',
            }
        );
        pointies2line(
            'BA',
            [ rg.B, rg.A],
            {
                cssClass: plCls,
                'stroke-width':lwidth,
                stroke  : baseColor,
                tpclass : 'base-figure',
            }
        );
        pointies2line(
            'BC',
            [ rg.B, rg.C],
            {
                cssClass: plCls,
                'stroke-width':lwidth,
                stroke  : baseColor,
                tpclass : 'base-figure',
            }
        );
        //-------------------------------------------------
        // \\// base sides
        //-------------------------------------------------




        //-------------------------
        // //\\ given parallelogram
        //-------------------------
        pointies2line(
            'rQ',
            [ rg.r, rg.Q],
            {
                cssClass: plCls,
                'stroke-width':lwidth,
                stroke  : givenParallels,
                tpclass : 'given-parallelogram',
            }
        );
        pointies2line(
            'SP',
            [ rg.S, rg.P],
            {
                cssClass: plCls,
                'stroke-width':lwidth,
                stroke  : givenParallels,
                tpclass : 'given-parallelogram',
            }
        );
        //-------------------------
        // \\// given parallelogram
        //-------------------------


        //------------------------
        // //\\ linear-generators
        //------------------------
        pointies2line(
            'BT',
            [ rg.B, rg.T],
            {
                cssClass: plCls,
                'stroke-width':lwidth,
                stroke  : generatingColor,
                tpclass : 'generators',
            }
        );
        pointies2line(
            'CR',
            [ rg.C, rg.R],
            {
                cssClass: plCls,
                'stroke-width':lwidth,
                stroke  : generatingColor,
                tpclass : 'generators',
            }
        );
        pointies2line(
            'BD',
            [ rg.B, rg.D],
            {
                cssClass: plCls,
                'stroke-width':lwidth,
                stroke  : generatingColor,
                tpclass : 'generators',
            }
        );
        pointies2line(
            'CD',
            [ rg.C, rg.D],
            {
                cssClass: plCls,
                'stroke-width':lwidth,
                stroke  : generatingColor,
                tpclass : 'generators',
            }
        );

        pointies2line(
            'Bt',
            [ rg.B, rg.t],
            {
                cssClass: plCls,
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
                cssClass: plCls,
                'stroke-width':lwidth,
                stroke  : statGenColor,
                tpclass : 'static-generator',
            }
        );
        pointies2line(
            'Pr',
            [ rg.P, rg.r],
            {
                cssClass: plCls,
                'stroke-width':lwidth,
                stroke  : statGenColor,
                tpclass : 'static-generator',
            }
        );
        pointies2line(
            'Pt',
            [ rg.P, rg.t],
            {
                cssClass: plCls,
                'stroke-width':lwidth,
                stroke  : statGenColor,
                tpclass : 'static-generator',
            }
        );
        //------------------------
        // \\// static triangle
        //------------------------


        //------------------------
        // //\\ similar triangles
        //      in circle case
        //------------------------
        pointies2line(
            'CPsimilar',
            [ rg.C, rg.P],
            {
                cssClass: plCls,
                'stroke'      : 'transparent',
                'stroke-width':7,
                tpclass : 'similar-triangle',
            }
        );
        pointies2line(
            'BPsimilar',
            [ rg.B, rg.P],
            {
                cssClass: plCls,
                'stroke'      : 'transparent',
                'stroke-width':7,
                tpclass : 'similar-triangle',
            }
        );
        pointies2line(
            'BCsimilar',
            [ rg.B, rg.C],
            {
                cssClass: plCls,
                'stroke'      : 'transparent',
                'stroke-width':7,
                tpclass : 'similar-triangle',
            }
        );
        //------------------------
        // \\// similar triangles
        //------------------------



        //------------------------
        // //\\ key triangle
        //------------------------
        pointies2line(
            'PR',
            [ rg.P, rg.R],
            {
                cssClass: plCls,
                'stroke-width':7,
                tpclass : 'key-triangle',
            }
        );
        pointies2line(
            'PT',
            [ rg.P, rg.T],
            {
                cssClass: plCls,
                'stroke-width':7,
                tpclass : 'key-triangle',
            }
        );
        pointies2line(
            'RT',
            [ rg.R, rg.T],
            {
                cssClass: plCls,
                'stroke-width':4,
                tpclass : 'key-triangle',
            }
        );
        //rg.P.svgel = null; //changes "z-order"
        var pointS = pos2pointy(
            'P',
              {
                cssClass: 'tofill tostroke',
                'stroke'        : keyColor,
                'fill'          : 'black',
                'stroke-width'  : 2,
                r               : 4,
                tpclass         : 'base-figure',
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

                //not yet ready for drag: 'fill'          : 'white',
                'fill'          : generatingColor,

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
            'C',
            { 
                tpclass         : 'base-figure',
                cssClass        : 'tofill tostroke',
                'stroke'        : basePointColor,
                'fill'          : 'red', //basePointColor,
                'stroke-width'  : 2,
                r               : 1,
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





        //-----------------------------------------------
        // //\\ adds methods to rg.T only once
        //-----------------------------------------------
        ///attaches updater right to the point T to ease
        ///this function lookup right from dragger-of-T
        if( !has( rg.T, 'model8media_upcreate' )) {
            ////cannot use this function till this subroutine is not
            ////ran ... and till init is done;
            ////used in drag ... so drag must wait:
            ////this is OK because drag8drop sliders created after
            ////model8media_upcreate;
            rg.T.model8media_upcreate = function() {
                stdMod.model8media_upcreate();
            }

            ///for slider
            rg.T.pos2value = function( newPos )
            {
                var T = rg.T;
                var newValue = T.pos2Tpar( newPos )
                //protects drag from going outside the window
                if( newValue < -6.5 || newValue > 2.5 ) return;
                T.value = newValue;
                T.pos[0] = newPos[0];
                T.pos[1] = newPos[1];
                T.model8media_upcreate();
            }
        }
        //-----------------------------------------------
        // \\// adds methods to rg.T only once
        //-----------------------------------------------


        if( !has( rg.a, 'model8media_upcreate' ) ) {
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
        pt.medpos = ssF.mod2inn( pt.pos );
    }


        //----------------------------------------
        // //\\ makes up slider
        //      creates slider only once per
        //      app model creation;
        //----------------------------------------
        function createSliderPlaceholder_a()
        {
            var neutral_a         = 1; //neutral value of a is for circle
            var max_a             = 4;
            var min_a             = 0.1;
            var range_a           = max_a - min_a;
            var customSliderShift = 0; //picture units

            //----------------------------------------------------------------------------
            // //\\ in model units and reference system
            //----------------------------------------------------------------------------
            var startX            = ( -sconf.modorInPicX +
                                     sconf.innerMediaWidth * sconf.SLIDERS_OFFSET_X
                                    ) *
                                    sconf.inn2mod_scale;
            var endX              = startX + sconf.innerMediaWidth * sconf.inn2mod_scale *
                                             sconf.SLIDERS_LENGTH_X;
            var startY            = sconf.originY_onPicture
                                          - sconf.innerMediaHeight
                                          + sconf.SLIDERS_LEGEND_HEIGHT
                                          + customSliderShift
                                          + sconf.SLIDERS_OFFSET_Y
                                    ;
            var startY            =  startY * sconf.inn2mod_scale;
            //----------------------------------------------------------------------------
            // \\// in model units and reference system
            //----------------------------------------------------------------------------


            var railsLength       = endX - startX;
            var startPos          = [ startX, startY ];
            var endPos            = [ endX, startY ];

            // //\\ slider object
            //sets registry
            toreg( 'sliderStart' )( 'pos', startPos );
            toreg( 'sliderEnd' )( 'pos', endPos );

            var sliderStart = pos2pointy( 'sliderStart',
                              { fill : '#9999dd', tpclass:'ellipse', cssClass : 'tofill tostroke', } );
            var sliderEnd = pos2pointy( 'sliderEnd',
                              { fill : '#9999dd', tpclass:'ellipse', cssClass : 'tofill tostroke', } );
            ///draws rails
            var slider = pointies2line(
                 'slider-a',
                 [sliderStart, sliderEnd],
                 {stroke:'#9999dd', 'stroke-width':3, tpclass:'ellipse', cssClass : 'tofill tostroke', }
            );
            $$.$(slider.svgel).cls( 'tp-ellipse' );
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
                    stroke : ellipseColor,
                    'stroke-width' : 3,
                    fill : 'white',
                    r : 8,
                    tpclass : 'ellipse',
                }
            );

            a.text_svg = nssvg.printText({
                parent : stdMod.mmedia,
                text :'a',
                x : rg.a.medpos[0]-15,
                y : rg.a.medpos[1]+80,
               'stroke-width' : 3,
                style : { 'font-size' : '60px' },
                stroke  : ellipseColor,
            });

            rg.a.model8media_upcreate = function() {
                stdMod.model8media_upcreate();
            }

            ///for slider
            a.pos2value = function( newPos, dontUpdateModel )
            {
                var newValue = ( max_a - min_a ) * ( newPos[0] - startX ) / railsLength + min_a;
                if( newValue < min_a || newValue > max_a ) return;

                a.value = newValue;

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
                //a.medpos = mod2inn( a.pos );
                a.medpos = ssF.mod2inn_original( a.pos, stdMod );
                nssvg.u({
                    svgel   : a.svgel,
                    parent  : stdMod.mmedia,
                    cx : a.medpos[0],
                    cy : a.medpos[1],
                });
                a.text_svg.setAttributeNS( null, 'x', a.medpos[0]-15 );
                a.text_svg.setAttributeNS( null, 'y', a.medpos[1]+80 );

                var shift =
                    a.medpos[1] +
                    sconf.GENERIC_SLIDER_HEIGHT_Y * 0.8
                    ;
                a.text_svg.setAttributeNS( null, 'y', shift );
            };

            updateSliderHandlePos();
        }
        //----------------------------------------
        // \\// makes up slider
        //----------------------------------------



}) ();


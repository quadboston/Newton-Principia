( function() {
    var {
        ns, sn,
        rg,
        ssF, ssD,
        sconf,
        amode,
        toreg,
        stdMod,
        
    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate___part_of_medupcr_basic,
        },
    });

    //cleanup stuff
    var barsStack = {
        left  : { arr :[], count : 0 },
        right : { arr :[], count : 0 },
    };
    return;













    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate___part_of_medupcr_basic()
    {
        //-------------------------------------------------
        // //\\ corrects sliderN caption 
        //-------------------------------------------------
        var processedBarsCount = rg.orderedPartPoints.val.length - 1;
        rg.countNSlider.caption = processedBarsCount + ' bases';
        var wwL = sconf.DONT_PAINT_BARS_MORE_THAN;
        if( processedBarsCount > wwL ) {
            rg.countNSlider.caption += ' ( ' + wwL + ' shown )';
        }
        //-------------------------------------------------
        // \\// corrects sliderN caption 
        //-------------------------------------------------

        //establishes svg place for these points before
        //drag-points establish the place for their own,
        //this sets "z-order" for draggers to override T, p, ...  view,
        ssF.pos2pointy( 'T' );
        ssF.pos2pointy( 'p' );
        ssF.pos2pointy( 'E' );

        //this is a "policy" ... should be in the state manager if any ...
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

        ///-------------------------------------------------
        /// paints right side curve
        ///-------------------------------------------------
        ssF.paintsCurve({
            mmedia          : stdMod.mmedia,
            fun             : rg.rightFun_2_rightFigure,
            rgName          : 'prT',
            pointA          : rg.A,
            pointB          : rg.E,
            addToStepCount  : 1,
        });

        ///-------------------------------------------------
        /// paints left side curve
        ///-------------------------------------------------
        ssF.paintsCurve({
            mmedia          : stdMod.mmedia,
            fun             : rg.leftFunction.dividedDifferences.calculate_polynomial,
            pointsName      : 'aE',
            rgName          : 'acE',
            addToStepCount  : 1,
        });

        displayBars( 'left' );
        displayBars( 'right' );


        if(
            amode.subessay === 'non-similar-curves'
        ) {
            rg.convergenceGraphFW.callPHGraph({});
        } else {
            rg.convergenceGraphFW.fw.nonefyDom();
        }
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================







    //=========================================================
    // //\\ calculates figure, bars areas
    //      and paints bars
    //=========================================================
    function displayBars(
        left0right,
    ){
        var ordPP         = rg.orderedPartPoints.val;
        const BCOUNT        = ordPP.length;
        const BCOUNT_1      = BCOUNT-1;

        var T               = rg.ptransform.val;
        var T00             = T[0][0];
        var T10             = T[1][0];
        var T11             = T[1][1];
        var transformVolume = T00 * T11;
        if(
            amode.subessay === 'non-similar-curves'
        ) {
            var zebraColArr = ssD.zebraCols.multicolor;
        } else {
            var zebraColArr = ssD.zebraCols.monocolor;
        }

        //preparing for cleanup
        var barStack    = barsStack[ left0right ].arr;
        var bsCount     = barsStack[ left0right ].count;
        ///does a soft cleanup: does not remove svg el from dom, but
        ///just makes display === none,
        barStack.forEach( lin => {
            lin.svgel.style.display = 'none';
        })

        //localizers for speed
        var mod2inn = ssF.mod2inn;

        ordPP.forEach( (bar, bix) => {
            if( bix === BCOUNT_1 ) return; //last point has no bar
            if( bix >= rg.mediaBars.val.length ) return;

            //:calculates bar vertices
            var mBar        = rg.mediaBars.val[ bix ][ left0right ];
            var fmin4bar    = mBar.fmin4bar;
            var p1X         = mBar.p1X;
            var p2X         = mBar.p2X;
            var p2minus1    = p2X - p1X;

            //=======================================================
            // //\\ does GUI
            //=======================================================

            //:establishes names for bar vertices
            var ltName      = left0right + 'bar-'+bix+'-left-top';
            var rtName      = left0right + 'bar-'+bix+'-right-top';
            var ltBName     = left0right + 'bar-'+bix+'-left-bottom';
            var rtBName     = left0right + 'bar-'+bix+'-right-bottom';

            //-------------------------------------------------------
            // //\\ calculates vertices for left and right
            //-------------------------------------------------------
            if( left0right === 'left' ) {
                var p1Xtop      = p1X;
                var p2Xtop      = p2X;
                var p1Y         = fmin4bar;
                var ymin        = rg.A.pos[1];
                var cssClass    = 'tp-proof tp-left-bars tp-left-bar-' + bix;
                var breadthClass= 'tp-left-bars-breadths';
            } else {
                ////transforms normalized coordinates to "squed coordinates"
                var p1X         = p1X * T00 + rg.P.pos[0];
                var p2X         = p2X * T00 + rg.P.pos[0];
                var p1Xtop      = p1X + fmin4bar*T10;
                var p2Xtop      = p2X + fmin4bar*T10; 
                var p1Y         = fmin4bar * T11 + rg.P.pos[1]; //-rg.A.pos[1];
                var ymin        = rg.P.pos[1];
                var cssClass    = 'tp-proof tp-right-bars tp-right-bar-' + bix;
                var breadthClass= 'tp-right-bars-breadths';
            }
            //-------------------------------------------------------
            // \\// calculates vertices for left and right
            //-------------------------------------------------------

            //-------------------------------------------------------
            // //\\ establishes registry for bar vertices
            //-------------------------------------------------------
            var leftTop     = toreg( ltName )();   leftTop.pos     = [ p1Xtop, p1Y ];
            var rightTop    = toreg( rtName )();   rightTop.pos    = [ p2Xtop, p1Y ];
            var leftBottom  = toreg( ltBName )();  leftBottom.pos  = [ p1X, ymin ];
            var rightBottom = toreg( rtBName )();  rightBottom.pos = [ p2X, ymin ];
            //-------------------------------------------------------
            // \\// establishes registry for bar vertices
            //-------------------------------------------------------


            //-------------------------------------------------------
            // //\\ drawing bars edges
            //-------------------------------------------------------
            //:converts var vertices from model to media
            leftTop.medpos      = mod2inn( leftTop.pos );
            rightTop.medpos     = mod2inn( rightTop.pos );
            leftBottom.medpos   = mod2inn( leftBottom.pos );
            rightBottom.medpos  = mod2inn( rightBottom.pos );

            var zebraColor = zebraColArr[ bix ].rgba_high;

            var rgX_bar = ssF.pnames2poly( [ ltBName, ltName, rtName, rtBName ],
                            cssClass,
                            !!'correctJoin'
            );
            rgX_bar.svgel.style.display = 'block';

            //this overrides tp-css-machine colors in topics-media-css.js
            rgX_bar.svgel.style.fill = zebraColor;
            barStack[ bsCount++ ] = rgX_bar;  //storing for cleanup

            var lin = ssF.str2line( ltBName+','   +rtBName, cssClass +
                                    ' ' + breadthClass, {}, '' );
            lin.svgel.style.display = 'block';
            barStack[ bsCount++ ] = lin;  //storing for cleanup

            if( bix === sconf.INDIVIDUAL_BAR_INDEX_IN_LEMMA ) {
                ////facilitates clause in lemma orig. text for "indiv" bars,
                var wwCol = ssD.zebraCols.multicolor[ bix ].rgba_high;
                rgX_bar.svgel.style.stroke = wwCol;
                lin.svgel.style.stroke = wwCol;
                //this value is overriden by tp-machine at highlight
                rgX_bar.svgel.setAttribute( 'stroke-width', '0.1' );
                lin.svgel.setAttribute( 'stroke-width', '0.1' );
            } else {
                lin.svgel.style.stroke = zebraColor;
                rgX_bar.svgel.style.stroke = 'transparent';
            }
            //-------------------------------------------------------
            // \\// drawing bars edges
            // \\// does GUI
            //=======================================================
        });
    }
    //=========================================================
    // \\// calculates figure, bars areas
    //=========================================================

}) ();


( function() {
    var {
        ns, sn, $$, mat,
        sconf, rg, toreg,
        ssF, ssD,
        sDomF,
        amode,
        stdMod,

    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate___part_of_medupcr_basic,
            amode2paintShapes,
        },
    });
    return;











    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate___part_of_medupcr_basic()
    {
        //stdMod.doesPaintCurve( keyName );
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================



    function amode2paintShapes()
    {

        //----------------------------------------------------
        // //\\ manages shapes visibility for different amodes
        //      todom: there are two "undisplay" managers,
        //      this one and in "media-upcreate", do fix this,
        //      do put in preliminary callback for
        //      media_upcreate
        //----------------------------------------------------
        rg.axisX.undisplay = false;
        rg.axisY.undisplay = false;
        rg[ 'A,axisX' ].undisplay = false;
        rg[ 'A,axisY' ].undisplay = false;
        rg[ 'AT' ].undisplay = false;
        rg[ 'A,Tleft' ].undisplay = false;
        rg[ 'T' ].undisplay = false;
        rg[ 'Tleft' ].undisplay = false;

        rg[ 'AD' ].undisplay = true;
        rg[ 'AB' ].undisplay = true;
        rg[ 'B' ].undisplay = true;
        rg[ 'BD' ].undisplay = true;
        rg[ 'D' ].undisplay = true;
        rg[ 'R' ].undisplay = true;
        rg[ 'N' ].undisplay = true;
        rg[ 'Rc' ].undisplay = true;
        rg[ 'BR' ].undisplay = true;
        rg[ 'AN' ].undisplay = true;
        rg[ 'A,Rc' ].undisplay = true;

        switch( amode.subessay )
        {
            case 'if-curve':
                break;
            case 'euclid-framework-curves':
                rg.axisX.undisplay = true;
                rg.axisY.undisplay = true;
                rg[ 'A,axisX' ].undisplay = true;
                rg[ 'A,axisY' ].undisplay = true;
                break;

            case 'circle-based-curvature' :
                //var keyName = 'curveRightCircle';
                rg.axisX.undisplay = true;
                rg.axisY.undisplay = true;
                rg[ 'A,axisX' ].undisplay = true;
                rg[ 'A,axisY' ].undisplay = true;

                rg[ 'AT' ].undisplay = true;
                rg[ 'A,Tleft' ].undisplay = true;
                rg[ 'T' ].undisplay = false;
                rg[ 'Tleft' ].undisplay = true;
                rg[ 'AT' ].undisplay = false;

                rg[ 'N' ].undisplay = false;
                rg[ 'B' ].undisplay = false;
                rg[ 'AB' ].undisplay = false;
                rg[ 'BD' ].undisplay = false;
                rg[ 'D' ].undisplay = false;
                rg[ 'AD' ].undisplay = false;
                rg[ 'R' ].undisplay = false;
                rg[ 'BR' ].undisplay = false;
                rg[ 'Rc' ].undisplay = false;
                rg[ 'AN' ].undisplay = false;
                rg[ 'A,Rc' ].undisplay = false;
                break;

            case 'infinite-frequency-circle-based-curvature' :
                //var keyName = 'curveRightCircle';
                rg.axisX.undisplay = false;
                rg.axisY.undisplay = false;

                rg[ 'B' ].undisplay = false;
                rg[ 'AB' ].undisplay = false;
                rg[ 'R' ].undisplay = false;
                rg[ 'BR' ].undisplay = false;
                rg[ 'Rc' ].undisplay = false;

                rg[ 'BD' ].undisplay = false;
                rg[ 'D' ].undisplay = false;
                rg[ 'AD' ].undisplay = false;
                rg[ 'A,Rc' ].undisplay = false;

                break;

        }
        //----------------------------------------------------
        // \\// manages shapes visibility for different amodes
        //----------------------------------------------------



        rg[ 'curveIF' ].svgel$.css( 'display', 'none' );
        rg[ 'curveCIF' ].svgel$.css( 'display', 'none' );

        rg[ 'curveIFC' ].svgel$.css( 'display', 'none' );
        rg[ 'curveIFCleft' ].svgel$.css( 'display', 'none' );

        rg[ 'curveCircle' ].svgel$.css( 'display', 'none' );
        rg[ 'curvatureCircle' ].svgel$.css( 'display', 'none' );
        rg.curveLeftCircle.svgel$.css( 'display', 'none' );
        rg.curveRightCircle.svgel$.css( 'display', 'none' );
        rg.curveParabola.svgel$.css( 'display', 'none' );

        //rg[ 'H1,H2' ].svgel$.css( 'display', 'none' );
        //rg[ 'H2' ].undisplay = true;

        var funArgs = {};
        switch( amode.subessay )
        {
            case 'if-curve':
                var keyName = 'curveIF';
                break;

            case 'euclid-framework-curves':
                var keyName = 'curveCircle';
                rg.curveLeftCircle.svgel$.css( 'display', 'block' );
                rg.curveRightCircle.svgel$.css( 'display', 'block' );
                break;

            case 'continuous-if-curve' :
                var keyName = 'curveCIF';
                break;

            case 'circle-based-curvature' :
                var keyName = 'curveParabola';
                rg[ 'curvatureCircle' ].svgel$.css( 'display', 'block' );
                stdMod.doesPaintCurve( 'curvatureCircle', {
                    R : Math.abs( rg.R.pos[1] ),
                    center : rg.R.pos,
                } );
                break;

            case 'infinite-frequency-circle-based-curvature' :
                var keyName = 'curveIFC';
                rg[ keyName+'left' ].svgel$.css( 'display', 'block' );
                stdMod.doesPaintCurve( keyName+'left', funArgs );

                rg[ 'curvatureCircle' ].svgel$.css( 'display', 'block' );
                stdMod.doesPaintCurve( 'curvatureCircle', {
                    R : Math.abs( rg.R.pos[1] ),
                    center : rg.R.pos,
                } );

                break;

            default:
                var keyName = 'curveCircle';
                break;
        }
        rg[ keyName ].svgel$.css( 'display', 'block' );
        stdMod.doesPaintCurve( keyName, funArgs );
    }



}) ();


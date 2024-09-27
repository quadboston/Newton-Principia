( function() {
    var {
        ns, $$, nssvg, has, haz,
        amode, sconf, sDomF, sDomN, ssD, ssF,
        rg, toreg, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            //media_upcreate,
            media_upcreate___part_of_medupcr_basic,
            media_upcreate___before_basic,
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

    function media_upcreate___before_basic()
    {
        //this is a "policy" ... should be in the state manager if any ...
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;
    }

    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function media_upcreate___part_of_medupcr_basic() //media_upcreate()
    {
        
        ///creates addendum points non-visibility machinery
        fapp.fappRoot$.removeClass( 'subessay--case1' );
        fapp.fappRoot$.removeClass( 'subessay--case2' );
        fapp.fappRoot$.removeClass( 'subessay--corollary3' );
        fapp.fappRoot$.removeClass( 'subessay--converse-proof' );
        fapp.fappRoot$.removeClass( 'subessay--0' );
        fapp.fappRoot$.addClass( 'subessay--' + amode.subessay );
        
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
            stroke  : ns.arr2rgba( ssD['fixed-colors'][ "ellipse" ] ),
        });
        $$.$(ellipse.svgel).cls( 'tp-ellipse tostroke thickable' );
    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================
}) ();


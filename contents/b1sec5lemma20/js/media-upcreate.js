( function() {
    var {
        ns, $$, nssvg, has, haz,
        amode, sconf, sDomF, sDomN, ssD, ssF, sData, fixedColors,
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
        rg.a.caption = 'eccentricity, ' + sData.polar_ell_model.e.toFixed(2);
        ssF.mediaModelInitialized = true;
    }

    /// updates and creates media
    function createMedia0updateMediaAUX()
    {
        var ellipse = toreg( 'ellipse' )();
        const pem = sData.polar_ell_model;
        if( has( ellipse, 'svgel' ) ){
            nssvg.model_ellipse(pem);
        } else {
            ////makes ellipse first to put point over it later
            pem.stepsCount=200;
            pem.parent = stdMod.mmedia;
            pem['stroke-width'] = 5;
            pem.stroke = ns.arr2rgba( fixedColors[ "ellipse" ] );
            pem.svgel = ellipse.svgel = nssvg.model_ellipse(pem);
            $$.$(ellipse.svgel).cls( 'tp-ellipse tostroke thickable' );
        }
    }
}) ();

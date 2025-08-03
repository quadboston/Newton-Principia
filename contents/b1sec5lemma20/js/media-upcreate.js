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
        fapp.fappRoot$.removeClass( 'subessay--corollary1' );
		fapp.fappRoot$.removeClass( 'subessay--corollary2' );
		fapp.fappRoot$.removeClass( 'subessay--corollary3' );
        fapp.fappRoot$.removeClass( 'subessay--converse-proof' );
        fapp.fappRoot$.removeClass( 'subessay--0' );
        fapp.fappRoot$.addClass( 'subessay--' + amode.subessay );
        
        createMedia0updateMediaAUX();
        if( ssF.mediaModelInitialized ) {
            stdMod.medD8D && stdMod.medD8D.updateAllDecPoints();
        }
        ssF.upcreate_mainLegend(); //placed into "slider"
        {
            const e = sData.polar_ell_model.e;
            let cap;
            if( e<0.001 ){
                cap = 'eccentricity 0.00' + ' (circle)';
            } else if( e<0.99 ){
                cap = 'eccentricity ' + e.toFixed(2) + ' (ellipse)';
            } else if ( e<=1.01 ){
                cap = 'eccentricity 1.00 (parabola)';
            } else {
                cap = 'eccentricity = ' + e.toFixed(2) + ' (hyperbola)';
            }
            rg.a.caption = cap;
        }
        ssF.mediaModelInitialized = true;
    }

    /// updates and creates media
    function createMedia0updateMediaAUX()
    {
        const pem = sData.polar_ell_model;
        const brs = pem.branches
        const bN = brs.length;
        for( var ib = 0; ib < bN; ib++ ){
            const br = brs[ ib ];
            if( has( br, 'svgel' ) ){
                nssvg.model_ellipse(br);
            } else {
                ////makes ellipse first to put point over it later
                br.parent = stdMod.mmedia;
                br['stroke-width'] = 5;
                br.stroke = ns.arr2rgba( fixedColors[ "ellipse" ] );
                br.svgel = nssvg.model_ellipse(br);
                $$.$(br.svgel).cls( 'tp-ellipse tostroke thickable' );
            }
        }
    }
}) ();

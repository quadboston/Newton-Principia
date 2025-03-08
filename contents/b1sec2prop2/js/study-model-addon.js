// lemma-twin addon ... enables by including into lemma-conf.js
( function() {
    var {
        ns, sn, globalCss,
        sconf,
        rg,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            model_upcreate_addon,
            init_model_parameters_addon,
        },
    });
    return;











    //=========================================================
    //       it is enough only to add this module to
    //       make this function running at every model_upcreate,
    //       todm: non-effective calling this so many times,
    //=========================================================
    function model_upcreate_addon()
    {
        //this patch amends this css
        //.bsl-approot.textSection--corollary.aspect--english .bsl--svgscene.s ubmodel-common

        //img competes with: .bsl-approot.textSection--scholium.aspect--english .bg0,
        //todm: inconsistent: .main-legend.proof should not need this CSS, it
        //      is designed to remove itself by class ".proof",
        var wwCss =
            amode.aspect === 'model' ||
            amode.textSection === 'corollary' ||
            amode.textSection === 'scholium'
        ?
        //hides common model in corollary and scholium
        `
            .bsl-sim-superscene .bsl-simscene img.bsl-bg-image.bg0,
            .main-legend.proof
            {
                display : none;
            }

            .common-anim-root {
                display : 'block';
            }
        `
        :
        `
            .common-anim-root {
                display : none;
            }
            .dummy--none { width : auto; }
        `;
        globalCss.replace( wwCss, 'toggles-media-visibility' );
    }


    function init_model_parameters_addon()
    {
        stdMod.cre__extraImages();
        stdMod.creates_mainSceneResizer();

        //========================================================================
        // //\\ this patch can be avoided
        //      if to split module decor-cofig.js to two
        //      mods. conf and spawn and put separate confs in separated lemmas,
        //========================================================================
        rg.h.cssClass = 'theor1proof';
        rg.j.cssClass = 'theor1proof';

        rg.j.decStart = rg.D.decStart;
        rg.j.decEnd   = rg.D.decEnd;

        ///recall, decor-conf.js already created svgel for lines and polies
        [ 'Bh', 'Ch', 'Cj', 'Dj' ].forEach( pname => {
            var rgX = rg[ pname];
            rgX.finalCssClass = rgX.finalCssClass.replace( 'theor1corollary', 'theor1proof' );
            rgX.svgel.setAttribute( 'class', rgX.finalCssClass );
        });
        //========================================================================
        // \\// this patch can be avoided
        //========================================================================
    }

}) ();


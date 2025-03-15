( function() {
    var {
        sn, $$, globalCss, eachprop, haz, nspaste,
        sconf, ssD, rg,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            doesMask_model8decor_svg_shapes,
        },
    });
    return;









    //*****************************************************************
    // clears fragments and decs:
    // adds "undisplay" flags to all interaction-groups for all pathIx
    // and to decoration-shapes
    //*****************************************************************
    function doesMask_model8decor_svg_shapes()
    {
        eachprop( stdMod.decor, dec => {
            dec.undisplay = true;
        });

        rg.pathIx_2_pathSubsteps.forEach( (fragment,fix) => {
            fragment.forEach( (fgroup,gix) => {
                fgroup.forEach( ( paintee, mix ) => {
                    //paintee.undisplay = true;
                    //todm ... make following line to follow from above line
                    $$.$(paintee.svgel).addClass( 'undisplay' );
                    let tipArrow$ = haz( paintee, 'vectorArrowSvg$' );
                    tipArrow$ && tipArrow$.addClass( 'undisplay' );
                });
            });
        });

        //Hide all purple triangles.
        //As the delta time slider is moved to left more purple triangles are added to the model area.  However when its moved back
        //to the right they are never removed.  Therefore it's important to hide all of them here (then only show the correct ones in 
        //"unmasks-visible-path-svg.js").
        rg?.pathRacks?.pathRacks?.forEach( (prack, index) => {
            const paintee = rg[ 'kepltr-' + (index) ];
            if (paintee)
                $$.$(paintee.svgel).addClass( 'undisplay' );
        });
    }


}) ();


(function(){
    const { sn, $$, eachprop, haz, sconf, rg, stdMod } =
        window.b$l.apptree({ stdModExportList : {
            hides_all_shapes,
    }});
    return;


    //*****************************************************************
    // hides all shapes: clears fragments and decs:
    // adds "undisplay" flags to all interaction-groups for all pathIx
    // and to decoration-shapes
    //*****************************************************************
    function hides_all_shapes (){
        eachprop( stdMod.decor, dec => {
            dec.undisplay = true;
        });
        rg.pathIx_2_pathSubsteps.forEach( (fragment,fix) => {
            fragment.forEach( (fgroup,gix) => {
                fgroup.forEach( ( paintee, mix ) => {
                    //paintee.undisplay = true;
                    //todm ... make following line to follow from above line
                    paintee?.svgel && $$.$(paintee.svgel).addClass( 'undisplay' );
                    let tipArrow$ = haz( paintee, 'vectorArrowSvg$' );
                    tipArrow$ && tipArrow$.addClass( 'undisplay' );
                });
            });
        });
        //Hide all purple triangles.
        //As the delta time slider is moved to left more purple
        //triangles are added to the model area.  However when its moved back
        //to the right they are never removed.  Therefore it's important to
        //hide all of them here (then only show the correct ones in 
        //"unmasks-visible-path-svg.js").
        rg?.pathRacks?.pathRacks?.forEach( (prack, index) => {
            const paintee = rg[ 'kepltr-' + (index) ];
            paintee && $$.$(paintee.svgel).addClass( 'undisplay' );
        });
    }
})();
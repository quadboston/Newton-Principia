( function() {
    var {
        sn, $$, eachprop, haz,
        sconf, sDomF, ssF, exegs,
        amode,
    } = window.b$l.atree({
        ssFList :
        {
            exegs__2__tpAn8dom8css8mjax,
        },
    });
    return;





    ///Includes step II and III:
    ///Frag. step II. Norm. and anchor-texts and
    ///Frag. step III. Html and global-css-visib-of-active-category.
    function exegs__2__tpAn8dom8css8mjax()
    {
        //c cc( 'exegs__2__... mjax() began' );
        eachprop( exegs, ( logic_phaseAspects, mcat_id ) => {
            eachprop( logic_phaseAspects, ( exAspect, scat_id ) => {
                exAspect.subexegs.forEach( ( subexeg ) => {
                    subexeg.built_act8stat_fragments_texts = [];

                    ///essay is comprised of fragments; active fragments
                    ///will get css-class which makes them visitble when
                    ///in some application state this class is assigned to top html-parent,
                    ///subexeg.activeFrags are non-unJSONED-active Fragment text units,
                    subexeg.activeFrags.forEach( function( rawActiveFrag, tix ) {
                        subexeg.built_act8stat_fragments_texts[ tix ] = {
                            //text ready to be inserted in html with anchor-sripts
                            //converted to anchor text,
                            htmlReadyFragText_racks :
                                ssF.rawFragments2htmlText(
                                    rawActiveFrag
                                )
                        };
                    });

                    subexeg.built_act8stat_fragments_texts.forEach( function( bFrag, fix ) {
                        ///converts frags-texts into html
                        eachprop( bFrag.htmlReadyFragText_racks, ( htmlReadyRack, fid ) => {
                            //c cc( 'does call builtFrags_2_dom8mj()' );
                            ssF.builtFrags_2_dom8mj(
                                subexeg.domEl, htmlReadyRack, fid, sconf.dontDoMathJax );
                        });
                    });
                });
            });
        });
    }
}) ();



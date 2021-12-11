( function() {
    var {
        sn, $$, eachprop, haz,
        sDomF, ssF, exegs,
        amode,        
    } = window.b$l.apptree({
        ssFExportList :
        {
            exegs__2__tpAn8dom8css8mjax,
        },
    });
    return;





    ///Includes:
    ///Frag. step II. Norm. and anchor-texts and
    ///Frag. step III. Html and global-css-visib-of-active-category.
    function exegs__2__tpAn8dom8css8mjax()
    {
        eachprop( exegs, ( theorionAspects, mcat_id ) => {
            eachprop( theorionAspects, ( exAspect, scat_id ) => {
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
                                ssF.normalizes___active8static_fragments(
                                    rawActiveFrag
                                )
                        };
                    });

                    subexeg.built_act8stat_fragments_texts.forEach( function( bFrag, fix ) {
                        ///converts frags-texts into html
                        eachprop( bFrag.htmlReadyFragText_racks, ( htmlReadyRack, fid ) => {
                            ssF.builtFrags_2_dom8mj(
                                subexeg.domEl, htmlReadyRack, fid );
                        });
                    });
                });
            });
        });
    }
}) ();



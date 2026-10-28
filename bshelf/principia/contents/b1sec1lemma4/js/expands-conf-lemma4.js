//expands sconf.js items into rg,
//"unifies" and normalizes items in rg,
{
const {
        sn, ha, han, haz, has, eachprop, nsmethods, nspaste, apush,
        stripp, CONST, rg, fconf, sf, ssF, ssD, sDomF, tpelect,
        toreg, stdMod, gshapes,
    } = window.b$l.atree({ ssFList: {
        doExpandConfig_lemma4,
    }});
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
const expandConf = sn( 'expandConf', ssD );
const originalPoints = sn( 'originalPoints', ssD );

function doExpandConfig_lemma4 (){
    const { rgn2gs, gsShapes, gsLines, gsPoints, new_gshapes } =
        expandConf;
    //vital for svg
    sf.med2mod = 1/sf.mod2med;

    var estimatedPictureSize = Math.max(
        sf.medWidth,
        sf.medHeight,
    );
    //vital for letters paint
    sf.estimatesSizeScale = estimatedPictureSize/1000;

    // //\\ normalizes gshapes
    //      spawns flag "kind"
    //      spawns gsXXXX,
    //      fixes legacy minors,
    //property "kind" is spawned from the first element, so
    //the first element must be always set in lemma c onf,
    let kindWrap = {kind:''};
    for( let ix=0; ix<gshapes.length; ix++){
        let gs = gshapes[ix] = stripp( gshapes[ix] );
        ///todo patch
        ///crashes originalPoints and merges it with clean gs
        if( gs.originalPointsParentArrayName ){
            originalPoints[ gs.originalPointsParentArrayName ][
                gs.originalPointsParentArrayIndex
            ] = gs;
        }
        ///todo patch
        ///crashes originalPoints and merges it with clean gs
        if( gs.originalPointsParentName ){
            originalPoints[ gs.originalPointsParentName ] = gs;
        }
        ssF.expands_gs( gs, kindWrap );
    }
    // \\// normalizes gshapes
    ssF.expandsShapes();
    if( new_gshapes.length ){
        apush( gshapes, new_gshapes);
        new_gshapes.length = 0;
        ssF.expandsShapes();
    }
    gsPoints.forEach( gs => {
        ssF.expandsPoint( gs, gs.rgn );
    });
    ssF.expandsLines();
    //**********************************************
    // \\// gshapes
    //**********************************************
}
}
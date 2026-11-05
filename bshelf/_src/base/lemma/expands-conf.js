//expands sconf.js items into rg,
//"unifies" and normalizes items in rg,
(function(){
const {
        sn, ha, han, haz, has, eachprop, nsmethods, nspaste, apush,
        stripp, CONST, rg, fconf, sf, ssF, ssD, sDomF, tpelect,
        toreg, stdMod, gshapes,
    } = window.b$l.atree({ ssFList: {
        doExpandConfig,
}});
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
const { rgn2gs, gsShapes, gsLines, gsPoints, new_gshapes } =
    Object.assign( sn( 'expandConf', ssD ), {
        rgn2gs: stripp(),
        gsShapes: (ssD.gsShapes = []),
        gsLines: (ssD.gsLines = []),
        gsPoints: (ssD.gsPoints = []),
        new_gshapes: [],
    });
const diagramCss = sn( 'diagramCss', sf );
const graphCss = sn( 'graphCss', sf );
return;


function doExpandConfig (){
    //----------------------------------------------
    // //\\ fixes constants
    //----------------------------------------------
    //secures omitted settings placeholders
    //allocates missed placeholders
    const formulas = sn( 'SHOW_FORMULAS', sf, [] );
    //-1 means that picture coordinates are opposite to
    //model coordinates as usual
    var MONITOR_Y_FLIP = -1 * sf.mod2med_scaleY;
    sn( 'hideProofSlider', sf, true );
    //------------------------------------------------------------
    // //\\ derives initial model parameters from picture's points
    //------------------------------------------------------------
    sf.med2mod = 1/sf.mod2med;
    sf.medsize = sf.medsize || ( sf.medWidth + sf.medHeight );

    ///it is vital to set these pars now ...
    ///they are used in function calls a little below this block ...

    //for non-zoomable shapes
    sf.medposOfModOrigin_x_original = sf.medposOfModOrigin_x;
    sf.medposOfModOrigin_y_original = sf.medposOfModOrigin_y;
    sf.MONITOR_Y_FLIP = MONITOR_Y_FLIP;
    sf.innerMediaHeight = sf.medHeight + sf.SLIDERS_LEGEND_HEIGHT;
    sf.innerMediaWidth = sf.medWidth;

    var estimatedPictureSize = Math.max(
        sf.medWidth,
        sf.medHeight,
    );
    sf.estimatesSizeScale = estimatedPictureSize/1000;

    //todm adds idle registy entries from tpelect
    Object.keys( tpelect ).forEach( camelId => {
        toreg( camelId )( 'rgn', camelId );
    });
    //----------------------------------------------
    // //\\ thickness
    //----------------------------------------------
    const DIAGRAM_SCALE = sf.medsize / sf.medsize_standard;
    const GRAPH_SCALE =
        2 * //by some reason graph needs greater factor 2
            //perhaps because graph css-size is fixed and
            //smaller thand diagram css-size
        sf.graphSvgSize / sf.medsize_standard;
    [
        'default_tp_stroke_width',
        'defaultLineWidth',
        'hover_width',
        'nonhover_width',
        'text_hover_width',
        'text_nonhover_width',
        'handleRadius',
    ]
    .forEach( pn => {
        diagramCss[pn] = ( sf[pn] * DIAGRAM_SCALE ).toFixed(2)+'px';
        graphCss[pn] = ( sf[pn] * GRAPH_SCALE ).toFixed(2)+'px';
        sf[pn] *= DIAGRAM_SCALE; //do remove
        sf[pn] = sf[pn].toFixed(2);
    });
    //this looks not very consistent because of
    //this object takes special attention:
    sf.pointDecoration.r *= DIAGRAM_SCALE;
    sf.pointDecoration['stroke-width'] *= DIAGRAM_SCALE;
    //----------------------------------------------
    // \\// thickness
    // \\// fixes constants
    //----------------------------------------------

    if( fconf.sappId === 'b1sec1lemma4' ) return;

    //**********************************************
    // //\\ gshapes
    // //\\ normalizes gshapes
    //      spawns flag "kind"
    //      spawns gsXXXX,
    //      fixes legacy minors,
    //property "kind" is spawned from the first element, so
    //the first element must be always set in lemma c onf,
    let kindWrap = {kind:''};
    for( let ix=0; ix<gshapes.length; ix++){
        let gs = gshapes[ix] = stripp( gshapes[ix] );
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
})();

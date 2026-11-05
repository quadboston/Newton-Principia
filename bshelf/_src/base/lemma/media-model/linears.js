(function(){

const {
    sn, $$, nsmethods, han, haz, has, mat, nspaste, nssvg, fconf,
    sconf, ssF, ssD, sDomF, lowrgid_2_glocss8anchorRack,
    rg, toreg, stdMod, amode,
} = window.b$l.atree({ ssFList : {
        pivots_2_svgLineInRg,
        namesArr_2_svgpoly,
        paintTriangle,
    },
});
var ownProp = Object.prototype.hasOwnProperty;
const stripsExtraSpace = nsmethods.stripsExtraSpace;
return;


//==============================================
// //\\ creates svg-line or updates it if exists
//==============================================
///
///API
/// Returns: line with line.svgel,
/// Sets:
///     line.svgel).cls( cssClass + 'tp-' + tpclass
///     line.svgel
/// Input:
///     required:
///         rgn - kname of line in rg,
///         pivots - as in args or in rg[ rgn ], specifically:
///                     pivots[0].medpos, pv1.medpos
///
///     optional:
///         line as toreg( rgn )
///         rgShape.stroke
///         rgShape[ 'stroke-width' ]
///         rgShape.cssClass
///         rgShape.tpclass
///
///     used external:
///         sconf.thickness
///
/// Output: adds pivots-media-positions to line
function pivots_2_svgLineInRg( rgShape ){
    var line = rgShape;
    rgn = rgShape.rgn;
    var vectorTipIx = haz( line, 'vectorTipIx' );
    let pivots = haz( line, 'pivots' );
    if( !pivots ){
        pivots = haz( line, 'cpivots' );
    }
    if( !pivots ){
        if( fconf.sappId !== 'b1sec1lemma4' ){
            const err = 'Missed pivots in '+rgn+' line.';
            ccc( err, rgShape );
            throw err;
        } else {
            ////todo patch for 'b1sec1lemma4'
            if( !pivots ){
                if( !rgn ){
                    ccc( 'missed rgn' );
                }
                if( rgn.indexOf( ',' ) > -1 ){
                    ////legally built line name
                    var splitToken = ',';
                } else if( rgn.length === 2 ){
                    var splitToken = '';
                } else {
                    throw new Error( 'Ambiguous line pivots name = ' + rgn );
                }
                var pns = rgn.split( splitToken );
                ///todom overkill test: rid:
                if( !haz( rg, pns[0] ) || !haz( rg, pns[1] ) ){
                    throw Error( 'Missed pivot in rg with rgn = ' + pns[0] );
                }
                pivots = [ rg[ pns[0] ], rg[ pns[1] ] ];
            }
        }
    }
    //---------------------------------------------
    // //\\ stroke
    //---------------------------------------------
    let defalutWidth = 2;
    if(sconf.sappId === "b1sec1lemma2" ||
        sconf.sappId === "b1sec1lemma3") {
        defalutWidth = 1;
    }
    sn( 'stroke-width', rgShape, defalutWidth );
    line.finalStrokeWidth =
        rgShape[ 'stroke-width' ] * sconf.thickness;
    rgShape.stroke = sn( 'stroke', rgShape, 'black' );
    //---------------------------------------------
    // \\// stroke
    //---------------------------------------------
    let pv0 = pivots[0];
    let pv1 = pivots[1];
    if( haz( pv0, 'unscalable' ) ) {
        pv0.medpos = ssF.modpos2medpos_original( pv0.pos );
        pv1.medpos = ssF.modpos2medpos_original( pv1.pos );
    } else if( !has(pv0, 'medpos' ) ) {
        pv0.medpos = ssF.modpos2medpos( pv0.pos );
        pv1.medpos = ssF.modpos2medpos( pv1.pos );
    }
    var pivotsMedPos= [ pv0.medpos, pv1.medpos ];

    ///this property helps to optimize svg painting
    var dressed = haz( line, 'pointIsAlreadyDressed' );
    if( !dressed ) {
        ////longer part of optimization: creates svg
        var tpclass = sDomF.rgid2low(
            ( haz( rgShape, 'tpclass' ) ) || rgn
        );
        var stroke = haz( line, 'pcolor' ) ||
            han( rgShape, 'stroke',
            sDomF.rgn0arrc_2_rgba( tpclass ));
        //==================================================
        // //\\ class
        //==================================================
        var finalTp      = haz( line, 'notp' ) ? 'notp-' : 'tp-';
        var bareCssClass = has( rgShape, 'cssClass' ) ?
                           rgShape['cssClass'] + ' ' :  '';
        bareCssClass += ' ' + finalTp + tpclass;
        //cleans up from rubbish from other settings:
        line.bareCssClass = bareCssClass
            .replace( /thickable/g, '' )
            .replace( /tostroke/g, '' )
            .replace( /tobold/g, '' )
            .replace( /tofill/g, '' );
        line.lineCssClass = stripsExtraSpace(
            line.bareCssClass + ' ' + 'thickable tostroke');
        line.arrowCssClass = stripsExtraSpace(
            line.lineCssClass + ' ' + 'tofill');
        line.captionCssClass = stripsExtraSpace(
            line.bareCssClass + ' tobold tofill hover-width');
        //==================================================
        // \\// class
        //==================================================
        var argsvg = {
            svgel: haz( line, 'svgel' ),
            parent: stdMod.medScene,
            //todm everywhere in this module:
            //parent: stdMod.medScene,
            pivots: pivotsMedPos,
            'stroke-width': line.finalStrokeWidth.toFixed(4),
            'stroke-linecap': 'round'
        }
        ///shapes without topic-prescribed rgn do
        ///paint colors in own atributes
        var low_tpID = nsmethods.rgid2low( rgn );
        var tpactive = haz( lowrgid_2_glocss8anchorRack, low_tpID );
        if( !tpactive ) {
            argsvg.stroke = line.stroke;
        };
        line.svgel = nssvg.polyline(argsvg);
        var svgel$ = line.svgel$ = $$.$(line.svgel);

        svgel$.cls( line.lineCssClass );

    } else {
        ////shorter part of optimization
        nssvg.updatePolyline({
            pivots      : pivotsMedPos,
            svgel       : line.svgel,

            //todm apparent bug: rid of this line
            //'stroke-width' : line.finalStrokeWidth,

            //todm: this line is added to fix a bug: do
            //proofcheck does it break the legacy code:
            strokeWidth : line.finalStrokeWidth.toFixed(4),
        });
    }
    if( vectorTipIx || vectorTipIx === 0 ) {
        paintsVectorTips({ vectorTipIx, pivots, line, });
    }
    line.svgel$.tgcls( 'undisplay', haz( line, 'undisplay' ) );
    //updates pivots in line:
    line.pivots = [ pv0, pv1 ];

    //=================================================
    // //\\ draws line caption
    //=================================================
    //todm bad name: caption is too generic
    //hard to package-search
    var caption = haz( rgShape, 'caption' ) ||
                    haz( line, 'caption' ) || '';
    var fontSize = haz( rgShape, 'fontSize' ) || 20;

    var lposXSugar = 0.5;
    var lposYSugar = haz( rgShape, 'lposYSugar' );
    var lposYSugar = lposYSugar ||
        lposYSugar === 0 ? lposYSugar : -0.3;
    var pvs = pivotsMedPos,
    lposX = ( pvs[0][0] + pvs[1][0] ) / 2;
    lposY = ( pvs[0][1] + pvs[1][1] ) / 2;
    var dir = [ pvs[1][0] - pvs[0][0], pvs[1][1] - pvs[0][1] ];
    var segAngle = Math.atan2(
            dir[1] * sconf.MONITOR_Y_FLIP, //y, screen to model angle
            dir[0]
    );
    var leftNormAngle = segAngle + Math.PI/2;
    var SHIFT = has( rgShape, 'captionShiftNorm' ) ?
                    rgShape.captionShiftNorm : 18;

    var finalPosX = lposX + SHIFT * Math.cos( leftNormAngle )
                    - fontSize * lposXSugar;
    var finalPosY = lposY
        //eye to screen view
        + sconf.MONITOR_Y_FLIP * SHIFT * Math.sin( leftNormAngle )
        - fontSize * lposYSugar;

    if( !line.pointIsAlreadyDressed ) {
        line.pnameLabelsvg = nssvg.printText({
            text            : caption,
            stroke          : stroke, //line.pcolor,
            fill            : stroke, //line.pcolor,
            "stroke-width"  : haz( rgShape, "stroke-width" ) || 1,
            svgel           : line.pnameLabelsvg,
            parent          : stdMod.medScene,
            style           : {
                'font-size' : fontSize.toFixed() + 'px',
                'line-height' : '1',
                'font-size' : line.fontSize + 'px',
            },
        });
        line.pnameLabelsvg$ = $$.$( line.pnameLabelsvg )
            .cls( line.captionCssClass );
    } else {
        ////makes captin dynamic
        line.pnameLabelsvg.textContent = caption;
    }
    line.pnameLabelsvg$
        .aNS( 'x', finalPosX.toFixed()+'px' )
        .aNS( 'y', finalPosY.toFixed()+'px' )
        .tgcls( 'undisplay', haz( rg[ line.rgn ], 'undisplay' ) )
        ;
    line.pnameLabelsvg$.tgcls(
        'undisplay',
        haz( line, 'hideCaption' ) ||
        (
            !haz( line, 'displayAlways' ) &&
            ( haz( rg, 'allLettersAreHidden' ) ||
            haz( line, 'undisplay' ) )
        )
    );
    //=================================================
    // \\// draws line caption
    //=================================================
    line.pointIsAlreadyDressed = true;
    return line;
}

function paintsVectorTips({ vectorTipIx, pivots, line, }){
    let tipFraction = haz( line, 'tipFraction' );
    var TIP_FRACTION = Math.abs( tipFraction ) ||  0.2;
    var vectEnd = pivots[ vectorTipIx ].medpos;
    var vectStart = pivots[ (vectorTipIx+1)%2 ].medpos;
    var { abs, norm, unit } = mat.vector2normalOrts(
            [vectEnd[0]-vectStart[0], vectEnd[1]-vectStart[1]] );
    let tF = (TIP_FRACTION * abs ) || 1; //vector can be 0
    var tipLength =
            tipFraction ? tF :
            Math.min(
                //min is sensetive to diagram scale
                10 * sconf.medWidth * 0.0025, tF
            );
    var tipStart = abs-tipLength;
    var vecTipStart = [ vectStart[0] + unit[0] * tipStart,
                        vectStart[1] + unit[1] * tipStart ];
    var ARROW_TANGENT = tipFraction < 0 ?
        0.15 :
        line.finalStrokeWidth * 1.5 / tipLength;
    var tipHeight = Math.max( sconf.thickness*1.5,
                    tipLength * ARROW_TANGENT );
    var pivots = [
            [ vecTipStart[0] + norm[0]*tipHeight,
                vecTipStart[1] + norm[1]*tipHeight ],
            [ vecTipStart[0] - norm[0]*tipHeight,
                vecTipStart[1] - norm[1]*tipHeight ],
            vectEnd,
            //this point closes poly.
            [ vecTipStart[0] + norm[0]*tipHeight,
                vecTipStart[1] + norm[1]*tipHeight ],
    ];
    line.vectorArrowSvg = nssvg.polyline({
        svgel   : haz( line, 'vectorArrowSvg' ),
        parent  : stdMod.medScene,
        pivots,
        //'stroke-width' : strokeWidth * sconf.thickness,
    });
    let tipFill = haz( line, 'tipFill' );
    if( tipFill ) {
        line.vectorArrowSvg.style.fill = tipFill;
        line.vectorArrowSvg.style.stroke = tipFill;
    }
    line.vectorArrowSvg$ = $$.$(line.vectorArrowSvg)
        .tgcls( 'undisplay', haz( line, 'undisplay' ) )
        .cls( line.arrowCssClass + ' tofill' )
        ;
}

/*
//do rid of this function, when other function stabylizes
//
///makes short line name: AB from A and B
///returns: rg element
function str2line( rgn, rgShape ){ //rgn2lineSVG
    //all this fuss with pivotNames is for Prop1,2 non-standard
    //line names without comma,
    //there is no pivotNames param. in "normal lemma",
    var pns = haz( rg[rgn], 'pivotNames' );
    if( !pns ){
        if( rgn.indexOf( ',' ) > -1 ){
            ////legally built line name
            var splitToken = ',';
        } else if( rgn.length === 2 ){
            var splitToken = '';
        } else {
            throw new Error( 'ambiguous line pivots name = ' + rgn );
        }
        var pns = rgn.split( splitToken );
    } else if( !haz( rg, pns[0] )) {
        throw Error( 'Missed pivot name = ' + pns[0] );
    }
    const pivots = [ rg[ pns[0] ], rg[ pns[1] ] ];
    rgShape.pivots = rgShape.pivots || pivots;
    rgShape.rgn = rgShape.rgn || rgn;

    // //\\ overrides 'stroke-width'
    //      todo patch
    let strokeWidth = 2;
    if(sconf.sappId === "b1sec1lemma2" ||
        sconf.sappId === "b1sec1lemma3") {
        strokeWidth = 1;
    }
    let cssClass = haz( rgShape, 'cssClass' );
    rgShape[ 'stroke-width' ] =
        sn( 'stroke-width', rgShape, strokeWidth ),
    // \\// overrides 'stroke-width'


    rgShape.stroke = sn( 'stroke', rgShape, 'black' );
    return pivots_2_svgLineInRg( rgShape );
}
*/
//==============================================
// \\// creates svg-line or updates it if exists
//==============================================


///master function for polygons
//todo do streamline this rubbish: only
//for lemma4 and prop1
function namesArr_2_svgpoly(
    pNames,
    cssClass,
    correctJoin, //fix all lemmas and remove this par. then
    undisplay,   //optional
    tostroke,
){
    var CLOSED_POLYLINE = true;
    var rgn = pNames.join( correctJoin ? '--' : '');
    var pivots = pNames.map( rgn => rg[ rgn ].medpos );
    if( CLOSED_POLYLINE ) {
        pivots.push( pivots[0] );
    }

    //todm ... this is so complex bs. we have to modify legacy code
    tostroke = typeof tostroke === 'undefined' ?
                    'tostroke ' : (
                        tostroke ? 'tostroke ' : ''
                    );
    var attr =
    {
        cssClass        : tostroke + 'thickable' +
                            ( cssClass ? ' ' + cssClass : '' ),
        'stroke-width'  : 2,
    };
    var tpclass = sDomF.rgid2low(
                    ( haz( attr, 'tpclass' ) ) || rgn
    );
    var cssClass    = has( attr, 'cssClass' ) ? attr['cssClass'] + ' ' :  '';
    var stroke      = han( attr, 'stroke', sDomF.rgn0arrc_2_rgba( tpclass ) );
    var strokeWidth = han( attr, 'stroke-width', 1 );
    var poly        = toreg( rgn )();
    if( typeof undisplay !== 'undefined' && undisplay !== null ) {
        //was a bug
        poly.undisplay = undisplay;
    }
    poly.rgn      = rgn;
    //c cc( 'master function for polygons, pNames=', pNames );
    poly.pivotNames = pNames.concat(); //clones array
    poly.pNames     = pNames;
    poly.poly_2_updatedPolyPos8undisplay =
        poly_2_updatedPolyPos8undisplay;
    poly.cssClass = cssClass + 'tp-' + tpclass;
    poly.svgel = nssvg.polyline({
        svgel   : haz( poly, 'svgel' ),
        stroke,
        parent  : stdMod.medScene,
        pivots,
        'stroke-width' : strokeWidth * sconf.thickness,
    });
    poly.svgel$ = $$.$(poly.svgel)
        .tgcls( 'undisplay', haz( poly, 'undisplay' ) )
        .cls( poly.cssClass )
        ;
    return poly;
}
//==============================================
// \\// Adds DOM and decorations to pointRack
//==============================================

///Used only in prop 1 and 2.
///This paints green free Kepler triangles, and
///had to be called after media_upcreate_basic to refresh
///these triangles after media rescaled,
///
///api: if poly is not supplied, then it must be "this",
///does update "undisplay",
///switch poly.UPDATE_MPOS_BEFORE_POLY does update mpos before pivots
function poly_2_updatedPolyPos8undisplay( poly, ) {
    poly = poly || this;
    var CLOSED_POLYLINE = true;
    var pNames = poly.pNames;
    if( poly.UPDATE_MPOS_BEFORE_POLY ) {
        let modpos2medpos = ssF.modpos2medpos;
        pNames.forEach( rgn =>
            { rg[ rgn ].medpos = modpos2medpos( rg[ rgn ].pos ) } );
    }
    var pivots = pNames.map( rgn => rg[ rgn ].medpos );
    if( CLOSED_POLYLINE ) {
        pivots.push( pivots[0] );
    }
    poly.svgel = nssvg.polyline({
        svgel   : poly.svgel,
        pivots,
    });
    poly.svgel$.tgcls( 'undisplay', haz( poly, 'undisplay' ) );
}

//==========================================
// //\\ paints svg triangles
//==========================================
///Input:   triang = rg[ triangleId ]
///         triang.vertices
///         cssCls can be for 'logic_phase--proof'
function paintTriangle( triangleId, cssCls, tpclass, defaultFill ){
    var triang = rg[ triangleId ];
    var modpos2medpos = ssF.modpos2medpos;
    var vertices = triang.vertices.map( pos => {
        return modpos2medpos( pos, );
    });
    var dressed = ownProp.call( triang, 'shapeIsAlreadyDressed' );
    if( !dressed ) {
        triang.mscene = stdMod.medScene; //todo rid of this prop?
        var svgarg = {
            pivots  : vertices,
            svgel   : triang.svgel,
            parent  : triang.mscene,
        };
        if( defaultFill ) {
            svgarg.fill = defaultFill;
        }

        //important: use triang.svgel = ...
        //           not like triang.mediael = ...
        triang.svgel = nssvg.polyline( svgarg );
        triang.svgel$ = $$.$( triang.svgel );

        var tpclass = sDomF.rgid2low( tpclass || triangleId );
        cssCls = cssCls ? ' ' + cssCls: '';
        $$.$( triang.svgel ).cls( 'tp-' + tpclass +' tofill' + cssCls );
    } else {
        nssvg.updatePolyline({
                pivots : vertices,
                svgel : triang.svgel,
                fill : defaultFill,
                //strokeWidth, //stroke-width
        });
    }
    triang.shapeIsAlreadyDressed = true;
    triang.svgel$.tgcls( 'undisplay', haz( triang, 'undisplay' ) );
    return triang;
}
//==========================================
// \\// paints svg triangles
//==========================================
})();
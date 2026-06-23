(function(){

const {
    sn, $$, nsmethods, han, haz, has, mat, nspaste, nssvg,
    sconf, ssF, ssD, sDomF, lowrgid_2_glocss8anchorRack,
    rg, toreg, stdMod, amode,
} = window.b$l.atree({ ssFList : {
        pivots_2_svgLineInRg,
        str2line,
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
///         rgid - kname of line in rg,
///         pivots - as in args or in rg[ rgid ], specifically:
///                     pivots[0].medpos, pv1.medpos
///
///     optional:
///         line as toreg( rgid )
///         lineAttr.stroke
///         lineAttr[ 'stroke-width' ]
///         lineAttr.cssClass
///         lineAttr.tpclass
///
///     used external:
///         sconf.thickness
///
/// Output: adds pivots-media-positions to line
function pivots_2_svgLineInRg( rgid, pivots, lineAttr ){
    var lineAttr    = lineAttr || {};
    var line        = toreg( rgid )();
    pivots          = pivots || haz( line, 'pivots' );
    var vectorTipIx = haz( line, 'vectorTipIx' );
    if( has( line, 'stroke-width' )){
        line.finalStrokeWidth = line['stroke-width'];
    } else {
    var strokeWidth = han( lineAttr, 'stroke-width', 1 );
    line.finalStrokeWidth = strokeWidth * (sconf.thickness || 1);
    }
    let pv0 = pivots[0];
    let pv1 = pivots[1];
    if( haz( pv0, 'unscalable' ) ) {
        pv0.medpos = ssF.modpos2medpos_original( pv0.pos );
    } else if( !has(pv0, 'medpos' ) ) {
        pv0.medpos = ssF.modpos2medpos( pv0.pos );
    }
    if( haz( pv1, 'unscalable' ) ) {
        pv1.medpos = ssF.modpos2medpos_original( pv1.pos );
    } else if( !has(pv1, 'medpos' ) ) {
        pv1.medpos = ssF.modpos2medpos( pv1.pos );
    }
    var pivotsMedPos= [ pv0.medpos, pv1.medpos ];

    //this is a wrong place for changing a model of a
    //line interval, so removing from media manager:
    //line.vector = mat.p1_to_p2(pv0,pv1);

    ///this property helps to optimize svg painting
    var dressed = haz( line, 'pointIsAlreadyDressed' );
    if( !dressed ) {
        ////longer part of optimization: creates svg
        var tpclass = sDomF.rgid2low(
            ( haz( lineAttr, 'tpclass' ) ) || rgid
        );
        var stroke = haz( line, 'pcolor' ) ||
            han( lineAttr, 'stroke',
            sDomF.rgid0arrc_2_rgba( tpclass ));
        //==================================================
        // //\\ class
        //==================================================
        var finalTp         = haz( line, 'notp' ) ? 'notp-' : 'tp-';
        var bareCssClass = has( lineAttr, 'cssClass' ) ?
                            lineAttr['cssClass'] + ' ' :  '';
        bareCssClass += ' ' + finalTp + tpclass;
        //cleans up from rubbish from other settings:
        line.bareCssClass = bareCssClass
            .replace( /thickable/g, '' )
            .replace( /tostroke/g, '' )
            .replace( /tobold/g, '' )
            .replace( /tofill/g, '' )
        ;
        line.lineCssClass = stripsExtraSpace(
            line.bareCssClass + ' ' + 'thickable tostroke');
        line.arrowCssClass = stripsExtraSpace(
            line.bareCssClass + ' ' +
            'thickable tostroke tostroke tofill');
        line.captionCssClass = stripsExtraSpace(
            line.bareCssClass + ' tobold tofill hover-width');
        //==================================================
        // \\// class
        //==================================================
        line.rgid = rgid;
        ///patch for lemma 4 for lines aka
        //leftbar-1-left-bottom,leftbar-1-right-bottom pivotNames
        if( has( pv0, 'rgid' ) && has( pv1, 'rgid' )){
            line.pivotNames     = [ pv0.rgid, pv1.rgid ];
        } else {
            //patch for lemma 4
            sn( 'pivotNames', line. null );
        }
        var argsvg = {
            svgel   : haz( line, 'svgel' ),

            parent  : stdMod.medScene,
            //todm everywhere in this module:
            //parent  : stdMod.medScene,

            pivots      : pivotsMedPos,
            'stroke-width' : line.finalStrokeWidth.toFixed(4),
            'stroke-linecap' : 'round'
        }
        ///shapes without rgid presribed in Topics do
        ///paint colors in own atributes
        var low_tpID = nsmethods.rgid2low( rgid );
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
    var caption = haz( lineAttr, 'caption' ) ||
                    haz( line, 'caption' ) || '';
    var fontSize = haz( lineAttr, 'fontSize' ) || 20;

    var lposXSugar = 0.5;
    var lposYSugar = haz( lineAttr, 'lposYSugar' );
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
    var SHIFT = has( lineAttr, 'captionShiftNorm' ) ?
                    lineAttr.captionShiftNorm : 18;

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
            "stroke-width"  : haz( lineAttr, "stroke-width" ) || 1,
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
        .tgcls( 'undisplay', haz( rg[ line.rgid ], 'undisplay' ) )
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

///makes short line name: AB from A and B
///returns: rg element
function str2line( str, cssClass, lineAttr, caption, ){
    //all this fuss with pivotNames is for Prop1,2 non-standard
    //line names without comma,
    //there is no pivotNames param. in "normal lemma",
    var pns = haz( rg[str], 'pivotNames' );
    if( !pns ){
        if( str.indexOf( ',' ) > -1 ){
            ////legally built line name
            var splitToken = ',';
        } else if( str.length === 2 ){
            var splitToken = '';
        } else {
            throw new Error( 'ambiguous line pivots name = ' + str );
        }
        var pns = str.split( splitToken );
    } else if( !haz( rg, pns[0] )) {
        throw Error( 'Missed pivot name = ' + pns[0] );
    }
    const pivots = [ rg[ pns[0] ], rg[ pns[1] ] ];
    let strokeWidth = 2;
    if(sconf.sappId === "b1sec1lemma2" ||
        sconf.sappId === "b1sec1lemma3") {
        strokeWidth = 1;
    }
    //====================================
    // //\\ class
    //====================================
    //todm really a mess
    let cl1 = haz( lineAttr, 'cssClass' );
    let cl2 = cssClass;
    let cl3 = haz( rg[str], 'cssClass' );
    cssClass = (cl1 + ' ' + cl2 + ' ' + cl3);
    //====================================
    // \\// class
    //====================================
    var lineAttrPassed = {
        cssClass,
        'stroke-width'  : sn( 'stroke-width', lineAttr, strokeWidth ),
                            // most model lines
        stroke          : sn( 'stroke',   lineAttr, 'black' ),
        caption         : caption || haz( lineAttr, 'caption' ),
    };
    ///todm: this code is extremely non-automated:
    if( has( lineAttr, 'captionShiftNorm' ) ) {
        lineAttrPassed.captionShiftNorm =
            lineAttr.captionShiftNorm;
    }
    lineAttrPassed.lposYSugar = haz( lineAttr, 'lposYSugar' );
    return pivots_2_svgLineInRg(
        str,
        pivots,
        lineAttrPassed,
    );
}
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
    var rgid = pNames.join( correctJoin ? '--' : '');
    var pivots = pNames.map( rgid => rg[ rgid ].medpos );
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
                    ( haz( attr, 'tpclass' ) ) || rgid
    );
    var cssClass    = has( attr, 'cssClass' ) ? attr['cssClass'] + ' ' :  '';
    var stroke      = han( attr, 'stroke', sDomF.rgid0arrc_2_rgba( tpclass ) );
    var strokeWidth = han( attr, 'stroke-width', 1 );
    var poly        = toreg( rgid )();
    if( typeof undisplay !== 'undefined' && undisplay !== null ) {
        //was a bug
        poly.undisplay = undisplay;
    }
    poly.rgid      = rgid;
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
        pNames.forEach( rgid =>
            { rg[ rgid ].medpos = modpos2medpos( rg[ rgid ].pos ) } );
    }
    var pivots = pNames.map( rgid => rg[ rgid ].medpos );
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
function paintTriangle( triangleId, cssCls, tpclass, defaultFill, )
{
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
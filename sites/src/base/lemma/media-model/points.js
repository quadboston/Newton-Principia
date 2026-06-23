(function(){

const {
    sn, $$, nsmethods, nspaste, haz, has, han, nssvg, eachprop,
    sconf, amode, sDomF, sDomN, ssF, ssD, rg, toreg,
    lowrgid_2_glocss8anchorRack, stdMod, pntRgid2rgx,
} = window.b$l.atree({ ssFList: {
        pos2pointy,
        //more sensible alias
        rgxpoint2updatedSvg : pos2pointy,
        doPaintPoints,
    },
});

//unlucky name: must be aka ssF.rgPos2svgPoint
var ownProp = Object.prototype.hasOwnProperty;
const stripsExtraSpace = nsmethods.stripsExtraSpace;
return;


//==============================================
// //\\ Adds DOM and decorations to pointRack
//      creates or modifies svg-dom
//==============================================
///Input:
///       required
///         rgid - name of rg-namespace-rack
///         rg[ rgid ].pos - must exist
///       optional:
///         attrs, 'tpclass',
///         haz( pt, 'svgel' )
///         attrs: see below: //optional attrs
///Does:  main thing is adding coordinates converted
///       from model space to media-space
///       pt.medpos = //mod 2 inn//
///Twins: doesPaintPointCaption( rgid )
///       which does more work for this function
///Returns: rg[ rgid ]
function pos2pointy( rgid, attrs, ){
    attrs = attrs || {};
    var pt = rg[ rgid ];
    //if points are flagged as 'unscalable', then
    //they are immune to scaling when user scales diagram with mouse
    pt.medpos = haz( pt, 'unscalable' ) ?
        ssF.modpos2medpos_original( pt.pos, ) : ssF.modpos2medpos( pt.pos );
    var dressed = haz( pt, 'pointIsAlreadyDressed' );
    if( !dressed ){
        ////long, initial version of pos2pointy
        pt.rgid  = rgid;
        //------------------------------------------
        // //\\ point color
        //------------------------------------------
        pt.fill = haz( pt,'pcolor') ||
                  han( attrs, 'fill', //todm needed?
                  sDomF.rgid0arrc_2_rgba( tpclass ) );
        pt.stroke = pt.fill; //todm .opaqueColor
        sn( 'style', pt ).fill = pt.fill
        pt.style.stroke = pt.stroke;
        if( haz( pt, 'doWhiteKernel' ) &&
            !haz( pt, 'noKernel' )
        ){
            pt.style.fill = 'white';
            pt.style.stroke = pt.stroke;
        }
        //------------------------------------------
        // \\// point color
        //------------------------------------------
        ///todm scenario of thickness is messy
        pt.initialStrokeWidth   = han( pt, 'stroke-width',
            han( attrs, 'stroke-width',
                 sconf.pointDecoration['stroke-width']
            ));
        pt.initialR = han( pt, 'initialR', han( attrs, 'r',
                           sconf.pointDecoration.r ) );
        pt.media = stdMod.medScene;
        pt.svgel = null;
        var argsvg = {
            rgX: pt,
            svgel   : null,
            parent  : pt.media,
            type    : 'circle',
            'stroke-width':
                ( pt.initialStrokeWidth * sconf.thickness ) ||
                             sconf.pointDecoration['stroke-width'],
            cx : pt.medpos[0],
            cy : pt.medpos[1],
            r  : pt.initialR * sconf.thickness,
            style : pt.style,
        };

        /*
        ///shapes without rgid presribed in Topics do
        ///paint colors in own attributes
        var low_tpID = nsmethods.rgid2low( rgid );
        var tpactive = haz( lowrgid_2_glocss8anchorRack, low_tpID );
        if( !tpactive ) {
            argsvg.fill = pt.fill;
            argsvg.stroke = pt.stroke;
        };
        */
        pt.svgel = nssvg.u( argsvg );
        var svgel$ = pt.svgel$;
        pt.svgel$.css( 'fill-opacity', '1' );

        //==================================================
        // //\\ class
        //==================================================
        var tpclass = nsmethods.rgid2low(
            ( haz( attrs, 'tpclass' ) ) || rgid
        );
        let cssClass =
            (
                ( haz( attrs, 'cssClass' ) || '' ) + ' ' +
                ( haz( pt, 'cssClass' ) || '' )
            )
            .replace( /thickable/g, '' )
            .replace( /tostroke/g, '' )
            .replace( /tobold/g, '' )
            .replace( /tofill/g, '' );
        //removes duplicates
        cssClass += ' tostroke thickable tofill';
        var finalTp = haz( pt, 'notp' ) ? 'notp' : 'tp';
        cssClass = stripsExtraSpace(
            cssClass + ' ' + finalTp + '-' +  tpclass);
        pt.captionCssClass = stripsExtraSpace(
            (cssClass + ' tobold' )
            .replace( /thickable/g, '' )
            .replace( /tostroke/g, '' ));
        pt.svgel$.cls(cssClass);
        //==================================================
        // \\// class
        //==================================================
    } else {
        ////optimized, updating version of pos2pointy
        pt.svgel$.a( 'stroke-width',
            pt.initialStrokeWidth * sconf.thickness )
            .a( 'cx', pt.medpos[0] )
            .a( 'cy', pt.medpos[1] )
            .a( 'r', pt.initialR * sconf.thickness );
    }
    if( has( pt, 'undisplayAlways' ) ){
        //good but may be corrupts legacy lemmas
        //pt.undisplay = true; //fixes hiding of letters
        pt.svgel$.tgcls( 'undisplay', pt.undisplayAlways );
    } else {
        pt.svgel$.tgcls( 'undisplay',
            !haz( pt, 'displayAlways' ) && haz( pt, 'undisplay' )
        );
    }
    pt.pointIsAlreadyDressed = true;
    return pt;
}
//==============================================
// \\// Adds DOM and decorations to pointRack
//==============================================

///-----------------------------------------------
/// paints latin letters for points
///-----------------------------------------------
function doesPaintPointCaption( rgid ){
    var rgX = rg[ rgid ];
    if( rgX.doPaintPname && rgX.caption !== '' ) {
        var lpos = rgX.medpos.concat([]);
        var lposX = rgX.letterOffsetX + rgX.medpos[0];
        var lposY = rgX.letterOffsetY + rgX.medpos[1];
        var strokeCol = haz( rgX, 'letterColor' ) ||
                        rgX.opaqueColor || 'black';
        var fillCol = haz( rgX, 'letterColor' ) ||
                      rgX.opaqueColor || 'black';
        var txtstyle = {
            'font-size': rgX.fontSize.toFixed() + 'px',
            'line-height': '1',
            stroke: strokeCol,
            fill: fillCol,
        };
        var lposX_rounded = lposX.toFixed();
        var lposY_rounded = lposY.toFixed();
        rgX.pnameLabelsvg = nssvg.printText({
            //tpclass         : '', //apparently non-used
            text            : rgX.caption || rgid,
            "stroke-width"  : 1,
            svgel           : rgX.pnameLabelsvg,
            parent          : stdMod.medScene,
            x               : lposX_rounded + 'px',
            y               : lposY_rounded + 'px',
            style           : txtstyle,
        });
        //no special rgX for the label itself
        rgX.pnameLabelsvg$ = $$.$( rgX.pnameLabelsvg );

        //----------------------------------
        // //\\ textLineTurn can be applied ...
        //      https://developer.mozilla.org
        //      /en-US/docs/Web/SVG/Attribute/transform
        //----------------------------------
        var textLineTurn = haz( rgX, 'textLineTurn' );
        if( textLineTurn ) {
            rgX.pnameLabelsvg$.a( 'transform',
                'rotate(' +
                textLineTurn + ',' + lposX_rounded + ',' +
                lposY_rounded + ' )'
            );
        }
        //------------------------------------
        // \\// textLineTurn can be applied ...
        //------------------------------------
        rgX.pnameLabelsvg$.tgcls(
            'undisplay',
            rgX.hideCaption ||
            (
                !haz( rgX, 'displayAlways' ) &&
                ( haz( rg, 'allLettersAreHidden' ) ||
                haz( rgX, 'undisplay' ) )
            )
        );
        rgX.pnameLabelsvg$
            .e( 'mouseover', ()=>{
                let me = rgX.pnameLabelsvg;
                me.style.cursor =
                    //wrong: me.parentNode.style.cursor;
                    stdMod.medParent.style.cursor;
            })
            .addClass( rgX.captionCssClass )
            //makes all points labels tp - boldable :
            .addClass( 'tobold' );
    } else {
        ////bug fix: June 3, 2021
        const lsvg$ = haz( rgX, 'rgX.pnameLabelsvg$' );
        lsvg$ && lsvg$.tgcls( 'undisplay', true );
    }
}

///-------------------------------------------------
/// for points, updates their svg
///-------------------------------------------------
function doPaintPoints (){
    //todo two cooks on the same pot: p2p and rgx.draggedX
    const keys = Object.keys( pntRgid2rgx );
    if( keys.length === 0 ) return;
    keys.forEach( rgid => {
        ssF.rgxpoint2updatedSvg( rgid, sconf.pointDecoration );
        doesPaintPointCaption( rgid );
    });
}
})();


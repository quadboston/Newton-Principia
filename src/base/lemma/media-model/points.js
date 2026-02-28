(function(){
var {
    sn, $$, nsmethods, haz, has, han, nssvg, eachprop,
    sconf, sDomF, sDomN, ssF, ssD, lowtpid_2_glocss8anchorRack, rg, toreg,
    stdMod, amode, pntRgid2rgx,
} = window.b$l.apptree({
    ssFExportList :
    {
        pos2pointy,
        //more sensible alias
        rgxpoint2updatedSvg : pos2pointy,
        doPaintPoints,
        doesPaintPointCaption,
    },
});

//unlucky name: must be aka ssF.rgPos2svgPoint
var ownProp = Object.prototype.hasOwnProperty;
return;


//==============================================
// //\\ Adds DOM and decorations to pointRack
//      creates or modifies svg-dom
//==============================================
///Input:
///       required
///         shpid - name of rg-namespace-rack
///         rg[ shpid ].pos - must exist
///       optional:
///         attrs, 'tpclass',
///         haz( pt, 'svgel' )
///         attrs: see below: //optional attrs
///Does:  main thing is adding coordinates converted
///       from model space to media-space
///       pt.medpos = //mod 2 inn//
///Twins: doesPaintPointCaption( shpid )
///       which does more work for this function
///Returns: rg[ shpid ]
function pos2pointy( shpid, attrs, ){
    attrs = attrs || {};
    var pt = rg[ shpid ];
    //if points are flagged as 'unscalable', then
    //they are immune to scaling when user scales diagram with mouse
    pt.medpos = haz( pt, 'unscalable' ) ?
        ssF.modpos2medpos_original( pt.pos, ) : ssF.modpos2medpos( pt.pos );
    var dressed = haz( pt, 'pointIsAlreadyDressed' );
    if( !dressed ){
        ////long, initial version of pos2pointy
        //c cc( 'dressing' + shpid );
        var tpclass = nsmethods.tpid2low(
            ( haz( attrs, 'tpclass' ) ) || shpid
        );
        var cssClass = has( attrs, 'cssClass' ) ?
            attrs['cssClass'] + ' ' : '';
        if( has( pt, 'classmark' ) ){
            cssClass += pt.classmark + ' ';
        }
        pt.shpid                = shpid;
        //optional attrs
        pt.stroke               = haz( pt, 'stroke' ) ||
                                  haz( attrs, 'stroke' ) ||
                                  pt.pcolor ||
                                  sDomF.tpid0arrc_2_rgba( tpclass );
        if( haz( pt, 'doWhiteKernel' ) &&
            !haz( pt, 'noKernel' )
        ){
            sn( 'style', pt ).fill = 'white';
            pt.style.stroke = pt.stroke;
        }
        pt.fill = haz( pt, 'fill' ) || han( attrs, 'fill',
                  sDomF.tpid0arrc_2_rgba( tpclass ) );
        pt.initialStrokeWidth   = han( pt, 'stroke-width',
            han( attrs, 'stroke-width',
                 sconf.pointDecoration['stroke-width']
            ));
        pt.initialR = han( pt, 'initialR', han( attrs, 'r',
                           sconf.pointDecoration.r ) );
        pt.media = stdMod.medScene;
        pt.svgel = null;

        var argsvg = {
            svgel   : pt.svgel,
            parent  : pt.media,
            type    : 'circle',
            'stroke-width':
                ( pt.initialStrokeWidth * sconf.thickness ) ||
                             sconf.pointDecoration['stroke-width'],
            cx : pt.medpos[0],
            cy : pt.medpos[1],
            r  : pt.initialR * sconf.thickness,
            style : haz(pt, 'style'),
        };

        ///shapes without shpid presribed in Topics do
        ///paint colors in own attributes
        var low_tpID = nsmethods.tpid2low( shpid );
        var tpactive = haz( lowtpid_2_glocss8anchorRack, low_tpID );
        if( !tpactive ) {
            argsvg.fill = pt.fill;
            argsvg.stroke = pt.stroke;
        };
        pt.svgel = nssvg.u( argsvg );
        var svgel$ = pt.svgel$ = $$.$( pt.svgel );

        //todm patch which overrides tp-opacity model for points only,
        //but patches only for lemmas covered with this
        //subroutine and this patch,
        svgel$().style[ 'fill-opacity' ] = '1';
        var finalTp = haz( pt, 'notp' ) ? 'notp' : 'tp';
        var wwClass = cssClass + finalTp + '-' +  tpclass;
        pt.svgel.setAttributeNS( null, 'class', wwClass );
    } else {
        ////optimized, updating version of pos2pointy
        var svgel= pt.svgel;
        svgel.setAttributeNS( null, 'stroke-width',
            pt.initialStrokeWidth * sconf.thickness );
        svgel.setAttributeNS( null, 'cx', pt.medpos[0] );
        svgel.setAttributeNS( null, 'cy', pt.medpos[1] );
        svgel.setAttributeNS( null, 'r',
            pt.initialR * sconf.thickness );
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
function doesPaintPointCaption( shpid, ){
    var rgX = rg[ shpid ];
    if( rgX.doPaintPname && rgX.caption !== '' ) {
        var lpos = rgX.medpos.concat([]);
        var lposX = rgX.letterOffsetX + rgX.medpos[0];
        var lposY = rgX.letterOffsetY + rgX.medpos[1];
        var strokeCol = haz( rgX, 'letterColor' ) ||
                        rgX.pcolor || 'black';
        var fillCol = haz( rgX, 'letterColor' ) ||
                      rgX.pcolor || 'black';
        var txtstyle = {
                'font-size' : rgX.fontSize.toFixed() + 'px',
                'line-height' : '1',
                stroke        : strokeCol, //fix
                fill          : fillCol,
        };
        var lposX_rounded = lposX.toFixed();
        var lposY_rounded = lposY.toFixed();
        rgX.pnameLabelsvg = nssvg.printText({
            //tpclass         : '', //apparently non-used
            text            : rgX.caption || shpid,
            //stroke          : strokeCol,
            //fill            : fillCol,
            "stroke-width"  : 1,
            svgel           : rgX.pnameLabelsvg,
            parent          : stdMod.medScene,
            x               : lposX_rounded + 'px',
            y               : lposY_rounded + 'px',
            style           : txtstyle,
        });

        //----------------------------------
        // //\\ textLineTurn can be applied ...
        //      https://developer.mozilla.org
        //      /en-US/docs/Web/SVG/Attribute/transform
        //----------------------------------
        var textLineTurn = haz( rgX, 'textLineTurn' );
        if( textLineTurn ) {
            rgX.pnameLabelsvg.setAttribute(
                'transform', 'rotate(' +
                textLineTurn + ',' + lposX_rounded + ',' +
                lposY_rounded + ' )'
            );
        }
        //------------------------------------
        // \\// textLineTurn can be applied ...
        //------------------------------------
        let $$$svg = $$.$( rgX.pnameLabelsvg );
        $$$svg.tgcls(
            'undisplay',
            rgX.hideCaption ||
            (
                !haz( rgX, 'displayAlways' ) &&
                ( haz( rg, 'allLettersAreHidden' ) ||
                haz( rgX, 'undisplay' ) )
            )
        );
        rgX.pnameLabelsvg.addEventListener( 'mouseover', ()=>{
            let me = rgX.pnameLabelsvg;
            me.style.cursor =
                //wrong: me.parentNode.style.cursor;
                stdMod.medParent.style.cursor;
        });

        let txtclass = haz( rgX, 'classmark' );
        if( txtclass ) {
            $$$svg.addClass( txtclass );
        }
        //make tp - boldable all points labels:
        $$$svg.addClass( 'tobold' );
        /*
        fails:
        if( has( rgX, 'hideCaption' ) ) {
            var undisp = rgX.hideCaption;
        } else {
            var undisp =
            (
                !haz( rgX, 'displayAlways' ) &&
                ( haz( rg, 'allLettersAreHidden' ) ||
                haz( rgX, 'undisplay' ) )
            )
        }
        */

    } else {
        ////bug fix: June 3, 2021
        var wwSvg = haz( rgX, 'pnameLabelsvg' );
        $$.$( wwSvg ).tgcls( 'undisplay', true );
        /*
        rgX.hideCaption ||
        (
            !haz( rgX, 'displayAlways' ) &&
            ( haz( rg, 'allLettersAreHidden' ) ||
            haz( rgX, 'undisplay' ) )
        )
        */
    }
}

///-------------------------------------------------
/// for points, updates their svg
///-------------------------------------------------
function doPaintPoints (){
    //todo two cooks on the same pot: p2p and rgx.draggedX
    const keys = Object.keys( pntRgid2rgx );
    if( keys.length === 0 ) return;
    keys.forEach( shpid => {
        ssF.rgxpoint2updatedSvg( shpid );
        doesPaintPointCaption( shpid );
    });
}
})();


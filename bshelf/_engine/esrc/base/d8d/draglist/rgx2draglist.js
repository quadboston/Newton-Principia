//todm: apparently vital to merge this module with proper s ubmodel
{
const {
        $$, sn, haz, has, haff, haf, nspaste, stripp,
        toreg, ssF, sconf, fconf, stdMod, sDomF, amode,
    } = window.b$l.atree({sDomFExportList:{rgx2draglist}});

///===================================================
/// attaches to rgShape (rgX) dragging methods and
/// pushes rgX to dragList array
/// see //API below
///     this AIP honors rgX own methods if any
///         rgX.processOwnDownEvent
///         rgX.processOwnUpEvent
///            rgX === this
///     this.achievedtop.achieved will be created by
///     d8d framework
///     ???does this make medpos? - no.
///===================================================
function rgx2draglist(argo){ var {
        rgn,
        acceptPos,
        orientation,
        nospinner,
        pos,
    } = stripp(argo);

    var rgX = ssF.upd__pos_medpos_rgn2rgx({ rgn, pos });
    //rgn can be missed in tp-elected, trying pcolor first
    rgX.pcolor = rgX.pcolor || sDomF.rgn0arrc_2_rgba( rgX.rgn );
    rgX.doWhiteKernel = true;
    rgX.acceptPos = acceptPos || rgX.acceptPos || ( _=>true );
    rgX.processMoveEvent_IV = rgX.processMoveEvent_IV ||
        processMoveEvent_IV;
    rgX.processDownEvent_IV = processDownEvent_IV;
    rgX.processUpEvent_IV = processUpEvent_IV;
    orientation = orientation ||
        ( haz( rgX, 'draggableY' ) && haz( rgX, 'draggableX' ) ?
            'rotate' :
            ( haz( rgX, 'draggableY' ) ? 'axis-y' :
                haz( rgX, 'draggableX' ) ? 'axis-x' : ''
            )
        );
    stdMod.dragList.push(
        ( function( lemmaD8D ) {
            //only for debug purposes
            //rgX.spinnerClsId = 'shape-' +
            //    sDomF.rgid2low( rgX.rgn ) + '-slider';
            rgX.dragDecorColor = haz( rgX, 'dragDecorColor' ) ||
                rgX.pcolor || 'black';
            lemmaD8D.pointWrap_2_dragWraps({
                pointWrap: rgX,
                cbDownMoveUp_III: ssF.cbDownMoveUp_III__from_user,
                orientation,
                nospinner,
            });
         }));
    return rgX;
}

function processMoveEvent_IV(
    //see: pWrap.processMoveEvent_IV(
    //"fullMoveInsideMathModel",
    //is in model units except for media-mover(-as-a-whole)
    dragMove,  //possibly upside down along vertical axis

    //possibly in media units, not im model units,
    mouseOnSurf
){
    if( haz( sconf, 'dragHidesPictures' ) ){
        sDomF.shows_book_picture();
    }
    if( has( this, 'mediaMover' ) ) {
        //// non-ordinary case:
        //// dragging model as a whole "inside media"
        //sconf.medposOfModOrigin_x - original position remains intact
        //sconf.medposOfModOrigin_x - moves as user does "move model origin"
        sconf.medposOfModOrigin_x = this.achievedtop.achieved[0] + dragMove[0];
        sconf.medposOfModOrigin_y = this.achievedtop.achieved[1] + dragMove[1];

        this.medpos[0] = mouseOnSurf[0];
        this.medpos[1] = mouseOnSurf[1];
        this.svgel.setAttributeNS( null, 'cx', this.medpos[0] );
        this.svgel.setAttributeNS( null, 'cy', this.medpos[1] );
        stdMod.model8media_upcreate();
        return;
    }
    //// ordinary case
    //// dragging ordinary model point
    var newPos = [
        this.achievedtop.achieved[0] + dragMove[0],
        //"fullMoveInsideMathModel"
        this.achievedtop.achieved[1] - dragMove[1],
    ];
    var accepted = this.acceptPos( newPos, dragMove );
    if( accepted ) {
        nspaste( this.pos, newPos );
        haf( this, 'processOwnMoveEent' )();
        stdMod.model8media_upcreate();
    }
}

///must be in contex of pointWrap ( like this = rg.B )
function processDownEvent_IV( arg ){
    if( haz( this, 'mediaMover' ) ) {
        //// non-ordinary case:
        this.hideD8Dpoint = false;
        $$.$( this.svgel ).tgcls( 'undisplay', false );

        var mscale = sDomF.dom2med();
        this.medpos = sDomF.pos_dom2med( arg.point_on_dragSurf );
        this.svgel.setAttributeNS( null, 'cx', this.medpos[0] );
        this.svgel.setAttributeNS( null, 'cy', this.medpos[1] );
        if( haz( arg.dragWrap, 'decPoint' ) ) {
            $$.$( arg.dragWrap.decPoint )
                .css( 'display', 'block' );
        }
        stdMod.medParent.style.cursor = 'grabbing';
    } else {
        if( this.sliderAnimationStarted ) return true;
        //// ordinary case
        //// DOES A SURPRISE: changes the type of
        //// this.achieved.achieved
        //// from object to array:
        this.achievedtop.achieved = nspaste( [], this.pos );
    }
    //already done on low level of d8d-framework
    //$$.$( arg.dragWrap.decPoint ).addClass( 'grabbing' );
    haff( this, 'processOwnDownEvent' );
}

function processUpEvent_IV( arg ){
    if( haz( this, 'mediaMover' ) ) {
        this.achievedtop.achieved[ 0 ] = sconf.medposOfModOrigin_x;
        this.achievedtop.achieved[ 1 ] = sconf.medposOfModOrigin_y;
        //// non-ordinary case:
        this.undisplay = true;
        this.hideD8Dpoint = true;
        $$.$( this.svgel ).tgcls( 'undisplay', true );
        $$.$( this.svgel ).removeClass( 'grabbing' );
        if( haz( arg.dragWrap, 'decPoint' )) {
            $$.$( arg.dragWrap.decPoint ).css( 'display', 'none' );
        }
        //vital to toggle grab from grabbing:
        stdMod.medParent.style.cursor = 'grab';
    }
    haff( this, 'processOwnUpEvent' );
    stdMod.model8media_upcreate(); //capital update, todo: check
}
}
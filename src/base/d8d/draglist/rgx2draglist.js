/*
    ///draglist tree
    in default init_app, this only populates draglist, but not
        initializes it:
        eachprop( rg, (shape,shpid) => {
            sDomF.rgx2draglist({

    sDomF.rgx2draglist: //typical draggers collector used in lemmas
                        //and in default init_app

        //dragList is a list of functions,
        //the nature of functions depends on lemma,
        stdMod.dragList.push(

            ///this function is delayed till draglist initialization,
            ///so we can do anything with rgX till then,
            ( function( lemmaD8D ) {

                lemmaD8D.pointWrap_2_dragWraps( argc );
                    ////this thing populates lemmaD8D draggees from
                    //// rgX (=== pointWrap)
                    ////    and stacks draggees in dragWraps

    dragWrap (drag unit) does not enter deviceD8D,
    instead it is searched and found after
    "down" event, then its finish_DownMoveUp method keeps executing ( and returning
    feedback to deviceD8D via ? cbDownMoveUp, for example for "down" event ):
        cbDownMoveUp
        var appFeedback = elected_dragWrap.wrap_DownMoveUp({

    lemmaD8D exchanges info with deviceD8D via lemma's cbDownMoveUp,
    inside this callback there is a call to wrap_DownMoveUp --> finish_DownMoveUp(),
    finish_DownMoveUp() belongs to rgX.
        it can return appFeedback = 'do disappear d8d' to stop dragging at
        deviceD8D level, but as of Jan, 2026 this feature is not implemented.
*/
//todm: apparently vital to merge this module with proper s ubmodel
(function(){
const {
    $$, sn, haz, has, haff, nspaste,
    toreg, ssF, sconf, fconf,
    stdMod, sDomF, sDomN, amode,
} = window.b$l.apptree({sDomFExportList:{rgx2draglist}});
return;


///===================================================
/// point X dragger interface
///     this.achieved.achieved will be created by
///     d8d framework
/// does this make medpos? - no.
///
/// api
///     acceptPos( newPos ) is supplied via args;
///     api permits usage of own-defined methods:
///         rgX.processOwnDownEvent
///         rgX.processOwnUpEvent
///         (rgX = this)
///
///===================================================
function rgx2draglist({
    shpid, acceptPos, orientation, nospinner, pos,
    noDefaultMethods,
}) {
    var rgX = ssF.populates__pos_medpos_rgX_p2p({ shpid, pos });
    //shpid can be missed in tp-elected, trying pcolor first
    rgX.pcolor = rgX.pcolor || sDomF.tpid0arrc_2_rgba( rgX.shpid );
    rgX.doWhiteKernel = true;

    if( !noDefaultMethods ){
        rgX.acceptPos = acceptPos || ( _=>true );
        rgX.move2updates = move2updates;
        //premature?: rgX.processDownEvent    = processDownEvent ||
        //sDomF.processDownEvent;
        rgX.processDownEvent = processDownEvent;
        rgX.processUpEvent = processUpEvent;
    }
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
            //    sDomF.tpid2low( rgX.shpid ) + '-slider';

            rgX.dragDecorColor = haz( rgX, 'dragDecorColor' ) ||
                rgX.pcolor || 'black';
            lemmaD8D.pointWrap_2_dragWraps({
                pointWrap: rgX,
                finish_DownMoveUp: sDomF.finish_DownMoveUp_template,
                orientation,
                nospinner,
            })
    }));
    if( noDefaultMethods ){
        stdMod.railsCustomSlidersCount+=1;
    }
    return rgX;
}

function move2updates(
    //see: pWrap.move2updates(
    //"fullMoveInsideMathModel",
    //is in model units except for media-mover(-as-a-whole)
    dragMove,  //possibly upside down along vertical axis

    //possibly in media units, not im model units,
    mouseOnSurf
){
    if( haz( sconf, 'dragHidesPictures' ) ){
        sDomF.detected_user_interaction_effect();
    }
    if( has( this, 'mediaMover' ) ) {
        //// non-ordinary case:
        //// dragging model as a whole "inside media"
        //sconf.originX_onPicture - original position remains intact
        //sconf.modorInPicX - moves as user does "move model origin"
        sconf.modorInPicX = this.achieved.achieved[0] + dragMove[0];
        sconf.modorInPicY = this.achieved.achieved[1] + dragMove[1];

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
        this.achieved.achieved[0] + dragMove[0],
        //"fullMoveInsideMathModel"
        this.achieved.achieved[1] - dragMove[1],
    ];
    var accepted = this.acceptPos( newPos, dragMove );
    if( accepted ) {
        nspaste( this.pos, newPos );
        stdMod.model8media_upcreate();
    }
}

///must be in contex of pointWrap ( like this = rg.B )
function processDownEvent( arg ){
    if( haz( this, 'mediaMover' ) ) {
        //// non-ordinary case:
        this.hideD8Dpoint = false;
        $$.$( this.svgel ).tgcls( 'undisplay', false );

        var mscale = sDomF.ds2med();
        this.medpos = sDomF.dspos2medpos( arg.point_on_dragSurf );
        this.svgel.setAttributeNS( null, 'cx', this.medpos[0] );
        this.svgel.setAttributeNS( null, 'cy', this.medpos[1] );
        if( haz( arg.dragWrap, 'decPoint' ) ) {
            $$.$( arg.dragWrap.decPoint )
                .css( 'display', 'block' )
                ;
        }
        stdMod.medParent.style.cursor = 'grabbing';
    } else {
        //// ordinary case
        //// DOES A SURPRISE: changes the type of
        //// this.achieved.achieved
        //// from object to array:
        this.achieved.achieved = nspaste( [], this.pos );
    }
    //already done on low level of d8d-framework
    //$$.$( arg.dragWrap.decPoint ).addClass( 'grabbing' );
    haff( this, 'processOwnDownEvent' );
}

function processUpEvent( arg ){
    if( haz( this, 'mediaMover' ) ) {
        this.achieved.achieved[ 0 ] = sconf.modorInPicX;
        this.achieved.achieved[ 1 ] = sconf.modorInPicY;

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

    //already done on low level of d8d-framework
    //$$.$( arg.dragWrap.decPoint ).removeClass( 'grabbing' );

    //possibly good to make dynamic coursor change
    //$$.$( this.svgel ).removeClass( 'grabbing' ); //seems redundant

    haff( this, 'processOwnUpEvent' );
    stdMod.model8media_upcreate(); //capital update, todo: check
}
})();


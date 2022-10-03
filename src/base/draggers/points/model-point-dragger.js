//todm: apparently vital to merge this module with proper submodel

( function() {
    var {
        ns, $$, sn, haz, haff,
        ssF, sconf, fconf,
        sDomF, sDomN, studyMods, amode,
    } = window.b$l.apptree({
        setModule,
    });
    return;











    function setModule()
    {
        sDomF.move_2_updates        = move_2_updates;
        sDomF.processDownEvent      = processDownEvent;
        sDomF.processUpEvent        = processUpEvent;
        sDomF.params__2__rgX8dragwrap_gen_list     = params__2__rgX8dragwrap_gen_list;
        sDomF.pname__2__rgX8dragwrap_gen_list    = pname__2__rgX8dragwrap_gen_list;
    }




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
    function pname__2__rgX8dragwrap_gen_list( pname,  stdMod )
    { 
        return params__2__rgX8dragwrap_gen_list({ pname, stdMod });
    }
    function params__2__rgX8dragwrap_gen_list({
        pname, acceptPos, orientation, pos, nospinner, stdMod,
    }) {
        pos                     = pos || ns.haz( sconf.pname2point, pname ) || [];
        var rgX                 = ssF.upcreate__pars2rgShape({ pname, pos, stdMod })
        rgX.acceptPos           = acceptPos || ( _=>true );
        rgX.move_2_updates      = sDomF.move_2_updates;
        //premature?: rgX.processDownEvent    = processDownEvent || sDomF.processDownEvent;
        rgX.processDownEvent    = sDomF.processDownEvent;
        rgX.processUpEvent      = sDomF.processUpEvent;
        rgX.pcolor              = sDomF.getFixedColor( rgX.pname );
        ns.sn( 'customDraggers_list', stdMod, [] );
        //if( rgX.pname === 'fret-0-0' ) {
        //  ccc( 'adds ' + rgX.pname + ' to stdMod.customDraggers_list ' );
        //}

        orientation = orientation ||
        ( haz( rgX, 'draggableY' ) && haz( rgX, 'draggableX' ) ?
            'rotate' :
            ( haz( rgX, 'draggableY' ) ? 'axis-y' :
                haz( rgX, 'draggableX' ) ? 'axis-x' : ''
            )
        );

        stdMod.customDraggers_list.push(
            ( function( medD8D ) {
                //if( rgX.pname === 'fret-0-0' ) {
                //    ccc( 'executes rgX_2_dragWrap for ' + rgX.pname );
                //}
                ///does this make medpos? - no.
                sDomF.rgX_2_dragWrap({
                    medD8D,
                    rgX,
                    orientation,
                    nospinner,
                });
            })
        );
        return rgX;
    }

    function move_2_updates(
        //see: pWrap.move_2_updates(
        //"fullMoveInsideMathModel",
        //is in model units except for media-mover(-as-a-whole)
        dragMove,

        mouseOnSurf
    ){
        var stdMod = studyMods[ amode.submodel ];
        if( haz( sconf, 'dragHidesPictures' ) ){
            sDomF.detected_user_interaction_effect();
        }
        if( ns.h( this, 'mediaMover' ) ) {
            //// non-ordinary case:
            //// dragging media as a whole 
            stdMod.sconf.modorInPicX = this.achieved.achieved[0] + dragMove[0];
            stdMod.sconf.modorInPicY = this.achieved.achieved[1] + dragMove[1];
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
            this.achieved.achieved[0] + dragMove[0], //"fullMoveInsideMathModel"
            this.achieved.achieved[1] - dragMove[1],
        ];
        var accepted = this.acceptPos( newPos, dragMove );
        if( accepted ) {
            ns.paste( this.pos, newPos );
            stdMod.model8media_upcreate();
        }
    }

    ///must be in contex of pointWrap ( like this = rg.B )
    function processDownEvent( arg )
    {
        var stdMod = studyMods[ amode.submodel ];
        if( ns.haz( this, 'mediaMover' ) ) {
            //// non-ordinary case:
            this.hideD8Dpoint = false;
            $$.$( this.svgel ).tgcls( 'undisplay', false );

            var mscale = sDomF.out2inn();
            this.medpos = sDomF.outparent2inn( arg.point_on_dragSurf );
            this.svgel.setAttributeNS( null, 'cx', this.medpos[0] );
            this.svgel.setAttributeNS( null, 'cy', this.medpos[1] );
            if( ns.haz( arg.dragWrap, 'decPoint' ) ) {
                $$.$( arg.dragWrap.decPoint )
                    .css( 'display', 'block' )
                    ;
            }
            stdMod.simScene.style.cursor = 'grabbing';
        } else {
            //// ordinary case
            //// DOES A SURPRISE: changes the type of
            //// this.achieved.achieved
            //// from object to array:
            this.achieved.achieved = ns.paste( [], this.pos );
        }
        $$.$( this.svgel ).addClass( 'grabbing' );  //seems redundant
        if( ns.haz( arg.dragWrap, 'decPoint' ) ) {
            $$.$( arg.dragWrap.decPoint ).addClass( 'grabbing' );
        }
        haff( this, 'processOwnDownEvent' );
    }

    function processUpEvent( arg )
    {
        var stdMod = studyMods[ amode.submodel ];
        if( ns.haz( this, 'mediaMover' ) ) {

            var stdMod = studyMods[ amode.submodel ];
            this.achieved.achieved[ 0 ] = stdMod.sconf.modorInPicX; 
            this.achieved.achieved[ 1 ] = stdMod.sconf.modorInPicY; 

            //// non-ordinary case:
            this.undisplay = true;
            this.hideD8Dpoint = true;
            $$.$( this.svgel ).tgcls( 'undisplay', true );
            $$.$( this.svgel ).removeClass( 'grabbing' );
            if( ns.haz( arg.dragWrap, 'decPoint' )) {
                $$.$( arg.dragWrap.decPoint ).css( 'display', 'none' );
            }
            stdMod.simScene.style.cursor = 'grab';
        }
        $$.$( this.svgel ).removeClass( 'grabbing' ); //seems redundant
        if( ns.haz( arg.dragWrap, 'decPoint' )) {
            $$.$( arg.dragWrap.decPoint ).removeClass( 'grabbing' );
        }
        haff( this, 'processOwnUpEvent' );
        stdMod.model8media_upcreate(); //capital update, todo: check
    }



}) ();


//todm: apparently vital to merge this module with proper s ubmodel

( function() {
    var {
        ns, $$, haz, haff,
        ssF, sconf,
        stdMod, sDomF,
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
    ///possibly outdated, the only lemma 11 relies on this:
    function pname__2__rgX8dragwrap_gen_list( pname,)
    {
        return params__2__rgX8dragwrap_gen_list({ pname,});
    }
    function params__2__rgX8dragwrap_gen_list({
        pname, acceptPos, orientation, pos, nospinner,
    }) {
        //ccc( pname + ' adds to list in common' );
        pos                     = pos || ns.haz( sconf.pname2point, pname ) || [];
        var rgX                 = ssF.upcreate__pars2rgShape({ pname, pos, })
        rgX.acceptPos           = acceptPos || ( _=>true );
        rgX.move_2_updates      = sDomF.move_2_updates;
        //premature?: rgX.processDownEvent    = processDownEvent ||
        //sDomF.processDownEvent;
        rgX.processDownEvent    = sDomF.processDownEvent;
        rgX.processUpEvent      = sDomF.processUpEvent;
        rgX.pcolor              = sDomF.getFixedColor( rgX.pname );
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
        dragMove,  //possibly upside down along vertical axis

        //possibly in media units, not im model units,
        mouseOnSurf
    ){
        if( haz( sconf, 'dragHidesPictures' ) ){
            sDomF.detected_user_interaction_effect();
        }
        if( ns.h( this, 'mediaMover' ) ) {
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
        if( ns.haz( this, 'mediaMover' ) ) {
            //// non-ordinary case:
            this.hideD8Dpoint = false;
            $$.$( this.svgel ).toggleClass( 'undisplay', false );

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

        //already done on low level of d8d-framework
        //$$.$( arg.dragWrap.decPoint ).addClass( 'grabbing' );
        haff( this, 'processOwnDownEvent' );
    }

    function processUpEvent( arg )
    {
        if( ns.haz( this, 'mediaMover' ) ) {
            this.achieved.achieved[ 0 ] = sconf.modorInPicX;
            this.achieved.achieved[ 1 ] = sconf.modorInPicY;

            //// non-ordinary case:
            this.undisplay = true;
            this.hideD8Dpoint = true;
            $$.$( this.svgel ).toggleClass( 'undisplay', true );
            $$.$( this.svgel ).removeClass( 'grabbing' );
            if( ns.haz( arg.dragWrap, 'decPoint' )) {
                $$.$( arg.dragWrap.decPoint ).css( 'display', 'none' );
            }
            //vital to toggle grab from grabbing:
            stdMod.simScene.style.cursor = 'grab';
        }

        //already done on low level of d8d-framework
        //$$.$( arg.dragWrap.decPoint ).removeClass( 'grabbing' );

        //possibly good to make dynamic coursor change
        //$$.$( this.svgel ).removeClass( 'grabbing' ); //seems redundant

        haff( this, 'processOwnUpEvent' );
        stdMod.model8media_upcreate(); //capital update, todo: check
    }

}) ();

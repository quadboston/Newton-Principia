( function() {

    //apparently vital to merge this module with proper submodel
    var SUB_MODEL   = 'common'; 

    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var bezier      = sn('bezier');

    var fapp        = ns.sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);
    var studyMods   = sn('studyMods', sapp);
    var amode       = sn('mode',sapp);
    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);

    var d8d_p       = sn('d8d-point',fmethods);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'dragModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    var stdMod;
    return;











    function setModule()
    {
        //todm: must be loop via stMods
        stdMod = sn( SUB_MODEL, studyMods );
        sDomF.move_2_updates        = move_2_updates;
        sDomF.processDownEvent      = processDownEvent;
        sDomF.processUpEvent        = processUpEvent;
        sDomF.modelPointDragger     = modelPointDragger;
    }




    ///===================================================
    /// point X dragger interface
    ///     this.achieved.achieved will be created by
    ///     d8d framework
    /// does this make medpos? - no.
    ///===================================================
    function modelPointDragger({
        pname, acceptPos, orientation, pos, nospinner,
    }) {
        pos = pos || sconf[ pname ];
        var rgX = ssF.toreg( pname )
        ({
            pos,
            pname : pname,

            //todm: this thing is an artefact
            pointWrap : { pos, pname },

        })();
        rgX.move_2_updates      = sDomF.move_2_updates;
        rgX.acceptPos           = acceptPos;
        rgX.processDownEvent    = sDomF.processDownEvent;
        rgX.processUpEvent      = sDomF.processUpEvent;
        rgX.pcolor              = sDomF.getFixedColor( rgX.pname );

        ns.sn( 'customDraggers_list', stdMod, [] );
        stdMod.customDraggers_list.push(
            ( function( medD8D ) {
                ///does this make medpos? - no.
                sDomF.createDragger_pointX({
                    medD8D,
                    rgX,
                    orientation,
                    nospinner,
                });
            })
        );
    }


    function move_2_updates( dragMove, mouseOnSurf )
    {
        sDomF.detected_user_interaction_effect();

        if( ns.haz( this, 'mediaMover' ) ) {
            //// non-ordinary case:
            //// dragging media as a whole 
            sconf.activeAreaOffsetX = this.achieved.achieved[0] + dragMove[0];
            sconf.activeAreaOffsetY = this.achieved.achieved[1] + dragMove[1];
            this.medpos[0] = mouseOnSurf[0];
            this.medpos[1] = mouseOnSurf[1];
            this.svgel.setAttributeNS( null, 'cx', this.medpos[0] );
            this.svgel.setAttributeNS( null, 'cy', this.medpos[1] );
            stdMod.model8media_upcreate();
        } else {
            //// ordinary case
            //// draggin ordinary model point
            var newPos = [
                this.achieved.achieved[0] + dragMove[0],
                this.achieved.achieved[1] - dragMove[1],
            ];
            var accepted = this.acceptPos( newPos );
            if( accepted ) {
                ns.paste( this.pos, newPos );
                stdMod.model8media_upcreate();
            }
        }
    }

    ///must be in contex of pointWrap ( like this = rg.B )
    function processDownEvent( arg )
    {
        if( ns.haz( this, 'mediaMover' ) ) {
            //// non-ordinary case:
            this.achieved.achieved =
            [
                sconf.activeAreaOffsetX,
                sconf.activeAreaOffsetY,
            ];
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
            sDomN.medRoot.style.cursor = 'grabbing';

        } else {
            //// ordinary case
            this.achieved.achieved = ns.paste( [], this.pos );
        }
        $$.$( this.svgel ).addClass( 'grabbing' );  //seems redundant
        if( ns.haz( arg.dragWrap, 'decPoint' ) ) {
            $$.$( arg.dragWrap.decPoint ).addClass( 'grabbing' );
        }
    }

    function processUpEvent( arg )
    {
        if( ns.haz( this, 'mediaMover' ) ) {
            //// non-ordinary case:
            this.undisplay = true;
            this.hideD8Dpoint = true;
            $$.$( this.svgel ).tgcls( 'undisplay', true );
            $$.$( this.svgel ).removeClass( 'grabbing' );
            if( ns.haz( arg.dragWrap, 'decPoint' )) {
                $$.$( arg.dragWrap.decPoint ).css( 'display', 'none' );
            }
            sDomN.medRoot.style.cursor = 'grab';
        }
        $$.$( this.svgel ).removeClass( 'grabbing' ); //seems redundant
        if( ns.haz( arg.dragWrap, 'decPoint' )) {
            $$.$( arg.dragWrap.decPoint ).removeClass( 'grabbing' );
        }
    }



}) ();


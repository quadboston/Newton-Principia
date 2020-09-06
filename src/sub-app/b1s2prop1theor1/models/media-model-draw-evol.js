//this module takes groups mapped to logical-evolution-steps of the theorem and
//paints these groups
//...
//aslso paints decoration groups ...
//it shoud not focus on building svg object, such objects must be built in 
//media-model.js

( function() {
    var SUB_MODEL   = 'common';
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var mat         = sn('mat');
    var bezier      = sn('bezier');
    var sv          = sn('svg');
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative',sapp);
    var studyMods   = sn('studyMods', sapp);

    var ss          = sn('ss',fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var tr          = ssF.tr;
    var tp          = ssF.tp;
    var rg          = sn('registry',ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'mediaModel_create';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    var pos2pointy;
    var handleR = 5;

    var stdMod;
    return;








    function setModule()
    {
        stdMod                  = sn(SUB_MODEL, studyMods);
        stdMod.drawEvolution    = drawEvolution;
        pos2pointy              = ssF.pos2pointy;
    }

    //*******************************************
    // //\\ particle evolution master painter
    //*******************************************
    function drawEvolution( time )
    {
        //===================================================
        // //\\ localizes variables
        //===================================================
        var path        = rg.path.pos;
        var pathRacks   = rg.pathRacks.pathRacks;
        var scenario    = rg.guiShowScenario;
        //===================================================
        // \\// localizes variables
        //===================================================


        //--------------------------------------
        // //\\ establishes step and substep
        //--------------------------------------
        //ccc( 'from slider: time=' + time );
        //skips first step:
        var steps = pathRacks.length;
        //time = time / steps * (steps-1) + 1;
        //time = time / steps;
        var stepIx = Math.floor( time * 4 );
        //ccc( 'stepIx=' + stepIx)
        var substepIx = stepIx%4;
        stepIx = ( stepIx - substepIx ) / 4;
        rg.stepIx.value = stepIx;

        //ccc( 'stepIx=' + stepIx + '  substepIx = ' + substepIx);
        //rg.displayStep.value = (stepIx-1) + '';
        rg.displayStep.value = stepIx + '';

        //---------------------------------------
        //todm make sure this change is correct
        //rg.thoughtStep.value = "thought " + (substepIx+1);
        rg.thoughtStep.value = "step " + (substepIx+1);
        //---------------------------------------

        //--------------------------------------
        // \\// establishes step and substep
        //--------------------------------------




        //--------------------------------------
        // //\\ establishes time-related display
        //--------------------------------------
        if( substepIx <3 ) {
            rg.displayTime.value = (stepIx*rg.timeStep.t).toFixed(3);
        } else {
            ////here the thought experiment ended and time
            ////begins grow again
            var effTime = ( (stepIx + (time - stepIx - 0.75) * 4 ) *
                          (rg.timeStep.t)).toFixed(3);
            rg.displayTime.value = effTime;
            if( stepIx === 1 ) {
                ////before thought experiment, no indication of it is shown
                rg.thoughtStep.value = "";
                //rg.displayStep.value = "...";
            }
        }
        ///todm: why this can happen?
        ///out of path length ... stopping drawing
        if( pathRacks.length <= stepIx ) return;
        //--------------------------------------
        // \\// establishes time-related display
        //--------------------------------------



        //--------------------------------------
        // //\\ cleanup
        //--------------------------------------
        stdMod.clearScenario();
        //--------------------------------------
        // \\// cleanup
        //--------------------------------------



        //--------------------------------------
        // //\\ picture drawing began
        //--------------------------------------
        //: always shows first Kepler's triangle to "point out"
        //;  it is equal to all others
        $$.$( rg[ 'kepltr-' + 0 ].svgel)
                .addClass( 'display-yes' ).removeClass( 'display-none' );
        //--------------------------------------
        // \\// picture drawing began
        //--------------------------------------



        //----------------------------------------------
        // //\\ draws previous path
        //      probably it has to be a comlete fragment
        //----------------------------------------------
        pathRacks.forEach( (prack, pix ) => {

            //: already accomplished path
            $$.$(prack.svgel).addClass( 'display-yes' ).removeClass( 'display-none' );
            if( pix > 0 && pix < stepIx) {
                $$.$( rg[ 'pathSegment-' + (pix-1) ].svgel)
                    .addClass( 'display-yes' ).removeClass( 'display-none' );
            }

            if( pix > stepIx - 2 ) return; //draws only previous path
            if( pix-1 >= 0 ) {
                var fkey = 'force-' + (pix-1);
                var fappliedKey = fkey + '-applied';
                var tipKey = fkey+'-1';
                $$.$(rg[ fappliedKey ].svgel)
                  .addClass( 'display-yes' ).removeClass( 'display-none' );
                $$.$(rg[ tipKey ].svgel)
                    .addClass( 'display-yes' )
                    .removeClass( 'display-none' );   
            }

        });
        //----------------------------------------------
        // \\// draws previous path
        //----------------------------------------------



        //----------------------------------------------
        // //\\ draws last fragment,
        //      there can be less fgroups than 4
        //----------------------------------------------
        //.sets phase to latest fgroups index === substepIx
        var fgroups = scenario[ stepIx ];  
        substepIx = Math.min( fgroups.length-1, substepIx );

        var fgroup = fgroups[substepIx];
        if( !fgroup ) return;

        fgroup.forEach( (paintee, leafix) => {
            $$.$(paintee.svgel).addClass( 'display-yes' ).removeClass( 'display-none' );
        });
        //----------------------------------------------
        // \\// draws last fragment,
        //----------------------------------------------



        //-------------------------------------------------
        // //\\ draws perpendicular from S to v
        //      and tangent till crossing with this
        //      perpendicular
        //-------------------------------------------------
        ( function() {
            if( stepIx >= path.length -1 ) return; //no second point
            var pos0 = path[ stepIx-1 ];
            var pos1 = path[ stepIx ];
            ns.paste( rg.P.pos, mat.dropPerpendicular( rg.S.pos, pos0, pos1 ) );
            ns.paste( rg.T.pos, pos0 );
        })();
        //-------------------------------------------------
        // \\// draws perpendicular from S to v
        //-------------------------------------------------


        //-------------------------------------------------
        // //\\ Book like points in original text
        // //\\ makes decorational points visible
        //----------------------------------------------
        ns.eachprop( sconf.pname2point, (pos,pname) => {
            //var dec_rg = ns.h( rg[ pname ], 'decoration_pathIx' );
            var dec_rg = ns.h( rg[ pname ], 'decoration_range' );
            if( dec_rg ) {
                var dpix = dec_rg.decoration_pathIx;
                var stone = stepIx+1;
                if( dec_rg.decoration_range[0] <= stone &&
                    stone <= dec_rg.decoration_range[1]) {
                    dec_rg.undisplay = false;
                }
                switch( pname )
                {
                    case 'C' :
                    case 'D' :
                    case 'E' :
                    case 'F' :
                    ns.paste( dec_rg.pos, path[dpix-1] );
                }
            }
        });


        //-------------------------------------------------
        // //\\ draws sagittaes
        //-------------------------------------------------
        ( function() {
            if( stepIx >= path.length -1 ) return; //no second point
            var pos0 = path[ stepIx-1 ];
            var pos1 = path[ stepIx ];
            ns.paste( rg.U.pos, [
                ( rg.B.pos[0] + rg.V.pos[0] )*0.5,
                ( rg.B.pos[1] + rg.V.pos[1] )*0.5,
            ] );
            ns.paste( rg.W.pos, [
                ( rg.E.pos[0] + rg.Z.pos[0] )*0.5,
                ( rg.E.pos[1] + rg.Z.pos[1] )*0.5,
            ] );
            ns.paste( rg.T.pos, pos0 );
        })();
        //-------------------------------------------------
        // \\// draws sagittaes
        //-------------------------------------------------


        //----------------------------------------------
        // \\// makes decorational points visible
        //----------------------------------------------
        Object.keys( sconf.pname2point ).forEach( pname => {

            var pWrap           = rg[ pname ].pointWrap;
            var pcolor          = sDomF.getFixedColor( pWrap.ptype );
            //rg[ pname ].pcolor= pcolor; //todm: way to go ...
            pWrap.pcolor        = pcolor;   //todm: overengineering ...

            if( pname !== 'B' && pname !== 'V' && pname !== 'A'  ) {
                //B is a special dragging point defined earlier
                    //this possibly collides with white filling
                    //cssClass : 'tostroke',
                    //this possibly collides with white filling
                    //tpclass : 'path',
                var pty = pos2pointy(
                    pname,
                    {
                        cssClass        : 'tostroke tofill thickable',
                        'stroke-width'  : 2,
                        r               : handleR,
                    }
                );
                pWrap.medpos = rg[ pname ].medpos;
            }

            if( pWrap.doPaintPname ) {
                var lpos = rg[ pname ].medpos.concat([]);
                ///letter quadrant sugar
                switch( pname ) {
                    case 'S' :
                    case 'Z' : lpos = [ lpos[0]-30, lpos[1]+20 ];
                    break;
                    case 'V' : lpos = [ lpos[0]-18, lpos[1]-15 ];
                    break;
                    default: lpos = [ lpos[0]+8, lpos[1]-10 ];
                }
                pWrap.pnameLabelsvg = ns.svg.printText({
                    tpclass : '',
                    text : pname,
                    stroke : sDomF.getFixedColor( pname ),
                    fill : sDomF.getFixedColor( pname ),
                    "stroke-width" : 1,
                    svgel : pWrap.pnameLabelsvg,
                    parent : stdMod.mmedia,
                    x : lpos[0],
                    y : lpos[1],
                    style : { 'font-size' : '22px' },
                });
                $$.$( pWrap.pnameLabelsvg )
                    .tgcls( 'undisplay', ns.haz( rg[pname], 'undisplay' ) );
            }

        });
        //-------------------------------------------------
        // \\// Book like points in original text
        //-------------------------------------------------


        //------------------------------------------------------
        // //\\ rebuilds polygons and lines "undisplay" flag and
        //      updates decorational lines
        //------------------------------------------------------
        ns.eachprop( ssD.decor, dec => {
            if( ns.h( dec, 'pivotNames' ) ) {
                var stone = stepIx+1;
                if( ns.h( dec, 'decoration_range' ) ) {
                    var stone = stepIx+1;
                    if( dec.decoration_range[0] <= stone &&
                        stone <= dec.decoration_range[1]) {
                        dec.undisplay = false;
                    }
                } else {
                    dec.undisplay = false;
                }
                if( dec.pivotNames.length === 2 ) {
                    ////refreshes line position and presense
                    ssF.pnames2line( dec.pivotNames[0], dec.pivotNames[1] );
                }
            }
        });
        //------------------------------------------------------
        // \\// rebuilds polygons and lines "undisplay" flag and
        //------------------------------------------------------

        stdMod.updatePolygons();





        ///------------------------------------------------------
        ///adds fake points over draggable points to
        ///make white kernels drawn above lines
        ///todm put in amode-state
        ///------------------------------------------------------
        [ 'V', 'B', 'A' ].forEach( pname => {
            var fakeName = pname+'-white-filler';
            var originalPoint = rg[pname];
            var wp = originalPoint.pos;
            ssF.toreg( fakeName )
                ( 'pos', [ wp[0], wp[1] ]  )
                ( 'undisplay', ns.haz( rg[pname], 'undisplay' )  ) //"removes circle"
                ;
            pos2pointy(
                fakeName,
                {
                    'stroke'        : '', //originalPoint.pointWrap.pcolor,
                    'fill'          : 'white',
                    'stroke-width'  : 2,
                    r               : handleR,
                }
            );
        });


        //----------------------------------------------
        // //\\ legend
        //----------------------------------------------
        stdMod.upcreate_mainLegend();
        //----------------------------------------------
        // \\// legend
        //----------------------------------------------
    }
    //*******************************************
    // \\// particle evolution master painter
    //*******************************************


}) ();


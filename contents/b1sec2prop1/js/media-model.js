(function(){
const { ns, sn, $$, eachprop, nspaste, has, haz, hafff, fmethods,
        toreg, fconf, sconf, ssF, ssD, sDomF, rg, exegs, amode, stdMod,
} = window.b$l.apptree({ stdModExportList : {
        media_upcreate___before_basic,
        media_upcreate___after_basic,
}});
var initialization_is_done = false;
var zorderFixed = false;
//enables steps BC, CD, ... by clicks on B, C, ...
var POINTS_BCDE_ARE_ACTIVE = false;
const lemmaP2coroll =
    ('Caracc Paracc Varacc CCaracc SCaracc BCaracc BParacc ' +
     'CParacc VVaracc BVaracc CaraccParacc SBCaracc cCaracc').split(' ');
return;


function media_upcreate___before_basic (){
    //reestablishes detecton to hide/unhide image for case the state
    //rg.detected_user_interaction_effect_DONE came from subessay launch
    sDomF.detected_user_interaction_effect(
        !rg.detected_user_interaction_effect_DONE );
    //this is a "policy" ... should be in the state manager if any ...
    rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

    //***********************************************************
    //todo //patch
    sn( 'displayPathStep', rg, { value : 1 } );
    sn( 'stepIx', rg, { value : 1 } );
    sn( 'p', rg.P, { abs : 1 } );
    //***********************************************************

    if( sconf.TIMER_AND_LOGIC_STEPS_COINSIDE ||
        ( haz( amode, 'logic_phase') === 'proof' &&
            fconf.sappId === "b1sec2prop1"
        )
    ){
        //Adjust when the following decorations start
        //becoming visible for the P1 proof tab.

        //There was a bug where even though the step’s value was
        //the same, decoration visibility was different depending
        //on whether the
        //user clicked text in the text area vs the time slider.
        //Therefore they are now both set with the exact same code below.

        //decStart = 5 corresponds to clicking “the second part of
        //the time” in the 2nd paragraph.
        const last = 5
        rg.c.decStart = last;
        rg.Bc.decStart = last;
        rg.SBc.decStart = last;
        //There was a bug where hovering the mouse over “cS”,
        //only made that line visible starting with “when the body
        //comes to B” rather
        //than “the second part of the time”.  Therefore decStart was
        //switched to the following from last+1 (6).
        rg.Sc.decStart = last;

        //decStart = 6 corresponds to clicking “when the body comes to B”
        //in the 2nd paragraph.
        rg.C.decStart = last+1;
        rg.V.decStart = last+1;
        rg.BC.decStart = last+1; //rg.C.decStart;
        rg.Cc.decStart = last+1; //rg.C.decStart;
    } else {
        const last = 7
        rg.c.decStart = last;
        rg.Bc.decStart = last;
        rg.SBc.decStart = last;
        rg.Sc.decStart = last;

        rg.C.decStart = last;
        rg.V.decStart = last;
        rg.BC.decStart = last;
        rg.Cc.decStart = last;
    }

    //-------------------------------------------------------
    // //\\ fixes logical step to 7 for corollary of P2
    //-------------------------------------------------------
    let CStart = rg.C.decStart;

    if( fconf.sappId === 'b1sec2prop2' ){
        lemmaP2coroll.forEach( pn => {
            rg[pn].decStart = CStart;
            rg[pn].decEnd = CStart+3;
            });
    }
    if(
        amode.subessay === 'cor-1' ||
        amode.subessay === 'cor-6' ||
        amode.logic_phase !== 'corollary'
    ){
        rg.V.decStart = 11111111;
        rg.V.decEnd   = 1111111;
    } else {
        rg.V.decStart = 2;
        rg.V.decEnd   = 1111111;
    }
    //-------------------------------------------------------
    // \\// fixes logical step to 7 for corollary of P2
    //-------------------------------------------------------
    //no svg, only logic:
    pathDelays2forceDraggers();
    stdMod.allPathRacks_2_unseenSVGs();
    stdMod.SAvV_model__2__svg(); //changes svg

    //***********************************************************
    //wraps remained tasks into d8d slider
    //if slider is already created ...
    hafff( rg['sl-shpid-time'], 'upates_timeSlider8unmasksSvg' );
    hafff( rg['sl-shpid-dt'], 'updates_sliderGUI' );
    //***********************************************************

    //----------------------------------------------------
    // //\\ shows next move of the proof
    //----------------------------------------------------
    if( !initialization_is_done ) {
        ///launch time work
        initialization_is_done = true;
        if( POINTS_BCDE_ARE_ACTIVE ) {
            rg.B.svgel.addEventListener( 'click', function() {
                if( amode.logic_phase === 'proof' ) {
                    fmethods.executeCapturedState( '1-4' );
                }
            });
            rg.C.svgel.addEventListener( 'click', function() {
                if( amode.logic_phase === 'proof' ) {
                    fmethods.executeCapturedState( '1-C' );
                }
            });
            rg.D.svgel.addEventListener( 'click', function() {
                if( amode.logic_phase === 'proof' ) {
                    fmethods.executeCapturedState( '1-D' );
                }
            });
            rg.E.svgel.addEventListener( 'click', function() {
                if( amode.logic_phase === 'proof' ) {
                    fmethods.executeCapturedState( '1-E' );
                }
            });
            ['B', 'C', 'D', 'E'].forEach( id => {
                rg[id + 'title'] = $$
                    .cNS( 'title' )
                    .to( rg[id].svgel )
                    .addClass( 'tpstroke' )
                    .addClass( 'tpfill' )
                    ();
            });
        }
    }
    var pointsAreOn = POINTS_BCDE_ARE_ACTIVE &&
                        amode.logic_phase === 'proof';
    const pathFill = sDomF.tpid0arrc_2_rgba( 'path' );
    ['B', 'C', 'D', 'E'].forEach( id => {
            let rgX = rg[ id ];
            if( has(rgX, 'svgel' )){
                rgX.svgel.setAttribute( 'r', pointsAreOn ? '6' : '4' );
                rgX.svgel.style[ 'fill' ] = pointsAreOn ?
                '#cccccc' : pathFill;
            //} else {
                //todo why is this?
                //c cc( rgX.shpid + ' svg is missed in media-model.js' );
            }
            if( POINTS_BCDE_ARE_ACTIVE ) {
                rg[ id + 'title' ].textContent =
                    pointsAreOn ? 'show next move' : '';
            }
    });
    //todm this is patch making F blue, why it?
    has(rg.F, 'svgel') && (rg.F.svgel.style.fill = pathFill);
    //----------------------------------------------------
    // \\// shows next move of the proof
    //----------------------------------------------------
    if(!haz( fconf, 'RESEARCH' )){
        //exists in popular ver:
        rg['main-legend'].tb.corollary.style.display =
           ( amode.logic_phase === 'corollary' &&
             amode.subessay === 'cor-1' ) ?
           'table' : 'none';
    }
    ssF.mediaModelInitialized = true;
}

function pathDelays2forceDraggers (){
    ['B','C','D','E','F'].forEach( (shpid, ix) => {
        let decEnd = rg.C.decEnd+(ix+10)*4;
        let decStart = rg.C.decStart+ix*4;
        let nam0 = 'VV'+ix;
        let nam1 = 'VVV'+ix;
        let doPaintPname = false;
        Object.assign( rg[ nam0 ], {
            decStart    : 111111111,
            decEnd,
            doPaintPname,
        });
        Object.assign( rg[ nam1 ], {
            decStart    : 111111111,
            decEnd,
            doPaintPname,
        });
    });
}

function media_upcreate___after_basic (){
    ///todm this fixes refreshment of green free Kepler triangles
    ///when media scales,
    eachprop( stdMod.decor, (dec,shpid) => {
        if( !dec.isPoint && dec.pivotNames.length !== 2 ) {
            dec.poly_2_updatedPolyPos8undisplay();
        }
    });

    ///this is a way around canonical config:
    ///placing svg shapes on top of configured z order,
    if( !zorderFixed ) {
        if( fconf.sappId === 'b1sec2prop2' ){
            let svg = rg.VVaracc.svgel;
            let parent = svg.parentNode;
            svg.remove();
            parent.appendChild( svg );

            svg = rg.BVaracc.svgel;
            svg.remove();
            parent.appendChild( svg );

            svg = rg.CaraccParacc.svgel;
            svg.remove();
            parent.appendChild( svg );
        }

        ///path
        const path = rg.path.pos;
        path.forEach( (pt, pix) => {
            if( !pix ) return;
            const kix = pix-1;
            const fkey = 'force-' + kix;
            const shpid = fkey+'-applied';
            const svg = rg[ shpid ].svgel;
            const parent = svg.parentNode;
            svg.remove();
            parent.appendChild( svg );
        });

        //S
        svg = rg['S'].svgel;
        parent = svg.parentNode;
        svg.remove();
        parent.appendChild( svg );

        if( fconf.sappId === 'b1sec2prop2' ){
            ////places dots over lines
            svg = rg['Caracc'].svgel;
            parent = svg.parentNode;
            svg.remove();
            parent.appendChild( svg );

            svg = rg['Paracc'].svgel;
            parent = svg.parentNode;
            svg.remove();
            parent.appendChild( svg );

            svg = rg['Varacc'].svgel;
            parent = svg.parentNode;
            svg.remove();
            parent.appendChild( svg );
        };
        ///now put hanler kernels over vector tips
        ['B','C','D','E','F'].forEach( (shpid, ix) => {
            let svg = rg[ shpid ].svgel;
            let parent = svg.parentNode;
            svg.remove();
            parent.appendChild( svg );
            let nam1 = 'VVV'+ix;
            svg = rg[ nam1 ].svgel;
            parent = svg.parentNode;
            svg.remove();
            parent.appendChild( svg );
        });

        //speed over AB
        svg = rg.Av.svgel;
        parent = svg.parentNode;
        svg.remove();
        //svg.style.strokeWidth = '3px';
        parent.appendChild( svg );

        //speed
        svg = rg['v'].svgel;
        parent = svg.parentNode;
        svg.remove();
        parent.appendChild( svg );

        //A
        var svg = rg['A'].svgel;
        var parent = svg.parentNode;
        svg.remove();
        parent.appendChild( svg );

        zorderFixed = true;
    }
}
})();

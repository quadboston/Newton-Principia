(function(){
const {sn, $$, sv, globalCss, haz, nspaste, sconf,
        sDomF, ssF, ssD, toreg, rg, amode, stdMod } =
        window.b$l.apptree({ stdModExportList : {
        //creates_sliderDomModel__4__time
    },
});
stdMod.creates_sliderDomModel__4__time = creates_sliderDomModel__4__time;
return;


//----------------------------------------
// //\\ makes up time slider
//      creates slider only once per
//      app model creation;
//----------------------------------------
function creates_sliderDomModel__4__time (){
    //=========================================
    // //\\ slider api pars
    //=========================================
    var sliderId    = 'time';
    var api_rgid    = 'sl-shpid-'   + sliderId;
    var rgX = toreg( api_rgid )();
    // adds input pars to rgX
    // store-name for value delivered from sliding ===
    // model value which is set by slider,
    var apiValueName = 'curtime';
    rgX.apiValueName = apiValueName;
    var slCaption0   = 'time';
    var captionPrefix = 'm = ';

    ///will be overridden with tp-color if any:
    var COLOR = sDomF.tpid0arrc_2_rgba( sliderId );
    var customSliderShift = 0; //picture units
    //=========================================
    // \\// slider api pars
    //=========================================

    //:spawns api pars
    //leaving this as rulerDraglist breaks sliders, needs
    //split from generic slider framework,
    var rulerDraggers_    = sn( 'rulerDraggers_',stdMod, [] );
    var sliderIx = rulerDraggers_.length;
    rulerDraggers_.push( api_rgid );

    var start_rgid  = 'railsStart_' + sliderId;
    var end_rgid    = 'railsEnd_'   + sliderId;
    var rails_rgid  = 'slider_'     + sliderId;
    var tpId        = sliderId;
    var tptpId      = 'tp-' + tpId;

    //-------------------------------------------------------------
    // //\\ in model units and reference system
    //-------------------------------------------------------------
    var startX            = ( -sconf.originX_onPicture +
                                sconf.innerMediaWidth *
                                sconf.SLIDERS_OFFSET_X
                            ) * sconf.med2mod;
    var endX              = startX + sconf.innerMediaWidth *
                                        sconf.SLIDERS_LENGTH_X *
                                        sconf.med2mod;
    var startY            = sconf.originY_onPicture
                                    - sconf.innerMediaHeight
                                    + sconf.SLIDERS_OFFSET_Y
                                    - ( sliderIx
                                        //+ customSlidersAbove
                                        ) * sconf.GENERIC_SLIDER_HEIGHT_Y
                                    + sconf.SLIDERS_LEGEND_HEIGHT
                            ;
    var startY            =  startY * sconf.med2mod;
    //----------------------------------------------------------------------------
    // \\// in model units and reference system
    //----------------------------------------------------------------------------

    //:spawns api pars
    var startPos          = [ startX, startY ];
    var endPos            = [ endX, startY ];

    //--------------------------------------------------------
    // //\\ slider api
    //--------------------------------------------------------
    rgX.pos         = [startX, startY];
    rgX.startX      = startX;
    rgX.endX        = endX;
    rgX.railsLength = endX - startX; //in model units
    rgX.pcolor      = COLOR;
    rgX.slCaption   = slCaption0;
    //-------------------------------------
    // //\\ adds helpers
    //-------------------------------------
    toreg( start_rgid )( 'pos', startPos );
    toreg( end_rgid )( 'pos', endPos );
    var railsStart = ssF.rgxpoint2updatedSvg(
        start_rgid,
        { fill : COLOR, tpclass:tpId, cssClass : 'tofill tostroke', }
    );
    var railsEnd = ssF.rgxpoint2updatedSvg(
        end_rgid,
        { fill : COLOR, tpclass:tpId, cssClass : 'tofill tostroke', }
    );
    ///draws rails
    ///if tpclass does exist, it apparently overrides stroke and
    ///some other styles,
    var rails = ssF.pivots_2_svgLineInRg(
            rails_rgid,
            [ railsStart, railsEnd ],
            { stroke           : COLOR,
            'stroke-width'   : 3,
            tpclass          : tpId,
            cssClass         : 'tofill tostroke',
            }
    );
    $$.$( rails.svgel ).cls( tptpId );
    //-------------------------------------
    // \\// adds helpers
    //-------------------------------------

    //------------------------------------------------
    // //\\ makes svg representation of api
    //      as a point, adds medpos to rgX
    //-------------------------------------

    var wwrack = ssF.rgxpoint2updatedSvg(
        api_rgid,
        {
            cssClass : 'tostroke',
            stroke : COLOR,
            'stroke-width' : 3,
            fill : 'white',
            r : 5,
            tpclass : tpId,
        }
    );
    //.overrides tp - machinery suppressed opacity,
    //.the handler must be solid,
    wwrack.svgel.style[ 'fill-opacity' ] = '1';
    //-------------------------------------
    // \\// makes svg representation of api
    //--------------------------------------------------------

    /// adds text to rgX-GUI
    rgX.text_svg = sv.printText({
        parent          : stdMod.medScene,
        text            : sliderId,
        'stroke-width'   : 1,
        style           :
        {
            'font-family'   : 'var(--default-font)',
            'font-size'     : sconf.GENERIC_SLIDERS_FONT_SIZE +'px',
            'stroke-width'  : 1,
        },
    });
    $$.$( rgX.text_svg ).addClass( 'tp-time' );
    globalCss.update( `
            .bsl-simscene svg text.${tptpId} {
                stroke          : ${COLOR};
                fill            : ${COLOR};
            }
        `,
        'svg-text-special'
    );
    rgX.sliderRgxPos2unscaledSvgs = ssF.sliderRgxPos2unscaledSvgs;
    rgX.upates_timeSlider8unmasksSvg = upates_timeSlider8unmasksSvg;
    rgX.unscalable = true;
    //rgX.draggableX = true;

    rgX.move2updates = move2updates;
    rgX.processDownEvent = processDownEvent;
    sDomF.rgx2draglist({
        pos: rgX.pos,
        shpid: rgX.shpid,
        orientation: 'axis-x',
        noDefaultMethods: true,
    });
    //-------------------------------------
    // \\// slider api
    //--------------------------------------------------------
    return;

    ///this function does "minor" update: it does not
    ///recalculate the evolution, but
    ///  sets slider position and
    ///  shows evolution corresponding to time;
    function upates_timeSlider8unmasksSvg (){
        var rawTime = rgX[ apiValueName ]; //===rg.sl-shpid-time.curtime;

        //interpolates slider GUI position
        var sliderXpos =
                railsStart.pos[0] +
                rawTime / sconf.timeRange * rgX.railsLength;
        rgX.pos = [ sliderXpos, railsStart.pos[1] ];

        //does what it says, no extra calculations
        slTime_2_stepIndice8tCaption();

        rgX.slCaption = slCaption0 + ' = ' +
                        //discrete time:
                        rg.displayTime.value;
                        //continuous time:
                        //rgX[ apiValueName ].toFixed(2);
        //at curr. ver.,
        //    does pos to GUI, does slCaption
        rgX.sliderRgxPos2unscaledSvgs();

        //perpendicular and point "T"
        //they depend on slider-time, this is why their math model pos
        //updates here and not in model_upcreate()
        stdMod.doesPosition_PTandTheirLine();

        //at the end of job, runs application-provided callback
        stdMod.unmasksVisib();
        stdMod.upcreate_mainLegend();
        if( ssF.mediaModelInitialized ) {
            stdMod.lemmaD8D && stdMod.lemmaD8D.updateAllDecPoints();
        }
    };
}
//----------------------------------------
// \\// makes up time slider
//----------------------------------------

///must be in contex of pointWrap ( like this = rg.B )
function processDownEvent( arg ){
    this.achieved.achieved = this.curtime;
}

///move_2_val8gui8cb
///todm: this sub should be automatically throttled
function move2updates( move_in_model ){
    var rgX = this;
    amode.userControl = 'diagram';
    sDomF.detected_user_interaction_effect();

    //this fixes missed model-decoration-points after
    //user made an action,
    //not sure why media-model.js::media_upcreate does not fix it?,
    //this is a "policy" ... should be in the state manager if any ...
    rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

    //sets preliminary time:
    var newTime = rgX.achieved.achieved +
        move_in_model[ 0 ] /
        rgX.railsLength *
        sconf.timeRange;
    //sets value:
    stdMod.protects_curTime_ranges( newTime );

    stdMod.media_upcreate();
    //we don't need this,
    //  stdMod.model_upcreate();
    //this slider does not affect path calculation
}

function slTime_2_stepIndice8tCaption (){
    var sp8ep = haz( rg, 'sl-shpid-time' );
    var ctime = rg['sl-shpid-time'].curtime;

    //*****************************************************
    // //\\ establishes master step, main step, and substep
    //      stepIx4   = 0,1,2,3,  4,5,6,7,  8,9,10,11, ...
    //      substepIx = 0,1,2,3,  0,1,2,3,  0,1, 2, 3, ...
    //      stepIx    = 0,0,0,0,  1,1,1,1,  2,2, 2, 2, ...
    //      point     = A,A,A,A,  -,-,-,B,  -,-, C, C, ...
    //*****************************************************
    //full index = master index reached in orbit and logic:
    //virtual thing, just stretches time to better subdivide stepIx
    var stepIx4 = Math.floor( ctime * 4
                  / rg['sl-shpid-dt'].val );
    rg.stretchedFourTimes_stIx = stepIx4;

    //local index = reached substep
    rg.substepIx  = stepIx4%4;

    //cell index = main step of orbit =
    //number of completed orbit steps =
    var stepIx      = ( stepIx4 - rg.substepIx ) / 4;

    //The following line caused some bugs, has been commented out,
    //and left for reference.  If the delta time slider is moved
    //to the
    //left of its maximum eg. 0.73, then when the time slider
    //is moved
    //to the left from its maximum, the time shown first increases
    //then decreases (eg. 9.43 to 10.15 then back to 9.43).
    //This caused similar increasing/decreasing issues for
    //the “path step”
    //text in the Proof tab, and showing/hiding the last red
    //force vector
    //in the model area.
    // stepIx = Math.min( stepIx, rg.spatialSteps - 1 );

    toreg( 'stepIx' )( 'value', stepIx );
    /*
        c cc( 'ctime=' + ctime +
            ' ESTABLISH: stepIx4=' + stepIx4 +
            ' substepIx=' + rg.substepIx +
            ' stepIx=' + stepIx
        );
    */
    //*****************************************************
    // \\// establishes master step, main step, and substep
    //*****************************************************

    rg.thoughtStep.value = (rg.substepIx+1) + '';
    //sets granular time display increment during last proof step
    let nexStepDisplay = ( rg.substepIx === 3 ? 1 : 0 ) +
                           rg.stepIx.value;
    rg.displayTime.value = ( nexStepDisplay *
                             rg['sl-shpid-dt'].val ).toFixed(2);
    rg.displayPathStep = { value:nexStepDisplay };
}
})();
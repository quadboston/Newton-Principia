( function() {
    var {
        $$, sn, has, bezier, globalCss, userOptions,
        ssF, ssD, sDomN, sDomF,
        amode, rg, toreg, sconf, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate___part_of_medupcr_basic,
            createsChordModeRadioControl,
        },
    });
    let foldPointsRemovedFromTp = false;
    return;













    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate___part_of_medupcr_basic()
    {
        if( sconf.APPROX === 'D' ) {
            ////enables curve move when dragging an entire diagram
            rg[ 'approximated-curve' ].poly2svg({});
        } else {
            //todm this is a redundant step, graphArray is already
            //built and can be used
            let rgX = ssF.paintsCurve({
                mmedia  : stdMod.svgScene,
                fun     : bezier.fun,
                rgName  : 'orbitcurve',
                start   : 0,      //existence is a flag
                step    : 0.0125,
                stepsCount : 81,
            });
            rgX.svgel$.addClass('tp-orbit');
        }
        //todm this is a redundant step, graphArray is already
        //built and can be used
        //arc updates
        ssF.paintsCurve({
            mmedia  : stdMod.svgScene,
            fun     : bezier.fun,
            rgName  : 'timearc',
            stepsCount : 101,
            start   : rg.Q.q_minus,
            step     : (rg.Q.q - rg.Q.q_minus ) / 100,
        });
        //todm this is a redundant step, graphArray is already
        //built and can be used
        ssF.paintsCurve({
            mmedia  : stdMod.svgScene,
            fun     : bezier.fun,
            rgName  : 'APQ',
            stepsCount : 101,
            start   : 0,
            step     : rg.Q.q / 100,
        });
        
        if( has( rg[ 'foldPoints-' + 1 ], 'svgel$' ) ){
           if( !foldPointsRemovedFromTp ) {
               foldPointsRemovedFromTp = true;

               let gapColor = userOptions.showingBonusFeatures() ?
                              '#ffffff' : '#ff0000';
               rg[ 'S,nonSolvablePoint' ].svgel$.css( 'stroke', gapColor );
               sconf.originalPoints.foldPoints.forEach( (fp,ppix) => {
                    fp.rgX.svgel$
                        .removeClass( 'tp-fold_points-'+ppix )
                        .css( 'fill', gapColor )
                        .css( 'stroke', gapColor )
                    ;
               });
            }
        }
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================


    
    
    function createsChordModeRadioControl()
    {
        let bonus = userOptions.showingBonusFeatures();
        
        //finely tuned up control
        
        //=========================================
        // //\\ chordmode radio-input control
        //=========================================
        //scene.addElement( ssD.radioWrack );
        sDomN.radioDiv$ = $$.c( 'div' )
            .addClass( 'chordmode-parent' )
            .html( 'reshaping preserves chord`s<br>' )
            .css( 'display', 'inline-block' )
            .css( 'padding-left', '16px' )
            .css( 'position', 'absolute' )
            .css( 'top', '5px' )
            .css( 'right', '20px' )
            .css( 'text-align', 'left' )
            .css( 'z-index', '10' )
            .to( stdMod.simScene$ )
        ;
        const HEIGHT = 20;
        const width = Math.floor( HEIGHT*5/2 );
        const widthInner = Math.floor( width*4/5 );
        const leftInner = Math.max( 2, Math.floor((width-widthInner )/2) )-1;
        const handleH = Math.floor( HEIGHT*4/5 )-4;
        const hanleShiftLeft = 1;
        const hanleShiftRight = leftInner+widthInner-handleH-3;
        const timeColor = sDomF.getFixedColor( 'dtime' );
        const chordColor = sDomF.getFixedColor( 'chord' );

        $$.c( 'span' )
            .addClass( 'lengthlabel' )
            .addClass( 'tp-chord' )
            .css( 'padding-top', '2px' )
            .html( bonus ? '|QQ₋| ' : 'length ' )
            .to( sDomN.radioDiv$ )
        ;

        var lightBGcolor = 'rgba(225, 235, 250)';
        var middleBGcolor = fconf.SHUTTLE_COLOR;
        var darkBGcolor = 'rgba(80, 120, 140)';
        let binaryRadio$ = $$.c( 'div' )
            .addClass( 'chordmode-binary-radio' )
            .css( 'display', 'inline-block' )
            .css( 'position', 'relative' )
            .css( 'vertical-align', 'middle' )
            .css( 'box-sizing','border-box')
            .css( 'height', HEIGHT + 'px' )
            .css( 'width', width + 'px' )
            .css( 'border', '4px solid ' + middleBGcolor )
            .css( 'border-radius', handleH + 'px' )
            .css( 'margin-top', '2px' )
            .css( 'background-color', lightBGcolor )
            .to( sDomN.radioDiv$ )
        ;
        let handle$ = $$.c( 'div' )
            .addClass( 'chordmode-handle' )
            .css( 'position', 'absolute' )
            .css( 'box-sizing','border-box')
            .css( 'height', handleH + 'px' )
            .css( 'width', handleH + 'px' )
            .css( 'top', '0px' )
            .css( 'border-radius', handleH + 'px' )
            .css( 'border', '1px solid #ffffff' )
            .css( 'background-color', darkBGcolor )
            .to( binaryRadio$ )
        ;
        $$.c( 'span' )
            .addClass( 'timelabel' )
            .addClass( 'tp-dtime' )
            .css( 'padding-top', '2px' )
            .html( bonus ? ' Δt' : ' time' )
            .to( sDomN.radioDiv$ )
        ;

        globalCss.update(
        `
        .lengthlabel {
            color : ${chordColor};
        }
        .timelabel {
            color : ${timeColor};
        }
        .chordmode-handle {
            left : ${hanleShiftRight}px;
            transition : left 0.2s ease-in-out;
        }
        .preserves-length .chordmode-handle {
            left : ${hanleShiftLeft}px;
            transition : left 0.2s ease-in-out;
        }
        `,
        'chordMode' );
        
        toggles_GUI_display();
        toggles_GUI_display();
        
        binaryRadio$.e("click", function(event) {
            sconf.FIXED_CHORD_LENGTH_WHEN_DRAGGING =
            !sconf.FIXED_CHORD_LENGTH_WHEN_DRAGGING;
            toggles_GUI_display();
        });
        return;
        
        function toggles_GUI_display()
        {
            sDomN.radioDiv$[
                (sconf.FIXED_CHORD_LENGTH_WHEN_DRAGGING ? 'add' : 'remove' )+'Class'
            ]( 'preserves-length' );
        }
        //=========================================
        // \\// chordmode radio-input control
        //=========================================
    }
    
    
}) ();


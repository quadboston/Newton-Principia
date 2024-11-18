( function() {
    var {
        ns, $$, sn, haz, nspaste, bezier, globalCss,
        ssF, ssD, sDomN,
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
        
        if( rg[ 'foldPoints-' + 1 ].svgel$ ) {
           if( !foldPointsRemovedFromTp ) {
               foldPointsRemovedFromTp = true;
               
               ///todm needs this into amode2lemma
               let gapColor = haz( sconf, 'showAddendums' ) ?
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
        const heightInner = Math.floor( HEIGHT*3/5 )+1;
        const leftInner = Math.max( 2, Math.floor((width-widthInner )/2) )-1;
        const topInner = Math.max( 1, Math.floor((HEIGHT-heightInner )/3) );
        const handleH = Math.floor( HEIGHT*4/5 )-4;
        const hanleShiftLeft = 1;
        const hanleShiftRight = leftInner+widthInner-handleH-3;
        
        $$.c( 'span' )
            .addClass( 'lengthlabel' )
            .css( 'padding-top', '2px' )
            .html( 'length ' )
            .to( sDomN.radioDiv$ )
        ;

        //todm later fit to site styles
        //var SHUTTLE_COLOR = ns.SHUTTLE_COLOR; // = 'rgba(150, 175, 200';
        //var SHUTTLE_BG_COLOR = ns.SHUTTLE_BG_COLOR; // = 'rgba(245, 245, 255)';

        var lightBGcolor = 'rgba(225, 235, 250)';
        var middleBGcolor = ns.SHUTTLE_COLOR; //'rgba(111, 150, 150)';
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
            .css( 'padding-top', '2px' )
            .html( ' time' )
            .to( sDomN.radioDiv$ )
        ;
        
        globalCss.update(
        `
        .lengthlabel {
            color : #aaaaaa;
        }
        .timelabel {
            color : #000000;
        }
        .preserves-length .lengthlabel {
            color : #000000;
        }
        .preserves-length .timelabel {
            color : #aaaaaa;
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


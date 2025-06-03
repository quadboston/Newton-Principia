( function() {
    var {
        ns, paste, capture, nspaste, sconf, sDomF, ssD, ssF, stdMod, amode, toreg, rg,
    } = window.b$l.apptree({
        ssFExportList : {
            amode2rgstate,
        },
    });

    ///diff and Euclid tangents are equal
    var ANGLE_EQUALS = ssD[ "L-equal-d curveRotationAngle" ] = 
    {
        "angle": 0,
        "sin": 0,
        "cos": 1
    };

    //this is Books origin, authentic N. drawing,
    //curveRotationAngle = 0,
    var ANGLE_AUTH = ssD.authenticOriginal_curveRotationAngle =
    {
        "angle": 0,
        "sin": 0,
        "cos": 1
    };

    setCapture();
    return;


    function setCapture()
    {
        paste( capture,
        {
            "reset-to-origin" : {
                    curveRotationAngle : Object.assign( ANGLE_AUTH ),
                    "media-mover": {
                        "achieved": {
                            "achieved": [
                                140,
                                61
                            ]
                        }
                    },
                    "B": {
                            "unrotatedParameterX": 0.7745228215767634
                    }
            },


            "L-equal-d" :  {
                    curveRotationAngle : Object.assign( ANGLE_EQUALS ),
                    "B": {
                           "unrotatedParameterX": 0.7745228215767634
                    }
            },

            "closer": {
                    "curveRotationAngle": Object.assign( ANGLE_AUTH ),
                    "B": {
                           "unrotatedParameterX": 0.5658328716632559
                    }
            },

            "more-closer": {
                    "curveRotationAngle": Object.assign( ANGLE_AUTH ),
                    "B": {
                           "unrotatedParameterX": 0.10102343776498918
                    }
            },

            "meet": {
                    "curveRotationAngle": {
                        "angle": 0.10579977792284677,
                        "sin": 0.10560250842053673,
                        "cos": 0.9944084222367038
                    },
                    "B": {
                            "unrotatedParameterX": 0.001
                    }
            },

        });
    }


    function amode2rgstate( captured )
    {
        var { logic_phase, aspect, subessay } = amode;
        //------------------------------------------------
        // //\\ returns diagram back at every menu click
        //      todm: this is a patch: do streamline
        //------------------------------------------------
        {
            nspaste( rg[ "media-mover" ].achieved,
                {
                    "achieved": [
                        sconf.originX_onPicture, //492,
                        sconf.originY_onPicture, //565
                    ]
                }
            );
            //todm: without this diagram does not return back immediately, only after a click
            var ach = rg[ "media-mover" ].achieved.achieved;
            sconf.modorInPicX = ach[0];
            sconf.modorInPicY = ach[1];
        }
        //------------------------------------------------
        // \\// returns diagram back at every menu click
        //------------------------------------------------

        //----------------------------------
        // //\\ common values
        //----------------------------------
        rg.A.undisplay              = false;
        rg.B.undisplay              = false;
        rg.AB.undisplay             = false;
        rg[ 'arc-AB' ].undisplay    = false;

        //idle?:
        ns.paste( rg.curveStart.pos, ssD.curveStartInitialPos );

        ns.paste( rg.curveEnd.pos, ssD.curveEndInitialPos );
        ssD.repoConf.customFunction = 0;
        rg.B.unrotatedParameterX = 1;
        var media_scale = toreg( 'media_scale' )();
        //----------------------------------
        // \\// common values
        //----------------------------------

        sDomF.detected_user_interaction_effect( 'doUndetected' );

        captured = '';

        nspaste( rg.B.pos, rg.B.originalPos );
        rg.B.unrotatedParameterX = rg.B.originalPos[0]; //what a misleading naming

        nspaste(rg.R.pos, rg.R.originalPos);
        nspaste(rg.D.pos, rg.D.originalPos);

        rg.media_scale.value = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );

        ns.paste( rg.curveStart.pos, [ -0.2, 0 ] ); //todm what is this?
        ns.paste( rg.curveEnd.pos, [ ssD.curveEndInitialPos[0], 0 ] );

        [
            //'dr-decorpoint',
        ].forEach( gname => { rg[ gname ].undisplay = true; });

        [
            'D',
            'R',
            'C',
            'AR',
            'AD',
            'BR',
            'RD',
            'curve-AB',
        ].forEach( gname => { rg[ gname ].undisplay = false; });

        if( logic_phase === 'claim' ) {
            [
                'c',
                'r',
                'd',
                'A,d',
                'A,r',
                'r,b',
                'r,d',
            ].forEach( gname => { rg[ gname ].undisplay = true; });
        } else if( logic_phase === 'proof' ) {
            [
                'c',
                'b',
                'Ab',
                'r',
                'd',
                'A,d',
                'A,r',
                'r,b',
                'r,d',
                'arc-Ab',
            ].forEach( gname => { rg[ gname ].undisplay = false; });
        }

        rg.B.hideD8Dpoint   = false;
        rg.R.hideD8Dpoint   = false; // enables mouse events on point R
        
        rg[ 'left-curve-AB' ].undisplay = aspect === 'model';
        rg['A,DLeft'].undisplay = aspect === 'model';
        return captured;
    }

}) ();


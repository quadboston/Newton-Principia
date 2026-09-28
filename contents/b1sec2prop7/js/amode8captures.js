( function() {
    var { nspaste, amode, toreg, stdMod, rg, ssD, }
        = window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
    return;


    ///runs inside "subessay launch" which in turn runs after
    ///"init model parameters"
    function amode2rgstate( captured )
    {
        const { logic_phase, aspect } = amode;
        // Latin tabs have no subessays; they show what the Text tab
        // shows for the first subessay of the same logic_phase
        const subessay = aspect === 'latin' ?
            { proof : 'solution', corollary : 'corollary1' }[ logic_phase ] :
            amode.subessay;
        const q2xy = stdMod.q2xy;

        //----------------------------------
        // //\\ common values
        //----------------------------------

        //interval of t to construct an arc for
        //Newton's sagitta
        //toreg( 'sForSagitta' )( 'val', 0.310 );

        rg.Q.hideD8Dpoint = subessay !== 'solution';
        //----------------------------------
        // \\// common values
        //----------------------------------


        if( subessay === 'corollary2' || subessay === 'corollary3' ){
            nspaste( rg.A.pos, q2xy(
                -0.5, //chosen value for A
            ));
            nspaste( rg.P.pos, q2xy(
                0.5, //chosen value for P
            ));
            var Ss = Math.PI * 1.2;
            var S = q2xy( Ss );
            rg.S.pos[0] = S[0]*0.4;
            rg.S.pos[1] = S[1]*0.4;

            var Rcol2_s = Math.PI * 0.75;
            var Rcol2 = q2xy( Rcol2_s );
            rg.Rcol2.pos[0] = Rcol2[0]*0.4;
            rg.Rcol2.pos[1] = rg.P.pos[1]; //Rcol2[1]*0.4;

        } else {
            nspaste( rg.A.pos,
                [-0.6030729600066013, 0.13447833820836858] //Book's value
            );
            nspaste( rg.S.pos,
                [-0.6030729600066013, 0.13447833820836858] //Book's value
            );
            nspaste( rg.P.pos, q2xy(
                0.7262954797868 // Book's value for P
            ));
            if( subessay === 'corollary1' ) {
                ////placing S to the circle
                nspaste( rg.S.pos, [-0.9997779468574, -0.0210731450212] );
            }
        }

        modifyDecorationVisibility( subessay );

        ssD.stashedVisibility = null;
        stdMod.rebuilds_orbit();
        return captured;
    }

    function showOnly(...args) {
        for (const item in rg) {
            rg[item].undisplay = !args.includes(item);
        }
    }

    /**
     * Show or hide components according to whether they are used
     */
    function modifyDecorationVisibility( subessay ) {
        const { logic_phase } = amode;
        if (logic_phase === 'claim') {
            showOnly(
                'S',
                'P'
            );
        } else if (subessay === 'solution') {
            showOnly(
                'A',
                'P',
                'Q',
                'R',
                'S',
                'T',
                'L',
                'V',
                'Z',
                'AP',
                'AV',
                'PR',
                'PT',
                'PV',
                'PZ',
				'QL',
                'QR',
                'QT',
                'RL',
                'SP',
				'SV',
                'ZQ',
                'ZR',
            );
        } else if (subessay === 'another-solution') {
            showOnly(
                'A',
                'P',
                'S',
                'V',
                'Y',
                'AP',
                'AV',
                'PR',
                'PV',
                'PY',
                'PZ',
                'SP',
				'SV',
                'SY'
            );
        } else if (subessay === 'corollary1') {
            showOnly(
                'P',
                'S',
                'V',
                'SP',
            );
        } else if (subessay === 'corollary2') {
            showOnly(
                'A',
                'Gcol2',
                'P',
                'PV',
                'Rcol2',
                'S',
                'Tcol2',
                'V',
                'Gcol2,P',
                'Gcol2,S',
                'Rcol2,P',
                'Rcol2,Tcol2',
                'SP',
				'SV',
                'Tcol2,V',
            );
        } else if (subessay === 'corollary3') {
            showOnly(
                'Gcol2',
                'P',
                'Rcol2',
                'S',
                'Gcol2,P',
                'Gcol2,S',
                'Rcol2,P',
                'SP',
            );
        }
    }
}) ();

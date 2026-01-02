( function() {
    var { amode, rg, sDomF, } 
        = window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
    return;


    function amode2rgstate( captured )
    {
        var { logic_phase, aspect, subessay } = amode;

        //hides all proof material, proof is already done in lemma 9
        [
            'b',
            'c',
            'd',
            'e',
            'F', 
            'G',
            'f',
            'g',
            'pivotPoint1',
            'Ae',
            'Ab',
            'Ac',
            'Ad',
            'Ag',
            'db',
            'ec',
            //'df',
            //'eg',
            'AG',
            'remoteCurve',

            "Abd",
            "Ace",
            "area-Abd",
            "area-Ace",
            //:linear areas
            "Afd",
            "Age",

        ].forEach( gname => { rg[ gname ].undisplay = true; });

        rg.pivotPoint1.pcolor = sDomF.tpname0arr_2_rgba( 'given' )
        rg.Ag.pcolor = sDomF.tpname0arr_2_rgba( 'given' )

        if( logic_phase === 'claim' ) {
            //Sets and constrains the tiltAngle as follows.
            rg.tiltAngle.value = 0;
        }
        if(
            aspect === 'addendum'
        ) {
            sDomF.detected_user_interaction_effect( !'doUndetected' );
        }
        rg.Ae.pcolor = sDomF.tpname0arr_2_rgba( 'given' )
        rg.e.pcolor = sDomF.tpname0arr_2_rgba( 'given' )

        return captured;
    }

}) ();


( function() {
    var { amode, rg, sDomF, } 
        = window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
    return;


    function amode2rgstate( captured )
    {
        var { logic_phase } = amode;

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

        rg.pivotPoint1.pcolor = sDomF.getFixedColor( 'given' )
        rg.Ag.pcolor = sDomF.getFixedColor( 'given' )

        if( logic_phase === 'claim' ) {
            //Sets and constrains the tiltAngle as follows.
            rg.tiltAngle.value = 0;
        }
        rg.Ae.pcolor = sDomF.getFixedColor( 'given' )
        rg.e.pcolor = sDomF.getFixedColor( 'given' )

        return captured;
    }
}) ();
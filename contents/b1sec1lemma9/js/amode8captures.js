( function() {
    var {
        amode, rg,
    } = window.b$l.apptree({
        ssFExportList :
        {
            amode2rgstate,
        },
    });
    return;


    function amode2rgstate( captured )
    {
        var { logic_phase, aspect } = amode;
        if(
            logic_phase === 'claim'
        ) {
            [
                //points
                'F',
                'G',
                'b',
                'c',
                'd',
                'e',
                'f',
                'g',
                'pivotPoint1',
                
                //lines
                'Ae',
                'Ab',
                'Ac',
                'Ad',
                'Ag',
                'db',
                'ec',
                'AG',

                //curves
                "Abc",
                'remoteCurve',

                //areas
                "Abd",
                "Ace",
                "area-Abd",
                "area-Ace",

                //linear areas
                "Afd",
                "Age",
            ].forEach( gname => { rg[ gname ].undisplay = true; });
        }
        return captured;
    }

}) ();


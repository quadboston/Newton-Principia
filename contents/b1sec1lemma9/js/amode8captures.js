( function() {
    var {
        ns, sn, paste, capture, amode, rg, sDomF, ssD, ssF, fconf,
    } = window.b$l.apptree({
        ssFExportList :
        {
            amode2rgstate,
        },
    });
    setCapture();
    return;






    function setCapture()
    {
        paste( capture,
        {
        });
    }


    function amode2rgstate( captured )
    {
        var { logic_phase, aspect } = amode;
        if(
            logic_phase === 'claim'
        ) {
            [
                //points
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


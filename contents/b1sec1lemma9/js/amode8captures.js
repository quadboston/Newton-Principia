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
        var { textSection, aspect } = amode;
        if(
            textSection === 'claim'
        ) {
            [
                'b',
                'c',
                'd',
                'e',
                'f',
                'g',
                'Ae',
                'Ab',
                'Ac',
                'Ad',
                'db',
                'ec',
                'remoteCurve',
            ].forEach( gname => { rg[ gname ].undisplay = true; });
        }
        return captured;
    }

}) ();


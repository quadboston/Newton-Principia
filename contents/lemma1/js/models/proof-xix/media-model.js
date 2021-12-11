( function() {
    var {
        sn, nssvg,
        ssF,
        stdMod,
    } = window.b$l.apptree({
        SUB_MODEL : 'proof-xix',
        stdModExportList :
        {
            media_upcreate,
        },
    });
    return;











    ///=========================================================
    /// updates and creates media
    ///=========================================================
    function media_upcreate( limDemo_ )
    {
        if( !ssF.mediaModelInitialized ) {
            nssvg.printText(
            {   
                parent  : stdMod.mmedia$(),
                type    : 'text',
                text    : '',
                x       : '100',
                y       : '100',
                style   : { fill:'black', 'font-size':'40px'}
            });
        //} else {
            //.vital for making
            //var ww = stdMod.medD8D;
            //ww && ww.updateAllDecPoints();
        }
    }


}) ();


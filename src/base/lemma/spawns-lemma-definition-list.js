( function() {
    var {
        sn,
        fconf, ssF,
    } = window.b$l.apptree({
    });
    fconf.sappId2lemmaDef = {};

    ///spawns definitions array into definitions dictionary and
    ///fills two incompleted properties
    ssF.spawns_lemsDefArr = function()
    {
        fconf.ix2lemmaDef.forEach( ( ld, ix ) => {
            ld.ix = ix;
            sn( 'caption', ld, 'Undefined Caption' );
            fconf.sappId2lemmaDef[ ld.sappId ] = ld;
        });
    }

}) ();


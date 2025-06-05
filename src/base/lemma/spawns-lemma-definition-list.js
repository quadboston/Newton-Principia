( function() {
    var {
        sn, haz, ha, userOptions,
        fconf, ssF,
    } = window.b$l.apptree({
    });
    fconf.sappId2lemmaDef = {};

    ///spawns definitions array into definitions dictionary and
    ///fills two incompleted properties
    ssF.spawns_lemsDefArr = function()
    {
        let ix2lemmaDefAllowed = fconf.ix2lemmaDefAllowed = [];
        fconf.ix2lemmaDef.forEach( ( ld, ix ) => {
            if( haz( ld, 'EXTRA_MATERIAL' ) &&
                !userOptions.showingBonusFeatures() ) {
                return;
            }
            ld.allowedIx = ix2lemmaDefAllowed.length;
            ix2lemmaDefAllowed.push( ld );
            sn( 'caption', ld, 'Undefined Caption' );
            fconf.sappId2lemmaDef[ ld.sappId ] = ld;
        });
    }

}) ();


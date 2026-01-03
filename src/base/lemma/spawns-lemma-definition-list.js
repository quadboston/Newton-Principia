(function(){
    const {sn, haz, userOptions, fconf, ssF} = window.b$l.apptree({});
    fconf.sappId2lemmaDef = {};
    ///spawns definitions array into definitions dictionary and
    ///fills two incompleted lemma-rack properties
    ssF.spawns_lemsDefArr = function(){
        var ix2lemmaDefAllowed = fconf.ix2lemmaDefAllowed = [];
        const EXTRA = userOptions.showingExtraFeatures();
        fconf.ix2lemmaDef.forEach((
                ld, //lemma-rack
                ix  //lemma index even for empty lemma-racks
            ) => {
                if( haz( ld, 'EXTRA_MATERIAL' ) && !EXTRA ) {
                    return; //returns if lemma-rack is empty
                }
                //assigns this property for allowed lemmas
                ld.allowedIx = ix2lemmaDefAllowed.length;
                ix2lemmaDefAllowed.push( ld );
                //makes ugly caption if missed in def.
                sn( 'caption', ld, 'Undefined Caption' );
                //makes map from sappId to lemma-rack:
                fconf.sappId2lemmaDef[ ld.sappId ] = ld;
        });
    }
})();
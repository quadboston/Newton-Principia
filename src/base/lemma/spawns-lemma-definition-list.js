( function() {
    var {
        sn, haz, userOptions,
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
            let addendums = userOptions.showingBonusFeatures();
            if( !addendums && haz( ld, 'inAddendum' ) ) {
                if( fconf.sappId === ld.sappId ){
                    //// reestablished addendum mode on PC because of
                    //// addendum-lemma is called
                    userOptions.showingBonusFeatures();
                } else {
                    return;
                }
            }
            //ld.ix = ix;  //todom rid
            ld.allowedIx = ix2lemmaDefAllowed.length;
            ix2lemmaDefAllowed.push( ld );
            sn( 'caption', ld, 'Undefined Caption' );
            fconf.sappId2lemmaDef[ ld.sappId ] = ld;
        });
    }

}) ();


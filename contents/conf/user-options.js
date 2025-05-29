( function() {
    var { ns, $$, userOptions, fconf, has, haz, nsconf } = window.b$l.apptree({});
    const LATIN = "latin",
          USE_BG_IMAGE = "use-background-image",
          BONUS = "bonus";
    if (!(LATIN in sessionStorage)) {
        // if LATIN has not been set, assume none are set, and set to default values
        sessionStorage.setItem(LATIN, false);
        sessionStorage.setItem(USE_BG_IMAGE, false);
        sessionStorage.setItem(BONUS, false); //!fconf.basicSiteFeatures);
    }
    if( 
        //the presence of keyword "addendum" at the ending of
        //landing file path is preferred:
        window.location.pathname.match( /addendum[^\/]+$/ )

        //in the presence of keyword "showAddendums" in URL config,
        //but this does not preseve links to other lemmas:
        || haz( nsconf, 'showAddendums' ) ) {

        ////if some call requests bonus features, then they are set in store, and
        ////the next call to different lemma will preserve the bonus,
        sessionStorage.setItem(BONUS, true);
    }
    userOptions.doesStoreOption = doesStoreOption; //only for URL-query for bonusOpt.
    userOptions.showingLatin = showingLatin;
    userOptions.usingBackgroundImage = useBGimage;
    userOptions.showingBonusFeatures = showingBonusFeatures;
    userOptions.userOptions_2_updatedGUI = userOptions_2_updatedGUI;
    userOptions.BONUS_START = "bonus-section-start";
    userOptions.BONUS_END = "bonus-section-end";
    userOptions.shouldShowSubessayMenu = shouldShowSubessayMenu;
    userOptions.setsBonus = setsBonus;
    return;   
    
    ///created for lemmas which labeled as inAddendum and
    ///user did land exactly on one of these
    function setsBonus() {
        doesStoreOption(BONUS, true);
        //check box may be not ready
        //userOptions_2_updatedGUI();        
    }
    
    function showingLatin() {
        return sessionStorage.getItem(LATIN) === 'true';
    }

    function useBGimage() {
        return sessionStorage.getItem(USE_BG_IMAGE) === 'true';
    }

    function showingBonusFeatures() {
        return sessionStorage.getItem(BONUS) === 'true';
    }

    function userOptions_2_updatedGUI() {
        let latinCB = document.getElementById("latinCheckbox");
        latinCB.checked = showingLatin();
        latinCB.onclick = () => {
            doesStoreOption(LATIN, !showingLatin());
        };

        let fadeCB = document.getElementById("fadeCheckbox");
        fadeCB.checked = useBGimage();
        fadeCB.onclick = () => {
            doesStoreOption(USE_BG_IMAGE, !useBGimage());
        };
    }

    function doesStoreOption(option, newValue) {
        sessionStorage.setItem(option, newValue);
    }
    
    //decides whether an entire subessay-menu should be visible
    function shouldShowSubessayMenu(...args) {
        if (args.length > 1) {
            let subexeg = args[1];
            if (subexeg.subessayMenuItem$ === undefined) {
                return false;
            }
        }
        let exAspect = args[0];
        if (exAspect.subexegs.length > 1) {
            let someIsBonus = haz( exAspect.subexegs[1].essayHeader, 'isBonus' );
            return someIsBonus ? showingBonusFeatures() : true;
        }
        return fconf.SHOW_EVEN_SINGLE_SUBESSAY_MENU_ITEM;
    }

}) ();

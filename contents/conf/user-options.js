( function() {
    var { $$, userOptions, fconf, haz } = window.b$l.apptree({});
    const LATIN = "latin",
          USE_BG_IMAGE = "use-background-image",
          BONUS = "bonus";
    if (!(LATIN in sessionStorage)) {
        // if LATIN has not been set, assume none are set, and set to default values
        sessionStorage.setItem(LATIN, false);
        sessionStorage.setItem(USE_BG_IMAGE, false);
        sessionStorage.setItem(BONUS, false);
    }
    userOptions.showingLatin = showingLatin;
    userOptions.usingBackgroundImage = useBGimage;
    userOptions.showingBonusFeatures = showingBonusFeatures;
    userOptions.userOptions_2_updatedGUI = userOptions_2_updatedGUI;
    userOptions.BONUS_START = "bonus-section-start";
    userOptions.BONUS_END = "bonus-section-end";
    userOptions.shouldShowSubessayMenu = shouldShowSubessayMenu;
    return;   
    
    
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
        //sessionStorage.setItem(CHANGED, false);

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

        let bonusCB = document.getElementById("bonusCheckbox");
        bonusCB.checked = showingBonusFeatures();
        bonusCB.onclick = () => {
            doesStoreOption(BONUS, !showingBonusFeatures());
            updateBonusContentVisibility();
        };
        updateBonusContentVisibility();

        function updateBonusContentVisibility()
        {
            ////updates bonus list existance
            let appRoot$ = $$.$(document.querySelector( '.bsl-approot' ));
            appRoot$[ showingBonusFeatures() ? 'addClass' : 'removeClass'  ]
                    ( "shows-bonus-features" );
        }

        function doesStoreOption(option, newValue) {
            sessionStorage.setItem(option, newValue);
        }
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

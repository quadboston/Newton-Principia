( function() {
    var { ns, $$, userOptions, fconf, has, haz, nsconf } = window.b$l.apptree({});
    const LATIN = "latin",
          USE_BG_IMAGE = "use-background-image";
    if (!(LATIN in sessionStorage)) {
        // if LATIN has not been set, assume none are set, and set to default values
        sessionStorage.setItem(LATIN, false);
        sessionStorage.setItem(USE_BG_IMAGE, false);
    }
    userOptions.doesStoreOption = doesStoreOption; //only for URL-query for bonusOpt.
    userOptions.showingLatin = showingLatin;
    userOptions.usingBackgroundImage = useBGimage;
    userOptions.userOptions_2_updatedGUI = userOptions_2_updatedGUI;
    userOptions.shouldShowSubessayMenu = shouldShowSubessayMenu;
    return;   
    
    function showingLatin() {
        return sessionStorage.getItem(LATIN) === 'true';
    }

    function useBGimage() {
        return sessionStorage.getItem(USE_BG_IMAGE) === 'true';
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
            return true;
        }
        return fconf.SHOW_EVEN_SINGLE_SUBESSAY_MENU_ITEM;
    }

}) ();

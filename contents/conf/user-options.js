( function() {
    var { userOptions } = window.b$l.apptree({});
    const LATIN = "latin", USE_BG_IMAGE = "use-background-image", BONUS = "bonus";
    if (!(LATIN in localStorage)) {
        // if LATIN has not been set, assume none are set
        localStorage.setItem(LATIN, true);
        localStorage.setItem(USE_BG_IMAGE, true);
        localStorage.setItem(BONUS, true);
        localStorage.setItem(CHANGED, false);
    }
    userOptions.showingLatin = showingLatin;
    userOptions.usingBackgroundImage = useBGimage;
    userOptions.showingBonusFeatures = showingBonusFeatures;
    userOptions.initializeOptions = initializeOptions;
    userOptions.BONUS_START = "bonus-section-start";
    userOptions.BONUS_END = "bonus-section-end";

    function showingLatin() {
        return localStorage.getItem(LATIN) === 'true';
    }

    function useBGimage() {
        return localStorage.getItem(USE_BG_IMAGE) === 'true';
    }

    function showingBonusFeatures() {
        return localStorage.getItem(BONUS) === 'true';
    }

    function initializeOptions() {
        let latinCB = document.getElementById("latinCheckbox");
        latinCB.checked = showingLatin();
        latinCB.onclick = () => {
            localStorage.setItem(LATIN, !showingLatin());
        };

        let fadeCB = document.getElementById("fadeCheckbox");
        fadeCB.checked = useBGimage();
        fadeCB.onclick = () => {
            localStorage.setItem(USE_BG_IMAGE, !useBGimage());
        };

        let bonusCB = document.getElementById("bonusCheckbox");
        bonusCB.checked = showingBonusFeatures();
        bonusCB.onclick = () => {
            localStorage.setItem(BONUS, !showingBonusFeatures());
            updateBonusContentVisibility();
        };
        updateBonusContentVisibility();

        function updateBonusContentVisibility() {
            let element = document.getElementById(userOptions.BONUS_START);
            if (showingBonusFeatures()) {
                element.removeAttribute("hidden");
            } else {
                element.setAttribute("hidden", "hidden");
            }
        }
    }

}) ();
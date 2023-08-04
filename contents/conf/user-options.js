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
    userOptions.showingBonusFeatures = showingBonusFeatures;
    userOptions.initializeOptions = initializeOptions;
    userOptions.BONUS_START = "bonus-section-start";
    userOptions.BONUS_END = "bonus-section-end";

    function showingLatin() {
        return localStorage.getItem('latin') === 'true';
    }

    function fadingImage() {
        return localStorage.getItem('imageFade') === 'true';
    }

    function showingBonusFeatures() {
        return localStorage.getItem('bonus') === 'true';
    }

    function initializeOptions() {
        let latinCB = document.getElementById("latinCheckbox");
        latinCB.checked = showingLatin();
        latinCB.onclick = () => {
            localStorage.setItem("latin", !showingLatin());
        };

        let fadeCB = document.getElementById("fadeCheckbox");
        fadeCB.checked = fadingImage();
        fadeCB.onclick = () => {
            localStorage.setItem("imageFade", !fadingImage());
        };

        let bonusCB = document.getElementById("bonusCheckbox");
        bonusCB.checked = showingBonusFeatures();
        bonusCB.onclick = () => {
            localStorage.setItem("bonus", !showingBonusFeatures());
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
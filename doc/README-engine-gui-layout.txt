

********************************************
    site achitecture
********************************************
Screen:
    site-navigation menu  - on page top,
    main workspace:
        text workspace        simulation workspace
           lemma-menu           simulation super-scene
           essay                    simulation-scene
            subessay0
               esslay                       svg-scene
               ...                          legend-scene

        for desktop: text workspace - on left, simulation workspace - on right,
        for mobile:  text workspace - on top, simulation workspace - below,

lemma-main-menu
    horizontal: theory-menu: claim/proof/...
    vertical: aspect-menu: Latin, English, Addendum, ...


aspect-menu submenu: subessays - vertical


Lemma can have few study-models (submodels),
    each subessay belongs only to one submodel,
    default submodel is "common"




********************************************
    CSS architecture
********************************************
   topic-engine-css
        <script src="src/base/parser/topics-media-glocss.js"></script>



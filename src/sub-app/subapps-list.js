( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);

    fconf.sappModulesList = {};



    var sappModulesArray = fconf.sappModulesArray =
    [
        {   landingApp : true,  //marks default landing app
            sappId : 'lemma1',
            caption : 'Lemma I',
            sappCodeReference : '',
            annotation : "Core lemma introducing limit method",
            codesList :
            [
                {  src:"sconf.js" },
                {  src:"main.js" },
                {  src:"css/css-order.js" },
                {  src:"css/proof-vs-claim-modes.css.js" },
                {  src:"css/media.css.js" },
                {  src:"core/media.js" },
                {  src:"core/create-proof-slider.js" },
                {  src:"core/limit-demos.js" },
                {  src:"models/study-model.js" },
                {  src:"models/media-model.js" },
                {  src:"models/main-legend.js" },
                {  src:"models/d8d-II.js" }
            ]
        },

        {   sappId : 'lemma2',
            caption : 'Lemma II',
            sappCodeReference : '',
            annotation : "Lorem ipsum dolor set ipsum set dolor acnut lima noir set lorem ipsum doler sut.",
            codesList :
            [
                {  src:"sconf.js" },
                {  src:"css/css-order.js" },
                {  src:"css/widget-media.css.js" },
                {  src:"css/slider.css.js" },
                {  src:"css/model.css.js" },
                {  src:"main.js" },
                {  src:"core/preset-data.js" },
                {  src:"core/dom.js" },
                {  src:"core/d8d-II.js" },
                {  src:"core/gui-construct.js" },
                {  src:"core/gui-slider.js" },
                {  src:"core/gui-update.js" },
                {  src:"core/gui-visibility.js" },
                {  src:"core/gui-widthest.js" },
                {  src:"core/model.js" },
                {  src:"core/event-handlers.js" }
            ]
        },

        {   sappId : 'lemma3',
            caption : 'Lemma III',
            sappCodeReference : 'lemma2',
            annotation : "Lorem ipsum dolor set ipsum set dolor acnut lima noir set lorem ipsum doler sut.",
        },


        {   sappId : 'lemma9',
            caption : 'Lemma IX',
            sappCodeReference : '',
            annotation : "Lorem ipsum dolor set ipsum set dolor acnut lima noir set lorem ipsum doler sut.",
            codesList :
            [
                { src:'sconf.js' },
                { src:'main.js' },
                { src:'css/css-order.js' },
                { src:'css/proof-vs-claim-modes.css.js' },
                { src:'css/media.css.js' },
                { src:'core/media.js' },
                { src:'core/create-proof-slider.js' },
                { src:'models/study-model.js' },
                { src:'models/media-model.js' },
                { src:'models/main-legend.js' },
                { src:'models/d8d-II.js' }
            ]
        }
    ];

    ///spawns modules array into modules list and fills incompleted properties
    sappModulesArray.forEach( function( moduleItem, moduleIx ) {
        if( moduleItem.sappCodeReference ) {
            sappModulesArray.forEach( function( searchItem ) {
                if( searchItem.sappId === moduleItem.sappCodeReference ) {
                    moduleItem.codesList = searchItem.codesList;
                }
            });
        }
        moduleItem.ix = moduleIx;
        fconf.sappModulesList[ moduleItem.sappId ] = moduleItem;
        if( moduleItem.landingApp ) { fconf.landingApp = moduleItem.sappId; }
    });

}) ();


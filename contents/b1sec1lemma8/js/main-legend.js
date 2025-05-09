( function() {
    var {
        eachprop, rg, ssF, stdMod,
    } = window.b$l.apptree({
        stdModExportList : {
            create_digital_legend,
        },
    });

    ////**********************************************************************************
    //// legendScript-format:
    ////
    //// 3D array encompassing all data to be displayed and regularly updated in each tab
    ////    tableData = [
    ////        [[cluster 1], [cluster 2], ...] //defines one whole row
    ////    ]
    ////
    ////    each cluster array has 3 elements: [class-attribute-of-td, caption, value]
    ////    - each element must be a string; eval() will be used to parse value as rg is not yet defined here
    ////
    ////    * class-attribute-of-td will be converted to class attribute of table's cell,
    ////    the "td-" will be prepend, <_> will be replaced with space
    ////    this string is also used in txt links to specify mouseover styling
    ////
    //// Caution: '_' is replaced with ' ' in caption,
    ////**********************************************************************************

    var lemma8Data =  {
        claim : [
            [[ 'RAB', '△RAB : ', 'rg.RAB.area' ]],
            [[ 'RACB', '△RACB : ', 'rg.RACB.area' ]],
            [[ 'RAD', '△RAD : ', 'rg.RAD.area' ]],
            [[ '', '', '' ]], 
            [[ 'RACB-RAB fixed-width', '△RACB / △RAB : ', getRatio('rg.RACB_RAB.ratio') ]],
            [[ 'RAD-RAB fixed-width', '△RAD / △RAB : ', getRatio('rg.RAD_RAB.ratio') ]],
        ]
    };

    lemma8Data.proof = [
        [lemma8Data.claim[0][0], [ 'rAb', '△rAb : ', 'rg.rAb.area' ]],
        [lemma8Data.claim[1][0], [ 'rAcb', '△rAcb : ', 'rg.rAcb.area' ]],
        [lemma8Data.claim[2][0], [ 'rAd', '△rAd : ', 'rg.rAd.area' ]],
        [lemma8Data.claim[3][0], [ '', '', '' ]], 
        [lemma8Data.claim[4][0], [ 'rAcb-rAb fixed-width', '△rAcb / △rAb : ', 'rg.RACB_RAB.ratio' ]],
        [lemma8Data.claim[5][0], [ 'rAd-rAb fixed-width', '△rAd / △rAb : ', 'rg.RAD_RAB.ratio' ]],
    ];

    lemma8Data.corollary = lemma8Data.proof; 

    function getRatio(r) {
        return `
            rg.RAB.area < 0.001 ? "<span class='limit'>at limit<span>" : ${r};
        `;
    }

    // called once per page load
    function create_digital_legend() {
        eachprop( lemma8Data, (tableData, key) => {
            createTable( key, tableData ); // key = "claim", "proof", etc
        });
    }

    function createTable( key, tableData ) {
        var legendScriptParsed = tableData;
        var rowsCount = legendScriptParsed.length;
        var clustersCount = legendScriptParsed[0].length;

        // function defined in /src/base/lemma/media-model/main-legend.js
        ssF.createLogic_phaseLegend({
            tableCaption    : '', 
            noTableTitle    : false,
            stdMod_given    : stdMod,
            logic_phase     : key,
            rowsCount,
            clustersCount,
            makesBodyCluster,
            updatesDataInCell,
        });

        // called once per clustersCount from /media-model/main-legend.js
        function makesBodyCluster({ rowIx, clusterIx, }) {
            return ssF.dataSourceParsed1__2__makesBodyCluster({
                rowIx,
                clusterIx,
                legendScriptParsed,
            })
        }

        // called whenever data changes (user moves point B)
        function updatesDataInCell({ rowIx, clusterIx, }) {
            return ssF.dataSourceParsed1__2__updatesDataInCell({
                rowIx,
                clusterIx,
                legendScriptParsed,
                noEqualSignInNumber : true,
            })
        }
    }

}) ();


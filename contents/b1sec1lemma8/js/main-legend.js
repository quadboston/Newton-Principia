( function() {
    var {
        ns, sn, $$,
        eachprop,
        fconf,
        sconf,
        sDomF,
        rg,
        ssF,
        stdMod,
        toreg,
        amode,
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
    ////
    //// Caution: '_' is replaced with ' ' in caption,
    ////**********************************************************************************

    var lemma8Data =  {
        claim : [
            [[ 'RAB', '△RAB : ', 'rg.RAB.area' ]],
            [[ 'RACB', '△RACB : ', 'rg.RACB.area' ]],
            [[ 'RAD', '△RAD : ', 'rg.RAD.area' ]],
            [[ '', '', '' ]], 
            [[ 'RACB-RAB', '△RACB / △RAB : ', getRatio('RACB', 'RAB') ]],
            [[ 'RAD-RAB', '△RAD / △RAB : ', getRatio('RAD', 'RAB') ]],
        ]
    };

    lemma8Data.proof = [
        [lemma8Data.claim[0][0], [ 'blue', '△rAb : ', 'rg.rAb.area' ]],
        [lemma8Data.claim[1][0], [ 'blue', '△rAcb : ', 'rg.rAcb.area' ]],
        [lemma8Data.claim[2][0], [ 'blue', '△rAd : ', 'rg.rAd.area' ]],
        [lemma8Data.claim[3][0], [ '', '', '' ]], 
        [lemma8Data.claim[4][0], [ 'blue', '△rAcb / △rAb : ', getRatio('rAcb', 'rAb') ]],
        [lemma8Data.claim[5][0], [ 'blue', '△rAd / △rAb : ', getRatio('rAd', 'rAb') ]],
    ];

    lemma8Data.corollary = lemma8Data.proof; 

    function getRatio(t1, t2) {
        return `
            const r = rg.${t1}.area / rg.${t2}.area;
            isNaN(r) ? "<span class='limit'>at limit<span>" : r;
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

        //todo: where is data colour actually being set??
        const greenData = ['RAB', 'RACB', 'RAD', 'RACB-RAB', 'RAD-RAB'];
        greenData.forEach( (id) => {
            let cssName = sDomF.topicIdUpperCase_2_underscore( id ); //converts to format applied by table generator
            //console.log(cssName);
            let cells = document.querySelectorAll('.tp-' + cssName); //html table cells
            cells.forEach( (cell) => {
                cell.classList.add('green');
            });
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


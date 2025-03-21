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
        [lemma8Data.claim[0][0], [ 'rAb', '△rAb : ', 'rg.rAb.area' ]],
        [lemma8Data.claim[1][0], [ 'rAcb', '△rAcb : ', 'rg.rAcb.area' ]],
        [lemma8Data.claim[2][0], [ 'rAd', '△rAd : ', 'rg.rAd.area' ]],
        [lemma8Data.claim[3][0], [ '', '', '' ]], 
        [lemma8Data.claim[4][0], [ 'rAcb', '△rAcb / △rAb : ', getRatio('rAcb', 'rAb') ]],
        [lemma8Data.claim[5][0], [ 'rAd', '△rAd / △rAb : ', getRatio('rAd', 'rAb') ]],
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
            console.log(cssName);
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


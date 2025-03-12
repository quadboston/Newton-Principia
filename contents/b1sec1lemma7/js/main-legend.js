( function() {
    var {
        ns, sn, $$,
        eachprop,
        fconf,
        sconf,
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

    var lemma7Data =  {
        claim : [
            [[ 'AB', 'AB : ', getVal('rg.AB.abs', '0.000') ]],
            [[ 'AD', 'AD : ', getVal('rg.AD.abs', '0.000') ]],
            [[ 'arc-AB', 'arc ACB : ', getVal('rg.AB.arcLen', '0.000') ]],
            [[ '', '', '' ]], //small space
            [[ 'AD', 'AD / AB : ', getLineRatio('AD') ]],
            [[ 'arc-AB', 'arc ACB / AB : ', getArcRatio('AB') ]],
        ]
    };

    lemma7Data.proof = [
        [lemma7Data.claim[0][0], [ 'Ab', 'Ab : ', getVal('rg.Ab.abs', 'rg.Ab.abs') ]],
        [lemma7Data.claim[1][0], [ 'Ad', 'Ad : ', getVal('rg.Ad.abs', 'rg.Ab.abs') ]],
        [lemma7Data.claim[2][0], [ 'arc-Ab', 'arc Acb : ', getVal('rg.Ab.arcLen', 'rg.Ab.abs') ]],
        [[ '', '', '' ], [ '', '', '' ]], //small space
        [lemma7Data.claim[4][0], [ 'Ad', 'Ad / Ab : ', getVal('(rg.Ad.abs.toFixed(3)/rg.Ab.abs.toFixed(3)).toFixed(3)', '1.000') ]],
        [lemma7Data.claim[5][0], [ 'arc-Ab', 'arc Acb / Ab : ', getVal('(rg.Ab.arcLen.toFixed(3)/rg.Ab.abs.toFixed(3)).toFixed(3)', '1.000') ]], 
    ];

    lemma7Data.corollary = [
        [lemma7Data.claim[0][0], [ '', '', '' ]],
        [lemma7Data.claim[1][0], lemma7Data.claim[4][0]],
        [lemma7Data.claim[2][0], lemma7Data.claim[5][0]],
        [[ 'BF', 'BF : ', 'rg.BF.abs' ], [ 'BF', 'BF / AB : ', getLineRatio('BF') ]], 
        [[ 'AE', 'AE : ', 'rg.AE.abs'], [ 'AE', 'AE / AB : ', getLineRatio('AE') ]],
        [[ 'BG', 'BG : ', 'rg.BG.abs' ], [ 'BG', 'BG / AB : ', getLineRatio('BG') ]], 
    ]; 

    // when AB <= 0.01 we're rounding to zero because the calculations become innaccurate at small values
    // param val: calculated value for when AB > 0.01
    // param zero: value to display at "zero" condition
    function getVal(val, zero) {
        return `
            rg.AB.abs.toFixed(3) <= sconf.NON_ZERO_A_PREVENTOR ? ${zero} : ${val};
        `;
    }
    
    // coding these as strings is bad practice, but necessary for now to play nice with framework
    // specifically, rg is not available when this module is initiated,
    // and data is parsed with eval() in main-legend-templates.js, so it would throw errors

    function getLineRatio(line) {
        return `
            rg.AB.abs.toFixed(3) <= sconf.NON_ZERO_A_PREVENTOR ?
            "<span class='limit'>at limit<span>" : 
            (rg.${line}.abs.toFixed(3)/rg.AB.abs.toFixed(3)).toFixed(3)
        `;
    }

    function getArcRatio(arc) {
        return `
            rg.AB.abs.toFixed(3) <= sconf.NON_ZERO_A_PREVENTOR ? 
            "<span class='limit'>at limit<span>" : 
            (rg.${arc}.arcLen.toFixed(3)/rg.AB.abs.toFixed(3)).toFixed(3)
        `;
    }


    // called once per page load
    function create_digital_legend() {
        eachprop( lemma7Data, (tableData, key) => {
            createTable( key, tableData ); // key = "claim", "proof", etc
        });
    }

    function createTable( key, tableData ) {
        var legendScriptParsed = tableData;
        var rowsCount = legendScriptParsed.length;
        var clustersCount = legendScriptParsed[0].length;

        // function defined in /src/base/lemma/media-model/main-legend.js
        ssF.createtextSectionLegend({
            tableCaption    : '', 
            noTableTitle    : false,
            stdMod_given    : stdMod,
            textSection        : key,
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


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

    var lemma7Data =  {
        claim : [
            [[ 'AB', 'AB : ', getVal('rg.AB.abs', '0.000') ]],
            [[ 'AD', 'AD : ', getVal('rg.AD.abs', '0.000') ]],
            [[ 'arc-AB', 'arc ACB : ', getVal('rg.AB.arcLen', '0.000') ]],
            [[ '', '', '' ]], //small space
            [[ 'claimRatio', 'AD / AB : ', getLineRatio('AD', 'AB') ]],
            [[ 'claimRatio', 'arc ACB / AB : ', getArcRatio('AB', 'AB') ]],
        ]
    };

    lemma7Data.proof = [
        [lemma7Data.claim[0][0], [ 'Ab', 'Ab : ', getVal('rg.Ab.abs', 'rg.Ab.abs') ]],
        [lemma7Data.claim[1][0], [ 'Ad', 'Ad : ', getVal('rg.Ad.abs', 'rg.Ab.abs') ]],
        [lemma7Data.claim[2][0], [ 'arc-Ab', 'arc Acb : ', getVal('rg.Ab.arcLen', 'rg.Ab.abs') ]],
        [[ '', '', '' ], [ '', '', '' ]], //small space
        [lemma7Data.claim[4][0], [ 'proofRatio', 'Ad / Ab : ', getVal('(rg.Ad.abs.toFixed(3)/rg.Ab.abs.toFixed(3)).toFixed(3)', '1.000') ]],
        [lemma7Data.claim[5][0], [ 'proofRatio', 'arc Acb / Ab : ', getVal('(rg.Ab.arcLen.toFixed(3)/rg.Ab.abs.toFixed(3)).toFixed(3)', '1.000') ]], 
    ];

    // all 3 corollaries defined as one big table so framework updates their data properly
    // rows shown/hidden in media-upcreate.js, based on which cor is selected 
    lemma7Data.corollary = [
        //corollary 1
        [[ 'BF', 'BF : ', 'rg.BF.abs' ], [ '', '', '' ]],
        [lemma7Data.claim[2][0], [ '', '', '' ]], //arc ACB 
        [[ '', '', '' ], [ '', '', '' ]],
        [[ 'BF', 'BF / arc ACB : ', getCor1Ratio() ], [ '', '', '' ]],

        //corollary 2
        [lemma7Data.claim[1][0], [ '', '', '' ]], //AD
        [[ 'AE', 'AE : ', 'rg.AE.abs'], [ '', '', '' ]],
        [lemma7Data.claim[0][0], [ '', '', '' ]], //AB
        [lemma7Data.claim[2][0], [ '', '', '' ]], //arc ACB
        [[ '', '', '' ], [ '', '', '' ]],
        [[ 'AE', 'AE / AD : ', getLineRatio('AE', 'AD') ], [ '', '', '' ]],
        [[ 'AB', 'AB / AD : ', getLineRatio('AB', 'AD') ], [ '', '', '' ]],
        [[ 'AD', 'arc ACB / AD : ', getArcRatio('AB', 'AD') ], [ '', '', '' ]], 
        
        //corollary 3
        [lemma7Data.claim[0][0], [ '', '', '' ]],
        [lemma7Data.claim[1][0], lemma7Data.claim[4][0]],
        [lemma7Data.claim[2][0], lemma7Data.claim[5][0]],
        [[ 'BF', 'BF : ', 'rg.BF.abs' ], [ 'BF', 'BF / AB : ', getLineRatio('BF', 'AB') ]], 
        [[ 'AE', 'AE : ', 'rg.AE.abs'], [ 'AE', 'AE / AB : ', getLineRatio('AE', 'AB') ]],
        [[ 'BG', 'BG : ', 'rg.BG.abs' ], [ 'BG', 'BG / AB : ', getLineRatio('BG', 'AB') ]], 
    ]; 

    // when AB <= NON_ZERO_A_PREVENTOR we're rounding to zero because the calculations become innaccurate at small values
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

    function getLineRatio(line1, line2) {
        return `
            rg.AB.abs.toFixed(3) <= sconf.NON_ZERO_A_PREVENTOR ?
            "<span class='limit'>at limit<span>" : 
            (rg.${line1}.abs.toFixed(3)/rg.${line2}.abs.toFixed(3)).toFixed(3)
        `;
    }

    function getArcRatio(arc, line) {
        return `
            rg.AB.abs.toFixed(3) <= sconf.NON_ZERO_A_PREVENTOR ? 
            "<span class='limit'>at limit<span>" : 
            (rg.${arc}.arcLen.toFixed(3)/rg.${line}.abs.toFixed(3)).toFixed(3)
        `;
    }

    function getCor1Ratio() {
        return `
            rg.AB.abs.toFixed(3) <= sconf.NON_ZERO_A_PREVENTOR ? 
            "<span class='limit'>at limit<span>" : 
            (rg.BF.abs.toFixed(3)/rg.AB.arcLen.toFixed(3)).toFixed(3)
        `;
    }


    // called once per page load
    function create_digital_legend() {
        //console.log(sconf);
        eachprop( lemma7Data, (tableData, key) => {
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
            logic_phase        : key,
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


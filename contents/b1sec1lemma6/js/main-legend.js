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

    var lemma6Data =  {
        claim : [
            [[ 'angleBAD', 'angle BAD : ', '-rg.AB.angleGrad.toFixed()+"ᵒ"' ]]
        ],
        proof : [
            [[ 'angleBAD',  'angle BAD : ', '-rg.AB.angleGrad.toFixed()+"ᵒ"' ]],
            [[ 'L', 'rectilinear angle : ', '(-(rg.curveRotationAngle.angle+rg.originalGapTangent.angle)*180/Math.PI).toFixed()+"ᵒ"' ]]
        ]
    };

    var lemma7Data =  {
        claim : [
            [[ 'AB', 'AB : ', 'rg.AB.abs' ]],
            [[ 'AD', 'AD : ', 'rg.AD.abs' ]],
            [[ 'arc-AB', 'arc ACB : ', 'rg.AB.arcLen' ]],
            [[ '', '', '' ]], //small space
            [[ 'AD', 'AD / AB : ', getLineRatio('AD', 'AB') ]],
            [[ 'arc-AB', 'arc ACB / AB : ', getArcRatio() ]],
        ]
    };

    lemma7Data.proof = [
        [lemma7Data.claim[0][0], [ 'Ab', 'Ab : ', 'rg.Ab.abs' ]],
        [lemma7Data.claim[1][0], [ 'Ad', 'Ad : ', 'rg.AB.abs <= 0.01 ? rg.Ab.abs : rg.Ad.abs' ]],
        [lemma7Data.claim[2][0], [ 'arc-Ab', 'arc Acb : ', 'rg.AB.abs <= 0.01 ? rg.Ab.abs : rg.Ab.arcLen' ]],
        [[ '', '', '' ], [ '', '', '' ]], //small space
        [lemma7Data.claim[4][0], [ 'Ad', 'Ad / Ab : ', 'rg.AB.abs <= 0.01 ? 1.000 : (rg.Ad.abs.toFixed(3)/rg.Ab.abs.toFixed(3)).toFixed(3)' ]],
        [lemma7Data.claim[5][0], [ 'arc-Ab', 'arc Acb / Ab : ', 'rg.AB.abs <= 0.01 ? 1.000 : (rg.Ab.arcLen.toFixed(3)/rg.Ab.abs.toFixed(3)).toFixed(3)' ]], 
    ];

    lemma7Data.corollary = [
        [lemma7Data.claim[0][0], [ '', '', '' ]],
        [lemma7Data.claim[1][0], lemma7Data.claim[4][0]],
        [lemma7Data.claim[2][0], lemma7Data.claim[5][0]],
        [[ 'BF', 'BF : ', 'rg.BF.abs' ], [ 'BF', 'BF / AB : ', getLineRatio('BF', 'AB') ]], 
        [[ 'AE', 'AE : ', 'rg.AE.abs'], [ 'AE', 'AE / AB : ', getLineRatio('AE', 'AB') ]],
        [[ 'BG', 'BG : ', 'rg.BG.abs' ], [ 'BG', 'BG / AB : ', getLineRatio('BG', 'AB') ]], 
    ];    

    // coding this as strings is bad practice, but necessary for now to play nice with framework
    // specifically, rg is not available when this module is initiated,
    // and data is parsed with eval() in main-legend-templates.js, so it would throw errors
    function getLineRatio(p1, p2) {
        return `
            isNaN((rg.${p1}.abs.toFixed(3)/rg.${p2}.abs.toFixed(3)).toFixed(3)) ?
            "<span class='limit'>at limit<span>" : 
            (rg.${p1}.abs.toFixed(3)/rg.${p2}.abs.toFixed(3)).toFixed(3)
        `;
    }

    function getArcRatio() {
        return `
            isNaN((rg.AB.arcLen.toFixed(3)/rg.AB.abs.toFixed(3)).toFixed(3)) ? 
            "<span class='limit'>at limit<span>" : 
            (rg.AB.arcLen.toFixed(3)/rg.AB.abs.toFixed(3)).toFixed(3)
        `;
    }


    // called once per page load
    function create_digital_legend() {
        var data = fconf.sappId === "b1sec1lemma6" ? lemma6Data : lemma7Data;
        eachprop( data, (tableData, key) => {
            createTable( key, tableData ); // key = "claim", "proof", etc
        });
    }

    function createTable( key, tableData ) {
        var legendScriptParsed = tableData;
        var rowsCount = legendScriptParsed.length;
        var clustersCount = legendScriptParsed[0].length;

        // function defined in /src/base/lemma/media-model/main-legend.js
        ssF.createtextSectionLegend({
            tableCaption    : '', //'Areas and Ratios',
            noTableTitle    : false,
            stdMod_given    : stdMod,
            textSection        : key,
            rowsCount,
            clustersCount,
            //makesCaptionCluster, //optional
            //updatesCaptionCluster, //optional
            makesBodyCluster,
            updatesDataInCell,
        });

        // called once per clustersCount from /media-model/main-legend.js
        function makesBodyCluster({ rowIx, clusterIx, }) {
            return ssF.dataSourceParsed1__2__makesBodyCluster({
                rowIx,
                clusterIx,
                legendScriptParsed,
                //noEqualSign : true,
                //alignCaptionToRight : true,
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


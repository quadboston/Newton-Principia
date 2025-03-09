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
        claim : [[
            [ 'angleBAD', 'angle BAD : ', '""' ],
            [ 'angleBAD', '', '-rg.AB.angleGrad.toFixed()+"ᵒ"' ]
        ]],
        proof : [[
            [ 'angleBAD',  'angle BAD : ', '""' ],
            [ 'angleBAD', '', '-rg.AB.angleGrad.toFixed()+"ᵒ"' ]
        ],[
            [ 'L', 'rectilinear angle : ', '""' ],
            [ 'L', '', '(-(rg.curveRotationAngle.angle+rg.originalGapTangent.angle)*180/Math.PI).toFixed()+"ᵒ"' ]
        ]]
    };

    var lemma7Data =  {
        claim : [
            [[ 'AB', 'AB :    ', 'rg.AB.abs' ]],
            [[ 'AD', 'AD : ', 'rg.AD.abs' ]],
            [[ 'arc-AB', 'arc ACB : ', 'rg.AB.arcLen' ]],
            [[ '', '', '' ]], //small space
            [[ 'AD', 'AD / AB : ', 'isNaN((rg.AD.abs.toFixed(3)/rg.AB.abs.toFixed(3)).toFixed(3)) ? "at limit" : (rg.AD.abs.toFixed(3)/rg.AB.abs.toFixed(3)).toFixed(3)' ]],
            [[ 'arc-AB', 'arc&nbsp;ACB&nbsp;/&nbsp;AB&nbsp;:&nbsp;', 'isNaN((rg.AB.arcLen.toFixed(3)/rg.AB.abs.toFixed(3)).toFixed(3)) ? "at limit" : (rg.AB.arcLen.toFixed(3)/rg.AB.abs.toFixed(3)).toFixed(3)' ]], //todo: why removing space chars from this one break formatting?
        ],
        proof : [
            [[ 'AB', 'AB :    ', 'rg.AB.abs' ], [ 'Ab', 'Ab&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', 'rg.Ab.abs' ]],
            [[ 'AD', 'AD : ', 'rg.AD.abs' ], [ 'Ad', 'Ad : ', 'rg.AB.abs <= 0.01 ? rg.Ab.abs : rg.Ad.abs' ]],
            [[ 'arc-AB', 'arc ACB : ', 'rg.AB.arcLen' ], [ 'arc-Ab', 'arc&nbsp;Acb&nbsp;:&nbsp;', 'rg.AB.abs <= 0.01 ? rg.Ab.abs : rg.Ab.arcLen' ]],
            [[ '', '', '' ], [ '', '', '' ]], //small space
            [[ 'AD', 'AD / AB : ', 'isNaN((rg.AD.abs.toFixed(3)/rg.AB.abs.toFixed(3)).toFixed(3)) ? "at limit" : (rg.AD.abs.toFixed(3)/rg.AB.abs.toFixed(3)).toFixed(3)' ], 
                [ 'Ad', 'Ad / Ab : ', 'rg.AB.abs <= 0.01 ? 1.000 : (rg.Ad.abs.toFixed(3)/rg.Ab.abs.toFixed(3)).toFixed(3)' ]],
            [[ 'arc-AB', 'arc&nbsp;ACB&nbsp;/&nbsp;AB&nbsp;:&nbsp;', 'isNaN((rg.AB.arcLen.toFixed(3)/rg.AB.abs.toFixed(3)).toFixed(3)) ? "at limit" : (rg.AB.arcLen.toFixed(3)/rg.AB.abs.toFixed(3)).toFixed(3)' ], 
                [ 'arc-Ab', 'arc&nbsp;Acb&nbsp;/&nbsp;Ab&nbsp;:&nbsp;', 'rg.AB.abs <= 0.01 ? 1.000 : (rg.Ab.arcLen.toFixed(3)/rg.Ab.abs.toFixed(3)).toFixed(3)' ]], 
        ]
    };
    
    lemma7Data.corollary = lemma7Data.claim; //todo: temp

    // lemma7Data.corollary = lemma7Data.proof.concat(
    //     fconf.sappId === "b1sec1lemma8" ?
    //     [] :
    //     [
    //         //third+1 table row
    //             //first cell
    //             'BF,BF&nbsp;=&nbsp;,rg.BF.abs' +

    //             ' ' +
    //             //second cell
    //             'conterminousRatio,BF&nbsp;/&nbsp;AB&nbsp;=&nbsp;,(rg.BF.abs/rg.AB.abs).toFixed(3)',

    //         //fourth+1 table row
    //             //first cell
    //             'AE,AE&nbsp;=&nbsp;,rg.AE.abs' +

    //             ' ' +
    //             //second cell
    //             'conterminousRatio,AE&nbsp;/&nbsp;AB&nbsp;=&nbsp;,(rg.AE.abs/rg.AB.abs).toFixed(3)',

    //         //fifth+1 table row
    //             //first cell
    //             'BG,BG&nbsp;=&nbsp;,rg.BG.abs' +

    //             ' ' +
    //             //second cell
    //             'conterminousRatio,BG&nbsp;/&nbsp;AB&nbsp;=&nbsp;,(rg.BG.abs/rg.AB.abs).toFixed(3)'
    // ]);


    // called once per page load
    function create_digital_legend()
    {
        var data = fconf.sappId === "b1sec1lemma6" ? lemma6Data : lemma7Data;
        eachprop( data, (tableData, key) => {
            createTable( key, tableData ); // key = "claim", "proof", etc
        });
    }

    function createTable( key, tableData )
    {
        var legendScriptParsed = tableData;
        var rowsCount       = legendScriptParsed.length;
        var clustersCount   = legendScriptParsed[0].length;

        // called from
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
        function makesBodyCluster({ rowIx, clusterIx, }){
            return ssF.dataSourceParsed1__2__makesBodyCluster({
                rowIx,
                clusterIx,
                legendScriptParsed,
                //noEqualSign : true,
                //alignCaptionToRight : true,
            })
        }

        function updatesDataInCell({ rowIx, clusterIx, })
        {
            return ssF.dataSourceParsed1__2__updatesDataInCell({
                rowIx,
                clusterIx,
                legendScriptParsed,
                noEqualSignInNumber : true,
            })
        }
    }

}) ();


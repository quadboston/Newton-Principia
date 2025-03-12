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

    // called once per page load
    function create_digital_legend() {
        eachprop( lemma6Data, (tableData, key) => {
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


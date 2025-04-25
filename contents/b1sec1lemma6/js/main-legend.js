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

    var lemma6Data =  {
        claim : [
            [[ 'angleBAD fixed-width', 'angle BAD : ', '-rg.AB.angleGrad.toFixed()+"ᵒ"' ]]
        ],
        proof : [
            [[ 'angleBAD fixed-width',  'angle BAD : ', '-rg.AB.angleGrad.toFixed()+"ᵒ"' ]],
            [[ 'L fixed-width', 'rectilinear angle : ', '(-(rg.curveRotationAngle.angle+rg.originalGapTangent.angle)*180/Math.PI).toFixed()+"ᵒ"' ]]
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


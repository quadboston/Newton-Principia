( function() {
    var {
        ns, sn, $$,
        sconf,
        rg,
        ssF,
        stdMod,
        toreg,
        amode,
    } = window.b$l.apptree({
        stdModExportList :
        {
            create_digital_legend,
        },
    });
    return;









    function create_digital_legend()
    {
        return;
        //see lemma 11 for the sample
        /*
        create_digital_legend_for_logic_phase( 'proof' );
        create_digital_legend_for_logic_phase( 'corollary' );
        */
    }

    function create_digital_legend_for_logic_phase( logic_phase )
    {
        //--------------------------
        // //\\ data source scenario
        //--------------------------
        var legendScript =
        [
            ////**********************************************************************************
            ////legendScript-format:
            ////clusters separated with <space>:
            ////'topic,caption,JS-expression-of-value-in-local-JS-context <space> next-token ... '
            ////<space> is vital, no <space> in clusters,
            ////
            ////see: function dataSourceParsed1__2__makesBodyCluster({
            ////
            ////'_' is replaced with ' ' in caption,
            ////**********************************************************************************


             //first table row
            'none,,null none,,"left&nbsp;area:"        ' +
            'none,,"right&nbsp;area:"        ' +
            'none,,"left&nbsp;/&nbsp;right&nbsp;ratio:"',


             //second table row
            'none,,"bar&nbsp;to&nbsp;bar&nbsp;ratio:" ' +
            'none,,""        ' +
            'none,,""        ' +
            'none,,"min:"+rg.barRatioMin.val+"&nbsp;&nbsp;"+' +
                   '"max:"+rg.barRatioMax.val',

             //third table row
            'none,,"bars&nbsp;sum:"    leftBarsArea,,rg.leftBarsArea.value        ' +
            'rightBarsArea,,rg.rightBarsArea.value        ' +
            'barsRatio,,rg.leftBarsArea.value/rg.rightBarsArea.value',

             //third table row
            'none,,"figure:"  acE,,rg.leftFunction.funArea  ' +
            'prT,,rg.rightFunction.funArea  ' +
            'figuresRatio,,rg.leftFunction.funArea/rg.rightFunction.funArea',
        ];

        ///spawns configuration
        ///returns array-of-lines, line = array-of-clusters, cluster=array-of-tokens,
        var legendScriptParsed = legendScript.map( (line,lix) => {
            var lparsed = line.split(/\s+/);
            return lparsed.map( clusterToken => {
                return clusterToken.split(',');
            });
        });
        var rowsCount       = legendScriptParsed.length;
        var clustersCount   = legendScriptParsed[0].length;
        //--------------------------
        // \\// data source scenario
        //--------------------------

        ssF.createLogic_phaseLegend({
            tableCaption    : 'Areas and Ratios',
            noTableTitle    : false,
            stdMod_given    : stdMod,
            logic_phase,
            rowsCount,
            clustersCount,
            //makesCaptionCluster, //optional
            //updatesCaptionCluster, //optional
            makesBodyCluster,
            updatesDataInCell,
        })
        return;



        /*
        //no dice for caption row
        ///================================================
        ///================================================
        function makesCaptionCluster({
            row,
            clusterIx,
        }){
            var rowIx = 'caprow';
            var id = rowIx+'-' + clusterIx + '-letter';
            return {
                style               :
                [
                    [
                        ['border-left', '1px solid grey'],
                        ['padding-left', '6px'],
                    ],
                ],
                clusterKey: id,
                //clusterCaption: '', //will be filled dynamically
                tpCssName: 'experimental ' + id,
                noEqualSign : true,
                //fillerAfterValue : '&nbsp;',
            };
        }

        ///================================================
        /// updates captions
        ///================================================
        function updatesCaptionCluster({ clusterIx, })
        {
            var capt = [ 'left', '', 'right', '', 'left / right', '' ][ clusterIx ];
            return { columnCaptionTitle : capt, clusterCellIx:0  };
        }
        */

        function makesBodyCluster({ rowIx, clusterIx, }){
            return ssF.dataSourceParsed1__2__makesBodyCluster({
                rowIx,
                clusterIx,
                legendScriptParsed,
            })
        }

        function updatesDataInCell({ rowIx, clusterIx, })
        {
            return ssF.dataSourceParsed1__2__updatesDataInCell({
                rowIx,
                clusterIx,
                legendScriptParsed,
            })
        }
    }
    //=========================================
    // \\// creates logic_phase table
    //=========================================

}) ();


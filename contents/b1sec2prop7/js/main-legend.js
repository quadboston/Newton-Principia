( function() {
    var {
        ns, sn, $$,
        sconf, sDomF, ssF, sData,
        rg, stdMod, toreg, amode,
    } = window.b$l.apptree({
        stdModExportList :
        {
            create_digital_legend,
        },
    });
    return;









    function create_digital_legend()
    {
        //see lemma 11 for the sample
        create_digital_legend_for_logic_phase( 'proof' );
        create_digital_legend_for_logic_phase( 'corollary' );
    }

    function create_digital_legend_for_logic_phase( logic_phase )
    {
        //sample:
        //let sagittaColor = sDomF.getFixedColor( 'sagitta' ).replace( / /g, '<_>' ).replace( /,/g, '<>' );

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
            ////**********************************************************************************

            ///how this can be a topic? dtime<_>data-monospace
            ///is not dtime a topic only,
            ///
            ///yes commend does mislead, the first token is tpCssName
            ///and goes to css-class after <_> is replaced with space,

            ///but still misleads, "data-monospace" used nowhere, it is just
            ///deleted, but other token are not and will go to css-class,
            ///just append any number of them separated with <_>

            'dtime<_>data-monospace,Δt&nbsp;:,"&nbsp;"+(rg.tForSagitta.val*2).toFixed(4)',

            '_s_p,SP&nbsp;:,"&nbsp;"+rg.SP.vector.abs.toFixed(4)',
            '_r_l,RL&nbsp;:,"&nbsp;"+rg.RL.vector.abs.toFixed(4)',
            '_p_v,PV&nbsp;:,"&nbsp;"+rg.PV.vector.abs.toFixed(4)',

            'estimated_force<_>data-monospace,Estimated_force_at_P&nbsp;:,"&nbsp;"+stdMod.graphFW_lemma.fw.content.pix2values[stdMod.P2gix()].y[4].toFixed(4)'
            ,

            'force<_>data-monospace,Actual_force_at_P&nbsp;:,"&nbsp;"+stdMod.graphFW_lemma.fw.content.pix2values[stdMod.P2gix()].y[0].toFixed(4)'
            ,

            'none,_,"<_>"'

            , //dummy row for spacing at foot
            'none,_,"<_>"' //dummy row for spacing at foot
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
            createsIdleFirstRow_forFormat,
        });
        return;



        function makesBodyCluster({ rowIx, clusterIx, }){
            return ssF.dataSourceParsed1__2__makesBodyCluster({
                rowIx,
                clusterIx,
                legendScriptParsed,
                //noEqualSign : true,
                alignCaptionToRight : true,
            })
        }

        function updatesDataInCell({ rowIx, clusterIx, })
        {
            //patch: disables second row of the table, the raw of dt
            rg[ 'main-legend' ][ logic_phase ].tableDom.children[1].style.display = 'none';

            return ssF.dataSourceParsed1__2__updatesDataInCell({
                rowIx,
                clusterIx,
                legendScriptParsed,
                noEqualSignInNumber : true,
            })
        }

        function createsIdleFirstRow_forFormat( tb, logic_phase )
        {
            //=====================================================
            // //\\ idle first row to format table for fixed-layout
            //=====================================================
            var row = $$.c('tr')
                //vital ... removes global css which corrupts table
                //aka .addClass( 'proof row1 tostroke' )
                .addClass( logic_phase +' tostroke')

                .css( 'visibility', 'hidden' ) //todm ... tmp fix
                .to(tb)
                ();
            //:todm ... kitchen ... non-reliable
            $$.c('td').html( 'Estimated-force-s--at-P-(per-smax)xxxxxxx' ).to(row);
            $$.c('td').html( '-0.333' ).to(row);
            $$.c('td').html( '-0.333xxx' ).to(row);
            //=====================================================
            // \\// idle first row to format table for fixed-layout
            //=====================================================
        }

    }
    //=========================================
    // \\// creates logic_phase table
    //=========================================

}) ();


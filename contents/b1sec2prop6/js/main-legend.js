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
        create_digital_legend_for_theorion( 'proof' );
        return;
        //create_digital_legend_for_theorion( 'corollary' );
    }

    function create_digital_legend_for_theorion( theorion )
    {
        let forceColor = sDomF.getFixedColor( 'force' ).replace( / /g, '<_>' ).replace( /,/g, '<>' );
        let sagittaColor = sDomF.getFixedColor( 'sagitta' ).replace( / /g, '<_>' ).replace( /,/g, '<>' );
        let dtimeColor = sDomF.getFixedColor( 'dtime' ).replace( / /g, '<_>' ).replace( /,/g, '<>' );

        let tool_qix = stdMod.pos2qix();
        let tool_pointP = stdMod.graphFW_lemma.graphArray[tool_qix];
        let f_fmax = tool_pointP.y[0].toFixed(4);
        let s_smax = tool_pointP.y[1].toFixed(4);
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
            'dtime,Δt__:,(rg.tForSagitta.val*2).toFixed(4)',
            'P<>sagitta,Estimated_force_s_at_P_(per_smax)__:,stdMod.graphFW_lemma.graphArray[stdMod.pos2qix()].y[1].toFixed(4)',
            'force,Force_f_at_P_(per_fmax)__:,stdMod.graphFW_lemma.graphArray[stdMod.pos2qix()].y[0].toFixed(4)',
            'none,_,"<_>"', //dummy row for spacing at foot
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

        ssF.createTheorionLegend({
            tableCaption    : '',
            noTableTitle    : true,
            stdMod_given    : stdMod,
            theorion,
            rowsCount,
            clustersCount,
            //makesCaptionCluster, //optional
            //updatesCaptionCluster, //optional
            makesBodyCluster,
            updatesDataInCell,
            createsIdleFirstRow_forFormat,
        })
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
            return ssF.dataSourceParsed1__2__updatesDataInCell({
                rowIx,
                clusterIx,
                legendScriptParsed,
                noEqualSignInNumber : true,
            })
        }
        
        function createsIdleFirstRow_forFormat( tb, theorion )
        {
            //=====================================================
            // //\\ idle first row to format table for fixed-layout
            //=====================================================
            var row = $$.c('tr')
                //vital ... removes global css which corrupts table
                //aka .addClass( 'proof row1 tostroke' )
                .addClass( theorion +' tostroke')

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
    // \\// creates theorion table
    //=========================================

}) ();


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
        create_digital_legend_for_textSection( 'proof' );
        create_digital_legend_for_textSection( 'corollary' );
    }

    function create_digital_legend_for_textSection( textSection )
    {
        //--------------------------
        // //\\ data source scenario
        //--------------------------
        var legendScript =
        [
             ////legendScript-format: 'topic,caption,JS-expression-of-value-in-local-JS-context <space> next-token ... '
            'bd,bd,rg.bd.abs        BD,BD,rg.BD.abs     bd-BD,r1=bd/BD,rg.bd.abs/rg.BD.abs                                  limitRatio,(bx/BX)²,(rg.b.pos[0]/rg.B.pos[0])*(rg.b.pos[0]/rg.B.pos[0])',
            'Ab,Ab,rg.Ab.abs        AB,AB,rg.AB.abs     Ab2-AB2,r2=Ab²/AB²,rg.Ab.abs2/rg.AB.abs2      ,,""',  
            ',,""                   ,,""                claimRatio,r1/r2,rg.bd.abs/rg.BD.abs/(rg.Ab.abs2/rg.AB.abs2)        ,,""',
        ];

        ///spawns configuration
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

        ssF.createtextSectionLegend({
            stdMod_given : stdMod,
            textSection,
            rowsCount,
            clustersCount,
            noTableTitle : true,
            makesBodyCluster,
            updatesDataInCell,
        })
        return;





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
    // \\// creates textSection table
    //=========================================

}) ();


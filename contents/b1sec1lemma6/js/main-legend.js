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
        stdModExportList :
        {
            create_digital_legend,
        },
    });




    ////**********************************************************************************
    ////legendScript-format:
    ////
    ////clusters separated with <space>:
    ////'class-attribute-of-td,caption,JS-expression-of-value-in-local-JS-context <space> next-cluster ... '
    ////<space> is vital, no <space> inside clusters,
    ////
    ////class-attribute-of-td will be converted to class attribute of table's cell td,
    ////the "td-" will be prepend, <_> will be replaced with space
    ////to divide classes in class attribute of td,
    ////see: function dataSourceParsed1__2__makesBodyCluster({
    ////
    ////'_' is replaced with ' ' in caption,
    ////**********************************************************************************


    //==========================
    // //\\ lemma 6 scripts
    // //\\ claim's script
    //--------------------------
    var legendScript =  {
        claim : 
        [
            //first table row
                //first cell
                'angleBAD,angle&nbsp;BAD&nbsp;=&nbsp;,""' +

                ' ' +
                //second cell
                'angleBAD,,' +
                '-rg.AB.angleGrad.toFixed()+"ᵒ"'
        ]
    };
    //--------------------------
    // \\// claim's script
    //--------------------------



    //--------------------------
    // //\\ proof's script
    //--------------------------
    legendScript.proof = legendScript.claim.concat([
        //second table row
             //first cell
            'L,rectilinear&nbsp;angle&nbsp;=&nbsp;,""' +

            ' ' +
            //second cell

            'L,,' +
            '(-(rg.curveRotationAngle.angle+rg.originalGapTangent.angle)*' +
            '180/Math.PI).toFixed()+"ᵒ"'
    ]);
    //--------------------------
    // \\// proof's script
    // \\// lemma 6 scripts
    //==========================






    //==========================
    // //\\ lemma 7 scripts
    // //\\ claim's script
    //--------------------------
    var legendScript7 =  {
        claim : 
        [
            //first table row
                //first cell
                'AB,AB&nbsp;=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,rg.AB.abs' +

                ' ' +
                //second cell
                'conterminousRatio,,""',

            //second table row
                //first cell
                'AD,AD&nbsp;=&nbsp;,rg.AD.abs' +

                ' ' +
                //second cell
                'conterminousRatio,AD&nbsp;/&nbsp;AB&nbsp;=&nbsp;,(rg.AD.abs/rg.AB.abs).toFixed(3)',

            //third table row
                //first cell
                'arc-AB,arc&nbsp;ACB&nbsp;=&nbsp;,rg.AB.arcLen' +

                ' ' +
                //second cell
                'conterminousRatio,arc&nbsp;ACB&nbsp;/&nbsp;AB&nbsp;=&nbsp;,(rg.AB.arcLen/rg.AB.abs).toFixed(3)',
        ]
    };
    //--------------------------
    // \\// claim's script
    //--------------------------



    //--------------------------
    // //\\ proof's script
    //--------------------------
    legendScript7.proof = legendScript7.claim.concat([
    ]);
    //--------------------------
    // \\// proof's script
    //--------------------------


    //--------------------------
    // //\\ corollary's script
    //--------------------------
    legendScript7.corollary = legendScript7.proof.concat(
        fconf.sappId === "b1sec1lemma8" ?
        [] :
        [
            //third+1 table row
                //first cell
                'BF,BF&nbsp;=&nbsp;,rg.BF.abs' +

                ' ' +
                //second cell
                'conterminousRatio,BF&nbsp;/&nbsp;AB&nbsp;=&nbsp;,(rg.BF.abs/rg.AB.abs).toFixed(3)',

            //fourth+1 table row
                //first cell
                'AE,AE&nbsp;=&nbsp;,rg.AE.abs' +

                ' ' +
                //second cell
                'conterminousRatio,AE&nbsp;/&nbsp;AB&nbsp;=&nbsp;,(rg.AE.abs/rg.AB.abs).toFixed(3)',

            //fifth+1 table row
                //first cell
                'BG,BG&nbsp;=&nbsp;,rg.BG.abs' +

                ' ' +
                //second cell
                'conterminousRatio,BG&nbsp;/&nbsp;AB&nbsp;=&nbsp;,(rg.BG.abs/rg.AB.abs).toFixed(3)'
    ]);
    //--------------------------
    // \\// corollary's script
    // \\// lemma 7 scripts
    //==========================
    return;









    function create_digital_legend()
    {
        var lsX = fconf.sappId === "b1sec1lemma6" ? legendScript : legendScript7;
        eachprop( lsX, (textSectionLegend, theoName) => {
            creAUX( theoName, textSectionLegend );
        });
    }

    function creAUX( theoName, textSectionLegend )
    {
        ///spawns configuration
        ///returns array-of-lines, line = array-of-clusters, cluster=array-of-tokens,
        var legendScriptParsed = textSectionLegend.map( (line,lix) => {
            var lparsed = line.split(/\s+/);
            return lparsed.map( clusterToken => {
                return clusterToken.split(',');
            });
        });
        var rowsCount       = legendScriptParsed.length;
        var clustersCount   = legendScriptParsed[0].length;

        ssF.createtextSectionLegend({
            tableCaption    : '', //'Areas and Ratios',
            noTableTitle    : false,
            stdMod_given    : stdMod,
            textSection        : theoName,
            rowsCount,
            clustersCount,
            //makesCaptionCluster, //optional
            //updatesCaptionCluster, //optional
            makesBodyCluster,
            updatesDataInCell,
        })
        return;






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
    //=========================================
    // \\// creates textSection table
    //=========================================

}) ();


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
    ////clusters separated with <space>:
    ////'topic,caption,JS-expression-of-value-in-local-JS-context <space> next-token ... '
    ////<space> is vital, no <space> in clusters,
    ////
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

    // var legendScript =  {
    //     claim : [
    //         [ 'angleBAD', 'angle BAD :', '-rg.AB.angleGrad.toFixed()+"ᵒ"' ]                
    //     ]
    // };

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
    // each row has 3 cells: tpCssName, clusterCaption, value
    // cells within a row are referred to as a "cluster"
    var legendScript7 =  {
        claim : 
        [
            //first table row
                //first cell
                'AB,AB&nbsp;=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,rg.AB.abs',

            //second table row
                //first cell
                'AD,AD&nbsp;=&nbsp;,rg.AD.abs',

            //third table row
                //first cell
                'arc-AB,arc&nbsp;ACB&nbsp;=&nbsp;,rg.AB.arcLen',

            //small space
                ',, ,,',

            //fourth table row
                //first cell
                'AD,AD&nbsp;/&nbsp;AB&nbsp;=&nbsp;,(rg.AD.abs.toFixed(3)/rg.AB.abs.toFixed(3)).toFixed(3)',

            //fifth table row
                //first cell
                'arc-AB,arc&nbsp;ACB&nbsp;/&nbsp;AB&nbsp;=&nbsp;,(rg.AB.arcLen.toFixed(3)/rg.AB.abs.toFixed(3)).toFixed(3)',
        ]
    };
    //--------------------------
    // \\// claim's script
    //--------------------------


    //--------------------------
    // //\\ proof's script
    //--------------------------
    legendScript7.proof = [
        //first table row
            //first cell
            'AB,AB&nbsp;=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,rg.AB.abs' +

            ' ' +
            //second cell
            'Ab,Ab&nbsp;=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,rg.Ab.abs',

        //second table row
            //first cell
            'AD,AD&nbsp;=&nbsp;,rg.AD.abs' +

            ' ' +
            //second cell
            'Ad,Ad&nbsp;=&nbsp;,rg.Ad.abs',

        //third table row
            //first cell
            'arc-AB,arc&nbsp;ACB&nbsp;=&nbsp;,rg.AB.arcLen' +

            ' ' +
            //second cell
            'arc-Acb,arc&nbsp;Acb&nbsp;=&nbsp;,rg.Ab.arcLen',

        //small space
        ',, ,,',

        //fourth table row
            //first cell
            'AD,AD&nbsp;/&nbsp;AB&nbsp;=&nbsp;,(rg.AD.abs.toFixed(3)/rg.AB.abs.toFixed(3)).toFixed(3)' +

            ' ' +
            //second cell
            'Ad-Ab,Ad&nbsp;/&nbsp;Ab&nbsp;=&nbsp;,(rg.Ad.abs/rg.Ab.abs).toFixed(3)',

        //fifth table row
            //first cell
            'arc-AB,arc&nbsp;ACB&nbsp;/&nbsp;AB&nbsp;=&nbsp;,(rg.AB.arcLen.toFixed(3)/rg.AB.abs.toFixed(3)).toFixed(3)' +

            ' ' +
            //second cell
            'arc-Ab,arc&nbsp;Acb&nbsp;/&nbsp;Ab&nbsp;=&nbsp;,(rg.Ab.arcLen/rg.Ab.abs).toFixed(3)',
    ];
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


    function create_digital_legend()
    {
        var lsX = fconf.sappId === "b1sec1lemma6" ? legendScript : legendScript7;
        eachprop( lsX, (theorionLegend, theoName) => {
            creAUX( theoName, theorionLegend );
        });
    }

    function creAUX( theoName, theorionLegend )
    {
        ///spawns configuration
        ///returns array-of-lines, line = array-of-clusters, cluster=array-of-tokens,
        // splits long strings defined above to 2d array of rows and cells
        var legendScriptParsed = theorionLegend.map( (line,lix) => {
            var lparsed = line.split(/\s+/); // split at space chars
            return lparsed.map( clusterToken => {
                return clusterToken.split(','); 
            });
        });
        var rowsCount       = legendScriptParsed.length;
        var clustersCount   = legendScriptParsed[0].length;

        ssF.createTheorionLegend({
            tableCaption    : '', //'Areas and Ratios',
            noTableTitle    : false,
            stdMod_given    : stdMod,
            theorion        : theoName,
            rowsCount,
            clustersCount,
            //makesCaptionCluster, //optional
            //updatesCaptionCluster, //optional
            makesBodyCluster,
            updatesDataInCell,
        });

        function makesBodyCluster({ rowIx, clusterIx, }){
            return ssF.dataSourceParsed1__2__makesBodyCluster({
                rowIx,
                clusterIx,
                legendScriptParsed,
                //noEqualSign : true,
                //alignCaptionToRight : true,
            })

            // return {
            //     tpCssName: theorionLegend[0][0],
            //     clusterKey: rowIx + '-' + clusterIx + '-cell',
            //     clusterCaption: theorionLegend[0][1],
            //     alignCaptionToRight: true
            // };
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
    // \\// creates theorion table
    //=========================================

}) ();


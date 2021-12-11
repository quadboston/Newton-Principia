
( function() {
    var {
        ns, sn, $$, mat,
        sconf,
        rg,
        ssF, ssD,
        sDomF, sDomN, amode,
        stdMod,
        toreg,
    } = window.b$l.apptree({
        ssFExportList :
        {
            dataSourceParsed1__2__makesBodyCluster,
            dataSourceParsed1__2__updatesDataInCell,
        },
    });
    return;




    function dataSourceParsed1__2__makesBodyCluster({
        rowIx,
        clusterIx,
        legendScriptParsed,
        noEqualSign,
        alignCaptionToRight,
    }){
        var ds              = legendScriptParsed[ rowIx ][ clusterIx ];
        var indices         = '' + clusterIx;
        rowIx && ( indices += clusterIx+rowIx );
        var id              = rowIx + '-' + clusterIx + '-cell';
        //unfilteredYetCapsTopic-with-additional-tokens
        //tpCssName         = ds[0] + ' ' + id,
        var tpCssName       = ds[0];
        return {
            tpCssName,
            clusterKey          : id,
            clusterCaption      : ds[1].replace( /_/g, ' ' ) || ' ',
            noEqualSign         : typeof noEqualSign === 'undefined' ? true : noEqualSign,
            fillerAfterValue    : '&nbsp;&nbsp;&nbsp;&nbsp;',
            alignCaptionToRight,
        };
    }

    function dataSourceParsed1__2__updatesDataInCell({
        rowIx,
        clusterIx,
        legendScriptParsed,
        noEqualSignInNumber,
    }){
        var clusterCellIx = 1;

        var ds      = legendScriptParsed[ rowIx ][ clusterIx ];
        var res     = eval( ds[2] );

        var equalSignInNumb = typeof noEqualSignInNumber === 'undefined' ? '=' :
                        (noEqualSignInNumber ? '' : '=');
        var equal   = typeof res === 'number'? equalSignInNumb : '';
        res         = typeof res === 'number'? res.toFixed(3) : ( res || '' );
        htmlbody = equal + res;
        return { clusterCellIx, htmlbody, };
    }




}) ();


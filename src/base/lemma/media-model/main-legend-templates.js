
( function() {
    var {
        ns, sn, $$, mat,
        sconf,
        rg,
        ssF, ssD,
        stdMod, sDomF, sDomN, amode,
        toreg,
    } = window.b$l.apptree({
        ssFExportList :
        {
            dataSourceParsed1__2__makesBodyCluster,
            dataSourceParsed1__2__updatesDataInCell,
        },
    });
    return;


    /*
        in caption, '_' is replaced with ' ',
        in expession, "<_>" will be replaced as " "
        in caption and in expression, "<>" will be replaced as ","
    */
    function dataSourceParsed1__2__makesBodyCluster({
        rowIx,
        clusterIx,
        legendScriptParsed,
    }){
        var ds              = legendScriptParsed[ rowIx ][ clusterIx ];
        //c cc( ds );
        var indices         = '' + clusterIx;
        rowIx && ( indices += clusterIx+rowIx );
        var id              = rowIx + '-' + clusterIx + '-cell';
        //unfilteredYetCapsTopic-with-additional-tokens
        //tpCssName         = ds[0] + ' ' + id,
        var tpCssName       = ds[0];
        tpCssName           = tpCssName && tpCssName.replace( /<>/g, ',' );
        let clusterCaption  = (ds[1].replace( /_/g, ' ' ) || ' ').replace( /<>/g, ',' );
        
        return {
            tpCssName,
            clusterKey          : id,
            clusterCaption,
        };
    }

    function dataSourceParsed1__2__updatesDataInCell({
        rowIx,
        clusterIx,
        legendScriptParsed,
    }){
        var clusterCellIx = 1;

        var ds      = legendScriptParsed[ rowIx ][ clusterIx ];
        //var res     = ds[2] ? eval( ds[2] ) : '';
        var res     = eval( ds[2] );
        res         = typeof res === 'number'? res.toFixed(3) : ( res || '' );
        res         = res.replace( /<_>/g, ' ' ).replace( /<>/g, ',' );
        htmlbody = res;
        return { clusterCellIx, htmlbody, };
    }

}) ();


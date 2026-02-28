(function(){
    const { ns, sn, $$, sconf, rg, ssF, stdMod, toreg,
    } = window.b$l.apptree({ stdModExportList : {
        create_digital_legend,
    }});
    return;

///overrides core's function
function create_digital_legend(){
    var logic_phase        = 'proof';
    var columnPars      = sconf.basePairs;
    var rowsCount       = columnPars.length-1;
    var clustersCount   = columnPars.length-1;
    var tableCaption    = 'Divided Differences';
    ssF.createLogic_phaseLegend({
        stdMod_given : stdMod,
        logic_phase,
        rowsCount,
        clustersCount,
        tableCaption,
        cellsVisibilityCondition,
        makesCaptionCluster,
        makesBodyCluster,
        updatesCaptionCluster,
        updatesTableTitle,
        updatesDataInCell,
    })
    return;

    ///================================================
    /// creates first row below the table caption;
    /// fills it like:
    /// "H, x=0.00, I, x=1.00 ... "
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
    /// creates body
    ///================================================
    function makesBodyCluster({
        rowIx,
        clusterIx,
    }){
        var indices = '' + clusterIx;
        rowIx && ( indices += clusterIx+rowIx );
        var id = rowIx + '-' + clusterIx + '-cell';

        //lemma special for first cell
        var P = clusterIx ? '' : '<br>=P<sub>'+rowIx+'</sub>';

        //lemma specials for different cells
        var tpCssName = clusterIx === 0 ?
            'approximator ' + id :
            ( rowIx === 0 ? 'experimental ' + id : '' );
        return {
            style               :
            [
                [
                    ['border-left', '1px solid grey'],
                    ['padding-left', '6px'],
                ],
            ],
            tpCssName,
            clusterKey          : id,
            clusterCaption      : 'y<sub>' + indices + '</sub>' + P,
            noEqualSign         : true,
            //fillerAfterValue    : ' ',
        };
    }

    ///================================================
    /// updates title
    ///================================================
    function updatesTableTitle({ tableCaption$ })
    {
        tableCaption$.html( rg.experimental.fname + '. ' + tableCaption + ':' );
    }

    ///================================================
    /// updates captions
    ///================================================
    function updatesCaptionCluster({ clusterIx, })
    {
        var bpair = columnPars[ clusterIx ];
        var clusterCellIx = 0;
        var columnCaptionTitle = bpair[0].l5key +
            //.makes this string smaller to tackle the unclear bug of
            //.table disappearence
            '<span style="font-size:9px">' +
            ', x=' +
            bpair[0].pos[0].toFixed(2) +
            '</span>'
        ;
        return { columnCaptionTitle, clusterCellIx  };
    }

    ///================================================
    /// updates body
    ///================================================
    function updatesDataInCell({ rowIx, clusterIx, tdata, })
    {
        var indexFrom   = 1;
        var clusterCellIx     = 1;
        var tdata       = rg.approximator_curve.dividedDifferences.coefficients;
        var htmlbody =  '=' + tdata[ rowIx ][ clusterIx ][
                        indexFrom
                        ].toFixed(3);
        return { clusterCellIx, htmlbody, };
    }

    ///================================================
    /// makes upper-left-corner triangular table
    ///================================================
    function cellsVisibilityCondition( rowIx, clusterIx )
    {
        var m = ns.haz( rg, 'm' );
        if( !m ) return false;
        var m = rg.m.value;
        return m && rowIx < m && clusterIx <= m-rowIx-1;
    }
}
//=========================================
// \\// creates logic_phase table
//=========================================
})();
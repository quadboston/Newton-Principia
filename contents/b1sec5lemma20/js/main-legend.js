( function() {
    var {
        $$, mat,
        sconf, sDomF, sDomN, ssD, ssF, sData,
        stdMod, rg, toreg,
    } = window.b$l.apptree({
        ssFExportList :  {
            upcreate_mainLegend,
            create_digital_legend,
        },
    });
    var clustersToUpdate = [];
    return;

    
    ///this function is called from common-application-library,
    ///from full-app/dom/...
    function create_digital_legend()
    {
        var mlegend = toreg( 'main-legend' )();
        doCreateTable_proof( mlegend );
    }


    //=========================================
    // //\\ updates values during simulation
    //      can be called from slider and from
    //      other places
    //=========================================
    function upcreate_mainLegend()
    {
        var ww = clustersToUpdate;
        //ww[ 'a' ].innerHTML = sData.polar_ell_model.e.toFixed(2);
        //ww[ 'b' ].innerHTML = rg.b.value.toFixed(2);

        //var wwT=rg.T.pos;

        //todm this is a patch: do use Pr/Pt
        var PT = Math.abs( rg.T.value ) < 1e-20 ? 1 : rg.T.value;

        var wwR=rg.R.pos;
        var wwP=rg.P.pos;
        var PR = mat.unitVector( [wwR[0]-wwP[0], wwR[1]-wwP[1] ] ).abs;
        var PR_PT = (PR/PT);
        ww[ 'PT' ].innerHTML = PT.toFixed(2);
        ww[ 'PR' ].innerHTML = PR.toFixed(2);
        ww[ 'PR-PT' ].innerHTML     = PR_PT.toFixed(2);
    }
    //=========================================
    // \\// updates values during simulation
    //=========================================


    //=========================================
    // //\\ creates proof table
    //      does one time work of html creation
    //=========================================
    function doCreateTable_proof(mlegend)
    {
        mlegend.tb = mlegend.tb || {};
        var tb = mlegend.tb.proof = $$
            .c('table')
            .cls( 'main-legend proof' )
            .to( stdMod.legendRoot$ )
            ();

        //===================
        // //\\ begins to fill data rows
        //===================
        var row = $$.c('tr')
            .to(tb)();
        makeCl( row, 'PT', 'PT', 'key-triangle' );
        makeCl( row, 'PR', 'PR', 'key-triangle' );
        makeCl( row, 'PR-PT', 'PR : PT', 'key-triangle' );
        //===================
        // \\//
        //===================
    }
    //=========================================
    // \\// creates proof table
    //=========================================


    //=========================================
    //
    //=========================================
    ///Makes:  magnitude's cluster in table,
    ///Effect: represents magnitude in html-table-row in 
    ///        form "mname = mvalue",
    ///Input:  mname = magnitude name
    function makeCl( row, mname, mcaption, cssName )
    {
        //todm: ?no need for extra function argument:
        //      tp-cssName may be taken from "rg.Elem point wrap" ...
        cssName = sDomF.topicIdUpperCase_2_underscore( cssName || mname );

        if( mcaption !== ']no caption[' ) {
            var c$ = $$.c('td')
                       .html( mcaption||mname )
                       .addClass('tostroke tocolor tobold tp-' + cssName)
                       .to(row);
        }
        var c$ = $$.c('td')
                   .cls('value')
                   .cls('tostroke tocolor tobold tp-'+cssName)
                   .to(row);

        clustersToUpdate[mname] = c$(); //updateeCell;
        return c$;
    }

}) ();

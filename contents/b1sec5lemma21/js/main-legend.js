( function() {
    var {
        $$, sDomF, stdMod, rg, toreg
    } = window.b$l.apptree({
        ssFExportList : {
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
        //c cc( 'starts create_digital_legend' );
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
        ww[ 'a' ].innerHTML = rg.a.value.toFixed(3);
        ww[ 'b' ].innerHTML = rg.b.value.toFixed(3);

        //todm this is a patch: do use Pr/Pt
        let grad = '<sup>ᵒ</sup>';
        let rad2grad = 180/Math.PI;
        ww[ 'eta' ].innerHTML = (rg.angleBCM*rad2grad).toFixed(1) + grad;

        ww[ 'beta' ].innerHTML = (rg.beta.value*rad2grad).toFixed(1) + grad;
        ww[ 'alpha' ].innerHTML = (rg.alpha.value*rad2grad).toFixed(1) + grad;

        //ww[ 'media_scale' ].innerHTML = rg.media_scale.value.toFixed(3);
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
        // //\\
        //===================
        var row = $$.c('tr')
            .to(tb)
            .addClass( 'aspect--model' )
            ();
        makeCl( row, 'a', 'c', 'core' );
        makeCl( row, 'b', '1-c', 'core' );

        var row = $$.c('tr')
            //.addClass('tostroke')
            .to(tb)();
        makeCl( row, 'eta', 'angle BCM', 'eta' );

        var row = $$.c('tr')
            .to(tb)();
        makeCl( row, 'alpha', 'angle ACB', 'angle-alpha' );
        makeCl( row, 'beta', 'angle ABC', 'angle-beta' );
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


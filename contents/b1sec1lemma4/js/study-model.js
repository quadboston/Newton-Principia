( function() {
    var {
        ns, sn, nspaste, eachprop, haz, mat,
        sconf, fconf,
        rg,
        ssF, ssD,
        sDomF, amode,
        stdMod,
        tr, tp, toreg,

    } = window.b$l.apptree({
        stdModExportList :
        {
            init_model_parameters,
            model_upcreate,
        },
    });
    return;














    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters()
    {
        sDomF.modelPointDragger({
            pname : 'T',
            acceptPos : ( newPos ) =>
            {
                rg.T.pos[0] = newPos[0];
                newPos[1]   = rg.T.pos[1]; //blocks vertical movement
                return true;
            }
        });
        //.memorizes fraction of point r along axis x
        rg.r.r2T = ( rg.r.pos[0]-rg.P.pos[0] ) / ( rg.T.pos[0]-rg.P.pos[0] );
    }

    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate()
    {
        //-------------------------------------------------
        // //\\ this is breadth-points d8d limitator,
        //      if coder is not lazy, this limitator
        //      should be coded for sDomF.modelPointDragger 
        //-------------------------------------------------
        sconf.originalPoints.bars.forEach( (bar, bix) =>  {
            var moPos = rg[ 'bars-'+bix ].pos;
            moPos[0] = Math.min( Math.max( moPos[0], rg.A.pos[0] ), rg.E.pos[0] );
        });
        //-------------------------------------------------
        // \\// this is breadth-points d8d limitator,
        //-------------------------------------------------


        var scaleX = ( rg.T.pos[0] - rg.P.pos[0] ) / ( rg.E.pos[0] - rg.A.pos[0] );
        toreg( 'magnitudeX' )( 'val', scaleX );

        //toreg( 'magnitudeY' )( 'val', 1/ rg.magnitudeX.val );
        toreg( 'magnitudeY' )( 'val', rg.p.pos[1] / rg.a.pos[1] );

        //:moves point r proportionally
        rg.r.pos[0] = rg.r.r2T * ( rg.T.pos[0]-rg.P.pos[0] ) + rg.P.pos[0];
        rg.r.pos[1] = ssD.repoConf[1].fun( rg.r.pos[0] )[1];        

        ///removes and recreates ordered bars
        var ordBars = toreg( 'orderedBars' )( 'val', [ rg.A ] )('val');
        sconf.originalPoints.bars.forEach( (bar, bix) =>  {
            ordBars.push( rg[ 'bars-'+bix ] );
        });
        ordBars.push( rg.E );
        ordBars.sort( (barA, barB) => ( barA.pos[0] - barB.pos[0] ) );
    }

}) ();


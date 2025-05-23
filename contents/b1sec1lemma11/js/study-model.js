( function() {
    var {
        sn, mat,
        sconf, ssF, ssD, sDomF, 
        amode, stdMod, rg,
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
        rg.B.dragPriority = 2; // highest value gets priority
        sDomF.pname__2__rgX8dragwrap_gen_list( 'B', stdMod )
            .acceptPos = function( newPos ) {
                ///restricts point B
                if( newPos[0] < 0.00001 ) {
                    newPos[0] = 0.000001;
                } else if( newPos[0] > 1.2 ) {
                    newPos[0] = 1.2;
                }
                //:advances B
                var Bx = rg.B.pos[0];
                var By = rg.B.pos[1];
                var newBx = newPos[0];
                var newBy = newPos[1] = ssD.repoConf[0].fun( newPos[0] )[1];

                //----------------------------------------------------------
                // //\\ gets existing ratios
                //this seems to be a deviation from Case2 of The Book:
                //instead of preserving BD/bd, we preserve ratio bx/Bx,
                var ratio_bxBx = rg.b.pos[0]/Bx;
                //gets existing ratio for angle for point D
                var angD = ( rg.D.pos[0] - Bx ) / By;
                // \\// gets existing ratios
                //----------------------------------------------------------

                //keeps point b "in existing ratio" ratio_bxBx
                rg.b.pos[0] = newPos[0]*ratio_bxBx;
                rg.b.pos[1] = ssD.repoConf[0].fun( rg.b.pos[0] )[1];

                //keeps point D "under existing ratio of angle"
                rg.D.pos[0] = newBx + angD * newBy;
                //keeps point D "under existing ratio of angle"
                rg.d.pos[0] = rg.b.pos[0] + angD * rg.b.pos[1];

                
                rg.B.dragPriority = rg.B.pos[0] <= 0.00001 ? 4 : 2; 
                return true; //true means: do accept new pos
            };

        rg.D.dragPriority = 1;
        sDomF.pname__2__rgX8dragwrap_gen_list( 'D', stdMod )
            .acceptPos = function( newPos ) {
                ///restricts point D
                if( newPos[0] < 0.00001 ) {
                    newPos[0] = 0.000001;
                } else if( newPos[0] > 1.2 ) {
                    newPos[0] = 1.2;
                }
                var Bx = rg.B.pos[0];
                var By = rg.B.pos[1];

                //gets new ratio for angle for point D
                var angD = ( newPos[0] - Bx ) / By;

                //keeps point d "under existing ratio of angle"
                rg.d.pos[0] = rg.b.pos[0] + angD * rg.b.pos[1];

                newPos[1] = rg.D.pos[1];
                return true; //true means: do accept new pos
            };

        rg.b.dragPriority = 3; 
        sDomF.pname__2__rgX8dragwrap_gen_list( 'b', stdMod )
            .acceptPos = function( newPos ) {                

                // limit so AB2:Ab2 is never > 10
                let AB2Ab2 = rg.AB.abs2/rg.Ab.abs2;
                
                ///restricts point b
                if( newPos[0] < 0.000001 ) {
                    newPos[0] = 0.0000001;
                }

                ///keeps point b "in existing ratio" ratio_bxBx
                if(newPos[0] < rg.b.pos[0] && AB2Ab2 > 10) {
                    var ratio_bxBx = rg.B.pos[0]/rg.b.pos[0];
                    let Bx_original = rg.B.pos[0];
                    rg.B.pos[0] = newPos[0]*ratio_bxBx;
                    rg.B.pos[1] = newPos[1]*ratio_bxBx;
                    rg.D.pos[0] = rg.D.pos[0] - (Bx_original - rg.B.pos[0]);
                    if(rg.D.pos[0] < 0) rg.D.pos[0] = 0;
                }

                ///makes sure b in limits
                if( rg.B.pos[0] < newPos[0] ) {
                    newPos[0] = rg.B.pos[0];
                }

                newPos[1] = ssD.repoConf[0].fun( newPos[0] )[1];
                var Bx = rg.B.pos[0];
                var By = rg.B.pos[1];

                //----------------------------------------------------------
                // //\\ gets existing ratios
                //gets existing ratio for angle for point D
                var angD = ( rg.D.pos[0] - Bx ) / By;
                // \\// gets existing ratios
                //----------------------------------------------------------

                //keeps point d "under existing ratio of angle"
                rg.d.pos[0] = newPos[0] + angD * newPos[1];

                rg.B.dragPriority = rg.B.pos[0] <= 0.00001 ? 4 : 2; 
                return true; //true means: do accept new pos
            };
    }

    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate()
    {
        //:"limit point" and J
        var Lx = 0.0000001;
        var Ly = ssD.repoConf[0].fun( Lx )[1];
        rg.J.pos[1] = mat.circumscribeCircleOverChordAndBothNormals(
                      null, rg.A.pos, [ Lx, Ly ] )[1];

        //one of the reasons for these two lines is that
        //in initial config manually set ordinates can misfit model
        rg.B.pos[1] = ssD.repoConf[0].fun( rg.B.pos[0] )[1];
        rg.b.pos[1] = ssD.repoConf[0].fun( rg.b.pos[0] )[1];

        rg.G.pos[1] = ssF.circumscribeCircleOverChordAndBothNormals_XY( rg, 'AB' )[1];
        rg.g.pos[1] = ssF.circumscribeCircleOverChordAndBothNormals_XY( rg, 'Ab' )[1];

        rg.C.pos[1] = rg.B.pos[1];
        rg.c.pos[1] = rg.b.pos[1];

        //mostly for demo purposes
        var line2abs = ssF.line2abs;
        line2abs( 'AB' );
        line2abs( 'Ab' );
        line2abs( 'BD' );
        line2abs( 'bd' );
    }

}) ();


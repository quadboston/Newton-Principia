( function() {
    var {
        mat, amode, sconf, rg, stdMod, sData, ssF,
    } = window.b$l.apptree({
        stdModExportList :
        {
            completesSlidersCreation,
            slider_a_pos2value,
            slider_a_value2pos,
        },
    });
    return;
    
    
    function completesSlidersCreation()
    {
        rg.a.acceptPos = slider_a_pos2value;
        rg.T.acceptPos = function( newPos )
        {
            var T = rg.T;
            var newValue = T.pos2Tpar( newPos )
            //protects drag from going outside the window
            if( newValue < -6.5 || newValue > 2.5 ) return;
            T.value = newValue;
            T.pos[0] = newPos[0];
            T.pos[1] = newPos[1];
            return true;
        }
        rg.D.acceptPos = function( newPos )
        {
            const pem = sData.polar_ell_model;
            const pix = ssF.gets_orbit_closest_point( newPos, pem.points );
            const Dpos = pem.points[ pix ];
            const Tpos = mat.lineSegmentsCross( Dpos, rg.B.pos, rg.P.pos, rg.t.pos );
            const T = rg.T;
            T.pos[0] = Tpos[0];
            T.pos[1] = Tpos[1];
            T.value = T.pos2Tpar( Tpos );
            stdMod.model8media_upcreate();
        }
    }
    
    ///does newPos -> value -> pos (pos -> value in model)
    function slider_a_pos2value( newPos )
    {
        var scale = ( rg.eEnd.pos[0] - rg.eStart.pos[0] );
        sData.eScale = scale / sconf.eMax;
        var modelPar = ( newPos[0] - rg.eStart.pos[0] ) / sData.eScale;
        if( modelPar < 0.0000000001 || modelPar > sconf.eMax ) return false;
        
        // //\\ making pause at e=1
        {
            const START = 0.90
            const END = 0.99999;
            if( modelPar < 0.02 ){
                modelPar =0.00001;
            } else if( START <= modelPar && modelPar<=END ){
                const POWER = 3;
                const RANGE = END-START;
                let right = END-modelPar;
                let fraq = (END-modelPar)/RANGE;
                fraq *= fraq*fraq;
                fraq *= fraq*fraq;
                modelPar = END - fraq*RANGE;
                //c cc( 'fraq='+fraq.toFixed(7), modelPar.toFixed(5) )
            }
        }
        // \\// making pause at e=1

        sData.polar_ell_model.e = modelPar;
        stdMod.curveModel2branches();
        // //\\ parameters' decorational changes
        //const eChange = (modelPar - sconf.excentricity)-(1-sconf.excentricity);
        const eChange = modelPar - sconf.excentricity;
        const change = Math.abs(eChange);
        {
            /*
            const initialFocus = ssF.inn2mod( sconf.focus, !!'original' );
            c1 = Math.abs(change-1);
            const focusShift = eChange < 0 ?
                  1-change*0.5 : 1-(1-c1*c1);
            const newFocus0 = initialFocus[0] * focusShift;
            const newFocus1 = initialFocus[1] * focusShift;
            sData.polar_ell_model.focus = [newFocus0, newFocus1];
            */
        }
        {
            //const initialLatus = sconf.latus2/sconf.originalMod2inn_scale;
            //const latusFactor = eChange < 0 ?  1+change*2 :
                    //1-change*6+change*change*6;
                    1;
            //sData.polar_ell_model.latus2 = initialLatus * latusFactor;
            //c cc( sData.polar_ell_model.latus2, 'change='+change.toFixed(3) );
            /*
            const changeHyp = modelPar <=1.001 ?
                            change : Math.abs(1.001 - sconf.excentricity);
            const parHyperbolaA = 1-changeHyp*0;
            const parHyperbolaC = 1+changeHyp*20;
            const parHyperbolaP = 1-changeHyp*45;
            const parHyperbolaB = 1-changeHyp*8;
            sData.initialparC = sconf.initialparC *
                (eChange < 0 ? 1+change*4 : parHyperbolaC );
            sData.initialparB = sconf.initialparB *
                (eChange < 0 ? 1 : parHyperbolaB );
            sData.initialparA = sconf.initialparA *
                (eChange < 0 ? 1-change*0.3 : parHyperbolaA );
            sData.initialparP = sconf.initialparP *
                (eChange < 0 ? 1 : parHyperbolaP );
            */
            // \\// parameters' decorational changes
        }
        slider_a_value2pos();
        stdMod.curveModel2branches();
        newPos[1] = rg.eStart.pos[1];
        return true;
    }    
    function slider_a_value2pos()
    {
        rg.a.pos[0] = rg.eStart.pos[0] +
            sData.polar_ell_model.e * sData.eScale;
    }
}) ();


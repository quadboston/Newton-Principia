( function() {
    var {
        amode, sconf, rg, stdMod, sData, ssF,
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
    }
    
    ///does newPos -> value -> pos (pos -> value in model)
    function slider_a_pos2value( newPos )
    {
        var scale = ( rg.aEnd.pos[0] - rg.aStart.pos[0] );
        sData.aScale = scale / sconf.eMax;
        var modelPar = ( newPos[0] - rg.aStart.pos[0] ) / sData.aScale;
        if( modelPar < 0.0000000001 || modelPar > sconf.eMax ) return false;
        //modelPar = Math.max( 0.0000000001, Math.min( sconf.eMax, modelPar ) );
        sData.polar_ell_model.e = modelPar;

        // //\\ parameters' decorational changes
        const eChange = modelPar - sconf.excentricity;
        const change = Math.abs(eChange);
        {
            const initialFocus = ssF.inn2mod( sconf.focus );
            c1 = Math.abs(change-1);
            const focusShift = eChange < 0 ?
                  1-change*0.5 : 1-(1-c1*c1)*2;
            const newFocus0 = initialFocus[0] * focusShift;
            const newFocus1 = initialFocus[1] * focusShift;
            sData.polar_ell_model.focus = [newFocus0, newFocus1];
        }
        {
            const initialLatus = sconf.latus2*sconf.inn2mod_scale;
            const latusShift = eChange < 0 ?  1+change*2 : 1-change*0;
            sData.polar_ell_model.latus2 = initialLatus * latusShift;
        }
        sData.initialparC = sconf.initialparC *
            (eChange < 0 ? 1+change*4 : 1 );
        sData.initialparA = sconf.initialparA *
            (eChange < 0 ? 1-change*0.3 : 1 );
        // \\// parameters' decorational changes
            
        //latus2 : 190.621, //in media scale
        slider_a_value2pos();
        newPos[1] = rg.aStart.pos[1];
        return true;
    }    
    function slider_a_value2pos()
    {
        rg.a.pos[0] = rg.aStart.pos[0] + sData.polar_ell_model.e * sData.aScale;
    }
    
    
}) ();

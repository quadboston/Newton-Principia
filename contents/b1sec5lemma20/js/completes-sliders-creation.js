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
        slider_a_value2pos();
        newPos[1] = rg.eStart.pos[1];
        return true;
    }    
    function slider_a_value2pos()
    {
        rg.a.pos[0] = rg.eStart.pos[0] +
            sData.polar_ell_model.e * sData.eScale;
    }
}) ();

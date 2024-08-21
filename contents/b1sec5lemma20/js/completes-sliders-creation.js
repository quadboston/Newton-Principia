( function() {
    var {
        amode, sconf, rg, stdMod, sData,
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
    
    function slider_a_pos2value( newPos )
    {
        var scale = ( rg.aEnd.pos[0] - rg.aStart.pos[0] );
        sData.aScale = scale / sconf.aMax;
        var modelPar = ( newPos[0] - rg.aStart.pos[0] ) / sData.aScale;
        modelPar = Math.max( 0.0000000001, Math.min( sconf.aMax, modelPar ) );
        rg.a.value = modelPar;
        slider_a_value2pos();
        newPos[1] = rg.aStart.pos[1];
        return true;
    }    
    function slider_a_value2pos()
    {
        rg.a.pos[0] = rg.aStart.pos[0] + rg.a.value * sData.aScale;
    }
    
    
}) ();


( function() {
    var {
        mat,
        rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            completesSlidersCreation,
        },
    });
    return;
    
    
    function completesSlidersCreation()
    {
        rg.M.acceptPos = function( newPos )
        {
            var M = rg.M;
            var newValue = pos2Gpar( newPos )
            //protects drag from going outside the window
            if( newValue < -6.5 || newValue > 2.5 ) return;
            rg.g.value = newValue;
            return true;

            function pos2Gpar( pos )
            {
                var H=rg.H.pos;
                var gamma = rg.gamma.value;
                var dd = [ pos[0]-H[0], pos[1]-H[1] ];
                //projects shift to direction of unit vector "gamma":
                var g = -dd[0]*Math.cos(gamma) - dd[1]*Math.sin(gamma);
                return g;
            } 
        }
        
        
        rg.A.acceptPos = function( newPos )
        {
            var { alpha, beta } = pos2alpha8beta( newPos )
            rg.alpha.value = alpha;
            rg.beta.value = beta;
            return true;

            function pos2alpha8beta( pos )
            {
                var BC = mat.p1_to_p2( rg.B.pos, pos );
                var cosBeta = -BC.unitVec[0];
                var beta = Math.acos( cosBeta ) * ( BC.unitVec[1] < 0 ? -1 : 1 );

                var A_A = mat.p1_to_p2( rg.C.pos, pos );
                var cosAlpha = A_A.unitVec[0];
                var alpha = Math.acos( cosAlpha ) * ( A_A.unitVec[1] < 0 ? -1 : 1 );
                return { alpha, beta };
            }            
        }
        
        
        rg.H.acceptPos = function( newPos )
        {
            //var H = rg.H;
            rg.a.value = newPos[0] - rg.C.pos[0];
            return true;
        }
        
    }
    
    
}) ();


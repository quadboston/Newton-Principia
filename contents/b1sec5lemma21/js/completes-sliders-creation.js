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
        rg.G.acceptPos = function( newPos )
        {
            var G = rg.G;
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
        
        
        rg.AA.acceptPos = function( newPos )
        {
            var AA = rg.AA;
            var { alpha, beta } = pos2alpha8beta( newPos )
            rg.alpha.value = alpha;
            rg.beta.value = beta;
            return true;

            function pos2alpha8beta( pos )
            {
                var BA = mat.p1_to_p2( rg.B.pos, pos );
                var cosBeta = -BA.unitVec[0];
                var beta = Math.acos( cosBeta ) * ( BA.unitVec[1] < 0 ? -1 : 1 );

                var A_AA = mat.p1_to_p2( rg.A.pos, pos );
                var cosAlpha = A_AA.unitVec[0];
                var alpha = Math.acos( cosAlpha ) * ( A_AA.unitVec[1] < 0 ? -1 : 1 );
                return { alpha, beta };
            }            
        }
        
        
        rg.H.acceptPos = function( newPos )
        {
            var H = rg.H;
            rg.a.value = newPos[0] - rg.A.pos[0];
            return true;
        }
        
    }
    
    
}) ();


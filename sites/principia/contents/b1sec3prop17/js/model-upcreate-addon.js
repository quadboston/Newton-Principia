(function(){

const {
    sn, nspaste, mcurve, integral, mat,
    amode, sconf, rg,
} = window.b$l.atree({ stdModList : {
        model_upcreate_addon,
    },
});
return;


function model_upcreate_addon (){
    const fun       = rg.borbit.dyn_q2xy;
    const op        = sconf.orbitParameters;
    const sop = sn( 'sampleOrbitParameters', sconf );
    //solved orbit hyperbola or ellipse
    if( amode.subessay === 'corollary1' || amode.subessay === 'corollary2'  ) {
        nspaste( rg.D.pos, rg.P.pos );
    } else {
        nspaste( rg.D.pos, fun( 0 ) );
    }
    nspaste( rg.K.pos, mat.dropPerpendicular( rg.S.pos, rg.H.pos, rg.P.pos ) );
    {
        ////sample orbit
        let fun = rg[ 'borbit-sample' ].dyn_q2xy;
        //orbit
        let rrc = rg.S.pos;
        var {
            rr,
            uu,
            ee,
            projectionOfCenterOnTangent,
            sinOmega,
            cosOmega,
        } = mcurve.planeCurveDerivatives({
            fun,
            q   : rg.p.q,
            rrc,
        });
        nspaste( rg.p.pos, rr );
        //sample speed vector
        {
            //dropLine(... = start + direction * t
            let udir = sop.cosOmega * cosOmega + sop.om * sinOmega;
            nspaste( rg.vSample.pos,
                        mat.sm( sop.Kepler_v*udir, uu, 1, rg.p.pos ) );
        }
        //sample's decorational dt arc
        var {
            rr,
        } = mcurve.planeCurveDerivatives({
            fun,
            q : rg.p.q + sop.sagittaDelta_q_initial,
            rrc,
        });
        nspaste( rg.q.pos, rr );
        rg.p.abs = mat.unitVector( rg.p.pos ).abs;
    }
    const cosAxis   = Math.cos( sop.mainAxisAngle );
    const sinAxis   = Math.sin( sop.mainAxisAngle );

    //----------------------------------
    // //\\ force, gamma, and latus
    //----------------------------------
    rg.l.pos[0]  = -sinAxis * sop.latus;
    rg.l.pos[1]  =  cosAxis * sop.latus;
    rg.ll.pos[0] =  sinAxis * sop.latus;
    rg.ll.pos[1] = -cosAxis * sop.latus;
    rg[ 'l,ll' ].caption = 'l=' + (2*sop.latus).toFixed(3);
    {
        const addendum = amode.aspect === 'addendum';
        ////force and gamma
        let relativeGamma = op.Kepler_g / sop.Kepler_gInitial;
        var newLen = relativeGamma * sop.forceHandleInitial;
        nspaste( rg.f.pos,
                    mat.sm( rg.p.pos, -1*newLen, ee )
        );
        rg[ 'f' ].caption = addendum ?
            'f: 𝛾 = ' + relativeGamma.toFixed(2) :
            'curvature';
        rg[ 'p,vSample' ].caption = addendum ?
            'vₛ = ' + sop.Kepler_v.toFixed(3) :
            '';
        rg[ 'P,vb' ].caption = addendum ?
            'vₛ = ' + op.Kepler_v.toFixed(3) :
            '';
    }
    //----------------------------------
    // \\// force, gamma, and latus
    //----------------------------------
    rg.Ys.pos[0] = projectionOfCenterOnTangent[0];
    rg.Ys.pos[1] = projectionOfCenterOnTangent[1];

    // highlight arc (segment of sop around p)
    sop.highlightSeg = true;
    sop.segStart = rg.p.q + 0.4;
    sop.segEnd = sop.segStart - 0.8;
}
})();
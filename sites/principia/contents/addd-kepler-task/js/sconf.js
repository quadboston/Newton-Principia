(function(){
const { nspaste, sf, originalPoints, } =
      window.b$l.atree({ ssFList: { init_conf } });
return;

//todo rg.timearc.undisplay = true;
function init_conf (){
    nspaste( originalPoints, {
        S : {
        },
        P : {
        },
        Q : {
            undisplayAlways: true,
            //doPaintPname : false,
        },
        QtimeDecor : {
        },
        R : { undisplayAlways: true,
        },
        T : {
            undisplayAlways: true,
        },
        Z : {
            undisplayAlways: true,
        },
        rrminus : {
            undisplayAlways: true,
        },
        sagitta : {
        },
        V : {
            undisplayAlways: true,
        },
        //center of instant curvature circle
        C : {
        },
        Y : {
            undisplayAlways: true,
        },
        A : {
        },
        nonSolvablePoint : {
        }
    });

    sf.linesArray = nspaste( {}, [
        { 'SP' : {
        }, },
        { 'PV' : {
            cssClass: 'subessay--never',
        }, },
        { 'PR' : { }, },
        { 'SY' : {
            cssClass: 'subessay--never',
        }, },
        { 'QR' : {
            cssClass: 'subessay--never',
			 }, },
        { 'QP' : {
            cssClass: 'subessay--never',
        }, },
        { 'SQ' : {
            cssClass: 'subessay--never',
        }, },
        { 'QT' : {
            cssClass: 'subessay--never',
        },},
        { 'PC' : {
        },},
        { 'PY' : {
        }, },
        { 'PZ' : {
        }, },

        { 'P,rrminus' : { }, },
        { 'P,sagitta' : {
            cssClass: 'subessay--never',
        }, },
        { 'Q,rrminus' : {
            cssClass: 'subessay--never',
        }, },
        { 'S,nonSolvablePoint' : {
        }, },
    ]);
}
})();
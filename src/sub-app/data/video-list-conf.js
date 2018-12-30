( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;

    var fapp        = sn('fapp' );

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);





    ssD.videoList =
    [
        {
            //=============================================================
            // //\\ this option actually restricts presence of a video clip
            //      in absense of this option or its suboptions, the clip
            //      added to wider set of app. modes
            //=============================================================
            lemmaNumber    : 2,

            //.in the presence of this option, the icon will be moved to
            //.exegesis tab
            //.otherwise, the icon will be placed into model pane help strip
            exegesisTab    : 'claim-og',

            modeType       : { 'proof':'claim',
                               'text':'hypertext'
                            },
            //=============================================================
            // \\// this option actually restricts presence of a video clip
            //=============================================================
            isExternal     : true, //"false" must work ... todo: do reseach why does not work
            URL            :"http://sciencehike.com/original/NewtonPrincipia/content-guide/B1S1L02Claim.mp4"
        },
        {
            lemmaNumber    : 2,
            exegesisTab    : 'proof-og',
            modeType       : { 'proof':'claim',
                               'text':'hypertext'
                            },
            isExternal     : true,
            URL            :"http://sciencehike.com/original/NewtonPrincipia/content-guide/B1S1L02Proof.mp4"
        }/*,
        {
            lemmaNumber    : 3,
            exegesisTab    : 'claim-og',
            modeType       : { 'proof':'claim'
                            },
            isExternal     : true,
            URL            :"http://sciencehike.com/original/NewtonPrincipia/content-guide/B1S1L03Claim.mp4"
        },
        {
            lemmaNumber    : 3,
            exegesisTab    : 'proof-og',
            modeType       : { 'proof':'claim'
                            },
            isExternal     : true,
            URL            :"http://sciencehike.com/original/NewtonPrincipia/content-guide/B1S1L03Proof.mp4"
        },
        {
            lemmaNumber    : 9,
            exegesisTab    : 'claim-og',
            modeType       : { 'proof':'claim'
                            },
            isExternal     : true,
            URL            :"http://sciencehike.com/original/NewtonPrincipia/content-guide/B1S1L09Claim.mp4"
        },
        {
            lemmaNumber    : 9,
            exegesisTab    : 'proof-og',
            modeType       : { 'proof':'claim'
                            },
            isExternal     : true,
            URL            :"http://sciencehike.com/original/NewtonPrincipia/content-guide/B1S1L09Proof.mp4"
        }*/
    ];

}) ();


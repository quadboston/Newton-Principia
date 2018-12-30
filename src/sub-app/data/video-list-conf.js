( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;

    var fapp        = sn('fapp' );

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);





    ssD.videoList =
    [
        {   // L2
            caption        : 'Claim explanation',
            //=============================================================
            // //\\ this option actually restricts presence of a video clip
            //in absense of this option or its suboptions, the clip
            //added to wider set of app. modes
            //=============================================================
            lemmaNumber    : 2,
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
            caption        : 'Proof explanation',
            lemmaNumber    : 2,
            modeType       : { 'proof':'claim'
                            },
            isExternal     : true,
            URL            :"http://sciencehike.com/original/NewtonPrincipia/content-guide/B1S1L02Proof.mp4"
        },
        {
            caption        : 'Claim explanation',
            lemmaNumber    : 3,
            modeType       : { 'proof':'claim'
                            },
            isExternal     : true,
            URL            :"http://sciencehike.com/original/NewtonPrincipia/content-guide/B1S1L03Claim.mp4"
        },
        {
            caption        : 'Proof explanation',
            lemmaNumber    : 3,
            modeType       : { 'proof':'claim'
                            },
            isExternal     : true,
            URL            :"http://sciencehike.com/original/NewtonPrincipia/content-guide/B1S1L03Proof.mp4"
        },
        {
            caption        : 'Claim explanation',
            lemmaNumber    : 9,
            modeType       : { 'proof':'claim'
                            },
            isExternal     : true,
            URL            :"http://sciencehike.com/original/NewtonPrincipia/content-guide/B1S1L09Claim.mp4"
        },
        {
            caption        : 'Proof explanation',
            lemmaNumber    : 9,
            modeType       : { 'proof':'claim'
                            },
            isExternal     : true,
            URL            :"http://sciencehike.com/original/NewtonPrincipia/content-guide/B1S1L09Proof.mp4"
        }
    ];

}) ();


( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;

    var fapp        = sn('fapp' );

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);





    ssD.videoList =
    [
        {
            caption        : 'Lemma 2 Model Guide for claim/lite',
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
            URL            :"content-guide/B1S1L02Claim.mp4"
        },
        {
            caption        : 'Lemma 2 One more video for all texts',
            lemmaNumber    : 2,
            modeType       : { 'proof':'claim'
                            },
            isExternal     : true,
            URL            :"https://www.youtube.com/embed/pS-hjfKlips"
        },
        {
            caption        : 'Lemma 9 Model Guide',
            lemmaNumber    : 9,
            isExternal     : true,
            URL            :"https://www.youtube.com/embed/pS-hjfKlips"
        }
    ];

}) ();


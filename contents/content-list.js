( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);
    fconf.sappModulesList = {};


    var sappModulesArray = fconf.sappModulesArray =
    [
        {
            sappId : 'home-pane',
            book : '',
            caption : 'An Interactive Exploration of Newton’s Lemmas',
            annotation : "Home Page and Contents",
        },

        {
            sappId : 'lemma1',
            book : 'Book 1',
            caption : 'Sec. I. Lemma I',
            annotation : "Core lemma introducing limit method",
        },

        {   sappId : 'lemma2',
            book : 'Book 1',
            caption : 'Sec. I. Lemma II',
            annotation : "Lorem ipsum acnut lima noir set lorem ipsum doler sut.",
        },

        {   sappId : 'lemma3',
            book : 'Book 1',
            caption : 'Sec. I. Lemma III',
            annotation : "Lorem ipsum  set lorem ipsum doler sut.",
        },

        {   sappId : 'b1sec1lemma4',
            book : 'Book 1',
            caption : 'Sec. I. Lemma IV',
            annotation : "Lorem ipsum  set lorem ipsum doler sut.",
        },

        {   sappId : 'b1sec1lemma6',
            book : 'Book 1',
            caption : 'Sec. I. Lemma VI',
            annotation : "",
        },

        {   sappId : 'b1sec1lemma7',
            book : 'Book 1',
            caption : 'Sec. I. Lemma VII',
            annotation : "",
        },


        {   sappId : 'b1sec1lemma9',
            book : 'Book 1',
            caption : 'Sec. I. Lemma IX',
            annotation : "Lorem ipsum dolor acnut lima noir set lorem ipsum doler sut.",
        },

        {   sappId : 'b1sec1lemma10',
            book : 'Book 1',
            caption : 'Sec. I. Lemma X',
            annotation : "Lorem ipsum dolor acnut lima noir set lorem ipsum doler sut.",
        },

        {   sappId : 'b1sec1lemma11',
            book : 'Book 1',
            caption : 'Sec. I. Lemma XI',
            annotation : "",
        },

        {   sappId : 'b1s2prop1theor1',
            book : 'Book 1',
            caption : 'Sec. II. Proposition I. Theorem I',
            annotation : "",
        },


        {   sappId : 'b1sec5lemma20',
            book : 'Book 1',
            caption : 'Sec. V. Lemma XX',
            annotation : "",
        },

        {   sappId : 'b1sec5lemma21',
            book : 'Book 1',
            caption : 'Sec. V. Lemma XXI',
            annotation : "",
        },

        {   sappId : 'b3sec4lemma5',
            book : 'Book 3',
            caption : 'Sec. IV. Lemma V',
            annotation : "",
        },

        {   sappId : 'addendum-frameworks',
            book : 'Addendum',
            caption : 'Introduction (in progress)',
            annotation : "Comments to the Book",
        },

        /*
        {   sappId : 'addendum-preliminaries',
            book : 'Addendum',
            caption : 'Preliminaries (in progress)',
            annotation : "Comments to the Book",
        },
        */
    ];

    ///spawns modules array into modules list and fills incompleted properties
    sappModulesArray.forEach( function( moduleItem, moduleIx ) {
        moduleItem.ix = moduleIx;
        fconf.sappModulesList[ moduleItem.sappId ] = moduleItem;
    });

}) ();


( function() {
    var { has, sconf, fconf, ssF, userOptions } = window.b$l.apptree({});
    fconf.ix2lemmaDef =
    [
        {
            sappId : 'home-pane',
            book : '',
            caption : 'Principia models',
            annotation : "Home Page and Contents",
        },

        /*  
            Professor Gallant is most interested in interacting with Newton's diagrams,
            and concerned about one without interaction.
            I (John Scott) agree. Could be confusing when others are interactive.
            So removing L1 for now. Can re-evaluate later.
        {
            sappId : 'lemma1',
            book : 'Book 1',
            caption : 'Sec. 1. Lemma 1.',
            annotation : "Core lemma introducing limit method",
        },*/

        {   sappId : 'lemma2',
            book : 'Book 1',
            caption : 'Sec. 1, Lemma 2',
            annotation : "Lorem ipsum acnut lima noir set lorem ipsum doler sut.",
        },

        {   sappId : 'lemma3',
            book : 'Book 1',
            caption : 'Sec. 1, Lemma 3',
            annotation : "Lorem ipsum  set lorem ipsum doler sut.",
        },

        {   sappId : 'b1sec1lemma4',
            book : 'Book 1',
            caption : 'Sec. 1, Lemma 4',
            annotation : "Lorem ipsum  set lorem ipsum doler sut.",
        },

        {   sappId : 'b1sec1lemma6',
            book : 'Book 1',
            caption : 'Sec. 1, Lemma 6',
            annotation : "",
        },

        {   sappId : 'b1sec1lemma7',
            book : 'Book 1',
            caption : 'Sec. 1, Lemma 7',
            annotation : "",
        },

        {   sappId : 'b1sec1lemma8',
            book : 'Book 1',
            caption : 'Sec. 1, Lemma 8',
            annotation : "",
        },

        {   sappId : 'b1sec1lemma9',
            book : 'Book 1',
            caption : 'Sec. 1, Lemma 9',
            annotation : "Lorem ipsum dolor acnut lima noir set lorem ipsum doler sut.",
        },

        {   sappId : 'b1sec1lemma10',
            book : 'Book 1',
            caption : 'Sec. 1, Lemma 10',
            annotation : "Lorem ipsum dolor acnut lima noir set lorem ipsum doler sut.",
        },

        {   sappId : 'b1sec1lemma11',
            book : 'Book 1',
            caption : 'Sec. 1, Lemma 11',
            annotation : "",
        },

        {   sappId : 'b1sec2prop1',
            book : 'Book 1',
            caption : 'Sec. 2, Proposition 1',
            annotation : "",
        },

        {   sappId : 'b1sec2prop2',
            book : 'Book 1',
            caption : 'Sec. 2, Proposition 2',
            annotation : "",
        },

        {   sappId : 'b1sec2prop6',
            book : 'Book 1',
            caption : 'Sec. 2, Proposition 6',
            annotation : "",
        },

        {   sappId : 'b1sec2prop7',
            book : 'Book 1',
            caption : 'Sec. 2, Proposition 7',
            annotation : "",
        },

        {   sappId : 'b1sec2prop9',
            book : 'Book 1',
            caption : 'Sec. 2, Proposition 9',
            annotation : "",
        },

        {   sappId : 'b1sec2prop10',
            book : 'Book 1',
            caption : 'Sec. 2, Proposition 10',
            annotation : "",
        },

        {   sappId : 'b1sec3prop11',
            book : 'Book 1',
            caption : 'Sec. 3, Proposition 11',
            annotation : "",
        },

        {   sappId : 'b1sec3prop12',
            book : 'Book 1',
            caption : 'Sec. 3, Proposition 12',
            annotation : "",
        },


        /*
        {   sappId : 'b1sec3lemma13',
            book : 'Book 1',
            caption : 'Sec. 3. Lemma 13.',
            annotation : "",
        },

        {   sappId : 'b1sec3lemma14',
            book : 'Book 1',
            caption : 'Sec. 3. Lemma 14.',
            annotation : "",
        },
        */

        {   sappId : 'b1sec3prop13',
            book : 'Book 1',
            caption : 'Sec. 3, Proposition 13',
            annotation : "",
        },

        {   sappId : 'b1sec3prop14',
            book : 'Book 1',
            caption : 'Sec. 3, Proposition 14',
            annotation : "",
        },

        {   sappId : 'b1sec3prop15',
            book : 'Book 1',
            caption : 'Sec. 3, Proposition 15',
            annotation : "",
        },
        {   sappId : 'b1sec3prop16',
            book : 'Book 1',
            caption : 'Sec. 3, Proposition 16',
            annotation : "",
        },

        {   sappId : 'b1sec3prop17',
            book : 'Book 1',
            caption : 'Sec. 3, Proposition 17',
            annotation : "",
        },

        {   sappId : 'b1sec5lemma20',
            book : 'Book 1',
            caption : 'Sec. 5, Lemma 20',
            annotation : "",
            //inAddendum : true,
        },

        {   sappId : 'b1sec5lemma21',
            book : 'Book 1',
            caption : 'Sec. 5, Lemma 21',
            annotation : "",
            //inAddendum : true,
        },

        {   sappId : 'b1sec8prop41',
            book : 'Book 1',
            caption : 'Sec. 8, Proposition 41',
            annotation : "",
        },

        {   sappId : 'b3lemma5',
            book : 'Book 3',
            caption : 'Lemma 5',
            annotation : "",
        },

        {   sappId : 'addd-fw',
            book : 'Appendix',
            caption : 'Logical frameworks.',
            annotation : userOptions.BONUS_START,
        },

        {   sappId : 'addd-prel',
            book : 'Appendix',
            caption : 'Euclid-Dedekind Ratios.',
            annotation : "Comments to the Book",
        },

        {   sappId : 'addd-prel-curve',
            book : 'Appendix',
            caption : 'Euclid. Curves.',
            annotation : "Comments to the Book",
        },
        {   sappId : 'addd-prel-curveXX',
            book : 'Appendix',
            caption : 'Calculus XX. Curves.',
            annotation : "Comments to the Book",
        },

        {   sappId : 'addd-conics',
            book : 'Appendix',
            caption : 'Conics.',
            annotation : "...",
        },

        {   sappId : 'addd-kepler-task',
            book : 'Appendix',
            caption : 'Kepler Task.',
            annotation : userOptions.BONUS_END,
        },
    ];
}) ();


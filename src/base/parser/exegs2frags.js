( function() {

    var {
        eachprop,
        exegs,
        topics,
        references,
    } = window.b$l.apptree({
        ssFExportList :
        {
            exegs_2_frags,
        },
    });


    //*************************************************
    //todm: buggy
    //      1.Spanish forbidden, 2.non-reliable parsing
    var ACTION_SPLITTER = /¿/g;

    var ACTION_INDICATOR = '?';
    //still buggy: var ACTION_INDICATOR = /¡/;
    //*************************************************

    //possible alternative:
    //var ACTION_SPLITTER = /[\u00BF-\u00BF]/g;
    return;










    ///===================================================================
    ///Splits bodyscript-of-exegesis into array of "active"-fragments.
    ///Attaches this array to exegesis.
    ///Fragments which is active is parsed into object.
    ///===================================================================
    function exegs_2_frags()
    {
        //==============================================
        // //\\ sapwns script-embedded-in-text to html
        //==============================================
        eachprop( exegs, ( theorionAspects, theorion_id ) => {
            eachprop( theorionAspects, ( exAspect, aspect_id ) => {
                exAspect.subexegs.forEach( ( subexeg, exegId ) => {
                    subexeg.domComponents  = [];
                    subexeg.classStr       = 'original-text ' + theorion_id + ' ' + aspect_id +
                                             ' subessay-' + subexeg.essayHeader.subessay;

                    //-----------------------------------------------------
                    // //\\ preliminary prepasing to extract active content
                    //-----------------------------------------------------
                    var bodySplit = subexeg.bodyscript.split( ACTION_SPLITTER );

                    //atomic fragments which are either text or
                    //JSON object which sets action
                    //The action defines what fragment displays:
                    //the action looks for application state and by this state
                    //displays fragment's content.
                    var activeFrags = bodySplit.map( function( splittee ) {
                        if( splittee.indexOf( ACTION_INDICATOR ) === 0 ) {
                            return JSON.parse( splittee.substring(1) );
                        } else {
                            return splittee;
                        }
                    });
                    //-----------------------------------------------------
                    // \\// preliminary prepasing to extract active content
                    //-----------------------------------------------------

                    if( references.text ) {
                        ////references to essay-sources to be cited or to be the base of essay
                        activeFrags.push( references.text );
                    }
                    subexeg.activeFrags = activeFrags;
                });
            });
        });
        //==============================================
        // \\// sapwns script-embedded-in-text to html
        //==============================================
    }

}) ();



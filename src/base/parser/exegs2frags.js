( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;

    var rootvm      = sn('rootvm');
    var cssp        = ns.CSS_PREFIX;
    var fapp        = sn('fapp' ); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var rg          = sn('registry',ssD);
    var exegs       = sn('exegs', ssD);
    var topics      = sn('topics', ssD);
    var references  = sn('references', ssD);

    sDomF.exegs_2_frags = exegs_2_frags;


    var ACTION_SPLITTER = /¿/g;
    var ACTION_INDICATOR = /\?/;
    //possible alternative:
    //var ACTION_SPLITTER = /[\u00BF-\u00BF]/g;
    //var ACTION_INDICATOR = /^\?/;
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
        ns.eachprop( exegs, ( theorionAspects, theorion_id ) => {
            ns.eachprop( theorionAspects, ( exAspect, aspect_id ) => {
                exAspect.subexegs.forEach( ( exeg, exegId ) => {
                    exeg.domComponents  = [];
                    exeg.classStr       = 'original-text ' + theorion_id + ' ' + aspect_id +
                                          ' subessay-' + exeg.essayHeader.subessay;

                    //-----------------------------------------------------
                    // //\\ preliminary prepasing to extract active content
                    //-----------------------------------------------------
                    var bodySplit = exeg.bodyscript.split( ACTION_SPLITTER );

                    //atomic fragments which are either text or
                    //JSON object which sets action
                    //The action defines what fragment displays:
                    //the action looks for application state and by this state
                    //displays fragment's content.
                    var activeFrags = bodySplit.map( function( splittee ) {
                        if( ACTION_INDICATOR.test( splittee ) ) {
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
                    exeg.activeFrags = activeFrags;
                });
            });
        });
        //==============================================
        // \\// sapwns script-embedded-in-text to html
        //==============================================
    }

}) ();



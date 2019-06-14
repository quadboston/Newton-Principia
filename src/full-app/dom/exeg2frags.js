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

    sDomF.exeg_2_frags = exeg_2_frags;
    return;












    function exeg_2_frags()
    {
        //==============================================
        // //\\ sapwns script-embedded-in-text to html
        //==============================================
        ns.eachprop( exegs, ( theorionAspects, teaf_id ) => {
            ns.eachprop( theorionAspects, ( exeg, leaf_id ) => {
                //.RM "original-text" means CSS class of exegesis-text-html
                //.which is obtained by parsing raw-exegesis-script
                var essId = teaf_id + ' ' + leaf_id;
                var classStr = 'original-text ' + essId;
                var bodyscript = exeg.bodyscript;
                //-----------------------------------------------------
                // //\\ preliminary prepasing to extract active content
                //-----------------------------------------------------
                var ACTION_SPLITTER = /¿/g;
                var ACTION_INDICATOR = /\?/;
                //possible alternative:
                //var ACTION_SPLITTER = /[\u00BF-\u00BF]/g;
                //var ACTION_INDICATOR = /^\?/;
                var bodySplit = bodyscript.split( ACTION_SPLITTER );

                //atomic fragments which are eigther text or
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
                exeg.classStr       = classStr;
                exeg.activeFrags    = activeFrags;
                exeg.domComponents  = [];
            });
        });
        //==============================================
        // \\// sapwns script-embedded-in-text to html
        //==============================================
    }

}) ();



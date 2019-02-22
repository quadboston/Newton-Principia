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
    var ssModes     = sn('ssModes',ss);
    var rg          = sn('registry',ssD);
    var rawTexts    = sn('rawTexts', ssD);
    var topics      = sn('topics', ssD);
    var references  = sn('references', ssD);

    var globalCss = '';
    var esseyions_halfBuilt = []; //key pairs:

    sDomF.topicModel_2_css_html = topicModel_2_css_html;
    sDomF.repopulateContent = repopulateContent;
    sDomF.originalTexts_2_html_texts = originalTexts_2_html_texts;
    //000000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000000







    function originalTexts_2_html_texts()
    {
        //==============================================
        // //\\ sapwns script-embedded-in-text to html
        //==============================================
        ///loops via all texts which were scripted by content contributor
        Object.keys( rawTexts ).forEach( function( theophase ) {
            ///loops inside of specific proof-mode
            var essays = rawTexts[theophase];
            Object.keys( essays ).forEach( function( essaspect ) {
                //.RM "original-text" means CSS class of exegesis-text-html
                //.which is obtained by parsing raw-exegesis-script
                var classStr = 'original-text ' + theophase + ' ' + essaspect;
                var bodyscript = essays[essaspect].bodyscript;

                //-----------------------------------------------------
                // //\\ preliminary prepasing to extract active content
                //-----------------------------------------------------
                var ACTION_SPLITTER = /¿/g;
                var ACTION_INDICATOR = /\?/;
                //possible alternative:
                //var ACTION_SPLITTER = /[\u00BF-\u00BF]/g;
                //var ACTION_INDICATOR = /^\?/;

                var bodySplit = bodyscript.split( ACTION_SPLITTER );
                var bodyActiveFragments = bodySplit.map( function( splittee ) {
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
                    bodyActiveFragments.push( references.text );
                }
                esseyions_halfBuilt.push({
                    classStr:classStr,
                    bodyActiveFragments:bodyActiveFragments, //atomic text mapped to UI text-pane
                    domComponents:[],
                    html_bFags:[]
                });
            });
        });
        //==============================================
        // \\// sapwns script-embedded-in-text to html
        //==============================================
    };









    //==============================================
    // //\\ colorizes hihglight
    //==============================================
    function createColorCodingCSS()
    {
        var fc = sconf.tfamilyColor;

        //=================================================
        // //\\ non family and topic specific highlight CSS
        //=================================================
        globalCss += `

            /* vital: insists on visibility and overrides possibly
               coinciding target-child css which disables the child
            */
            #bsl-text-widget.bsl-text-widget a.topic-link {
                display:inline;
            }

            /*=============================*/
            /* //\\ links in original text */
            /*=============================*/
            a.topic-link {
                padding:1px;
                text-decoration:none;
                border-radius:4px;
            }
            /*=============================*/
            /* \\// links in original text */
            /*=============================*/


            /*=================================================
            //\\ higlights topic items when hovered by mouse
            =================================================*/
            .bsl-approot .bsl-media .tofill.highlighted {
                fill-opacity : 0.5; /* <1 to enable two topics in one topic-link */
                visibility:visible;
            }
            .bsl-approot .bsl-media .tofill.op1 {
                fill-opacity : 0.6;
            }
            .bsl-approot .bsl-media .tofill.highlighted.op1 {
                fill-opacity : 1;
            }
            .bsl-approot .bsl-media .tostroke.highlighted {
                stroke-opacity:0.8; /* <1 to enable two topics in one topic-link */ 
                stroke-width:7px;
                visibility:visible;
            }
            /*=================================================
            \\// higlights topic items when hovered by mouse
            =================================================*/


            /*====================================*/
            /* //\\ text-hover to shape-highlight */
            /*====================================*/
            .main-legend td.highlighted {
                opacity:1;
                font-weight:bold;
            }
            /*====================================*/
            /* \\// text-hover to shape-highlight */
            /*====================================*/

        `;
        //=================================================
        // \\// non family and topic specific highlight CSS
        //=================================================




        //=================================================
        // //\\ family specific highlight CSS
        //=================================================
        Object.keys( sconf.tfamilyColor ).forEach( function( fkey ) {
            var fcolor = fc[fkey];

            var ww = `

                /*----------------*/
                /* //\\ to stroke */
                /*----------------*/
                .topic-link.tfamily-${fkey},
                .tfamily-${fkey}.tostroke {
                    color: black;
                    stroke: black;
                }
                .aspect--english .topic-link.tfamily-${fkey},
                .aspect--english .tfamily-${fkey}.tostroke,
                .aspect--hypertext .topic-link.tfamily-${fkey},
                .aspect--hypertext .tfamily-${fkey}.tostroke {
                    color: rgba(${fcolor}, 1);
                    stroke: rgba(${fcolor}, 1);
                }
                /*----------------*/
                /* \\// to stroke */
                /*----------------*/

                /*---------------*/
                /* //\\ to fill  */
                /*---------------*/
                .tfamily-${fkey}.tofill {
                    fill: black;
                    fill-opacity:0.2;
                }
                .bsl-approot .tfamily-${fkey}.tofill.op1             {fill-opacity:0.7;}
                .bsl-approot .tfamily-${fkey}.tofill.op1.highlighted {fill-opacity:1;  }/*todm patch*/

                /* this specifity must yield to topicid */
                .aspect--english .tfamily-${fkey}.tofill,
                .aspect--hypertext .tfamily-${fkey}.tofill {
                    fill: rgba(${fcolor}, 1);
                }
                /*---------------*/
                /* \\// to fill  */
                /*---------------*/
            `;
            globalCss += ww;
        });
        //=================================================
        // \\// family specific highlight CSS
        //=================================================
    };
    //==============================================
    // \\// colorizes hihglight
    //==============================================



    ///contents depends on model mode
    ///this function visualizes the texts upon the mode
    ///at late run-time event, this function is, for example,
    ///used in lemma-2-3::gui-visibility.js::refreshSVG_master()
    function repopulateContent()
    {
        //purges all contents and can be a bug
        //bs tabs are transcluded into the same el:
        //sDomN.essaionsRoot$.html('');

        esseyions_halfBuilt.forEach( function( halfBuilt_ess ) {

            if( !halfBuilt_ess.domEl ) {
                halfBuilt_ess.domEl = $$
                  .c('div')
                  .addClass( halfBuilt_ess.classStr )
                  //*******************************************************
                  //.here page content injects into html for the first time
                  //*******************************************************
                  .to( sDomN.essaionsRoot$() )
                  ();
            }
            activeFrags_2_htmlFrags( halfBuilt_ess );

            var domComponents = halfBuilt_ess.domComponents;
            halfBuilt_ess.html_bFags.forEach( function( bFrag, fix ) {
                if( !domComponents[fix] ) {
                    domComponents[fix] = $$
                        .c('div')
                        .css( 'display', 'inline' )
                        //*******************************************************
                        //.here page content injects into html for the first time
                        //*******************************************************
                        .to( halfBuilt_ess.domEl )
                        ();
                    domComponents[fix].innerHTML = bFrag.text;
                }
                //todo: ineffective: do throttle or create html only once and
                //      update only CSS-display
                if( bFrag.modeIsTogglable ) {
                    domComponents[fix].innerHTML = bFrag.text;
                }
                BodyMathJax_2_HTML( domComponents[ fix ] );
            });
        });
    }

    function BodyMathJax_2_HTML( domEl )
    {
        mathJax_2_HTML();
        ///===============================================
        /// waits for MathJax and fires it up over domEl
        ///===============================================
        function mathJax_2_HTML()
        {
            if( !window.MathJax ) {
                //c cc( 'Still waiting for MathJax. Timestamp=' + Date.now() );
                //.no way to avoid this ... mj doc does not help:
                setTimeout( mathJax_2_HTML, 100 );
                return;
            }
            //c cc( 'MathJax is loaded. ' + Date.now() );

            //MathJax.Hub.Typeset() 
            //MathJax.Hub.Queue(["Typeset",MathJax.Hub,"script"]);
            //function hideFlicker() { contentDom.style.visibility = 'hidden'; }
            //function unhideAfterFlicker() { contentDom.style.visibility = 'visible'; }

            MathJax.Hub.Queue(["Typeset",MathJax.Hub,domEl]);
        }
    }



    //===============================================
    //
    //===============================================
    function activeFrags_2_htmlFrags( halfBuilt_ess )
    {
        var res = 
            '\\¦([^¦]+)\\¦' + //catches topicId
               '([^¦]+)'    + //catches topic caption
            '\\¦\\¦';
        var re = new RegExp( res, 'g' );
        //var re_amp = /\&/g;
        var html_bFags = halfBuilt_ess.html_bFags;
        halfBuilt_ess.bodyActiveFragments.forEach( function( activeFrag, tix ) {

            //--------------------------------------------------------
            // //\\ finalizes script active instructions
            //--------------------------------------------------------
            if( typeof( activeFrag ) === 'object' ) {
                var finalActive = activeFrag['default'];
                Object.keys( ssModes ).forEach( function( smode ) {
                    finalActive = ( ssModes[smode] && activeFrag[smode] ) || finalActive;
                    //if( ssModes[smode] && activeFrag[smode] )
                    //ccc( 'new script:' + ( ssModes[smode] && activeFrag[smode] ) );
                });
            } else {
                var finalActive = activeFrag;
            }
            //--------------------------------------------------------
            // \\// finalizes script active instructions
            //--------------------------------------------------------



            //--------------------------------------------------------
            // //\\ html conversion of body fragments
            //--------------------------------------------------------
            txt = finalActive; //.replace( re_amp, '&amp;' );
            if( topics.convert_lineFeed2htmlBreak ) {
                //.converts text from <pre> format
                var txt = ns.pre2fluid( txt ) 
            }
            if( typeof( activeFrag ) === 'object' ) {
                ////reparses text every time ...
                ////todo: ineffective ... parses toggles at "each change"
                html_bFags[tix] =
                {
                    modeIsTogglable : typeof( activeFrag ) === 'object',
                    text : txt.replace( re, '<a class="topic-link $1">$2</a>' )
                };
            } else {
                ////makes it up only once ... no redundant parsing
                html_bFags[tix] = html_bFags[tix] ||
                {
                    modeIsTogglable : false,
                    text : txt.replace( re, '<a class="topic-link $1">$2</a>' )
                };
            }
            //--------------------------------------------------------
            // \\// html conversion of body fragments
            //--------------------------------------------------------

        });
    }

    ///this function needs application-model-view already created
    function topicModel_2_css_html()
    {
        createColorCodingCSS();
        repopulateContent();

        var wDefs = topics.topicDef;
        var topicsN = Object.keys( wDefs ).length;
        Object.keys( wDefs ).forEach( function( topicId, tix ) {
            //=========================================================
            // //\\ processes specific topicId
            //=========================================================
            var shapes = wDefs[ topicId ];

            //=======================================
            // //\\ builds token-definition colorizer
            //=======================================
            // //\\ autogenerates topic color
            //-------------------------------
            var tcolor = shapes.topicColor;
            if( tcolor === 'auto' ) {
                var SATUR = 99;
                var LIGHT = 30;
                var OPACITY = 1;
                var hue = 359 / topicsN * tix;
                var tcolorStroke = ns.pars2colors( hue, SATUR, LIGHT, OPACITY ).rgba;
                var tcolorFill = ns.pars2colors( hue, SATUR, LIGHT, 1 ).rgba;
            } else if( tcolor ) {
                var tcolorStroke = tcolor;
                var tcolorFill = tcolor;
            }
            var finalColor = tcolorFill;
            if( !tcolor && shapes.tfamily ) {
                finalColor = 'rgb(' + sconf.tfamilyColor[ shapes.tfamily ] + ')';
            }
            //-------------------------------
            // \\// autogenerates topic color
            //-------------------------------
            if( tcolor ) {
                globalCss +=`

                    /* //\\ fill color variations */
                    .bsl-approot.aspect--english .topicid-${topicId}.tofill,
                    .bsl-approot.aspect--hypertext .topicid-${topicId}.tofill {
                        fill: ${tcolorFill};
                    }
                    .bsl-approot.aspect--english .highlighted.topicid-${topicId}.tofill,
                    .bsl-approot.aspect--hypertext .highlighted.topicid-${topicId}.tofill {
                        fill: ${tcolorFill};
                    }
                    /* \\// fill color variations */

                    /* //\\ fill opacity variations */
                    .bsl-approot.aspect--english .topicid-${topicId}.tofill,
                    .bsl-approot.aspect--hypertext .topicid-${topicId}.tofill {
                        fill-opacity:0.2;
                    }
                    .bsl-approot.aspect--english .highlighted.topicid-${topicId}.tofill,
                    .bsl-approot.aspect--hypertext .highlighted.topicid-${topicId}.tofill {
                        fill-opacity:0.5;
                    }
                    .bsl-approot.aspect--english .topicid-${topicId}.tofill.op1,
                    .bsl-approot.aspect--hypertext .topicid-${topicId}.tofill.op1 {
                        fill-opacity:0.6;
                    }
                    .bsl-approot.aspect--english .highlighted.topicid-${topicId}.tofill.op1,
                    .bsl-approot.aspect--hypertext .highlighted.topicid-${topicId}.tofill.op1 {
                        fill-opacity:1;
                    }
                    /* \\// fill opacity variations */


                    /* //\\ stroke color variations */
                    .bsl-approot.aspect--english .topic-link.${topicId},
                    .bsl-approot.aspect--english .main-legend .topicid-${topicId},
                    .bsl-approot.aspect--english .topicid-${topicId}.tostroke,

                    .bsl-approot.aspect--hypertext .topic-link.${topicId},
                    .bsl-approot.aspect--hypertext .main-legend .topicid-${topicId},
                    .bsl-approot.aspect--hypertext .topicid-${topicId}.tostroke {
                        stroke: ${tcolorStroke};
                        color: ${tcolorStroke};
                    }
                    /* \\// stroke color variations */

                    /* //\\ stroke opacity variations */
                    .bsl-approot.aspect--english .topicid-${topicId}.tostroke,
                    .bsl-approot.aspect--hypertext .topicid-${topicId}.tostroke {
                        stroke-opacity:0.6;
                    }
                    .bsl-approot.aspect--english .highlighted.topicid-${topicId}.tostroke,
                    .bsl-approot.aspect--hypertext .highlighted.topicid-${topicId}.tostroke {
                        stroke-opacity:1;
                    }
                    /* \\// stroke opacity variations */
                `;
            }
            //=======================================
            // \\// builds token-definition colorizer
            //=======================================




            //=======================================
            // //\\ builds dom elements for the topic
            //=======================================
            var domEls = [];

            ///searches by scripted shapes.id
            ///finds all figure-shapes from their id-list
            shapes.id && shapes.id.forEach( function(rgId) {
                var unit = rg[ rgId ];
                //.unit can have an arbitrary kind of dom-representation ...
                if(!unit) throw 'rg[' + rgId + '] is undefined';

                if( !finalColor && unit.tfamily ) {
                    finalColor = 'rgb(' + sconf.tfamilyColor[ unit.tfamily ] + ')';
                }
                unit.finalColor = finalColor;
                //c cc( rgId + ' in topic .... unit=' + unit.finalColor )

                var domel = (unit.mediael && (unit.mediael.paintedCurve || unit.mediael)) ||
                            unit.svgel || unit.domel;
                var domel$ = $$.$(domel);
                domel$.addClass( 'topicid-' + topicId );
                if( shapes.tfamily ) {
                    domel$.addClass( 'tfamily-' + shapes.tfamily );
                }
                domEls.push(domel);
            });

            ///searches by CSS query
            if( shapes.classQuery ) {
                var shapesEls = document.querySelectorAll( shapes.classQuery );
                shapesEls.forEach( function( domel ) {
                    var domel$ = $$.$(domel);
                    domel$.addClass( 'topicid-' + topicId );
                    if( shapes.tfamily ) {
                        domel$.addClass( 'tfamily-' + shapes.tfamily );
                    }
                    domEls.push(domel);
                });
            }
            //=======================================
            // \\// builds dom elements for the topic
            //=======================================


            //========================================================
            // //\\ sets up anchors
            //========================================================
            //c cc( 'domEls=', domEls );
            //.finds all anchors bound to the link-key
            var anchors = sDomN.essaionsRoot$().querySelectorAll( 'a.topic-link.' + topicId );
            anchors.forEach( function(attachee) {

                //.fixes goodies missed at creation
                if( shapes.tfamily ) {
                    $$.$(attachee).addClass( 'tfamily-' + shapes.tfamily );
                }

                //---------------------------------
                // //\\ do add remove "highlighted"
                //      from child elements
                //---------------------------------
                ///adds hover=event to all text-links
                attachee.addEventListener( 'mouseover', function() {
                    ///highlights all shapes-in-figure linked to text-link
                    domEls.forEach( function(domel) {
                        ns.$$.addClass( 'highlighted', domel );
                    });
                });
                ///adds unhover=event to all text-links
                attachee.addEventListener( 'mouseleave', function() {
                    ///unhighlights all shapes-in-figure linked to text-link
                    domEls.forEach( function(domel) {
                        ns.$$.removeClass( 'highlighted', domel );
                        //c cc( 'removing hg class from',domel );
                    });
                });
                //---------------------------------
                // \\// do add remove "highlighted"
                //---------------------------------
            });
            //========================================================
            // \\// sets up anchors
            // \\// processes specific topicId
            //=========================================================
        });


        //========================================================
        // //\\ finalizes global css
        //========================================================
        ns.globalCss.add8update( globalCss );
        //========================================================
        // \\// finalizes global css
        //========================================================
    };

}) ();


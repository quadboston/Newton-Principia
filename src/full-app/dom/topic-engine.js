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
    var rawTexts    = sn('rawTexts', ssD);
    var topics      = sn('topics', ssD);
    var references  = sn('references', ssD);

    var globalCss = '';
    var txtDom = []; //key pairs:

    sDomF.originalTexts_2_html_texts = originalTexts_2_html_texts;
    sDomF.createTextWidget = createTextWidget;
    sDomF.topicModel_2_css_html = topicModel_2_css_html;
    return;








    ///==========================================
    ///creates html for text pane
    ///==========================================
    function createTextWidget()
    {
        sDomN.text$ = $$
            .c('div')
            .a( 'id', cssp+'-text-widget' )
            .addClass( cssp+'-text-widget' )
            .to(rootvm.approot)
            ;
    };


    function originalTexts_2_html_texts()
    {
        //==============================================
        // //\\ sapwns script-embedded-in-text to html
        //==============================================
        var res = 
            '\\|([^\\|]+)\\|' + //catches topicId
               '([^\\|]+)'    + //catches topic caption
            '\\|\\|';
        var re = new RegExp( res, 'g' );
        var re_amp = /\&/g;

        ///loops via all texts which were scripted by content contributer
        Object.keys( rawTexts ).forEach( function( proofMode ) {
            ///loops inside of specific proof-mode
            Object.keys( rawTexts[proofMode] ).forEach( function( key ) {
                var txt = transformText( rawTexts[proofMode][key] );
                //.RM "original-text" means CSS class of exegesis-text-html
                //.which is obtained by parsing raw-exegesis-script
                var classStr = 'original-text ' + proofMode + ' ' + key;
                //txtDom += '<div class="' + classStr + '">' + txt + '</div>';

                txt += references.text || '';
                //**************************************************
                //.here content, txt, is prepared for html-injection
                //**************************************************
                txtDom.push({ classStr:classStr, text:txt });
            });
        });

        function transformText( text )
        {
            //.html excapes text
            //var txt = ns.htmlesc( text );
        
            txt = text.replace( re_amp, '&amp;' );
            if( topics.convert_lineFeed2htmlBreak ) {
                //.converts text from <pre> format
                var txt = ns.pre2fluid( txt ) 
            }
            var re = new RegExp( res, 'g' );

            //.not the best: misses all goodies from topic to be attached to "a"
            // fixed below ... by query-selector
            var txt = txt.replace( re, 
                '<a class="topic-link $1">$2</a>' );
            return txt;
        }
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
                .text--english .topic-link.tfamily-${fkey},
                .text--english .tfamily-${fkey}.tostroke,
                .text--hypertext .topic-link.tfamily-${fkey},
                .text--hypertext .tfamily-${fkey}.tostroke {
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
                .text--english .tfamily-${fkey}.tofill,
                .text--hypertext .tfamily-${fkey}.tofill {
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






    ///this function needs application-model-view already created
    function topicModel_2_css_html()
    {
        createColorCodingCSS();
        //sDomN.text$.html( txtDom );
        txtDom.forEach( function( contentTextBlock ) {
            $$.c('div')
              .addClass( contentTextBlock.classStr )
              .html( contentTextBlock.text )
              //************************************
              //.here page content injects into html
              //************************************
              .to( sDomN.text$() )
              ;
        });

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
                    .bsl-approot.text--english .topicid-${topicId}.tofill,
                    .bsl-approot.text--hypertext .topicid-${topicId}.tofill {
                        fill: ${tcolorFill};
                    }
                    .bsl-approot.text--english .highlighted.topicid-${topicId}.tofill,
                    .bsl-approot.text--hypertext .highlighted.topicid-${topicId}.tofill {
                        fill: ${tcolorFill};
                    }
                    /* \\// fill color variations */

                    /* //\\ fill opacity variations */
                    .bsl-approot.text--english .topicid-${topicId}.tofill,
                    .bsl-approot.text--hypertext .topicid-${topicId}.tofill {
                        fill-opacity:0.2;
                    }
                    .bsl-approot.text--english .highlighted.topicid-${topicId}.tofill,
                    .bsl-approot.text--hypertext .highlighted.topicid-${topicId}.tofill {
                        fill-opacity:0.5;
                    }
                    .bsl-approot.text--english .topicid-${topicId}.tofill.op1,
                    .bsl-approot.text--hypertext .topicid-${topicId}.tofill.op1 {
                        fill-opacity:0.6;
                    }
                    .bsl-approot.text--english .highlighted.topicid-${topicId}.tofill.op1,
                    .bsl-approot.text--hypertext .highlighted.topicid-${topicId}.tofill.op1 {
                        fill-opacity:1;
                    }
                    /* \\// fill opacity variations */


                    /* //\\ stroke color variations */
                    .bsl-approot.text--english .topic-link.${topicId},
                    .bsl-approot.text--english .main-legend .topicid-${topicId},
                    .bsl-approot.text--english .topicid-${topicId}.tostroke,

                    .bsl-approot.text--hypertext .topic-link.${topicId},
                    .bsl-approot.text--hypertext .main-legend .topicid-${topicId},
                    .bsl-approot.text--hypertext .topicid-${topicId}.tostroke {
                        stroke: ${tcolorStroke};
                        color: ${tcolorStroke};
                    }
                    /* \\// stroke color variations */

                    /* //\\ stroke opacity variations */
                    .bsl-approot.text--english .topicid-${topicId}.tostroke,
                    .bsl-approot.text--hypertext .topicid-${topicId}.tostroke {
                        stroke-opacity:0.6;
                    }
                    .bsl-approot.text--english .highlighted.topicid-${topicId}.tostroke,
                    .bsl-approot.text--hypertext .highlighted.topicid-${topicId}.tostroke {
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
            var anchors = sDomN.text$().querySelectorAll( 'a.topic-link.' + topicId );

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


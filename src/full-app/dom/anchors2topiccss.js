( function() {
    var ns          = window.b$l;
    var cssp        = ns.CSS_PREFIX;
    var $$          = ns.$$;
    var sn          = ns.sn;
    var fapp        = sn('fapp' ); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var topics      = sn('topics', ssD);

    var qq = document.querySelector;
    var qqa = document.querySelectorAll;
    var appRoot$;
    var ccc = console.log;

    sDomF.anchors2topiccss = anchors2topiccss;
    sDomF.setMouseHiglight = setMouseHiglight;
    return;








    function anchors2topiccss()
    {
        var topicLinks = topics.topicLinks;
        appRoot$ = fapp.fappRoot$;
        var topicAnchors = $$.qa( "a" )();
        if( !topicAnchors ) return;

        var style = document.createElement( 'style' );
        document.head.appendChild( style );
        var anchors2colors = '';
        var shape2color = {};


        ///enables non-hilighted and tohidden as "hidden" state
        styleStr = `
            .${cssp}-approot .tohidden {
                visibility: hidden;
            }
        `;

        topicAnchors.forEach( anchor => {
            var cls = anchor.className;
            var match = cls.match( /tl-(\S*)/ );
            if( !match ) return;
            var tplink_ix       = parseInt( match[1] );
            var alink           = topics.topicIndexedLinks[ tplink_ix ];
            var anchorIsBold    = alink && alink.anchorIsBold;
            //-----------------------------
            // //\\ assigns color to anchor
            //-----------------------------
            //:gets global shape color
            //:fist color of anchor stack of linked shapes
            var alkeys = Object.keys( alink.shapes );

            if( alink.parsedLinks.length > 1 ) {
                ////does something special for the color of this link,
                ////there are many shapes and colors referenced by the link,
                ////so it is not known which which color to use, so
                ////we use black:
                var rgba = 'rgba( 0, 0, 0, 0.7 )';
                var rgb1 = 'rgba( 0, 0, 0, 1 )';
                //ccc( alink.parsedLinks );
            } else {

                //.gets first shape id
                var firstShapeId = alkeys[0];
                //.gets first shape
                var globalShape = topics.topicShapes[ firstShapeId ];
                var g_rgba = globalShape.rgba;
                var g_rgb1 = globalShape.rgb1;
                var rgba = g_rgba;
                var rgb1 = g_rgb1;

                if( sconf.topicColorPerAnchor ) {
                    //alternative color from anchor stack
                    //anchor generated color
                    var rgba = alink.rgba;
                    var rgb1 = alink.rgb1;
                }
            }
            ///assigns color to anchor CSS
            //  this feature is disabled because bloats MathJax font
            //  anchors2colors += `
            //  a.tl-${alink.tplink_ix_str} {
            //       padding-left:3px;
            //       padding-right:3px;
            anchors2colors += `
                a.tl-${alink.tplink_ix + ''} {
                   border-radius:4px;
                   color:${rgb1};
                   opacity:0.8;
                   font-weight : ${anchorIsBold?'bold':'normal'};
                }
                a.tl-${alink.tplink_ix + ''}:hover {
                   opacity:1;
                   background-color:#eaeaea;
                   cursor:default;
                }
                a.tl-${alink.tplink_ix + ''}:hover span{
                   font-weight :bold;
                   background-color:#eaeaea;
                   cursor:default;
                }
            `;
            //-----------------------------
            // \\// assigns color to anchor
            //-----------------------------

            //-----------------------------------
            //inits mouse machine
            //-----------------------------------
            setMouseHiglight( anchor, tplink_ix );


            Object.keys( alink.shapes ).forEach( skey => {
               var shape = alink.shapes[ skey ];
                alink.col8shape_2_css = alink.col8shape_2_css || {};

                var globalShape = topics.topicShapes[ skey ];
                var scolor = globalShape.rgb1;

                if( sconf.topicColorPerAnchor ) {
                    ///colors per link
                    var scolor = rgba;
                    alink.col8shape_2_css[ skey ] = `
                        .${cssp}-approot .tp-${skey}.tocolor {
                           color : ${scolor};
                        }
                        .${cssp}-approot .tp-${skey}.tobg {
                           background-color : ${scolor};
                        }
                        .${cssp}-approot svg text.tp-${skey}.tofill,
                        .${cssp}-approot svg .tp-${skey}.tofill {
                           fill : ${scolor};
                        }
                        .${cssp}-approot svg text.tp-${skey}.tostroke,
                        .${cssp}-approot svg .tp-${skey}.tostroke {
                           stroke-linecap : round;
                           stroke : ${scolor};
                        }
                    `;

                } else {
                    ///colors per shape
                    shape2color[ skey ] = `
                        .${cssp}-approot .tp-${skey}.tocolor {
                           color : ${scolor};
                        }
                        .${cssp}-approot .tp-${skey}.tobg {
                           background-color : ${scolor};
                        }
                        .${cssp}-approot svg .tp-${skey}.tofill {
                           fill : ${scolor};
                        }
                        .${cssp}-approot svg .tp-${skey}.tostroke {
                           stroke-linecap : round;
                           stroke : ${scolor};
                        }
                    `;
                }
                //-------------------------------------
                // //\\ makes topicee highlight machine
                //-------------------------------------

                alink.col8shape_2_opac = alink.col8shape_2_css || {};
                alink.col8shape_2_opac[ skey ] = `
                    .${cssp}-approot .tp-${skey} {
                        opacity: 0.7;
                    }
                    .${cssp}-approot svg .tp-${skey} {
                        opacity : 1;
                        fill-opacity : 0.3;
                        stroke-opacity: ${ sconf.default_tp_stroke_opacity || 0.5 };
                    }



                    /* ================= */
                    /* //|| highlighted  */
                    /* ================= */
                    .${cssp}-approot.tp-${tplink_ix} .tp-${skey} {
                        opacity: 1;
                    }
                    .${cssp}-approot.tp-${tplink_ix} .tohidden.tp-${skey} {
                        visibility:visible;
                    }
                    /* does bold on anchor hover */
                    .${cssp}-approot.tp-${tplink_ix} .tp-${skey}.tobold {
                       font-weight : bold;
                    }

                    .${cssp}-approot.tp-${tplink_ix} svg .tp-${skey} {
                        fill-opacity : 0.7;
                        stroke-opacity: 1;
                    }
                    .${cssp}-approot.tp-${tplink_ix} svg .tp-${skey}.tostroke {
                        stroke-width:${ sconf.default_tp_stroke_width || 8 }px;
                    }
                    /* ================= */
                    /* //|| highlighted  */
                    /* ================= */



                    /* //|| special for svg-text */
                    .${cssp}-approot svg text.tp-${skey} {
                        fill-opacity : 0.7;
                    }
                    /* ***** highlighted */
                    .${cssp}-approot.tp-${tplink_ix} svg text.tp-${skey} {
                        fill-opacity : 1;
                    }
                    /* // ||// special for svg-text */

                `;
                ///boldifies svg-text at topic highlight
                alink.col8shape_2_opac[ skey ] += `
                    .${cssp}-approot.tp-${tplink_ix} svg text.tp-${skey} {
                        font-weight:bold;
                    }
                `;
                //-------------------------------------
                // \\// makes topicee highlight machine
                //-------------------------------------
            });

        });

        styleStr += anchors2colors;


        if( !sconf.topicColorPerAnchor ) {
            ns.eachprop( shape2color, scolor => {
                //colors per shape
                styleStr += scolor;
            });
        }

        topics.topicIndexedLinks.forEach( alink => {

            if( sconf.topicColorPerAnchor ) {
                //colors per alink
                ns.eachprop( alink.col8shape_2_css, icolor => {
                    styleStr += icolor;
                });
            }
            ns.eachprop( alink.col8shape_2_opac, icolor => {
                styleStr += icolor;
            });
        });

        style.innerHTML = styleStr;
    }


    function setMouseHiglight( anchor, coreName )
    {
        anchor.addEventListener( 'mouseover', ev => {
            appRoot$.addClass( 'tp-' + coreName );
        });
        anchor.addEventListener( 'mouseleave', ev => {
            appRoot$.removeClass( 'tp-' + coreName );
        });
    }

})();



//*******************************************************************
//          b$l = Beaver $cript Library.
//          Intended to be lite weight JS generic library.
//          Copyright (c) 2018 - 2019 Konstantin Kirillov
//          Licenses: MIT, GPL, GPL2.
//*******************************************************************

// //\\// Super-module of b$l framework. Must be executed first
//        Checks if there is a conflict in global namespace with this library name.
//        Adds ns.$$ - lite weight dom wrap.
//  
//        Creates only one global: window[ APP_NAME ]
//        jQuery can be added with no collision.


( function() {
    var APP_NAME        = 'b$l';

    //.optional property: comment this definition out if not needed
    //.purpose is only to short manual typing for development debug
    window.ccc          = window.console.log;

    var ns = setAppNamespace();
    setDomWrap( ns );
    return;




    function setAppNamespace()
    {
        var uniqueEarthWide = 'iamniquelks8e00w-e9jalknfnaegha;s[snfs=sieuhba;fkleub92784bna';
        var shortcutInClosure_for_speed = Object.prototype.hasOwnProperty;

        function returnOwnPropertyIfExist()
        {
            var wwHas = shortcutInClosure_for_speed;
            return ( function(pname) {
                return ( wwHas.call( this, pname ) && this[ pname ] );
            });
        }


        var ns = window[ APP_NAME ];
        if( ns ) {
            if( ns[ uniqueEarthWide ] ) { return ns; }
            //.lets community to take care about this app
            throw new Error(
                 'global name collision: the window["' + APP_NAME +
                 '"] already exists in web-browser'
            );
        } else {
            ns = window[ APP_NAME ] = {};
            ns[ uniqueEarthWide ] = true;
            ns.uniqueEarthWide = uniqueEarthWide;

            ns.own = returnOwnPropertyIfExist();
            ns.sn = sn;

            ns.APP_NAME = APP_NAME;
            ns.CSS_PREFIX = APP_NAME.replace( /\$/g, 's' );

            //:more good goodies
            ns.hae = hae;
            ns.haf = haf;
            ns.hafb = hafb;
            ns.haff = haff;
            ns.hob = hob;
            ns.haz = haz; //returns own prop if any
            ns.h = has;
            ns.ha = ha; //has or adds new
            ns.han = ha; //has or adds new

            //very very misleading:
            //ns.has = function( prop ) { return has( ns, prop ); };
            return ns;
        }

        ///Returns own property if property does exist. Otherwise, returns defaultProperty.
        function ha( obj, property, defaultProperty ) {
            return shortcutInClosure_for_speed.call( obj, property ) &&
                   typeof obj[ property ] !== 'undefined'  ?
                   obj[ property ] : defaultProperty;
        };


        ///Returns own property if property does exist. Otherwise, returns false.
        function haz( obj, property ) {
            if( !obj ) return false;
            return shortcutInClosure_for_speed.call( obj, property ) ?
                   obj[ property ] : false;
        };

        ///If property exists, returns function which takes callback to be executed
        ///on this this property.
        ///Otherwise, returns empty function.
        function hae( obj, property ) {
            return shortcutInClosure_for_speed.call( obj, property ) &&
                    typeof obj[ property ] !== 'undefined' ?
                    ( fun ) => { fun( obj[ property ] ) } : () => {};
        };

        ///Returns object's property if property does exist. Otherwise, returns empty function.
        function haf( obj, property ) {
            return shortcutInClosure_for_speed.call( obj, property ) ?
                   obj[ property ] : ()=>{};
        };

        ///Returns function bound to object
        function hafb( obj, property ) {
            return shortcutInClosure_for_speed.call( obj, property ) ?
                   obj[ property ].bind( obj ) : ()=>{};
        };

        ///If prop exist, executes it as a function with empty args, and
        ///               returns function's return.
        ///Otherwise,     returns 'undefined' value.
        function haff( obj, property ) {
            if( shortcutInClosure_for_speed.call( obj, property ) ) {
                if( typeof obj[ property ] === 'function' ) {
                    var ret = obj[ property ]();
                    return ret;
                }
            }
        }

        ///if property does not exist, returns empty object;
        //    otherwise, returns property which is intended to be object
        function hob( obj, property ) {
            return shortcutInClosure_for_speed.call( obj, property ) &&
                    typeof obj[ property ] !== 'undefined' ?
                    obj[ property ] : {};
        };

        ///Returns parent object only if own property exists. Otherwise, returns false.
        function has( obj, property ) {
            if( !obj ) return false;
            return shortcutInClosure_for_speed.call( obj, property ) &&
                   typeof obj[ property ] !== 'undefined' ? obj : false;
        };

        ///In plain words: makes-sure object-property exists and returns it.
        ///Input: optional emptyTemplate provides ability set {} or []
        function sn( subname, parentNS, emptyTemplate )
        {
            parentNS = parentNS || ns;
            if( parentNS &&
                shortcutInClosure_for_speed.call( parentNS, subname ) &&
                typeof parentNS[ subname ] !== 'undefined'
            ){
                return parentNS[ subname ];
            }
            var sns = parentNS[ subname ] = typeof emptyTemplate !== 'undefined' ?
                                            emptyTemplate : {};
            //collide with Object.keys forEach
            //sns.owned = returnOwnPropertyIfExist();
            /*
                var fun = {};
                fun.prototype = { own : returnOwnPropertyIfExist() };
                sns = new fun();
            */
            return sns;

            /*
            //proposes even deeper property conflict detection with JS native objects in 
            //prototype-tree depths
            var sns = parentNS[ subname ];
            if( sns ) {
                if( sns[ uniqueEarthWide ] ) return sns;
                //.lets community to take care about this app
                throw 'object property name collision: the parentNS["' + subname +
                '"] already exists in web-browser';
            }
            var sns = parentNS[ subname ] = {};
            sns[ uniqueEarthWide ] = true;
            return sns;
            */
        }

    }







    //***************************************************************************
    // //\\ dom manipulation library. ns.$$.
    //***************************************************************************
    function setDomWrap( ns )
    {
        // //\\ helpers
        ns.svgNS = "http://www.w3.org/2000/svg";

        ///https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
        ns.callOn = function( selector, parent, callback )
        {
            parent = parent || document;
            var els = parent.querySelectorAll( selector );
            for( var ii = 0; ii < els.length; ii++ ) {
                callback( els[ii], ii );
            }
        };

        ///converts event pos to domelem-css-pos
        ns.event_pos_2_css_pos = function ( event, domelem )
        {
            //	https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect
            //	Feature 	Chrome 	Firefox (Gecko) 	Internet Explorer 	Opera 	Safari
            //	Basic support 	1.0 	3.0 (1.9) 	4.0 	(Yes) 	4.0
            var box	= domelem.getBoundingClientRect();
            var loc	= [ Math.round( event.clientX - box.left ), Math.round( event.clientY - box.top ) ];
            return loc;
        };


        // //\\ DOM wrap
        //      for chains
        //      simple replacement of jQuery
        var $$ = ns.$$ =
        ( function() {

            ///syntax sugar to supply object in two forms: wrapped into $$ or naked
            function alt( obj )
            {
                return (typeof obj === 'function' ? obj() : obj);
            }
            
            var gen = function() {
                var ctxEl = null;
                var methods =
                {
                    //.wraps flat-dom-object-into-platform
                    $:      function( obj )                 { ctxEl = obj                                            },

                    children:    function( callback, obj )
                                 {
                                    ctxEl = obj || ctxEl;
                                    if( !( ctxEl && ctxEl.children ) ) return;
                                    [].forEach.call( ctxEl.children, function( child, ix ) {
                                        if( child && child.style.display !== 'none' ) {
                                            callback( child, ix );
                                        }
                                    });
                                 },

                    c:      function( type )                { ctxEl =                document.createElement( type ); },
                    //.gets single by id
                    g:      function( id )                  { ctxEl =                document.getElementById( id ); },
                    //.gets single
                    q:      function( selector, parent )    { ctxEl =                (parent||document.body).querySelector( selector ); },
                    //.gets array of all
                    qa:     function( selector, parent )    { ctxEl =                (parent||document.body).querySelectorAll( selector ); },


                    // //\\ information providers 
                    box:    function( obj )                 { obj = obj || null;
                                                              ctxEl = obj || ctxEl;
                                                              return ctxEl && ctxEl.getBoundingClientRect();
                                                            },
                    _html:    function( obj )               { obj = obj || null;
                                                              ctxEl = obj || ctxEl;
                                                              return ctxEl && ctxEl.innerHTML;
                                                            },
                    _css:   function( prop, obj )           { obj = obj || null;
                                                              ctxEl = obj || ctxEl;
                                                              return ctxEl && ctxEl.style[ prop ];
                                                            },
                    _a:     function( prop, obj )           { obj = obj || null;
                                                              ctxEl = obj || ctxEl;
                                                              return ctxEl && ctxEl.getAttribute( prop );
                                                            },
                    _cls:   function( obj )           { obj = obj || null;
                                                              ctxEl = obj || ctxEl;
                                                              return ctxEl && ctxEl.getAttribute( 'class' );
                                                            },
                hascls:   function( cls, obj )          { obj = obj || null;
                                                          ctxEl = obj || ctxEl;
                                                          var doesContainCls = false;
                                                          if( ctxEl ) {
                                                            var cls_ = ctxEl.getAttribute( 'class' );
                                                            if( cls_ ) {
                                                                var re = new RegExp( '(?:^|\\s)' + cls + '(?:\\s|$)', 'g' );
                                                                doesContainCls = cls_.match( re );
                                                            }
                                                          }
                                                          return doesContainCls;
                                                        },

                    // \\// information providers 


                    cNS:    function( type )                { ctxEl =                document.createElementNS( ns.svgNS, type ); },
                    a:      function( attr, text, obj )     { ctxEl = obj || ctxEl;  ctxEl.setAttribute( attr, text ); },

                    //https://developer.mozilla.org/en-US/docs/Web/SVG/Namespaces_Crash_Course#Scripting_in_namespaced_XML
                    //for consistency ...(null, ... whys is this "consistency" ... ? the must be a cowpath ...
                    //https://stackoverflow.com/questions/35057909/difference-between-setattribute-and-setattributensnull
                    //it seems does not matter at all how to write setAttribute: as setAttribute or setAttributeNS:
                    //      https://stackoverflow.com/questions/21361570/simpler-way-to-set-attributes-with-svg
                    aNS:    function( attr, text, obj )     { ctxEl = obj || ctxEl;  ctxEl.setAttributeNS( null, attr, text ); },

                    to:     function( to, obj )             { ctxEl = obj || ctxEl;  alt( to ).appendChild( ctxEl ); },

                    //API: ch is an array of racks or single rack:
                    //     rack is a wrapped element or raw DOM element
                    ch:     function( ch, obj )             { ctxEl = obj || ctxEl;
                                                              //.encourages syntax for alternatively empty list of children
                                                              //.$$.ch( obj ? ... : ... )
                                                              if( !ch ) return;

                                                              if( Array.isArray( ch ) ) {
                                                                ///if array, then adds children in sequence
                                                                ch.forEach( function( child ) {
                                                                    child && ctxEl.appendChild( alt( child ) );
                                                                });
                                                              } else {
                                                                ctxEl.appendChild( alt( ch ) );
                                                              }
                                                            },
                    e:      function( type, callback, obj ) { ctxEl = obj || ctxEl;  ctxEl.addEventListener( type, callback ); },
                    css:    function( name, value, obj )    { ctxEl = obj || ctxEl;  ctxEl.style[ name ] = value; },
                    csst:   function( value, obj )          { ctxEl = obj || ctxEl;  ctxEl.style.cssText = value; },
                    html:   function( html, obj )           { ctxEl = obj || ctxEl;  ctxEl.innerHTML = html; },


                    //adds class.
                    addClass:   function( text, obj )
                                {   
                                    ctxEl = obj || ctxEl;  //bug fix: if text === '', then 
                                                           //element is still created to save
                                                           //the "chain" of $$ calls
                                    if( !text ) return; //sugar, saves extra "if"
                                    var clss = text.split(/\s+/);
                                    if( clss.length>1 ) {
                                        ////many classes are supplied ...
                                        ////processes each of them
                                        clss.forEach( function( cls ) {
                                            $$.addClass( cls, ctxEl );
                                        });
                                        return;
                                    }

                                    var at = ctxEl.getAttribute( 'class' ); //className is not for SVG
                                    if( !at ) {
                                        //https://stackoverflow.com/questions/41195397/how-to-assign-a-class-to-an-svg-element
                                        //ctxEl.className = text;
                                        ctxEl.setAttribute( 'class', text ); //For SVG
                                        return;
                                    }
                                    var ats = ' ' + at + ' ';
                                    var testee = ' ' + text + ' ';
                                    if( ats.indexOf( testee ) === -1 ) {
                                        //c onsole.log( 'adding=' + text + ' to ' + at);
                                        if( at.length > 0 && text ) {
                                            at += ' ';
                                        }
                                        at += text;
                                        //c onsole.log( 'result of adding=' + at);
                                        //ctxEl.className = at;
                                        ctxEl.setAttribute( 'class', at ); //For SVG
                                    }
                                },

                    //removes class.
                    removeClass: function( text, obj )
                                { 
                                    if( !text ) return; //sugar, saves extra "if"

                                    //c onsole.log( 'removing=' + text );
                                    ctxEl = obj || ctxEl;  
                                    var clss = text.split(/\s+/);
                                    if( clss.length>1 ) {
                                        ////many classes are supplied ...
                                        ////processes each of them
                                        clss.forEach( function( cls ) {
                                            $$.removeClass( cls, ctxEl );
                                        });
                                        return;
                                    }

                                    var at = ctxEl.getAttribute( 'class' );
                                    if( !at ) {
                                        ////nothing to remove ... leaving the task
                                        return;
                                    }
                                    var ats = ' ' + at + ' ';
                                    var testee = ' ' + text + ' ';
                                    if( ats.indexOf( testee ) > -1 ) {
                                        var re = new RegExp( '(?:^|\\s)' + text + '(?:\\s|$)', 'g' );
                                        //var match = at.match( re );
                                        //c onsole.log( 'match=', match );
                                        at = at.replace( re, ' ' );
                                        at = at.replace( /\s+/g, ' ' );
                                        at = at.replace( /(^\s*)|(\s*$)/g, '' );
                                        //at = at.replace( /(\s*)/g, '' );
                                        //c onsole.log( 'removed=' + at );
                                        //ctxEl.className = at;
                                        ctxEl.setAttribute( 'class', at ); //For SVG
                                    }
                                }
                };

                //:here JavaScript writer can look which additional shortcuts do exist
                //:here we can add more dependent shortcuts
                methods.cls = methods.addClass;
                methods.id = function( text, obj ) { methods.a( 'id', text, obj ); }; //.adds id
                methods.src = function( text, obj ) { methods.a( 'src', text, obj ); }; //.adds src
                methods.href = function( text, obj ) { methods.a( 'href', text, obj ); }; //.adds src
                methods.div = function( obj ) { methods.c( 'div', obj ); }; //.creates div
                methods.img = function( obj ) { methods.c( 'img', obj ); }; //.creates img
                methods.span = function( obj ) { methods.c( 'span', obj ); }; //.creates span
                methods.style = function( obj ) { methods.c( 'style', obj ); }; //.creates style
                methods.$ul = function( obj ) { methods.c( 'ul', obj ); }; //.creates ul
                methods.$li = function( obj ) { methods.c( 'li', obj ); }; //.creates li
                methods.$a = function( obj ) { methods.c( 'a', obj ); }; //.creates a

                methods.di = function( id, obj ) { methods.c( 'div', obj ); methods.a( 'id', id ); }; //.creates div, sets id
                methods.dc = function( cls, obj ) { methods.c( 'div', obj ); methods.addClass( cls ); }; //.creates div, sets class
                methods.dic = function( id, cls, obj ) {
                                methods.di( id, obj );
                                methods.addClass( cls );
                }; //.creates div, sets id and class
                methods.dict = function( id, cls, to, obj ) {
                                methods.di( id, obj );
                                methods.addClass( cls );
                                methods.to( to );
                }; //.creates div, sets id and class, and appends to "to"
                methods.dct = function( cls, to, obj ) {
                                methods.dc( cls, obj )
                                methods.to( to );
                }; //.creates div, sets class, and appends to "to"

                ///toggles class if ctxEl is detected
                methods.togcls = function( cls, obj ) {
                                    obj = obj || null;
                                    ctxEl = obj || ctxEl;
                                    if( !ctxEl ) return;
                                    if( methods.hascls( cls, obj ) ) {
                                        methods.removeClass( cls );
                                    } else {
                                        methods.addClass( cls );
                                    }
                };
                ///toggles css-class conditionally
                ///input:    condition - optional truthy, if arguments.length === 1
                ///                      then toggling will be made,
                ///                      otherwise, "condition" controls cls setting
                methods.tgcls = function( cls, condition, obj ) {
                                    obj = obj || null;
                                    ctxEl = obj || ctxEl;
                                    if( !ctxEl ) return;
                                    if( arguments.length === 1 ) {
                                        condition = !methods.hascls( cls, obj );
                                    }
                                    if( condition ) {
                                        methods.addClass( cls );
                                    } else {
                                        methods.removeClass( cls );
                                    }
                };
                var wrap = function() { return ctxEl; };
                Object.keys( methods ).forEach( function( key ) {
                    var method = methods[ key ];
                    wrap[ key ] = function() {
                        var res = method.apply( {}, arguments );
                        ///if method is of "process type", then the framework wrap ($$) is returned
                        ///if method is of "give information type", then this information is returned
                        return typeof res === 'undefined' ? wrap : res;
                    };
                });
                return wrap;
            };

            var sample = gen();
            var masterGen = {};
            Object.keys( sample ).forEach( function( key ) { //todm ... works for functions ? not only for objects?

                masterGen[ key ] = function() { return gen()[ key ].apply( {}, arguments ); };
            });
            return masterGen;

        }) ();
        // \\// DOM wrap
        ///deletes wrapping function elParent[ elName$ ]
        ///(which expected to be own property of elParent)
        ///from parent elParent and wrapped
        ///dom element elParent[ elName$ ]() from html
        $$.$del = function(
            elParent,
            elName$
        ) {
            var el$ = ns.haz( elParent, elName$ );
            if( !el$ ) return;
            //this moment is specific:
            //will this also delete an actual element from DOM?
            //this element is in the closure of this function
            //will closure deleted if all it's child function deleted?
            //and is there an explicit way to delete elements from closure?
            if( elParent ) {
                delete elParent[ elName$ ];
            }
            //removes from HTML
            var el = el$();
            el && el.remove();
            //and if no child functions is this closure, hopefully removes
            //closure and object
        }
    }
    //***************************************************************************
// \\// dom manipulation library. ns.$$.
    //***************************************************************************

}) ();





//===========================================
// //\\ creates debugger once per application
//        non-dispensable for mobiles
//===========================================
( function () {
	var ns = window.b$l;




    ///invocation:
    ///             way 1: as of September 1, 2020,
    ///                    URL-query: ...?conf=...x=y,deb=yes
    ///note:        make sure document.bod exists if used in manual refactoring,
    ns.createDebugger = function ()
    {
        if( ns.h( ns, 'd' ) ) return; //creates debugger only once

        ///------------------------------------------------------------
        ///Checks if bsl-debug textarea exists and 
        /// outputs to debug and scrolls to the end.
        /// If debug-block is commented-out, this function does nothing
        /// and in the code it is still safe to use the lines:
        /// Usage: window.b$l.d(text)
        ///------------------------------------------------------------
        ns.d = function( text )
        {
            //ccc( Date.now().toString().substr( -6 ) + ' ' + text );
            if( !debWind ) return; //no window, no debug accumulation
            debWind.value +='\n' + text;
            debWind.scrollTop = debWind.scrollHeight;
        };
        var debWind=null;
        ///------------------------------------------------------------
        // //\\ uncomment this debug-block to enable textarea for debug
        ///------------------------------------------------------------
        if( ns.haz( ns.conf, 'deb' ) ) {
            var debWind = document.getElementById( 'bsl-debug' );
            if( !debWind ) {
                ////this block is good when one needs to output large data object
                ////into text box in a browser's textarea at the end of web-page
                debWind = document.createElement( 'textarea' );
                debWind.setAttribute( 'id', 'bsl-debug' );
                debWind.setAttribute( 'disabled', 'yes' );
                document.body.appendChild( debWind );
                debWind.style.cssText = 
                        //'height:18%; width:30%; z-index:1111111;' +
                        //'height:250px; width:350px; z-index:1111111;' +
                        'display:none;' +
                        'height:350px; width:600px; z-index:1111111;' +
                        'position:absolute; top:40%; left:100px; font-size:12px;';
                ns.dd = debWind; //usage: ns.dd.value +='\n' + text;
            }
        }
        ///------------------------------------------------------------
        // \\// uncomment this debug-block to enable textarea for debug
        ///------------------------------------------------------------
    };

}) ();
//===========================================
// \\// creates debugger once per application
//===========================================

( function() {
	var ns = window.b$l;




    //=========================================================
    // //\\ ecapes html specials
    //=========================================================
    var amp_re = /&/g;
    var lt_re = /</g;
    var gt_re = />/g;
    var line_feed_re = /\r\n|\r|\n/g;
    ns.htmlesc = function( str )
    {
        return str.replace( amp_re, '&amp;' ).replace( lt_re, '&lt;' ).replace( gt_re, '&gt;' );
    }

    ns.pre2fluid = function( str )
    {
        return str.replace( line_feed_re, '<br>' );
    }
    //=========================================================
    // \\// ecapes html specials
    //=========================================================



    //=========================================================
    // //\\ configures from URL
    //=========================================================
    ns.url2conf = function( conf )
    {  
        //      if supplied, it overrides internal application conf 
        //      format: ...index.html?conf=a.b.c.d=4,a.b.e=5
        var urlPars     = window.location.search || '';
        /*
        var urlPathname = window.location.pathname;
        var urlProtocol = window.location.protocol;
        var urlHostname = window.location.hostname;
        var urlPort     = window.location.port + '';
        */
        var urlConfRe   = /(?:&|\\?)conf=([^&]+)/i;
        var urlConf     = urlPars.match( urlConfRe );
        if( urlConf ) {
            urlConf = urlConf[1].split(',');
            urlConf.forEach( function( opt ) {
                var cc = opt.split('=');
                if( cc[1] ) {
                    ////parameter x exists after sign "=" in expression p=x
                    //let user to say "yes" or "no"
                    cc[1] = cc[1] === "yes" ? true : ( cc[1] === "no" ? false : cc[1] );
                } else {
                    ////parameter x does not exists after sign "=" in expression p=x
                    ////this parameter x is ignored
                    return;
                }
                ns.dots2object( cc[0], cc[1], conf )
                //conf.urlConf[cc[0]]=cc[1];
            });
        }
        return conf;
    }
    //=========================================================
    // \\// configures from URL
    //=========================================================

    // //\\ helpers
    ns.prop2prop = function( target, source )
    {
        if( source ) {
            Object.keys( source ).forEach( function( key ) {
                target[ key ] = source[ key ];
            });
        }
        return target;
    };



    ///updates properties of object obj from single key-value
    ///pair "name, value"
    ns.dots2object = function( name, value, obj )
    {
		var tokens	= name.split( '.' );
		var len		= tokens.length;
		var len1	= len - 1;
		if( len1 < 0 ) {
            obj[ name ] = value;
            return obj;
        }
		var prop	= tokens[ 0 ];
		for( var ii = 0; ii < len1; ii++ )
		{
			//:: appends objects if missed
			if( !obj[ prop ] || typeof obj[ prop ] !== 'object' ) obj[ prop ] = {};
			obj = obj[ prop ];
			prop = tokens[ ii + 1 ];
		}
		obj[ prop ] = value;
        return obj;
    }


    ///sugar for Object.keys( obj ).forEach ...
    ns.eachprop = function( obj, callBack )
    {
        var keys = Object.keys( obj );
        keys.forEach( function( key, kix ) {
            callBack( obj[ key ], key, kix, keys.length );
        });
        return keys;
    };

    ///generalizes Array.map() to Object.map()
    ns.eachmap = function( obj, callBack )
    {
        var objReturn = {};
        Object.keys( obj ).forEach( function( key ) {
            objReturn[ key ] = callBack( obj[ key ], key );
        });
        return objReturn;
    };



	///	Purpose:		Cloning object trees by value till refdepth.

    // edge-calse does not work: see below as
    // edge-calse does not work: the only problem is when wall_preserved.length is defined.
    // see other edge cases with token "throw" below

	//					"All existing properties at and below refdepth become common
	//					for operands and result".
	//	Detais:			Makes wall a correct paste of paper when
	//						both wall and paper do not have arrays in their trees till (refdepth+1);
	//					otherwise, ( "arrayflict" case)
	//						non-array obj.W can be overriden with array [] and with A which may
	//						break outside reference w = obj.W which still points to the former W.
	//					Infinite recursion is not protected except by using recdepth.
	//	Comparision:	of arrayflicts with jQuery.extend
	//						wall = {...} paper [...]
	//							in jQuery - this is an obligation of programmer to make wall [...]
	//							in tp	-	wall is brutally replaced with []. Not extended,  //TODM possibly fix
	//										but return result is correct possibly except numerics in wall_preserved.
	//						in deeper levels of arrayflict
	//							in jQuery	- new [] is generated
	//							in tp		- new [] is generated
	//							in jQuery	- numeric and non-numeric properties of wall.....non-arr are "killed"
	//							in tp		- numeric and non-numeric properties of wall.....non-arr are preserved
	//					in jQuery	- all prototype levels are copied
	//					in tp		- only ownProperties are copied
	//					in jQuery	- only two options "deep copy" or "not deep"
	//					in tp		- reference deepness can be controlled
	//							
	//	Input:			All args are optional.
	//					skip_undefined	- omitting it allows copying "wall <- paper.undefined".
	//					recdepth		- stops recursion at level > recdepth

	//	Results in:		changed wall properties.
	//	Returns:		combined clone of paper to wall.
	var paste_non_arrays = ns.paste = ns.paste_non_arrays = function ( wall, paper, level, skip_undefined, refdepth, recdepth )
	{

		level = level || 0;
		var t = typeof paper;

		//.Arguments sugar: pasting nothing does not change wall
		if( !level && (t === 'undefined' || paper === null ) ) return wall;

        //.Returns back non-object-type value
		if( t === 'undefined' || t === 'string' || t === 'boolean' || t === 'number' || t === 'function' || paper === null)
		{
			return paper;
		}

		///Reduces the "deep-copy" to reference copy for leveles beneath reference-depth
		if( refdepth || refdepth === 0 )
		{
			if( level > refdepth ) return paper;
		}

		///Recursion limit is exceeded. Truncates recursion by recdepth value.
		if( ( recdepth || recdepth ===0 ) && level > recdepth ) 
		{
			return '';
		}


		///Paper is non-void array or object. If wall do not "match" the paper, making wall an object.
		if( typeof wall !== 'object' || wall === null )
		{
			wall = {};
		}

        var isArrayPaper = Array.isArray( paper );
        if( isArrayPaper && !Array.isArray( wall ) ) {
            ////Paper is array and wall is not. Morthing wall to array but preserve its properties.
			var wall_preserved = wall;
			wall = [];
            //.Returns preserved wall's properties to wall-as-array.
            if( typeof wall_preserved.length !== 'undefined' ) {
                ////edge-calse does not work: the only problem is when wall_preserved.length is defined.
                ////todm: the only problem is when wall_preserved.length is defined.
                throw new Error("copying array to object with" +
                                " existing object.length property");
            }
			paste_non_arrays( wall, wall_preserved, level, skip_undefined, refdepth, null );
        };

		///Now both wall and paper are objects of the same type. Pasting their properties.
		var hasOwn	= Object.prototype.hasOwnProperty;
		for(var p in paper )
		{
			if( hasOwn.call( paper, p ) ) //when works on arrays, then not fails on 'length'? bs "length" is notOwnProperty
			{
				if( p !== 'length' )
				{
					//paper[ p ];
						var theValue = paste_non_arrays( wall[ p ], paper[ p ], level+1, skip_undefined, refdepth, recdepth );

						if( ! ( ( isArrayPaper || skip_undefined ) && typeof theValue === 'undefined' )  )
						{
							wall[ p ]		= theValue;
						}
				} else {
					throw new Error(
                        'The subroutine, paste_non_arrays,' +
                        'does not allow to copy property "length".' );
				}
			}
		}
		return wall;
	};// ...paste_non_arrays=function...
	
    ///before pasting to wall,
    ///removes wall's own properties and array elements if any
    ns.cleanpaste = function ( wall, paper )
    {
        Object.keys( wall ).forEach( akey => {
            delete wall[ akey ];
        });
        ns.paste( wall, paper );
    };

    ///clones array-tree or tree
    ns.clonetree = function ( paper )
    {
        return ns.paste( Array.isArray( paper ) ? [] : {}, paper );
    };
}) ();




///global css manager;
///gradually adds and updates global css
///as page loads at landing
///keeping css in one html-style-element;
( function() {
    var DEFAULT_KEY         = 'default';
 	var ns                  = window.b$l;
    var globalCss           = ns.sn('globalCss');

    //repo is a set of style-apartments handled separately,
    //style-apartment is called "rack",
    var repo                = {};

    //:methods
    globalCss.update        = update;       
    globalCss.upqueue       = upqueue;
    globalCss.addText       = addText;
    globalCss.getText       = getText;
    globalCss.clearStyleTag = clearStyleTag;
    return;






    ///generates rack or returns rack if exists,
    ///rack is an apartment in repo,
    ///input:
    ///         htmlkey - name or rack, css-class-friendly
    function key2rack( htmlkey )
    {
        htmlkey = htmlkey || DEFAULT_KEY;
        var ret = ns.haz( repo, htmlkey );
        if( !ret ) {
            ret = repo[ htmlkey ] =
            {
                cssText : '',
                cssDom$ : ns.$$
                    .style()
                    .cls( htmlkey )
                    .to( document.head )
                    ,    
                queueHandle : null, //timeout handle
            };
        }
        return ret;
    }



    ///adds css-text updates to queue after-main-thread;
    ///used to avoid performance downgrade for frequent series of css updates;
    ///input:
    ///         htmlkey - name or rack, css-class-friendly, optional
    function upqueue( moreText, htmlkey )
    {
        var rack = key2rack( htmlkey );
        if( moreText ) { rack.cssText += moreText; }
        if( rack.queueHandle !== null ) {
            clearTimeout( rack.queueHandle );
        }
        rack.queueHandle = setTimeout(
            function() {
                rack.cssDom$.html( rack.cssText );
                rack.queueHandle = null;
            },
            1
        );
    };

    ///adds text with changing html-tag
    function update( moreText, htmlkey )
    {
        var rack = key2rack( htmlkey );
        if( moreText ) { rack.cssText += moreText; }
        rack.cssDom$.html( rack.cssText );
    };
    ///adds text without changing html-tag
    function addText( text, htmlkey )
    {
        var rack = key2rack( htmlkey );
        rack.cssText += text;
    };
    ///helps to cooperate with other Css builder
    ///by avoiding creation of extra own style-html
    function getText( htmlkey )
    {
        var rack = key2rack( htmlkey );
        return rack.cssText;
    };

    function clearStyleTag( htmlkey )
    {
        var rack = key2rack( htmlkey );
        rack.cssDom$.html( '\n.dummy-style { .dummy-class : dummy-value; }\n ' );
    };


})();



(function () {
    var ns = window.b$l;
    ns.loadScript = function( src, onload, type )
    {
        //https://developer.mozilla.org/en-US/docs/Web/HTTP/
        //      Basics_of_HTTP/MIME_types#JavaScript_types
        type = type || 'text/javascript';
        var scrip = document.createElement('script');
        scrip.onload = onload;
        document.head.appendChild( scrip );
        //https://medium.com/@vschroeder/javascript-how-to-execute-code-from-an-
        //asynchronously-loaded-script-although-when-it-is-not-bebcbd6da5ea
        scrip.src = src;
    }
    ns.doScrollToHash = doScrollToHash;
    return;

    ///enables this scroll for html-created in late-loaded-scripts
    function doScrollToHash()
    {
        var hash = window.location.hash;
        if( !hash || hash.length < 2 ) return;
        var hash = hash.substring( 1 );
        var search = 'a[name=' + hash + ']';
        //https://stackoverflow.com/questions/265774/programmatically-scroll-to-an-anchor-tag
        var found = document.querySelector( search );
        //ccc( hash, search, 'found=' + found );
        if( !found ) return;
        found.scrollIntoView( true );
    }
}) ();



(function () {
    var ns = window.b$l;
    ns.conf = ns.url2conf( {} );
    //window.addEventListener( 'load', () => { ns.createDebugger(); } );
    document.addEventListener( "DOMContentLoaded", () => { ns.createDebugger(); } );
}) ();




(function () {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var methods     = sn('methods');

    ///polifill for forEach for nodes
    //https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
    //https://stackoverflow.com/questions/43743560/foreach-vs-array-prototype-foreach-call
    /*
    //needs more research ... if this does not exist, there must be a reason for this:
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
    */


    ///deep iteration of DOM-element-tree
    methods.elTree = function( el, callback )
    {
        callback( el );
        var children = el.children;
        if( !children || !children.length ) return;
        //https://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements
        [].forEach.call( children, el => methods.elTree( el, callback ) );
    }

}) ();



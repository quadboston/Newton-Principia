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
        var ns = window[ APP_NAME ];
        if( ns ) {
            if( ns[ uniqueEarthWide ] ) { return ns; }
            //.lets community to take care about this app
            throw 'global name collision: the window["' + APP_NAME +
                  '"] already exists in web-browser';
        } else {
            var ns = window[ APP_NAME ] = {};
            ns[ uniqueEarthWide ] = true;
            ns.uniqueEarthWide = uniqueEarthWide;
            ns.sn = sn;
            ns.APP_NAME = APP_NAME;
            ns.CSS_PREFIX = APP_NAME.replace( /\$/g, 's' );

            //:more good goodies
            ns.haz = haz;
            ns.h = has;
            ns.has = function( prop ) { return has( ns, prop ); };
            return ns;
        }

        ///Returns own property if property does exist. Otherwise, returns false.
        function haz( obj, property ) {
            return shortcutInClosure_for_speed.call( obj, property ) ?
                   obj[ property ] : false;
        };

        ///Returns ownself only if property does exist. Otherwise, returns false.
        function has( obj, property ) {
            return shortcutInClosure_for_speed.call( obj, property ) ? obj : false;
        };

        ///In plain words: makes-sure object-property exists and returns it.
        ///Input: optional emptyTemplate provides ability set {} or []
        function sn( subname, parentNS, emptyTemplate )
        {
            var parentNS = parentNS || ns;
            if( has( parentNS, subname ) && typeof parentNS[ subname ] === 'object' ) {
                return parentNS[ subname ];
            }
            var sns = parentNS[ subname ] = emptyTemplate || {};
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
    // //\\ ns.$$ ... dom wrapp
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
                    // \\// information providers 


                    cNS:    function( type )                { ctxEl =                document.createElementNS( ns.svgNS, type ); },
                    a:      function( attr, text, obj )     { ctxEl = obj || ctxEl;  ctxEl.setAttribute( attr, text ); },
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
                    html:   function( html, obj )           { ctxEl = obj || ctxEl;  ctxEl.innerHTML = html; },


                    //adds class.
                    addClass:   function( text, obj )
                                {   
                                    ctxEl = obj || ctxEl;  //bug fix: if text === '', then 
                                                           //element is still created to save
                                                           //the "chain" of $$ calls
                                    if( !text ) return; //sugar, saves extra "if"
                                    var clss = classes=text.split(/\s+/);
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
                                    var clss = classes=text.split(/\s+/);
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
                methods.$a = function( obj ) { methods.c( 'a', obj ); }; //.creates li

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
                //todm: big fix: gen() to sample ... why not works?
                //masterGen[ key ] = function() { return sample[ key ].apply( {}, arguments ); };

                masterGen[ key ] = function() { return gen()[ key ].apply( {}, arguments ); };
            });
            return masterGen;

        }) ();
        // \\// DOM wrap
    }
    //***************************************************************************
    // \\// ns.$$ ... dom wrapp
    //***************************************************************************



}) ();



// //\\// debugger
//        non-dispensable for mobiles
//        version july 4, 2018
( function () {
	var ns = window.b$l;




    // creates debugger once per application
    ns.createDebugger = function ()
    {
        if( ns.d ) return;
        ///Checks if bsl-debug textarea exists and 
        /// outputs to debug and scrolls to the end.
        /// If debWind-fragment is commented-out, this function does nothing
        /// and in the code it is still safe to use the lines:
        /// Usage: window.b$l.d(text)
        ns.d = function( text )
        {
            //ccc( Date.now().toString().substr( -6 ) + ' ' + text );
            if( !debWind ) return;
            debWind.value +='\n' + text;
            debWind.scrollTop = debWind.scrollHeight;
        };
        var debWind=null;
        ///uncomment debug-block to enable textarea for debug
        /*
        // //\\ debug-block
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
                    'height:250px; width:600px; z-index:1111111;' +
                    'position:absolute; top:60%; left:200px; font-size:15px;';
            ns.dd = debWind; //usage: ns.dd.value +='\n' + text;
        }
        // \\// debug-block
        */
    };

}) ();

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
                    //let user to say "yes" or "no"
                    cc[1] = cc[1] === "yes" ? true : ( cc[1] === "no" ? false : cc[1] );
                } else {
                    ////missed parameter p in x=p is ignored
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
			var prop = tokens[ ii + 1 ];
		}
		obj[ prop ] = value;
        return obj;
    }


    ///sugar for Object.keys( obj ).forEach ...
    ns.eachprop = function( obj, callBack )
    {
        var keys = Object.keys( obj );
        keys.forEach( function( key, kix ) {
            callBack( obj[ key ], key, kix );
        });
        return keys;
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
                throw "copying array to object with existing object.length property";
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
					paper[ p ];
						var theValue = paste_non_arrays( wall[ p ], paper[ p ], level+1, skip_undefined, refdepth, recdepth );

						if( ! ( ( isArrayPaper || skip_undefined ) && typeof theValue === 'undefined' )  )
						{
							wall[ p ]		= theValue;
						}
				} else {
					throw 'The subroutine, paste_non_arrays, does not allow to copy property "length".';
				}
			}
		}
		return wall;
	};// ...paste_non_arrays=function...
	
}) ();




///global css manager;
///gradually adds and updates global css
///as page loads at landing
///keeping css in one html-style-element;
( function() {
 	var ns                  = window.b$l;
    var globalCss           = ns.sn('globalCss');
    var cssText             = '';
    var cssDom$             = null;
    globalCss.update        = update;       
    globalCss.addText       = addText;
    globalCss.getText       = getText;
    globalCss.add8update    = addAndUpdate;
    return; //****************************





    function update( moreText )
    {
        if( !cssDom$ ) {
            cssDom$ = ns.$$.style().to( document.head );
        }
        if( moreText ) { cssText += moreText; }
        cssDom$.html( cssText );
    };
    function addText( text )
    {
        cssText += text;
    };
    ///helps to cooperate with other Css builder
    ///by avoiding creation of extra own style-html
    function getText()
    {
        return cssText;
    };
    function addAndUpdate( text )
    {
        addText( text );
        update();
        ///good place to output assembled css for later static use
    }
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
}) ();



(function () {
    var ns = window.b$l;
    ns.createDebugger();
    ns.conf = ns.url2conf( {} );
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



//code taken from: /var/www/html/sand/web-dev/tools/frontend/btb-master/btb/jq/create-media-runner.js
//css vs js: https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/CSS_JavaScript_animation_performance



( function() {
    var ns      = window.b$l;
    var aframes = ns.sn('aframes');




    //**************************************
    // //\\ prepares native animation frames
    //**************************************
    var ANIMATION_THROTTLER = 16.69;
    //var ANIMATION_THROTTLER = 200;

    // //\\ IE10+
    //      good for debug
    //var documentStart = performance.now(); //not for IE9?
	var timeoutAnimationFrame = function( callback )
	{
        var ANIMATION_INTERVAL = 200;
		//window.setTimeout( function() { callback( performance.now() - documentStart ); }, ANIMATION_INTERVAL );
		window.setTimeout( callback, ANIMATION_INTERVAL );
	};
	//window.requestAnimationFrame = timeoutAnimationFrame;
    // \\// IE10+

	window.requestAnimationFrame =
				window.requestAnimationFrame		||
		        window.webkitRequestAnimationFrame	||
		        window.mozRequestAnimationFrame		||
		        window.oRequestAnimationFrame		||
		        window.msRequestAnimationFrame		||
				timeoutAnimationFrame;
    //**************************************
    // \\// prepares native animation frames
    //**************************************




    //**************************************
    // //\\ animation frames framework
    //**************************************
    //MicroAPI
        //start
        //add
        //add8complete
        //remove
    var unixTime;
    var elapsed;
    var runners = {};
    var hash = 1;
    var aframes_start = null;

	aframes.start = function ()
	{
        if( !aframes_start ) { aframes_start = [ Date.now() ]; }
        var timeOrigin  = aframes_start[0];
        unixTime        = Date.now();
        elapsed         = unixTime - timeOrigin;
        if( elapsed > ANIMATION_THROTTLER ) {
            Object.keys(runners).forEach( doRun );
        }
		window.requestAnimationFrame( aframes.start );
	};


    function doRun( hashStr )
    {
        var rr          = runners[ hashStr ];
        var fun         = rr.fun;
        var funComplete = rr.funComplete;
        var ownStart    = rr.ownStart;
        var duration    = rr.duration;
        var ownElapsed  = unixTime - ownStart;
        //c cc( 'ownElapsed='+ownElapsed + ' elapsed='+elapsed + ' duration='+duration + ' unixTime='+unixTime );

        if( typeof duration === 'undefined' || ownElapsed <= duration ) {
            //==============================================
            // MicroAPI: callback signature
            fun( ownElapsed, elapsed, unixTime );
            //==============================================
        } else {
            //.fires up funComplete if any at the end of animation
            funComplete && funComplete( ownElapsed, elapsed, unixTime );
            aframes.remove( hashStr );
        }
    };


    /// adds callbacks to "dispatcher"
    /// see callback signature above
    aframes.add = function( fun, duration, funComplete ) {
        var hashStr = '' + hash++;
        runners[ hashStr ] = { ownStart:Date.now(), fun:fun, duration:duration, funComplete:funComplete };
        return hashStr;
    };

    aframes.add8complete = function( fun, duration, funComplete ) {
        if( !aframes_start ) aframes.start();
        return aframes.add( fun, duration, funComplete );
    };

    aframes.remove = function( hashStr ) {
        //other way?: https://stackoverflow.com/questions/12216540/how-to-test-for-equality-of-functions-in-javascript
        delete runners[ hashStr ];
    };
    ///if hashStr is not a string, then this function does nothing
    aframes.complete8remove = function( hashStr ) {
        if( typeof hashStr !== 'string' ) return; //automates skipping already cleared runners
        var rr = runners[ hashStr ];
        if( !rr ) return; //allows competing removes
        if( !aframes_start ) {
            ////nothing started yet
            //.todm ... this scenario is not good enough ... is unclear for the newcomer
            aframes.remove( hashStr );
            return;
        }
        rr.duration = -1000;
        doRun( hashStr );
    };
    //**************************************
    // \\// animation frames framework
    //**************************************


}) ();

//*************************************************************************************
// //\\//   "device-level" drag and drop processor
//          ns.d8d - a method of the layer between mouse/touch events and application
//                  - handles DOM events,
//                  - submits results to app-processor, d8d_app
//                    which can cancel d8d if returns "forbidden=true" ( see below ).
//          Copyright (c) 2018 Konstantin Kirillov. License MIT.
//
//          file history: /var/www/html/bwork/CANV-SVG-VIDEO-CSS/canvas/
//                        diagram-editor-vladislav/prj/steps/fios-jan19-35-more/3rd/btb/d8d-device.js
//*************************************************************************************
( function () {
    var ns          = window.b$l        = window.b$l        || {};
    var ccc         = window.console.log;
    //.for applications with complex d8d-handlers creation/deletion
    //.bookkeeps created or deleted ns.d8d objects
    //var eventCounter=0; 







    ///****************************************************************
	/// d8d object constructor
    ///****************************************************************
	ns.d8d = function ( arg )
	{
        //------------------------------------------
        // //\\ input arguments
        //------------------------------------------
        //:application-level-handler
        // see function-call-signature in code below
		var d8d_app  = arg.d8d_app;

        //:	where to draw:
        //  final destination of mouse-point-coordinates detection;
        //		can be a div or media;
        //		media means canvas, img, or possibly video;
        //		in general for media, finally detected mouse-point is
        //		in internal media coordinates;
		var surface	= arg.surface;	

 		//:	to whom to attach events
		var att = arg.attachee || surface;

        //:
        //.this is an excessive functionality and reduced to eventPos_2_surfacePos
		//var eventPoint_2_localPoint = arg.eventPoint_2_localPoint || eventPos_2_surfacePos;

        var skipD8D = arg.skipD8D || default_skip;
        //------------------------------------------
        // \\// input arguments
        //------------------------------------------





        //------------------------------------------
        // //\\ locals
        //------------------------------------------
        //.is a d8d-in-progress-flag ...
        //.do program it carefully
		var startPoint	= null; 
		var lastPoint   = null;
        //var eventId     = eventCounter++;
        //------------------------------------------
        // \\// locals
        //------------------------------------------

        addEvents();

        //00000000000000000000000000000000000000000000000000000000000000000000000000
        return { removeEvents : removeEvents }; //exports d8d-object of this module
        //00000000000000000000000000000000000000000000000000000000000000000000000000








        //******************************************************************
		// //\\ d8d-scenario root events
        //******************************************************************
        function addEvents()
        {
		    //  possible Android fix:
            //  http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices
            //. todo: touch must provide event which then tested for
            //  Ctrl-pressed flag: use different handler
            att.addEventListener( 'touchstart', doStartDown );  
            att.addEventListener( 'mousedown', doStartDown );
        };

        function removeEvents()
        {
            att.removeEventListener( 'touchstart', doStartDown );
            att.removeEventListener( 'mousedown', doStartDown );
        };
        //******************************************************************
		// \\// d8d-scenario root events
        //******************************************************************



        //*****************************************
		// //\\ DOWN SUBROUTINES
        //*****************************************
		// //\\ root d8d handler
        //========================================
        function doStartDown( ev )
        {
            if( skipD8D( ev ) ) return;

            ///touch-down
            if( ev.touches && ev.touches.length === 1 ) {
                var event = ev.touches[0];
                //seems wrong: event.preventDefault(); //trying for mobiles
                var forbidden = do_complete_down( event, ev );
                if( !forbidden ) {
                    stopsAftershocks ( ev );
                    att.addEventListener( 'touchmove',   touchMove);
                    att.addEventListener( 'touchend',    touchEnd);
                    att.addEventListener( 'touchcancel', touchEnd);
                } else {
                    //ns.d('\neid=' + eventId + 'm ove is forbidden');
                }
            ///mouse-down
            } else {
                var forbidden = do_complete_down( ev );
                if( !forbidden ) { 
                    stopsAftershocks ( ev );
                    att.addEventListener( 'mousemove', mouseMove);
                    att.addEventListener( 'mouseup',   mouseEnd);
                    //.todm suspicion: this approach seems not reliable ...
                    // fires right after the mouseDown ...
                    att.addEventListener( 'mouseleave',  mouseEnd);
                } else {
                    //ns.d('\nev id=' + eventId + 'm ove is forbidden');
                }
            }
        }
        //========================================
		// \\// root d8d handler
        //========================================


        //=========================================
		// //\\ second level of down-handling
        //=========================================
        function do_complete_down( childEvent, rootEvent )
        {
            //ns.d( 'do_complete_down: started' );
            if( startPoint !== null ) {
                //ns.d('broken d8d scenario: the previous startPoint is still exist');
                return true;
            }
            var point_on_dragSurf = eventPos_2_surfacePos( childEvent );
            if( !point_on_dragSurf ) {
                //ns.d('do_complete_down: media point failed');
                return true;
            }
            //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			var forbidden = d8d_app( [0,0], 'down', point_on_dragSurf, childEvent );
            //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			if( forbidden ) {
                //ns.d( 'move start has been cancelled by top-level ' +
                //       'drag-and-drop-processor: eventId=' + eventId );
                return true;
            }
			startPoint = point_on_dragSurf;
            lastPoint = point_on_dragSurf;
        }
        //=========================================
		// \\// second level of down-handling
        //*****************************************
		// \\// DOWN SUBROUTINES
        //*****************************************





        //*****************************************
		// //\\ MOVE SUBROUTINES
        //*****************************************
        function touchMove( ev )
        {
    	    mouseMove( ev.touches[ 0 ], ev );
        }

        function mouseMove( childEvent, rootEvent )
        {
            //ns.d('eid=' + eventId + ' moving');
            stopsAftershocks ( rootEvent || childEvent );
            if( !startPoint ) {
                //ns.d('mouseMove: no start point exist');
                return;
            } 
            var surfPoint = eventPos_2_surfacePos( childEvent );
            if(!surfPoint) { 
                //ns.d('\nmouseMove: media point failed');
                return;
            }
            lastPoint = surfPoint;
			do_complete_move( surfPoint, childEvent );
			return false;
        }

        ///adds move - the "sugar"
		function do_complete_move( surfPoint, childEvent )
		{
			var surfMove =
			[	
				surfPoint[ 0 ] - startPoint[ 0 ],
				surfPoint[ 1 ] - startPoint[ 1 ]
			];
            //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            d8d_app( surfMove, 'move', surfPoint, childEvent );
            //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            return surfMove;
		};
        //*****************************************
		// \\// MOVE SUBROUTINES
        //*****************************************






        //*****************************************
		// //\\ END SUBROUTINES
        //*****************************************
        function touchEnd( rootEvent ) {
            //ns.d('***eid=' + eventId + ' removing touch events\n\n');
            att.removeEventListener( 'touchmove',   touchMove );
            att.removeEventListener( 'touchend',    touchEnd );
            att.removeEventListener( 'touchcancel', touchEnd );
            var childEvent = rootEvent.touches && rootEvent.touches[0];
            do_complete_end( childEvent, rootEvent );
        }


        function mouseEnd( child8rootEvent )
        {
            //ns.d( '***eid=' + eventId + ' removing mouse events\n\n' );
            att.removeEventListener( 'mousemove', mouseMove );
            att.removeEventListener( 'mouseup',  mouseEnd );
            att.removeEventListener( 'mouseleave', mouseEnd );
            do_complete_end( child8rootEvent );
        }

        ///Input: note: "childEvent" can be missed for touches
		function do_complete_end( childEvent, rootEvent )
		{
            //ns.d('***eid=' + eventId + ' second End starts');
            var eventPoint = childEvent &&
                             ( childEvent.clientX || childEvent.clientX === 0 ) &&
                             [ childEvent.clientX , childEvent.clientY ];
            var point_on_dragSurf = eventPoint && eventPos_2_surfacePos( childEvent );

            if( startPoint ) {
                ////startPoint is not missed ...
                stopsAftershocks( rootEvent || childEvent );

                //.programmer may want to make d8d_app throttable:
                //.this is why it is importan to provide "up" with point_on_dragSurf
                //.in case the "move" event will be erased by "up"
                var point_on_dragSurf = point_on_dragSurf || lastPoint;
                var surfMove = do_complete_move( point_on_dragSurf, childEvent );
		        startPoint = null; 
                //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
             	d8d_app( surfMove, 'up', point_on_dragSurf, childEvent );
                //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            //} else {
                ////broken scenario
            }
		};
        //*****************************************
		// \\// END SUBROUTINES
        //*****************************************






        //*****************************************
		// //\\ HELPERS
        //*****************************************
        // //\\ converts event pos to domelem-css-pos
        //===========================================
        function eventPos_2_surfacePos( event )
        {
            //https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect
            var box	= surface.getBoundingClientRect();
            var loc	=
            [ 
                Math.round( event.clientX - box.left ),
                Math.round( event.clientY - box.top )
            ];
            return loc;
        };
        //===========================================
        // \\// converts event pos to domelem-css-pos
        //===========================================



        //====================================================================
        // //\\ protects textarea, form elements ... from dragging
        //====================================================================
        //      to preserve ordinary clicks on form elements or other controls
        //      disables dragging on form and other elements
        function default_skip( ev )
        {
            var tag = ev.target.tagName.toLowerCase();
            if(     
                    //protects wbd debugger    
                    tag === 'textarea' ||
                    //protects forms    
                    tag === 'input' || tag === 'select' || tag === 'button'
                    //protects firmware plugins which use svg  
                    // || tag === 'rect' || tag === 'path'                            
            ) {
                return true;
            }
        }
        //====================================================================
        // \\// protects textarea, form elements ... from dragging
        //====================================================================



        //==============================================================
        // //\\ Clears sibling events.
        //      Can be used to prevent the events set in this module to
        //      to be caught by native or other event-handlers.
        //==============================================================
        function stopsAftershocks( rootEvent )
        {
            rootEvent.preventDefault();
            //very good:
            //  javascript.info/bubbling-and-capturing
            //  stackoverflow.com/questions/5299740/stoppropagation-vs-stopimmediatepropagation
            if( rootEvent.stopImmediatePropagation ) {
                ////missed on Android 2.?.?
                rootEvent.stopImmediatePropagation(); //IE9+
            } else if( rootEvent.stopPropagation ) {
                rootEvent.stopPropagation();
            }
        }
        //=========================================
        // \\// Clears sibling events.
        //*****************************************
		// \\// HELPERS
        //*****************************************
	};

}) ();



// //\\// Creates an object which encapsulates slider functionality.
(function() {
	var ns	= window.b$l;







    ///Purpose: constructor of an object which encapsulates slider functionality.
    ///Input:   arg: see MicroAPI section below.
    ns.sliderControl = function( arg )
    {
        thisSlider = {}; //created object which is returned from constructor



        //****************************************************************
        // //\\ MicroAPI
        //      the key role belongs to the unitless inner value
        //      and parameter "absFraction". It means fraction of the 
        //      full range which is = 1. 
        //      The position of slider is by default is
        //      (absFraction*100)%.
        //****************************************************************
        //Dom element which will be visually dragged.
        var draggee          = thisSlider.draggee = arg.handleDomEl;

        //The "draw-surface", the dom-element to which touchstart, mousedown, mousemove, and similar event 
        //will be attached.
        //Optional parameter. Defaults defined from the following line.
        var surface0attachee = thisSlider.surface = arg.drawSurfaceDomEl || draggee.parentNode;

        // //\\ callbacks
        //      data exchanges go via unitless parameter, "absFraction"
        //.callback which will supply data from the slider to parent application during mouse/touch move
        var dataInMove       = arg.dataInMove || (function() {});
        //.callback which will supply data from the slider to parent application at mouse/touch completion
        var dataInArrival    = arg.dataInArrival  || (function() {});
        // \\// callbacks

        //:accepts range-limits or sets their defaults
        var lowLimit         = arg.lowLimit || 0;
        var maxLimit         = arg.maxLimit || 1;

        thisSlider.fraction2value_coeff = arg.fraction2value_coeff || 1;
        thisSlider.id        = arg.id;
        var default_absFrac  = arg.default_absFrac || 0;
        //****************************************************************
        // \\// MicroAPI
        //****************************************************************






        //--------------------------------------
        // //\\ creates locals
        //--------------------------------------
        var sliderStyleOffset = 0; //default
        var absFracDone;           //accomulates and memorizes accomulated move
        var absFraction;           //in plain words:
                                   //   absFraction = absFracDone + "mouse-moveFraction"
                                   //   mouse-moveFraction = mouse-move-x/len
                                   //   len = surface0attachee-length
        //--------------------------------------
        // \\// creates locals
        //--------------------------------------


        //--------------------------------------
        // //\\ processes module
        //--------------------------------------
        //.at creation time, absFracDone is set, and by default to 0
        doSet( default_absFrac, 'doSetDoneValue' );

        ///calls low-level drag-and-drop-MicroAPI
        var this_d8d = ns.d8d(
        {
	        surface : surface0attachee,
	        d8d_app  : d8d_app,
            skipD8D  : skipD8D
        });

        thisSlider.doSet                   = doSet;
        thisSlider.d8d_app                 = d8d_app;
        thisSlider.d8d_emulateAbsFractionX = d8d_emulateAbsFractionX;
        thisSlider.removeEvents            = this_d8d.removeEvents;
        thisSlider.slideeX                 = function() { return absFracDone; };

        return thisSlider;
        //--------------------------------------
        // \\// processes module
        //--------------------------------------




        ///Sets absFraction, draggee position, and, optionally, sets accomulated 
        ///position, absFractDone.
        function doSet( absFraction_, doSetDoneValue )
        {
            absFraction = validateAbsFraction( absFraction_ );
            //.the only place where dragge's style is set
            draggee.style.left = (sliderStyleOffset + absFraction).toFixed(4)*100 + '%';
            if( doSetDoneValue ) {
                absFracDone = absFraction;
            }
        }


        ///d8d application
        function d8d_app( move, mouseUpOrDown )
        {
            if( mouseUpOrDown === 'down' ) {
                return;
            }

            if( mouseUpOrDown === 'move' || mouseUpOrDown === 'up' ) {

                //.this makes program immune to resize
                var len = surface0attachee.getBoundingClientRect().width;
                //.calculates absolute move adding initial position + current move
                absFraction = validateAbsFraction( absFracDone + move[ 0 ]/len ); 
                //.supplies absolute move to application
                var setIsForbidden = dataInMove( absFraction, draggee );
                if( !setIsForbidden ) { doSet( absFraction ); }
            }

            if( mouseUpOrDown === 'up' ) {
                //.accomulates and memorizes accomulated move
                absFracDone = absFraction;
                dataInArrival( absFraction, draggee );
            } 
        }


        ///d8d application emulator
        ///mocks real event, mouseUpOrDown, and sets absFraction
        ///used for "programmable animation" of this slider
        function d8d_emulateAbsFractionX( absFraction, mouseUpOrDown )
        {
            var len = surface0attachee.getBoundingClientRect().width;
            var relMove = ( absFraction - absFracDone ) * len;
            //ccc( 'emulation-layer in engine: len=' + len + ' absFracDone=' +
            //absFracDone + ' absFraction=' + absFraction + ' relMove=' + relMove );
            return d8d_app( [ relMove, 0 ], mouseUpOrDown );
        }



        // //\\// helpers
        function validateAbsFraction( absFrac )
        {
            return Math.min( maxLimit, Math.max( absFrac, lowLimit ) );
        }

        //====================================================================
        // //\\ protects textarea, form elements ... from dragging
        //      to preserve ordinary clicks on form elements or other controls
        //      disables dragging on form and other elements
        //====================================================================
        function skipD8D( ev )
        {
                var tag = ev.target.tagName.toLowerCase();
                ///fails: var cls = ev.target.className;
                if(     
                        //protects wbd debugger    
                        tag === 'textarea' ||
                        //protects forms    
                        tag === 'input' || tag === 'select' || tag === 'button' ||
                        //protects firmware plugins which use svg  
                        tag === 'rect' || tag === 'path'                            
                ) {
                    //ns.d('touchDown: skips drag on tag=' + tag);
                    return true;
                }
        }
        //====================================================================
        // \\// protects textarea, form elements ... from dragging
        //====================================================================

    };
})();


// This module should be generic in bsl/core or bsl/slider ... but before doing this
//      the standalone test.html file must be elaborated.
// //\\// Provides d&d module for set of points which act exclusively
//        one at the time and share common handler
//        The active point is elected by "findDraggee" function
//        which is supplied at initialization time.
( function() {
    var ns          = window.b$l;
    var dpdec       = ns.sn('drag-point-decorator');
    var sn          = ns.sn;    

    var fapp        = ns.sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var d8d_p       = sn('d8d-point',fmethods);
    var sapp        = sn('sapp');

    d8d_p.createFramework = createFramework;
    //~~~~~
    return;
    //~~~~~






    ///===========================================================
    /// //\\ inits common framework for the set of  point-draggees
    ///-----------------------------------------------------------
    /// There can be as many frameworks as one wishes.
    function createFramework(args)
    {
        //---------------------------------------------
        // //\\ API
        //---------------------------------------------
        //.function which finds draggeePoint 
        var findDraggee = args.findDraggee;           
        var dragSurface = args.dragSurface;

        //:the rest is optional
        var DRAG_POINTS_THROTTLE_TIME =  args.DRAG_POINTS_THROTTLE_TIME;
        //.sugar for "down" event
        var detected_user_interaction_effect = args.detected_user_interaction_effect;
        //.decPoint stands for "decorationalPoint"
        var decPoint_parentClasses = args.decPoint_parentClasses;
        var processMouseDown = args.processMouseDown; //optional
        //---------------------------------------------
        // \\// API
        //---------------------------------------------


        var selectedElement;               //flag
        var dragWraps = [];                //level of dragWrap-points where each point is on top
                                           //of it's own api.pointWrap supplied in api for each point

        ///sets one lower-level handler for all framework draggees
        ns.d8d(
        {
            surface : dragSurface,
            d8d_app : d8d_app //common handler
        });
        //111111111111111111111111111111111111111111111
        return {
            pointWrap_2_dragWrap : pointWrap_2_dragWrap,
            dragWraps:dragWraps,
            updateAllDecPoints:updateAllDecPoints
        };
        //111111111111111111111111111111111111111111111









        function updateAllDecPoints()
        {
            dragWraps.forEach( function( dragWrap ) {
                var uP = dragWrap.update_decPoint;
                uP && uP( dragWrap.decPoint, dragSurface );
            });
        }


        ///Creates drag handler for each specific point-draggee.
        ///Usually called when each model point is created to be dragged.
        function pointWrap_2_dragWrap( api )
        {
            //---------------------------------------------
            // //\\ AAAAAAAAA PPPPPPPP IIIIIIIIII
            //---------------------------------------------
            var pointWrap            = api.pointWrap || {};
            var doProcess            = api.doProcess;           //to be set at point-def.
            var update_decPoint      = api.update_decPoint;     //optional
            var dragCssCls           = pointWrap.dragCssCls;    //optional
            var dragDecorColor       = pointWrap.dragDecorColor;//optional

            // api.achieved is an optional parameter
            // if it is falsy and not 0, then it is not used
            // otherwise, it is placed into 
            //
            //      pointWrap.achieved = { achieved : api.achieved }
            //
            // this approach creates functions' side effects:
            // here we are modifying important input-parameter, pointWrap
            //
            // todm side effects can be fixed by indexing points and
            // making registry here ... still an extra construct
            // adds members to pointWrap
            //
            pointWrap.achieved = api.achieved || api.achieved === 0 ? { achieved : api.achieved } : {};


            //.recall, parent of decPoint is dragSurface
            var cssIdLowCase = dragCssCls && dragCssCls.replace( /([A-Z])/g, ( match, key1 ) => (
                               '_' + key1.toLowerCase() ));

            var decPoint            = update_decPoint &&
                                            dpdec.addD8D_decorationPoint(
                                                dragSurface,
                                                cssIdLowCase,
                                                dragDecorColor,
                                                decPoint_parentClasses
                                            );
            //c cc( cssIdLowCase + ' pointWrap.dragDecorColor=' +  pointWrap.dragDecorColor)
            // \\// functions' side effects
            //---------------------------------------------
            // \\// AAAAAAAAA PPPPPPPP IIIIIIIIII
            //---------------------------------------------

            update_decPoint && update_decPoint( decPoint, dragSurface ); //todo ... redundant?

            //.the throttle is abandoned since v1960
            //.abandoned because it is hard to remember and explain to other developer
            //.the complexity which arised with throttle: the complexity is
            //.that event "move" can be overriden with "up" and developer must always
            //.remember this in do Process() function
            //var do DragUpdate = ns.throttle( 
            //        ....
            //        DRAG_POINTS_THROTTLE_TIME || 0
            //);
            //.if one needs to throttle the drag, do throttle "do Process()"
            //.explicitly in specific lemma

            function doDragUpdate( arg )
            {
                //logical sugar:
                //remembers pointWrap which can be changed in closure of do Process
                //when pointWrap is generated in the loop
                arg.pointWrap = pointWrap; 

                //:these both can be in one function call,
                //:they are in different calls for clear api logic
                doProcess( arg );
                update_decPoint && update_decPoint( decPoint, dragSurface );
                if( arg.down_move_up === 'up' ) {
                    ////this cleans up drag and drop lifecycle
                    selectedElement=0;
                }
            }

            var dragWrap =
            {
                pointWrap       :pointWrap,
                doDragUpdate    :doDragUpdate,
                update_decPoint :update_decPoint,
                decPoint        :decPoint
            };
            dragWraps.push( dragWrap );
            return dragWrap;
        }




        ///d8d handler shared between all draggee-points.
        ///Input: point_on_dragSurf
        ///       it is precalculated by lower level handler and supplied to this function:
        ///       it is offset in "local-surface" if no special converter is supplied:
        ///       details are in d8d code:
        ///            var point_on_dragSurf = eventPoint_2_localPoint( childEvent );
		///            var eventPoint_2_localPoint = arg.eventPoint_2_localPoint ||
        ///                                          eventPos_2_surfacePos;
        function d8d_app( surfMove, down_move_up, point_on_dragSurf, event )
        {
            //ns.d('app: d8d_app call begins: mode="' + down_move_up + '"');
            switch( down_move_up )
            {
                case 'down': 
                    if( selectedElement ) {
                        //var ww = 'app: ' + down_move_up +
                        //         ' is still not-cleaned-up ... down event cancells';
                        //ns.d(ww);
                        return true;
                    }
                    var closestDragWrap = findDraggee( point_on_dragSurf, dragWraps, dragSurface );
                    if( !closestDragWrap ) return true;
                    var cPW = closestDragWrap.pointWrap;
                    processMouseDown && processMouseDown( cPW );
                    detected_user_interaction_effect && detected_user_interaction_effect();
                    selectedElement = closestDragWrap;
                break;
                case 'move': 
                case 'up':
                    //.is throttled: does condence move and up events
                    selectedElement.doDragUpdate( { down_move_up:down_move_up, surfMove:surfMove } );
                break;
            }
        }
    };
    ///============================================================
    /// \\// inits common framework for the set of  point-draggees
    ///============================================================

}) ();


//apparently this module was a derivative from
//  /var/www/html/bwork/vbsl/vendor/bsl/slider/slider-handler.css.js
(function() {
    var ns     = window.b$l;
    var dpdec  = ns.sn('drag-point-decorator');

    var globalCssCreated_flag = false;

    dpdec.create_individualCss = create_individualCss;
    dpdec.createGlobal = createGlobal;
    return;








    ///Input: parent_classes - optional array:
    ///                        these classes do increase specifity for decoration-point.
    function create_individualCss( id, color, parent_classes )
    {
        parent_classes = parent_classes || [''];
        var ret = '';

        // //\\ css /////////////////////////////////////////
        parent_classes.forEach( function( dclass ) {
            dclass = dclass ? '.' + dclass : '';
            ret +=
            `

            /*=============================*/
            /* //\\ parent after           */
            /*=============================*/
            ${dclass} .${id}.brc-slider-draggee:hover:after {
                background-color: ${color};
            }
            /*=============================*/
            /* \\// parent after           */
            /*=============================*/


            /*=============================*/
            /* //\\ animates slider arrows */
            /*=============================*/
            ${dclass} .${id} .brc-slider-draggee-right {
                border-left:15px solid ${color};
            }
            ${dclass} .${id} .brc-slider-draggee-left {
                border-right:15px solid ${color};
            }
            /*=============================*/
            /* \\// animates slider arrows */
            /*=============================*/
            `
        });
        // \\// css /////////////////////////////////////////
        ns.globalCss.addText( ret );
    }


    function createGlobal()
    {
        if( globalCssCreated_flag ) return;
        var ret =

        // //\\ css /////////////////////////////////////////
        `

        /*=============================*/
        /* //\\ parent handler         */
        /*=============================*/
        .brc-slider-draggee {
            position:absolute;
            top:0%;
            width:40px;
            height:40px;
            z-index:1000;
            cursor:pointer;
            /* .good for devel. */
            /* border: 1px solid red; */
            transform: translate(-50%, -50%);
        }

        .brc-slider-draggee.rotate {
            animation: 2s linear 0s infinite normal do-rotate;
        }
        .brc-slider-draggee.axis-y {
            transform: translate(-50%, -50%) rotate(90deg);
        }

        @keyframes do-rotate {
            0% {
	            transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
	            transform: translate(-50%, -50%) rotate(360deg);
            }
        }
        /*=============================*/
        /* \\// parent handler         */
        /*=============================*/




        /*=============================*/
        /* //\\ parent after;          */
        /*      this is handle's disk  */
        /*      if visible;            */
        /*=============================*/
        .brc-slider-draggee:hover:after {
            content:''; /* seems vital ... why? */
            position:absolute;
            left:20px;
            top:20px;
            width:15px;
            height:15px;
            transform: translate(-50%, -50%);

            padding-top:0px;
            border-radius: 15px;
            font-size:11px;
            font-weight:bold;
            text-align:center;
            background-color: black;
            z-index:1000;
            cursor:pointer;
        }
        /*=============================*/
        /* \\// parent after           */
        /*=============================*/






        /*=============================*/
        /* //\\ animates slider arrows */
        /*=============================*/
        .brc-slider-draggee .brc-slider-draggee-right,
        .brc-slider-draggee .brc-slider-draggee-left {
            visibility:hidden;
        }

        .active-tip > .brc-slider-draggee .brc-slider-draggee-right,
        .brc-slider-draggee:hover .brc-slider-draggee-right {
            content:'';
            position:absolute;
            height:1px;
            width:1px;
            top:5px;
            left: 24px;
            left: 20px;
            animation: 4s ease-out 0s infinite normal slider-hover-right;
            visibility:visible;
        }

        .active-tip > .brc-slider-draggee .brc-slider-draggee-left,
        .brc-slider-draggee:hover .brc-slider-draggee-left {
            content:'';
            position:absolute;
            height:1px;
            width:1px;
            left:-10px;
            top:5px;
            animation: 4s ease-out 0s infinite normal slider-hover-left;
            visibility:visible;
        }

        @keyframes slider-hover-right {
            0% {
	            left: 20px;
	            opacity: 0;
            }
            12.5% {
	            opacity: 1;
            }
            25% {
	            left: 40px;
	            opacity: 0;
            }
            100% {
	            left: 40px;
	            opacity: 0;
            }
        }

        @keyframes slider-hover-left {
            0% {
	            left: -10px;
	            opacity: 0;
            }
            12.50% {
	            left: -10px;
	            opacity: 0;
            }
            25% {
	            opacity: 1;
            }
            37.5% {
	            opacity: 0;
	            left: -35px;
            }
            100% {
	            left: -35px;
	            opacity: 0;
            }
        }

        .brc-slider-draggee-right {
            border:15px solid transparent;
            border-left:15px solid grey;
        }
        .brc-slider-draggee-left {
            border:15px solid transparent;
            border-right:15px solid grey;
        }
        /*=============================*/
        /* \\// animates slider arrows */
        /*=============================*/



        `;
        // \\// css /////////////////////////////////////////
        ns.globalCss.addText( ret );
        globalCssCreated_flag = true;
    };
})();



//apparently this module was a derivative from
//  /var/www/html/bwork/vbsl/vendor/bsl/slider/slider-handler.js
(function() {
    var ns     = window.b$l;
    var dpdec  = ns.sn('drag-point-decorator');

    dpdec.addD8D_decorationPoint = addD8D_decorationPoint;
    return;







    ///creates decPoint, properly css-classed html of draggee-point-decorations and
    ///attaches this html to hostDomEl
    function addD8D_decorationPoint(
        hostDomEl,      //usually dragSurface
        dragCssCls,      //optional
        dragDecorColor, //optional
        parent_classes  //optional
    ) {
        var decPoint = document.createElement( 'div' );
        dpdec.createGlobal(); //idempotent
        if( dragCssCls && dragDecorColor ) {
            //amended: decPoint.setAttribute( 'id', fullCssId );
            dpdec.create_individualCss( dragCssCls, dragDecorColor, parent_classes );
            //later on, don't forget to make ns.globalCss.update();
        }
        var cssCls = 'brc-slider-draggee'
           //.the second purpose of this line: it allows the handle to be managed
           //.from other module css, for example, 
           //.allows to hide dividor draggee at highlight
           + ( dragCssCls ? ' ' + dragCssCls : '' )
        ;
        decPoint.setAttribute( 'class', cssCls );

        hostDomEl.appendChild( decPoint );

        var left = document.createElement( 'div' );
        left.setAttribute( 'class', 'brc-slider-draggee-left' );
        decPoint.appendChild( left );

        var right = document.createElement( 'div' );
        right.setAttribute( 'class', 'brc-slider-draggee-right' );
        decPoint.appendChild( right );
        return decPoint;
    }

})();



( function() {
    var sn      = window.b$l.sn;
    var mat     = sn('mat');
    var bezier  = sn('bezier');

    

    bezier.weightify        = weightify;
    bezier.weightify        = weightify;
    bezier.points2bezier    = points2bezier;
    bezier.parT2point       = parT2point;
    bezier.line2bezier      = line2bezier;
    bezier.zeroBezier2zeroSubbezier = zeroBezier2zeroSubbezier;
    bezier.bezier2upper     = bezier2upper;
    bezier.bezier2lower     = bezier2lower;
    bezier.t_2_3Dpoint      = t_2_3Dpoint;
    return;



    ///Calculates point on n-points, m-dimentional Bezier curve
    ///Input:  dim = m
    ///        pivotPoints = points, pivotPoints.length = n
    ///        tt = point parameter <- [0,1]
    ///        start = 0 initially
    ///        len = pivotPoints.length initially
    function weightify( tt, pivotPoints, dim, start, len )
    {
        if(  len === 2 ) {
            return (1-tt)*pivotPoints[start][dim] + tt*pivotPoints[start+1][dim];
        } else {
            return  (1-tt) * weightify( tt, pivotPoints, dim, start,   len - 1 ) +
                    tt     * weightify( tt, pivotPoints, dim, start+1, len - 1 )
        }
    }

    ///Sugar subroutine.
    ///Calculates array of points on besier curve,
    ///Input:   points - array of t-parameters on besier curve
    function points2bezier( points, pivots )
    {
        var plen = pivots.length;
        return points.map( function( paramT ) {
                    return [ weightify( paramT, pivots, 0, 0, plen ), 
                             weightify( paramT, pivots, 1, 0, plen )
                    ];
        });
     }

    ///=============================================================
    ///Calculates point on bezier curve by given point's t-parameter
    ///=============================================================
    function parT2point( parT, pivots )
    {
        return [ weightify( parT, pivots, 0, 0, pivots.length ), 
                 weightify( parT, pivots, 1, 0, pivots.length )
        ];
    }


    ///=============================================================
    ///3d poiont
    ///=============================================================
    function t_2_3Dpoint( parT, pivots )
    {
        return [
            weightify( parT, pivots, 0, 0, pivots.length ), 
            weightify( parT, pivots, 1, 0, pivots.length ),
            weightify( parT, pivots, 2, 0, pivots.length )
        ];
    }





    /*
        ///=============================================================
        /// Calculates: crossing of line and bezier curve.
        ///=============================================================
        Input: Q,D line pivots
               B,C second and third bezier pivots; 
                   first must be A = [0,0]
        Returns: [t0, t1] - bezier parameters of crossing, sorted by
                            ascending,
                            t0,t1 <- [0,1]
                 if no solution, returns [].
        Context:

            P = 2B(1-t)t + Ctt;   bezier: Bz(A,B,C), A,B,C - pivots, A=(0,0)
            P = Q + Dq;           line
            Dx^2 + Dy^2 != 0      line is not a point
            -----------------------------------------

            x = 2*Bx*(1-t)*t + Cx t*t = Qx + Dx*q
              = Fx*t*t + Gx*t where
                Fx = Cx - 2Bx, Gx = 2Bx;
            analogiously:
            y = Fy*t*t + Gy*t = Qy + Dy*q

            then multiplying above by Dx:
            Dx*Fy*t*t + Dx*Gy*t - Dx*Qy = Dy * Dx*q
            
            F'x*t*t + G'x*t - Q'x = Dx*Dy*q =
            F'y*t*t + G'y*t - Q'y
            where
                F'x = Fx*Dy
                ...
                Q'y = Qy*Dx

            finally:
            att + bt + c = 0

            which is to be solved against t

            where a = F'x - F'y,
                  b = G'x - G'y,
                  c = Q'y - Q'x

    */
    function line2bezier( Q, D, B, C )
    {
        var Fx = C[0] - 2*B[0];
        var Gx = 2*B[0];
        var Fy = C[1] - 2*B[1];
        var Gy = 2*B[1];

        var Qx = Q[0];
        var Qy = Q[1];
        var Dx = D[0];
        var Dy = D[1];

        var Fsx = Fx*Dy;
        var Gsx = Gx*Dy;
        var Qsx = Qx*Dy;

        var Fsy = Fy*Dx;
        var Gsy = Gy*Dx;
        var Qsy = Qy*Dx;

        var a = Fsx - Fsy;
        var b = Gsx - Gsy;
        var c = Qsy - Qsx;

        var solution = mat.squarePolyRoot( a, b, c );
        //c cc( a, b, c, solution )
        if( solution.length === 1 ) {
            var t = solution[0];
            if( t < 0 || t > 1 ) { solution = []; }
        } else if( solution.length === 2 ) {
            if( solution[0].length ) { 
                ////complex solution
                solution = [];
            } else {
                var t0 = solution[0];
                var t1 = solution[1];
                var result = [];
                if( t0 >=0 && t0 <= 1 ) {result.push( t0 );}
                if( t1 >=0 && t1 <= 1 ) {result.push( t1 );}
                solution = result.length < 2 ? result :
                           t0 > t1 ? [ t1, t0 ] : result;
            }
        }
        return solution;
    }

    /*
        Input: zero-based bezier A,B,C, first-pivot A = [0,0]
               tS - splitter
        Returns: B', C' pivots of zero-based subbezier

        Context: 
                P = 2t(1-t)B + ttC = tt(C-2B) + 2Bt = att+bt
            Sought: 
                P = 2s(1-s)B' + ssC' (*)
            Proof:
                Let: t' = tS, then s = t/t'
                Sought: P=a'ss+b's
                Should: b'/t' = b = 2B => B' = Bt'
                (C'-2Bt') = t't'(C-2B) =>
                C' = t't'(C-2B) + 2Bt'
                Driving these steps backward
                does prove (*).
    */
    function zeroBezier2zeroSubbezier( B, C, tS )
    {
        var sm = mat.sm;
        var u = tS;
        return [ 
            sm(tS,B),
            sm(u*u, sm(C,-2,B), 2*u, B)
        ];

        /*
        ///explicit working variant
        return [ 
            [ B[0]*tS, B[1]*tS ],
            [ tS*(tS*(C[0]-2*B[0])+2*B[0]),
              tS*(tS*(C[1]-2*B[1])+2*B[1])
            ]  
        ];
        */
    }





    //***********************************************************
    // //\\ zeroBezier2upperSubbezier
    //***********************************************************
    /*
        Action:     creates fragment of bezier curve above the 
                    division parameter T
        Inputs:     T - division point
                    B,C - poivots of zero-based-bezier Bz,
        Returns:    three bezier pivots for the fragment above T for
                    parameter s<-[0,1] where
                        0 is mapped to Bz(T),
                        1 is mapped to C
    */
    /*
    function zeroBezier2upperSubbezier( B, C, T )
    {
        var sm = mat.sm;
        //:converts to coordinate system with origin in C
        var Cq = sm(-1,C);
        var Bq = sm(B,Cq);

        var Q  = 1-T;
        var newPivots = zeroBezier2zeroSubbezier( Bq, Cq, Q );
        ////now we have the solution with param u with starting point
        ////at C, middle point Bs, and ending point mapped to Q.
        ////it can be returned at this point

        ////but we add the following sugar
        ////converts pivots to original coordinate system
        var As = sm(newPivots[1],C);
        var Bs = sm(newPivots[0],C);
        var Cs = C;
        return [As,Bs,Cs];
    }
    */
    //***********************************************************
    // \\// zeroBezier2upperSubbezier
    //***********************************************************



    ///The same as zeroBezier2upperSubbezier( B, C, T ), but
    ///with 3 input pivots with A in an orbitrary position     
    function bezier2upper( pivots, T )
    {
        var sm = mat.sm;
        var A = pivots[0];
        var B = pivots[1];
        var C = pivots[2];

        //:converts to coordinate system with origin in C
        var Cq = sm(A,-1,C);
        var Bq = sm(B,-1,C);
        var Q  = 1-T;
        var newPivots = zeroBezier2zeroSubbezier( Bq, Cq, Q );
        ////now we have the solution with param u with starting point
        ////at C, middle point Bs, and ending point mapped to Q.
        ////it can be returned at this point

        ////but we add the following sugar
        ////converts pivots to original coordinate system
        var As = sm(newPivots[1],C);
        var Bs = sm(newPivots[0],C);
        var Cs = C;
        return [As,Bs,Cs];
    }



    ///The same as zeroBezier2zeroSubbezier( B, C, T ), but
    ///with 3 input pivots with A in an orbitrary position     
    function bezier2lower( pivots, T )
    {
        var sm = mat.sm;
        var A = pivots[0];
        var B = pivots[1];
        var C = pivots[2];

        //:converts to coordinate system with origin in C
        var Cq = sm(C,-1,A);
        var Bq = sm(B,-1,A);
        var newPivots = zeroBezier2zeroSubbezier( Bq, Cq, T );
        ////now we have the solution with param u with starting point
        ////at C, middle point Bs, and ending point mapped to Q.
        ////it can be returned at this point

        ////but we add the following sugar
        ////converts pivots to original coordinate system
        var Bs = sm(newPivots[0],A);
        var Cs = sm(newPivots[1],A);
        return [A,Bs,Cs];
    }
    // //\\// helpers

}) ();



( function() {
	var ns	    = window.b$l;
    var bezier  = ns.sn( 'bezier' );
    var svg     = ns.sn( 'svg' );
    




    ///does paint bezier curve and optionally related shapes: pivots, tangents, and points on curve
    bezier.mediafy = function( arg )
    {
        //:args
        var parent_svg = arg.svg
        var pivots  = arg.pivots;
        //:optional args for data and styles
        var paintPivots  = arg.paintPivots;
        var blines  = arg.blines;
        var bcurve  = arg.bcurve || {};
        var bpoints = arg.bpoints;
        var mediael = arg.mediael || {};

        //:local
        var plen    = pivots.length;


        //--------------------------------------------------------
        // //\\ prepares string-parameter for pivot-lines
        //--------------------------------------------------------
        var pivotsStr = pivots.reduce( function( acc, point ) {
                if( acc ) { acc += ' '; }
                return acc += point[0] + ',' + point[1];
            },
            ''
        );
        //--------------------------------------------------------
        // \\// prepares string-parameter for pivot-lines
        //--------------------------------------------------------

        //--------------------------------------------------------
        // //\\ paints bezier-pivot-lines
        //--------------------------------------------------------
        if( blines ) {
            mediael.paintedLines = svg.u({
                svgel : mediael.paintedLines,
                parent : parent_svg,
                type : 'polyline',
                points : '' + pivotsStr,
                style : blines.style,
                stroke : blines.stroke || 'rgba( 0,0,0, 1 )',
                fill : blines.fill || 'transparent',
                'stroke-width' : blines[ 'stroke-width' ] || 1
            });
        }
        //--------------------------------------------------------
        // \\// paints bezier-pivot-lines
        //--------------------------------------------------------


        //--------------------------------------------------------
        // //\\ paints bezier curve
        //--------------------------------------------------------
        if( bcurve ) {
            if( plen === 3 ) {
                var bcontr = 'Q';
            } else {
                var bcontr = 'C';
            }
            var bezierStr = pivots.reduce( function( acc, point ) {
                    if( acc ) { 
                        acc += ' ' + point[0] + ' ' + point[1];
                    } else { 
                       acc = 'M' + point[0] + ' ' + point[1] + ' ' + bcontr;
                    } 
                    return acc; 
                },
                ''
            );
            mediael.paintedCurve = svg.u({
                svgel : mediael.paintedCurve,
                parent : parent_svg,
                type : 'path',
                fill : bcurve.fill || 'transparent',
                stroke : bcurve.stroke || 'rgba( 0,255,0, 1 )',
                'stroke-width' : bcurve[ 'stroke-width' ] || 3,
                d : '' + bezierStr
            });
        }
        //--------------------------------------------------------
        // \\// paints paints bezier curve
        //--------------------------------------------------------



        //--------------------------------------------------------
        // //\\ paints points on bezier curve
        //--------------------------------------------------------
        if( arg.bpoints ) {
            mediael.points = mediael.points || [];
            //--------------------------------------------------------
            // //\\ calculates points
            //--------------------------------------------------------
            var resultBPoints = bezier.points2bezier( arg.bpoints.points, pivots );
            //--------------------------------------------------------
            // \\// calculates points
            //--------------------------------------------------------
            arg.bpoints.points.forEach( function( paramT, pix ) {
                //--------------------------------------------------------
                // //\\ paints point on bezier curve
                //--------------------------------------------------------
                var attrs = bpoints.attrs || {};
                var point = resultBPoints[ pix ];
                mediael.points[ pix ] = mediael.points[ pix ] || { ix:pix, point:point };
                mediael.points[ pix ].svgel =
                    svg.u({
                        svgel : mediael.points[ pix ].svgel,                         
                        parent : parent_svg,
                        type : 'circle',
                        fill : attrs.fill || 'rgba(255,0,0,1)',
                        cx : point[0],
                        cy : point[1],
                        r : attrs.r || 4,
                        style : attrs.style
                    });
                //--------------------------------------------------------
                // \\// paints point on bezier curve
                //--------------------------------------------------------
            });
        }
        if( paintPivots ) {
            mediael.pivotPoints = mediael.pivotPoints || [];
            paintPivots.topaint.forEach( function( topaint, pix ) {
                if( !topaint ) return;
                var point = pivots[pix];
                //--------------------------------------------------------
                // //\\ paints pivot of bezier curve
                //--------------------------------------------------------
                var attrs = paintPivots.attrs || {};
                mediael.pivotPoints[ pix ] = mediael.pivotPoints[ pix ] || { ix:pix, medpos:point };
                mediael.pivotPoints[ pix ].medpos = point;
                mediael.pivotPoints[ pix ].svgel =
                    svg.u({
                        svgel : mediael.pivotPoints[ pix ].svgel,                         
                        parent : parent_svg,
                        type : 'circle',
                        fill : attrs.fill || 'transparent',
                        stroke : attrs.stroke || 'rgba(255,0,0,1)',
                        'stroke-width' : attrs[ 'stroke-width' ] || 3,
                        cx : point[0],
                        cy : point[1],
                        r : attrs.r || 4,
                        style : attrs.style
                    });
                //--------------------------------------------------------
                // \\// paints pivot of on bezier curve
                //--------------------------------------------------------
            });
        }
        //--------------------------------------------------------
        // \\// paints points on bezier curve
        //--------------------------------------------------------
        return mediael;
    }

}) ();



( function() {
	var ns	    = window.b$l;
    var mat     = ns.sn( 'mat' );




    ///Returns:  [] if no solutions
    ///          [ number ] if one solution
    ///          [ number, number ] if real solutions
    ///          [ [...], [...] ] if complex solutions
    ///
    ///Version history: similar to used in .../square/...
    ///                 /march18-98-bezier-threads-predelivey/js/paint-bubbles-and-threads.js
	mat.squarePolyRoot = function( aa, bb, cc )
    {
        if( aa === 0 ) {
            if( bb === 0 ) {
                return cc === 0 ? [1,2,3] : [];
            } else {
                return [ -cc/bb ];
            }
        } else {
            var scale = 1 / ( 2 * aa );
            var center = -bb * scale;
            var discr = bb*bb - 4*aa*cc;
            if( discr < 0 ) {
                var complex = 1;
                discr = -discr;
            }
            var main = Math.sqrt( discr ) * scale;
            return complex ?
                [ [ center, main ], [ center, -main ] ] :
                [ center+main, center-main ];
        }
    };

    //:tests it by not going too far
    //ccc( '0, 0, -2: []        =', mat.squarePolyRoot( 0, 0, -2 ) );
    //ccc( '0, 1, -2: [2]       =', mat.squarePolyRoot( 0, 1, -2 ) );
    //ccc( '1,-2,  0: [0,2]     =', mat.squarePolyRoot( 1, -2, 0 ) );
    //ccc( '1,-2,  2: [1+i, 1-i]=', mat.squarePolyRoot( 1, -2, 2 ) );

}) ();



// //\\// Simple matrix operations.
//        (c) 2017 Konstantin Kirillov. License MIT.
//        Origin taken from: /var/www/html/bids/done/SMALL/ww/calibrator/now/vendor/btb/matrix.js. Nov. 2014.


( function ( window ) {
	var ns	    = window.b$l;
    var mat     = ns.sn( 'mat' );




    /*
        Title:      summ of vectors with weights a,b
        Action:     returns vectors linear combination aA+bB
        Input:
            A,B     - sum of A,B
            a,A     - product aA
            A,b,B   - comb A+bB
            a,A,b,B - comb aA+bB
    */
    mat.sm = function( arg )
    {
        var a = 1;
        var b = 1;
        var B = [0,0];
        var A;
        var ar = arguments;

        if( typeof ar[0] === 'number' ) { 
            a = ar[0]; A = ar[1];
            if( ar.length === 4 ) { b = ar[2]; B = ar[3]; }
        } else {
            A = ar[0];
            if( ar.length === 3 ) {
                b = ar[1];
                B = ar[2];
            } else {
                B = ar[1];
            }
        }
        return [
                    a*A[0]+b*B[0],
                    a*A[1]+b*B[1]
               ];
    }

    /*
    //subtracts vectors
    function mn( A, B ) { return [ A[0] - B[0], A[1] - B[1] ]; }
    */


}) ( window );


( function() {
	var sn	        = window.b$l.sn;
    var mat         = sn( 'mat' );
    var integral    = sn( 'integral', mat );



    ///calculates integral from 0 to x of dx^3+ax^2+bx+c
    integral.polynomial = function( d, a, b, c, x )
    {
        return ( ( ( d/4*x + a/3 ) * x + b/2 ) * x + c ) * x;
    }

    //:test
    //ccc( integral.polynomial( 0, 1, 1, 1, 1 ) ); //11/6 = 1.8333...
    //ccc( integral.polynomial( 1, 1, 1, 1, 1 ) ); //2.0833...

}) ();



// //\\//   attaches library function to b$l
( function () {
	var ns	= window.b$l;
    ns.throttle = throttle;
    return;



    ///This is a throttler not bouncer.
    ///This function code is update 103-06-28. Only wait === 0 argument is tested so far.
    ///
    ///Useful for resize event
    ///Callback: return-function signature:
    ///             doCallNow has effect of immediate calling plus effect of cleaning up,
    ///             arg can be used for ordinary app. paramters
    ///Input:    wait optional, how much to wait till call the most recent function-curry,
    ///          if falsy, then never wait and never curry.
    ///          Ultimately fires if called at elapsed >= wait. If not called this way, then 
    ///          times out to wait, since last call.
    function throttle( fun, wait )
    {
        var timeout = null;
        var timeStart = null;
        var arg;
        return function( arg_, doCallNow, doCancel ) {
            arg = arg_; //updates arg at every call
            var time = Date.now();
            var elapsed = timeStart === null ? 0 : time - timeStart;
            if( !wait || elapsed > wait || doCallNow ) {
                fun( arg );
                if( timeout !== null ) clearTimeout( timeout );
                timeout = null;
                timeStart = time;
                return;
            }
            if( doCancel && timeout !== null ) {
                clearTimeout( timeout );
                return;
            }
            //.this statement prevents program from extension of the term
            //.in contrary to bouncer which extends the term
            if( timeout !== null ) return;
	        timeout = setTimeout( 
                function() {
		            fun( arg );
		            timeout = null;
                    timeStart = time;
	            },
                wait
            );
            timeStart = time;
        };
    };

}) ();



( function() {
	var ns = window.b$l;

	///	Keyboard Table:
	//	Maps keyCodes to human words across the browsers.
	//	Not to be used directly. Use whichKey(...).
	//	Credit as of November 11, 2011 to Jan Wolter: http://unixpapa.com/js/key.html
	KEY =
	{	
			//C o m m o n:
			//Mozilla, IE, Opera, pseudoASCII, no exceptions:

				//alpha: from 65 till 90:
				65	: [	'a','b','c','d','e','f','g','h','i','j','k','l','m','n',
						'o','p','q','r','s','t','u','v','w','x','y','z'],


				32	: ' ',
				13	: 'enter',
				9	: 'tab',
				27	: 'escape',
				8	: 'backspace',
				//Arrows:
				37	: 'left',
				38	: 'up',
				39	: 'right',
				40	: 'down',
				//Special:
				45	: 'insert',
				46	: 'delete',
				36	: 'home',
				35	: 'end',
				33	: 'pageup',
				34	: 'pagedown',
				//Function keys:
				112	: 'F1',
				113	: 'F2',
				114	: 'F3',
				115	: 'F4',
				116	: 'F5',
				117	: 'F6',
				118	: 'F7',
				119	: 'F8',
				120	: 'F9',
				121	: 'F10',
				122	: 'F11',
				123	: 'F12',

			//M i s c o m m o n:
			//Modifiers: Exceptions.
			16	: 'shift',
			17	: 'control',
			18	: 'alt',
			20	: 'capslock',
			144	: 'numlock',
			//Keyboard Number. Except p.A. Exceptions.
			48	: '0',
			49	: '1',
			50	: '2',
			51	: '3',
			52  : '4',
			53  : '5',
			54	: '6',
			55	: '7',
			56	: '8',
			57	: '9',
			//Symbols. Many differences.
			59	: ':',
			61	: '+',
			188	: ',',
			109	: '-',
			190	: '.',
			191	: '?',
			192	: '~',
			219	: '(',
			220	: '|',
			221	: ')',
			222	: '\''
			//TODm add keypad:
	};		

	ns.keyCode2char = function( keyCode )
	{
		if( !keyCode ) return null;
		if( 65 <= keyCode && keyCode <= 90 ) return KEY[ 65 ][ keyCode - 65 ];
		return KEY[ keyCode ];
	}


}) ();



( function() {
	var ns	= window.b$l;




    // //\\ some proofreading 
    var str2rgb_re = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    ns.rgbstr2hsl = function( rgbstr )
    {
        var cmatch = rgbstr.match( str2rgb_re );
        var rr = parseInt(cmatch[1], 16);
        var gg = parseInt(cmatch[2], 16);
        var bb = parseInt(cmatch[3], 16);
        //c onsole.log( rr, gg, bb );
        var hsl = ns.rgb2hsl( rr, gg, bb );
        return [ hsl[0] * 360, hsl[1] * 100, hsl[2] * 100 ];
    };

    ns.rgbstr2colors = function( rgbstr, opacity )
    {
        var hsl = ns.rgbstr2hsl;
        //c onsole.log( hsl );
        return ns.pars2colors( hsl[0], hsl[1], hsl[2], opacity );
    };
    // \\// some proofreading 


    //was: function getRandomColor()
    ns.pars2colors = function( HUE, SATURATION, LIGHTNESS, OPACITY )
    {
        var DARKER = 0.8;

        //:gets pars
        var hue   = typeof HUE        === 'undefined' ? Math.random() * 359 : HUE;
        var satur = typeof SATURATION === 'undefined' ? 100                 : SATURATION;
        var light = typeof LIGHTNESS  === 'undefined' ? 50                  : LIGHTNESS;
        var opas  = typeof OPACITY    === 'undefined' ? 1                   : OPACITY;

        var resultColor = makeColor( light );
        resultColor.darkColor = makeColor( light * DARKER );

        //:never used and tested
        satur *= 0.5;
        resultColor.softColor = makeColor( 70 );

        ///does the job
        function makeColor( light )
        {
            var ligthStr = light.toFixed(2);

            var opasS = ( opas === 1 && '1' ) || opas.toFixed(3);

            var hueS = hue.toFixed()
            var hsla = 'hsla( ' + hueS + ', ' + satur + '%, ' + ligthStr + '%, ' + opasS + ')';
            var hsl0 = 'hsla( ' + hueS + ', ' + satur + '%, ' + ligthStr + '%, 0 )'; //for gradients with 0 opacity at one stop

            var rgb = ns.hsl2rgb( hue, satur * 0.01, light * 0.01 );
            var rr = 254.999 * rgb[0];
            var gg = 254.999 * rgb[1];
            var bb = 254.999 * rgb[2];
            var rrS = rr.toFixed();
            var ggS = gg.toFixed();
            var bbS = bb.toFixed();
            var ww = rrS + ',' +  ggS + ',' +  bbS;
            var rgb = 'rgb(' + ww + ')';
            var rgba = 'rgba(' + ww + ',' + opasS + ')';
            var rgbaCSS = rrS + '-' +  ggS + '-' +  bbS + '-' + opasS;
        
            return { 
                hsl0: hsl0,
                hsla : hsla,
                rgb : rgb,
                rgba : rgba,
                hue : hue,
                satur : satur,
                light : light,
                rr: rr,
                gg: gg,
                bb: bb,
                rrS: rrS,
                ggS: ggS,
                bbS: bbS,
                opas : opas,
                rgbaCSS : rgbaCSS
            };
        };

        return resultColor;
    };

    /// HSL to RGB
    /// https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSL
    /// credit: https://codepen.io/frantic1048/pen/LGGxZP   , but it has a mistake: "* 60"
    ns.hsl2rgb = function( hh, ss, ll)
    {

      var cc = (1 - Math.abs(2 * ll - 1)) * ss;
      var hue = hh / 60;
      var xx = cc * (1 - Math.abs(hue % 2 - 1));
      var rgb;

      if (hue >= 0 && hue <= 1) {
        rgb = [cc, xx, 0];
      } else if (hue >= 1 && hue <= 2) {
        rgb = [xx, cc, 0];
      } else if (hue >= 2 && hue <= 3) {
        rgb = [0, cc, xx];
      } else if (hue >= 3 && hue <= 4) {
        rgb = [0, xx, cc];
      } else if (hue >= 4 && hue <= 5) {
        rgb = [xx, 0, cc];
      } else if (hue >= 5 && hue <= 6) {
        rgb = [cc, 0, xx];
      } else {
        rgb = [0, 0, 0];
      }

      var mm = ll - 0.5 * cc;
      return [ rgb[0] + mm, rgb[1] + mm, rgb[2] + mm];
    };



    //https://stackoverflow.com/questions/39118528/rgb-to-hsl-conversion
    //this needs license and proofreading
    /**
     * Converts an RGB color value to HSL. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes r, g, and b are contained in the set [0, 255] and
     * returns h, s, and l in the set [0, 1].
     *
     * @param   Number  r       The red color value
     * @param   Number  g       The green color value
     * @param   Number  b       The blue color value
     * @return  Array           The HSL representation
     */
    //ns.rgbToHsl = function(r, g, b) {
    ns.rgb2hsl = function(r, g, b) {
      r /= 255, g /= 255, b /= 255;

      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
      }

      return [ h, s, l ];
    }



}) ();



//https://stackoverflow.com/questions/415160/best-method-of-instantiating-an-xmlhttprequest-object
//It looks like MS started common way since IE7:
//  https://en.wikipedia.org/wiki/Ajax_(programming)#History
//  mdn: supported versions
( function () {
	var ns = window.b$l = window.b$l || {};
    ns.ajax = createAjaxFramework();

    //000000000000000000000000
    return;
    //000000000000000000000000



    

	function createAjaxFramework()
    {
		var ajy = {};
		var xml = null;
		if( typeof XMLHttpRequest === 'undefined' )
        {
            alert( 'no ajax available in the browser' );
            return;
        }
		xml = new XMLHttpRequest();
		if( xml.overrideMimeType )
		{
			xml.overrideMimeType('text/xml'); //for quirky FF or FireBug.
		}
		ajy.xml = xml;

		ajy.send = function ( ajaxURL, method, onchange, onerror )
		{
			var flag = true;
			method = method || 'GET';

			var onchangeWrap = function ( ajy ) 
			{
				if ( xml.readyState === 4 ) 
				{
					if( xml.status === 200 )
					{
						onchange( ajy );
					}else{
                        onerror && onerror( 'Ajax problems with URL ' +
                                 ajaxURL );
					}
				}
			};
			var request = function () 
			{
				try{ 
					xml.open( method, ajaxURL, flag );  
					xml.send( null );
				}catch ( e ) {	//	TODM
					//Give up.
					//xml.send(null);
				}
			};
			xml.onreadystatechange = function() { onchangeWrap( ajy ); };
			request();
		};    
        return ajy;
	}

})();

( function() {
	var ns	    = window.b$l;
    var nssvg   = ns.sn( 'svg' );
    var svgNS   = "http://www.w3.org/2000/svg";





    ///Updates svg-shape. Svg-shape creates before update if missed in arg.
    ///Optional Input:
    ///     arg.svgel - element to be updated
    ///     arg.parent
    ///     arg.type
    ///     arg.style
    ///     and other attributes in form "key"-"value"
    ///Returns new or updated svgel - svg element
	nssvg.u = function( arg )
    {
        if( !arg.svgel ) {
            var svgel = document.createElementNS( svgNS, arg.type );
            //protects from duplicate attachment
            if( arg.parent ) arg.parent.appendChild( svgel );
        } else {
            var svgel = arg.svgel;
        }

        Object.keys( arg ).forEach( function( key ) {
 
            //--------------------------------------
            // //\\ ignores 'parent' and 'type'
            //      properties which were used above
            //      and leaves the loop
            //--------------------------------------
            //.ignores these properties
            if( key === 'parent' || key === 'type' || key === 'text' ) return;
            //--------------------------------------
            // \\// ignores 'parent' and 'type'
            //--------------------------------------

            //-------------------------------------
            // //\\ sets syle properties and leaves
            //-------------------------------------
            if( key === 'style' ) {
                var style = arg.style;
                if( style ) {
                    var stl = svgel.style;
                    Object.keys( style ).forEach( function( key ) {
                        stl[ key ] = style[ key ];
                    });
                }
                return;
            }
            //-------------------------------------
            // \\// sets syle properties and leaves
            //-------------------------------------

            //-------------------------------------
            // //\\ sets remaining attributes
            //-------------------------------------
            var val = arg[ key ];
            if( val || val === 0 ) {
                // //\\ adds a piece of sugar into CSS:
                //      removes excessive digits from CSS:
                //      assuming that scale of svg will be > 100px
                if( arg.type === 'circle' ) {
                    if( ( key==='cx' || key==='cy' || key==='r' ) &&
                        typeof val === 'number'
                    ) {
                        val = val.toFixed(3);  
                    }
                }
                // \\// adds a piece of sugar into CSS
                //// val is not '' and not undefined
                svgel.setAttributeNS( null, key, val );
            }
            //-------------------------------------
            // \\// sets remaining attributes
            //-------------------------------------
        });
        return svgel;
    };


    ///Input: arg.pivots are pivot points
    nssvg.polyline = function( arg )
    {
        var pivotsStr = arg.pivots.reduce( function( acc, point ) {
                if( acc ) { acc += ' '; }
                return acc += point[0].toFixed(2) + ',' + point[1].toFixed(2);
            },
            ''
        );
        return nssvg.u({
            svgel : arg.svgel,
            parent : arg.parent,
            type : 'polyline',
            points : pivotsStr,
            style : arg.style,
            stroke : arg.stroke || 'rgba( 0,0,0, 1 )', 
                //must be transparent bs stroke or fill are often exclusive


            fill : arg.fill || 'transparent',
            'stroke-width' : arg[ 'stroke-width' ] || 1
        });
    };




    ///====================================
    ///Creates or updates svg-text element
    ///====================================
    ///Optional Input:
    ///     arg.svgel   //creates if missed
    ///     arg.parent  //attaches to if supplied
    ///     arg.text
    ///     arg.x
    ///     arg.y
    ///     arg.style
    ///Returns: svg-element
    nssvg.printText = function( arg )
    {   
        arg.type = 'text';
        var svgEl = nssvg.u( arg );
        if( arg.text ) {
            //https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
            //https://stackoverflow.com/questions/4282108/how-to-change-svg-text-tag-using-javascript-innerhtml
            svgEl.textContent = arg.text;
        }
        return svgEl;
    }

}) ();



( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var methods     = sn('methods');

    methods.loadScripts = loadScripts;
    //000000000000000000000000000000
    return;
    //000000000000000000000000000000







    //===============================================================================
    // //\\ microAPI to load list of scripts
    //
    //      Loads scripts from list and calls callbacks per
    //      scripts and per list-completion
    //
    //      Every time this function is called it manages new scripts list separately
    //      from other calls lists
    //
    //      Input: scriptList
    //                  scriptItem.src - link or path
    //                  scriptItem.cb - optional callback for individual image load
    //             lastCb - optional callback called when all images loaded
    //===============================================================================
    function loadScripts( scriptList, lastCb )
    {
        var completionCount = 0;

        scriptList.forEach( function( scriptItem, ix ) {

            //https://developer.mozilla.org/en-US/docs/Web/HTTP/
            //      Basics_of_HTTP/MIME_types#JavaScript_types
            type = scriptItem.type || 'text/javascript';
            var scrip = document.createElement('script');
            scrip.onload = function() {
                completionCount++;
                //ccc( completionCount + ' loaded ' + scriptItem.src );
                scriptItem.cb && scriptItem.cb( loadedItem );
                checkCompletion();
            }
            document.head.appendChild( scrip );
            //https://medium.com/@vschroeder/javascript-how-to-execute-code-from-an-
            //asynchronously-loaded-script-although-when-it-is-not-bebcbd6da5ea
            scrip.src = scriptItem.src;
        });
        return; //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr

        function checkCompletion()
        {
            if( completionCount === scriptList.length ) {
                lastCb && lastCb();
            }
        }
    }
    //===============================================================================
    // \\// microAPI to load list of images.
    //===============================================================================

}) ();


( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var nsmethods     = sn('methods');

    nsmethods.loadAjaxFiles = loadAjaxFiles;
    //000000000000000000000000000000
    return;
    //000000000000000000000000000000







    //===============================================================================
    // //\\ microAPI to load list of files
    //===============================================================================
    function loadAjaxFiles( filesList, lastCb )
    {
        var completionCount = 0;
        var loadedFiles = [];
        var loadedFilesById = {};

        filesList.forEach( function( fileItem, ix ) {

            var xml = new XMLHttpRequest();
			try{ 
				xml.open( 'GET', fileItem.link, true );  
				xml.send( null );
			    xml.onreadystatechange = processIfGood;
			}catch ( e ) {	//	TODM
				//Give up.
                completionCount++;
                checkCompletion( fileItem );
			}
            function processIfGood()
            {
				if ( xml.readyState === 4 ) 
				{
					if( xml.status === 200 )
					{
						fileOnLoad();
					} else {
                        //Give up.
                        completionCount++;
                        checkCompletion( fileItem );
                        //onerror && onerror( 'Ajax problems with URL ' +
                        //         ajaxURL );
					}
				}
            }

            function fileOnLoad()
            {
                var loadedItem = { text:xml.responseText, fileItem:fileItem };
                //ccc( 'success: ', loadedItem );
                loadedFiles.push( loadedItem );
                if( fileItem.id ) {
                    loadedFilesById[ fileItem.id ] = loadedItem;
                }
                completionCount++;
                //ccc( completionCount + ' loaded ' + fileItem.src );
                fileItem.cb && fileItem.cb( loadedItem );
                checkCompletion( fileItem );
            }
        });
        return; //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr

        function checkCompletion( fileItem )
        {
            if( completionCount === filesList.length ) {
                lastCb && lastCb( loadedFilesById, loadedFiles );
            }
        }
    }
    //===============================================================================
    // \\// microAPI to load list of files
    //===============================================================================

}) ();


(function() {
    var ns          = window.b$l;
    var sn          = ns.sn;
    var cssmods     = sn('cssModules');
    var THIS_MODULE = 'reset';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;



// //\\ css /////////////////////////////////////////
var ret = `


    /* http://meyerweb.com/eric/tools/css/reset/
       v2.0 | 20110126
       License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
	    margin: 0;
	    padding: 0;
	    border: 0;
	    font-size: 100%;
	    font: inherit;
	    vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
	    display: block;
    }
    body {
	    line-height: 1;
    }
    ol, ul {
	    list-style: none;
    }
    blockquote, q {
	    quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
	    content: '';
	    content: none;
    }
    table {
	    border-collapse: collapse;
	    border-spacing: 0;
    }



`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns          = window.b$l;
    var sn          = ns.sn;
    var cssmods     = sn('cssModules');

    var fapp        = sn('fapp' ); 
    var sapp        = sn('sapp');
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);



    ///application-wide helper
    cssmods.calculateTextPerc = function( mediaPerc ) {
        //todo 
        //100 - mediaPerc - NNN
        //is a hack
        //...NNN like 15 breaks app-CSS-floating model
        //...NNN like 6 causes flicker ...
        //ps bs a CSS/JS loop when CSS causes resize, JS catches resize and changes CSS
        return 100 - mediaPerc - 15; 
    };
    cssmods['main-sapp'] = function( cssp, conf ) {
        var colorLight = conf.css['color-light']; 
        var mediaPerc = sconf.mediaDefaultWidthPercent;
        var textPercStr = cssmods.calculateTextPerc( mediaPerc ).toFixed(2) + '%';

        if( fconf.ESSAY_PANE_IS_BEFORE_MEDIA_IN_HTML ) {
            var essayPaneFloat = 'float : ' +
            ( conf.model_float_dir === 'right' ? 'left' : 'right' ) + ';';
            var mediaPaneFloat = '';
        } else {
            var mediaPaneFloat = 'float : ' + conf.model_float_dir + ';';
            var essayPaneFloat = '';
        }            


        var ret =


        // //\\ css /////////////////////////////////////////
        `
    /* @import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,800,900"); */

    /******************************************/
    /* //|| page primary sections             */
    /******************************************/
    .bsl-approot {
        width:100%;
        margin:0;
        padding:0;
    }

    .bsl-approot svg text {
        font-family : MJXc-TeX-math-I, MJXc-TeX-math-Ix, MJXc-TeX-math-Iw;
    }

    /* vital */
    /*
    .bsl-menu-filler { 
        height: ${fconf.attach_menu_to_essaion_root ? 65 : 90}px;
    }
    */

    /*================================*/
    /* //|| media pane                */
    /*================================*/
    .bsl-media-superroot {
        ${mediaPaneFloat}
        position    :relative;
        float       :left;
        display     :inline-block;
        height      :auto;

        padding     :0;
        margin      :0;
        overflow    :visible;
    }

    .bsl-media-root {
        clear       :both; /* clears against media-top-controls */
        position    :relative;
        display     :block;

        /* todm: simpler solution: add padding to parent, 21px */
        left        :${sconf.main_horizontal_dividor_width_px}px;
        padding     :0;
        margin      :0;
        text-align  :center;
        font-family :Montserrat,arial,helvetica,san-serif;
        overflow    :visible;
    }

    /* enables original-figure-picture disappearance */
    /* at version 1112, restored by client request */
    .bsl-bg-image.in-study {
        opacity:0;
        transition: opacity 1s ease;
    }

    /*
    .bsl-bg-image.disabled {
        display : none;
    }
    */
    /*================================*/
    /* //|| bsl-media                 */
    /*================================*/
    .bsl-media {
        position:absolute;
        width:100%;
        left:0;
        top:0;
        opacity:1;
        z-index:10;
    }

    .bsl-bg-image {
        width:100%;
        left:0;
        top:0;
        z-index:9;
    }

    /* https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting */
    /* this really solved firefox problem of "shadow-dragging-object"
       the problem tested and logged in 
       83-current-svg-firefox-problems.zip
       as of June 12, 2019 ( a year later we don't see this problem in FF )
       circle.movable { user-select: none; .... 
    */
    .bsl-media text {
      -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
         -khtml-user-select: none; /* Konqueror HTML */
           -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                      supported by Chrome and Opera */
    }
    /*================================*/
    /* ||// bsl-media                 */
    /* ||// media pane                */
    /*================================*/


    /*---------------------------*/
    /* //\\ horizontal resizer   */ 
    /*---------------------------*/
    #bsl-resizable-handle {
      display: flex;
      align-items: center;
      left: 0px;
      top: 0;
      padding: 0 8px;
      position: absolute;
      height: 100%;
      cursor: pointer;
    }
    #bsl-resizable-handle:hover {
      background: ${colorLight};
    }
    .brc-slider-draggee.dividor:hover:after {
        background-color: transparent;
    }        

    /* patch: should be nicely disabling divide-panes-functionality todm */
    /*
    #bsl-resizable-handle {
        top:-300%;
    }
    */
    /*---------------------------*/
    /* \\// horizontal resizer   */ 
    /*---------------------------*/




    /*================================*/
    /* //|| essay pane                */
    /*================================*/
    .bsl-text-widget {
        ${essayPaneFloat}
        position        :relative; /* does not help ... no difference */
        padding         :10px;
        padding-left    :5px;
        padding-right   :20px;

        width           :${(conf.exegesis_floats && 'auto') ||
                            textPercStr };
        overflow-y      :auto;
        margin          :0;
        overflow-x      :hidden; /*patch for css-opacity-transition*/
        background-color:${conf.css.exegesisBackgroundColor};
    }
    /*================================*/
    /* ||// essay pane                */
    /*================================*/






    /*========================================*/
    /* //|| mobile                            */
    /*========================================*/
    @media (max-width: ${fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD}px) {

        .bsl-approot {
            /* solves the problem of double y-scroll-bar and truncated legend:
               todm: needs other solution, padding is a patch ...
            */
            padding-bottom:40px;
        }

        /* todm: this "double-selector" is a poor practice */
        #bsl-media-superroot.bsl-media-superroot {
            width       :94%;
            height      :auto;
            margin-left :3%;
            margin-right:3%;
            float:none;
        }
        #bsl-resizable-handle {
            display: none;
        }
        .bsl-media-root {
            width       :100%;
            left        :0;
        }
        /* todm: this "double-selector" is a poor practice */
        #bsl-text-widget.bsl-text-widget {
            width       :94%;
            height      :auto;
            margin-right:3%;
            margin-left: 2%;
            margin-bottom: 20px;
        }
    }
    /*========================================*/
    /* ||// mobile                            */
    /* ||// page primary sections             */
    /******************************************/
    `;





/*========================================*/
/* //\\ main-legend                       */
/*========================================*/
ret += `

    .bsl-legend-root {
        padding-left : 30px;
        padding-right : 10px;
    }

    .main-legend td {
        text-align:center;
    }

    @media only screen and (max-width: ${fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD}px) {
        .main-legend.hidden {
            display:none;
        }
    }

    /* visibility per model-mode */
    .theorion--claim .main-legend.proof {
        display:none;
    }
    /* visibility per model-mode */
    .theorion--proof .main-legend.claim {
        display:none;
    }

    .main-legend td {
        padding:1px;
    }
    .main-legend {
        table-layout:fixed;
        margin:auto;
    }


    /*====================================*/
    /* //\\ table formatter               */
    /*====================================*/
    .main-legend td {
        text-align:left;
    }
    .main-legend td.table-caption {
        padding-bottom:4px;
        text-align:center;
        font-weight:bold;
    }
    .main-legend td.align-to-right,
    .main-legend td.value {
        text-align:right;
    }    
    .main-legend .eq-sign {
        text-align:center;
    }    

    
    /*------------*/
    /* //\\ proof */
    /*------------*/
    .main-legend.proof {
        border-collapse: separate;
        border-spacing: 10px 0px;
    }
    .main-legend.proof {
        width:370px;
    }
    .proof.row1 {
        opacity:0;
    }
    .proof.row1 td:nth-child(4),
    .proof.row1 td:nth-child(1) {
        width:12%;
    }
    .proof.row1 td:nth-child(8),
    .proof.row1 td:nth-child(5),
    .proof.row1 td:nth-child(2) {
        width:4%;
    }
    .proof.row1 td:nth-child(9),
    .proof.row1 td:nth-child(6),
    .proof.row1 td:nth-child(3) {
        width:14%;
    }
    .proof.row1 td:nth-child(7) {
        width:22%;
    }
    /*------------*/
    /* \\// proof */
    /*------------*/


    /*------------*/
    /* //\\ claim */
    /*------------*/
    .claim.row1 {
        opacity:0;
    }
    .claim.row1 td:nth-child(1) {
        width:52.5%;
    }
    .claim.row1 td:nth-child(2) {
        width:15%;
    }
    .claim.row1 td:nth-child(3) {
        width:22.5%;
    }
    .main-legend.claim {
        width:140px;
    }
    /*------------*/
    /* \\// claim */
    /*------------*/


    /*====================================*/
    /* \\// table formatter               */
    /*====================================*/

    .bsl-media-root.main-legend-disabled .main-legend {
        display:none;
    }

`;
    
if( conf.exegesis_floats ) {
    ret +=`
        .main-legend {
            position:absolute;
            left:32%;
            top:60%;
        }
        .main-legend td {
            font-size:12px;
        }
    `;

} else {
    ret +=`
        .main-legend {
            position:static;
            width:100%;
        }
        .main-legend td {
            font-size:14px;
        }
    `;
}


ret +=`

    @media (max-width: 900px) {
        .main-legend td {
            font-size:11px;
        }
    }

    @media (max-width: 850px) {
        .main-legend td {
            font-size:10px;
        }
    }

    @media (max-width: 800px) {
        .main-legend td {
            font-size:13px;
        }
    }

    @media (max-width: 600px) {
        .main-legend {
            position:static;
            width:100%;
        }
    }
    `;


    //==================================
    // //\\ model help
    //==================================
    ret +=`
    .model-help {
        cursor: pointer;
        opacity:1;
    }
    .video-help-button {
        cursor: pointer;
        opacity:0.2;
    }
    .video-help-button:hover,
    .model-help:hover {
        opacity:1;
    }
    `;
    //==================================
    // \\// model help
    //==================================


    //==================================
    // //\\ video
    //==================================
    ret +=`

    .bsl-showreel-video-wrap {
        position:relative;
        margin-bottom:10px;
        background-color:transparent; /*#DDDDDD;*/
        left        :50%;
        transform   :translate(-50%,0%);
    }

    .bsl-showreel-video,
    .bsl-showreel-video-iframe{
        position:absolute;
        width:96%;
        height:96%;
        left:50%;
        top:50%;
        transform   :translate(-50%,-50%);
        background-color:#DDDDDD;
    }

    .bsl-close-html-button {
        position:absolute;
        width:20px;
        height:20px;
        border-radius:15px;
        right:-20px;
        top:10px;
        padding-top:5px;
        padding-left:9px;
        color:white;
        font-size:16px;
        font-weight:bold;
        background-color:rgba(0,0,0,1);
        cursor:pointer;
        opacity:1;
        z-index:1000;
    }
    `;
    //==================================
    // \\// video
    //==================================




    //==================================
    // //\\ video icon
    //==================================
    ret +=`
        .video-icon-img-container > img {
            position:relative;
            /* version 1685: because of not perfect design,
               the jerk of caption happens when this number
               is greater than 18px
            */
            width:18px;
            top:1px;
        }
        .video-list-popup .video-icon-img-container > img {
            top:2px;
            vertical-align:middle;
        }

    `;
    //==================================
    // \\// video icon
    //==================================


    ret +=`
        .hidden {
            visibility : hidden;
        };
    `;

/*====================================*/
/* \\// main-legend                   */
/*====================================*/
// \\// css /////////////////////////////////////////





return ret;
};
})();



(function() {
    var ns      = window.b$l;
    var sn      = ns.sn;
    var cssmods = sn('cssModules');
    var sapp    = sn('sapp');


    var THIS_MODULE = 'base';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;

        var body_DesktopOverflow = fconf.sappId === 'home-pane' ?
                                   'overflow-x:hidden' : 'overflow:hidden';

// //\\ css /////////////////////////////////////////
var ret = `

    /******************************************/
    /* //\\\\ html, body                      */
    /******************************************/
    html, body
    { 
        /* //\\ added for lemma9 */
        width:100%;
        height:100%;
        padding:0;
        margin:0;
        border:none;
        /* \\// added for lemma9 */

        background-color:${ccs['color-light']};
        font-size:15px; //this defines what 1rem is
    }

    /* //\\ added for lemma9 */
    body
    { 
        ${body_DesktopOverflow}
    }
    @media only screen and (max-width:${fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD}px) {
        body
        { 
            overflow-y:auto;
            overflow-x:hidden;
        }
    }
    /* \\// added for lemma9 */

    


    /******************************************/
    /* \\// html, body                        */
    /******************************************/


    a:link{
        color:${ccs['color-main']};
    }

    a:visited{
        color:${ccs['color-main']};
        
    }

    @media only screen and (max-width:720px){
        .btn--how-to{
            display: none !important; /* tod? */
        } 
    }

`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');

    var THIS_MODULE = 'typography';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;


// //\\ css /////////////////////////////////////////
var ret = `


    

    /*fonts*/
    body{
        color: ${ccs['color-medium-grey']};
        font-family: 'Helvetica',sans-serif;
    }
    h1,h2,h3,h4,h5,h6{
        color: ${ccs['color-main']};
        font-weight:200;
        font-family: 'Goudy Old Style', 'Garamond','Times', serif;
    }
    h1{
        font-size: 48px;
    }
    h2{
        font-size: 24px;
    }
    a{
        text-decoration: none;
    }

    p{
        font-size: 1rem;
        line-height: 1.75;
    }

    b {
        font-weight : bold;
    }

`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'home-pane';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;
        var colorMain = ccs['color-main'];
        var colorWhite = ccs['color-white'];
        var colorMediumGrey = ccs['color-medium-grey']; 
        var colorLightGrey = ccs['color-light-grey']; 
        var colorPaleBlue = ccs['color-pale-blue']; 
        var colorStoneBlue = ccs['color-stone-blue']; 
        var colorLight = ccs['color-light']; 
        var borderRadius = ccs['border-radius']; 








        // //\\ css /////////////////////////////////////////
        var ret = `

    /*====================================================== 
       //|| home page generics
      ======================================================*/
    #home-pane {
      width:100%;
      padding-top: 80px;
      background-color: ${colorMain};
    }

    .hp-section-wrap {
      width: calc(100vw - 80px);
      margin: auto; }

      #home-pane h1, #home-pane h2 {
        color: ${colorWhite}; }

      #home-pane h2 {
        font-size: 28px;
        margin-bottom: 24px; }
    /*====================================================== 
       ||// home page generics
      ======================================================*/





    /*====================================================== 
       //|| home-page header
      ======================================================*/
    header {
      position:relative;  
      grid-area: header;
      padding: 0 0;
      margin-bottom: 56px;
    }


    /*====================================================== 
       //|| front-page master caption and read first button
      ======================================================*/
    .landing-text {
      padding-top: 0px;
      position: relative;
      width: 100%;
      z-index: 1;
    }



    /*====================================================== 
       //|| front-page master caption
      ======================================================*/
    .landing-title {
      font-family: "essonnes-display", 'Garamond','Times', serif;
      font-weight: 300;
      font-size: 58px;
      color: ${colorWhite};
      letter-spacing: 1.32px;
      line-height: 78px;
      margin-bottom: 16px;
      grid-area: title; }
      .landing-title span {
        font-style: italic; }
    /*====================================================== 
       ||// front-page master caption
      ======================================================*/




    /*====================================================== 
       //|| front-page master sub-caption
      ======================================================*/
    /*
    .sub-title {
      font-family: 'Goudy Old Style', 'Garamond','Times', serif;
      font-size: 16px;
      font-style: italic;
      color: ${colorWhite};
      margin-bottom: 24px;
      max-width: 500px;
      width: 60%; }
    */
    /*====================================================== 
       ||// front-page master sub-caption
      ======================================================*/



    /*====================================================== 
       ||// front-page master caption and read first button
      ======================================================*/
    .newton-img {
      position: absolute;
      top: 72px;
      z-index: 0;
      right: 96px; }
    /*====================================================== 
       ||// home-page header
      ======================================================*/




    /*====================================================== 
       //|| table of contents
      ======================================================*/
        .landing-table-of-contents {
          position: relative;
          grid-area: lemmas;
          padding: 80px 0;
          padding-top: 150px;
        }


      .landing-table-of-contents .content-book-title,
      .landing-table-of-contents ul a {
        color: white;
        font-size: 20px;
        font-family: 'Goudy Old Style', 'Garamond','Times', serif;
        padding-bottom: 8px;
        display: flex;
        justify-content: space-between;
        transition: all .6s;
        width: 100%;
      }

        .landing-table-of-contents ul a:hover {
          border-bottom: 1px solid white;
          transition: all .2s; }
      .landing-table-of-contents ul .table-tag {
        font-family: 'Helvetica', sans-serif;
        font-size: 14px;
        font-weight: 300; }
      .landing-table-of-contents ul .disabled {
        opacity: .5; }
        .landing-table-of-contents ul .disabled:hover {
          border-bottom: 1px solid rgba(255, 255, 255, 0.3); }
    /*====================================================== 
       ||// table of contents
      ======================================================*/





    /*====================================================== 
       //|| how to
      ======================================================*/
    .how-to {
      padding: 64px 0;
      text-align: center;
      background: #E9E2DA;
      grid-area: howTo; }
      .how-to h2 {
        color: ${colorMain} !important;
        text-align: left; }
      .how-to-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 12px; }
      .how-to__cell {
        padding: 0 24px; }
        .how-to__cell__image {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 160px;
          margin-bottom: 12px; }
        .how-to__cell h4 {
          font-size: 24px;
          color: ${colorMain} !important; }
    /*====================================================== 
       ||// how to
      ======================================================*/






    /*====================================================== 
       //|| about
      ======================================================*/
    .about {
      color: ${colorWhite};
      font-family: 'Goudy Old Style', 'Garamond','Times', serif;
      margin-top: 128px; }
      .about__text {
        width: 100%;
        margin-right: 10%; }
        .about__text p {
          font-size: 18px;
          line-height: 1.5; }
        .about__text h2 {
          margin-bottom: 12px;
          color: ${colorWhite}; }


      .about__author {
        width: 100%;
        margin-top:20px;
        color: ${colorWhite};
      }

        .about__author__text {
          font-size: 18px; }
        .about__author__image {
          color: ${colorWhite};
          clip-path: ellipse(72px 72px at center);
          -moz-clip-path: ellipse(72px 72px at center);
          -webkit-clip-path: ellipse(72px 72px at center); }


    .dd-label {
      font-family: 'Goudy Old Style', 'Garamond','Times', serif;
      background-color: rgba(0, 0, 0, 0.1);
      color: rgba(255, 255, 255, 0.6);
      padding: 8px; }
      .dd-label a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: underline; }
        .dd-label a:hover {
          color: white; }
    /*====================================================== 
       ||// about
      ======================================================*/





@keyframes mousemove {
  0% {
    transform: translateY(0px);
    opacity: 0; }
  25% {
    opacity: 1; }
  100% {
    transform: translateY(200px);
    opacity: 0; } }

/*~~~~~~~~~~~~~~~~~~~~
Media Queries
~~~~~~~~~~~~~~~~~~~~*/
@media only screen and (max-width: 720px) {

  .sub-title {
    width: 100%; }
  .how-to-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 12px;
    grid-row-gap: 80px; }


  .about {
    flex-direction: column; }
    .about .about__text {
      width: 100%; }
    .about .about__author {
      width: 100%;
      display: flex;
      flex-direction: row;
      text-align: left; }
      .about .about__author__image {
        transform: scale(0.8);
        clip-path: ellipse(72px 72px at center); } }

`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'inner-page';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;
        var colorMain = ccs['color-main'];
        var colorWhite = ccs['color-white'];
        var colorMediumGrey = ccs['color-medium-grey']; 
        var colorLightGrey = ccs['color-light-grey']; 
        var colorPaleBlue = ccs['color-pale-blue']; 
        var colorStoneBlue = ccs['color-stone-blue']; 
        var colorLight = ccs['color-light']; 
        var borderRadius = ccs['border-radius']; 





// //\\ css /////////////////////////////////////////
var ret = `

    /*
    .${cssp}-media-root {
      width: calc(100% - 90px) ;
    }
    */

    /*--------------------------------------
        //|| master pagination button
      -------------------------------------*/
    .master-pagination-btn {
        box-sizing: border-box;
        display:inline-block;

        background-color: ${colorWhite};
        border-radius: ${borderRadius};
        cursor: pointer;

        box-shadow: 0px 0 8px 0 rgba(32, 41, 54, 0.4);
        white-space : nowrap;

        text-align:center;

        height: 29px;
        margin: 0 16px 0 16px;
        padding: 5px 8px 2px 8px;
        transition: all .2s ease;
        z-index: 1002;
    }
    .master-pagination-btn img {
        width : 7px;
        opacity : 0.5;
        margin-left: 5px;
        margin-right: 5px;
        vertical-align:middle;
    }

    .master-pagination-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 0px 20px 0 rgba(32, 41, 54, 0.2);
        transition: all .2s ease;
    }
    .master-pagination-btn.current-lemma {
        transform: none;
        box-shadow: 0 0px 0px 0 rgba(32, 41, 54, 0.2);
    }

    .master-pagination-btn.non-displayed {
        display:none;
    }

    .middle-subnav-bar {
        margin:auto;
    }

    .home-button {
        width               : 175px;
        margin-left         : 35px;
        font-weight         : bold;
        color               : white;
        background-color    : #303946;
    }

    .home-button:hover {
        background-color    : #404956;
    }

    .home-button.is-hidden:hover,
    .home-button.is-hidden {
        font-weight         : normal;
        color               : ${colorMediumGrey};
        background-color    : white;
    }


    /*--------------------------------------
        ||// master pagination button
      -------------------------------------*/


    /*---------------------------------------------
        //|| Hover over the diagram to interact
      --------------------------------------------*/
    .help-box {
        float:left;
        margin-top:8px;
        color: ${colorMediumGrey};
        font-size: 12px;
        padding: 0 16px;
        border-radius: ${borderRadius};
        display: flex;
        align-items: center;
    }
    .help-box img {
        margin-right: 8px;
    }
    /*---------------------------------------------
        ||// Hover over the diagram to interact
      --------------------------------------------*/

`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'how-to';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;
        var colorMain = ccs['color-main'];
        var colorWhite = ccs['color-white'];
        var colorMediumGrey = ccs['color-medium-grey']; 
        var colorLightGrey = ccs['color-light-grey']; 
        var colorPaleBlue = ccs['color-pale-blue']; 
        var colorStoneBlue = ccs['color-stone-blue']; 
        var colorLight = ccs['color-light']; 
        var borderRadius = ccs['border-radius']; 





// //\\ css /////////////////////////////////////////
var ret = `



`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;

    var cssmods = sn('cssModules');
    var THIS_MODULE = 'nav-bar-and-drawer';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs             = fconf.css;
        var colorMain       = ccs['color-main'];
        var colorWhite      = ccs['color-white'];
        var colorMediumGrey = ccs['color-medium-grey']; 
        var colorLightGrey  = ccs['color-light-grey']; 
        var colorPaleBlue   = ccs['color-pale-blue']; 
        var colorStoneBlue  = ccs['color-stone-blue']; 
        var colorLight      = ccs['color-light']; 
        var borderRadius    = ccs['border-radius']; 





        // //\\ css /////////////////////////////////////////
        var ret = `

            .nav-bar {
                background:     transparent;
                display:        flex;
                align-items:    flex-start;
                width:          100%;
                padding-top:    20px;
                padding-bottom: 20px;
                top:            0px;
                z-index:        1010;
            }

        `;
        // \\// css /////////////////////////////////////////



        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'checkbox';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;
        var colorMain = ccs['color-main'];
        var colorWhite = ccs['color-white'];
        var colorMediumGrey = ccs['color-medium-grey']; 
        var colorLightGrey = ccs['color-light-grey']; 
        var colorPaleBlue = ccs['color-pale-blue']; 
        var colorStoneBlue = ccs['color-stone-blue']; 
        var colorLight = ccs['color-light']; 
        var borderRadius = ccs['border-radius']; 





// //\\ css /////////////////////////////////////////
var ret = `


.checkbox-wrap input[type="checkbox"] {
  opacity: 0;
  display: none; }


/* //\\\\ this block creates nice fancy checkboxes in data-legend */    

.checkbox-wrap label::before {
  background-color: ${colorPaleBlue};
  border: 2px solid ${colorLightGrey};
  border-radius: 2px;
  content: "";
  cursor: pointer;
  display: inline-block;
  height: 14px;
  width: 14px; }

/* this thing apparently makes these corner-like-rotated-borders
   simulating a check-mark */
.checkbox-wrap label::after {
  content: "";
  display: inline-block;
  height: 4px;
  width: 8px;
  border-left: 2px solid ${colorWhite};
  border-bottom: 2px solid ${colorWhite};
  transform: rotate(-45deg); }

.checkbox-wrap label {
  position: relative; }

.checkbox-wrap label::after {
  position: absolute; }

/*Checkmark*/
.checkbox-wrap label::after {
  left: 4px;
  top: 0px; }

/*Hide the checkmark by default*/
.checkbox-wrap input[type="checkbox"] + label::after {
  content: none; }

/*Unhide the checkmark on the checked state*/
.checkbox-wrap input[type="checkbox"]:checked + label::after {
  content: ""; }

/*Make check box color change on the checked state*/
.checkbox-wrap input[type="checkbox"]:checked + label::before {
  background-color: ${colorMain};
  border: 2px solid ${colorMain}; }

/*Adding focus styles on the checkbox*/
.checkbox-wrap input[type="checkbox"]:focus + label::before {
  outline: #3b99fc auto 5px; }

/* \\\\// this block creates nice fancy checkboxes in data-legend */    



/*~~~~~~~~~~~~~~~~~~~~
Styles for the mobile tabs
~~~~~~~~~~~~~~~~~~~~*/




`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'tabs';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;



// //\\ css /////////////////////////////////////////
var ret = `

    
    

    /*~~~~~~~~~~~~~~~~~~~~
    Exegesis-tabs.
    Styles for the mobile tabs
    ~~~~~~~~~~~~~~~~~~~~*/

    /* area-tab is invisible in desktop */
    .tabs .tab-areadesk {
        display:none;
    }
    @media (max-width: 800px) {
        /* area-tab is visible in mobile */
        .tabs .tab-areadesk {
            display:inline-block;
        }
    }

    .tab-section{
        width: calc(100%);
        order:2;
        height:40px;
        padding:0;
        grid-area: tabs;
    }

    .tab-section.desc__text{
        padding-bottom: 128px;
    }

    .tab-section__header{
        display:none;
    }

    .desc-tab {
        background-color: ${ccs['color-white']};
        padding: 16px;
        display: none;
        height:100%;
        margin-bottom:0;
        overflow:scroll;
        
    }
    .tabs {
        position: relative;
        background-color: #fff;
        border-bottom:1px solid ${ccs['color-light-grey']};
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .tabs:after {
        content: ' ';
        display: table;
        clear: both;
    }


    .tabs__tab {
        float: left;
        text-align: center;
    }

    .tabs__tab:first-child.active ~ .tabs__indicator{
        left: 0;
    }

    .tabs__indicator {
        position: absolute;
        bottom: -1px;
        left: 0;
        height: 1px;
        background-color: ${ccs['color-main']};
        transition: left .32s;
    }



    /*------------------------*/
    /* //\\ adjusts for media */
    /*------------------------*/
    .tabs__tab {
        width: 50%;
    }
    .tabs__tab:nth-child(2).active ~ .tabs__indicator {
        left: 0%;
    }
    .tabs__tab:nth-child(3).active ~ .tabs__indicator {
        left: 50%;
    }
    .tabs__indicator {
        width: 50%;
    }
    @media (max-width: 800px) {
        .tabs__tab {
            width: 33.333%;
        }
        .tabs__tab:nth-child(2).active ~ .tabs__indicator {
            left: 33.333%;
        }
        .tabs__tab:nth-child(3).active ~ .tabs__indicator {
            left: calc(33.333% * 2);
        }
        .tabs__indicator {
            width: 33.333%;
        }
    }
    /*------------------------*/
    /* \\// adjusts for media */
    /*------------------------*/



    .Tab > a {
        //display: block;
        padding: 10px 12px;
        text-decoration: none;
        color: ${ccs['color-light-grey']};
        transition: color .15s;
    }
    .Tab.active > a {
        color: ${ccs['color-main']};
    }
    .Tab:hover > a {
        color: rgba(${ccs['color-main']},.8);
    }


`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'menu-on-top';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ret = 



// //\\ css /////////////////////////////////////////
`


    /*=======================================
     menu top leaf properties
     =======================================*/
    .bsl-menu .menu-teaf {
        position        :relative;
        display         :inline-block;
        float           :right;
        border-radius   :10px;

        /*
        this was vital at some CSS
        -webkit-margin-before: 0em;
        -webkit-margin-after: 0em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        -webkit-padding-start: 0px;
        -moz-padding-start: 0px;
        */
        padding:0;
        margin:0;
        margin-right:10px;
    }




    /* //|| common handle features */
    /* .shape sets common decorational properties for litem, shadows, and handle
       and aligns them
    */
    .bsl-menu .shape {
        border          :1px solid black;
        border-radius   :15px;
        white-space     :nowrap;
    }

    /*-------------------*/
    /* //|| radio circle */
    /*-------------------*/
    .shadow .radio-circle,
    .litem .radio-circle,
    .shuttle .radio-circle {
        display         :inline-block;
        /* border          :1px solid black; shifts radio up ... why? */
        border-radius   :11px;
        width           :11px;
        height          :11px;
        margin-left     :5px;
        margin-right    :4px;
        background-image:radial-gradient(
            farthest-corner at 3px 3px,
                rgb(230,230,230) 0%,
                rgb(230,230,230) 5%,
                rgb(180,180,180) 30%,
                rgb(80,80,80) 60%,
                rgb(0,0,0) 100%
        );
    }
    /*-------------------*/
    /* \\|| radio circle */
    /*-------------------*/
    /* \\|| common handle features */




    /*--------------------*/
    /* //|| fluid part    */
    /*--------------------*/
    .bsl-menu .litem.shape  {
        border-color    :transparent;
        background-color:transparent;
        margin          :0;
        margin-bottom   :3px;
        cursor          :pointer;
        opacity         :1;
    }        
    .litem .radio-circle {
        visibility:hidden;
    }
    .bsl-menu .litem .caption {
        display         :inline-block;
        position        :relative;
        font-size       :80%;
        padding-right   :5px;

        /* todm: this is hell-complex, but works making 
           caption vertically-centered in the radio-slot */
        top             :50%;
        transform       :translate(0%, -10%);
    }
    /*--------------------*/
    /* ||// fluid part    */
    /*--------------------*/







    /* /// was used to set background under shadow and handle
       /// todm is redundant ... shadow and handle can use z-index < 0
       /// holds shadow and handle
    */
    .bsl-menu .tleaf-decorations-container {
        position        :absolute;
        left            :0;
        top             :0;
        background-color:transparent;
        z-index:-1;
    }

    /* twin navitation controls: shadow and handle */
    .bsl-menu .shadow,
    .bsl-menu .shuttle {
        position        :absolute;
        width           :100%;
        background-color:#CCCCCC;
    }


    /* //|| shadow     */
    .bsl-menu .shadow {
        opacity         :0.5;
        z-index         :1;
    }
    /* ||// shadow     */


    /* //\\ moving handle     */
    .bsl-menu .shuttle {
        background-color:white;
        opacity         :1;
        z-index         :10;
    }
    /* \\// moving handle     */




    .litem:hover .radio-circle {
        visibility:visible;
    }
    .litem.chosen:hover .radio-circle {
        visibility:hidden;
    }





`;

// \\// css /////////////////////////////////////////





    return ret;
    }
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var sapp        = sn('sapp' ); 
    var sDomN       = sn('dnative', sapp);


    var cssmods = sn('cssModules');
    var THIS_MODULE = 'menu-on-left';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var theorionChildWidth = (100 / sDomN.theorionMenuMembersCount).toFixed();
        var aspectionChildWidth = (100 / sDomN.aspectionMenuMembersCount).toFixed();
        var leftTopLeafLength =
            ( sDomN.aspectionMenuMembersCount * fconf.LEFT_SIDE_MENU_ITEM_LENGTH ).toFixed();



    //-------------------------------
    // //\\ top of containers tree
    //-------------------------------
     var ret = `

    /* theorion and aspection */
    .leftside-menuholder
    .menu-teaf {
        position        :relative;
        display         :inline-block;
        padding         :0;
        margin          :0;
        vertical-align  :top;
        white-space     :nowrap;
        box-sizing      :border-box;
    }

    /* aspection rotator to vertical direction */
    .left-side-menu-rotator {
        position    :relative;
        left        :${fconf.LEFT_SIDE_MENU_OFFSET_X}px;
        float       :left;
        width       :${fconf.LEFT_SIDE_MENU_WIDTH}px;
        height      :300px;
        transform   :rotate(90deg);
        box-sizing  :border-box;
        transform-origin: 0px 0px;
    }


    /* aspection */
    .leftside-menuholder
    .menu-teaf.aspect {
        width       : ${leftTopLeafLength}px;
    }

    /* theorion */
    .leftside-menuholder
    .menu-teaf.theorion {
        width       : calc(100% - ${fconf.LEFT_SIDE_MENU_WIDTH+10}px);
    }

    /* original text */
    .leftside-menuholder
    .original-text {
        box-sizing      :border-box;
        width           :calc(100% - ${fconf.LEFT_SIDE_MENU_WIDTH+10}px);
        padding         :20px;
        vertical-align  :top;
    }
    
    /* //|| this takes higher specifity to override generic display:none property:
            all the troubles it takes is to make text unfading up slowly
    */
    div.leftside-menuholder
    div.original-text {
        //position:absolute;
        //display:inline-block;
        //height:0px;
        opacity:0;
    }
    div.leftside-menuholder
    div.original-text.chosen {
        display:inline-block;
        position:relative;
        //height:auto;
        opacity:1;
        /* todm make this happen: */
        transition :opacity 1s ease-in-out;
    }
    /* ||// this takes higher specifity to override generic display:none property */

    `
    //-------------------------------
    // \\// top of containers tree
    //-------------------------------

    



    //-------------------------------
    // //\\ common decorations
    //-------------------------------
    ret += `
    /* common shape which makes litem, shadows, and handle aligned */
    .leftside-menuholder
    .menu-teaf
    .shape {
        box-sizing      :border-box;
        width           :${theorionChildWidth}%;
        border          :1px solid #CCCCCC;
        border-radius   :10px;
        /* alignes with original-text border if any */
        /* alignes with original-text border if any 
        border-left     :1px solid black;
        border-top      :1px solid black;
        border-right    :1px solid black;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        */
    }

    .leftside-menuholder .menu-teaf.theorion .shape {
        width           :${theorionChildWidth}%;
    }
    .leftside-menuholder .menu-teaf.aspect .shape {
        width           :${aspectionChildWidth}%;
    }
    `;
    //-------------------------------
    // \\// common decorations
    //-------------------------------








    //-------------------------------
    // //\\ fluid part = li-item
    //-------------------------------
    ret += `

    .leftside-menuholder
    .shape.litem  {
        border-color    :transparent;
        background-color:transparent;
        margin          :0;
        cursor          :pointer;
        opacity         :1;
    }        

    .leftside-menuholder
    .shape.litem {
        display:inline-block;
        text-align:center;
    }

    .leftside-menuholder
    .litem .caption {
        display         :inline-block;
        width           :98%;
        position        :relative;
        font-size       :80%;
        font-weight     :bold;
        padding-right   :0;

        /* todm: this is hell-complex, but works making 
           caption vertically-centered in the radio-slot */
        top             :50%;
        transform       :translate(0%, -17%);
        text-align      :center;
        color           :#AAAAAA;
    }

    /* vertical shifts somehow different for theorion and aspec, so
       this CSS-entry tries to adjust aspect-top-menu-node-caption */
    .leftside-menuholder .aspect
    .litem .caption {
        /* todm: this is hell-complex, but works making 
           caption vertically-centered in the radio-slot */
        transform       :translate(0%, -10%);
    }

    /* //|| item is hovered */
    .leftside-menuholder .menu-teaf
    .litem:hover {
        border          :1px solid black;
        color           :black;
    }
    .leftside-menuholder .menu-teaf
    .litem:hover .caption
    {
        color           :#000000;
    }
    .leftside-menuholder .menu-teaf
    .litem.chosen .caption
    {
        color           :#555555;
    }
    /* ||// item is hovered */
    `;
    //-------------------------------
    // \\// fluid part = li-item
    //-------------------------------




    //-----------------------------
    // //\\ animated-decorations
    //-----------------------------
    ret += `

    /* /// todm what? ... was used to set background under shadow and handle
       /// todm is redundant ... shadow and handle can use z-index < 0
       /// holds shadow and handle
    */
    .leftside-menuholder
    .tleaf-decorations-container {
        box-sizing      :border-box;
        position        :absolute;
        left            :0;
        top             :0;
        width           :100%;
        background-color:transparent;
        z-index         :0;
        white-space     :nowrap;
    }

    .leftside-menuholder
    .tleaf-decorations-container .shape {
        /* fixes empty shapes with poor borders */
        height      :18px;
    }

    /* //|| shadow     */
    .leftside-menuholder .shadow {
        display         :inline-block;
        background-color:#CCCCCC;
        opacity         :0.5;
        z-index         :1;
    }
    /* ||// shadow     */
    `;


    //===========================
    // //\\ shuttle 
    //===========================
    ret += `

    .leftside-menuholder .shuttle {
        position        :absolute;
        background-color:white;
        opacity         :1;
        z-index         :10;
    }
    `;
    // //\\ setting up shuttle CSS for all possible menu leaf choices
    for( var ix=0; ix<sDomN.theorionMenuMembersCount; ix++ ) {
        ret += `
            .leftside-menuholder .theorion .shuttle-${ix} {
                left       :${theorionChildWidth*ix}%;
                transition :top 0.3s ease-in-out, left 0.5s ease-in-out;
            }
        `;
    }

    for( var ix=0; ix<sDomN.aspectionMenuMembersCount; ix++ ) {
        ret += `
            .leftside-menuholder .aspect .shuttle-${ix} {
                left       :${aspectionChildWidth*ix}%;
                transition :top 0.3s ease-in-out, left 0.5s ease-in-out;
            }
        `;
    }
    // \\// setting up shuttle CSS for all possible menu leaf choices
    //===========================
    // \\// shuttle 
    //===========================
    // \\// animated-decorations
    //-----------------------------

    return ret;
    }
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'essaion-pane';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ret = 



// //\\ css /////////////////////////////////////////
`

    .original-text {
        /* is this font really a fit? font-family :
           'Goudy Old Style', 'Garamond', Montserrat, 'Times', serif; */
        font-family : 'Helvetica',sans-serif;
        color       : ${fconf.css['color-medium-grey']};
        line-height : 1.3;
    }
    .original-text h2,
    .original-text h1 {
        margin  :0;
        font-weight:200;
        color:${fconf.css['color-main']};
    }
    .original-text {
        display     : none;
    }
    .original-text.chosen {
        display:inline-block;
    }
`;

// \\// css /////////////////////////////////////////





    return ret;
    }
})();



// //\\// file where to set plugin main configuration
( function() {
    var sn      = window.b$l.sn;
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);



    fconf.css =
    {
        //=======================
        // //\\ legacy CSS params
        //=======================
        //:UI Colors
        'color-main'        : '#202936',    //main color
        'color-white'       : '#ffffff',
        'color-medium-grey' : '#626D7E',    //Body Copy
        'color-light-grey'  : '#C5CAD4',    //Disabled text Rules
        'color-pale-blue'   : '#F4F6F9',    //switch
        'color-stone-blue'  : '#8091A8',    //accent text such as summary and helper text

        //.affects right pane numerical-model's background
        //.interacts with original-source figure picture, so should be white ...
        'color-light'       : 'white',      //'#FBFCFC',
 
       //:UI
        'border-radius'     : '5px',
        //=======================
        // \\// legacy CSS params
        //=======================

        //exegesis
        exegesisBackgroundColor : 'white'
    };

}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;
    var cssmods     = sn('cssModules');
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    cssmods.initSiteWideCSS = initSiteWideCSS;
    return; //00000000000000000000000000000000








    function initSiteWideCSS(cssp, fconf) 
    {

        //data-entry: put module names here in order
        `
            nav-bar-and-drawer
            checkbox
            tabs
            main-sapp
            menu-on-top
            essaion-pane
            menu-on-left
        `



        .split(/\r\n|\n/g)
        .forEach( function( modname ) {
            modname = modname.replace(/\s+/g,'');
            if( modname ) {
                ns.globalCss.addText(
                    decorateText( cssmods[ modname ]( cssp, fconf ), modname )
                );
            }
        });
    }





    function decorateText( text, modname )
    {
        return ` 
    /******************************************
       //\\\\ css module = ${modname}
    ******************************************/
    ${text}        
    /******************************************
       \\\\// css module = ${modname}
    ******************************************/
    `;
    }

}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;
    var cssmods     = sn('cssModules');
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    cssmods.initHomePageCSS = initHomePageCSS;
    //0000000000000000000000000000000000000000
    return;
    //0000000000000000000000000000000000000000








    function initHomePageCSS(cssp, fconf) 
    {

        //data-entry: put module names here in order
        `
            reset
            base
            typography
            home-pane
            inner-page
            how-to
        `

        .split(/\r\n|\n/g)
        .forEach( function( modname ) {
            modname = modname.replace(/\s+/g,'');
            if( modname ) {
                ns.globalCss.addText(
                    decorateText( cssmods[ modname ]( cssp, fconf ), modname )
                );
            }
        });
    }





    function decorateText( text, modname )
    {
        return ` 
    /******************************************
       //\\\\ css module = ${modname}
    ******************************************/
    ${text}        
    /******************************************
       \\\\// css module = ${modname}
    ******************************************/
    `;
    }

}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var cssp        = ns.CSS_PREFIX;
    var html        = sn('html');
    var rootvm      = sn('rootvm');

    var sapp        = sn('sapp' ); 
    var sDomN       = sn('dnative', sapp);

    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);

    html.buildCommonHTMLBody = buildCommonHTMLBody;
    //000000000000000000000000000000
    return;
    //000000000000000000000000000000



    

    function buildCommonHTMLBody()
    {
        //===================================
        // //\\ creates application root
        //===================================
        var fappRoot$ =
            fapp.fappRoot$ = $$
              .div()
              .cls( 'bsl-approot' )
              .to( document.body );
        //===================================
        // \\// creates application root
        //===================================
        

        //===================================
        // //\\ makes CSS testers
        //      we do this as soon as possible to enable the test service ...
        //===================================
        ns.create_mobile_tester( fappRoot$(),
                                 fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD );
        ns.create_mobile_tester( fappRoot$(),
                                 fconf.SMALL_DESKTOP_MEDIA_QUERY_WIDTH_THRESHOLD );
        //===================================
        // \\// makes CSS testers
        //===================================


        //==========================================
        // //\\ creates home page behind the scenes
        //==========================================
        //fapp.homePage$ = $$.cdt( 'bsl-home-pane', fappRoot$ );
        fapp.homePage$ = $$
              .div()
              .id( 'home-pane' )
              .cls( 'bsl-home-pane is-hidden' )
              //.to( document.body );
              .to( fappRoot$ );
        //==========================================
        // \\// creates home page behind the scenes
        //==========================================







        //==========================================
        // //\\ creates basic css
        //==========================================
        ns.globalCss.addText( `
            .bsl-home-pane {
                position : absolute;
                z-index : 100;
            }
            .bsl-home-pane {
                top : 0;
                left : 0;
                transition : left 1s ease;
            }
            .bsl-home-pane.is-hidden {
                left : -130%;
            }
        `);
        ns.globalCss.update();
        //==========================================
        // \\// creates basic css
        //==========================================


        //todm: must be appMode
        //sDomN.captionHTML$ = $$.c('h1'); //todm remove?

        //==================================================
        // //\\ page master menu
        //==================================================
        var ww = fconf.sappModulesList[ fconf.sappId ];
        var caption = ww.book + '.' + ww.caption + '.';

        var navBar$ = sDomN.navBar$ = $$.dc( 'nav-bar' )
            .to( fapp.fappRoot$ )
            //==================================================
            // //\\ builds home button
            //==================================================
            .ch(    
                sDomN.homeButton$ = $$
                .dc( "master-pagination-btn home-button is-hidden" )
                .html("Contents")
                .e( 'click', function() {
                      if( fapp.homePage$().className.indexOf( 'is-hidden' ) > -1 ) {
                            ////home-pane becomes visible
                            fapp.homePage$.removeClass( 'is-hidden' );
                            sDomN.homeButton$
                                .html( 'Back to the Lemmas' )
                                .removeClass( 'is-hidden' )
                                ;
                            fapp.fappRoot$.css( 'overflow', 'visible' );
                            document.body.style.overflow = 'visible';
                      } else {
                            fapp.homePage$.addClass( 'is-hidden' );
                            sDomN.homeButton$
                                .html( 'Contents' )
                                .addClass( 'is-hidden' )
                                ;
                            document.body.style.overflow = 'hidden';
                      }
                      return false;
                })
            )
            //==================================================
            // \\// builds home button
            //==================================================

            .ch( sDomN.middleNavBar$ = $$.dc( 'middle-subnav-bar' )
                //==================================================
                // //\\ builds lemmas' navigator
                //==================================================
                .ch(    
                    sDomN.leftButton$ = $$
                    .dc( "master-pagination-btn" )
                )
                .ch(
                    sDomN.midddleButton$ = $$
                    .dc( "master-pagination-btn current-lemma" )
                    .html( caption )
                )
                .ch(    
                    sDomN.rightButton$ = $$
                    .dc( "master-pagination-btn" )
                )
                //==================================================
                // \\// builds lemmas' navigator
                //==================================================
            );
        //==================================================
        // \\// page master menu
        //==================================================


        //==================================================
        // //\\ application version label
        //==================================================
        $$  .div()
            .to( document.body )
            .cls('test-version')
            .css('position', 'absolute')
            .css('bottom', '10px')
            .css('right', '10px')
            .css('color', 'grey')
            .css('font-size', '10px')
            .html('Version 0.' + fapp.version);
        //==================================================
        // \\// application version label
        //==================================================

    }

}) ();

( function() {
    var ns           = window.b$l;
    var $$           = ns.$$;
    var sn           = ns.sn;
    var fapp         = ns.sn('fapp' ); 
    var fconf        = ns.sn('fconf',fapp);
    var sconf        = ns.sn('sconf',fconf);

    var sapp         = sn('sapp');
    var html         = sn('html');

    html.buildHomePage = buildHomePage;
    //000000000000000000000000000000
    return;
    //000000000000000000000000000000







    function buildHomePage()
    {
        var coreText = '';
        var landingPath = window.location.pathname;

        //==================================================
        // //\\ header
        //==================================================
        $$.c('header').to( fapp.homePage$() ).html(`
            <div class="hp-section-wrap">
                <div class="landing-text">
                    <h1 class="landing-title">Interactive Illustrations
                        <br>
                        for Newton’s <span>Principia</span></h1>
                    <!--
                    <p class="sub-title"> 
                    </p>
                    -->
                </div>
            </div>
            <img class="newton-img" src="images/landing-img.jpg">
        `);
        //==================================================
        // \\// header
        //==================================================




        //==================================================
        // //\\ table of contents
        //==================================================
        var coreText =`
                <h2>Table of contents</h2>
                <ul>
                    <!--<li><a href="#">Lemma 1</a></li>-->
        `;

        var book = null;
        fconf.sappModulesArray.forEach( function( sappItem ) {
            if( sappItem.sappId === 'home-pane' ) return;
            if( book === null || book !== sappItem.book ) {
                book = sappItem.book;
                coreText += `
                    <li><div class="content-book-title">
                            <span class="table-title">${book}</span><br><br>
                        </div>
                    </li>
                `;
            }
            coreText += `
                <li><a href="${landingPath}?conf=sappId=${sappItem.sappId}">
                    <span class="table-title">&nbsp;&nbsp;&nbsp;${sappItem.caption}</span>
                </li>
            `;
        });
        coreText += `
             </ul>
             <!--END table of contents-->
        `;
        $$  .c('div').addClass('landing-table-of-contents hp-section-wrap').to( fapp.homePage$() )
            .html(coreText);
        //==================================================
        // \\// table of contents
        //==================================================


        //==================================================
        // //\\ how-to
        //==================================================
        coreText = `
            <div class="hp-section-wrap">
                <h2>Usage Guide</h2>
                <div class=" how-to-grid">
                <div class="how-to__cell">
                    <div class="how-to__cell__image">
                        <img src="images/switch.svg">
                    </div>
                    <h4>Translate</h4>
                    <p>Switch between Newton’s description and an informal translation</p>
                </div><!--END cell-->
                <div class="how-to__cell">
                    <div class="how-to__cell__image">
                        <img src="images/model.svg">
                    </div>
                    <h4>Interact</h4>
                    <p>Interact with the model to see the theory in practice.</p>
                </div><!--END cell-->
                <div class="how-to__cell">
                    <div class="how-to__cell__image">
                        <img src="images/resize.svg">
                    </div>
                    <h4>Resizable</h4>
                    <p>Click and drag to resize the area of you’d like.</p>
                </div><!--END cell-->
                </div>
            </div>
        `;
        $$  .c('div').addClass('how-to').to( fapp.homePage$() )
            .html(coreText);
        //==================================================
        // \\// how-to
        //==================================================







        //==================================================
        // //\\ about wrapper
        //==================================================
        coreText = `
                <div class="about__author">
                    <p class="about__author__text">
                        Programming by Konstantin Kirillov and John Scott.<br>
                        A User Interface Design by
                        <span class="dd-label">
                            <a href="http://theoddson.io">Darien Dodson</a>.
                        </span><br>
                        Welcome to project home: 
                        <span class="dd-label">
                            <a href="https://github.com/quadboston/Newton-Principia"
                               target="_blank">
                                github.com/quadboston/Newton-Principia</a>.
                        </span><br>
                        Produced by John Scott.
                        <span style="display:inlilne-block; float:right; right:10px;">
                            Version 0.${fapp.version}
                        </span>
                    </p>
                </div>
        `;
        var aboutWrapper$ = $$  .c('div').addClass('about hp-section-wrap').to( fapp.homePage$() )
            .html(coreText);
        //==================================================
        // \\// about wrapper
        //==================================================

    }
}) ();


( function() {
    var ns          = window.b$l        = window.b$l        || {};
    var fapp        = ns.fapp           = ns.fapp           || {};

    // //\\ updated automatically. Don't edit these strings.
    fapp.version =  2356; //application version
    // \\// updated automatically. Don't edit these strings.

}) ();

( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;    
    var rootvm      = sn('rootvm');

    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);
    var fmethods    = sn('methods',fapp);
    var d8d_p       = sn('d8d-point',fmethods);

    var sapp        = sn('sapp'); 
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD); //todm should be child of ss

    var detected_user_interaction_effect_DONE = false;
    sDomF.detected_user_interaction_effect = detected_user_interaction_effect;

    fmethods.createLemmaDom = createLemmaDom;
    //000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000







    //=========================================================
    /// create LemmaDom
    //=========================================================
    function createLemmaDom()
    {
        //==============================================================
        // //\\ essay and media panes
        //==============================================================
        for( wx=0; wx<2; wx++ ) {
            if( ( wx===0 && fconf.ESSAY_PANE_IS_BEFORE_MEDIA_IN_HTML ) ||
                ( wx===1 && !fconf.ESSAY_PANE_IS_BEFORE_MEDIA_IN_HTML ) ) {
                // //\\ creates essaion pane
                //      "essaion superroot"
                var w = cssp+'-text-widget';
                var wCls = w;
                if( fconf.attach_menu_to_essaion_root ) {
                    wCls += ' leftside-menuholder';
                }
                sDomN.essaionsRoot$ = $$.dict( w, wCls, fapp.fappRoot$ );
                // \\// creates essaion pane
            } else {
                //: creates media superroot
                var wCSS = cssp + '-media-superroot';
                var medSuperroot$ = sDomN.medSuperroot$ = $$.dict(
                    wCSS,
                    wCSS,
                    fapp.fappRoot$ );
            }
        }
        //==============================================================
        // \\// essay and media panes
        //==============================================================



        //==============================================================
        // //\\ model data legend
        //==============================================================
        sDomN.legendRoot$ = $$.dct( cssp + '-legend-root',
                                    fapp.fappRoot$ );
        //==============================================================
        // \\// model data legend
        //==============================================================

        sDomF.build_menu_top_leafs_placeholders();
        fmethods.createDividorResizer();
        fmethods.populate_mediaSupreRoot();
        
    }



    //===================================================================
    // //\\ this makes one-time effect of fading-out the original picture
    //===================================================================
    function detected_user_interaction_effect()
    {
        if( detected_user_interaction_effect_DONE ) return;
        detected_user_interaction_effect_DONE = true;

        //todm: this is not very well thought:
        //      sapp.dnative && sapp.dnative.bgImage$
        sDomN.bgImage$ && sDomN.bgImage$.addClass( 'in-study' );
    }
    //===================================================================
    // \\// this makes one-time effect of fading-out the original picture
    //===================================================================


}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;    
    var rootvm      = sn('rootvm');

    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);
    var fmethods    = sn('methods',fapp);
    var d8d_p       = sn('d8d-point',fmethods);

    var sapp        = sn('sapp'); 
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);
    var exegs    = sn('exegs', ssD);
    var bgImages    = sn('bgImages', ssD);



    fmethods.populate_mediaSupreRoot = populate_mediaSupreRoot;
    //000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000







    //=========================================================
    /// create LemmaDom
    //=========================================================
    function populate_mediaSupreRoot()
    {

        //--------------------------
        // //\\ top media controls
        //--------------------------
        var topMediaControls$ = sDomN.topMediaControls$ = $$.c( 'div' )
            .addClass( 'top-media-controls' )
            .to( sDomN.medSuperroot$ )
            ;
        var wwHelpOnTop$ = sDomN.helpBoxAboveMedia$ = $$.c( 'div' )
            .addClass( 'help-box' )
            .to( topMediaControls$() )
            ;
        sDomN.videoListPopup_button_onModelPane$ = $$
            .c('img')
            .addClass( "video-help-button" )
            .css('width','35px')
            .a( 'src', "images/camera-lightbulb.png" )
            .a( 'alt', "Watch videohelp" )
            .a( 'title', "Watch videohelp" )
            /*
            .e('mouseover', function() {
                sDomN.helpBoxText$.innerHTML = 'Watch videohelp';
            })
            */
            .to( wwHelpOnTop$() )
            ;
        sDomN.idleHelpButton$ = $$
            .c('img')
            .addClass( "model-help" )
            .a( 'src', "images/lightbulb.svg" )
            .a( 'alt', "Hover over the diagram to interact" )
            //.a( 'title', "Hover over the diagram to interact" )
            .to( wwHelpOnTop$() )
            ;
        sDomN.helpBoxText$ = $$
            .c('span')
            .addClass( "help-box__text" )
            .html('Hover over the diagram to interact')
            .to( wwHelpOnTop$() )
            ;
        //--------------------------
        // \\// top media controls
        //--------------------------

        //..........................
        // //\\ media root
        //..........................
        var medRoot$ = $$
            .c( 'div' )
            .addClass( cssp + '-media-root' )
            .addClass( 'model' )
            .to( sDomN.medSuperroot$ )
            ;
        var medRoot        = medRoot$();
        sDomN.medRoot$     = medRoot$;
        sDomN.medRoot      = medRoot;
        if( fconf.NAVIGATION_DECORATIONS_ALWAYS_VISIBLE ) {
            sDomN.medRoot$.addClass( 'active-tip' );
        }
        //..........................
        // \\// media root
        //..........................



        //..........................
        // //\\ video help
        //..........................
        // //\\ local video
        //. . . . . . . . . . . . . 
        sDomN.videoWrap$ = $$
            .c( 'div' )
            .css( 'display', 'none' )
            .addClass( cssp + '-showreel-video-wrap' )
            //.to( sDomN.medRoot )
            .to( sDomN.essaionsRoot$() )
            ;
        sDomN.localVideo$ = $$
            .c( 'video' )
            .css( 'display', 'none' )
            .addClass( cssp + '-showreel-video' )
            .a('muted','true')
            .a('controls','true')
            .a('preload','true')
            .to( sDomN.videoWrap$() )
            ;
        sDomN.localVideoSource$ = $$
            .c( 'source' )
            .a('type','video/mp4')
            .to( sDomN.localVideo$() )
            ;
        //. . . . . . . . . . . . . 
        // \\// local video
        //. . . . . . . . . . . . . 

        //..........................
        // //\\ iframed video
        //. . . . . . . . . . . . . 
        sDomN.iframedVideo$ = $$
            .c( 'iframe' )
            .css( 'display', 'none' )
            .addClass( cssp + '-showreel-video-iframe' )
            .a('frameborder','0')
            .a('webkitallowfullscreen','true')
            .a('mozallowfullscreen','true')
            .a('allowfullscreen','true')
            //.to( sDomN.medRoot )
            .to( sDomN.videoWrap$() )
            ;
        //. . . . . . . . . . . . . 
        // \\// iframed video
        //..........................

        //..........................
        // //\\ close-video button
        //. . . . . . . . . . . . . 
        sDomN.doCloseVideoHelp$ = $$
            .c( 'div' )
            .a('title','close video')
            .css( 'display', 'none' )
            .addClass( cssp + '-close-html-button' )
            .html('X')
            //.to( sDomN.medRoot )
            .to(sDomN.videoWrap$())
            ;
        //..........................
        // \\// close-video button
        //. . . . . . . . . . . . . 
    
        fmethods.create_video_help_manager();
        //..........................
        // \\// video help
        //..........................

        //..............................
        // //\\ study image and submodel
        //..............................
        var images = {};
        //top mode CSS: bsl-approot theorion--claim aspect--hypertext
        var imgCss = cssp +'-bg-image';
        var css = `
            .${cssp}-approot .${imgCss},
            .${cssp}-approot .${cssp}-media {
                display:none;
            }
        `;

        //todo img load scenarios: remove timeout from load/resize ...
        ns.eachprop( exegs, ( theor, tkey ) => {
            ns.eachprop( theor, ( aspect, akey ) => {
                var imgRk = aspect.imgRk;
                var cssId = imgRk.cssId;

                if( !ns.h( imgRk, 'dom$' ) ) {
                    imgRk.dom$ = $$
                        .img()
                        .a( 'src', imgRk.src )
                        .to( sDomN.medRoot )
                        ;
                }
                imgRk.dom$.cls( imgCss + ' ' + cssId )
                css += `
                    .${cssp}-approot.theorion--${tkey}.aspect--${akey} .${cssId} {
                        display :inline;
                    }
                `;

                ///submodel
                if( aspect.essayHeader.submodel ) {
                    css += `
                        .${cssp}-approot.theorion--${tkey}.aspect--${akey}
                        .${cssp}-media.submodel-${aspect.essayHeader.submodel} {
                            display:block;
                        }
                    `;
                }
            });
        });
        ns.globalCss.addText( css );
        //..............................
        // \\// study image and submodel
        //..............................

        sDomF.create8prepopulate_svg();
        //.patches l2
        ssF.continue_create_8_prepopulate_svg && ssF.continue_create_8_prepopulate_svg();

        //.disabled ... effect is too strong
        //stdMod.mmedia$.e( 'mouseover', sDomF.detected_user_interaction_effect );
        ssF.create_digital_legend && ssF.create_digital_legend();
        sDomN.mainLegends = document.querySelectorAll( '.main-legend' );
        if( fconf.ORIGINAL_FIGURE_VISIBILITY_SLIDER_ENABLED ) {
            sDomF.create_original_picture_vis_slider();
        }
    }

}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;    
    var rootvm      = sn('rootvm');

    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);
    var fmethods    = sn('methods',fapp);
    var d8d_p       = sn('d8d-point',fmethods);

    var sapp        = sn('sapp'); 
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);
    var amode       = sn('mode',sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);
    var exegs    = sn('exegs', ssD);

    fmethods.create_video_help_manager = create_video_help_manager;
    //000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000









    ///=========================================================
    /// creates video manager
    ///=========================================================
    function create_video_help_manager()
    {
        var videoListPopup_onModelPane$;
        //.this dom el. is to be created when descendants of
        //.sDomN.medSuperroot$ created in media-super-root.js
        sDomN.videoListPopup_button_onModelPane$.e( 'click', function() {
            videoListPopup_onModelPane$.css( 'display','block' );
        });
        sDomN.doCloseVideoHelp$.e( 'click',  function(e) { leaveVideo(); });

        /*
        ///never processed ... todm why
        sDomN.localVideo$.e('loadeddata', function() {
           ccc('loadeddata');
          if(sDomN.localVideo$().readyState >= 2) {
            ccc('2222222');
            sDomN.localVideo$().play();}
        });
        */
        fmethods.spawnVideoList = spawnVideoList;
        //111111111111111111111111
        return;
        //111111111111111111111111





        ///WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        // //\\ populates video icons for
        //         1) popup video list or
        //         2) exegesis tabs 
        ///WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        function spawnVideoList()
        {
            if( !videoListPopup_onModelPane$ ) { createPopupPane(); }

            //:popup list cleanup
            videoListPopup_onModelPane$.html('');
            sDomN.videoListPopup_button_onModelPane$.css(
                'display','none');

            //:theorion menu cleanup
            ///cleans up video icon placeholders in exegesis-tabs
            var iconClass = 'videoicon-placeholder';
            ns.eachprop( rg[ iconClass ], function( iconRg$, iid ) {
                iconRg$.html('');
                //c cc( iid + ' must become empty=',iconRg$() );
            });
            var vConf = exegs[ amode['theorion'] ][ amode['aspect'] ]
                           .essayHeader.video;

            if( vConf ) {
                if( vConf['to model help'] ) {
                    var listForPopup = [];
                    listForPopup.push( vConf );
                    //-------------------------------------------------------------------
                    // //\\ does populate listForPopup ...
                    //      only if videos configured for these app states
                    //-------------------------------------------------------------------
                    sDomN.videoListPopup_button_onModelPane$.css( 'display','block' );
                    //shows video-button for non-empty list
                    addPopupCloseButton();
                    listForPopup.forEach( function( vConf ) {
                        var itemDom$ = createVideoIconEntry( vConf );
                        itemDom$.to( videoListPopup_onModelPane$() );
                    });
                    //-------------------------------------------------------------------
                    // \\// does populate listForPopup ...
                    //-------------------------------------------------------------------

                } else {
                    //----------------------------------------------------------
                    // //\\ teorion video buttons
                    //----------------------------------------------------------
                    var itemDom$ = createVideoIconEntry( vConf );
                    var dom_already_built = rg[ iconClass ][ amode['theorion'] ];
                    if( dom_already_built  ) {
                        itemDom$.to( dom_already_built );
                    }
                    //----------------------------------------------------------
                    // \\// teorion video buttons
                    //----------------------------------------------------------
                }
            }
            return; //rrrrrr

            ///todm: this desing should be improved, but so far:
            /// this html-control is removable, so no pointer and click
            /// must exist when it is removed ... so
            /// it has a placeholder where it is placed or removed
            /// and such placeholder is neutral in respect for clicks
            function createVideoIconEntry( vConf )
            {
                return $$
                    .div()
                    .cls('video-icon-img-container')
                    .html( '<img class="video-help-button" width="25"' +
                           'src="images/camera-lightbulb.png" ' +
                           '>' +
                           ( vConf.caption ?
                             ' <span style="vertical-align:middle;">' +
                             vConf.caption + '</span>' :
                             ''
                           )
                    )
                    .css('cursor','pointer')
                    .css('display', 'inline')
                    .e('click', function() {
                        runVideo( vConf.URL, !vConf.isNotExternal );
                        videoListPopup_onModelPane$.css( 'display', 'none' )
                    })
                    ;
            }
        }
        ///WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        // \\// populates video icons for
        ///WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW




        function runVideo( URL, isExternal )
        {
            leaveVideo();
            if( isExternal ) {
                runExternal(URL);
            } else {
                runInternal(URL);
            }
        }
        function leaveVideo()
        {
            sDomN.localVideo$().pause();
            sDomN.localVideoSource$().src =  "dummy-iframe.html";
            sDomN.iframedVideo$().src = ""; //dummy-iframe.html";             
            setDisplayForInternal( 'none' );
            setDisplayForExternal( 'none' );
        }


        function runExternal( URL )
        {
            sDomN.iframedVideo$().src = URL + '?autoplay=1';
            setDisplayForExternal( 'block' );
        }

        function runInternal(URL) {
            sDomN.localVideoSource$().src = URL;
            setDisplayForInternal( 'block' );
            sDomN.localVideo$().play();
        };

        function setDisplayForInternal( display )
        {
            sDomN.localVideo$.css(       'display', display );
            sDomN.doCloseVideoHelp$.css(  'display', display );
            sDomN.videoWrap$.css(   'display', display );
        }
        function setDisplayForExternal( display )
        {
            sDomN.iframedVideo$.css(    'display', display );
            sDomN.doCloseVideoHelp$.css('display', display );
            sDomN.videoWrap$.css(       'display', display );
        }


        function createPopupPane()
        {
            videoListPopup_onModelPane$ = $$
                .c('div')
                .addClass( 'video-list-popup' )
                .css('display','none')
                .css('position', 'absolute')
                .css('padding', '5px')
                .css('padding-right', '25px')
                .css('border-radius', '5px')
                .css('border', '1px solid black')
                .css('left', '30px')
                .css('top', '50px')
                .css('background-color', 'white')
                .css('z-index','111111111')
                .to(sDomN.medSuperroot$)
                ;
        }
        function addPopupCloseButton()
        {
            $$
                .c('div')
                .to(videoListPopup_onModelPane$())
                .css('position','absolute')
                .css('top','2px')
                .css('right','5px')
                .e( 'click', function(){videoListPopup_onModelPane$.css('display','none')})
                .css('cursor','pointer')
                .html('X')
                ;
        }

    }


}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;    
    var cssmods     = sn('cssModules');
    var rootvm      = sn('rootvm');

    var fapp        = sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomN       = sn('dnative', sapp);
    var studyMods   = sn('studyMods', sapp);
    var amode       = sn('mode',sapp);

    var d8d_p       = sn('d8d-point',fmethods);
    fmethods.createDividorResizer = createDividorResizer;
    return;








    //=========================================================
    /// creates DividorResizer
    //=========================================================
    function createDividorResizer()
    {
        //---------------------------
        // //\\ dom roots
        //      root, handle, and css-placeholder
        //---------------------------
        var wResizer = $$
            .c( 'div' )
            .a( 'class', cssp +'-resizable-handle' )
            .a( 'id', cssp +'-resizable-handle' )
            .to( sDomN.medSuperroot$ )
            ();
        sDomN.mediaHorizontalHandler = $$
            .c( 'img' )
            .a( 'src', 'images/vertical.png' )
            .to( wResizer )
            ();
        ///dynamic CSS placeholder
        sDomN.mediaHorizontalHandlerCSS$ = $$.style().to(document.head);
        //---------------------------
        // \\// dom roots
        //---------------------------




        //.........................................
        // //\\ creates lower-layer framework
        //.........................................
        var frameworkD8D = fmethods.panesD8D = d8d_p.createFramework({
            findDraggee : findDraggee,
            dragSurface : fapp.fappRoot$(),
            DRAG_POINTS_THROTTLE_TIME : fconf.DRAG_POINTS_THROTTLE_TIME
        });
        //.........................................
        // \\// creates lower-layer framework
        //.........................................


        //============================================================
        // //\\ dragWrap is a top level point which
        //      sits on own, low-level pointWrap
        //============================================================
        var pointWrap_local =
        {
            //.id is vital to have for removing extra disk over dividor
            dragCssCls           : 'dividor',     //makes a placeholder for handler

            //.means media superroot width in pixels
            //.this default is irrelevant because it is updated at the first resize
            //achieved_at_move    : sconf.mediaDefaultWidthPercent * window.innerWidth,

            medpos2dompos       : handle2root
        };
        var dragWrap = frameworkD8D.pointWrap_2_dragWrap({
            //achieved            : pointWrap_local.achieved_at_move,
            pointWrap           : pointWrap_local,
            update_decPoint     : update_decPoint, //updates "decorational Point", not "decimal"
            doProcess           : doProcess

        });
        //============================================================
        // \\// dragWrap is a top level point which
        //============================================================

        fmethods.finish_Media8Ess8Legend_resize = finish_Media8Ess8Legend_resize;
        return;








        ///=============================================================================
        /// //\\ the core of module:
        ///      the function which processes an internal content for dragWrap.pointWrap
        ///=============================================================================
        function doProcess( arg )
        {
            var pL = pointWrap_local;
            var pA = pL.achieved;
            switch( arg.down_move_up ) {
                case 'up':
                case 'move':
                    var newSuperW = finish_Media8Ess8Legend_resize(
                        pA.achieved - arg.surfMove[0]
                    );
                    //pL.achieved_at_move = newSuperW;
                    if( arg.down_move_up === 'up' ) {
                        pA.achieved = newSuperW; //pL.achieved_at_move;
                    }
                break;
            }
        }
        ///=============================================================================
        /// \\// the core of module:
        ///=============================================================================







        ///=============================================================================
        /// //\\ restricts and sets super root and text pane sizes
        ///      used in resize and in master-dividor-slider
        ///=============================================================================
        function finish_Media8Ess8Legend_resize( proposed_medSupW, rootW, doDividorSynch )
        {
            var isMobile = ns.widthThresholds
                           [ fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD ]();
            //=============================
            // //\\ prepares parameters
            //=============================


            // //\\ gets media aspect ratio
            var aRat = sconf.innerMediaHeight / sconf.innerMediaWidth;
            // \\// gets media aspect ratio

            var VERTICAL_SAFE_HEIGHT_1 = 20;
            var VERTICAL_SAFE_HEIGHT_2 = 20;
            var navHeight = sDomN.navBar$.box().height;

            var rWidth = window.innerWidth;
            var rHeight = window.innerHeight - navHeight - VERTICAL_SAFE_HEIGHT_1;

            var appRootAsp = rHeight / rWidth;
            var wideScreen = appRootAsp < 0.5 || rWidth > 
                             fconf.SMALL_DESKTOP_MEDIA_QUERY_WIDTH_THRESHOLD;

            //-------------------------------------------
            // //\\ slider group patch for lemmas 2 and 3
            //-------------------------------------------
            var sliderGroup$ = ns.$$.q( '.slider-group' );
            var sliderGroupH = sliderGroup$() ? sliderGroup$.box().height : 0;
            //-------------------------------------------
            // \\// slider group patch for lemmas 2 and 3
            //-------------------------------------------

            //=============================
            // //\\ calculates new values
            //=============================
            var helpBoxHeight = sDomN.helpBoxAboveMedia$.box().height;
            var lbox = sDomN.legendRoot$.box();
            var legendWidth = lbox.width;
            var legendHeight = lbox.height;

            var legendWidth = 0;
            var legendHeight = 0;


            sDomN.legendRoot$.children( child => {
                var box = child.getBoundingClientRect();
                var wWidth = box.width;
                var wHeight = box.height;
                if( legendWidth < wWidth ) {
                    legendWidth = wWidth;
                }
                if( legendHeight < wHeight ) {
                    legendHeight = wHeight;
                }
            });


            if( isMobile ) {
                //------------------------------------------------------------------
                // //\\ very tedious way to get the necessary height of visible text
                //      by iterating through essaion children-texts
                //------------------------------------------------------------------
                var maxHeight = 250; //makes at least part of vertical menu visible
                sDomN.essaionsRoot$.children( child => {
                    var wHeight = child.getBoundingClientRect().height;
                    if( maxHeight < wHeight ) {
                        maxHeight = wHeight;
                    }
                });
                var essayH_str = ( Math.min( maxHeight, window.innerHeight/2 ) ).toFixed(2)
                                 + 'px';
                //------------------------------------------------------------------
                // \\// very tedious way to get the necessary height of visible text
                //------------------------------------------------------------------
                var essayW_str = "92%";
                var medRW_str = "92%";

            } else {


                if( wideScreen ) {
                    var ess8mod = rWidth - legendWidth - 30;
                } else {
                    var ess8mod = rWidth;
                }
                var frac = [0.40, sconf.mediaDefaultWidthPercent/100 ];
                var essayWidth = frac[0]/(frac[0]+frac[1])*ess8mod-10;

                //-------------------------------------------------
                // //\\ setting media super root
                //-------------------------------------------------
                var medSupW = frac[1]/(frac[0]+frac[1])*ess8mod-10;
                if( proposed_medSupW ) {
                    var medSupW = proposed_medSupW;
                    var ESS_MIN_WIDTH = 200;
                    medSupW = Math.min( ess8mod - ESS_MIN_WIDTH, medSupW );
                    medSupW = Math.max( 200, medSupW ); //protects if ess8mod is too small
                    if( !wideScreen ) {
                        ////one more patch to count too wide legend
                        medSupW = Math.max( legendWidth, medSupW );
                    }
                    medSupW = Math.max( medSupW, fconf.MODEL_MIN_WIDTH );
                    var essayWidth = ess8mod - medSupW - 20;
                }
                //-------------------------------------------------
                // \\// setting media super root
                //-------------------------------------------------


                //-------------------------------------------------
                // //\\ setting media width
                //-------------------------------------------------
                var medRW = medSupW - sconf.main_horizontal_dividor_width_px-20;
                if( !wideScreen ) {
                    ////model and legend are in "portrait mode"
                    var medRH_ = 
                                 rHeight - legendHeight //=medSupH
                                 - sliderGroupH
                                 - helpBoxHeight
                                 - VERTICAL_SAFE_HEIGHT_2;
                    var medRW_ = medRH_/aRat;
                    var medRW = Math.min( medRW_, medRW );
                    if( !proposed_medSupW ) {
                        var medSupW = medRW + sconf.main_horizontal_dividor_width_px;
                        var essayWidth = ess8mod - medSupW - 20;
                    }
                }
                //-------------------------------------------------
                // \\// setting media width
                //-------------------------------------------------

                //-------------------------------------------------
                // //\\ setting legendMargin_str
                //-------------------------------------------------
                if( !wideScreen ) {
                    var legendMargin_str =
                        ( ( medSupW - legendWidth 
                        - 30    //todm: this is a patch which fixes lemma9 legend ... why?
                        ) /
                        2 ).toFixed(2) + 'px';
                        //ccc( 'medSupW='+medSupW + ' legendWidth=' + legendWidth +
                        //     ' legendMargin_str=' + legendMargin_str )
                }
                //-------------------------------------------------
                // \\// setting legendMargin_str
                //-------------------------------------------------
                var essayW_str  = (essayWidth-20).toFixed(2)+'px';
                var essayH_str  = rHeight.toFixed(2)+'px';
                var medSupW_str = medSupW.toFixed(2)+'px';
                var medRW_str   = medRW.toFixed(2)+'px';
            }


            // //\\ video preparations
            //.todm why 0.8? box-sizing model?
            //var videoW = textPaneW_perc / 100 * rWidth * 0.8;
            var videoW = essayWidth * 0.8;
            var videoH = videoW*10/16;
            var videoW_px = videoW.toFixed(2) + 'px';
            var videoH_px = videoH.toFixed(2) + 'px';
            var videoW_mobile_px = (0.94*rWidth).toFixed(2) + 'px';
            var videoH_mobile_px = (0.94*rWidth*10/16).toFixed(2) + 'px';
            // \\// video preparations
            //=============================
            // \\// calculates new values
            //=============================



            //========================================
            // //\\ throws calculated values into CSS
            //========================================
            sDomN.legendRoot$
                .css( 'display', 'block' )
                .css( 'float',   'left' )
                //.css( 'width',  legendW_str )
                //effectively affects legend:
                .css( 'text-align', 'center' )
                .css( 'vertical-align', 'top' )
                ;

            sDomN.essaionsRoot$
                .css( 'width',  essayW_str )
                .css( 'height',  essayH_str )
                ;
            sDomN.medRoot$
                .css( 'width',  medRW_str );

            ///this only modifies a whole CSS for this element
            ///the whole CSS in in file fapp.css.js
            sDomN.mediaHorizontalHandlerCSS$.html(`
                .bsl-showreel-video-wrap {
                    width   : ${videoW_px};
                    height  : ${videoH_px};
                }
                @media only screen and (max-width:${fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD}px) {
                    .bsl-showreel-video-wrap {
                        width   :${videoW_mobile_px};
                        height  :${videoH_mobile_px};
                    }
                }
            `);

            if( isMobile ) {
                sDomN.legendRoot$
                    .css( 'display', 'block' )
                    .css( 'float', 'none' )
                    ;
                sDomN.medSuperroot$
                    .css( 'width',  '100%' );
            } else {
                sDomN.medSuperroot$
                    .css( 'width',  medSupW_str );
                if( wideScreen ) {
                    sDomN.legendRoot$
                        .css( 'margin-left',  '0' )
                        .css( 'margin-right', '0' );
                } else {
                    sDomN.legendRoot$
                        .css( 'margin-left',  legendMargin_str )
                        .css( 'margin-right',  legendMargin_str );
                }
            }
            //========================================
            // \\// throws calculated values into CSS
            //========================================



            //===============================================
            // //\\ synchs results with dividor-slider states
            //===============================================
            if( doDividorSynch ) {
                pointWrap_local.achieved.achieved = medSupW;
                fmethods.panesD8D.updateAllDecPoints();
            }
            //===============================================
            // \\// synchs results with dividor-slider states
            //===============================================


            //===============================================
            // //\\ updated model and its view
            //===============================================
            ///options to update all:
            //ns.eachprop( studyMods, ( stdMod, modName ) => {
            //    stdMod.upcreate();
            //});

            var aSub = amode['submodel'];
            if( ns.h( amode, 'submodel' ) && aSub ) {
                studyMods[ aSub ] && studyMods[ aSub ].upcreate();
            }
            //===============================================
            // \\// updated model and its view
            //===============================================

            return medSupW; //in particular, goes to dividor-slider stashed-update
        }
        ///=============================================================================
        /// \\// restricts and sets super root and text pane sizes
        ///=============================================================================




        //====================
        // //\\ finds draggee
        //====================
        ///Returns: dragWrap if it is close to testPoint.
        function findDraggee( testPoint, dummy, dragSurface )
        {
            //.if distance to testPoint is "outside" of this par.,
            //.dragWrap is not "considered" for drag
            var DRAGGEE_HALF_SIZE = fconf.DRAGGEE_HALF_SIZE;

            var handlePos = handle2root( dragSurface );
            var testMedpos = testPoint;
            var testMediaX = testMedpos[0];
            var testMediaY = testMedpos[1];

            var tdX = Math.abs( testMediaX - handlePos[0] );
            var tdY = Math.abs( testMediaY - handlePos[1] );
            var td  = Math.max( tdX, tdY );

            //.td is a "rect-metric" for distance between testPoint and drag-point-candidate
            if( td <= DRAGGEE_HALF_SIZE ) {
                //ccc( '\n\n****', 'pos=',handlePos, 'mouse=',testPoint, testMediaX, testMediaY );
                return dragWrap;
            }
        }
        //====================
        // \\// finds draggee
        //====================



        ///converts own media pos to dom-pos
        function handle2root( dragSurface )
        {
            //.vital to remember: parent of decPoint, not of mediaHorizontalHandler
            var rr = dragSurface.getBoundingClientRect(); //was: fapp.fappRoot$.box();
            var hh = sDomN.mediaHorizontalHandler.getBoundingClientRect();
            var h2r = [
                hh.left - rr.left,
                hh.top - rr.top + hh.height/2
            ];
            return h2r;
        }

        ///repositions decoration-point
        function update_decPoint( decPoint, dragSurface )
        {
            var h2r = handle2root( dragSurface );
            decPoint.style.left = h2r[0] + 'px';            
            decPoint.style.top = h2r[1] + 'px';
        }
    }

}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;    

    var fapp        = sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomN       = sn('dnative', sapp);
    var sDomF       = sn('dfunctions', sapp);

    var d8d_p       = sn('d8d-point',fmethods);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);

    sDomF.create_original_picture_vis_slider = create_original_picture_vis_slider;
    //00000000000000000000000000000000000000000
    return;
    //00000000000000000000000000000000000000000







    function create_original_picture_vis_slider()
    {

        sDomN.visib_right_image$ = $$.c('img')
          .a('src','images/mouse-icon.png')
          .css('width','26px')
          .css('float','right')
          .css('position','relative')
          .css('top','4px')
          .css('left','-9px')
          .to(sDomN.topMediaControls$())
          ;
        var captionScale    = 1;
        var sliderClassId   = 'origin-vis-slider';
        var railsLegend     = '';

        //=====================================================
        //      animated slider
        //      Based on ns.sliderControl which is based on,
        //      as of version 1072,
        //      module bsl/slider/d8d-app-template.js 
        //=====================================================
        var vis_slider = ssF.animatedSlider({

            parent              :sDomN.topMediaControls$(),
            cssp                :cssp,
            sliderClassId       :sliderClassId,
            customCss           :customCss( cssp, sliderClassId, railsLegend ),
            railsLegend         :railsLegend,

            dataInMove:         function( dataArg, draggee ) {
                                    slider2opacity( dataArg );
                                },
            //.callback when handler stops
            dataInArrival:      function( dataArg ) {
                                    slider2opacity( dataArg );
                                }
        });
        sDomN.visib_left_image$ = $$.c('img')
          .a('src','images/scroll-icon.png')
          .css('width','19px')
          .css('float','right')
          .css('position','relative')
          .css('top','6px')
          .css('right','-10px')
          .to(sDomN.topMediaControls$())
          ;

        vis_slider.doSet_childOpeningAnimation(
            0, 1 - fconf.ORIGINAL_FIGURE_VISIBILITY,
            fconf.ORIGINAL_FIGURE_VISIBILITY_ANIMATION_DURATION_MS
        );
        //11111111111111111111111111111111111111
        return;
        //11111111111111111111111111111111111111







        ///converts study-model pos to draggee caption
        function setCaption( slider_arg )
        {
            //slider_arg.draggee.innerHTML = ( captionScale ).toFixed(2);
        }

        function slider2opacity( sliderParameter )
        {
            var pictureOpacity = Math.max(0,1-sliderParameter).toFixed(3);
            var modelOpacity   = Math.min(1, Math.max(0,sliderParameter)).toFixed(3);
            var strongerModelOpacity = Math.min(1, Math.max(0,sliderParameter*2)).toFixed(3);
            var weakerPictureOpacity = Math.max(0,1-sliderParameter*1.2).toFixed(3);;

            sDomN.bgImage$ && sDomN.bgImage$.css( 'opacity', weakerPictureOpacity );
            sDomN.visib_left_image$.css( 'opacity', pictureOpacity );

            sDomN.mmedia$.css( 'opacity', '' + strongerModelOpacity );
            sDomN.visib_right_image$.css( 'opacity', modelOpacity );
        }
    }

    function customCss ( cssp, csskey, railsLegend )
    {
        var ret = `

            .${cssp}-slider-${csskey} {
                float:right;
                width:80px;
                height:30px;
                left:unset;
                top: 0;
                display:inline-block;
                position:relative;
                z-index:1000;
            }

        `;

        /*
        variant when slider is not visible originally
        .${cssp}-slider-${csskey} {
            visibility:hidden;            
        .${cssp}-slider-${csskey}.${cssp}-highlited-chart {
            visibility:visible;
        }
        */

        ret += `
            /* rails */
            .${cssp}-slider-${csskey}:after {
                content:'';
                display:block;
                position:absolute;
                width:72px;
                height:0px;
                border-top:1px solid #aaaaaa;
                left:6px;
                top:18px;
                color:black;
                background-color:white;
            }

            /* drag background */
            .${cssp}-slider-${csskey}:before {
                content:'${railsLegend}';
                display:block;
                position:absolute;
                width:75px;
                height:30px;
                left: 0px;
                top:0px;
                color:#aaaaaa;
            }

            .${cssp}-slider-${csskey} .${cssp}-draggee {
                position:absolute;
                top:10px;
                width:3px;
                height:14px;
                border-radius:3px;
                border:1px solid #888888;
                color:black;
                background-color:#dddddd;
                z-index:1000;
                cursor:pointer;
            }
        `;
        return ret;
    }

}) ();


/*
        vital jargon:
            teaf  - menu top level leaf
            teaf_id = "theorion", "aspect"
            leaf  - menu low level leaf
            menu tree is like:
                teaf_id = "theorion"
                              leaf_id = claim, proof, ...           
                teaf_id = "aspect"
                              leaf_id = latin, english, hypertext, ...           
*/


( function() {
    var ns          = window.b$l;
    var cssp        = ns.CSS_PREFIX;
    var $$          = ns.$$;
    var sn          = ns.sn;
    var rootvm      = sn('rootvm');

    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);
    var fmethods    = sn('methods',fapp);

    var ss          = sn('ss', fapp);
    var ssF         = sn('ssFunctions',ss);
    var ssD         = sn('ssData',ss);
    var rg          = sn('registry',ssD);
    var exegs    = sn('exegs', ssD);

    var sapp        = sn('sapp'); 
    var amode       = sn('mode',sapp);
    var studyMods   = sn('studyMods', sapp);

    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);



    var teaf_Rks = {};

    sDomF.populateMenu          = populateMenu;
    sDomF.selectMenu            = selectMenu;
    sDomF.build_menu_top_leafs_placeholders = build_menu_top_leafs_placeholders;
    //00000000000000000000000000000000000000
    return;
    //00000000000000000000000000000000000000








    //====================================
    // //\\ populate menu
    //      creates menu from config list
    //====================================
    function populateMenu()
    {
        ns.eachprop( sconf.submenus, function( submenus, teaf_id ) {
            build_teaf( teaf_id, submenus );
        });
    }
    //====================================
    // \\// populate menu
    //====================================


    function build_menu_top_leafs_placeholders()
    {
        //teaf$ is one of the top-leafs of menu
        sDomN.teafs$ = {};

        if( fconf.attach_menu_to_essaion_root ) {
            var leftSide_menuRotator$ = $$.dct(
                'left-side-menu-rotator',
                sDomN.essaionsRoot$
            );
        }

        ['aspect','theorion'].forEach( function( teaf_id ) {
            sDomN.teafs$[ teaf_id ] = $$.dct(
                'menu-teaf ' + teaf_id,
                fconf.attach_menu_to_essaion_root ?
                    ( teaf_id === 'aspect' ? leftSide_menuRotator$ : sDomN.essaionsRoot$ ) :
                    sDomN.menu
            );
        });
    }

    function selectMenu( teaf_id, leaf_id )
    {
        teaf_Rks[ teaf_id ][ leaf_id ].li$().click();
    }



    //====================================
    // //\\ sets menu top leaf
    //====================================
    //Input: menuTeafRack - contains list = array of items in submenu
    function build_teaf( teaf_id, menuTeafRack )
    {
        var leafRks = {};
        var teaf$   = sDomN.teafs$[ teaf_id ];

        var decorOfShuttle$;

        //------------------------------------
        // //\\ shuttle
        //------------------------------------
        var decorationsContainer$ = $$
            .dct( 'tleaf-decorations-container', teaf$ )
            .ch( ( decorOfShuttle$ = $$.dc( 'shuttle shape' ) )
                 .ch( fconf.decorateTopMenuWithRadioCircle && $$.dc( 'radio-circle' ) )
            );
        //------------------------------------
        // \\// shuttle
        //------------------------------------

        
        menuTeafRack.list.forEach( function( mitem, mitemIx ) {
            var leaf_id = mitem.id;
            var leafRk = leafRks[ leaf_id ] =
            {
                teaf_id : teaf_id,
                leafRks : leafRks,
                teaf$   : teaf$,
                decorOfShuttle$ : decorOfShuttle$,
                decorationsContainer$ : decorationsContainer$,
                ix      : mitemIx,
                menuTeafRack : menuTeafRack,
                caption :mitem.hasOwnProperty( 'caption' ) ? mitem.caption : leaf_id,
                leaf_id : leaf_id //for debug
            };
            make_menu_leaf( leafRk );
        });
    }
    //====================================
    // \\// sets menu top leaf
    //====================================







    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    // //\\ makes radio menu
    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    function make_menu_leaf( leafRk )
    {
        var leaf_id     =leafRk.leaf_id;
        var teaf_id     =leafRk.teaf_id;
        var leafRks     =leafRk.leafRks;
        var menuTeafRack=leafRk.menuTeafRack;
        var mitemIx     =leafRk.ix;
        var caption     =leafRk.caption;
        var teaf$       =leafRk.teaf$;
        var decorOfShuttle$=leafRk.decorOfShuttle$;
        var decorationsContainer$ = leafRk.decorationsContainer$;

        //--------------------------
        // //\\ shuttle shadow
        //--------------------------
        leafRk.itemShadow$ = $$.dct( 'shadow shape', decorationsContainer$ )
             .ch( fconf.decorateTopMenuWithRadioCircle && $$.dc( 'radio-circle' ) );
        //--------------------------
        // \\// shuttle shadow
        //--------------------------

        //--------------------------
        // //\\ fluid-html part
        //--------------------------

        //------------------------------
        // //\\ video-button placeholder
        //------------------------------
        if( teaf_id === 'theorion' ) {
            var iconClass = 'videoicon-placeholder';
            var videoPlaceholder$ = ssF.tr( iconClass, leaf_id,
                $$
                .div()
                .cls( iconClass )
                //:can put this css into fapp.css.js 
                //:while no specific place exist
                .css( 'display', 'inline-block' )
                .css( 'position', 'relative' )
                .css( 'top', '2px' )
                .css( 'padding-right', '10px' )
                .css( 'padding-left', '10px' )
                .css( 'height', '10px' )
            );
        }
        //------------------------------
        // \\// video-button placeholder
        // \\// fluid-html part
        //--------------------------

        var mItemCaption$;
        var li$ = leafRk.li$ = $$
            .dct( 'shape litem', teaf$ )
            .e('click', function( event ) {
                do_select_leaf( leafRk );
            })
            .ch([
                fconf.decorateTopMenuWithRadioCircle && $$.dc( 'radio-circle' ),
                mItemCaption$ = $$
                    .dc( 'caption' )
                    .ch( 
                        [   videoPlaceholder$,
                            $$.span().html( caption )
                        ]
                    )
            ]);



        if( menuTeafRack['default'] === leaf_id ) {
            ////at the moment of this version which is 1516,
            ////mdefault is preset in esseyion-header like "proof|English"
            do_select_leaf( leafRk );
        }
    }
    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    // \\// makes radio menu
    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW





    //---------------------------
    // //\\ processes menu change
    //---------------------------
    function do_select_leaf( leafRk )
    {
        var leaf_id     =leafRk.leaf_id;
        var teaf_id     =leafRk.teaf_id;
        var leafRks     =leafRk.leafRks;
        var menuTeafRack=leafRk.menuTeafRack;
        var mitemIx     =leafRk.ix;
        var caption     =leafRk.caption;
        var teaf$       =leafRk.teaf$;
        var decorOfShuttle$=leafRk.decorOfShuttle$;
        var decorationsContainer$ = leafRk.decorationsContainer$;

        ////selecting menu leaf: teaf_id + ' ' + leaf_id
        if( amode[ teaf_id ] === leaf_id ) return; //click is idempotent

        ( function () {
            //==================================================
            // //\\ updates menu mode in CSS classes
            //==================================================
            var lrs = leafRks;
            var ww$ = fapp.fappRoot$;
            menuTeafRack.list.forEach( function( mitem ) {
                ////removes all possible classes
                ww$.removeClass(teaf_id + '--' + mitem.id);
                lrs[ mitem.id ] &&  //todm do without a check
                    lrs[ mitem.id ].li$.removeClass( 'chosen' );
            });
            ww$.addClass(teaf_id + '--' + leaf_id);
            leafRk.li$.addClass( 'chosen' ); //todm redundant state-flag
            //==================================================
            // \\// updates menu mode in CSS classes
            //==================================================
        })();

        //==================================================
        // //\\ draws CSS decorations
        //==================================================
        decorOfShuttle$.a('class','shape shuttle shuttle-'+leafRk.ix);
        //==================================================
        // \\// draws CSS decorations
        //==================================================



        //==================================================
        // //\\ swaps original texts depending on new amode
        //==================================================
        if( teaf_id === 'aspect' || teaf_id === 'theorion' ) {
            if( amode['theorion'] && amode['aspect'] ) {
                ////this state of application is already constructed
                ////it is perhaps to overridden, so clean it up for case now
                var searchStr = '.original-text.' + amode['theorion'] +
                                '.' + amode['aspect'];
                var chosenTextDiv = sDomN.essaionsRoot$()
                                    .querySelectorAll( searchStr );
                chosenTextDiv[0] && $$.removeClass( 'chosen', chosenTextDiv[0] );
            }

            if( teaf_id === 'aspect' ) {
                var formerMType = 'aspect';
                var unchangedMType = 'theorion';
            } else {
                var formerMType = 'theorion';
                var unchangedMType = 'aspect';
            }

            var notToBeChangedMode = amode[unchangedMType];
            if( notToBeChangedMode ) {
                ////this state does already exist ... do set CSS
                var changedMode = leaf_id;
                //ccc( 'teaf_id=' + teaf_id + ' leaf_id=' + leaf_id );
                var searchStr = '.original-text.' + notToBeChangedMode + '.' +
                                changedMode;

                //todm: using stashed domN.... objects will eliminate this seach
                //and may fix leaf_id collisions between different teaf_id
                var chosenTextDiv = sDomN.essaionsRoot$()
                                    .querySelectorAll( searchStr );
                chosenTextDiv[0] && $$.addClass( 'chosen', chosenTextDiv[0] );
            }
        }
        //==================================================
        // \\// swaps original texts depending on new amode
        //==================================================


        //==================================================
        // //\\ updates app and ...
        //==================================================
        amode[teaf_id] = leaf_id;
        if( amode['theorion'] && amode['aspect'] ) {
            var rtRk = exegs[ amode['theorion'] ][ amode['aspect'] ];
            amode['submodel'] = rtRk.essayHeader.submodel;
            fmethods.spawnVideoList && fmethods.spawnVideoList();
            sDomN.bgImage$ = rtRk.imgRk.dom$;
        }
        //.menu work for special subapp
        ss.menuExtraWork && ss.menuExtraWork( teaf_id, leaf_id );
        //==================================================
        // \\// updates app and ...
        //==================================================




        //==================================================
        // //\\ hides or shows image and legend
        //      as prescribed in essaion
        //      if its menu item exist and is already constructed
        //==================================================
        if( amode['theorion'] && amode['aspect'] ) {
            var wRT = exegs[ amode.theorion ] &&
                      exegs[ amode.theorion ][ amode.aspect ];
            var eHeader = wRT && wRT.header;
            if( eHeader ) {
                if( eHeader.dataLegend === "0" ) {
                    $$.$(sDomN.medRoot).addClass('main-legend-disabled');
                } else if( eHeader.dataLegend === "1" ) {
                    $$.$(sDomN.medRoot).removeClass('main-legend-disabled');
                }
            }
        }
        if( sapp.readyToResize ) { 
            //.includes sapp.up-create();
            fmethods.finish_Media8Ess8Legend_resize(null, null, !!'doDividorSynch');
        }
        //==================================================
        // \\// hides or shows image and legend
        //==================================================
    }
    //---------------------------
    // \\// processes menu change
    //---------------------------


}) ();


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
    var topics      = sn('topics', ssD);
    var references  = sn('references', ssD);
    var exegs       = sn('exegs', ssD);

    var oneTimeUse_globalCSS = '';

    //---------------------------------------------
    // //\\ topic engine variables
    //---------------------------------------------
    var topicsCount = 0;
    var shapesCount = 0;
    var topicLinks = topics.topicLinks = {};
    var topicShapes = topics.topicShapes = {};
    var topicIndexedLinks = topics.topicIndexedLinks = [];

    var SPACE_reg = /\s+/;
    var TOP_ANCH_reg = 
        '¦([^¦]+)¦' +   //catches topicId
        '([^¦]+)'   +   //catches topic caption
        '¦¦'        +   //catches topic terminator
        '(?:(¦)(¦)*' +  //catches delayed topc-link for MathJax sibling
        '|(\n|.)|$)';   //catches remainder for later accurate replacement

    var topAnch_reg = new RegExp( TOP_ANCH_reg, 'gu' );
    //.adding flag "g" ruins the job ... why?
    var topAnch_reg2 = new RegExp( TOP_ANCH_reg, 'u' );
    //---------------------------------------------
    // \\// topic engine variables
    //---------------------------------------------

    sDomF.frags_2_essdom8topiccss = frags_2_essdom8topiccss;
    return; //000000000000000000000000000000000000000000










    ///this function needs application-model-view already created;
    ///as of this version, it is executed only once
    function frags_2_essdom8topiccss()
    {
        ns.eachprop( exegs, ( theorionAspects, teaf_id ) => {
            ns.eachprop( theorionAspects, ( exeg, leaf_id ) => {
                exeg.domEl = $$
                  .c('div')
                  .cls( exeg.classStr )
                  //*******************************************************
                  //.here page content injects into html for the first time
                  //*******************************************************
                  .to( sDomN.essaionsRoot$() )
                  ();

                ///collecting |...|..|| anchor-topics
                exeg.activeFrags.forEach( function( activeFrag, tix ) {
                    if( typeof( activeFrag ) === 'object' ) {
                        ns.eachprop( activeFrag, (avalue) => {
                            fragment_2_indexedTopics( avalue );
                        });
                    } else {
                        //.strange why topAnch_reg (with flag "g") works
                        //.and topAnch_reg2 does not
                        fragment_2_indexedTopics( activeFrag );
                    }
                });
            });
        });
        //ccc( 'topicLinks=', topics.topicLinks );
        topLinks_2_colors();

        exegs_2_tpAn8dom8mjax();
        //this is moved into MathJax callback: setTimeout( sDomF.tpanch2mjax, 3000 );

        oneTimeUse_globalCSS += `
            .${cssp}-text-widget .exeg-frag {
                display : none;
            }
            .${cssp}-text-widget .active-static {
                display : inline;
            }
            .${cssp}-text-widget .delayed-far,
            .${cssp}-text-widget .delayed-anchor {
                display : none;
            }
        `;
        ns.globalCss.add8update( oneTimeUse_globalCSS );
        sDomF.anchors2topiccss();
        sDomN.topicModelInitialized = true;
    };





    ///Converts these stubs, exeg.activeFrags, to
    ///     1. exeg.builtFrags ( depending on app mode )
    ///     2. creates dom-placeholders for essaion's fragments which not yet created
    ///     3. and makes final fragments parsing: BodyMathJax_2_HTML( domComponents[ fix ] )
    ///      
    ///This function visualizes the texts upon the mode
    ///at late run-time event, this function is, for example,
    ///used in lemma-2-3::gui-visibility.js::refreshSVG_master()
    ///
    function exegs_2_tpAn8dom8mjax()
    {
        ns.eachprop( exegs, ( theorionAspects, teaf_id ) => {
            ns.eachprop( theorionAspects, ( exeg, leaf_id ) => {
                aFrags_2_tpAnchors( exeg );
                //above line produces this: exeg.builtFrags
                //as further-processed-fragments-of-exeg
                exeg.builtFrags.forEach( function( bFrag, fix ) {
                    ns.eachprop( bFrag.activeFrags, (afrag,fid) => {
                        afrag.dom = afrag_2_dom8mj( exeg, afrag, fid );
                    });
                });
            });
        });
        function afrag_2_dom8mj( exeg, bFrag, fid )
        {
            //*******************************************************
            //.here page content injects into html for the first time
            //*******************************************************
            bFrag.dom$ = $$.c('div').to( exeg.domEl );
            bFrag.dom$.cls( 'active-'+fid + ' exeg-frag');
            oneTimeUse_globalCSS += `
                .${cssp}-text-widget.active-${fid} .active-${fid} {
                    display : inline;
                }
            `;
            bFrag.dom$.html( bFrag.activeFrag );
            BodyMathJax_2_HTML( bFrag.dom$() );
        }
    }



    //===============================================
    //
    //===============================================
    function aFrags_2_tpAnchors( exeg )
    {
        var bfs = exeg.builtFrags = [];
        exeg.activeFrags.forEach( function( activeFrag, tix ) {
            bfs[tix] = {};
            if( typeof( activeFrag ) !== 'object' ) {
                activeFrag = { 'static' : activeFrag };
            }
            bfs[tix].activeFrags = {};
            ns.eachprop( activeFrag, ( afrag, akey ) => {
                bfs[tix].activeFrags[akey] =
                    { activeFrag : afrag.replace( topAnch_reg, replWithAnchor ) }
            });
        });
        return;

        //--------------------------------------------------------
        // //\\ html conversion of body fragments
        //--------------------------------------------------------
        function replWithAnchor( match, skey, scaption, cflag, farFlag, remainder )
        {
            var rack = topics.topicLinks[ skey ];
            if( !rack ) return;
            var dix = cflag ? ' delayed-anchor' : '';
            dix += farFlag ? ' delayed-far' : '';
            
            //.we cannot use skey because spaces inside of it, so
            //.we use colorId
            var repl = '<a class="tl-' + rack.colorId + dix + '">'+ scaption +
                       '</a>' + (remainder || '' );
            return repl;
        }
        //--------------------------------------------------------
        // \\// html conversion of body fragments
        //--------------------------------------------------------
    }


    function topLinks_2_colors()
    {
        var SATUR = 99;
        var LIGHT = 30;
        var OPACITY = 0.6;
        var colorsCount = topicIndexedLinks.length;
        topicIndexedLinks.forEach( ( tLink, cCount ) => {
            var hue = 359 / colorsCount * cCount;
            var corRack = ns.pars2colors( hue, SATUR, LIGHT, OPACITY );
            tLink.rgba = corRack.rgba;
            tLink.rgbaCSS = corRack.rgbaCSS;
            var corRack = ns.pars2colors( hue, SATUR, LIGHT, 1 );
            tLink.rgb1 = corRack.rgba;
        });

        ns.eachprop( topicShapes, ( shape, scount ) => {
            var sc = shape.shapesCount;
            var rem = sc%2;
            var zebra = rem ? (sc-rem)/2 : sc/2 + Math.floor( shapesCount / 2 );
            var hue = 359 / shapesCount * zebra;
            var corRack = ns.pars2colors( hue, SATUR, LIGHT, OPACITY );
            shape.rgba = corRack.rgba;
            shape.rgbaCSS = corRack.rgbaCSS;
            var corRack = ns.pars2colors( hue, SATUR, LIGHT, 1 );
            shape.rgb1 = corRack.rgba;
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

            MathJax.Hub.Queue(["Typeset",MathJax.Hub,domEl], [sDomF.tpanch2mjax,domEl]);
        }
    }

    ///collecting |...|..|| anchor-topics
    ///does loop via all possible active fragments
    function fragment_2_indexedTopics( activeFrag )
    {
        var topicPreAnchors = activeFrag.match( topAnch_reg );
        if( topicPreAnchors ) {
            topicPreAnchors.forEach( link => {
                ////loops via all anchors having topic-link tl-TOPIC
                if( !link ) return;
                var parsedLink = link.match( topAnch_reg2 );
                //=========================================
                // //\\ indexes topic links and colors
                //=========================================
                var topicId = parsedLink[1];
                if( !topicLinks.hasOwnProperty( topicId ) ) {
                    var colorIx = topicsCount++;
                    topicIndexedLinks[ colorIx ] =
                    topicLinks[ topicId ] = {
                        colorIx:colorIx,
                        colorId:colorIx+'',
                        shapes:{},
                        link:parsedLink[2]
                    };
                }
                var tLink = topicLinks[ topicId ];
                var colorIx = tLink.colorIx;
                //=========================================
                // \\// indexes topic links and colors
                //=========================================

                //=========================================
                // //\\ indexes shapes locally and globally
                //=========================================
                var parsedLinks = topicId.split( SPACE_reg );
                parsedLinks.forEach( shapeId_ => {

                    var shapeId = shapeId_.replace( /([A-Z])/g, ( match, key1 ) => (
                        '_' + key1.toLowerCase()
                    ));
                    //ccc( shapeId );
                    tLink.shapes[ shapeId ] = true;
                    if( !topicShapes.hasOwnProperty( shapeId ) ) {
                        topicShapes[ shapeId ] = {
                            topicId : topicId,
                            colorIx:colorIx,
                            shapesCount:shapesCount,
                            shapeId : shapeId
                        }
                        shapesCount++;
                    }
                });
                //=========================================
                // \\// indexes shapes locally and globally
                //=========================================
            });
        }
    }

}) ();



// //\\// Application core-events setup
( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;
    var fapp        = sn('fapp' ); 

    var sapp        = sn('sapp' ); 
    var fconf       = sn('fconf',fapp);
    var fmethods    = sn('methods',fapp);
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);

    fmethods.setupEvents            = setupEvents;
    fmethods.setupSiteWideEvents    = setupSiteWideEvents;
    fmethods.fullResize             = fullResize;
    return;






    function setupEvents()
    {
        window.addEventListener( 'resize', fullResize );
    };

    function fullResize()
    {
        //.todm not the best architecture
        //.apparently
            //.application part
            //.solves draggee-point-arrows-misplacement
            //.after resize
        //!!'doDividorSynch'
        ///this statement is inside of this routine: sapp.up-create();
        fmethods.finish_Media8Ess8Legend_resize && fmethods.finish_Media8Ess8Legend_resize(
            null, null, !!'doDividorSynch'
        );
    }

    function setupSiteWideEvents()
    {
        setNextLemmaButton( 'right' );
        setNextLemmaButton( 'left' );

        var maxWidth = 0;
        [].forEach.call( sDomN.middleNavBar$().children, function( child ) {
            maxWidth = Math.max( maxWidth, child.getBoundingClientRect().width );
        });
        [].forEach.call( sDomN.middleNavBar$().children, function( child ) {
            child.style.width = maxWidth + 'px';
        });

    };

    function setNextLemmaButton( direction )
    {
        var pager$ = direction === 'right' ? sDomN.rightButton$ : sDomN.leftButton$;

        var mList = fconf.sappModulesList[ fconf.sappId ];
        sapp.ix = mList.ix;
        var next = direction === 'right' ? next = sapp.ix + 1 : sapp.ix - 1;
        if( next >= fconf.sappModulesArray.length || next < 0 ||
            fconf.sappModulesArray[ next ].sappId === 'home-pane'
        ) {
            pager$.addClass( 'non-displayed' );
        } else {
            var nextSapp = fconf.sappModulesArray[ next ];
            var fullCaption = nextSapp.book + '. ' + nextSapp.caption + '.';
            var newLoc = window.location.pathname + '?conf=sappId=' + nextSapp.sappId;
            pager$.html( direction === 'right' ?
                '<img src="images/right-page-triangle.svg"> ' + fullCaption :
                fullCaption + ' <img src="images/back-arrow-link.svg">' );
            pager$.a( 'title', "Go to " + nextSapp.caption );
            pager$.removeClass( 'non-displayed' );
            ///this did work but anchor works better
            pager$.e( 'click', function() {
                window.location = newLoc;
                return false;
            });
        }
    }
    

}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;

    var rootvm      = sn('rootvm');
    var cssp        = ns.CSS_PREFIX;
    var nsmethods   = sn('methods');

    var fapp        = sn('fapp' ); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var references  = sn('references', ssD);
    var exegs    = sn('exegs', ssD);
    sDomF.ajax_2_prepopulated_exegsMatrix = ajax_2_prepopulated_exegsMatrix;
    return; //0000000000000000000000000000000000








    ///==========================================
    ///creates html for text pane
    ///==========================================
    function ajax_2_prepopulated_exegsMatrix( continueAppInit )
    {
        var allEssaions;
        ///this ajax-load takes following aux. files including list of contents
        nsmethods.loadAjaxFiles(
            [
                { id: 'contents-list.txt',
                  link:'contents/' + fconf.sappId + '/contents-list.txt' }
               ,{ id: 'references',
                  link:'contents/' + fconf.sappId + '/references.html'
                }
               ,{ id: 'content-config',
                  link:'contents/' + fconf.sappId + '/conf.json'
               }
            ],
            on_auxiliaryLoad_success
        );

        ///This ajax-load takes contents-files, concatenates them, and calls
        ///final subroutine, on_contentFilesLoad_Success.
        function on_auxiliaryLoad_success( loadedFilesById_I )
        {
            var list = loadedFilesById_I[ 'contents-list.txt' ].text.split(/\r\n|\n|\r/);

            //------------------------------------
            // //\\  making the list for ajax-load
            //------------------------------------
            //."nothing is loaded yet:
            var listForAjax = [];
            list.forEach( function( listItem ) {
                if( !listItem.match( /^\s*$/ ) ) {
                    listForAjax.push({
                          id: listItem,
                          link:'contents/' + fconf.sappId + '/' + listItem
                    });
                }
            });
            //------------------------------------
            // \\//  making the list for ajax-load
            //------------------------------------

            ///fires ajax-load for listForAjax
            nsmethods.loadAjaxFiles( listForAjax, function( loadedFilesById_II ) {
                    listForAjax.forEach( function( listItem ) {
                        allEssaions += loadedFilesById_II[ listItem.id ].text;
                    });
                    on_contentFilesLoad_Success( loadedFilesById_I );
                }
            );
        }


        
        //====================================================
        // //\\ on content Files Load Success
        //====================================================
        function on_contentFilesLoad_Success( loadedFilesById )
        {
            references.text = loadedFilesById.references.text || references.text || '';
            if( loadedFilesById['content-config'] ) {
                var tmRack = JSON.parse(loadedFilesById['content-config'].text);
                var topics = sn('topics', ssD);
                sconf.contentConfig = tmRack;
            }
            var txt = allEssaions; //loadedFilesById.texts.text;

            var ESSAYON_DIVIDOR = /\*::\*/g;
            var essayons = txt.split( ESSAYON_DIVIDOR );
            sconf.submenus = {};
            var bgImgCount = 0;
            var bgImages = {};
            bgImages.cssId2rk = {};
            bgImages.path2rk = {};
            essayons.forEach( function(essayon) {

                //.removes empty essayons
                if( essayon.replace( /(\s|\n\r)*/g, '').length === 0 ) return;

                //--------------------------------------
                // //\\ splits the essayon ...
                //--------------------------------------
                //      essayon = proof|english precontent
                //             precontent = \nJSON*..*\n content 
                //             JSON essayon is optional                
                //              
                //      below: ess_instructions[1] = teaf_id: claim, proof,
                //                                            theorems, neutral, ... 
                //             ess_instructions[2] = leaf_id: english,... latin, ...
                //             ess_instructions[3] = precontent
                //https://stackoverflow.com/questions/2429146/
                //      javascript-regular-expression-single-space-character
                var ess_instructions = essayon.match( /^([^\|]*)\|([^\s]*)\s*\n([\s\S]*)$/);

                if( ess_instructions && ess_instructions[3] ) {
                    var teaf_id = ess_instructions[1];
                    var leaf_id = ess_instructions[2];
                    var wPreText = ess_instructions[3];
                    var wIx = wPreText.indexOf("*..*");
                    if( wIx > -1 ) {
                        var wHeader = wPreText.substring(0, wIx-1);
                        wPreText = wPreText.substring( wIx+4 );
                    }
                    var essayHeader = wHeader ? JSON.parse( wHeader ) : {};

                    //.todm: patch: missed submodel property does default to 'common'
                    //              empty string denotes absence of submodel
                    essayHeader.submodel = ns.h( essayHeader, 'submodel' ) ?
                                           essayHeader.submodel :
                                           'common';
                    exegs[ teaf_id ] = exegs[ teaf_id ] || {};
                    var exeg = exegs[ teaf_id ][ leaf_id ] =
                    {
                        bodyscript:wPreText, essayHeader:essayHeader
                    };
                    collectBgImg( essayHeader, exeg );

                    sconf.submenus = sconf.submenus || {};
                    setMenu( teaf_id, 'theorion' )
                    setMenu( leaf_id, 'aspect' )

                    // //\\ media-drag-decoration-enabled-aspect
                    //      currently unlocks all aspects in content for
                    //      being able to have dragged points and other elements in model,
                    //      todm: looks like useless artifact.
                    var wDecArr = fconf.dragPointDecoratorClasses =
                                  fconf.dragPointDecoratorClasses || [];
                    var wDecorAspect = 'aspect--' + leaf_id;
                    if( wDecArr.indexOf( wDecorAspect ) < 0 ) {
                        wDecArr.push( wDecorAspect );
                    }
                    // \\// media-drag-decoration-enabled-aspect


                    //ccc( teaf_id, leaf_id, essayHeader );

                    //=======================================
                    // //\\ parses and sets menu
                    //=======================================
                    function setMenu( leafId, teaf_id )
                    {
                        //=======================================
                        // //\\ how submenu built
                        //=======================================
                            /*
                            submenus :
                            {
                                theorion: {
                                    list:
                                    [
                                        { id:'claim' },
                                        { id:'proof' }
                                    ],
                                    'default' : 'claim'
                                },
                                aspect: {
                                    list:
                                    [
                                        { id:'latin',   caption:'Latin' },
                                    ....
                                }
                                //worked
                                ,decorations: {
                                    list:
                                ....
                            }
                            */
                        //=======================================
                        // \\// how submenu built
                        //=======================================
                        var men = sconf.submenus[ teaf_id ] = sconf.submenus[ teaf_id ] ||
                             {  list : [],
                                //.will be overriden if aspect-default is preset in script
                                "default" : leafId,
                                duplicates : {}
                             };
                        //ccc( 'checing dup ' + leafId + ' ' + teaf_id  + ' men=', men); 
                        if( !men.duplicates[ leafId ] ) {
                            //var menuItem = { id:aspect, caption:essayHeader.menuCaption } 
                            var menuItem = { id:leafId };
                            men.duplicates[ leafId ] = menuItem;
                            men.list.push( menuItem );
                            if( teaf_id === 'theorion' ) {
                                sDomN.theorionMenuMembersCount =
                                    ( sDomN.theorionMenuMembersCount || 0 ) + 1;
                            } else if( teaf_id === 'aspect' ) {
                                sDomN.aspectionMenuMembersCount =
                                    ( sDomN.aspectionMenuMembersCount || 0 ) + 1;
                            }
                        }
                        if( essayHeader["default"] === "1" ) {
                            men["default"] = leafId;
                        }
                        if( essayHeader.menuCaption && teaf_id === 'aspect' ) {
                            men.duplicates[ leafId ].caption = essayHeader.menuCaption;
                        }
                    }
                    //=======================================
                    // \\// parses and sets menu
                    //=======================================
                }
                //--------------------------------------
                // \\// splits the essayon ...
                //--------------------------------------

            });
            //ccc( sconf.submenus[ 'proof' ]);
            continueAppInit();
            return;






            // //\\ bg images
            function collectBgImg( essayHeader, exeg ) {
                var pr = bgImages.path2rk;
                var imgId = essayHeader.mediaBgImage;
                imgId = !ns.h( essayHeader, 'mediaBgImage' ) ?
                          'common' :
                          ( imgId === null ? 'empty' : imgId );
                if( !ns.h( pr, imgId ) ) {
                    var cssId = 'bg'+bgImgCount;
                    bgImages.cssId2rk[ cssId ] = pr[ imgId ] =
                    {
                        cssId : cssId,
                        src: imgId === 'empty' ?
                             'images/empty.png' :
                             'contents/' + fconf.sappId + '/img/' +
                                ( imgId === 'common' ?
                                    sconf.contentConfig.mediaBgImage :
                                    imgId
                                )
                    };
                    bgImgCount++;
                }
                exeg.imgRk = pr[ imgId ];
            }
            // \\// bg images
        }
        //====================================================
        // \\// on content Files Load Success
        //====================================================

    }


}) ();


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
    var ccc = console.log;

    sDomF.tpanch2mjax = tpanch2mjax;
    return;








    function tpanch2mjax( domEl )
    {
        var setMouseHiglight = sDomF.setMouseHiglight;
        var topicLinks = topics.topicLinks;
        var delayedAns = domEl.querySelectorAll( ".delayed-anchor" );
        if( !delayedAns.length ) return;

        delayedAns.forEach( an => {
            var cls = an.className;
            var match = cls.match( /\btl-(\S*)\b/ );
            if( !match ) return;
            var delayedFar = cls.match( /\bdelayed-far\b/ );
            var colorIx = parseInt( match[1] );
            var sib = an;
            var targetText = an.textContent;
            var targetFound = false;
            while( sib ) {
                var sib = sib.nextSibling;
                if( !sib ) break;
                if( sib.nodeType !== Node.ELEMENT_NODE ) continue;
                if( sib.tagName === 'SCRIPT' ) continue;
                if( sib.children ) {
                    //https://stackoverflow.com/questions/8321874/
                    //how-to-get-all-childnodes-in-js-including-all-the-grandchildren
                    var grands = sib.querySelectorAll( '*' );
                    grands.forEach( grand => {
                        if( !grand.children.length ) {
                            if( grand.textContent === 'Γ' ) {
                                //ccc( 'grand.textContent=' + grand.textContent )
                            }
                            if( targetText === grand.textContent ) {
                                ////paints all matching leaf nodes in MathJax tree
                                //if( targetText === 'G' ) ccc( 'G target found', grand );
                                targetFound = true;
                                //. ...'A' ... is an extra protection against MathJax problem
                                //.            the problem was nested? wrapping into <a ...
                                //if( grand.tagName !== 'A' ) {
                                    grand.innerHTML = "<a class=" + match[0] +
                                        '>' + targetText + '</a>';
                                    setMouseHiglight( grand, colorIx );
                                //}
                            }
                        }
                    });
                }
                //stops forwarding topic after first found sibling
                //delayedFar allows search beyound first discovered sibling
                if( !delayedFar && targetFound ) break;
            };
            //.important to know: this line runs after "anchors2topics" performed because
            //.it is scheduled this way by MathJax...Hub machinery
            //an.parentNode.removeChild( an ); //child.remove() for moderns
        });
    }


})();



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
            var colorIx = parseInt( match[1] );
            var alink = topics.topicIndexedLinks[ colorIx ];

            //-----------------------------
            // //\\ assigns color to anchor
            //-----------------------------
            //:gets global shape color
            //:fist color of anchor stack of linked shapes
            var alkeys = Object.keys( alink.shapes );
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
            ///assigns color to anchor CSS
            //  this feature is disabled because bloats MathJax font
            //  anchors2colors += `
            //  a.tl-${alink.colorId} {
            //       padding-left:3px;
            //       padding-right:3px;
            anchors2colors += `
                a.tl-${alink.colorId} {
                   border-radius:4px;
                   color:${rgb1};
                   opacity:0.8;
                }
                a.tl-${alink.colorId}:hover {
                   opacity:1;
                   background-color:#eaeaea;
                   cursor:default;
                }
                a.tl-${alink.colorId}:hover span{
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
            setMouseHiglight( anchor, colorIx );


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
                        stroke-opacity: 0.5;
                    }



                    /* ================= */
                    /* //|| highlighted  */
                    /* ================= */
                    .${cssp}-approot.tp-${colorIx} .tp-${skey} {
                        opacity: 1;
                    }
                    .${cssp}-approot.tp-${colorIx} .tohidden.tp-${skey} {
                        visibility:visible;
                    }
                    /* does bold on anchor hover */
                    .${cssp}-approot.tp-${colorIx} .tp-${skey}.tobold {
                       font-weight : bold;
                    }

                    .${cssp}-approot.tp-${colorIx} svg .tp-${skey} {
                        fill-opacity : 0.7;
                        stroke-opacity: 1;
                    }
                    .${cssp}-approot.tp-${colorIx} svg .tp-${skey}.tostroke {
                        stroke-width:8px;
                    }
                    /* ================= */
                    /* //|| highlighted  */
                    /* ================= */



                    /* //|| special for svg-text */
                    .${cssp}-approot svg text.tp-${skey} {
                        fill-opacity : 0.7;
                    }
                    /* ***** highlighted */
                    .${cssp}-approot.tp-${colorIx} svg text.tp-${skey} {
                        fill-opacity : 1;
                    }
                    /* // ||// special for svg-text */

                `;
                ///boldifies svg-text at topic highlight
                alink.col8shape_2_opac[ skey ] += `
                    .${cssp}-approot.tp-${colorIx} svg text.tp-${skey} {
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



//\\// Application Entry
( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;
    var rootvm      = sn('rootvm');
    var cssmods     = sn('cssModules');
    var dpdec       = ns.sn('drag-point-decorator');
    var html        = sn('html');

    var nsmethods   = sn('methods');

    var fapp        = sn('fapp'); 
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp');
    var srg_modules = sn('srg_modules', sapp);
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative', sapp);
    var studyMods   = sn('studyMods', sapp);

    sDomF.create8prepopulate_svg = create8prepopulate_svg;
    return;
    //00000000000000000000000000000000000000




    //=========================================================
    // //\\ updates and creates media
    //=========================================================


    function create8prepopulate_svg()
    {
        ns.eachprop( studyMods, ( stdMod, modName ) => {
            create8prepopulate_singleSvg( stdMod );
        });
    }



    function create8prepopulate_singleSvg( stdMod )
    {
        //..........................
        // //\\ media
        //..........................
        ////makes svg-draw-area

        sDomN.mmedia$ = //todo: patch: sets this to most recent called media creator:
        stdMod.mmedia$ = $$.$( document.createElementNS( fconf.svgNS, 'svg' ) );

        var mmedia = sDomN.mmedia = stdMod.mmedia = stdMod.mmedia$();
        mmedia.setAttributeNS( null, 'class', cssp +'-media' );

        //https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/version
        //mmedia.setAttributeNS( null, 'version', "1.1" ); //no need

        mmedia.setAttributeNS( null, 'viewBox', '0 0 ' +
                                 sconf.innerMediaWidth + ' ' +
                                 sconf.innerMediaHeight );
        //https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
        //minor details:
        //https://stackoverflow.com/questions/16438416/cross-browser-svg-preserveaspectratio
        mmedia.setAttributeNS( null, 'preserveAspectRatio', "xMidYMid meet" );

        //depricated in svg:
        //mmedia.setAttributeNS( null, 'baseProfile', "full" );

        stdMod.mmedia$.to( sDomN.medRoot );
        //mmedia.setAttributeNS( null, 'fill', "#FFFFAA" );
        //no good: mmedia.style.fill = "#FFFFAA";
        //..........................
        // \\// media
        //..........................
    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================


}) ();


/*
    This is not mobile detector. This is a JS/CSS syncer.
    Enables width detection synch between media-query and JS.
    Creates threshold point in @media ... and
    sets the JS-test-method to this threshold.

    The test-method can be called from JavaScript with two methods
    of test enabled: boolean test value return and callback.
*/
( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var cssp        = ns.CSS_PREFIX;

    ns.widthThresholds = {};
    ns.create_mobile_tester = create_mobile_tester;
    return;







    ///=========================================================
    /// Creates media query, test-probe-div, and test-method.
    ///=========================================================
    function create_mobile_tester( domElToAttachTo, mediaThreshold )
    {
        var thresId = ''+mediaThreshold;
        if( ns.widthThresholds[ thresId ] ) return;
        var cls = cssp+'-mobile-width-detector-'+mediaThreshold;
        var tester = $$
           .dct( cls, domElToAttachTo )
           .css( 'position', 'absolute' )
           .css( 'visibility', 'hidden' );

        $$ .style()
           .to( document.head )
           .html( `
                .${cls} {
                    width:200px;
                }
                @media only screen and (max-width: ${mediaThreshold}px) {
                    .${cls} {
                        width:100px;
                    }
                }
           `);
        
        ns.widthThresholds[ thresId ] = function( cb )
        {
            var testWidth = tester.box().width;
            var mobile = testWidth <150;
            cb && cb(mobile);
            return mobile;
        };
    }

}) ();


// //\\//
(function() {
	var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var anslider    = ns.sn('animated-slider');

    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);

    var sapp        = sn('sapp' ); 

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);

    ssF.animatedSlider = animatedSlider;
    //0000000000000000000000000000000000
    return;
    //0000000000000000000000000000000000








    ///... appar. this function is derived from vbls/... animated-slider.js
    ///... which had prototype: ns.simpleSlider = function( parent, cssp, sliderClassId, captionScale )
    function animatedSlider( sarg )
    {
        var parent          = sarg.parent;
        var cssp            = sarg.cssp;
        var hideProofSlider = sarg.hideProofSlider;
        var sliderClassId   = sarg.sliderClassId;
        var railsLegend     = sarg.railsLegend;
        var dataInMove      = sarg.dataInMove;
        var dataInArrival   = sarg.dataInArrival;
        //:optional
        var setCaption      = sarg.setCaption;
        //.overrides animated-slider-plugin's default css
        var customCss       = sarg.customCss; 
        //.hides but displays slider by ancestor css-class
        var ancestorClassToHideSlider = sarg.ancestorClassToHideSlider;
        //:
        parent = parent || document.body;
        return_slider = {};



        //===============================
        // //\\ creates dom placeholders
        //===============================
        // //\\ appends style
        //-------------------------------
        var css = customCss ||
                  anslider.css( cssp, sliderClassId, railsLegend,
                                ancestorClassToHideSlider, sconf.hideProofSlider
                  );
        $$  .style()
            .html( css )
            .to( document.head );
        //-------------------------------
        // \\// appends style
        //-------------------------------



        //:appends slider root
        return_slider.slider$ = $$
            .c( 'div' )
            .a( 'class', cssp + '-slider-' + (sliderClassId ? sliderClassId : '' ) )
            .to( parent );
        //:appends draggee
        return_slider.draggee$ = $$
            .c( 'div' )
            .a( 'class', cssp +'-draggee' )
            .to( return_slider.slider$() );
        //===============================
        // \\// creates dom placeholders
        //===============================



        //======================
        // //\\ creates slider
        //======================
        ///as of version 1072, calls this function from module bsl/slider/d8d-app-template.js 
        ///there are too many drag-and-drop variants now, it's easy to be lost ...
        var slider = ns.sliderControl({
            drawSurfaceDomEl:   return_slider.slider$(),
            handleDomEl:        return_slider.draggee$(),
            lowLimit:0.001,
            maxLimit:1,
            //.callback when handler moves
            dataInMove:  dataInMove,
            dataInArrival   :dataInArrival
        });
        return_slider.slider = slider;
        //.displays draggee caption at start up
        setCaption && setCaption( slider );
        //======================
        // \\// creates slider
        //======================



        //===============================
        // //\\ starts landing animation
        //===============================
        return_slider.doSet_childOpeningAnimation = doSet_childOpeningAnimation;
        //===============================
        // \\// starts landing animation
        //===============================
        //1111111111111111111111111111111
        return return_slider;
        //1111111111111111111111111111111










        ///defines landing animation
        function doSet_childOpeningAnimation( startX, endX, dur )
        {
            var aframes = ns.aframes;
            var slider  = return_slider.slider;
            var rangeX  = endX - startX;
            function emulatesMove( timestamp ){
                var dataArg = startX + rangeX*(Math.min(timestamp, dur)) / dur;
                //c cc( 'emulates: moves dataArg=' + dataArg );
                slider.d8d_emulateAbsFractionX( dataArg, 'move' );
            }
            function completesMove()
            {
                slider.d8d_emulateAbsFractionX( endX, 'up' );
            };
            animInProgressHashStr = aframes.add8complete( emulatesMove, dur, completesMove );
        }

    };

})();


(function() {
    var ns = window.b$l;
    var anslider = ns.sn('animated-slider');





    anslider.css = function( 
        ///all input pars are optional
        cssp,
        csskey,
        railsLegend,
        ancestorClassToHideSlider,
        doHideSlider
    ) {
        railsLegend = railsLegend || '';

        var ret = `
            .${cssp}-slider-${csskey} {
                display:inline-block;
                position:relative;
                width:150px;
                height:30px;
                border-radius:4px;
                left:0px;
                top:15px;
                right:5%;
                z-index:1000;
            }
            `;

        if( doHideSlider ) {
            ret +=` 
                div.${cssp}-slider-${csskey} {
                    position:absolute;
                    visibility:hidden;
                }
            `;
            //return ret; /* todmm why this does not work */
        }
        if( ancestorClassToHideSlider ) {
            ret +=` 
                .${ancestorClassToHideSlider} .${cssp}-slider-${csskey} {
                    position:absolute;
                    visibility:hidden;
                }
            `;
        }

        /*
        variant when slider is not visible originally
        .${cssp}-slider-${csskey} {
            visibility:hidden;            
        .${cssp}-slider-${csskey}.${cssp}-highlited-chart {
            visibility:visible;
        }
        */

        ret += `
            /* rails */
            .${cssp}-slider-${csskey}:after {
                content:'';
                display:block;
                position:absolute;
                width:170px;
                height:2px;
                border:1px solid #888888;
                border-radius:2px;
                left:-2px;
                top:18px;
                color:black;
                background-color:white;
            }

            /* drag background */
            .${cssp}-slider-${csskey}:before {
                content:'${railsLegend}';
                display:block;
                position:absolute;
                width:170px;
                height:30px;
                border-radius:4px;
                left:-2px;
                top:0px;
                text-align:center;
                font-size:10px;
                font-family:helvetica, san-serif;
                color:#aaaaaa;
            }

            .${cssp}-draggee {
                position:absolute;
                top:13px;
                width:33px;
                height:12px;
                padding-top:2px;
                border-radius:6px;
                border:1px solid #888888;

                font-size:8px;
                text-align:center;
                font-family:helvetica, san-serif;
                color:black;
                background-color:#dddddd;
                z-index:1000;
                cursor:pointer;
            }
        `;

        return ret;
    };

})();



( function() {
	var sn	        = window.b$l.sn;
    var mat         = sn('mat');
    var integral    = sn('integral', mat);
    var bezier      = sn('bezier');




    //bezier.zbezier2integralY = zbezier2integralY;
    bezier.zbezier2areas = zbezier2areas;
    
    ///Returns: integral on [0,t] S = I[0,t]y*dx
    ///Context: P = 2t(1-t)P1 + ttP2 = att + bt; 
    ///         P is zero-based bezier curve;
    ///         S = Iyx'dt
    function zbezier2integralY( pivots, t )
    {
        var P1 = pivots[0];
        var P2 = pivots[1];
        var ay = P2[1] - 2*P1[1];
        var by = 2*P1[1];
        var ax = P2[0] - 2*P1[0];
        var bx = 2*P1[0];
        var bxs = 2*ax;
        var cxs = bx;  

        var S = integral.polynomial( ay*bxs, ay*cxs + bxs*by, by*cxs, 0, t );
        return S;
    }

    //:tests
    //c cc( zbezier2integralY( [[0.5,0.5],[1,1]], 1 ) ); //0.5
    //c cc( zbezier2integralY( [[0.5,1],[1,1]], 1 ) );   //1-1/3
    //c cc( zbezier2integralY( [[1,0.5],[1,1]], 1 ) );   //1/3

    ///Returns: S = Ix(y)dy
    function zbezier2integralX( pivots, t )
    {
        return zbezier2integralY(
            [
                [ pivots[0][1],
                  pivots[0][0]
                ], 
                [ pivots[1][1],
                  pivots[1][0]
                ]
            ],
            t
        );
    }
    //c cc( zbezier2integralX( [[0.5,1],[1,1]], 1 ) );   //1/3
    
    function zbezier2areas( pivots, t, tanT, tanCross, scale )
    {
        scale = scale || 1;
        var end = bezier.parT2point( t, [[0,0], pivots[0], pivots[1]] );
        var endX = end[0];
        var endY = end[1];

        var tan1 = pivots[0][0]/pivots[0][1];
        var fullAreaBetweenBx8axisY   = zbezier2integralX( pivots, t );

        //---------------------------------------
        // //\\ development prints
        //---------------------------------------
        /*
        var compareWithTriangularArea = endX * endY / 2;
        c cc( '****\nfull=' + (fullAreaBetweenBx8axisY*scale).toFixed(6) );
        //c cc( 'endX=' + endX.toFixed(2) + ' crossX=' + tanCross[0].toFixed(2) +
        //     ' crossY=' + tanCross[1].toFixed(2) );
        //c cc( 'endY=' + endY.toFixed(2) );
        c cc( 'triangle=' + (compareWithTriangularArea*scale).toFixed(6) );
        */
        //---------------------------------------
        // \\// development prints
        //---------------------------------------


        var areaUnderTangentLine_tanT = 0.5 * tanT * endX * endX;
        var areaBetweenTanT_8_curve     = fullAreaBetweenBx8axisY - areaUnderTangentLine_tanT;
        //ccc('under_tanT=' + (areaUnderTangentLine_tanT*scale).toFixed(6),
        //    'diff=1/12=' + (areaBetweenTanT_8_curve*scale).toFixed(6) // 1/12 );

        // //\\ under tan1
        var total = tanCross[0]*tanCross[1]/2;      //1/9 = 0.1111
        var delta = tanCross[0]*tanCross[0]/2*tanT; //1/9/2/2 = 1/36 
        var areaUnderTan1 = total - delta;          //1/12
        //c cc( 'total=' + total.toFixed(6) + ' tan1= ' + tan1.toFixed(6) );
        //c cc( '1/12 = areaUnderTan1=' + areaUnderTan1.toFixed(6) + ' rev= ' + ( 1/areaUnderTan1).toFixed(6) );
        // \\// under tan1

        var result =
        {
            areaBetweenTanT_8_curve: areaBetweenTanT_8_curve * scale,
            areaUnderTan1: areaUnderTan1 * scale,
            //.sugar
            areaBetween_Tan1_Tan2_Curve: ( areaBetweenTanT_8_curve - areaUnderTan1 ) * scale
        };
        return result;
    }

    //:tests
    //c cc( zbezier2areas( [[0.5,1],[1,1]], 1, 0.5, [ 1/4 + 1/12, 1/2+2/12 ] ) );   //1/3 - 1/4 = 1/12, 
    //c cc( zbezier2areas( [[0.5,1],[1,1]], 1, 0.5, [ 1/3, 2/3 ] ) );   //1/3 - 1/4 = 1/12, 


}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var rootvm      = sn('rootvm');
    var cssp        = ns.CSS_PREFIX;
    var sapp        = sn('sapp' ); 

    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);

    var sDomN       = sn('dnative', sapp);
    var sDomF       = sn('dfunctions', sapp);
    var studyMods   = sn('studyMods', sapp);
    var amode       = sn('mode',sapp);




    //===============================
    // //\\ medpos2dompos and inverse
    //===============================
    ///converts own media pos to dom-pos
    sDomF.medpos2dompos = function()
    {
        var off = sconf.mediaOffset;
        var medpos = this.medpos;
        var c2m = sDomF.css2media();
        return [ medpos[0] / c2m + off[0], medpos[1] / c2m  + off[1]];
    };

    ///converts dom-pos to media pos
    sDomF.pOnDs_2_innerViewBox = function( point_on_drag_surface )
    {
        var pod = point_on_drag_surface; //for lemma1, drag_surface = sDomN.medRoot
        var moffset = sconf.mediaOffset;
        var c2m = sDomF.css2media();
        return [
            c2m * ( pod[0] - moffset[0] ),
            c2m * ( pod[1] - moffset[1] )
        ];
    };
    //===============================
    // \\// medpos2dompos and inverse
    //===============================


    ///cssMed2innMed
    sDomF.css2media = function()
    {
        if( amode['submodel'] ) {
            //c cc(amode['submodel'], studyMods )
            return sconf.innerMediaWidth /
                   studyMods[ amode['submodel'] ].mmedia.getBoundingClientRect().width;
        } else {
            //c cc( '... not exist' );
            return 1;
            //return sconf.innerMediaWidth / sDomN.mmedia$().getBoundingClientRect().width;
        }
    };

}) ();


//\\// Application Entry
( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;
    var rootvm      = sn('rootvm');
    var cssmods     = sn('cssModules');
    var dpdec       = ns.sn('drag-point-decorator');
    var html        = sn('html');

    var nsmethods   = sn('methods');

    var fapp        = sn('fapp'); 
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp');
    var srg_modules = sn('srg_modules', sapp);
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative', sapp);

    var srg         = sn('sapprg', fapp ); 
    //:nearly a patch
    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var cssmod      = sn('ssCssModules',ss);
    //.registry is used for study-model-elements or media-model-elements
    var rg          = sn('registry',ssD);




    //======================================================
    // //\\ establishes landing-start-state
    //======================================================
    document.documentElement.className += 'non-loaded';
    $$  .style()
        .to( document.head )
        .html(
            "html.non-loaded body { \n" +
                "opacity :0; \n" +
            "} \n" +
            "html body { \n" +
            "    opacity :1; \n" +
            "    transition  :opacity 1s ease-in-out; \n" +
            "} \n"
        );
    //======================================================
    // \\// establishes landing-start-state
    //======================================================
    document.addEventListener( "DOMContentLoaded", initConfiguration );

    ssF.tr = tr;
    ssF.tp = tp;
    return; //00000000000000000000000000000000000000









    //=========================================================
    // //\\ inits full app
    //=========================================================
    function initConfiguration() 
    {
        ns.url2conf( fconf );
        fconf.sappId = fconf.sappId || 'home-pane';
        sapp.siteCaptionHTML = fconf.siteCaptionHTML;
        sapp.siteCaptionPlain = fconf.siteCaptionPlain;
        document.title = sapp.siteCaptionPlain;

        cssmods.initHomePageCSS(cssp, fconf);
        html.buildCommonHTMLBody();
        fapp.fappRoot$.id( fconf.sappId === 'home-pane' ?  'home-pane' : 'lemma' );
        html.buildHomePage();

        config8run_subappModules();
    }
    //=========================================================
    // \\// inits full app
    //=========================================================




    //=========================================================
    // //\\  establishes configuration, loads sub-app scripts
    //=========================================================
    function config8run_subappModules()
    {
        //==============================
        // //\\ configure subapp modules
        //==============================
        var lemmaConfig = fconf.sappModulesList[ fconf.sappId ];
        sapp.siteCaptionHTML = lemmaConfig.caption;
        sapp.siteCaptionPlain = lemmaConfig.caption;
        sapp.ix = lemmaConfig.ix; 

        //------------------------------------------------
        // //\\ prepares sub-application-source-code-files
        //------------------------------------------------
        //      list for load
        //.makes common path
        var effectiveId = lemmaConfig.sappCodeReference || lemmaConfig.sappId;
        var codesList = lemmaConfig.codesList || [];
        codesList.forEach( function( codeItem ) {
            codeItem.src = "src/sub-app/" + effectiveId + "/" + codeItem.src;
        });
        //------------------------------------------------
        // \\// prepares sub-application-source-code-files
        // \\// configure subapp modules
        //==============================


        //=======================================
        // //\\ loads and executes subapp modules
        //=======================================
        if( fconf.sappId === 'home-pane' ) {
            loadsContents();
        } else {
            nsmethods.loadScripts(
                codesList,
                function()
                {
                    ////executes loaded modules from modules registry
                    ////after all modules have been loaded
                    ns.eachprop( srg_modules, function( module ) {
                        module();
                    });
                    ssF.init_conf();
                    ns.url2conf( fconf ); //overrides subapp conf
                    loadsContents();
                }
            );
        }
        //=======================================
        // \\// loads and executes subapp modules
        //=======================================
    }
    //=========================================================
    // \\//  establishes configuration, loads sub-app scripts
    //=========================================================




    //=========================================================
    // //\\ continues lemma after sources
    //=========================================================
    function loadsContents()
    {
        //=======================================
        // //\\ gets content texts and continues
        //=======================================
        if( fconf.sappId === 'home-pane' ) {
            subappCore_after_contentsLoad();
        } else {
            sDomF.ajax_2_prepopulated_exegsMatrix( function() {
                    //=======================================
                    // //\\ html and css
                    //=======================================
                    cssmods.initSiteWideCSS(cssp, fconf);
                    sn('ssCssOrder',ss).list.forEach( function( cssName ) {
                        ns.globalCss.addText( cssmod[cssName]( cssp, fconf ) );
                    });
                    ns.globalCss.update();
                    //=======================================
                    // \\// html and css
                    //=======================================
                    subappCore_after_contentsLoad();
            });
        }
        //=======================================
        // \\// gets content texts and continues
        //=======================================
    }
    //=========================================================
    // \\// continues lemma after sources
    //=========================================================






    //=======================================
    // //\\ starts subapp core
    //=======================================
    function subappCore_after_contentsLoad()
    {
        if( fconf.sappId !== 'home-pane' ) {
            ////the body which follows below can be put in cb for image-loader-ajax
            fmethods.createLemmaDom();
            sDomF.exeg_2_frags();
            sDomF.frags_2_essdom8topiccss();
            sapp.init_sapp();
            sDomF.populateMenu();
            sapp.finish_sapp_UI && sapp.finish_sapp_UI();

            sapp.isInitialized = true;
            fmethods.setupEvents();

            ///.this is a patch: the cause and real solution is not known;
            ///.and it still does not work for l2,3
            ///
            ///.this timeout is vital: it allows to hovering-arrows to get to their
            ///.place: othewise, the img.style.top for draggee is wrong which
            ///.moves arrows to the top edge of media which is wrong
            ///.the value of timeout seems also vital for l9
            //setTimeout( fmethods.fullResize, 50 ); 50 is enough for l9
            setTimeout( fmethods.fullResize, 500 );

        }
        //sDomN.captionHTML$.html( sapp.siteCaptionHTML );
        remove_landing_state_from_top_html();
        fmethods.setupSiteWideEvents();
        //ccc( 'end of main proc' );
        //setTimeout( fmethods.fullResize, 1000 );
        //fmethods.finish_Media8Ess8Legend_resize(null, null, !!'doDividorSynch');
        //fmethods.panesD8D && fmethods.panesD8D.updateAllDecPoints();

        if( fconf.sappId === 'home-pane' ) {
            sDomN.homeButton$().click();
        }
    }
    //=======================================
    // \\// starts subapp core
    //=======================================






    // //\\// helpers

    //===========================================
    // //\\ removes landing-start-state
    //===========================================
    function remove_landing_state_from_top_html()
    {
        //.todmm ... why without 1s transition the
        //.landing flickers?
        //.todm ... use regEx to cooperate with
        //.other frameworks on html-element
        var de = document.documentElement;
        de.className = de.className.replace(
                       'non-loaded', '' );
    }
    //===========================================
    // \\// removes landing-start-state
    //===========================================


    ///================================================
    /// //\\ does registry initiation or overriding job.
    ///================================================
    /// Purpose: to prevent unit's duplication.
    /// If no rg[id] exists, then creates empty rg[id].
    /// Then
    ///     If no key is supplied.
    ///         Returns rg[id].
    ///     If key is supplied:
    ///         Sets rg[ id ][ key ] = val
    ///         Returns val.
    function tr( id, key, val )
    {
        rg[ id ] = rg.hasOwnProperty( id ) ? rg[ id ] : {};
        if( key ) { rg[ id ][ key ] = val; }
        return key ? val : rg[ id ];
    }
    ///================================================
    /// \\// does registry initiation or overriding job.
    ///================================================


    ///================================================
    /// //\\ to position
    ///      sugar: sets rg[ id ][pos] = val
    ///================================================
    ///Sets rg[ id ][pos] = val
    ///If rg[ id ] does not exist, then creates it.
    function tp( id, val ) { return tr( id, 'pos', val ); }
    ///================================================
    /// \\// to position
    ///================================================





}) ();


// //\\// site-wide conf
( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);
    var sconf   = ns.sn('sconf',fconf);






    //====================================================
    // //\\ put configuration parameters here
    //====================================================
    to_fconf =
    {

        //--------------------
        // //\\ site-wide
        //--------------------

        //:data
        svgNS :  "http://www.w3.org/2000/svg",

        siteCaptionPlain : "An Interactive Exploration of Newton’s Lemmas",
        siteCaptionHTML : "An Interactive Exploration <br><span>of</span> Newton’s Lemmas",
        //--------------------
        // \\// site-wide
        //--------------------



        //--------------------
        // //\\ page-wide
        //--------------------
        // //\\ view
        //--------------------

        //.below this value, JS considers the device as a mobile
        MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD : 800,
        SMALL_DESKTOP_MEDIA_QUERY_WIDTH_THRESHOLD :1300, //px
        MODEL_MIN_WIDTH : 200, //when dragging

        model_float_dir : 'right', //vs left
        exegesis_floats : !true,   //floats around media-pane
        ESSAY_PANE_IS_BEFORE_MEDIA_IN_HTML : true,
        attach_menu_to_essaion_root : true,
        decorateTopMenuWithRadioCircle : false,

        LEFT_SIDE_MENU_WIDTH : 40, //px
        LEFT_SIDE_MENU_OFFSET_X : 20, //px
        LEFT_SIDE_MENU_ITEM_LENGTH : 100, //px
        DATA_LEGEND_WIDTH : 300, //px //todo must be per table-column to achive respon.
        //ESSAY_PANE_MAX_HEIGHT :400, //px

        DRAG_POINTS_THROTTLE_TIME : 50, //ms
        DRAGGEE_HALF_SIZE : 40, //px
        NAVIGATION_DECORATIONS_ALWAYS_VISIBLE : false,

        //since ver 1931 was automated from contents
        //dragPointDecoratorClasses : [],
        //[ 'aspect--hypertext', 'aspect--english', 'aspect--xixcentury' ],
        //--------------------
        // \\// view
        //--------------------

        //developer's proposals
        //these constants are used for development planning: they are not needed for application
        //approvalGranted: {},
        //fconf.approvalGranted[ 'area-fragments-manager-to-link-with-app' ] = true;

        ORIGINAL_FIGURE_VISIBILITY_SLIDER_ENABLED : false,
        ORIGINAL_FIGURE_VISIBILITY : 0.6,
        ORIGINAL_FIGURE_VISIBILITY_ANIMATION_DURATION_MS : 3000,
        //--------------------
        // \\// page-wide
        //--------------------
    };
    //====================================================
    // \\// put configuration parameters here
    //====================================================




    ///spawns config to its final place
    Object.keys( to_fconf ).forEach( function( key ) {
        fconf[ key ] = to_fconf[ key ];
    });

}) ();


// //\\// file where to set plugin main configuration
( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);
    var sconf   = ns.sn('sconf',fconf);




    //====================================================
    // //\\ optionally overriden by url-query-config
    //====================================================
    to_sconf =
    {
        mediaOffset : [ 0, 0 ],                 //in respect to media-root
        mediaDefaultWidthPercent : 40,          //in respect to total width
        MINIMAL_MEDIA_CONTAINER_WIDTH : 350,    //todm approximate
        main_horizontal_dividor_width_px : 21,
    };
    //====================================================
    // \\// optionally overriden by url-query-config
    //====================================================

    //adds to_sconf to commong sconf
    Object.keys( to_sconf ).forEach( function( key ) {
        sconf[ key ] = to_sconf[ key ];
    });

}) ();


( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);

    fconf.sappModulesList = {};



    var sappModulesArray = fconf.sappModulesArray =
    [
        {   landingApp : true,  //marks default landing app
            sappId : 'home-pane',
            book : '',
            caption : 'Contents',
            sappCodeReference : '',
            annotation : "Home Page and Contents",
            codesList :
            [
                {  src:"sconf.js" },
                {  src:"main.js" }
            ]
        },

        {   landingApp : false,  //marks default landing app
            sappId : 'lemma1',
            book : 'Book 1',
            caption : 'Lemma I',
            sappCodeReference : '',
            annotation : "Core lemma introducing limit method",
            codesList :
            [
                {  src:"sconf.js" },
                {  src:"main.js" },
                {  src:"css/css-order.js" },
                {  src:"css/proof-vs-claim-modes.css.js" },
                {  src:"core/limit-demos.js" },
                {  src:"models/study-model-limit-definition.js" },
                {  src:"models/media-model-limit-definition.js" },
                {  src:"models/d8d-model-limit-definition.js" },
                {  src:"models/media-model-limit-definition-labels.js" },

                {  src:"models/proof-xix/study-model.js" },
                {  src:"models/proof-xix/d8d-model.js" },
                {  src:"models/proof-xix/media-model.js" }
            ]
        },

        {   sappId : 'lemma2',
            book : 'Book 1',
            caption : 'Lemma II',
            sappCodeReference : '',
            annotation : "Lorem ipsum dolor set ipsum set dolor acnut lima noir set lorem ipsum doler sut.",
            codesList :
            [
                {  src:"sconf.js" },
                {  src:"css/css-order.js" },
                {  src:"css/widget-media.css.js" },
                {  src:"css/slider.css.js" },
                {  src:"css/model.css.js" },
                {  src:"css/inner-page.css.js" },
                {  src:"main.js" },
                {  src:"core/common/preset-data.js" },
                {  src:"core/common/dom.js" },
                {  src:"core/common/d8d-model.js" },
                {  src:"core/gui-construct.js" },
                {  src:"core/gui-slider.js" },
                {  src:"core/gui-update.js" },
                {  src:"core/common/gui-visibility.js" },
                {  src:"core/gui-widthest.js" },
                {  src:"core/model.js" },
                {  src:"core/common/event-handlers.js" }
            ]
        },

        {   sappId : 'lemma3',
            book : 'Book 1',
            caption : 'Lemma III',
            sappCodeReference : 'lemma2',
            annotation : "Lorem ipsum dolor set ipsum set dolor acnut lima noir set lorem ipsum doler sut.",
        },


        {   sappId : 'lemma9',
            book : 'Book 1',
            caption : 'Lemma IX',
            sappCodeReference : '',
            annotation : "Lorem ipsum dolor set ipsum set dolor acnut lima noir set lorem ipsum doler sut.",
            codesList :
            [
                { src:'sconf.js' },
                { src:'main.js' },
                { src:'css/css-order.js' },
                { src:'css/proof-vs-claim-modes.css.js' },
                { src:'core/create-proof-slider.js' },
                { src:'models/study-model-common.js' },
                { src:'models/media-model-common.js' },
                { src:'models/main-legend.js' },
                { src:'models/d8d-model-common.js' }
            ]
        },


        {   sappId : 'b1s2prop1theor1',
            book : 'Book 1',
            caption : 'Proposition I',
            sappCodeReference : '',
            annotation : "",
            codesList :
            [
                { src:'sconf.js' },
                { src:'main.js' },
                { src:'css/css-order.js' },
                { src:'css/proof-vs-claim-only-one-model-visibility.css.js' },
                { src:'css/css.css.js' },
                { src:'models/study-model.js' },
                { src:'models/media-model.js' },
                { src:'models/create-media-model.js' },
                { src:'models/create-media-model-lib.js' },
                { src:'models/main-legend.js' },
                { src:'models/d8d-model.js' }
            ]
        },

    ];

    ///spawns modules array into modules list and fills incompleted properties
    sappModulesArray.forEach( function( moduleItem, moduleIx ) {
        if( moduleItem.sappCodeReference ) {
            sappModulesArray.forEach( function( searchItem ) {
                if( searchItem.sappId === moduleItem.sappCodeReference ) {
                    moduleItem.codesList = searchItem.codesList;
                }
            });
        }
        moduleItem.ix = moduleIx;
        fconf.sappModulesList[ moduleItem.sappId ] = moduleItem;
        if( moduleItem.landingApp ) { fconf.landingApp = moduleItem.sappId; }
    });

}) ();



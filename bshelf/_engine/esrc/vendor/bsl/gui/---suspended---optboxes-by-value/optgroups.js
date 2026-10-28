//work on this module is suspended,
//shows button's view by value: three values: for "yes", "no", and "excluded",
( function() {
    var {
        $$, nsmethods, globalCss, haz,
    } = window.b$l.nstree();

    nsmethods.cre__optgroup             = cre__optgroup;
    nsmethods.areAllGroupsFullyChecked  = areAllGroupsFullyChecked;
    nsmethods.unchecks_allGroups        = unchecks_allGroups;
    nsmethods.setsup_groupsArray        = setsup_groupsArray;
    nsmethods.enables0disables_groupsArray = enables0disables_groupsArray;

    var gloCssIsSet = false;
    const BO_SIZE = 22;
    var bgCount = 0;
    return;











    ///==========================================
    /// creates dom select box
    ///==========================================
    function cre__optgroup({  //abandoned

        //api: see ...test.js
        //------------------------------
        //alternatives listText or iarrays
        listText, 
        iarrays, //itemArrays
        //------------------------------

        value2view_list,

        //optionals:
        ogRoot$,        //array or single
        enable0disable, //initially
        bosize,         //per framework for all bgroups
        ogType,
        ogClsId,        //for domEl-css

        optionIsChanged_cb, //callback
        ogStyle,
    }) {

        var ogRack                  = {};
        ogRack.setsupAllUnchecked   = setsupAllUnchecked;
        ogRack.setsupFocusOnParent  = setsupFocusOnParent;
        ogRack.enables0disables     = enables0disables;
        ogRack.getsInfo    = getsInfo;

        var bosize              = bosize || BO_SIZE;
        ogRack.ogType           = ogType || 'radio';
        ogClsId                 = ogClsId || ('optboxes-id-'+bgCount++);
        enable0disable          = typeof enable0disable !== 'undefined' ? enable0disable : true;
        ogRack.optBoxes   = [];
        setsOneTimeCss( bosize, ogRack ); //per framework
        if( ogStyle ) {
            globalCss.update(
                '.' + ogClsId + ogStyle,
                ogClsId, );
        }

        if( listText ) {
            iarrays = nsmethods.purgedLines_2_itemArrays(
                      nsmethods.splitText_2_purgedLines( listText
            ));
        }
        ogRack.iarrays = iarrays;


        if( !value2view_list ) throw (new Error( 'Missed map list' ));
        var value2view_ww = nsmethods.purgedLines_2_itemArrays(
                            nsmethods.splitText_2_purgedLines( value2view_list
        ));
        var value2view = {};
        value2view_ww.forEach( v2v => {
            value2view[ v2v[0] ] = v2v[ 1 ];
        });
        ogRack.value2view = value2view;



        ogRoot$ = ogRoot$ || $$.c( 'div' );
        ogRack.root$ = ogRoot$;
        var ogCls = ogClsId ? ogClsId + ' ' : '';
        ogCls += 'optboxes';

        ///optboxes
        iarrays.forEach( (iarray,iix) => {

            var ogr$ = ogRoot$;
            if(  Array.isArray( ogRoot$ ) ) {
                var ogr$ = ogRoot$[ iix ];
            }
            ogr$.addClass( ogCls );
            var obox = ogRack.optBoxes[ iix ] = createOptboxGui({
                ocaption    : iarray[1],
                ocls        : '',
                oid         : iix+'',
                ix          : iix,
                oparent     : ogr$,
                ostate      : iarray[0] === 'yes',
                oexcluded   : iarray[0] === 'excluded', 
                bosize,
                ogRack,
                optionIsChanged_cb,
            })
        });
        enables0disables( enable0disable );
        return ogRack;


        function setsupAllUnchecked()
        {
            setsAllOptsExceptIx({ ogRack, val:false, ix:-1 });
        }


        function setsupFocusOnParent( focus0not )
        {
            var act = focus0not ? 'addClass' : 'removeClass';
            if(  Array.isArray( ogRoot$ ) ) {
                ogRack.root$.forEach( ogr$ => ogr$[ act ]( 'focused' ) );
            } else {
                ogRack.root$[ act ]( 'focused' );
            }
        }

        function enables0disables( enable0disable )
        {
            ogRack.enable0disable = enable0disable;
            setsupFocusOnParent( enable0disable );
        }

        ///returns  checkedIx = -1 if none is checked,
        ///         allAreChecked false if some is not checked,
        function getsInfo()
        {
            var checkedIx = -1;
            var count = 0;
            var excludedCount = 0;
            var len = ogRack.optBoxes.length;
            ogRack.optBoxes.forEach( (ob,obIx) => {
                if( ob.oexcluded ) {
                    excludedCount++;
                }
                if( ob.ostate && !ob.oexcluded ) {
                    checkedIx = obIx;
                    count++;
                }
            });
            return {
                checkedIx,
                allAreChecked : count === len - excludedCount,
                excludedCount,
            };
        }
    }


    function createOptboxGui({
        ocaption,
        oid,        //string
        ix,         //number
        oparent,    //dom$ or pure dom
        optionIsChanged_cb,
        bosize,
        ogRack,

        //optionals args are below this line:
        ocls,       //string
        ostate,
        oexcluded,
    }){
        var othis = {
            ocaption,
            ocls,
            oid,
            ix,
            optionIsChanged_cb,
            ostate,
            oexcluded,
        };
        ocls = ocls ? ocls + ' ' : '';
        var cls = ocls ? ocls + ' ' : '';
        othis.dom$ = $$.div()
            .html( oexcluded ? ogRack.value2view.excluded : 
                   ( ostate ? ogRack.value2view.yes : ogRack.value2view.no )
            )
            .addClass( ocls + ' optbox ' + 'id-' + oid )
            .addClass( ogRack.ogType )
            ;
        if( oparent ) {
            othis.dom$.to( oparent );
        }
        othis.dom$
            .e( 'click', function( ev ) {
                if( oexcluded ) return;
                //if( !ogRack.enable0disable ) return;
                othis.ostate = !othis.ostate;
                ostate2gui( othis.ostate );
                if( ogRack.ogType === 'radio' ) {
                    setsAllOptsExceptIx({ ogRack, val:false, ix });
                }
                optionIsChanged_cb({
                    othis,
                    ogRack,
                    ev,
                });
            });
        othis.reset2unchecked = function()
        {
            othis.ostate = null;
        }
        ostate2gui( othis.ostate );

        //no callback, behind the scene reset
        othis.setopt = function( true8false )
        {
           othis.ostate = true8false;
           ostate2gui( othis.ostate );
        };
        return othis;


        function ostate2gui( ostate )
        {
            if( ostate ) {
                othis.dom$.addClass( 'oselected' );
            } else {
                othis.dom$.removeClass( 'oselected' );
            }
        }
    }

    //instead of function unchecksAll()
    //do use this: setsAllOptsExceptIx({ ogRack, val:false, ix:-1 })
    function setsAllOptsExceptIx({ ogRack, val, ix })
    {
        ogRack.optBoxes.forEach( (obox,oix) => {
            if( oix !== ix ) {
                obox.setopt( val );
            }
        });
    }



    function setsOneTimeCss( bosize, ogRack )
    {
        if( gloCssIsSet ) return;
        gloCssIsSet = true;
        var radioRadius     = Math.floor( bosize*0.7 );
        var checkRadius     = Math.floor( bosize*0.3 );
        var fsize           = Math.max( 1, Math.floor( bosize*1 ) );
        var bsize           = Math.max( 1, Math.floor( bosize*0.1 ) );
        var bpadding        = Math.max( 1, Math.floor( bosize*0.2 ) );
        globalCss.update( `

            .optbox.radio {
                border-radius   : ${radioRadius}px;
            }
            .optbox.check {
                border-radius   : ${checkRadius}px;
            }

            .optbox {
                display         : inline-block;
                padding         : ${bpadding}px;
                border          : ${bsize}px solid grey;
                font-weight     : bold;
                font-size       : ${fsize}px;
                font-family     : arial, san-serif, helvetica;
                color           : #aaaaaa;
                user-select     : none;
                margin-right    : ${bpadding}px;
                background-color: #ffffff;
            }
            .optboxes.focused .optbox:hover {
                border-color    : #000000;
                color           : #ffffff;
                background-color: #555555;
                cursor          : pointer;
            }

            .optboxes.focused .optbox.oselected:hover,
            .optbox.oselected {
                border          : ${bsize}px solid black;
                color           : #ffffff;
                background-color: #000000;
                cursor          : auto;
            }

            .optboxes.focused {
                background-color: #777777;
            }
            `,
            'optbox-styles'
        );
    }

    //=========================================================
    // //\\ groups
    //=========================================================
    function areAllGroupsFullyChecked( optionOGroups )
    {
        var count = optionOGroups.reduce(
            (acc,og,ix)=>{
                var { allAreChecked } = og.getsInfo();
                //ccc( ix + ' allAreChecked=' + allAreChecked );
                acc += allAreChecked ? 1 : 0;
                return acc;
        }, 0 );
        return count === optionOGroups.length;
    }

    function unchecks_allGroups( optGroups )
    {
        setsup_groupsArray( optGroups, false )
    }

    ///null perhaps is not used in "true0False0Null"
    function setsup_groupsArray( garray, true0False0Null )
    {
        garray.forEach( og => {
            og.optBoxes.forEach( (ob,obIx) => {
                ob.setopt( true0False0Null ); 
            });
        });
    }

    
    ///setsup an entire group-array boxes to value enable0disable
    function enables0disables_groupsArray( garray, enable0disable )
    {
        garray.forEach( og => {
            og.enables0disables( enable0disable );
        });
    }
    //=========================================================
    // \\// groups
    //=========================================================

}) ();


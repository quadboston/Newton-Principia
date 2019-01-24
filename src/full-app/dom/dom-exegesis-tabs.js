( function() {
    var ns          = window.b$l;
    var cssp        = ns.CSS_PREFIX;
    var $$          = ns.$$;
    var sn          = ns.sn;
    var sapp        = sn('sapp'); 

    var fapp        = ns.sn('fapp'); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);
    var fmethods    = sn('methods',fapp);

    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);

    fmethods.test_mobile_and_attach_exegesis_tabs = test_mobile_and_attach_exegesis_tabs;
    sDomF.createExegesisTabs = createExegesisTabs;
    sDomN.processSelectedTab = processSelectedTab;
    return;    








    //============================
    // //\\ Transclusion by mobile
    //============================
    function attachExegesisTabs( parent, upperSibling )
    {
        if( parent.contains( sDomN.exegesisTabs.tab ) ) return;
        if( upperSibling ) {
            //https://stackoverflow.com/questions/4051612/javascript-next-sibling
            var next = upperSibling.nextSibling;
            parent.insertBefore( sDomN.exegesisTabs.tab, next );

        } else {
            parent.insertBefore( sDomN.exegesisTabs.tab, parent.firstChild );
            //.??sets default because "Data" may make texts "empty"

            var amode = sn('mode',sapp);
            var tabKey = amode['proof']+'-og';
            var tab = rg['mobile-tabs'][ tabKey ];
            //ccc( 'refreshing ' + amode['proof'] )
            tab.clicker.click();
        }
    };

    function test_mobile_and_attach_exegesis_tabs()
    {
        ns.test_mobile_mode( function( mobile ) {
            if( mobile ) {
                attachExegesisTabs(
                    sDomN.medRoot,
                    sapp.sappId === 'lemma9' ?
                                     sDomN.mmedia :
                                     document.querySelector('.slider-group')
                )
            } else {
                attachExegesisTabs( sDomN.text$() )
            }
        });
    };
    //============================
    // \\// Transclusion by mobile
    //============================



    ///Outputs: sDomN.exegesisTabs
    function createExegesisTabs()
    {

        var tabroot = sDomN.exegesisTabs = { tab: $$
            .c('div')
            .addClass('tab-section')
            ()
        };
        var ul = $$.c('ul').addClass('tabs').to(tabroot.tab)();
        
        [
            ['areadesk','areadsk', 'Data', 'active' ],
            ['claim-og','claim','Claim'],
            ['proof-og','proof','Proof']

        ].forEach( function( tab ) {
            //.this is an individual tab
            var tabDom = $$ .c('li')
               .addClass('tabs__tab Tab'+(tab[3]?' active':''))
               .addClass('tab-'+tab[0])
               //.html(tab[2])
               .to(ul)
               ();
            var iconClass = 'exegesis-tab-icon-placeholder';
            var ww = $$
                .c('div')
                .addClass(iconClass)
                .css( 'display', 'inline' )
                .to( tabDom )
                ();
            ssF.tr(iconClass,tab[0],ww);

            var clicker = $$
                .c('a')
                .html(tab[2])
                .a('href','#')
                .e('click',function(event) {
                    openTab(tab[0], tabDom);
                    return false; //has no effect ... todm why?
                })
                .to( tabDom )
                (); 
            //tr puts to registry: availibies tab to an entire fapp in
            //sn('registry',ssD) as ssD.registry['mobile-tabs'][tab[0]]
            ssF.tr('mobile-tabs',tab[0],{ clicker: clicker } );
        });
        $$ .c('li')
           .addClass('tabs__indicator')
           .a('role','role="indicator"')
           .to(ul);


        function openTab( tabName, tabDom ) 
        {
            tab = document.getElementsByClassName("Tab");
            for (i = 0; i < tab.length; i++) {
                $$.$(tab[i]).removeClass("active");
            }
            $$.$(tabDom).addClass("active");
            sDomN.processSelectedTab( tabName );
        }
    }

    function processSelectedTab( tabName )
    {
        if( !sapp.isInitialized ) return;
        //.........................................................
        // //\\ processes chosen content
        //.........................................................
        var texts = document.querySelectorAll( '.original-text' );
        texts.forEach( function( text ) {
            $$.addClass( 'hidden', text ); 
        });
        //.........................................................
        // \\// processes chosen content
        //.........................................................



        //.........................................................
        // //\\ makes tab-switch in synch with CSS and menu-engine
        //.........................................................
        var ltb = rg['main-legend'] && rg['main-legend'].tb;

        //.todm
        //.this is an alternative to ltb ... do simplify ... 
        //.too many class attributes
        var domMainLegend = document.body.querySelector('.main-legend');
        //c cc( 'domMainLegend=', domMainLegend, 'tab=',tabName );
        
        switch( tabName.substring(0,5) )
        {
            case 'aread':
                if( ltb ) {
                    $$.removeClass( 'hidden', ltb.claim );
                    $$.removeClass( 'hidden', ltb.proof );
                }
                if( domMainLegend ) {
                    ////lemma2,3 legend showing
                    $$.removeClass( 'hidden', domMainLegend );
                }
                break;
            case 'proof':
                if( ltb ) {
                    $$.addClass( 'hidden', ltb.claim );
                    $$.addClass( 'hidden', ltb.proof );
                }
                if( domMainLegend ) {
                    ////lemma2,3 legend hiding
                    $$.addClass( 'hidden', domMainLegend );
                }
                sDomF.selectMenu( 'proof', 'proof' );
                var text = document.querySelector( '.original-text.chosen' );
                $$.removeClass( 'hidden', text ); 
                break;
            case 'claim': 
                if( ltb ) {
                    $$.addClass( 'hidden', ltb.claim );
                    $$.addClass( 'hidden', ltb.proof );
                }
                if( domMainLegend ) {
                    ////lemma2,3 legend hiding
                    $$.addClass( 'hidden', domMainLegend );
                }
                sDomF.selectMenu( 'proof', 'claim' ); //synchs with master menu
                var text = document.querySelector( '.original-text.chosen' );
                $$.removeClass( 'hidden', text ); 
                break;
        }
        //.........................................................
        // \\// makes tab-switch in synch with CSS and menu-engine
        //.........................................................
    }

}) ();


( function() {
    var {
        $$, nsmethods,
    } = window.b$l.nstree();
    window.onload = test;
    return;



    ///==========================================
    /// test case
    ///==========================================
    function test()
    {
        var og = nsmethods.cre__optgroup({
            //iarrays,
            //  value               | caption | default: empty token === false, non-empt.=== true
            listText : `
                    yes             | yes   |
                    no              | no    |
                    excluded        | skip  |
                    no              | No    |
                    hmm             | Hmm...| true
                `,

            value2view_list : `
                    yes             | <img src="img/unlocked.png"> |
                    no              | <img src="img/locked.png">   |
                    excluded        | <img src="img/excluded.png">  |
                `,
            ogClsId : 'my-opts',
            ogType  : 'check',
            xxxxogStyle : `
                    {
                    }
                `,
            optionIsChanged_cb : ({
                        othis,
                        iarrays,
                        ev,
                    }) => {
                    //ccc( othis, iarrays, ev );
                },
        });
        document.body.appendChild( og.root$() ); 

        var bosize = 18;
        var og2 = nsmethods.cre__optgroup({
            //iarrays,
            //  value               | caption | default: empty token === false, non-empt.=== true
            listText : `
                    yes             
                    no              
                    excluded        
                `,
            value2view_list : `
                    yes             | <img src="img/unlocked.png"> |
                    no              | <img src="img/locked.png">   |
                    excluded        | <img src="img/excluded.png">  |
                `,

            ogClsId : 'my-opts2',
            bosize,
            xxxxogStyle : `.my-opts2 .optbox
                    {
                        margin-right : 3px;
                    }
                `,
            optionIsChanged_cb : ({
                        othis,
                        iarrays,
                        ev,
                    }) => {
                    //ccc( othis, iarrays, ev );
                },
        });
        document.body.appendChild( og2.root$() ); 
        //og2.setsupFocusOnParent( !!'focus0not' );
        og2.root$
            .css( 'height', ( bosize + 8 ) + 'px' )
            .css( 'padding', '5px' )

        var but = $$
            .c( 'button' )
            .css( 'position', 'absolute' )
            .css( 'top', '200px' )
            .html( 'Enable/Disable' )
            .e( 'click', ()=> {
                og2.enable0disable = !og2.enable0disable;
                og2.enables0disables( og2.enable0disable );
            })
            .to( document.body )
            ;

    }

}) ();


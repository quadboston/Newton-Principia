( function() {
    var {
        nsmethods,
    } = window.b$l.nstree();
    window.onload = test;
    return;



    ///==========================================
    /// test case
    ///==========================================
    function test()
    {
        var selectBoxClassId = 'myselect';
        var sbox = nsmethods.create_select_box({

            //iarrays,
            listText : `
                Lithium hydroxide| 	            LiOH
                Sodium hydroxide| 	            NaOH
                Potassium hydroxide|            KOH
                Rubidium hydroxide|             RbOH
                Cesium hydroxide|	            CsOH
                Magnesium hydroxide|            Mg(OH)2
                Calcium hydroxide| 	            Ca(OH)2
                Strontium hydroxide|            Sr(OH)2
                Barium hydroxide| 	            Ba(OH)2
                Tetramethylammonium hydroxide| 	N(CH3)4OH
                Guanidine| 	                    HNC(NH2)2

            `,

            addValueToCaption : true,
            selectBoxClassId,
            sbStyle : `
                .${selectBoxClassId} {
                    border-radius : 5px;
                }
            `,
            optionIsChanged_cb : ({
                    selectedIndex,
                    selectedCaption,
                    selectedValue,
                }) => {
                    ccc( selectedIndex, selectedCaption, selectedValue );
            },
        });
        document.body.appendChild( sbox.sbox$() ); 
    }

}) ();


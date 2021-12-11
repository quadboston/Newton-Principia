( function() {
    var {
        ns, sn, nsmethods, haz, nssvg, $$, globalCss,
    } = window.b$l.nstree();
    window.onload = test;
    return;







    //==================================================
    // //\\ creates pHGraph wrap around fw
    //==================================================
    function test({
    }){

        nsmethods.createsAutoGraphFW({
            arrayToPaint : [
                {
                    x : 0,
                    y : [ 1, 2 ],
                },

                {
                    x : 1,
                    y : [ 2, 3 ],
                },

                {
                    x : 2,
                    y : [ 4, 0 ],
                },
            ],
            domParent : document.body,
        })
    }

}) ();


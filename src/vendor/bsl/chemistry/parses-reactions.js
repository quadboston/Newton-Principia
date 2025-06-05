( function() {
    var {
        chemistry, 
        nsmethods,
    } = window.b$l.nstree();
    chemistry.script2reactants = script2reactants;
    return;




    //  parses
    //  to reaction sides and further to input and output reactants
    //  and coefficients
    /*  api:
        var list =
        caption            | reaction                           | coefficients
        `
            XX + ZZ ->     | X(Z₃)₃ + XZ   -> X(Z)₃↓      + XZ₃ | 1 + 3 -> 1 + 3
            UU + VV ->     | UV₂    + U₃V₄ -> U₃(V₄)₂↓    + YB  | 3 + 2 -> 1 + 6
        `;
    */
    function script2reactants( rlist )
    {
        reactions = nsmethods.lines2itemArrays( rlist );

        //===================================================================
        // //\\ more granular split
        //      to reaction sides and further to input and output reactants
        //      and coefficients as numerical types
        //===================================================================
        var EMPTYE_RE               = new RegExp( '\\s*', 'giu' );
        //splits by arrow string to reaction-sides
        var BALANCE_RE              = new RegExp( '\\s*->\\s*'  );
        //splits by plus symbol to input/output-reactants
        var BALANCE_COMPONENTS_RE   = new RegExp( '\\s*\\+\\s*' );


        ///splits itemsList down to 
        reactions.forEach( act => {
            var inpt0output_strings = act[1].split( BALANCE_RE );
            act[1] = inpt0output_strings.map( side_str => {
                //side_reactants:
                return side_str.split( BALANCE_COMPONENTS_RE ); //split by +
            });
            var inpt0output_balance_strings = act[2].split( BALANCE_RE );
            act[2] = inpt0output_balance_strings.map( side_str => {
                var side_coefficients_strings = side_str.split( BALANCE_COMPONENTS_RE ); //split by +
                return side_coefficients_strings.map( cs => parseInt( cs ) );
            });
        });
        //ccc( reactions );
        return reactions;
        //===================================================================
        // \\// more granular split
        //===================================================================

    }

}) ();


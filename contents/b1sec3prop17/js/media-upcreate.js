( function() {
    var { 
        rg, amode
    } = window.b$l.apptree({ stdModExportList : {
            media_upcreate___part_of_medupcr_basic,
            media_upcreate___before_basic,
        },
    });
    return;


    //each of these functions are called 5x on page load,
    //once each time a dragger is moved,
    //and 3x each when switching tabs

    function media_upcreate___before_basic()
    {
        //console.log('media_upcreate___before_basic');

        //this is a "policy" ... should be in the state manager if any ...
        //todo: what is the point of this? if we don't set it here, 
        //switching tabs after moving a dragger throws errors
        //rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;
        rg.allLettersAreHidden = false;
    }


    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate___part_of_medupcr_basic()
    {
        //console.log('media_upcreate___part_of_medupcr_basic')

        // P is not a dragger in the corollaries
        // todo: is there a build in mechanism for this somewhere?
        let P_svg = document.getElementsByClassName('tp-_p-kernel')[0];
        if(amode.logic_phase === 'corollary') {
            let P_elem = document.getElementsByClassName('point-_p-slider')[0];
            if(P_elem) P_elem.remove();
            if(P_svg) P_svg.style.display = 'none';
        } else {            
            if(P_svg) P_svg.style.display = 'block';
        }

        //draws conics
        //enables curve move when dragging an entire diagram
        rg[ 'approximated-curve' ].poly2svg();
        rg[ 'approximated-curve-sample' ].poly2svg();
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();


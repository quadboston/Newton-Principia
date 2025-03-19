
( function() {
    var {
        sn, $$, haff,
        globalCss,
        eachprop, haz,
        sDomF, sDomN,
    } = window.b$l.apptree({
    });
    sDomF.makes_theorionTab_nonClickable = makes_theorionTab_nonClickable;
    return;








    ///some (plugged in) sites transform tab-button to a tab-label by putting
    ///tabIsInactive flag; this site is such a site;
    ///this function does this job for this site;
    ///todm: non-elegant solution: too much coding:
    function makes_theorionTab_nonClickable()
    {
        sDomN.teafs$.theorion.addClass( 'non-clickable' )
            .e( 'click', function( event ) {
                event.stopPropagation = true;
            })
            ;

        sDomN.teafs$.theorion.tabIsInactive = true;
        globalCss.update( `
                .leftside-menuholder .menu-teaf.non-clickable
                .litem:hover {
                        border          :1px solid transparent;
                }
                .leftside-menuholder .menu-teaf.non-clickable
                .litem:hover
                {
                    border-color    :transparent;
                    background-color:transparent;
                    cursor          :auto;
                    opacity         :1;
                }
                .leftside-menuholder .menu-teaf.non-clickable
                .litem:hover .caption
                {
                    font-size       :80%;
                    font-weight     :bold;
                    color           :#AAAAAA;
                }
                .leftside-menuholder .menu-teaf.non-clickable
                .litem.chosen .caption
                {
                    font-size       :80%;
                    font-weight     :bold;
                    color           :#AAAAAA;
                }
            `,

            //avoids placing css into heap "global css" tag
            'inactive-tabs-document-header-tag',
        );
    }


}) ();


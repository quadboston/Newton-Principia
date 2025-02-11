//\\// Application Entry
( function() {
    var {
        sn,
        $$,
        ssF, ssD,
        sDomN,
        sData,
        stdMod,
    } = window.b$l.apptree({
        ssFExportList :
        {
            createButton,
        },
    });
    return;






    function createButton({
        caption,
        buttonUniversalId,      //must be safe for JavaScript and CSS
        clickCallback,          //real callback
        cssText,
        noTopicScenario,
            scenarioEventOnClick,   //aka 'graph-is-plotted'
    }){
        var butt = ssD.lastPopupButton =
            sData[ buttonUniversalId ] = { dom$ : $$.c( 'div' )
            .addClass( buttonUniversalId )
            .csst( cssText )
            .to( sDomN.simSScene$ )
            .e( 'click', ( ev ) => {
                clickCallback && clickCallback( ev );
                !noTopicScenario && ssF.executesTopicScenario( scenarioEventOnClick );
            })
            .ch( $$.c( 'div' )
                   .css( 'position', 'relative' )
                   .css( 'top', '50%' )
                   .css( 'transform',  'translate(0%,-50%)' )
                   .html( caption )
            )
        }

        var unlockButton = sn( 'unlockButton', stdMod );
        unlockButton[ buttonUniversalId ] = function( doUnlock )
        {
            butt.dom$.css( 'display', doUnlock ? 'block' : 'none' );                        
        }
        return butt;
    }



}) ();


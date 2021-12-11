//\\// Application Entry
( function() {
    var {
        sn,
        $$,
        ssF,
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
        scenarioEventOnClick,   //aka 'graph-is-plotted'
        clickCallback,
        cssText,
        noTopicScenario,
    }){
        var butt = sData[ buttonUniversalId ] = { dom$ : $$.c( 'div' )
            .addClass( buttonUniversalId )
            .csst( cssText )
            .to( sDomN.simSScene$ )
            .e( 'click', () => {
                clickCallback && clickCallback();
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
    }



}) ();


{
    //================================
    // //\\ to link to app
    //================================
    let { fconf, nsmethods } = window.b$l.nstree();
    nsmethods.establishesContentTriggers = establishesContentTriggers;
    //================================
    // \\// to link to app
    //================================

    function establishesContentTriggers( postExecutionCallBack )
    {
        //================================
        // //\\ to link to app
        //      based on b$l framwork
        //================================
        const IMAGE_PATH = fconf.engineImg;
        //================================
        // \\// to link to app
        //================================
        //can be either like const IMAGE_PATH = '../../local-content-trigger';

        ///distributes images
        var divs = document.querySelectorAll( '.trigger-option' ).forEach( div =>
        {
            div.innerHTML = `
                <img class="isclosed" src="${IMAGE_PATH}/content-book-closed.png" title="Click to open local content.">
                <img class="isopen" src="${IMAGE_PATH}/content-book-opened.png" title="click to close local content">
            ` + div.innerHTML;
        });
        var divs = document.querySelectorAll( 'div.trigger-option' ).forEach( div =>
        {
            div.addEventListener( 'click', clicker );
        });

        ///purely decorational block:
        var divs = document.querySelectorAll( '.trigger-content' ).forEach( div =>
        {
            div.innerHTML = div.innerHTML;
        });

        postExecutionCallBack && postExecutionCallBack();
        return;
        
        function clicker()
        {
            let p = this.parentNode;
            p.className = p.className === 'isopen' ? 'isclosed' : 'isopen';
        }
    }
}

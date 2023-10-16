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

        let crHTML = document.createElement( 'div' );
        crHTML.innerHTML = creditsHTML();
        document.body.appendChild( crHTML );

        ///distributes images
        var divs = document.querySelectorAll( '.trigger-option' ).forEach( div =>
        {
            div.innerHTML = `
                <img class="isclosed" src="${IMAGE_PATH}/content-book-closed.png" title="click to open local content">
                <img class="isopen" src="${IMAGE_PATH}/content-book-opened.png" title="click to close local content">
            ` + div.innerHTML;
        });
        var divs = document.querySelectorAll( 'img.isclosed, img.isopen' ).forEach( div =>
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
            let p = this.parentNode.parentNode;
            p.className = p.className === 'isopen' ? 'isclosed' : 'isopen';
        }

        function creditsHTML()
        {
            return `
                <div class="isclosed" style="font-size:9px;">
                    <div class="trigger-option">
                        Image credits
                    </div>
                    <div class="trigger-content">
                        <pre>
    open_book.png:
        Downloaded from: http://www.clker.com/clipart-open-book.html
        Shared by: OCAL 26-Mar-08
        Profile: http://www.clker.com/profile-1068.html
        Web site: http://www.openclipart.org
    closed_book.png
        Drawn by: CrazyTerabyte / Denilson Figueiredo de Sá
        Homepage: http://my.opera.com/CrazyTerabyte/blog/
        Profile: http://openclipart.org/user-detail/CrazyTerabyte
        Downloaded from: http://openclipart.org/detail/9358/book-by-crazyterabyte
        Created: 2007-12-03 18:49:27
        Description: A simple SVG book based on a drawing made on Gimp by Sam Switzer.
                        </pre>
                    </div>
                </div>
         `;
        }        
    }
}

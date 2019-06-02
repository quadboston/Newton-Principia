(function() {
        var ccc = console.log;
        var qq = document.querySelector;
        var qqa = document.querySelectorAll;

        // //\\ CONFIGURATION
        var styleStr = `
                .root.tp-div2 .tp-div2 {
                r: 200px;
        }`;
        var tmpColors =
        [
            '#ff0000','#00ff00','#0000ff','#ff00ff','#ffff00',
        ]; 
        // \\// CONFIGURATION


        window.addEventListener( 'DOMContentLoaded', setupTopics );
        return;




        function setupTopics()
        {
            var root = qq.call( document, ".root" );
            var topicAncors = root.querySelectorAll( "a" );
            if( !topicAncors ) return;

            var style = document.createElement( 'style' );
            document.head.appendChild( style );

            topicAncors.forEach( (item,iix) => {
                var root = qq.call( document, ".root" );
                var cls = item.className;
                var match = cls.match( /tl-(\S*)/ );
                if( !match ) return;
                var tokenName = match[1];
                setHiglight( item, tokenName );

                var bg = tmpColors[iix];
                styleStr += `
                    .root.tp-${tokenName} .tp-${tokenName} {
                        background-color: ${bg};
                        fill: ${bg};
                        opacity:1;
                    }
                `;
            });

            style.innerHTML = styleStr;
        });

        function setHiglight( item, coreName )
        {
            var root = qq.call( document, ".root" );
            item.addEventListener( 'mouseover', ev => {
                root.setAttribute( 'class', 'root tp-' + coreName );
            });
            item.addEventListener( 'mouseleave', ev => {
                root.setAttribute( 'class', 'root');
            });
            ccc( item );
        }

})();



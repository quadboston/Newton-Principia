(function() {

        window.addEventListener( 'DOMContentLoaded', function() {
            var ccc = console.log;
            var qq = document.querySelector;
            var qqs = document.querySelectorAll;
            var root = qq.call( document, ".root" );

            var topicAncors = qqs.call( document, "a" );
            if( !topicAncors ) return;

            topicAncors.forEach( item => {
                var cls = item.className;
                var match = cls.match( /tl-(\S*)/ );
                if( !match ) return;
                setHiglight( item, match[1] );
            });

            function setHiglight( item, coreName )
            {
                item.addEventListener( 'mouseover', ev => {
                    root.setAttribute( 'class', 'root tp-' + coreName );
                });
                item.addEventListener( 'mouseleave', ev => {
                    root.setAttribute( 'class', 'root');
                });
                ccc( item );
            }

        });

})();



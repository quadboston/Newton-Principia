(function() {

        window.addEventListener( 'DOMContentLoaded', function() {
            var ccc = console.log;
            var qq = document.querySelector;
            var root = qq.call( document, ".root" );

            setHiglight( 'div1' );
            setHiglight( 'div2' );
            setHiglight( 'div3' );

            function setHiglight( topicName )
            {
                var dd = qq.call( document, "." + topicName + ".tlink" );
                dd.addEventListener( 'mouseover', ev => {
                    root.setAttribute( 'class', 'root ' + topicName );
                });
                dd.addEventListener( 'mouseleave', ev => {
                    root.setAttribute( 'class', 'root');
                });
                ccc( dd );
            }

        });

})();



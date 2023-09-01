/************************************************************
    Beaver $cript Library.
    Lite weight JavaScript Utilities.
    From time of Investa project:
    /829-july -6-footnote-and-icon/version-829-ins-footnote-and-cash-icon----checked/src/vendor/bsl/core/load-images.js
    Copyright (c) 2018-2019 Konstantin Kirillov.
    License MIT.
*************************************************************/
/*
    /// input API example
    /// images to import from computer file system
    imagesToLoadList =
    {
        'robot-image' : {
            src : "b.mp4050.gif",
        },
    }
}) ();


*/
( function() {
    var {
        nsmethods,
    } = window.b$l.nstree();
    nsmethods.loadImages = loadImages;
    nsmethods.getDataURI = getDataURI;
    return;




    ///loads images from list and calls callbacks per
    ///image and per list-completion
    function loadImages( lastCb, imagesToLoadList )
    {
        //:both these arrays contain completionItems
        var completionArray = [];
        var completionCount = 0;

        ///when last, return the job and possibility to get data
        function checkCompletion()
        {
            if( completionCount === completionArray.length ) {
                lastCb({
                    completionArray,
                    imagesToLoadList,
                    getsDataUri : function() {
                                      return getDataURI( imagesToLoadList );
                                  },
                });
            }
        }
        let ix = 0;
        Object.keys( imagesToLoadList ).forEach( function( key ) {
            let listItem = imagesToLoadList[ key ];
            var img = new Image();
            listItem.ix = ix;
            listItem.img = img;
            completionArray[ ix ] = listItem;
            img.onload = function() {
                completionCount++;
                listItem.cb && listItem.cb( listItem );
                checkCompletion();
            }
            img.src = listItem.src;
        });
    }

    ///converts images to data-image format
    function getDataURI( imagesToLoadList )
    {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext( '2d' );
        Object.keys( imagesToLoadList ).forEach( function( key ) {
            var item = imagesToLoadList[ key ];
            var bImg = item.img;
            canvas.width = bImg.naturalWidth;
            canvas.height = bImg.naturalHeight;
            ctx.drawImage( bImg, 0, 0, canvas.width, canvas.height );
            item.dataURI = canvas.toDataURL();
        });
    }

})();


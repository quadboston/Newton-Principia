( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;
    var has         = ns.h;
    var nsmethods   = sn('methods');
    nsmethods.loadAjaxFiles = loadAjaxFiles;
    return;







    //===============================================================================
    // //\\ microAPI to load list of files
    //===============================================================================
    function loadAjaxFiles(

        //API
        //
        //Input:
        //      filesList = [ f[0], f[1], .... ]
        //          f[ i ].link
        //          f[ i ].responseType  //optional, 'text' is a default
        //          f[ i ].id            //optional
        //          f[ i ].cb = function( loadedItem ) //optional
        //      lastCb - full-success-callback //optional
        //
        //Output:
        // loadedFiles = [ r[0], r[1], .... ];
        //      r = {
        //              text        : xml.responseText,
        //              fileItem    : fileItem,
        //      };
        // loadedFilesById[ fileItem.id ] = r[ id ];
        //
        //Executed if all successful:
        // lastCb( loadedFilesById, loadedFiles )
        filesList,
        lastCb,     //fires up at the moment all files loaded


    ) {
        var loadedFiles     = [];
        var loadedFilesById = {};
        var completionCount = 0;

        filesList.forEach( function( fileItem, ix ) {

            var xml = new XMLHttpRequest();
			try{ 
                xml.responseType = ns.haz( fileItem, 'responseType' ) || 'text';
				xml.open( 'GET', fileItem.link, true );

                ///todom perhaps we can merge both conditions in one "case"  
                if( fileItem.responseType === 'arraybuffer' ) {
    				xml.send();
			        xml.onload = fileOnLoad;
                } else {
    				xml.send( null );
                    //sets primary callback
			        xml.onreadystatechange = process_by_good_readystate;
                }


			} catch ( e ) {	//	TODM
				//Give up.
                completionCount++;
                checkCompletion( fileItem );
			}

            function process_by_good_readystate()
            {
				if ( xml.readyState === 4 ) 
				{
					if( xml.status === 200 )
					{
						fileOnLoad();
					} else {
                        //Give up.
                        completionCount++;
                        checkCompletion( fileItem );
                        //onerror && onerror( 'Ajax problems with URL ' +
                        //         ajaxURL );
					}
				}
            }

            function fileOnLoad()
            {
                var loadedItem = {
                    text : fileItem.responseType === 'arraybuffer' ?
                           xml.response : xml.responseText,
                    fileItem : fileItem,
                };
                //ccc( 'success: ', loadedItem );
                loadedFiles.push( loadedItem );
                if( has( fileItem, 'id' ) ) {
                    loadedFilesById[ fileItem.id ] = loadedItem;
                }
                completionCount++;
                //ccc( completionCount + ' loaded ' + fileItem.src );
                fileItem.cb && fileItem.cb( loadedItem );
                checkCompletion( fileItem );
            }
        });
        return;







        function checkCompletion( fileItem )
        {
            if( completionCount === filesList.length ) {
                lastCb && lastCb( loadedFilesById, loadedFiles );
            }
        }
    }
    //===============================================================================
    // \\// microAPI to load list of files
    //===============================================================================

}) ();


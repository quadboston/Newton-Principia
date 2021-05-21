#!/usr/bin/env php
<?php

    //=====================================================
    // //\\ makes helpers
    //=====================================================
    function cli ( $command,
                   $action_descr,
                   $do_print_output = FALSE,
                   $get_output = FALSE,
                   $do_not_print_command = FALSE
    ) {
    	$res = array();
        $ret = exec( $command, $res, $retcode );
        if( $retcode . '' !== '0' ) {
            printf( "\n$action_descr:\nproblems in command:\n$command\noutput=" ); 
            print_r( $res );
            printf( "\n" );
            exit;
        } else {

            if( !$do_not_print_command ) {
                echo "$command";
            }
          	if( $do_print_output ) {
                echo "output=";
                print_r( $res );
            }
            if( !$do_not_print_command ) {
                echo "\n";
            }

            if( $get_output ) {
                return $res;
            }
        }
    }
    function parse_re( $re, $parsee )
    {
        $parts = array();

        //this is pcre regular expression =
        //perl-compatible regular expression
        $result = preg_match( $re, $parsee, $parts );

        return $result ? $parts : false;
    }
    //=====================================================
    // \\// makes helpers
    //=====================================================







    //=====================================================
    // //\\ does gets zippee name from cmd
    //=====================================================
    if( count($argv) < 3 )
    {
        //too risky: $path_to_dir = '../../../vendor';
        exit( "missed version-project-folder and subsite ... terminating\n" );
    } else {
        $path_to_dir = $argv[1];
        if( !is_dir( $path_to_dir ) )
        {
            exit( 'file ' . $path_to_dir . " does not exist\n" );
        }
        ////narrow zipping down the site/subProject
        $siteid = $argv[2];
    }
    //=====================================================
    // \\// does gets zippee name from cmd
    //=====================================================





    //=====================================================
    // //\\ validates path to zippee
    //=====================================================
    $parsed = parse_re( '#^(|/)(([^/]+/)*)([^/]+)$#', $path_to_dir );
    if( !$parsed )
    {
        exit( "\nproblems with target folder, path to it=\n$path_to_dir\n" );
    }
    $folder_to_zip = $parsed[ 4 ];
    print_r( "zipping folder\n$folder_to_zip\n" );
    //=====================================================
    // \\// validates path to zippee
    //=====================================================










    //***********************************************************
    // //\\ goes inside zippee
    //      not necessarily insed the site
    //***********************************************************
    $ww = chdir( $path_to_dir );
    if( $ww === FALSE ) {
        exit( "\nCannot change directory to " . $path_to_dir . " ... Job aborted.\n" );
    }
    $zippee_full_path = exec( 'pwd' );
    //printf( "\ncurrent dir = $zippee_full_path\n" );
    //***********************************************************
    // \\// goes inside zippee
    //***********************************************************





    //=====================================================
    // //\\ gets version
    //=====================================================
    $path_to_version_file = "version.js";
    $list = glob( $path_to_version_file );
    if( count($list) < 1 ) exit( "version file \"$path_to_version_file\" is missed\n" );

    $js_text = file_get_contents( $list[0] );
    if( $js_text === FALSE ) exit( "js_text is missed\n" );

    //see $versionPattern below
    $version_re = '#' . 
                        '\s*' .
                    'fapp.version' .
                        '\s*' .
                    '=' .
                        '\s*' .
                    '(\d*)' .
                        '\s*' .
                    ';' .
                        '\s*' .
                    '//' .
                        '\s*' .
                    'application version' .
                  '#';
    $matches = array();
    //http://php.net/manual/en/function.preg-match.php    
    $test = preg_match( 
            $version_re,
            $js_text,
            $matches
    );
    if( !$matches ) exit( 'invalid version string in file ' .
                          $list[0] . '.' );
    $version = (int)$matches[1];
    if( (!$version && $version !== 0) || $version . '' !== $matches[1] )
    {
        exit( 'invalid version "' . $matches[1] . "\"\n" );
    }

    /*
    //no need to update version, it should be the same as master pack.
    $next_version = $version + 1;
    //echo "new version = $next_version\n";
    $versionPattern = "\n    fapp.version =  $next_version; //application version";
    $new_content = preg_replace( 
            $version_re,
            $versionPattern,
            $js_text
    );
    //echo $new_content;
    */
    //=====================================================
    // \\// gets version
    //=====================================================





    //=====================================================
    // //\\ gets additional optional name
    //      from command line from user
    //=====================================================
    $archive_postfix    = readline( 'optional name =' );
    $postfix_len        = strlen( $archive_postfix );
    $archive_postfix    = $archive_postfix ? '-' .
                          $archive_postfix : '';
    $archive_postfix    = preg_replace( 
                            '#\s+#',
                            '-',
                            $archive_postfix );
    //printf( $archive_postfix . ' ' . $postfix_len . "\n" );
    //                        $archive_postfix );
    //=====================================================
    // \\// gets additional optional name
    //=====================================================








    //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
    // //\\// begins making changes in file system
    //        exit;
    //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

    //=====================================================
    // //\\ creates prod folder and populates it
    //=====================================================
    chdir( '..' );

    //$name_of_copy = "$version-$folder_to_zip$archive_postfix";
    $name_of_copy = "$version-$siteid-prod$archive_postfix";
    //printf( 'name_of_copy=' . $name_of_copy . "\n" );

    cli( "rm -rf $name_of_copy", "removing former copy is exists", FALSE, FALSE, TRUE );
    cli( "mkdir $name_of_copy", "creating placeholder", FALSE, FALSE, TRUE );

    cli( "mv $folder_to_zip/index.prod.html $name_of_copy", "cloning..", FALSE, FALSE, TRUE );
    cli( "cp $folder_to_zip/sites/$siteid/favicon.ico $name_of_copy", "cloning..", FALSE, FALSE, TRUE );
    cli( "cp -R $folder_to_zip/engine-img $name_of_copy", "cloning..", FALSE, FALSE, TRUE );
    cli( "mv $folder_to_zip/prod $name_of_copy", "cloning..", FALSE, FALSE, TRUE );
    cli( "mkdir $name_of_copy/sites", "creating placeholder", FALSE, FALSE, TRUE );
    cli( "mkdir $name_of_copy/sites/$siteid", "creating placeholder", FALSE, FALSE, TRUE );
    cli( "cp -R $folder_to_zip/sites/$siteid/contents $name_of_copy/sites/$siteid", "cloning..", FALSE, FALSE, TRUE );


    //--------------------------------------------------------------
    // //\\ plugins can be redundant, so in the future,
    //--------------------------------------------------------------
    // create "mechanizm" to selectively clone their children
    cli( "mkdir $name_of_copy/src", "creating placeholder", FALSE, FALSE, TRUE );
    cli( "cp -R $folder_to_zip/src/plugins $name_of_copy/src", "cloning..", FALSE, FALSE, TRUE );
    //--------------------------------------------------------------
    // \\// plugins can be redundant, so in the future,
    //--------------------------------------------------------------

    $command = 'zip -rq ' . $name_of_copy . '.zip ' . $name_of_copy;

    //already excluded,
    //excludes .git from zip,
    //$command .= ' -x *.git* ';

    cli( $command, 'zipping up the copy' );
    //cli( "rm -rf $name_of_copy", "removing zippee copy" );
    //=====================================================
    // \\// creates prod folder and populates it
    //=====================================================






    //=====================================================
    // //\\ updates version-container file
    //=====================================================
    chdir( $folder_to_zip );
    /*
    $success = file_put_contents( $path_to_version_file, $new_content );
    if( $success === FALSE ) {
        exit( "\n\nerror updating version-container file '$path_to_version_file'\n\n" );
    }
    */
    //=====================================================
    // \\// updates version-container file
    //=====================================================



    //=====================================================
    // //\\ waits for user attention
    //=====================================================
    printf( "\nversion $version of\n$zippee_full_path\n" );
    //printf( "new version = $next_version\n" );
    $w = readline( 'zipped, press key ...' );
    echo "\n";
    //=====================================================
    // \\// waits for user attention
    //=====================================================



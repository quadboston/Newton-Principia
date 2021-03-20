#!/usr/bin/env php
<?php

    //*****************************************************
    //zips up all except git files
    //development helper: not a part of deployer
    //advances NNNN.version
    //for intermediate backup between git commits
    //
    //dependency: PHP
    //*****************************************************



    //=====================================================
    // //\\ makes helpers
    //=====================================================
    function cli ( $command, $action_descr, $do_print_output = FALSE, $get_output = FALSE ) 
    {
    	$res = array();
        $ret = exec( $command, $res, $retcode );
        if( $retcode . '' !== '0' ) {
            printf( "\n$action_descr:\nproblems in command:\n$command\noutput=" ); 
            print_r( $res );
            printf( "\n" );
            exit;
        } else {
            //.uncomment for verbose output
            //echo "$command";

          	if( $do_print_output ) {
                echo "output=";
                print_r( $res );
            }
            //.uncomment for verbose output
            //echo "\n";

            if( $get_output ) {
                return $res;
            }
        }
    }
    function parse_re( $re, $parsee )
    {
        $parts = array();
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
        $subProjectSource = $argv[2];
    }
    //=====================================================
    // \\// does gets zippee name from cmd
    //=====================================================





    //=====================================================
    // //\\ validates path to zippee
    //=====================================================
    $parsed = parse_re( '#^(([^/]+/)*)([^/]+)$#', $path_to_dir );
    //print_r( $parsed );
    if( !$parsed )
    {
        exit( "\nproblems with path to target folder:\npath=$path_to_dir\n" );
    }
    //$path_to_parent = $parsed[ 1 ];
    $folder_to_zip = $parsed[ 3 ];
    //print_r( "path_to_parent = $path_to_parent\n" );
    //print_r( "folder_to_zip = $folder_to_zip\n" );
    //=====================================================
    // \\// validates path to zippee
    //=====================================================










    //=====================================================
    // //\\ goes to zippee
    //=====================================================
    //$path_to_dir = '../../../ssfafasf';

    $ww = chdir( $path_to_dir );
    if( $ww === FALSE ) {
        exit( "\nCannot change directory to " . $path_to_dir . " ... Job aborted.\n" );
    }
    $zippee_full_path = exec( 'pwd' );
    //printf( "\ncurrent dir = $zippee_full_path\n" );
    //=====================================================
    // \\// goes to zippee
    //=====================================================





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
    $next_version = $version + 1;
    //echo "new version = $next_version\n";
    $versionPattern = "\n    fapp.version =  $next_version; //application version";
    $new_content = preg_replace( 
            $version_re,
            $versionPattern,
            $js_text
    );
    //echo $new_content;
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
    // //\\ zips up
    //=====================================================
    chdir( '..' );
    $name_of_copy = "$version-$folder_to_zip$archive_postfix";
    //printf( 'name_of_copy=' . $name_of_copy . "\n" );
    cli( "mkdir $name_of_copy", "creating placeholder" );

    cli( "cp -R $folder_to_zip/src $name_of_copy", "cloning.." );
    cli( "cp -R $folder_to_zip/deploy $name_of_copy", "cloning.." );
    cli( "cp -R $folder_to_zip/images $name_of_copy", "cloning.." );
    cli( "cp -R $folder_to_zip/index-$subProjectSource.src.html $name_of_copy", "cloning.." );
    cli( "cp -R $folder_to_zip/version.js $name_of_copy", "cloning.." );
    cli( "cp -R $folder_to_zip/LICENSE $name_of_copy", "cloning.." );
    cli( "mkdir $name_of_copy/sites", "creating placeholder" );
    cli( "cp -R $folder_to_zip/sites/$subProjectSource $name_of_copy/sites", "cloning.." );

    $command = 'zip -rq ' . $name_of_copy . '.zip ' . $name_of_copy;
    //.excludes .git from zip
    $command .= ' -x *.git* ';

    cli( $command, 'zipping up the copy' );
    cli( "rm -rf $name_of_copy", "removing zippee copy" );
    //=====================================================
    // \\// zips up
    //=====================================================






    //=====================================================
    // //\\ updates version-container file
    //=====================================================
    chdir( $folder_to_zip );
    $success = file_put_contents( $path_to_version_file, $new_content );
    if( $success === FALSE ) {
        exit( "\n\nerror updating version-container file '$path_to_version_file'\n\n" );
    }
    //=====================================================
    // \\// updates version-container file
    //=====================================================



    //=====================================================
    // //\\ waits for user attention
    //=====================================================
    printf( "\nversion $version of $zippee_full_path\nzipped\n" );
    printf( "new version = $next_version\n" );
    $w = readline( '... bye ... press any key to leave the task ... ' );
    //echo "OK\n";
    //=====================================================
    // \\// waits for user attention
    //=====================================================



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
    $add_git_repo = false;
    $skips_images = false;
    if( count($argv) < 2 )
    {
        //too risky: $path_to_dir = '../../../vendor';
        exit( "missed path to zippee ... terminating\n" );
    } else {
        $path_to_dir = $argv[1];
        if( !is_dir( $path_to_dir ) )
        {
            exit( 'file ' . $path_to_dir . " does not exist\n" );
        }
        if( count($argv) > 2 and $argv[2] === 'addgit' )
        {
            $add_git_repo = $argv[2] == 'addgit';
        }
        if( count($argv) > 3 and $argv[3] == 'skipimgages' )
        {
            $skips_images = true;
        }
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
    $path_to_version_file = "changelog/version.js";
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
    $versionPattern = "\n    fapp.version = $next_version; //application version";
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
    // //\\ updates build date
    //=====================================================
    $oldBuildDatePattern = '#' . 
                    'fapp.buildDateString\s*=\s*"\d*-\d*-\d*";\s' .
                    '//build date#';
    $today = date('Y-m-d', time());
    $newBuildDatePattern = 'fapp.buildDateString = "' . $today . '"; //build date';
    $new_content = preg_replace( 
            $oldBuildDatePattern,
            $newBuildDatePattern,
            $new_content
    );
    //=====================================================
    // \\// updates build date
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
    $rsync = "$folder_to_zip/ $name_of_copy/";

    $skipper = '';
    if( !$add_git_repo ) {
        //.excludes .git from zip if requested
        $skipper .= ' --exclude \'.git\'';
    }

    if( $skips_images ) {
        $skipper .=
        ' --exclude \'*.png\''.
        ' --exclude \'*.jpeg\''.
        ' --exclude \'*.jpg\''.
        ' --exclude \'*.gif\''.
        ' --exclude \'*.mp4\''.
        ' --exclude \'*.mp3\''.
        ' --exclude \'*.mpeg\''.
        ' --exclude \'*.mov\''.
        ' --exclude \'*.MOV\''.
        ' --exclude \'*.mkv\''.
        ' --exclude \'*.avi\''.
        ' --exclude \'*.webm\''.
        ' --exclude \'*.pdf\''.
        ' --exclude \'*.MP4\''.
        ' --exclude \'*.MP3\''.
        ' --exclude \'*.PNG\''.
        ' --exclude \'*.JPEG\''.
        ' --exclude \'*.GIF\''.
        ' --exclude \'*.MPEG\''.
        ' --exclude \'*.AVI\''.
        ' --exclude \'*.WEBM\''.
        ' --exclude \'*.ogg\''.
        ' --exclude \'*.OGG\''.
        ' --exclude \'*.xcf\''.
        ' --exclude \'*.zip\''.
        ' --exclude \'*.m4a\''.
        ' --exclude \'*.M4A\''
        ;
    }
    $rsync = 'rsync -a ' . $skipper . ' ' . $rsync;
    //echo $rsync;
    printf( $rsync . "\n" );

    cli( $rsync, "cloning the zippee to new name" );
    //printf( 'name_of_copy=' . $name_of_copy . "\n" );
    //cli( "cp -R $folder_to_zip $name_of_copy",
    //     "cloning the zippee to new name" );
    $command = 'zip -rq ' . $name_of_copy . '.zip ' . $name_of_copy;
    printf( $command . "\n" );

    /*
    if( !$add_git_repo ) {
        //.excludes .git from zip if requested
        $skipper .= ' *.git/* ';
    }
    //.excludes images from zip if requested
    $skipper = ' *.png *.jpeg *.jpg *.gif *.mp4 *.mp3 *.mpeg *.mov *.MOV *.mkv *.avi *.webm *.pdf *.MP4 *.MP3 *.PNG *.JPEG *.GIF *.MPEG *.AVI *.WEBM *.ogg *.OGG *.xcf \\*.zip *.m4a *.M4A ';
    if( $skipper ) {
        $command .= ' -x ' . $skipper;
    }
    */
    //prints command^ cli( $command, 'zipping up the copy', TRUE );
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
    printf( "\nsite\n$zippee_full_path" );
    printf( "\nzipped ver. = $version" );
    printf( "\nnew    ver. = $next_version\n" );

    $w = readline( 'done, press key ' );
    echo "\n";
    //=====================================================
    // \\// waits for user attention
    //=====================================================



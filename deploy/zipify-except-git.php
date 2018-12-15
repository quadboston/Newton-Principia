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
    $list = glob( "*.version" );

    if( count($list) < 1    ) exit( "version is missed\n" );
    $parts = preg_split( '#\.#', $list[0] );
    if( count( $parts ) < 2    ) exit( "format must be number.version\n" );

    $version = intval( $parts[0] );
    if( !$version || $version . '' !== $parts[0] )
    {
        exit( 'invalid version "' . $parts[0] . "\"\n" );
    }
    //printf( "current version = $version\n" );
    //=====================================================
    // \\// gets version
    //=====================================================





    //=====================================================
    // //\\ gets additional optional name
    //=====================================================

    if( count($argv) > 2 )
    {
        $archive_postfix = '-'.$argv[2];
    } else {
        $archive_postfix    = readline( 'add name to bsl =' );
        $postfix_len        = strlen( $archive_postfix );
        $archive_postfix    = $archive_postfix ? '-' .
                              $archive_postfix : '';
    }
    $archive_postfix    = preg_replace( 
                            '#\s+#',
                            '-',
                            $archive_postfix );
    //printf( $archive_postfix . ' ' . $postfix_len . "\n" );
    //                        $archive_postfix );
    //=====================================================
    // \\// gets additional optional name
    //=====================================================








    //*****************************************************
    // //\\// begins making changes in file system
    //        exit;
    //*****************************************************

    //=====================================================
    // //\\ zips up
    //=====================================================
    chdir( '..' );
    $name_of_copy = "$version-$folder_to_zip$archive_postfix";
    //printf( 'name_of_copy=' . $name_of_copy . "\n" );
    cli( "cp -R $folder_to_zip $name_of_copy",
         "cloning the zippee to new name" );
    cli( 'zip -rq ' . $name_of_copy . '.zip ' . $name_of_copy . ' -x *.git* ',
         'zipping up the copy' );
    cli( "rm -rf $name_of_copy", "removing zippee copy" );
    //=====================================================
    // \\// zips up
    //=====================================================






    //=====================================================
    // //\\ updates version
    //=====================================================
    $next_version = $version + 1;
    chdir( $folder_to_zip );
    cli( "mv $version.version $next_version.version ", 'updating version' );
    //=====================================================
    // \\// updates version
    //=====================================================






    //=====================================================
    // //\\ waits for user attention
    //=====================================================
    printf( "\n$version of $zippee_full_path\nzipped\n" );
    printf( "new = $next_version\n" );
    $w = readline( '' );
    //echo "OK\n";
    //=====================================================
    // \\// waits for user attention
    //=====================================================



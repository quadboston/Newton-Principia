<?php

    //**********************************************************
    /*
        Spawns template-project folder.
        (former ./cli.php)
        
        The only parameter it needs is a
        $argv[1], an understandable path to
        template-project html file.

        If this path validation fails, the spawn does not start.
        
        See configuration at "//\\ does configuration" below.
    */
    //**********************************************************








    //=====================================================
    // //\\ validatates command line
    //=====================================================
	error_reporting( E_ALL );
	//error_reporting( E_RECOVERABLE_ERROR );
	ini_set( 'display_errors', '1' );
    echo "\n\n";

    function ech( $arg )
    {
        echo $arg . "\n";
    }

    if( count($argv) < 2 )
    {
        echo 'missed project file: usage: ' .  $argv[0] . " file-path\n";
        exit(1);
    }

    $tpl_landing_file = $argv[1];
    if( !is_file( $tpl_landing_file ) )
    {
        ech( 'file ' . $tpl_landing_file . ' does not exist' );
        exit(1);
    }
    ech( "\nspawning: " . $tpl_landing_file );

    $prj_folder = dirname( $tpl_landing_file );
    //ech( "project folder = " . $prj_folder );

    if( !is_dir( $prj_folder ) )
    {
        ech( 'path ' . $prj_folder . ' is not a directory' );
        exit(1);
    }

    $do_uglify = count($argv) > 2 && $argv[2] === 'uglify';
    //=====================================================
    // \\// validatates command line
    //=====================================================






    //=====================================================
    // //\\ does position in project folder
    //=====================================================
    $ww = chdir( $prj_folder ); //note: ?? this does not change __DIR__
    if( $ww === FALSE ) {
        ech( "\nCannot change directory to " . $prj_folder .
             ".\nSpawn did not start.");
        exit(1);
    }
    //ech( "spawning: curr. dir. = " . getcwd());
    //=====================================================
    // \\// does position in project folder
    //=====================================================






    //=====================================================
    // //\\ constructs helpers
    //=====================================================
    ///cli
    function cli ( $command, $action_descr, $do_print_output = FALSE, $get_output = FALSE ) 
    {
    	$res = array();
        $ret = exec( $command, $res, $retcode );
        if( $retcode . '' !== '0' ) {
            echo "$action_descr: problems in command: $command\noutput="; 
            print_r( $res );
            echo "\n";
            exit(1);
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
    ///removes and creates a folder
    function rm8create_folder( $folder )
    {
        if( file_exists( $folder ) ) {
	        if( is_dir( $folder ) ) {
                cli( "rm -rf $folder", "removing folder" );
            } else {
                cli( "rm -f $folder", "removing file" );
            }
        }
        cli( "mkdir $folder", "creating directory" );
    }
    //=====================================================
    // \\// constructs helpers
    //=====================================================






    //=====================================================
    // //\\ does configuration
    //=====================================================
    $appname = 'app';
    $prod_folder = 'prod';
    $vendor_folder = 'vendor';
    $source_folder = 'src-duplicated';
    //.removes excessive leading path (if any) from links
    $removable_extra_path_prefix_re = '#^vbsl/vendor/#';

    //.needs too much work
    //.for links starting at web root
    //.in regex friendly format
    //$web_abs_path_to_vbsl = '\/bwork\/';

    //:spawning config
    $prod_src_engine = $prod_folder . '/' . $appname . '.src.js';
    $prod_min_engine = $prod_folder . '/' . $appname . '.min.js';
    $prod_css_engine = $prod_folder . '/' . $appname . '.css';
    //:abandons uglification: cannot uglify ES6
    //:this assigment acts as a flag to disable uglifier
    if( !$do_uglify ) {
        $prod_min_engine = $prod_src_engine;
    }

    //------------------------------------------
    // //\\ uglify
    //------------------------------------------
    //https://www.npmjs.com/package/uglify-es
    //npm install uglify-es -g
    //:was
    //$path_to_uglifier = 
    //'/home/stan/Downloads/nodejs/node-v6.9.1-linux-x64/lib/node_modules/bower/lib/node_modules/uglify-js/bin/uglifyjs';

    $path_to_uglifier = 'uglifyjs';
    //------------------------------------------
    // \\// uglify
    //------------------------------------------
    //=====================================================
    // \\// does configuration
    //=====================================================















    //---------------------------------
    // //\\ purges up prod_folder
    //---------------------------------
    rm8create_folder( $prod_folder );
    //---------------------------------
    // \\// purges up prod_folder
    //---------------------------------













    //=============================
    // //\\ spawns to party-folders
    //=============================
    //.reg ex for deployment-fragment
    $links_tpl_re = 
        '#' .
        '<!-- //\\\\\\\\ replace with prod script -->' .
        '(.+)' .
        '<!-- \\\\\\\\// replace with prod script -->' .
        '#s';
    $landing_text = file_get_contents( $tpl_landing_file );
    $matches = array();
    //http://php.net/manual/en/function.preg-match.php    
    $test = preg_match( 
            $links_tpl_re,
            $landing_text,
            $matches
    );
    $assembled_file = '';
    $assembled_css_file = '';
    $link_indent = '';


    ///====================================
    /// deployment-fragment found
    ///====================================
    if( $test ) {
        $split_regex = '#(\n|\r)+#';
        $scripts = preg_split( $split_regex, $matches[1] );
        //print_r( $scripts );
        foreach( $scripts as $key => $val ) {
                
            //====================================================================
            //. matches <script string to be minified ...
            $script_extract_regex = '#^(\s*)<(script|link)[^<]+(src|href)=(\'|")([^\'"]+)(\'|")#';
            //====================================================================
            $link_match = array();
            $stest = preg_match( 
                    $script_extract_regex,
                    $val,
                    $link_match
            );
            //echo $stest;
            if( $stest )
            {
                // //\\ link to script discovered in html
                //echo $link_match[5] . "\n";
                $link_indent = $link_match[1];
                $module_text = file_get_contents( $link_match[5] );
                if( $module_text !== FALSE )
                {
                    // //\\ app-script-file really exists
                    //      local path to app-script-file = $link_match[5]
                    //.works well: 
                    $spath_re = '#^((\.\.\/)*)([^\.].*)\/([^\/]+)$#';
                    $link_parts = array();
                    $spath_stest = preg_match( 
                            $spath_re,
                            $link_match[5],
                            $link_parts
                    );
                    if( $spath_stest )
                    {
                        if( $link_match[2] === 'link' ) {
                            $assembled_css_file .= $module_text . "\n";
                        } else {
                            $assembled_file .= $module_text . "\n";
                        }
                    }
                    // \\// app-script-file really exists
                }
                // \\// link to script discovered in html
            }
        }
    }
    //=============================
    // \\// spawns to party-folders
    //=============================





    //===================================
    // //\\ makes engine js and css files
    //===================================
    if( $assembled_file ) {
        //echo substr( $assembled_file, 0, 1000 ) . "\n" . $prod_src_engine . "\n";
        file_put_contents( $prod_src_engine, $assembled_file );

        ///does uglifying tasks
        if( $do_uglify )
        {
            cli( "$path_to_uglifier $prod_src_engine -c -m -o $prod_min_engine", "uglifying" );
            //.rem this out to find ugl. message locations
            cli( "rm -f $prod_src_engine", "removing concatenated non-uglified" );
        }
    }
    if( $assembled_css_file ) {
        //echo substr( $assembled_css_file, 0, 1000 ) . "\n" . $prod_css_engine . "\n";
        file_put_contents( $prod_css_engine, $assembled_css_file );
    }
    //===================================
    // \\// makes engine js and css files
    //===================================




    
    //=============================
    // //\\ makes landing files
    //=============================
    function spawn_landing_file( $content, $regex, $links, $folderto, $fileto )
    {
        $new_content = preg_replace( 
                $regex,
                $links,
                $content
        );
        $new_path = $folderto;
        if( $fileto ) {
            $new_path .= '/' . $fileto;
        }
        //ech( 'saving new landing = ' . $new_path );
        file_put_contents( $new_path, $new_content );
    }
    //.does production landing file

    if( $assembled_css_file )
    {
        ////adds link only if contents of css files is not empty
        $production_css_link = "\n" . $link_indent .
                        '<link rel="stylesheet" type="text/css" ' .
                        'href="' . $prod_css_engine . '">' . "\n";
    } else {
        $production_css_link =  "\n";
    }
    spawn_landing_file( $landing_text,
                        $links_tpl_re,
                        $production_css_link .
                        $link_indent .
                        '<script src="' . $prod_min_engine . '"></script>',
                        'index.prod.html', '' );
    //=============================
    // \\// makes landing files
    //=============================

    echo "spawned\n";


(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'tabs';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;



// //\\ css /////////////////////////////////////////
var ret = `

    
    

    /*~~~~~~~~~~~~~~~~~~~~
    Exegesis-tabs.
    Styles for the mobile tabs
    ~~~~~~~~~~~~~~~~~~~~*/

    /* area-tab is invisible in desktop */
    .tabs .tab-areadesk {
        display:none;
    }
    @media (max-width: 800px) {
        /* area-tab is visible in mobile */
        .tabs .tab-areadesk {
            display:inline-block;
        }
    }

    .tab-section{
        width: calc(100%);
        order:2;
        height:40px;
        padding:0;
        grid-area: tabs;
    }

    .tab-section.desc__text{
        padding-bottom: 128px;
    }

    .tab-section__header{
        display:none;
    }

    .desc-tab {
        background-color: ${ccs['color-white']};
        padding: 16px;
        display: none;
        height:100%;
        margin-bottom:0;
        overflow:scroll;
        
    }
    .tabs {
        position: relative;
        background-color: #fff;
        border-bottom:1px solid ${ccs['color-light-grey']};
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .tabs:after {
        content: ' ';
        display: table;
        clear: both;
    }


    .tabs__tab {
        float: left;
        text-align: center;
    }

    .tabs__tab:first-child.active ~ .tabs__indicator{
        left: 0;
    }

    .tabs__indicator {
        position: absolute;
        bottom: -1px;
        left: 0;
        height: 1px;
        background-color: ${ccs['color-main']};
        transition: left .32s;
    }



    /*------------------------*/
    /* //\\ adjusts for media */
    /*------------------------*/
    .tabs__tab {
        width: 50%;
    }
    .tabs__tab:nth-child(2).active ~ .tabs__indicator {
        left: 0%;
    }
    .tabs__tab:nth-child(3).active ~ .tabs__indicator {
        left: 50%;
    }
    .tabs__indicator {
        width: 50%;
    }
    @media (max-width: 800px) {
        .tabs__tab {
            width: 33.333%;
        }
        .tabs__tab:nth-child(2).active ~ .tabs__indicator {
            left: 33.333%;
        }
        .tabs__tab:nth-child(3).active ~ .tabs__indicator {
            left: calc(33.333% * 2);
        }
        .tabs__indicator {
            width: 33.333%;
        }
    }
    /*------------------------*/
    /* \\// adjusts for media */
    /*------------------------*/



    .Tab > a {
        display: block;
        padding: 10px 12px;
        text-decoration: none;
        color: ${ccs['color-light-grey']};
        transition: color .15s;
    }
    .Tab.active > a {
        color: ${ccs['color-main']};
    }
    .Tab:hover > a {
        color: rgba(${ccs['color-main']},.8);
    }


`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



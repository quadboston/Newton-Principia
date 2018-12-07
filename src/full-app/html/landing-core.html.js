( function() {
    var ns           = window.b$l;
    var sn           = ns.sn;
    var fapp         = ns.sn('fapp' ); 
    var fconf        = ns.sn('fconf',fapp);
    var sconf        = ns.sn('sconf',fconf);

    var sapp         = sn('sapp');
    var html         = sn('html');





    html.landingCore = function()
    {
        var lemmaRomanNumbers = fconf.appview.lemmaRomanNumbers;
        var ln = sapp.lemmaNumber;
        var pmode = sapp.pageMode;
        var landingCore = '';
        var landingPath = window.location.pathname;






        //==================================================
        // //\\ header
        //==================================================

        landingCore += `
        <header>
            <div class="wrapper">
                <div class="landing-text">
                    <h1 class="landing-title">An Interactive Exploration
                        <br>
                        <span>of</span> Newton’s Lemmas</h1>
                    <p class="sub-title"> A couple sentences about Newton's
                         Principia and describing the interactive models in general. It would
                        also be a table of contents to quickly go to any model for the Principia
                    </p>
                    <a href="${landingPath}?conf=lemma=${fconf.startLemmaReadingNumber}" class="read">
                        <div class="read__text">
                            <span class="read__label">Begin Reading</span>
                            <span class="read__title">
                                Lemma ${lemmaRomanNumbers[fconf.startLemmaReadingNumber]}
                            </span>
                        </div>
                        <div class="read__arrow">
                            <img src="images/read-arrow.svg">
                        </div>
                    </a>
                </div>
            </div>
            <img class="newton-img" src="images/newton.jpg">
            <!-- END wrapper -->
        </header>
        `;
        //==================================================
        // \\// header
        //==================================================








        //==================================================
        // //\\ table of contents
        //==================================================
        landingCore += `
            <div class="landing-table-of-contents wrapper">
                <h2>Table of contents</h2>
                <ul>
                    <!--<li><a href="#">Lemma 1</a></li>-->
        `;


        fconf.enabledLemmas.forEach( function( lnumber ) {
            var romNumber = lemmaRomanNumbers[lnumber];
            landingCore += `
                <li><a href="${landingPath}?conf=lemma=${lnumber}">
                    <span class="table-title">Lemma ${romNumber}</span>
                    <span class="table-tag">View</span></a>
                </li>
            `;
        });
        landingCore += `
                <li><a href="#" class="disabled">
                        <span>Lemma ${lemmaRomanNumbers[10]}</span>
                        <span class="table-tag">Coming Soon</span>
                    </a>
                </li>
                <!--<li><a href="#"></span>Lemma 4</span><span class="table-tag">View</span></a></li>-->
                <!--<li><a href="#"></span>Lemma 5</span><span class="table-tag">View</span></a></li>-->
             </ul>
        </div>
        <!--END table of contents-->
        `;
        //==================================================
        // \\// table of contents
        //==================================================


        //==================================================
        // //\\ how-to
        //==================================================
        landingCore += `

        <div class="how-to">
            <div class="wrapper">
                <h2>Usage Guide</h2>
                <div class=" how-to-grid">
                <div class="how-to__cell">
                    <div class="how-to__cell__image">
                        <img src="images/switch.svg">
                    </div>
                    <h4>Translate</h4>
                    <p>Switch between Newton’s description and an informal translation</p>
                </div><!--END cell-->
                <div class="how-to__cell">
                    <div class="how-to__cell__image">
                        <img src="images/model.svg">
                    </div>
                    <h4>Interact</h4>
                    <p>Interact with the model to see the theory in practice.</p>
                </div><!--END cell-->
                <div class="how-to__cell">
                    <div class="how-to__cell__image">
                        <img src="images/resize.svg">
                    </div>
                    <h4>Resizable</h4>
                    <p>Click and drag to resize the area of you’d like.</p>
                </div><!--END cell-->
                </div>
            </div>
            <!-- END wrapper -->
        </div>
         <!--END how to-->
        `;
        //==================================================
        // \\// how-to
        //==================================================









        //==================================================
        // //\\ about wrapper
        //==================================================
        landingCore += `

        <div class="about wrapper">
                <div class="about__text">
                    <h2>About the project</h2>
                    <p>This website was created as a way to better explain Newton’s Lemmas.
                         Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Integer fermentum mauris vel ante laoreet egestas.
                         Suspendisse eu dui vitae orci
                        accumsan iaculis.
                    </p>
                </div>
                <div class="about__author">
                    <p class="about__author__text">
                        Programming by John Scott and Konstantin Krillov.<br>
                        A User Interface Design by
                        <span class="dd-label">
                            <a href="http://theoddson.io">Darien Dodson</a>.
                        </span>
                    </p>
                </div>
        </div>
        <!--END about-->
        `;
        //==================================================
        // \\// about wrapper
        //==================================================

        return landingCore;
    };
}) ();


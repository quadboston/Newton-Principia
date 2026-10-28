// //\\// site-wide config
(function(){

const {ns, nspaste, fapp, fconf} = window.b$l.atree();
full_conf();
fapp.doesConfigLemma();
return;


function full_conf(){
    //it is recommeded to keep this variable in both
    //canonical and research version to simplfiy code
    //cross development,
    //true means research version, false - canonical
    fconf.RESEARCH = true;
    fconf.PING_SITE_URL = 'https://ko-fi.com/L4L618688P';

    ///====================================================
    /// put configuration parameters here
    ///====================================================
    nspaste( fconf, {
        //app decorations
        'header-default-min-height': '610px',

        appDecor: {
            backButtonCaption       : 'Back to the Lemmas',
            landingImage            : 'landing-img.jpg',
            landingImage_alt        : 'portrait of Newton',

            homePageCaption         : 'Newton’s <span>Principia</span><br>' +
                                      'Interactive Models',
            homePageSubCaption      : 'The logic in Newton’s <span>Principia</span> can be hard to follow.<br>' +
                                      'These models make it easier.<br>',
            homePageSubtitle        : 'A supplement to resources such as<br>' +
                                      '* Joseph Gallant’s <span class="dd-label"><a href="https://www.worldscientific.com/worldscibooks/10.1142/13416#t=aboutBook">Newton’s Principia for the Modern Student</span></a><br>' +
                                      '* Dana Densmore’s <span class="dd-label"><a href="https://www.greenlion.com/books/NewtonPrincipia.html">Newton’s Principia: The Central Argument</span></a><br>' +
                                      '* L. Bernard Cohen’s <span class="dd-label"><a href="https://www.jstor.org/stable/10.1525/j.ctt9qh28z">A Guide to Newton’s Principia</span></a>',
                                        /*'<ul>' +
                                            '<li>Joseph Gallant’s <i>Newton’s Principia for the Modern Student</i></li>' +
                                            '<li>Dana Densmore’ <i>Newton’s Principia for the Modern Student</i></li>' +
                                        '</ul>',*/
            helpButtonCaption       : 'Hover over the diagram or text to interact',
        },
        //------------------------------------------------------
        // //\\ macros,
        //      keyNames must not include RegEx special chars.
        //------------------------------------------------------
        HTMLMacroKey : '<><>',
        textScriptMacros : {
            CXX2E :
                `<a target="_blank" href="?conf=sappId=addd-fw#Cframework">`+
                `Vector Calculus</a>
                to
                <a target="_blank" href="?conf=sappId=addd-fw#Eframework">Euclid</a>
                framwork`
            ,
            E2CXX :
                `<a target="_blank" href="?conf=sappId=addd-fw#Eframework">`+
                `Vector Calculus</a>
                to
                <a target="_blank" href="?conf=sappId=addd-fw#Cframework">Euclid</a>
                framwork`
            ,
            CXX :
                `<a target="_blank" href="?conf=sappId=addd-fw#Cframework">` +
                `Vector Calculus</a> framework`
            ,
        },
        //------------------------------------------------------
        // \\// macros,
        //------------------------------------------------------
    });
}
})();

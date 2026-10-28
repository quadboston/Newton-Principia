(function(){
const {
        ns, sn, $$, haz, userOptions, globalCss,
        fapp, fconf, sapp, sconf, html, stdMod,
     } = window.b$l.atree();
html.buildAbout = buildAbout;
return;

    //==================================================
    // //\\ about wrapper
    //==================================================
    function buildAbout (){
        var coreText = `
            <div class="about__author">
                <h3 style="color:white;"
                    onclick="
                        const st = this.parentNode.querySelector( 'p' ).style;
                        st.display = st.display === 'none'? 'block':'none'";
                    onmouseover="
                        this.style.color = '#aaaaff';
                        this.style.cursor = 'pointer';"
                    onmouseout="
                        this.style.color = '#ffffff';
                        this.style.cursor = 'auto';"
                >About Engine.</h3>
                <p class="hp-text-section-body" style="display:none;">
                    <span class="dd-label"><a href="https://www.linkedin.com/in/john-scott-61956614/">John Scott</a>:</span>
                        concept, production, programming, video<br>
                    <span class="dd-label"><a href="https://bastyon.com/konstantin_kirillov">Konstantin Kirillov:</a></span>
                        lead programming, addenda, UI<br>
                    <span class="dd-label"><a href="https://github.com/quadboston/Newton-Principia">Source Code:</a></span>
                        open source, MIT license. Built ${fapp.buildDateString}, Version 0.${fapp.version}<br>
                </p>
            </div>`;
        $$.c('div').addClass('hp-text-section hp-section-wrap').to(fapp.homePage$())
            .html(coreText);
    }
    //==================================================
    // \\// about wrapper
    //==================================================
})();

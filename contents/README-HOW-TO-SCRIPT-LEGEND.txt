Diagram legend data table usually is scripted in file main-legend.js.

Script usually located in variable legendScript.

legendScript format is

    cluster[ cluster][ cluster]...
    cluster[ cluster][ cluster]...
    cluster[ cluster][ cluster]...
    ...

    where each line creates table's row,
    cluster creates three td cells: caption, equality symbol, cell content.
    clusters sepaated with space,
    cluster format is:

    cssClasses,caption,value
    i.e. the comma is a separator of tokens in cluster,

    caption goes to the first cell, value to the third.

    value is scripted as JavaScript code, which is evaluated each time when
    diagram or model changes,

    legendScript is processed in src/base/lemma/media-model/main-legend.js

    clusters seprated with space, therefore no space must exist in cluster's body,
    the string cssClasses can include token <_> which will be converted to space,
    the "tp-" will be prepended to cssClasses string,

    "_" converts to space " " in caption,

Example:

    //==========================
    // //\\ lemma 6 scripts
    // //\\ claim's script
    //--------------------------
    var legendScript =  {
        claim : 
        [
            //first table row
                //first cell
                'angleBAD,angle&nbsp;BAD&nbsp;=&nbsp;,""' +

                ' ' +
                //second cell
                'angleBAD,,' +
                '-rg.AB.angleGrad.toFixed()+"ᵒ"'
        ]
    };
    //--------------------------
    // \\// claim's script
    //--------------------------

In above,
    -rg.AB.angleGrad.toFixed()+"ᵒ"
    is a JS-expression which will be evaluated in "local-JS-context" and placed as a value
    of td html-element.

    angleBAD is converted to tp-angleBAD and, for CSS, to tp-angle_b_a_d and defines color
    of td triad and its behavior through css classes machinery.

Example in proposition 7,

            'dtime<_>data-monospace,Δt&nbsp;:,"&nbsp;"+(rg.tForSagitta.val*2).toFixed(4)',

            '_s_p,SP&nbsp;:,"&nbsp;"+rg.SP.vector.abs.toFixed(4)',
            '_r_l,RL&nbsp;:,"&nbsp;"+rg.RL.vector.abs.toFixed(4)',
            '_p_v,PV&nbsp;:,"&nbsp;"+rg.PV.vector.abs.toFixed(4)',
  
            'estimated_force<_>data-monospace,Estimated_force_at_P&nbsp;:,"&nbsp;"+stdMod.graphFW_lemma.graphArray[stdMod.pos2qix()].y[4].toFixed(4)'
            ,
  
            'force<_>data-monospace,Actual_force_at_P&nbsp;:,"&nbsp;"+stdMod.graphFW_lemma.graphArray[stdMod.pos2qix()].y[0].toFixed(4)'
            ,
  
            'none,_,"<_>"'
             
            , //dummy row for spacing at foot
            'none,_,"<_>"' //dummy row for spacing at foot
        ];

In above, the only effect of the presense of data-monospace in class field
triggers this css:
.main-legend td.monospace {
    font-family : var(--data-numerical-font);
}

To see the code and JS-context of eval operator, look in:

src/base/lemma/media-model/main-legend-templates.js
    function dataSourceParsed1__2__makesBodyCluster({
    function dataSourceParsed1__2__updatesDataInCell({


# DATA TABLE FRAMEWORK AND STYLES

Diagram legend data table usually is scripted in file main-legend.js.

The tables are contructed by calling the appropriate functions defined in 
src/base/lemma/media-model/main-legend-template.js

The data is processed and updated in src/base/lemma/media-model/main-legend.js

* Note: this does not apply to the tables in the following pages,
* which have their own unique table constructors:
* L2, L3, L9, L10, P1, P2, L20, L21

Table styles are defined in src/base/css/subroots.css with the .main-legend classname.
* Note these styles apply to all tables except L2 and L3

The colours of the data itself is defined in each page's sconf.js file as they are used
to link text, model elements, and the data. 
*Use global colours as defined in contents/conf/lemma.conf.js rather than specifying page-only colours.


# DEFINING TABLE DATA

Data is defined as a three-dimensional array that must be named legendScriptParsed. 
(This variable name is a misleading relic of the original implementation.
 If we want to change it to something clearer, like 'tableData' we would 
 have to update main-legend-template.js as well as each page's main-lengend file)

////**********************************************************************************
//// legendScriptParsed format:
////
//// 3D array encompassing all data to be displayed and regularly updated in each tab
////    tableData = [
////        [[cluster 1], [cluster 2], ...] //defines one whole row
////    ]
////
////    Each cluster array has 3 elements: [class-attribute-of-td, caption, value]
////
////    1. class-attribute-of-td will be converted to class attribute and be added to each cell in the cluster,
////       "td-" will be prepended to the string, this class is also used in txt links to specify mouseover styling.
////       Additional classes may be added here as needed. Example "ab fancy" will apply classes .td-ab and .fancy
////       to both cells in the "cluster"
////       * Caution: <_> will be replaced with space
////  
////    2. Caption is defined as a string and will populate the first cell in the "cluster".
////       This content is added as html, so if special styling is needed within the caption,
////       it be added using html markup such as "Data is <span style='color:red'>special</span>"
////        * Caution: '_' is replaced with ' ' in caption,
////
////    3. Data must be a string; eval() will be used to parse value
////
////**********************************************************************************


Example (using Lemma 6):

var legendScriptParsed = {
    claim : [
        [[ 'angleBAD', 'angle BAD', '-rg.AB.angleGrad.toFixed()+"ᵒ"' ]]
    ],
    proof : [
        [[ 'angleBAD',  'angle BAD', '-rg.AB.angleGrad.toFixed()+"ᵒ"' ]],
        [[ 'L', 'rectilinear angle', '(-(rg.curveRotationAngle.angle+rg.originalGapTangent.angle)*180/Math.PI).toFixed()+"ᵒ"' ]]
    ]
};

In above,
    -rg.AB.angleGrad.toFixed()+"ᵒ"
    is a JS-expression which will be evaluated in "local-JS-context" and placed as a value
    of td html-element.

    angleBAD is converted to tp-angleBAD and, for CSS, to tp-angle_b_a_d and defines color
    of td triad and its behavior through css classes machinery.

* Note that for some reason capital letters in the class attribute are converted to lowercase 
  letters with an underscore prefix.


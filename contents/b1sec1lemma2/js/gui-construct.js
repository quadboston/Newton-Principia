( function () {

const {sn, $$, svgNS, nspaste, fapp, fconf, sconf,
       sDomF, rg, stdMod,} =
      window.b$l.apptree({ setModule,});
var stdL2               = sn('stdL2', fapp );
var gui                 = sn('gui', stdL2 );
var guicon              = sn('guiConstruct', gui );
var guiup               = sn('guiUpdate',gui);
var dr                  = sn('datareg', stdL2 );

var study               = sn('study', stdL2 );
var sdata               = sn('sdata', study );
return;


function setModule (){
    Object.assign( guicon,
    {
        constructsRectsSvg_tillExtraOffset_without_parameters,
        constructsControlPoints,
        constructBasePts_domParless,
        reset_hollowPoints,
    });
}

//======================================================
// //\\ rects
//======================================================
//apparently makes "emptu junk" "without numbers there"
function constructsRectsSvg_tillExtraOffset_without_parameters (){
    //this is just an empty list
    makes_rects( dr.circRects,
                 "tp-circumscribed-rectangles circumscribed");
    makes_rects( dr.InscrRects, "tp-inscribed-rectangles inscribed");
    makes_rects( dr.differenceRects, "tp-difference difference");
}

//listWrap can hold an empt arry
//reserves "empty junk" and includes
//cells 0,...,listWrap.offset-1 there.
function makes_rects( listWrap, classStyle ){
    classStyle += ' rect tofill';
    let BASE_MAX_NUM = sconf.BASE_MAX_NUM;
    let list = listWrap.list;
    let len = BASE_MAX_NUM+listWrap.offset;
    for (var i=0; i<len; i++){
        //"makes an empty junk"
        list.push( shapeType2svgel_without_parameters( "rect", classStyle ) );
    }
}
//======================================================
// \\// rects
//======================================================

//======================================================
// //\\ figure and base contol points
//======================================================
///builds list of control points, dr.rgCtrlPts,
///This is the last time we use "sconf.ctrlMedpos".
function constructsControlPoints (){
    var rgCtrlPts = dr.rgCtrlPts;
    for (var i=0, len=sconf.ctrlMedpos.length; i < len; i++) {
        var cp = sconf.ctrlMedpos;
        var shpid = 'ctrl'+i;
        var pt = rg[shpid];
        const svgel = pt.svgel;
        //todo need?
        svgel.setAttributeNS( null, "id", shpid );
        svgel.setAttributeNS( null, "draggable", "false" );
        pt.dom = svgel;
        pt.type= 'ctrl';
        pt.index = i;
        pt.id = shpid;
        pt.svgel$.addClass("ctrlPt");
        pt.x = pt.medpos[0];
        pt.y = pt.medpos[1];
        rgCtrlPts.push( pt );
    }
    reset_hollowPoints({ onCurve:true, onBase: false });
}

function reset_hollowPoints({ onCurve, onBase }){
    let view = sdata.view;
    let isFig = !!view.isFigureChecked;
    let isIn = !!view.isInscribed;
    let isCir = !!view.isCircumscribed;
    //let functionYes = !isFig &&
    //          ((!isIn && isCir) || (isIn && !isCir));
    // control points
    var rgCtrlPts = dr.rgCtrlPts;
    if( onCurve ) {
        for (var i=0, len=dr.rgCtrlPts.length; i < len; i++) {
            //if( i===4 ) functionYes = false; //continue;
            //pt = dr.movables[ type + i ]
            let pt = rgCtrlPts[i];
            let pdom = pt.dom;
            pdom.style.fill = !isFig ? 'transparent' :
                //in canonical code, there is a flag
                //rgX.move2updates() which adds white
                //kernel to the point, but here we go the custom
                //way,
                'rgba(255,255,255,1)'; //makes the point hollow
        pdom.style.stroke = !isFig ? 'transparent' :
                sDomF.tpid0arrc_2_rgba( 'curve' );
        }
    }

    // //\\ dehollowfies basePts
    if( onBase && fconf.sappId === 'b1sec1lemma3' ) {
        let bplist = dr.basePts.list;
        const DRAGGABLE_BASE_POINTS = sconf.DRAGGABLE_BASE_POINTS;
        for (var i=0,
            //let len=Math.min(
            //sconf.DRAGGABLE_BASE_POINTS, sconf.BASE_MAX_NUM );
            len=sconf.DRAGGABLE_BASE_POINTS;
            i <= len; i++) {
            //not yet draggable, just a template
            //todo-patch-disable-base-drag 1 of 2
            //if( i>0 ) {
            //    guiup.figurePnt_2_cls8style( pt );
            //}
            var pt = bplist[i];
            var pdom = pt.dom;

            // //\\ apparenly this has no effect,
            //the effect happens in
            // adaptsPartitionChange() or in
            // constructBasePts_domParless( basePts )
            //pdom.style.fill = 'rgba(255,255,255,1)';
            pdom.style.fill = !isIn && !isCir ? 'transparent' :
                //.todm patch
                'rgba(255,255,255,1)'; //makes the point hollow
            // \\// apparenly this has no effect,

            //if( i >0 && i < 7 )
            //    c cc( pt.id + ' ' + pdom.style.fill, pdom,  );
            pdom.style.stroke = !isIn && !isCir ? 'transparent' :
                sDomF.tpid0arrc_2_rgba( 'curve' );
        }
    }
    // \\//  dehollowfies basePts
}

///apparently, base points from second to "D" are
///draggable (movable) and also include draggable point "E" = end point,
function constructBasePts_domParless( basePts ){
    let bplist = basePts.list;
    //constant, sconf.BASE_MAX_NUM = usually 500,
    //sconf.DRAGGABLE_BASE_POINTS = usually 15,
    const DRAGGABLE_BASE_POINTS = sconf.DRAGGABLE_BASE_POINTS;
    const l3 = fconf.sappId === 'b1sec1lemma3';
    for (var i=0, len=sconf.BASE_MAX_NUM; i <= len; i++) {
        //not yet draggable, just a template
        pt = dragP_2_svgel8pntRack( "base", i );
        if( l3 && i < DRAGGABLE_BASE_POINTS ) {
            //todo-patch-disable-base-drag 1 of 2
            if( i>0 ) {
                guiup.figurePnt_2_cls8style( pt );
            }
        }
        pt.dom.style.fill = 'rgba(255,255,255,1)';
        pt.medpos = [];
        bplist.push( pt );
    }
};
//======================================================
// \\// figure and base contol points
//======================================================

//==================================================
// //\\ common shape
//      dom placeholders without numeric parameters
//==================================================
function shapeType2svgel_without_parameters( shapeType, classStyle ){
    ///does only dom
    var svgel = document.createElementNS( svgNS, shapeType);
    svgel.setAttributeNS(null, "class", classStyle);
    svgel.setAttributeNS(null, "visibility", "hidden");
    stdMod.medScene.appendChild( svgel );
    return svgel;
}

///does only dom and bookkeeper, dr.movables[ key ] = draggable,
///creates svg-circle-tag with unit-transform and and
///appends it to svg-root
function dragP_2_svgel8pntRack( type, i ){
    var key  = type + i;

    //aka rgX.svgel = svgel
    var svgel = document.createElementNS( svgNS, "circle");
    stdMod.medScene.appendChild( svgel );
    svgel.setAttributeNS( null, "id", key );

    svgel.setAttributeNS( null, "draggable", "false" );
    //todo ... redundant? ...

    //aka rgX and rgX.dom === svgel
    var draggable = { dom:svgel, type:type, index:i, id:key };
    return draggable;
}
//==================================================
// \\// common shape
//==================================================

})();

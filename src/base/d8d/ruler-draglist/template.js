//full blown slider template with svgs, but
//has own specifict list sn( 'rulerDraglist',stdMod ...
(function(){
const {$$, has, haz, nssvg, sconf, ssF, stdMod} =
      window.b$l.apptree({ ssFExportList:
           { sliderRgxPos2unscaledSvgs },
});
return;


///updates media position of svg-shape from
///model position of this shape;
///also updates text-caption if any of this shape;
///needs arg or "this"
function sliderRgxPos2unscaledSvgs( rgX )
{
    rgX = rgX || this;
    rgX.medpos = ssF.modpos2medpos_original( rgX.pos, );
    nssvg.u({
        svgel   : rgX.svgel,
        parent  : stdMod.medScene,
        cx : rgX.medpos[0],
        cy : rgX.medpos[1],
    });
    rgX.text_svg.setAttributeNS( null, 'x', rgX.medpos[0]-8 );
    let txtPosY = sconf.GENERIC_SLIDER_HEIGHT_Y *
                    ( haz( sconf, 'SLIDER_TEXT_POZ_Y_FACTOR' ) || 0.8 );
    rgX.text_svg.setAttributeNS( null, 'y', rgX.medpos[1] + txtPosY );
    //c cc( 'template finalizes=' +  rgX.slCaption );
    if( has( rgX, 'slCaption' ) ) {
        ///updates GUI caption
        ///rgX.text_svg.textContent = slCaption + '=' +
        ///(value_current-2).toFixed(0);
        rgX.text_svg.textContent = rgX.slCaption;
    }
};
})();


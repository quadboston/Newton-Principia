(function() {
    var { } = window.b$l.apptree({ ssFExportList : { 
        initDataReg,
    }, });
    return;


    function initDataReg({xLeft, width, height, yBottom,
        BASE_PT_DRAGGERS_ENABLED, POINT_LABELS, DRAGGABLE_END_POINTS,
        TRANSFORM_PT_I_ENABLED, TRANSFORM_PT_J_ENABLED,
        DR_ADJUST_WIDTHS_MATCH_AREA_RATIOS}) {
        return {
            //offset 0 (was 1) to hide base point on right side of figure
            basePts         : {offset:0, visOffset:0, list:[]},
            curvPts         : {offset:1, visOffset:0, list:[]},
            transPts        : {offset:1, visOffset:0, list:[]},
            circRects       : {offset:0, visOffset:0, list:[]},
            InscrRects      : {offset:0, visOffset:0, list:[]},
            differenceRects : {offset:0, visOffset:0, list:[]},

            //baseLabels      : {offset:1, visOffset:0, list:[]},
            curvLabels      : {offset:0, visOffset:0, list:[]},
            leftLabels      : {offset:0, visOffset:0, list:[]},
            //righLabels      : {offset:0, visOffset:0, list:[]},
            //deltaOnLeft historically means "virtual majoranta-rectangle"
            //is on the right
            figureParams    : {minX:0, maxX:0, deltaOnLeft:true},
            figureArea      : 0,
            curveMicroPts   : {points:[], sectionIndices:[]},
            ctrlPts         : {
                //Control point draggers with transformed positions.
                list:[],
                //Default positions which are never transformed but modified
                //as the control points are dragged.  Note the transforms use
                //the first and last points for their initialization.
                untransformed : controlPointPositions(xLeft, width, height,
                    yBottom),
                //Are the first and last control points on the curve draggable
                DRAGGABLE_END_POINTS,
            },
            partitionWidths : [1],
            movables        : {}, //key-value for movable jswrap
            //Specifies what points have what labels (for L4)
            POINT_LABELS,
            BASE_PT_DRAGGERS_ENABLED,
            transforms       : {
                //The following shouldn't be active at the same time as
                //DRAGGABLE_END_POINTS
                POINT_I_ENABLED : TRANSFORM_PT_I_ENABLED,
                POINT_J_ENABLED : TRANSFORM_PT_J_ENABLED,
                //Pos to transform relative to, automatically set
                origin          : null,
                pts             : {},//To store the draggers
            },
            //Automatically adjust rectangle widths in this datareg to match
            //the ratio of areas in the following datareg.
            DR_ADJUST_WIDTHS_MATCH_AREA_RATIOS,
        }
    };

    
    function controlPointPositions(xLeft, width, height,
        yBottom = 332) {//Bottom of figure

        //Unscaled positions (used as a template)
        const positionsUnscaled = [
            //Top left
            {x: 0, y: 0},
            //Two middle handles
            {x: 102.7, y: 44.5},
            {x: 217.3, y: 151.0},
            //Bottom right
            {x: 265, y: 252},
        ];

        const pLast = positionsUnscaled[positionsUnscaled.length-1];
        const xScale = width / pLast.x;
        const yScale = height / pLast.y;

        //Offset and scale positions relative to bottom left
        return positionsUnscaled.map(p => {
            return {
                x: Math.round(p.x * xScale + xLeft),
                y: Math.round((p.y - pLast.y) * yScale + yBottom),
            };
        });
    }
}) ();
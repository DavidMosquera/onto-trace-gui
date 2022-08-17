import React, {useRef, useEffect} from 'react'
import {dia, shapes} from 'jointjs'
export function GetArtifactViewOnGraph(tab){
    const rect = new shapes.standard.Rectangle()
    const canvas = new useRef(null);
    useEffect(() => {
        const graph = new dia.Graph({}, { cellNamespace: shapes });
        const paper = new dia.Paper({
            model: graph,
            background: {
                color: '#FFFFFF',
            },
            frozen: true,
            async: true,
            sorting: dia.Paper.sorting.APPROX,
            cellViewNamespace: shapes,
            width:"100%",
            height: "70vh"
        });
        canvas.current.appendChild(paper.el);
        paper.render()
        const rect = new shapes.standard.Rectangle({
            position: { x: 100, y: 100 },
            size: { width: 100, height: 50 },
            attrs: {
                label: {
                    text: 'Hello word'
                }
            }
        });
        graph.addCell(rect);
        paper.unfreeze();

        return () => {
            paper.remove();
        };
    }, []);

    return (
        <div className={"canvas shadow-lg mt-2 mb-0 bg-white rounded"} ref={canvas} id={"canvas"}> </div>
    );
}
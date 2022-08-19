import React from 'react'
import {GetTextArtifact} from "./TextArtifact";

export function GetClassDiagramListItem({_class, onSeeArtifact, canIChangeArtifact}){
    const {name,individualURI,attributes,operations, associations}= _class
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={"heading"+name}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target={"#"+name} aria-expanded="true" aria-controls={name}>
                    {name.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}
                </button>
            </h2>
            <div id={name} className="accordion-collapse collapse" aria-labelledby={"heading"+name}>
                <div className="accordion-body">
                    <div className="card card-body">
                        <GetTextArtifact canIChangeArtifact={canIChangeArtifact} artifactUri={individualURI} seeArtifact={onSeeArtifact}/>
                    </div>
                    {
                        attributes.map((attribute)=>{
                            return (
                                <div className="card card-body">
                                    <GetTextArtifact canIChangeArtifact={canIChangeArtifact} artifactUri={attribute} seeArtifact={onSeeArtifact}/>
                                </div>
                            );
                        })
                    }
                    {
                        operations.map((operation)=>{
                            return (
                                <div className="card card-body">
                                    <GetTextArtifact canIChangeArtifact={canIChangeArtifact} artifactUri={operation} seeArtifact={onSeeArtifact}/>
                                </div>
                            );
                        })
                    }
                    {
                        associations.map((association)=>{
                            return (
                                <div className="card card-body">
                                    <GetTextArtifact canIChangeArtifact={canIChangeArtifact} artifactUri={association} seeArtifact={onSeeArtifact}/>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
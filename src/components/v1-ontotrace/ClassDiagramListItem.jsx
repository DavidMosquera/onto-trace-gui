import React from 'react'

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
                    <a style={{cursor:canIChangeArtifact?"default":"progress", opacity:canIChangeArtifact?"1.0":"0.6"}} href={"#"} className="card card-body text-decoration-none" onClick={()=>{
                        const classArtifact = {
                            individualURI:individualURI
                        }
                        onSeeArtifact(classArtifact)
                    }}>
                        {individualURI.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}
                    </a>
                    {
                        attributes.map((attribute)=>{
                            return (
                                <a style={{cursor:canIChangeArtifact?"default":"progress", opacity:canIChangeArtifact?"1.0":"0.6"}} href={"#"} className="card card-body text-decoration-none" onClick={()=>{
                                    const attributeArtifact = {
                                        individualURI:attribute
                                    }
                                    onSeeArtifact(attributeArtifact)
                                }}>
                                    {attribute.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}
                                </a>
                            );
                        })
                    }
                    {
                        operations.map((operation)=>{
                            return (
                                <a style={{cursor:canIChangeArtifact?"default":"progress", opacity:canIChangeArtifact?"1.0":"0.6"}} href={"#"} className="card card-body text-decoration-none" onClick={()=>{
                                    const operationArtifact = {
                                        individualURI:operation
                                    }
                                    onSeeArtifact(operationArtifact)
                                }}>
                                    {operation.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}
                                </a>
                            );
                        })
                    }
                    {
                        associations.map((association)=>{
                            return (
                                <a style={{cursor:canIChangeArtifact?"default":"progress", opacity:canIChangeArtifact?"1.0":"0.6"}} href={"#"} className="card card-body text-decoration-none" onClick={()=>{
                                    const associationArtifact = {
                                        individualURI:association
                                    }
                                    onSeeArtifact(associationArtifact)
                                }}>
                                    {association.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}
                                </a>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
import React, {useEffect, useState} from 'react'
import {GetClassDiagramListItem} from "./ClassDiagramListItem";
export function GetClassDiagramList({onSeeArtifact}){
    const projectId = localStorage.getItem("current-project");
    const [classes, setClasses] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
        setIsLoading(true)
        fetch("http://localhost:8080/onto-trace-api/ontology-web-services/class-diagrams/id="+projectId)
            .then(res => res.json())
            .then(
                (data) => {
                    if(Object.keys(data).length !== 0){
                        const {_embedded:{sourceList}} = data
                        let processedClasses = []
                        sourceList.forEach((_class)=>{
                            let processedClass = {
                                individualURI: _class.individualURI,
                                name:_class.individualURI.split("#")[1],
                                attributes: [],
                                operations: [],
                                associations: []
                            }
                            _class.statements.forEach((statement) => {
                                if(statement.match(/.*#hasAttribute.*/g)){
                                    statement = statement.split(" ")[2].replaceAll(/<|>|\s|/g, "").slice(0,-1)
                                    processedClass.attributes = [...processedClass.attributes, statement]
                                }
                                if(statement.match(/.*#hasOperation.*/g)){
                                    statement = statement.split(" ")[2].replaceAll(/<|>|\s|/g, "").slice(0,-1)
                                    processedClass.operations = [...processedClass.operations, statement]
                                }
                                if(statement.match(/.*#hasClassAssociation.*/g)){
                                    statement = statement.split(" ")[2].replaceAll(/<|>|\s|/g, "").slice(0,-1)
                                    processedClass.associations = [...processedClass.associations, statement]
                                }
                            })
                            processedClasses.push(processedClass)
                        })
                        processedClasses.sort(function (a, b) {
                            if (a.name > b.name) {
                                return 1;
                            }
                            if (a.name > b.name) {
                                return -1;
                            }
                            return 0;
                        });
                        setClasses(processedClasses)
                    }
                    setIsLoading(false)
                },
                (error) => {
                    //TODO ERROR!!
                    setIsLoading(false)
                }
            )
    },[])

    if(isLoading){
        return (<div className={"row pt-1 ms-0 border border-info"} style={{height: "100%", maxWidth:"100%", overflow:"auto"}}>
            <div className="col-md-12">
                <div className="text-center align-middle" style={{paddingTop:"50%"}}>
                    <div className="spinner-grow text-info" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            </div>
        </div>);
    }else if(classes.length===0){
        return (<div className={"row pt-1 ms-0 border"} style={{height: "100%", maxWidth:"100%", overflow:"auto"}}>
            <div className="col-md-12">
                <div className="text-center align-middle" style={{paddingTop:"100%"}}>
                    <p className={"font-weight-bold"}>There is not yet a target artifact registered!</p>
                </div>
            </div>
        </div>);
    }
    return(
        <div className="accordion accordion-flush">
            {
                classes.map((_class) => (
                    <GetClassDiagramListItem _class={_class} onSeeArtifact={onSeeArtifact}/>
                ))
            }
        </div>
    );
}
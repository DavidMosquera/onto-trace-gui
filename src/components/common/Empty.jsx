import React from 'react'

export function NoProjects({fetchProjectFunction}){
    const refreshButton = () =>{
        fetchProjectFunction()
    }
    return (
        <div className="d-flex align-items-center justify-content-center" style={{minHeight:"85vh"}}>
            <div className="text-center">
                <h1 className="display-1 fw-bold"><i className="bi bi-emoji-neutral"></i></h1>
                <p className="fs-3"><span className="text-primary">No project has been assigned yet!</span></p>
                <p className="lead">
                    We will assign one to you soon. <br/> Click on refresh to see if you are already assigned to one!
                </p>
                <a className={"btn btn-primary"} onClick={refreshButton}>Refresh</a>
            </div>
        </div>
    );
}
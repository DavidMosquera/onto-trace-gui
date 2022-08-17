import React from 'react';

export function GetArtifactTab({tab}){
    const {id, name, selected} = tab
    return (
        <button className="nav-link tab-in-nav-button" style={{whiteSpace:"nowrap"}} id={id} data-bs-toggle="tab" data-bs-target="#nav-home"
                type="button" role="tab" aria-controls={id} aria-selected={selected}>{name}
        </button>
    );
}
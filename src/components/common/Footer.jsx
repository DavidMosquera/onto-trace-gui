import React from 'react';

export function GetFooter(){
    return (
        <footer style = {{bottom:0, position:"absolute", width:"100%"}} className="bg-dark text-center text-lg-start">
            <div className="text-center p-3" style={{color:"#FFFFFF"}}>
                © 2022 Copyright: OntoTrace - Zürich University of Applied Sciences
            </div>
        </footer>
    );
}
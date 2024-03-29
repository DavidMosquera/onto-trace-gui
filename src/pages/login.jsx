import React, {Fragment, useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Logo from "../assets/logo.png"
import {GetFooter} from "../components/common/Footer";
import {GetAPI} from "../components/common/Configuration";

export function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const handleLoginClick = () =>{
        setIsLoading(true)
        setError("")
        let user = {
            email : email,
            password : password
        }
        fetch(GetAPI()+"onto-trace-api/users/auth", {
            method: 'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json'
            },
            mode: "cors"
        }).then(res => {
            if(res.ok){
                res.json().then((response) => {
                        localStorage.setItem("token", response.uuid)
                        localStorage.setItem("email", response.email)
                        navigate("/projects")
                    }
                )
                setIsLoading(false)
            }else{
                setError("Auth failed :( check your email and password")
                setIsLoading(false)
            }
        })
    }
   return(
            <Fragment>
                <div className={"container-fluid"} style={{marginTop:"7%"}}>
                    <div className={"offset-md-3 col-md-6 shadow p-3 mb-5 bg-white rounded"}>
                        <form>
                            <div className={"row pt-5"}>
                                <div className={"offset-md-3 col-md-6 mb-4 d-flex justify-content-center"}>
                                    <img src={Logo}/>
                                </div>
                                <h3 className={"offset-md-1 col-md-10 text-center"}>Do you want to start using OntoTrace?</h3>
                                {error && (
                                    <div className="alert alert-danger offset-md-2 col-md-8 text-center p-1 mt-2" role="alert">
                                        Error on authentication :'( check your email and password
                                    </div>
                                )}
                                {isLoading &&
                                    <div className="text-center align-middle">
                                        <div className="spinner-grow text-info" role="status">
                                        </div>
                                    </div>
                                    }
                            </div>
                            <div className={"row"}>
                                <div className={"offset-md-2 col-md-8 mt-2"}>
                                    <div className={"row"}>
                                        <div className="mb-3">
                                            <label className={"mb-2"}>Write here your email address <i className="bi bi-emoji-smile"></i></label>
                                            <input
                                                type="email" onChange={(e)=> setEmail(e.target.value)}
                                                className="form-control"
                                                placeholder="Enter email"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className={"mb-2"}>Write here your very secret password <i className="bi bi-emoji-sunglasses"></i></label>
                                            <input
                                                type="password" onChange={(e)=> setPassword(e.target.value)}
                                                className="form-control"
                                                placeholder="Enter password"
                                            />
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={" offset-md-4 col-md-4"}>
                                            <div className="d-grid">
                                                <button disabled={isLoading} type="button" className="btn btn-primary" onClick={handleLoginClick}>
                                                    Login
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="forgot-password text-right mt-3">
                                        Forgot your password? <i className="bi bi-emoji-expressionless"></i><br/>Write an email to <a>mosq@zhaw.ch/ruiz@zhaw.ch</a> requesting one
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <GetFooter/>
            </Fragment>
        )
}
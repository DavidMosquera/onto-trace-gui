import {BrowserRouter as Router,
    Routes,
    Route,
    Link} from 'react-router-dom';
import {OntoTraceMenu} from "./pages/ontotrace";
import {Login} from "./pages/login";
import {Projects} from "./pages/projects";

export function App(){
        return(
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/v1/onto-trace" element={<OntoTraceMenu/>}/>
                    <Route path="/projects" element = {<Projects/>}/>
                </Routes>
            </Router>
        )
}
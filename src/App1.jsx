import React, { useEffect, useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './login'
import Card from './Card'
import fs from 'fs'
import Movie from './Movie.jsx'
import './movie.js'
import { BrowserRouter, HashRouter } from 'react-router-dom'
export const contextapi=React.createContext({})

const App1 = () => {
    
    const [logged, setLogged]=useState(1)
    const [auth,setauth]=useState(1)
    const [data1, setdata1] = useState([])
    

    
    useEffect(() => {

        //window.location="/"
        console.log("hi ", window.location.path, logged,auth);
        //if(logged!==auth){window.location='/';setauth(logged)}
        
        

    }, [logged])
    useEffect(async ()=>{
        console.log(fs,__dirname)
        
    },[])

    //setLocation(window.location.href)
    return (
        <>
        {}
            {/* <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Login/> */}

            <HashRouter basename="/" >
                <Switch>
                <Route exact  path="/user/:id" /*component={Card} /*render={()=>{<Card handler={setLogged}/>}}/*/ >
                    <Card handler={setLogged} />
                </Route>
                    <Route exact  path="/movie/:name" component={Movie} />
                    {/* <Route exact  path="/" component={Login} /> */}
                    <Route exact path="/">{(logged===1?<Card handler={setLogged} data1={data1} setdata1={setdata1} /> : <Login handler={setLogged}/>)}</Route>
                    {/*handler={setLogged} ()=>{<Card />} */}
                    {/* <Redirect default path="/" /> */}
                    <Route><Redirect to='/'></Redirect></Route>


                </Switch>
            </HashRouter>
            {/* </BrowserRouter> */}
        </>
    )
}

export default App1;


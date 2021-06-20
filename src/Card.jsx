/* eslint-disable no-unused-vars */
import React, { Component, useEffect, useState } from 'react';
import './App.css'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import GradeIcon from '@material-ui/icons/Grade';
import SendIcon from '@material-ui/icons/Send';
import data from './data';


import axios from 'axios'
import { Home } from '@material-ui/icons';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom'


function Card(props) {

    //document.body.style.visibility = "hidden"
    console.log(window.location)
    let history=useHistory()
    
    // window.onresize=()=>{setinnerw(window.innerWidth)}
    var axiosInstance = axios.create({
        baseURL: 'https://hexanebackend.herokuapp.com',
        withCredentials: true,
        //baseURL:"http://localhost:5000"
    })
    async function get_data() {
        console.log("hello ")
        await axiosInstance.get(`/users`).then(res => {
            props.handler(res.data.auth)
            if(localStorage.getItem('data1'))
            {
                props.setdata1(JSON.parse(localStorage.getItem('data1')))
            }
            else
            {
                props.setdata1([]);
            }
            let arr1=[]
            let arr2=[]
            res.data.movie.filter((item)=>{
                if(arr1.includes(item.movie_name))
                {return true}
                else{
                    arr1.push(item.movie_name)
                    arr2.push(item)
                    return false;
                }
            })
            props.setdata1(arr2.splice(0,21))
            console.log(arr2.splice(0,21))
            localStorage.setItem('data1',JSON.stringify(arr2.splice(0,21)))
            document.body.style.visibility = "visible"

            console.log(res.data)
            document.getElementById("logopic").src = `data:image/png;base64,${res.data.file}`

            document.getElementById("username").innerText = res.data.user
            document.getElementById("complete").style.display = ""

        })
            .catch(err => {
            })

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        

        get_data()
    }, [])
   
    async function fun() {
    }
    function set() {


    }


    function completed() {

        let name = document.getElementById("text_area").value
        document.getElementById("text_area").value = ""





        fun()
        set()

    }
    window.onresize=function(){
        if(document.getElementById("main") && document.getElementById("nav")){
        document.getElementById("main").style.height=`${window.innerHeight+document.getElementById("nav").offsetHeight-20} px`
    }
}



    //}
    function press(e) {
        if (e.keyCode === 13) {
            document.getElementById("text_area").value = document.getElementById("text_area").value.slice(0, -1)
            completed()
        }
    }
    async function gohome() {

        await axiosInstance.get(`/login/out`).then(res => {

            props.handler(res.auth)
        })
            .catch(err => {

            })




    }


    function toggle(event) {

        const ele = event.target;
        console.log(ele);

        if (ele !== undefined) {
            ele.style.backgroundColor = (ele.style.backgroundColor === "") ? "blue" : "";
        }
    }
    async function perform(e)
    {
        e.preventDefault()
        document.getElementById("spinner").style.visibility="visible"
        
        let name=document.getElementById("criteria").value
        let value=document.getElementById("search").value
        console.log("hello",name,value)
        let result=await fetch(`https://hexanebackend.herokuapp.com/searchmovie?name=${name}&value=${value}`,{credentials:"include"})
        let res=await result.json()
        
            props.handler(res.auth)
            document.getElementById("spinner").style.visibility="hidden"
            localStorage.setItem('data1',JSON.stringify(res.movie))
            props.setdata1(res.movie)

        
    }
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
    function home()
    {
        //console.log("hello")
        window.location='/app1'
    }
    return (
        <>

            <div className="complete" id="complete">
              
                
                <div className="nav" id="nav">
                    
                <div className="col-12">
                <div className="row">
                        <div className="col-12">
                            <div className="col-12">
                            <div style={{display:"flex",flexDirection:"column",width:"100%",justifyContent:"center",gap:"30px",placeItems:"center"}}>
                    <img src="" alt="" className="user_icon" id="logopic"/>
                    <h3 className="user_name" id="username" style={{textAlign:"center",marginTop:"-20px",width:"100%",overflow:"scroll"}}></h3>
                    </div>
                            </div>
                        
                    
                    <center>
                    <nav class="navbar navbar-light bg-primary " style={{marginBottom:"20px"}}>
                    {/* <a class="navbar-brand">Navbar</a> */}
                    <div className="btn-group btn-btn-group-lg d-flex">
                            
                            <button className="btn-primary btn-lg m-2 btn-outline-success" onClick={home}>Home</button>
                            <button className="btn-primary btn-lg m-2 btn-outline-danger" onClick={gohome}>LogOut</button>
                              
                    </div>
                   
  
                    <form class="form-inline" onSubmit={perform} method="dialog">
                    <div id="spinner" class="spinner-border text-danger form-control mr-sm-2" style={{visibility:"hidden"}} role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    
                    <select class="form-control mr-sm-2" id="criteria">
                        
                        <option value="movie">Movie Name</option>
                        <option value="actor">Actor Name </option>
                        <option value="lang">Langauage </option>
                        <option value="director">Director Name </option>
                        <option value="gener">Gener </option>
                        <option value="year">Year </option>
                        
                        
                    </select>
                    <input class="form-control mr-sm-2" id="search" type="search" placeholder="Search" aria-label="Search" required />
                    <input type="submit" class="btn btn-outline-success my-2 my-sm-0" value="Search"/>
                    
                    </form>
                        </nav>
                    </center>
                        </div>
                    </div>
                </div>
                    
                </div>

                <div className="main1">
                    <div className="main" id="main">
                        {/* <div className="container">
                            <div className="image_container">

                                <img style={{ width: "100%", height: "100%", borderRadius: "8%", boxShadow: "0 0 15px white" }} src="https://wallpapercave.com/wp/A9UHCmu.jpg" alt="undefined" />
                                <div className="percentage">
                                    <div className="text_box">{Math.floor(Math.random() * 100)}%<ThumbUpAltIcon /></div>
                                </div>
                                <div className="option">
                                    <ThumbUpAltIcon className="option_like" style={{ fontSize: "55" }} />
                                    <ThumbDownIcon className="option_dislike" style={{ fontSize: "55" }} />

                                </div>
                            </div>
                            <div className="story_container">
                                <strong className="story_title">Movie Name</strong>
                                <div className="story">
                                     <div className="rating"><p style={{ paddingTop: "0" }}>Rating: </p><GradeIcon /><GradeIcon /><GradeIcon /><GradeIcon /><GradeIcon /></div>
                                    <div className="overview">
                                        <p>After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.</p>

                                    </div>
                                </div>
                            </div> 

                        </div>*/}
                        {/* <div id="watch"><strong style={{ background: "black", color: "white", borderRadius: "10%" }}>WATCHLIST</strong></div> */}

                        {/* <div className="watchlist">
                            <center>
                            {
                                data.map(d => (
                                    <a href="#" className="overview_img">
                                    
                                        
                                        <img className="img" src={d.imgsrc} alt="" width={(innerw)?"150":"250"} />
                                        

                                        

                                        
                                   

                                    </a>

                                ))
                            }
                            </center>

                           

                        </div> */}
                        <center>
                            <div className="row">
                                {props.data1.map(d => (
                                    
                                    <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                                        <Link className="col-12 p-0" to={`/movie/${d.movie_name||d.sname}`}>
                                            <div className="col-12 p-1">
                                                <img src={d.poster_url||d.imgsrc} alt="" className="img" />
                                            </div>
                                            <div className="col-12 p-1 txt" style={{textAlign:"center",color:"red",fontWeight:"550",fontSize:"1rem"}}>
                                                   
                                                {d.movie_name||d.sname}
                                            </div>
                                        </Link>
                                    </div>
                                ))
                                }
                            </div>
                        </center>
                    </div>
                    {/* <div className="comment">
                        <div className="comment_box" id="comment_box">
                            <video id="video" src="" controls height="500" width="500"></video> 
                            <div className="message_left">
                                <p>who are you?</p>
                                 <div className="user_icon"></div>
                            </div>
                            <div className="message_right">
                                 <div className="user_icon"></div>
                                <p> I am Alexander Flammasdddddddddddddddddddddddddddddddddddddddddd asd as das d asdasd asdsa ing.</p>
                            </div>
                        </div>
                        <div className="write_comment">
                            <textarea className="text_area" name="comment" id="text_area" onKeyUp={press} cols="30" rows="10"></textarea>
                            <div className="send_comment"><button style={{ height: "100%", width: "100%" }} onClick={completed}><SendIcon /></button></div>
                        </div>

                    </div> */}

                </div>
            </div>
        </>
    )
}
export default Card
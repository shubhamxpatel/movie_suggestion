import React, { useEffect } from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom'


const Movie = (props) => {
    let data = 0

    const [rest, setrest] = useState({})
  //  document.body.style.visibility = "hidden"
    useEffect(async () => {
        console.log(rest)

        if (rest.movie_gener !== undefined) {
            document.getElementById("movie_name").innerHTML = rest.movie_name.toUpperCase()
            document.getElementById("yt_link").src = rest.movie_trailer
            document.getElementById("story").innerHTML = `<strong>${rest.story}</strong>`
            document.getElementById("gener").innerHTML = `<span>Gener:</span> ${rest.movie_gener.join(", ")}`
            document.getElementById("lang").innerHTML = `<span>Language:</span> ${rest.movie_lang.join(", ")}`
            document.getElementById("poster_url").src = rest.poster_url
            //document.getElementById("likes").innerHTML = `<span>Likes:</span> ${rest.like}`
            //document.getElementById("dislikes").innerHTML = `<span>Dislikes:</span> ${rest.dislike}`
            document.getElementById("run_time").innerHTML = `<span>Running time:</span> ${rest.run_time}`
            document.getElementById("release_date").innerHTML = `<span>Release date:</span> ${convertdate(rest.release_date)}`
            document.getElementById("director").innerHTML = `<span>Director:</span> ${rest.director_name}`
            document.getElementById("page_visited").innerHTML = `<span>Page visited:</span> ${rest.page_visited}`

        }

        document.body.style.visibility = "visible"
        if (rest.movie_actors !== undefined) {
            for (let i = 0; i < rest.movie_actors.length; i++) {
                add(rest.movie_actors[i])
            }
        }




    }, [rest])
    function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
    useEffect(async () => {

    }, [rest.movie_actors])
    function convertdate(s) {
        let month = ["jan", "feb", "march", "april", "may", "june", "july", "aug", "sept", "oct", "nov", "dec"]
        
        let date = s.split("T")[0]
        let day = date.split("-")[2]
        let year = date.split("-")[0]
        let mon = month[parseInt(date.split("-")[1])]
        return `${day} ${mon} ${year}`
    }
    function convert(s) {
        console.log(s)
        if (s !== "") {
            return s.split(" ").join("_")
        }
        else {
            return s;
        }
    }
    async function add(s) {
        console.log(s + "hello")
        let result = await fetch(`https://hexanebackend.herokuapp.com/movie/actor/${s}`,
            {
                method: "GET",
                credentials:'include',
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                }
            })
        await result.json().then(res1 => {
            console.log(convert(res1.actor_name))
            if (document.getElementById(convert(res1.actor_name)) === null) {
                let first = document.createElement("a");
                first.href=res1.wiki_link
                first.target="_blank"
                first.id = convert(res1.actor_name)
                first.classList.add("col-md-4", "col-sm-6", "col-3", "text-center", "p-1")
                let second = document.createElement("div")
                second.classList.add("embed-responsive", "embed-responsive-1by1")
                let img = document.createElement("img")
                img.style.boxShadow = "0 0px 5px 2px blue"
                img.src = res1.img_url
                img.classList.add("embed-responsive-item", "rounded-circle")
                let a = document.createElement("a")
                a.classList.add("text-center", "font-italic", "mt-0")
                a.style.color = "black"
                a.target = "_blank"
                a.href = res1.wiki_link
                a.innerText = res1.actor_name
                second.appendChild(img)
                first.appendChild(second)
                first.appendChild(a)
                document.getElementById("actors").appendChild(first)
            }

        })
    }
    useEffect(() => {
        if (document.getElementById("yt_link") !== undefined && data === 0) {
            console.log("hello")
            document.getElementById("actors").innerHTML = ""
            let s = window.location.href.split("/")
            data = 1
            fun(s[s.length - 1])
        }
    }, [])


    async function fun(s) {
        /**/
        console.log("hello")
        let response = await fetch(`https://hexanebackend.herokuapp.com/movie/${s}`,
            {
                method: "GET",
                credentials:"include",
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                }
            })
        await response.json().then(res => {
            console.log("nothing found")
            

            setrest(res)
            data = 1
            console.log(rest)


        })
            .catch(err => {
                //window.location = '/'
            })
    }
    window.onresize=function()
    {
        let x=document.getElementsByClassName("img")
        if(x.length>0){x.forEach(item=>{
            item.offsetHeight=`${item.offsetWidth*(1.2)} px`
        })}
    }

    return (
        <>

            <div className="container-fluid p-0 bgcolor">
               
                <div className="col-lg-11 m-auto p-0">
                    <div className="container-fluid p-2" style={{ height: "100vh", backgroundColor: "skyblue", overflow: "scroll" }}>
                    

                    <Link to="/" className="col-12">
                    <center>
                    <button className="btn btn-md btn-primary">Home</button>
                    </center>
                </Link>
                        <div className="col-12">
                            <h3 className="col-12 text-center"><strong id="movie_name">Movie Name</strong></h3>
                            <hr />
                            <section className="p-0">
                                <div className="col-md-9 m-auto embed-responsive embed-responsive-16by9" style={{ border: "2px solid red" }} >
                                    <div className="col-12 embed-responsive-item">
                                        <iframe id="yt_link" className="p-1" src="" FrameBorder="0" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen allowFullscreen></iframe>
                                    </div>
                                </div>
                            </section>

                        </div>
                        <div className="col-12 mt-1"></div>
                        <div className="col-md-8 col-sm-10 m-auto text-center text-danger" id="story">
                        </div>
                        <div className="col-12 mt-3"></div>
                        <div className="col-8 m-auto p-2" style={{}}>
                            <div className="row">
                                <div className="col-md-6 col-sm-8  m-auto">
        
                                    
                                    <img id="poster_url" src="" alt="" style={{ width: "100%", boxShadow: "0 0px 15px 2px blue" }} />
                                </div>
                                <div className="col-md-6 col-sm-4"  >
                                    <div className="col-12 mt-3 p-1 " style={{ fontWeight: "700" }}>
                                        
                                            <div className="col-12 text-center" id="lang">

                                            </div>
                                            <div className="col-12 text-center" id="run_time">

                                            </div>
                                            <div className="col-12 text-center" id="gener">

                                            </div>
                                            <div className="col-12 text-center" id="release_date">

                                            </div>
                                            {/* <div className="col-12 text-center" id="likes">

                            </div>
                                        <div className="col-12 text-center" id="dislikes">
            
                            </div> */}
                                            <div className="col-12 text-center" id="page_visited">

                                            </div>
                                            <div className="col-12 text-center" id="director">

                                            </div>
                                            <div className="row g-3">
                                                <div className="col-12">
                                                    <marquee behavior="" direction=""><h3 style={{  }}>Actors</h3></marquee>

                                                </div>
                                            </div>
                                            <div className="row" id="actors">

                                            </div>
                                        

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-9 m-auto">

                        </div>
                    </div>

                </div>
            </div>


        </>
    )
}
export default Movie;
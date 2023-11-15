import React, { useEffect, useState } from 'react'
import instance from './axios'
import "./Row.css"
import YouTube from 'react-youtube'
import movieTrailer from "movie-trailer"
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/original/'


function Row({ title,fetchUrl,isLargeImg }) {
    const [movies,setMovies] = useState([])
    const [trilerUrl,setTrailerUrl] = useState("")

    useEffect(()=>{
        async function fetchData (){
            const request = await instance.get(fetchUrl);
            setMovies(request.data.results);
        }
        fetchData();
    },[fetchUrl])

    const opts ={
        height : "390px",
        width : "100%",
        playerVars:{
            autoplay : 1,
        }
    }

    function handleClick(movie) {
        if (trilerUrl){
            setTrailerUrl("")
        } else {
            movieTrailer(movie?.name)
            .then((url)=>{
                const urlParms = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParms.get("v"))
            })
            .catch((error)=>console.log(error))
        }
    }

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row__posters'>
                {movies.map((movie)=>(
                    <img 
                    onClick={()=>handleClick(movie)}
                    className={`row__poster ${isLargeImg && `row__posterLarge`}`}
                    key={movie.id}
                    src={`${IMG_BASE_URL}${isLargeImg ? movie.poster_path : movie.backdrop_path }`} 
                    alt={movie.name} />
                ))}
            </div>
           {trilerUrl && <YouTube videoId={trilerUrl} opts={opts} />}
        </div>
    )
}

export default Row
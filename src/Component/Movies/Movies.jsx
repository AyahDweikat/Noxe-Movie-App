import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Movies.module.css';

function Movies() {
  let [moviesList, setMoviesList] = useState([]);


  let prefix = "https://image.tmdb.org/t/p/w500/";



  async function getMovies(){
    let {data} = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=c820d2bb48facae2651b3006ae220106&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
    setMoviesList(data.results);
  }
  useEffect(()=>{
    getMovies()
  }, [])

  let navigate = useNavigate();
  function goToDetails(id){
    navigate({
      pathname: '/details',
      search: `?id=${id}`
    });
  }
  return (
    <div>
      <div className="row">
        <div className='col-md-4 d-flex align-items-center'>
          <div>
            <div className={`w-80 ${styles.brdr}`}></div>
            <h4 className='mt-3'>Movies</h4>
            <p>Discover Movies</p>
            <div className={`w-80 ${styles.brdr}`}></div>
          </div>
        </div>
        {moviesList.map((item, idx)=>{
            return (
              <div onClick={()=>goToDetails(item.id)} className="col-md-4 my-3" key={idx}>
                <img src={prefix+item.poster_path} alt="" className='w-100'/>
                <h5 className='text-center'>{item.title}</h5>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Movies
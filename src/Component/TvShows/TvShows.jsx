import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import styles from './TvShows.module.css';

function TvShows() {
  let [tvList, setTVList] = useState([]);


  let prefix = "https://image.tmdb.org/t/p/w500/";



  async function getTVShows(){
    let {data} = await axios.get('https://api.themoviedb.org/3/discover/tv?api_key=c820d2bb48facae2651b3006ae220106&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0')
    setTVList(data.results);
  }
  useEffect(()=>{
    getTVShows()
  }, [])

  // let navigate = useNavigate();
  // function goToDetails(id){
  //   navigate({
  //     pathname: '/details',
  //     search: `?id=${id}`
  //   });
  // }
  return (
    <div>
      <div className="row">
        <div className='col-md-4 d-flex align-items-center'>
          <div>
            <div className={`w-80 ${styles.brdr}`}></div>
            <h4 className='mt-3'>TvShows</h4>
            <p>Discover TvShows</p>
            <div className={`w-80 ${styles.brdr}`}></div>
          </div>
        </div>
        {tvList.map((item, idx)=>{
            return (
              <div 
              // onClick={()=>goToDetails(item.id)} 
              className="col-md-4 my-3" key={idx}>
                <img src={prefix+item.poster_path} alt="" className='w-100'/>
                <h5 className='text-center'>{item.name}</h5>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default TvShows
import React, { useEffect ,useState} from 'react';
import axios from 'axios';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  let [trendingMovies, setTrendingMovies]= useState([]);
  let [trendingTv, setTrendingTv]= useState([]);
  let [trendingPerson, setTrendingPerson]= useState([]);

  let prefix = "https://image.tmdb.org/t/p/w500/";



  async function getTrendingItems(type, callback){
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${type}/week?api_key=c820d2bb48facae2651b3006ae220106`);
    callback(data.results);
  }

  useEffect(()=>{// didMountuing in function
    getTrendingItems("movie",setTrendingMovies );
    getTrendingItems("tv", setTrendingTv);
    getTrendingItems("person", setTrendingPerson);
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
            <h4 className='mt-3'>Weekly Trending Movies</h4>
            <p>this is trending Movies</p>
            <div className={`w-80 ${styles.brdr}`}></div>
          </div>
        </div>
        {trendingMovies.map((item, idx)=>{
            return (
              <div onClick={()=>goToDetails(item.id)} className="col-md-4 my-3" key={idx}>
                <img src={prefix+item.poster_path} alt="" className='w-100'/>
                <h5 className='text-center'>{item.title}</h5>
              </div>
            )
          })}
      </div>
      {/* {console.log(trendingMovies)} */}
      <div className="row">
        <div className='col-md-4 d-flex align-items-center'>
          <div>
            <div className={`w-80 ${styles.brdr}`}></div>
            <h4 className='mt-3'>Weekly Trending TV Shows</h4>
            <p>this is trending TV Shows</p>
            <div className={`w-80 ${styles.brdr}`}></div>
          </div>
        </div>
        {trendingTv.map((item, idx)=>{
            return (
              <div className="col-md-4 my-3 px-3" key={idx}>
                <img src={prefix+item.poster_path} alt="" className='w-100'/>
                <h5 className='text-center'>{item.name}</h5>
              </div>
            )
          })}
      </div>

      <div className="row">
        <div className='col-md-4 d-flex align-items-center'>
          <div>
            <div className={`w-80 ${styles.brdr}`}></div>
            <h4 className='mt-3'>Weekly Trending Persons</h4>
            <p>this is trending Persons</p>
            <div className={`w-80 ${styles.brdr}`}></div>
          </div>
        </div>
        {trendingPerson.map((item, idx)=>{
            return (
              <div className="col-md-4 my-3 px-3" key={idx}>
                <img src={prefix+item.profile_path} alt="" className='w-100'/>
                <h5 className='text-center'>{item.name}</h5>
              </div>
            )
          })}
      </div> 
    </div>
  )
}

export default Home
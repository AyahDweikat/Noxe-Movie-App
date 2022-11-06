import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './People.module.css';

function People() {
  let [peopleList, setPeopleList] = useState([]);


  let prefix = "https://image.tmdb.org/t/p/w500/";



  async function getPeoples(){
    let {data} = await axios.get('https://api.themoviedb.org/3/person/popular?api_key=c820d2bb48facae2651b3006ae220106&language=en-US&page=1')
    console.log(data.results);
    setPeopleList(data.results);
  }
  useEffect(()=>{
    getPeoples()
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
            <h4 className='mt-3'>Movies</h4>
            <p>Discover Movies</p>
            <div className={`w-80 ${styles.brdr}`}></div>
          </div>
        </div>
        {peopleList.map((item, idx)=>{
            return (
              <div 
              // onClick={()=>goToDetails(item.id)} 
              className="col-md-4 my-3" key={idx}>
                <img src={prefix+item.profile_path} alt="" className='w-100'/>
                <h5 className='text-center'>{item.name}</h5>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default People
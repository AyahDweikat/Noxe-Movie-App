import React from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function Details() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [details, setDetails] = useState({});
  let prefix = "https://image.tmdb.org/t/p/w500/";
  let currentId = searchParams.get("id");
  console.log(details);
  async function getDetails() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${currentId}?api_key=c820d2bb48facae2651b3006ae220106&language=en-US`
    );
    setDetails(data);
  }
  useEffect(() => {
    getDetails();
  }, []);
  return (
    <div>
      <div className="d-flex my-3">
        <img src={prefix + details.poster_path} alt="" className="w-100" />
        <div>
          <h5 className="text-center">{details.title}</h5>
          <p>{details.overview}</p>
          <span className="d-flex justify-content-center fw-bold mt-5">vote_average {details.vote_average} | vote_count {details.vote_count}</span>
        </div>
      </div>
    </div>
  );
}

export default Details;

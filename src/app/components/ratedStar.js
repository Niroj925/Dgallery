"use client";
import React, { useState,useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingStars = ({ stars}) => {

    const [starArray,setStarArray]=useState([]);
    const [star,setStar]=useState(0);

  const getStar=async(stars)=>{
    const star=await stars;
    console.log(star)
    setStarArray(star);
  }
  useEffect(()=>{
    getStar(stars);
  },[stars]);
  

  const countStar=()=>{
    let count=0;
    let avgStar;
    starArray.map((image)=>{
     count=count+parseInt(image.rating)
    })

    avgStar=count/(starArray.length);
    console.log(avgStar);
    console.log(Math.round(avgStar));
    setStar(Math.round(avgStar));

    return (count/(starArray.length));
  }

useEffect(()=>{
  countStar();
},[starArray])

 

  return (
    <div>
        {          
            (star>0)?(
                <>
                 {[...Array(star)].map((_, index) => (
        <FaStar
          key={index}
          size={24}
          color={'gold'}
        />
      ))}
    </>
            ):(
                <></>
            )
        }
   
    </div>
  );
};

export default RatingStars;

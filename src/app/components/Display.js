"use client";
import { useState } from "react";
import styles from "./Display.module.css";
import RatingStars from "./rating.js";
import RatedStar from './ratedStar.js';

const Display = ({ contract, account }) => {
  // console.log(account);
  const [imageUrl,setImageUrl]=useState([]);
  const [star,setStar]=useState(0);
  const [selectedImage,setSelectedImage]=useState(null);
  const getdata = async () => {
    let dataArray;
    try {
        dataArray = await contract.getImage();
        console.log(dataArray);
        setImageUrl(dataArray);
    } catch (e) {
      alert("Unable to get image ");
    }
  };

  const handleRatingSelect = (rating) => {
    setStar(rating)
  
  };

  const imageHash=(image)=>{
    const imageHash = image.substring(image.lastIndexOf('ipfs/') + 5);
    return imageHash;    
  }

  const getRate=async(imageHash)=>{
    const rates=await contract.getRatings(imageHash);
    return rates;
  }

  const rateNow=async(image)=>{
    const imageHash = image.substring(image.lastIndexOf('ipfs/') + 5);
    console.log(imageHash);
    console.log(star);

     const res=await contract.addRating(imageHash,star);
    console.log(res);
    setSelectedImage(null);
  }
  return (
    <>
      <button className={styles.btn} onClick={getdata}>
        Get Data
      </button>
      {/* <h2 className={styles.head}>Images in IPFS</h2> */}
          <div className={styles.imageBox}>
         {
         imageUrl.length > 0 && imageUrl.map((image, index) => (
          <div  key={index}>
       {/* <img key={index} src={image} alt='img' /> */}

       <div key={index} className={styles.imageCard}   >
            <img
            src={image}
            alt='img'
            width={100}
            height={100}
            className={styles.Card_box_left_img}
            />

            <RatedStar stars={getRate(imageHash(image))} />

     {
      console.log(`rate status:${selectedImage}`)}
       {
      selectedImage==(imageHash(image))?(
        <>
        <RatingStars totalStars={5} onSelect={handleRatingSelect} />
        <button className={styles.btn} onClick={()=>rateNow(image)}  >
          Rate Now
        </button>
        </>
      ):(
        <button className={styles.btn} onClick={()=>{
         
          setSelectedImage(imageHash(image));
          }} >
        Rate Me
      </button>
      )

     }
          </div>
       </div>

         ))
      }
      </div>
    </>
  );
};
export default Display;

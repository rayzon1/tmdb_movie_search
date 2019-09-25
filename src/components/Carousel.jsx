import React from "react";
import Carousel from 'react-bootstrap/Carousel';

export default function CarouselHead({ mediaNews }) {
  
  const shortenText = string => {
    const maxLength = 125;
    const newStr = string.substr(0, maxLength) + '...';
    return newStr;
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '5vh'}}>
    <Carousel style={{width: '70vw', height: '400px'}}>

    
      {
        mediaNews &&
        mediaNews.articles.map(data => (
          <Carousel.Item>
            <img
              src={data.urlToImage}
              alt="First slide"
              style={{width: '800px', height: '400px'}}
            />
            <Carousel.Caption>
              <h3>{data.title}</h3>
              <p>{shortenText(data.description)}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))
      }

    </Carousel>
    </div>
  );
}

//composant permettant de renvoyer un slider paramétré,
//utilisant un mapping sur un tableau X
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import mc from "./slider.module.scss";
import { useSelector } from "react-redux";

const MySlider = ({ array, title, onImageClick }) => {
  const { wWidth } = useSelector((store) => store.sizeReducer);

  const SamplePrevArrow = ({ onClick }) => {
    return (
      <i
        onClick={onClick}
        className={`${mc.left_arrow} className icon-arrow-ios-back-outline`}
      ></i>
    );
  };

  const SampleNextArrow = ({ onClick }) => {
    return (
      <i
        onClick={onClick}
        className={`${mc.right_arrow} className icon-arrow-ios-forward-outline`}
      ></i>
    );
  };

  const numberSlidesToReturn = () => {
    const mobileNbr = 2;
    const tabletNbr = 3;
    const defaultNb = 5;
    if (array.length === 1) return 1;
    switch (wWidth) {
      case "mobile":
        return array.length <= mobileNbr ? array.length - 1 : mobileNbr;
      case "tablet":
        return array.length <= tabletNbr ? array.length - 1 : tabletNbr;
      case "desktop":
        return array.length <= defaultNb ? array.length - 1 : defaultNb;
      default:
        return 0;
    }
  };

  const settings = {
    infinite: array.length > 1 ? true : false,
    speed: 500,
    slidesToShow: numberSlidesToReturn(),
    slidesToScroll: numberSlidesToReturn(),
    accessibility: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    draggable: false,
  };

  return (
    <div className={mc.container}>
      <h3>{title}</h3>
      <Slider className={mc.slider} {...settings}>
        {array.map((el, i) => (
          <div
            onClick={onImageClick}
            className={`${mc.image_container} card`}
            key={el.id}
          >
            <div className={`${mc.image} adaptive-img-contain`}>
              <span>
                <img
                  id={el.id}
                  crossOrigin="anonymous"
                  src={`http://localhost:7001/${el.image}`}
                  alt={`image de présentation du film ${el.title}`}
                />
              </span>
            </div>
            <div
              className={
                el.title.length < 22
                  ? mc.title
                  : `${mc.title} ${mc.little_font}`
              }
            >
              <span>{el.title.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MySlider;

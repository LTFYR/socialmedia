import Carousel from "react-bootstrap/Carousel";
import { useSelector } from "react-redux";

function ImageCarousel({ images, id }) {
  const { theme } = useSelector((state) => state);
  return (
    <div className="carousel-custom">
      <Carousel>
        {images.map((img, i) => (
          <Carousel.Item>
            <img
              className="d-flex w-100"
              style={{
                filter: theme ? "invert(1)" : "invert(0)",
              }}
              src={img.url}
              alt="First slide"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageCarousel;

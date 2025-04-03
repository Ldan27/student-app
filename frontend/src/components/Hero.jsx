import React from "react";
import { Image, Carousel, Container } from "react-bootstrap";

const Hero = () => {
  return (
    <>
      <Container>
        <Carousel className="carousel">
          <Carousel.Item>
            <Image
              className="d-block mx-auto"
              alt="First slide"
              width="1280"
              height="400"
              src="./img/img_1.jpg"
              text="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block mx-auto"
              alt="First slide"
              width="1280"
              height="400"
              src="./img/img_2.jpg"
              text="First slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block mx-auto"
              alt="First slide"
              width="1280"
              height="400"
              src="./img/img_3.jpg"
              text="First slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </>
  );
};

export default Hero;

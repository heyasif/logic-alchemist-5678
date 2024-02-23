import styles from "./index.module.scss";
import Button from "../../../components/components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { heroImages } from "../../../data/images";

const HeroSection = () => {
  return (
    <section className={styles.section}>
      {/* <div className={`${styles.container} main-container`}>
        <div className={styles.content_wrapper}>
          <header className={styles.header}>
            <h1 className={styles.title} style={{ fontWeight: 1000 }}>
              unleash your Fashion
            </h1>
            <h1 className={styles.title} style={{ fontWeight: 1000 }}>
              find your Flow.
            </h1>
          </header>
          <div className={styles.buttons_wrapper}>
            <Button to="/catalog/All" className={styles.button}>
              Shop Now
            </Button>
          </div>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className={styles.image}
          >
            {heroImages.map((items, index) => {
              return (
                <SwiperSlide key={index} >
                  <img srcSet={items.path} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div> */}


<div id="carouselExampleCaptions" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://img.freepik.com/free-photo/shopping-bag-cart_23-2148879372.jpg?t=st=1708712852~exp=1708716452~hmac=c44f028ef098e89dda28a1277331414266973d69e87bbf4caf7046ed198a628b&w=1060" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://images.pexels.com/photos/6303759/pexels-photo-6303759.jpeg?auto=compress&cs=tinysrgb&w=600" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://images.pexels.com/photos/6834038/pexels-photo-6834038.jpeg?auto=compress&cs=tinysrgb&w=600" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

    </section>
  );
};

export default HeroSection;

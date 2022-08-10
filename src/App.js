import { useState, useEffect } from "react";

function App() {
  const [image, setImage] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('https://slider.ymatuhin.workers.dev/', {
      signal: controller.signal,
    })
      .then((data) => data.json())
      .then((response) => setImage(response.images))
    return () => controller.abort();
  }, []);

  const data = image.length - 1;
  const [slideActive, setSlideActive] = useState(0);
  //const [indicatorsActive, setIndicatorsActive] = useState(true);


  useEffect(() => {
    const time = setInterval(() => {
      setSlideActive(slideActive === data ? 0 : slideActive + 1);
    }, 5000);
    return () => clearInterval(time)
  })

  return (

    <div className="carousel slide">
      <div className="carousel-indicators">
        {image.map((_, index) => (
          <>
            <button type="button" data-bs-target />
            <button key={index} type="button" data-bs-target className={index !== slideActive ? "inactive" : "active"} />
          </>
        ))}
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          {image.map((slide, index) => (
            <div key={index} className={index === slideActive ? "active" : "inactive"}>
              {<img key={index} className="d-block w-100" src={slide} alt="" />}
            </div>
          ))
          }
        </div>
      </div>
      <button className="carousel-control-prev" type="button" onClick={() =>
        setSlideActive(slideActive < 1 ? data : slideActive - 1)
      }>
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Предыдущий</span>
      </button>
      <button className="carousel-control-next" type="button" onClick={() =>
        setSlideActive(slideActive === data ? 0 : slideActive + 1)
      }>
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Следующий</span>
      </button>
    </div>
  );
}

export default App;

//https://slider.ymatuhin.workers.dev/ API
import {
  faBuilding,
  faCalendar,
  faClock,
  faPlaneDeparture,
  faSquareMinus,
  faSquarePlus,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Carousel, Col, Modal, Row } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Sydney3 from "../assets/images/Sydney3.jpg";
import Sydney2 from "../assets/images/sydney2.jpg";
import Sydney4 from "../assets/images/sydney4.jpg";
import { API } from "../config/api";
import { useCustomQuery } from "../config/query";
import { getTripId } from "../utils/trip";

const Detail = () => {
  const { id } = useParams();
  let { data: selectedTour } = useCustomQuery(["data", id], () =>
    getTripId(id),
  );

  console.log(selectedTour, "ioini terbaru");
  const [quantity, setQuantity] = useState(1);

  console.log(selectedTour);
  // const price = selectedTour?.price;
  const total = selectedTour?.price * quantity;

  const navigate = useNavigate();
  // const [selected, setSelectedTour] = useState(selectedTour);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  console.log();

  var currentDate = new Date();

  var options = { weekday: "long" };
  var day = currentDate.toLocaleString("en-US", options);

  var date = currentDate.getDate();

  var month = currentDate.toLocaleString("en-US", { month: "short" });

  var year = currentDate.getFullYear();

  var formattedDate =
    day + ", " + ("0" + date).slice(-2) + " " + month + " " + year;

  const [showModal, setShowModal] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCarouselSelect = (i, e) => {
    setCarouselIndex(i);
  };

  // const handleBookNow = useMutation(async (e) => {
  //   try {
  //     e.preventDefault();

  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };

  //     const data = {
  //       counterqty: quantity,
  //       total: total,
  //       // status: form.status,
  //       tripid: selectedTour?.id,
  //       // userid: state.user.id,
  //     };

  //     const body = JSON.stringify(data);

  //     const response = await API.post("transaction", body, config);
  //     console.log("transaction success :", response);
  //     const token = response.data.data.token;
  //     window.snap.pay(token, {
  //       onSuccess: function (result) {
  //         /* You may add your own implementation here */
  //         console.log(result);
  //         navigate("/Profile");
  //       },
  //       onPending: function (result) {
  //         /* You may add your own implementation here */
  //         console.log(result);
  //         navigate("/Profile");
  //       },
  //       onError: function (result) {
  //         /* You may add your own implementation here */
  //         console.log(result);
  //         navigate("/Profile");
  //       },
  //       onClose: function () {
  //         /* You may add your own implementation here */
  //         alert("you closed the popup without finishing the payment");
  //       },
  //     });

  //     // code here
  //   } catch (error) {
  //     console.log("transaction failed : ", error);
  //   }
  // });

  const [selected, setSelectedTour] = useState(selectedTour);
  const handleBookNow = () => {
    localStorage.setItem("tourBook", JSON.stringify(selected));
    navigate("/Waiting");
  };
  useEffect(() => {
    setSelectedTour({
      ...selectedTour,
      quantity: quantity,
      price: total,
      date: formattedDate,
      tripId: id,
    });
  }, [total, quantity, formattedDate]);

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  return (
    <div className="d-flex flex-column styleDetail">
      <h1 style={{ fontWeight: "900" }}>{selectedTour?.title}</h1>
      <h3 style={{ fontWeight: "800" }}>{selectedTour?.country}</h3>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <Row
          style={{
            minWidth: "100%",
            height: "420px",
            // display: "flex",
            padding: "0 30px 0",
          }}
        >
          <Col
            style={{
              height: "100%",
            }}
          >
            <img
              src={selectedTour?.image}
              alt=""
              className="CarouselImg"
              onClick={() => {
                openModal();
                setCarouselIndex(0);
              }}
              style={{ cursor: "pointer" }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <img
              src={Sydney2}
              alt=""
              className="CarouselImgContent"
              onClick={() => {
                openModal();
                setCarouselIndex(1);
              }}
              style={{ cursor: "pointer" }}
            />
          </Col>
          <Col>
            <img
              src={Sydney3}
              alt=""
              className="CarouselImgContent"
              onClick={() => {
                openModal();
                setCarouselIndex(2);
              }}
              style={{ cursor: "pointer" }}
            />
          </Col>
          <Col>
            <img
              src={Sydney4}
              alt=""
              className="CarouselImgContent"
              onClick={() => {
                openModal();
                setCarouselIndex(3);
              }}
              style={{ cursor: "pointer" }}
            />
          </Col>
        </Row>
      </div>
      <div className="mt-5">
        <h5>Information trip</h5>
        <Row className="mt-4">
          <Col>
            <h6>Accomodation</h6>
            <h5>
              <span>
                {" "}
                <FontAwesomeIcon
                  icon={faBuilding}
                  style={{ marginRight: "3px" }}
                />{" "}
              </span>{" "}
              {selectedTour?.accomodation}
            </h5>
          </Col>

          <Col>
            <h6>Transportation</h6>
            <h5>
              <span>
                {" "}
                <FontAwesomeIcon
                  icon={faPlaneDeparture}
                  style={{ marginRight: "3px" }}
                />{" "}
              </span>{" "}
              {selectedTour?.transportation}
            </h5>
          </Col>

          <Col>
            <h6>Eat</h6>
            <h5>
              <span>
                <FontAwesomeIcon
                  icon={faUtensils}
                  style={{ marginRight: "3px" }}
                />{" "}
              </span>{" "}
              {selectedTour?.eat}
            </h5>
          </Col>

          <Col>
            <h6>Duration</h6>
            <h5>
              <span>
                {" "}
                <FontAwesomeIcon
                  icon={faClock}
                  style={{ marginRight: "3px" }}
                />{" "}
              </span>{" "}
              {selectedTour?.day} Day {selectedTour?.night} Night
            </h5>
          </Col>

          <Col>
            <h6>Date Trip</h6>
            <h5>
              <span>
                {" "}
                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{ marginRight: "3px" }}
                />{" "}
              </span>{" "}
              {selectedTour?.datetrip}
            </h5>
          </Col>
        </Row>
      </div>
      <div className="mt-4">
        <h5>Description</h5>
        <p
          className="mt-3"
          style={{
            textAlign: "justify",
            fontFamily: "Avenir",
            fontSize: "14px",
            color: "#a8a8a8",
          }}
        >
          {selectedTour?.description}
        </p>
      </div>

      <div className="mt-4 d-flex justify-content-between">
        <h4 style={{ color: "#FFAF00" }}>
          IDR. {selectedTour?.price.toLocaleString("en-ID")}
          <span style={{ color: "#000" }}>/ PERSON</span>
        </h4>
        <h4>
          <span
            className="me-3"
            style={{
              fontWeight: "400",
              color: "#FFAF00",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={decreaseQuantity}
          >
            <FontAwesomeIcon icon={faSquareMinus} />
          </span>{" "}
          {quantity}{" "}
          <span
            className="ms-3"
            style={{
              fontWeight: "400",
              color: "#FFAF00",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={increaseQuantity}
          >
            <FontAwesomeIcon icon={faSquarePlus} />
          </span>
        </h4>
      </div>

      <hr className="HorizontalLine"></hr>

      <div className="d-flex justify-content-between mt-2">
        <h4>Total :</h4>
        <h4 style={{ color: "#FFAF00" }}>
          IDR. {total.toLocaleString("en-ID")}
        </h4>
      </div>

      <hr className="HorizontalLine"></hr>
      <div>
        <button className="bookButton" onClick={() => handleBookNow()}>
          BOOK NOW
        </button>
      </div>

      {/* modal */}
      <Modal
        show={showModal}
        onHide={closeModal}
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Body>
          <Carousel
            activeIndex={carouselIndex}
            onSelect={handleCarouselSelect}
            slide={false}
          >
            <Carousel.Item>
              <img
                src={selectedTour?.image}
                alt=""
                style={{ width: "100%", objectFit: "contain" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img src={Sydney2} alt="" style={{ width: "100%" }} />
            </Carousel.Item>
            <Carousel.Item>
              <img src={Sydney3} alt="" style={{ width: "100%" }} />
            </Carousel.Item>
            <Carousel.Item>
              <img src={Sydney4} alt="" style={{ width: "100%" }} />
            </Carousel.Item>
          </Carousel>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Detail;

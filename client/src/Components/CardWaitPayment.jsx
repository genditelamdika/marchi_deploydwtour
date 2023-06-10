import { Col, Container, Row } from "react-bootstrap";
import Icon from "../assets/images/IconBooking.png";
import Picture from "../assets/images/Bank.png";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useMutation } from "react-query";
import { UserContext } from "../utils/context/userContext";
import { useCustomMutation } from "../config/query";
import { transaction } from "../utils/transaction";

const CardWaitPayment = () => {
  const navigate = useNavigate();
  const [Datas, setDatas] = useState();
  const [state, _] = useContext(UserContext);
  const [postData, setPostData] = useState({});

  useEffect(() => {
    const Data = JSON.parse(localStorage.getItem("tourBook"));
    if (Data) {
      setDatas(Data);
    }
  }, []);

  const mySwal = withReactContent(Swal);
  const status = "Waiting Approve";
  console.log(Datas, "cekcek");

  // post data
  const postTransaction = useCustomMutation("transaction", transaction);

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

  const handleWaitingApprove = async (e) => {
    try {
      e.preventDefault();
      const data = {
        counterqty: Datas.quantity,
        total: Datas?.price,
        tripid: parseInt(Datas?.tripId),
      };
      console.log(data, "yang mau dikirim");
      const body = JSON.stringify(data);
      const response = await postTransaction.mutateAsync(body);
      if (response) {
        console.log(response, "cek response");
        const token = response?.token;
        window.snap.pay(token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            navigate("/Profile");
            localStorage.removeItem("tourBook");
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            navigate("/Profile");
          },
          onError: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            navigate("/Profile");
          },
          onClose: function () {
            /* You may add your own implementation here */
            alert("you closed the popup without finishing the payment");
          },
        });
      }
    } catch (error) {
      console.log("transaction failed : ", error);
    }
  };

  return (
    <>
      <Container style={{ marginTop: "66px" }}>
        <div
          style={{
            width: "1035px",
            height: "419px",
            border: "2px solid #B7B7B7",
            backgroundColor: "#fff",
            borderRadius: "5px",
            boxShadow: "0 0 2.5px #000",
            position: "relative",
            left: "120px",
          }}
        >
          <Row className=" ">
            <Col xs={5}>
              <img src={Icon} alt="" style={{ margin: "10px 35px 0" }} />

              <h3
                className=""
                style={{
                  fontSize: "24px",
                  fontWeight: "900",
                  margin: "28px 24px 4px 35px",
                  fontFamily: "Avenir",
                }}
              >
                {Datas?.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "Avenir",
                  color: "#959595",
                  marginLeft: "35px",
                  marginBottom: "16px",
                }}
              >
                {Datas?.country}
              </p>
              <button
                style={{
                  border: "none",
                  color: " #0BDC5F",
                  backgroundColor: "red",
                  padding: "4px 10px",
                  margin: "0 35px 0",
                }}
              >
                Waiting Payment
              </button>
            </Col>
            <Col>
              <Row className=" ">
                <Col className="">
                  <h5
                    style={{
                      fontFamily: "Avenir",
                      fontWeight: "800",
                      fontSize: "18px",
                      color: "#000",
                      marginTop: "105px",
                    }}
                  >
                    Date Trip
                  </h5>
                  <p
                    style={{
                      fontFamily: "Avenir",
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#959595",
                    }}
                  >
                    {Datas?.datetrip}
                  </p>
                  <br />
                  <h5
                    style={{
                      fontFamily: "Avenir",
                      fontWeight: "800",
                      fontSize: "18px",
                      color: "#000",
                    }}
                  >
                    Accomodation
                  </h5>
                  <p
                    style={{
                      fontFamily: "Avenir",
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#959595",
                    }}
                  >
                    {Datas?.accomodation}
                  </p>
                </Col>
                <Col>
                  <h5
                    style={{
                      fontFamily: "Avenir",
                      fontWeight: "800",
                      fontSize: "18px",
                      color: "#000",
                      marginTop: "105px",
                    }}
                  >
                    Duration
                  </h5>
                  <p
                    style={{
                      fontFamily: "Avenir",
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#959595",
                    }}
                  >
                    {Datas?.day} Day {Datas?.night} Night
                  </p>
                  <br />
                  <h5
                    style={{
                      fontFamily: "Avenir",
                      fontWeight: "800",
                      fontSize: "18px",
                      color: "#000",
                    }}
                  >
                    Transportation
                  </h5>
                  <p
                    style={{
                      fontFamily: "Avenir",
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#959595",
                    }}
                  >
                    {Datas?.transportation}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col className="">
              <h2
                style={{
                  fontFamily: "Avenir",
                  fontSize: "36px",
                  fontWeight: "800",
                  marginTop: "8px",
                  marginRight: "63px",
                  float: "right",
                }}
              >
                BOOKING
              </h2>
              <h6
                style={{
                  float: "right",
                  marginRight: "60px",
                  marginTop: "0",
                  fontFamily: "Avenir",
                  fontSize: "18px",
                  fontWeight: "900",
                  color: "#878787",
                }}
              >
                {Datas?.date}
              </h6>
              <img
                src={Picture}
                alt=""
                style={{
                  float: "right",
                  marginRight: "88px",
                  marginTop: "-2px",
                  width: "137px",
                  height: "137px",
                  border: "2px solid #000",
                }}
              />
              <p
                style={{
                  float: "right",
                  position: "relative",
                  top: "20px",
                  right: "90px",
                  fontFamily: "Avenir",
                  fontSize: "13px",
                  color: "#818181",
                }}
              >
                upload payment proof
              </p>
            </Col>
          </Row>

          <div className="d-flex ms-2" style={{ marginTop: "12px" }}>
            <span
              className="ms-5"
              style={{
                fontFamily: "Avenir",
                fontSize: "18px",
                fontWeight: "800",
                color: "#000",
              }}
            >
              No
            </span>
            <span
              className="ms-5"
              style={{
                fontFamily: "Avenir",
                fontSize: "18px",
                fontWeight: "800",
                color: "#000",
                marginRight: "50px",
              }}
            >
              Full Name
            </span>
            <span
              className="ms-5"
              style={{
                fontFamily: "Avenir",
                fontSize: "18px",
                fontWeight: "800",
                color: "#000",
                marginRight: "30px",
              }}
            >
              Gender
            </span>
            <span
              className="ms-5"
              style={{
                fontFamily: "Avenir",
                fontSize: "18px",
                fontWeight: "800",
                color: "#000",
              }}
            >
              Phone
            </span>
          </div>
          <hr style={{ marginTop: "8px", marginBottom: "6px" }} />
          <div className="d-flex ms-2" style={{ marginTop: "0" }}>
            <span
              className="ms-5"
              style={{
                fontFamily: "Avenir",
                fontSize: "18px",
                fontWeight: "400",
                color: "#B1B1B1",
              }}
            >
              1
            </span>
            <span
              className="ms-5"
              style={{
                fontFamily: "Avenir",
                fontSize: "18px",
                fontWeight: "400",
                color: "#B1B1B1",
                marginRight: "38px",
              }}
            >
              {state.user.fullname}
            </span>
            <span
              className="ms-5"
              style={{
                fontFamily: "Avenir",
                fontSize: "18px",
                fontWeight: "400",
                color: "#B1B1B1",
                marginRight: "30px",
              }}
            >
              {state.user.gender}
            </span>
            <span
              className="ms-5"
              style={{
                fontFamily: "Avenir",
                fontSize: "18px",
                fontWeight: "400",
                color: "#B1B1B1",
              }}
            >
              {state.user.phone}
            </span>
            <div className="ms-auto">
              <p style={{ fontFamily: "Avenir", marginRight: "144px" }}>
                <span
                  style={{
                    marginRight: "21px",
                    fontFamily: "Avenir",
                    fontSize: "18px",
                    fontWeight: "800",
                  }}
                >
                  Qty<b style={{ marginLeft: "68px" }}>:</b>
                </span>{" "}
                {Datas?.quantity}
              </p>
            </div>
          </div>
          <hr style={{ marginTop: "0" }} />
          <div
            style={{
              float: "right",
              fontFamily: "Avenir",
              marginRight: "36px",
            }}
          >
            <p style={{ color: "#ff0000" }}>
              <span
                style={{
                  marginRight: "21px",
                  fontFamily: "Avenir",
                  fontSize: "18px",
                  fontWeight: "800",
                  color: "#000",
                }}
              >
                Total <b style={{ marginLeft: "68px", color: "#000" }}>:</b>
              </span>{" "}
              IDR. {Datas?.price.toLocaleString("en-ID")}
            </p>
          </div>
        </div>
        <button
          style={{
            position: "relative",
            left: "920px",
            top: "20px",
            padding: "12px 90px",
            backgroundColor: "#ffaf00",
            color: "#fff",
            fontSize: "18px",
            fontFamily: "Avenir",
            fontWeight: "900",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={(e) => handleWaitingApprove(e)}
        >
          PAY
        </button>
      </Container>
    </>
  );
};

export default CardWaitPayment;

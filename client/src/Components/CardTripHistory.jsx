import { Col, Container, Row } from "react-bootstrap";
import Icon from "../assets/images/IconBooking.png";
import Barcode from "../assets/images/barcode.png";
import { useEffect, useState } from "react";
const CardHistory = ({ data }) => {
  const [profile, setProfile] = useState();
  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);

  return (
    <>
      <Container>
        {profile?.transaction?.map((item, id) => {
          return (
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
                marginBottom: "20px",
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
                    {item?.trip?.title}
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
                    {item?.trip?.country?.name}
                  </p>
                  <button
                    style={{
                      border: "none",
                      color: " #0BDC5F",
                      backgroundColor:
                        "linear-gradient(180deg, #3CF71E 0%, #0BDC5F 100%)",
                      padding: "4px 10px",
                      margin: "0 35px 0",
                    }}
                  >
                    {item?.status}
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
                        {item?.trip?.datetrip}
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
                        {item?.trip?.accomodation}
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
                        {item?.trip?.day} Day {item?.trip?.night} Night
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
                        {item?.trip?.transportation}
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
                      marginTop: "4px",
                      fontFamily: "Avenir",
                      fontSize: "18px",
                      fontWeight: "900",
                      color: "#878787",
                    }}
                  >
                    Saturday<b style={{ fontWeight: "300" }}> 22 Jun 2020</b>{" "}
                  </h6>
                  <img
                    src={Barcode}
                    alt=""
                    style={{
                      float: "right",
                      marginRight: "88px",
                      marginTop: "25px",
                    }}
                  />
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
                  {profile?.fullname}
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
                  {profile?.gender}
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
                  {profile?.phone}
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
                    {item?.counterqty}
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
                    Qty <b style={{ marginLeft: "68px", color: "#000" }}>:</b>
                  </span>{" "}
                  IDR. {item?.total.toLocaleString("en-ID")}
                </p>
              </div>
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default CardHistory;

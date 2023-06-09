import { Container, Table } from "react-bootstrap";
import IconSearch from "../../assets/images/iconSearch.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Col, Row } from "react-bootstrap";
import Icon from "../../assets/images/IconBooking.png";
import Picture from "../../assets/images/Bank.png";
import { useEffect, useState } from "react";

const IncomingTransaction = () => {
  const [modalApprove, setModalApprove] = useState();
  const [modalPrice, setModalPrice] = useState();
  console.log(modalApprove);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tourBook"));
    if (data === null) {
      setModalApprove("");
      setModalPrice("");
    } else {
      setModalApprove(data);
      setModalPrice(data.price.toLocaleString("en-ID"));
    }
  }, []);

  const modal = withReactContent(Swal);
  const handleSearchIcon = () => {
    modal.fire({
      html: (
        <div>
          <div
            style={{
              width: "1035px",
              height: "419px",
              border: "2px solid #B7B7B7",
              backgroundColor: "#fff",
              borderRadius: "5px",
              boxShadow: "0 0 2.5px #000",
              position: "relative",
              left: "20px",
            }}
          >
            <Row className=" ">
              <Col xs={4}>
                <img src={Icon} alt="" style={{ margin: "10px 0 0" }} />

                <h3
                  className=""
                  style={{
                    fontSize: "24px",
                    fontWeight: "900",
                    margin: "20px 22px 4px 10px",
                    fontFamily: "Avenir",
                  }}
                >
                  {modalApprove.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    fontFamily: "Avenir",
                    color: "#959595",
                    marginBottom: "16px",
                  }}
                >
                  {modalApprove.country}
                </p>
                <button
                  style={{
                    border: "none",
                    color: " #0BDC5F",
                    backgroundColor: "red",
                    padding: "4px 10px",
                    float: "left",
                    marginLeft: "25px",
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
                      26 August 2020
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
                      Hotel 4 Nights
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
                      6 Day 4 Night
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
                      Qata Airways
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
                  Saturday<b style={{ fontWeight: "300" }}> 22 Jun 2020</b>{" "}
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
                Radif Ganteng
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
                Male
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
                083896833112
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
                  {modalApprove.quantity}
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
                IDR. {modalPrice !== "" ? `IDR. ${modalPrice}` : ""}
              </p>
            </div>
          </div>
          <div className="float-right mt-3" style={{ marginLeft: "800px" }}>
            <button
              className="me-3"
              style={{
                border: "none",
                padding: "5px 18px",
                color: "#fff",
                backgroundColor: "#ffaf00",
                borderRadius: "8px",
              }}
            >
              CANCEL
            </button>

            <button
              className="me-3"
              style={{
                border: "none",
                padding: "5px 18px",
                color: "#fff",
                backgroundColor: "#ffaf00",
                borderRadius: "8px",
              }}
            >
              Approved
            </button>
          </div>
        </div>
      ),
      showConfirmButton: false,
      width: 1130,
      heightAuto: true,
    });
  };

  return (
    <>
      <Container>
        <h3 className="mt-5">Incoming Transaction</h3>
        <Table striped className="mt-5">
          <thead>
            <tr className="mt-3">
              <th>No</th>
              <th>User</th>
              <th>Trip</th>
              <th>Bukti Transfer</th>
              <th>Status Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="mt-5">
              <td>1</td>
              <td>Radif Ganteng</td>
              <td>6D/4N Fun Tassie Vaca ...</td>
              <td>bca.jpg</td>
              <td>Pending</td>
              <td>
                <img src={IconSearch} alt="" onClick={handleSearchIcon} />
              </td>
            </tr>
            <tr className="mt-5">
              <td>2</td>
              <td>Haris Rahman</td>
              <td>6D/4N Exciting Summer...</td>
              <td>bni.jpg</td>
              <td>Approve</td>
              <td>
                <img src={IconSearch} alt="" onClick={handleSearchIcon} />
              </td>
            </tr>
            <tr className="mt-5">
              <td>3</td>
              <td>Haris Astina</td>
              <td>6D/4N Wonderful Autum ...</td>
              <td>permata.jpg</td>
              <td>Cancel</td>
              <td>
                <img src={IconSearch} alt="" onClick={handleSearchIcon} />
              </td>
            </tr>

            <tr className="mt-5">
              <td>4</td>
              <td>Amin Subagiyo</td>
              <td>6D/4N Fun Tassie Vaca ...</td>
              <td>permata.jpg</td>
              <td>Approve</td>
              <td>
                <img src={IconSearch} alt="" onClick={handleSearchIcon} />
              </td>
            </tr>
            <tr className="mt-5">
              <td>5</td>
              <td>Amin Subagiyo</td>
              <td>6D/4N Fun Tassie Vaca ...</td>
              <td>permata.jpg</td>
              <td>pending</td>
              <td>
                <img src={IconSearch} alt="" onClick={handleSearchIcon} />
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default IncomingTransaction;

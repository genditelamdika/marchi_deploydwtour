import { Container, Card, Row, Col } from "react-bootstrap";
import Data from "../../fakeData/DataDummy";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCustomQuery } from "../../config/query";
import { getTrip } from "../../utils/trip";

const IncomingTripContent = () => {
  const navigate = useNavigate();
  const handleButtonTrip = () => {
    navigate("/AddTrip");
  };

  const { data, refetch } = useCustomQuery("adminTrip", getTrip);
  if (data && data.length > 0) {
    refetch();
  }
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   if ({ tripDatas }) {
  //     setData([tripDatas]);
  //   }
  //   console.log(tripDatas.image);
  // }, []);

  return (
    <>
      <Container className=" mt-5 justify-content-center">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "42px 28px",
          }}
        >
          <h2>Incoming Trip</h2>
          <button
            style={{
              padding: "4px 28px",
              border: "none",
              backgroundColor: "#ffaf00",
              borderRadius: "8px",
            }}
            onClick={handleButtonTrip}
          >
            Add Trip
          </button>
        </div>
        <Row style={{ marginTop: "20px" }}>
          {data &&
            data?.map((tour) => {
              return (
                <Col
                  className="d-flex justify-content-center mb-4"
                  key={tour.id}
                >
                  <Card style={{ width: "350px", height: "350px" }}>
                    <Card.Img
                      variant="top"
                      src={tour?.image}
                      className="styleImage"
                    />
                    <Card.Body style={{ fontFamily: "Avenir" }}>
                      <Card.Title>
                        {" "}
                        <Link
                          to={`/Detail/${tour.id}`}
                          style={{
                            textDecoration: "none",
                            color: "#000",
                          }}
                        >
                          {tour?.title}
                        </Link>{" "}
                      </Card.Title>
                      <div className="d-flex justify-content-between">
                        <Card.Text
                          className="mt-3"
                          style={{
                            fontFamily: "Avenir",
                            fontWeight: "900",
                            fontSize: "18px",
                            color: "#ffaf00",
                          }}
                        >
                          {tour.price}
                        </Card.Text>
                        <Card.Text className="mt-3">
                          {tour?.country.name}
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
};

export default IncomingTripContent;

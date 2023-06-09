import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCustomQuery } from "../config/query";
import { getTrip } from "../utils/trip";

const GroupsTour = ({ searchTerm }) => {
  let { data } = useCustomQuery("data", getTrip);

  const filteredData = data?.filter((item) => {
    if (searchTerm === "") {
      return item;
    } else if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else if (item.country.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    }
    return;
  });

  return (
    <Container className="positionGroup justify-content-center">
      <h1
        style={{
          fontFamily: "Avenir",
          fontWeight: "800",
        }}
        className="text-center mb-5"
      >
        Group tour
      </h1>
      <Row className="">
        {filteredData &&
          filteredData.map((tour) => {
            return (
              <Col className="d-flex justify-content-center mb-4" key={tour.id}>
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
                        IDR {tour?.price.toLocaleString("en-ID")}
                      </Card.Text>
                      <Card.Text className="mt-3">{tour?.country}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default GroupsTour;

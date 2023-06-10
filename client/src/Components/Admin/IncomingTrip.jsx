import { Container, Card, Row, Col } from "react-bootstrap";
import Data from "../../fakeData/DataDummy";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCustomMutation, useCustomQuery } from "../../config/query";
import { getTrip } from "../../utils/trip";
import { deleteTrip } from "../../utils/admin";
import Swal from "sweetalert2";

const IncomingTripContent = () => {
  const navigate = useNavigate();
  const handleButtonTrip = () => {
    navigate("/AddTrip");
  };
  const { data, refetch } = useCustomQuery("adminTrip", getTrip);
  const deleteTripMutation = useCustomMutation("deleteTrip", deleteTrip);
  useEffect(() => {
    refetch();
  }, [deleteTripMutation.isSuccess]);

  const handleDelete = async (id) => {
    try {
      await deleteTripMutation.mutateAsync(id);
      Swal.fire({
        icon: "success",
        title: "Trip Deleted",
        text: "The trip has been successfully deleted.",
      });
    } catch (error) {
      console.log(error, "error delete");
    }
  };

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
                    <Card.Body
                      style={{ fontFamily: "Avenir", position: "relative" }}
                    >
                      <Card.Title>
                        {" "}
                        <Link
                          to={`/Detail/${tour.id}`}
                          style={{
                            textDecoration: "none",
                            color: "#000",
                          }}
                          className="linkAdmin"
                        >
                          {tour?.title}
                        </Link>{" "}
                      </Card.Title>
                      <div className="d-flex justify-content-between">
                        <Card.Text
                          style={{
                            fontFamily: "Avenir",
                            fontWeight: "900",
                            fontSize: "18px",
                            color: "#ffaf00",
                            bottom: "-6px",
                            left: "15px",
                            position: "absolute",
                          }}
                        >
                          <span className="me-2">IDR</span>
                          {tour.price.toLocaleString("en-ID")}
                        </Card.Text>
                        <Card.Text
                          className="mt-3"
                          style={{
                            bottom: "10px",
                            right: "15px",
                            position: "absolute",
                            fontFamily: "arial",
                            fontWeight: "700",
                          }}
                        >
                          {tour?.country}
                        </Card.Text>
                      </div>
                    </Card.Body>
                    <div>
                      <button
                        style={{
                          width: "100%",
                          border: "none",
                          background: "#ab32f0",
                          height: "28px",
                          color: "whitesmoke",
                          letterSpacing: "1.5px",
                          fontWeight: "600",
                        }}
                        onClick={() => handleDelete(tour?.id)}
                      >
                        DELETE
                      </button>
                    </div>
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

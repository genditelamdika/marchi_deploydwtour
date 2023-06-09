import { Card, Container } from "react-bootstrap";
import Guarantee from "../assets/images/guarantee 1.png";
import Heart from "../assets/images/heart 1.png";
import Agent from "../assets/images/agent.png";
import Support from "../assets/images/support 1.png";

const Contents = () => {
  return (
    <Container>
      <div
        className="d-flex p-0 "
        style={{
          margin: "50px 80px 0",
        }}
      >
        <div className="Cards me-5 ">
          <Card style={{ padding: "35px 21px" }}>
            <Card.Img
              className="m-auto"
              src={Guarantee}
              style={{ width: "70px", height: "70px" }}
            />
            <Card.Body>
              <Card.Title className="text-center mt-1 cardsTitle">
                Best Price Guarantee
              </Card.Title>
              <Card.Text className="text-center justify-align-center cardText ">
                A small river named Durend flows by their place and supplies
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="Cards me-5">
          <Card style={{ padding: "35px 21px" }}>
            <Card.Img
              className="m-auto"
              src={Heart}
              style={{ width: "70px", height: "70px" }}
            />
            <Card.Body>
              <Card.Title className="text-center mt-1 cardsTitle">
                Travellers Love Us
              </Card.Title>
              <Card.Text className="text-center justify-align-center cardText ">
                A small river named Durend flows by their place and supplies
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="Cards me-5">
          <Card style={{ padding: "35px 21px" }}>
            <Card.Img
              className="m-auto"
              src={Agent}
              style={{ width: "70px", height: "70px" }}
            />
            <Card.Body>
              <Card.Title className="text-center mt-1 cardsTitle">
                Best Travel Agent
              </Card.Title>
              <Card.Text className="text-center justify-align-center cardText ">
                A small river named Durend flows by their place and supplies
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="Cards">
          <Card style={{ padding: "35px 21px" }}>
            <Card.Img
              className="m-auto"
              src={Support}
              style={{ width: "70px", height: "70px" }}
            />
            <Card.Body>
              <Card.Title className="text-center mt-1 cardsTitle">
                Our Dedicated Support
              </Card.Title>
              <Card.Text className="text-center justify-align-center cardText ">
                A small river named Durend flows by their place and supplies
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Contents;

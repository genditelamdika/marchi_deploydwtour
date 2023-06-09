import { Form, Button, Container, InputGroup } from "react-bootstrap";

function Jumbotron() {
  return (
    <>
      <div className="backgroundImage">
        <Container className="Content">
          <h1>Explore</h1>
          <h1
            style={{
              fontWeight: "300",
              marginTop: "-12px",
              fontFamily: "Product Sans Thin",
            }}
          >
            your amazing city together
          </h1>
        </Container>

        <Container className="OtherContent d-flex flex-column">
          <Form.Label
            style={{
              color: "#FFF",
              fontFamily: "Avenir",
            }}
          >
            Find great place to holiday
          </Form.Label>
        </Container>
      </div>
    </>
  );
}

export default Jumbotron;

import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { useCustomMutation, useCustomQuery } from "../../config/query";
import { addTrip, addcountry } from "../../utils/admin";
const AddTripInput = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState();
  // const addTripMutation = useCustomMutation("addTrip", addTrip);
  const [tripData, setTripData] = useState({
    title: "",
    country: "",
    accomodation: "",
    transportation: "",
    eat: "",
    day: "",
    night: "",
    datetrip: "",
    price: "",
    quota: "",
    description: "",
    image: null,
  });
  // get country
  let { data } = useCustomQuery("country", addcountry);
  // urutkan abjad country
  data &&
    data.sort((a, b) => {
      const nameA = a.name.common.toUpperCase();
      const nameB = b.name.common.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  // filter map from API
  const filteredOptions =
    data &&
    data?.map((country) => ({
      value: country.name.common,
      label: country.name.common,
    }));
  // post form
  const postForm = useCustomMutation("post", addTrip);

  const handleInputChange = (e) => {
    setTripData({
      ...tripData,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const submitAddTrip = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", tripData.title);
    formData.set("country", countries);
    formData.set("accomodation", tripData.accomodation);
    formData.set("transportation", tripData.transportation);
    formData.set("eat", tripData.eat);
    formData.set("day", tripData.day);
    formData.set("night", tripData.night);
    formData.set("datetrip", tripData.datetrip);
    formData.set("price", tripData.price);
    formData.set("quota", tripData.quota);
    formData.set("description", tripData.description);
    formData.set("image", tripData.image[0], tripData.image[0].name);
    const result = postForm.mutate(formData);

    console.log(tripData.image[0], "testimage");
    console.log(result, "ini result dari post");

    Swal.fire("Good job!", "Successs");
    navigate("/trip");
  };

  const handleChange = (data) => {
    console.log("Selected option:", data);
    if (data.value) {
      setCountries(data.value);
    }
    // Lakukan operasi lain sesuai kebutuhan dengan opsi yang dipilih
  };

  return (
    <>
      <Container>
        <h4
          style={{
            margin: "42px 0",
          }}
        >
          Add Trip
        </h4>

        <Form onSubmit={(e) => submitAddTrip(e)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title Trip</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={tripData.title}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Country</Form.Label>

            <Select
              options={filteredOptions}
              isSearchable={true}
              onChange={handleChange}
              className="mb-2"
              id="country"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Accomodation</Form.Label>
            <Form.Control
              type="text"
              name="accomodation"
              value={tripData.accomodation}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Transportation</Form.Label>
            <Form.Control
              type="text"
              name="transportation"
              value={tripData.transportation}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Eat</Form.Label>
            <Form.Control
              type="text"
              name="eat"
              value={tripData.eat}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Duration</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="text"
                style={{ width: "30%" }}
                name="day"
                value={tripData.day}
                onChange={handleInputChange}
              />
              <h6 style={{ paddingTop: "10px", margin: "0 18px" }}>Day</h6>
              <Form.Control
                type="text"
                style={{ width: "30%" }}
                name="night"
                value={tripData.night}
                onChange={handleInputChange}
              />
              <h6 style={{ paddingTop: "10px", margin: "0 18px" }}>Night</h6>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Date Trip</Form.Label>
            <Form.Control
              type="date"
              name="datetrip"
              value={tripData.datetrip}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={tripData.price}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Quota</Form.Label>
            <Form.Control
              type="text"
              name="quota"
              value={tripData.quota}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              size="none"
              name="description"
              value={tripData.description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              style={{ width: "30%" }}
              name="image"
              onChange={handleInputChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <button
              style={{
                margin: "18px 0",
                color: "#fff",
                backgroundColor: "#ffaf00",
                padding: "4px 24px",
                border: "none",
                borderRadius: "8px",
              }}
              type="submit"
            >
              AddTrip
            </button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddTripInput;

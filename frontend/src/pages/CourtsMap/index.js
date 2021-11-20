import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import NavigationBar from "../../Components/NavigationBar/NavigationBar";
import { Form, Button } from "react-bootstrap";

const CourtsMap = (props) => {
  const userToken = localStorage.getItem("userToken");
  const [markers, setMarkers] = useState([]);
  const [title, setTitle] = useState("")
  const [name, setName] = useState("")
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    // const form = e.currentTarget
    const h = new Headers();
    h.append("Authorization", userToken);
    console.log(title, name, lat, long)
    fetch('http://localhost:5000/api/v1/courts', {
      method: 'POST',
      body: JSON.stringify({
        "title": title,
        "name": name,
        "lat": lat, 
        "lng": long
      }),
      headers: h
    })
    .then(res => {
      console.log(res.status)
      handleGetCourts()
    })
    .catch(err => console.log(err))
  }

  const handleGetCourts = async () => {
    const h = new Headers();
    h.append("Authorization", userToken);
    fetch("http://localhost:5000/api/v1/courts", {
      method: "GET",
      headers: h,
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((body) => {
            body.data.map((markerData, i) => {
              setMarkers([
                ...markers,
                <Marker
                  key={i}
                  title={markerData.title}
                  name={markerData.name}
                  position={{ lat: markerData.lat, lng: markerData.lng }}
                />,
              ]);
            });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleGetCourts();
  }, []);

  console.log(props.google);
  return (
    <>
      <NavigationBar />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Court Title" onChange={e => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" onChange={e => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLatitude">
          <Form.Label>Latitude</Form.Label>
          <Form.Control type="text" placeholder="Enter Latitude of court" onChange={e => setLat(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLongitude">
          <Form.Label>Longitude</Form.Label>
          <Form.Control type="text" placeholder="Enter Longitude of court" onChange={e => setLong(parseFloat(e.target.value))}/>
        </Form.Group>

        <Button variant="primary" type="submit" onSubmit>
          Add Court
        </Button>
      </Form>
      <Map
        google={props.google}
        zoom={12}
        initialCenter={{ lat: 43.73364994689818, lng: -79.36157097988153 }}
      >
        {markers.map((marker) => marker)}
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBc37lh1ecTApeyFFNKjTq7PO9nVcMwxm0",
})(CourtsMap);

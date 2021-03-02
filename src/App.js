import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { GrLocation } from "react-icons/gr";
import axios from "axios";

const App = () => {
  const [data, setData] = React.useState([]);
  const [dailyStates, setDailyStates] = React.useState([]);
  // const { current } = React.useRef(0);
  const confirmed = React.useRef(12345);
  const active = React.useRef(12345);
  const decreased = React.useRef(1234);
  const recovered = React.useRef(122);

  React.useEffect(() => {
    axios
      .get("https://api.covid19india.org/data.json")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));

    axios
      .get("https://api.covid19india.org/states_daily.json")
      .then((res) => {
        setDailyStates(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app">
      <Container fluid>
        <Row>
          {/* table */}
          <Col xs={12} md={6}>
            <div className="header">
              <GrLocation />
              <h4>India COVID-19 Tracker</h4>
              <p>
                Let's all pray to make our Earth Covid-19 free soon, Stay Safe
                and do TheLocate.
              </p>
            </div>
          </Col>

          {/* map */}
          <Col xs={12} md={6}>
            hey its a map
            <Card>
              <Card.Text>its a card</Card.Text>

              {[
                { label: "CONFIRMED", number: confirmed.current },
                { label: "ACTIVE", number: active.current },
                { label: "RECOVERED", number: recovered.current },
                { label: "DECREASED", number: decreased.current },
              ].map((data, index) => (
                <div key={index}>
                  <span>{data.label}</span>
                  <span>{data.number}</span>
                </div>
              ))}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;

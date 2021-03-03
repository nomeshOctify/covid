import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { GrLocation } from "react-icons/gr";
import axios from "axios";
import "./index.scss";

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
              <div className="header-text">
                <h4>India COVID-19 Tracker</h4>
                <p>
                  Let's all pray to make our Earth Covid-19 free soon, Stay Safe
                  and do TheLocate.
                </p>
              </div>
            </div>

            <div className="body">
              <table class="table table-light table-borderless table-sm">
                <thead>
                  <tr>
                    <th scope="col">STATE/UT</th>
                    <th scope="col">CONFIRMED</th>
                    <th scope="col">ACTIVE</th>
                    <th scope="col">RECOVERED</th>
                    <th scope="col">DECEASED</th>
                  </tr>
                </thead>
                <tbody>
                  {data["statewise"]?.map((obj, i) => (
                    <tr>
                      <th scope="row">{obj["state"]}</th>
                      <td>{obj["confirmed"]}</td>
                      <td>{obj["active"]}</td>
                      <td>{obj["recovered"]}</td>
                      <td>{obj["deaths"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/*JSON.stringify(data["statewise"])*/}
            </div>
          </Col>

          {/* map */}
          <Col xs={12} md={6}>
            <div className="header-second">
              <h4>India Map</h4>
              <p>HOVER OVER STATES FOR MORE DETAILS</p>
            </div>

            <Card>
              {[
                { label: "CONFIRMED", number: confirmed.current },
                { label: "ACTIVE", number: active.current },
                { label: "RECOVERED", number: recovered.current },
                { label: "DECREASED", number: decreased.current },
              ].map((data, index) => (
                <div className={"colored-buttons"} key={index}>
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

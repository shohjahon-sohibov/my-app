import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [companies, setCompanies] = useState([]);
  const [complexes, setComplexes] = useState([]);
  const [houses, setHouses] = useState([]);
  const [credits, setCredits] = useState([]);
  const [bankes, setBankes] = useState([]);


  const [creditDuration, setCreditDuration] = useState([]);
  const [companyResult, setCompanyResult] = useState([]);
  const [complexesResult, setComplexesResult] = useState([]);
  const [activeState, setActiveState] = useState([]);
  const [filtHouse, setFiltHouse] = useState([]);

  useEffect(() => {
    fetch("https://crediting-houses.herokuapp.com/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data));

    fetch("https://crediting-houses.herokuapp.com/credits")
      .then((res) => res.json())
      .then((data) => setCredits(data));

    const filtHouse = houses.find((item) => item.house_number == activeState);
    setFiltHouse(filtHouse);
  }, [activeState]);

  const handleCompanies = (e) => {
    fetch(
      `https://crediting-houses.herokuapp.com/complexes?companyID=${e.target.selectedIndex + 1}`
    )
      .then((res) => res.json())
      .then((data) => setComplexes(data));

    setCompanyResult(e.target.value);
  };

  const handleComplexes = (e) => {
    fetch(
      `https://crediting-houses.herokuapp.com/houses?complexID=${e.target.selectedIndex + 1}`
    )
      .then((res) => res.json())
      .then((data) => setHouses(data));

    setComplexesResult(e.target.value);
  };

  const handleCredits = (e) => {
    fetch(
      `https://crediting-houses.herokuapp.com/bankes?houseID=${activeState}&creditID=${
        e.target.selectedIndex + 1
      }`
    )
      .then((res) => res.json())
      .then((data) => setBankes(data));

    setCreditDuration(e.target.value);
  };

  const handleHouse = (e) => {
    setActiveState(e.target.value);
  };

  return (
    <section className="body">
      <section className="container">
        <section className="wrapper">
          <div className="wrappere__selects-wrapper">
            {/* companies */}

            <p htmlFor="">Company</p>
            <select
              className="wrapper__company-select"
              name="company"
              onChange={(e) => handleCompanies(e)}
            >
              {companies &&
                companies.map((e, i) => (
                  <option key={i} id={e.company_id} value={e.company_name}>
                    {e.company_name}
                  </option>
                ))}
            </select>

            {/* complex */}
            <p htmlFor="">Complex</p>
            <select
              className="wrapper__complex-select"
              name="complex"
              onChange={(e) => handleComplexes(e)}
            >
              {complexes &&
                complexes.map((e, i) => (
                  <option key={i} id={e.complex_id} value={e.complex_name}>
                    {e.complex_name}
                  </option>
                ))}
            </select>

            {/* houses */}

            <p htmlFor="">Houses</p>
            <select
              className="wrapper__houses-select"
              name="houses"
              onChange={(e) => handleHouse(e)}
            >
              {houses &&
                houses.map((e, i) => (
                  <option key={i} value={e.house_number}>
                    {e.house_number}
                  </option>
                ))}
            </select>

            {/* bankes */}

            <p htmlFor="">Credit duration</p>
            <select
              className="wrapper__credit-duration-select"
              name="credits"
              onChange={(e) => handleCredits(e)}
            >
              {credits &&
                credits.map((e, i) => (
                  <option key={i} id={e.credit_id} value={e.credit_duration}>
                    {e.credit_duration}
                  </option>
                ))}
            </select>
          </div>

          <div className="wrapper__results-wrapper">
            <h2>Company: {companyResult ? companyResult : ""}</h2>
            <h2>Complex: {complexesResult ? complexesResult : ""}</h2>

            <h2>
              Rooms count:{" "}
              {filtHouse && filtHouse.house_number
                ? `${filtHouse.house_number} rooms`
                : 0}
            </h2>
            <h2>
              Room meter square:{" "}
              {filtHouse && filtHouse.house_meter_square
                ? `${filtHouse.house_meter_square} square`
                : ""}
            </h2>
            <h2>
              Price per meter square:{" "}
              {filtHouse && filtHouse.house_price_per_meter
                ? `${filtHouse.house_price_per_meter} per square`
                : ""}
            </h2>
            <h2>
              Credit duration:{" "}
              {creditDuration ? `${creditDuration} years` : "0"}
            </h2>
            <h2>
              monthly:{" "}
              <span>{bankes && bankes[0] ? bankes[0].monthly : 0}</span>
            </h2>
          </div>
        </section>
      </section>
    </section>
  );
}
export default App;
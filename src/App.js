import React, { Component, useState } from 'react';
import './App.css';
import data from './data';
import Table from './components/Table';

function formatValue(property, value) {
  let obj;

  if (property === 'airline') {
    obj = data.getAirlineById(value)
  } else {
    obj = data.getAirportByCode(value)
  }

  return obj.name;
}

const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
];

const App = () =>  {
  let [ routes, setRoutes ] = useState(data.routes);
  let [ firstRouteToShow, setFirstRouteToShow ] = useState(0);
  const PER_PAGE = 25;

  const incrementVisibleRoutes = (_) => {
    setFirstRouteToShow(firstRouteToShow + PER_PAGE)
  }

  const decrementVisibleRoutes = (_) => {
    setFirstRouteToShow(firstRouteToShow - PER_PAGE)
  }

  const topOfRange = function() {
    return firstRouteToShow + PER_PAGE <= routes.length ?
      firstRouteToShow + PER_PAGE :
      routes.length
  }

  const filterByAirline = (event) => {
    const airlineName = event.target.value;

    if (airlineName) {
      const airline = data.getAirlineByName(airlineName);
      setRoutes(data.routes.filter(route => route.airline === airline.id));
    } else {
      setRoutes(data.routes);
    }
  }

  return (
    <div className="app container">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <form>
          <label>
            Show routes on
            <select onChange={filterByAirline} name="airline" id="airline-select">
              <option key="all" value="">All Airlines</option>
              {data.airlines.map(airline => 
                <option key={airline.id} value={airline.name}>{airline.name}</option>
              )}
            </select>
          </label>
        </form>
      </section>
        <Table
          className="routes-table"
          columns={columns}
          rows={routes}
          format={formatValue}
          rowsPerPage={PER_PAGE}
          firstRow={firstRouteToShow}
        />

        <p>{`Showing ${firstRouteToShow+1}-${topOfRange()} of ${routes.length} routes`}</p>
        <button
          disabled={firstRouteToShow === 0 ? true : false}
          onClick={decrementVisibleRoutes}
        >
        Previous Page
        </button>
        <button
        disabled={firstRouteToShow + PER_PAGE >= routes.length ? true : false}
        onClick={incrementVisibleRoutes}>Next Page</button>
    </div>
  )
}



export default App;
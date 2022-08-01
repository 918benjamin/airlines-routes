import React, { useState } from 'react';
import './App.css';
import data from './data';
import Table from './components/Table';
import Select from './components/Select';

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
  let [ isFiltered, setIsFiltered ] = useState(false);
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
    const airlineId = event.target.value;

    if (airlineId) {
      setRoutes(routes.filter(route => route.airline === parseInt(airlineId, 10)));
      setIsFiltered(true)
    } else {
      setRoutes(data.routes);
      setIsFiltered(false)
    }
  }

  const filterByAirport = (event) => {
    const airportCode = event.target.value;

    if (airportCode) {
      setRoutes(routes.filter(route => {
        return route.src === airportCode || route.dest === airportCode;
      }));
      setIsFiltered(true)
    } else {
      setRoutes(data.routes);
      setIsFiltered(false)
    }
  }

  const resetFilters = (event) => {
    event.preventDefault();
    setIsFiltered(false);
    setRoutes(data.routes);
    document.getElementById("filter").reset();
  }

  return (
    <div className="app container">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <form id="filter">
          <label>
            Show routes on
            <Select
              options={data.airlines}
              valueKey="id"
              titleKey="name"
              allTitle="All Airlines"
              value=""
              onSelect={filterByAirline}
            />
          </label>
          <label>
            flying in or out of
            <Select
              options={data.airports}
              valueKey="code"
              titleKey="name"
              allTitle="All Airports"
              value=""
              onSelect={filterByAirport}
            />
          </label>
          <button disabled={!isFiltered} onClick={resetFilters}>Show All Routes</button>
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
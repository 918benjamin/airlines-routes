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
  let [ firstRouteToShow, setFirstRouteToShow ] = useState(0)
  const PER_PAGE = 73;

  const incrementVisibleRoutes = (event) => {
    setFirstRouteToShow(firstRouteToShow + PER_PAGE)
  }

  const decrementVisibleRoutes = (event) => {
    setFirstRouteToShow(firstRouteToShow - PER_PAGE)
  }

  const topOfRange = function() {
    return firstRouteToShow + PER_PAGE <= data.routes.length ?
      firstRouteToShow + PER_PAGE :
      data.routes.length
  }

  return (
    <div className="app container">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>Welcome to the App</p>
      </section>
        <Table
          className="routes-table"
          columns={columns}
          rows={data.routes}
          format={formatValue}
          rowsPerPage={PER_PAGE}
          firstRow={firstRouteToShow}
        />

        <p>{`Showing ${firstRouteToShow+1}-${topOfRange()} of ${data.routes.length} routes`}</p>
        <button
          disabled={firstRouteToShow === 0 ? true : false}
          onClick={decrementVisibleRoutes}
        >
        Previous Page
        </button>
        <button
        disabled={firstRouteToShow + PER_PAGE >= data.routes.length ? true : false}
        onClick={incrementVisibleRoutes}>Next Page</button>
    </div>
  )
}



export default App;
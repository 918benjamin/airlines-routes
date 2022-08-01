import React, { Component } from 'react';
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

const App = () => (
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
    />
  <section>

  </section>
</div>
)

export default App;
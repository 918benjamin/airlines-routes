import React, { Component } from 'react';
import './App.css';
import { Table } from 'react-bootstrap';
import data from './data';

const App = () => (
  <div className="app container">
  <header className="header">
    <h1 className="title">Airline Routes</h1>
  </header>
  <section>
    <p>Welcome to the App</p>
  </section>
  <section>
    <Table>
      <tbody>
        {data.routes.map(route => 
          <tr>
            <td>{data.getAirlineById(route.airline).name}</td>
            <td>{data.getAirportByCode(route.src).name}</td>
            <td>{data.getAirportByCode(route.dest).name}</td>
          </tr>
        )}
      </tbody>
    </Table>
  </section>
</div>
)

export default App;
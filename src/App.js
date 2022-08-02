import React, { useState, useEffect } from 'react';
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
  let [ selectedAirline, setSelectedAirline ] = useState("");
  let [ selectedAirport, setSelectedAirport ] = useState("");
  let [ isFiltered, setIsFiltered ] = useState(false);
  let [ filteredAirlines, setFilteredAirlines ] = useState(data.airlines);
  let [ filteredAirports, setFilteredAirports ] = useState(data.airports);
  const PER_PAGE = 25;

  useEffect(() => {
    if (selectedAirline && selectedAirport) {
      setRoutes(data.routes.filter(route => {
        return route.airline === selectedAirline &&
        (route.src === selectedAirport || route.dest === selectedAirport);
      }));

      setIsFiltered(true)
    } else if (selectedAirline) {
      setRoutes(data.routes.filter(route => {
        return route.airline === selectedAirline;
      }));
      setIsFiltered(true)
    } else if (selectedAirport) {
      setRoutes(data.routes.filter(route => {
        return route.src === selectedAirport || route.dest === selectedAirport;
      }));
      setIsFiltered(true)
    } else {
      setRoutes(data.routes)
      setIsFiltered(false)
    }
  }, [selectedAirline, selectedAirport])

  useEffect(() => {
    const enabledAirlines = [];
    const enabledAirports = [];

    routes.forEach(route => {
      if (!enabledAirlines.includes(route.airline)) {
        enabledAirlines.push(route.airline);
      }

      if (!enabledAirports.includes(route.src)) {
        enabledAirports.push(route.src);
      }

      if (!enabledAirports.includes(route.dest)) {
        enabledAirports.push(route.dest);
      }
    });

    setFilteredAirlines(data.airlines.map(airline => {
      if (enabledAirlines.includes(airline.id)) {
        return {...airline, disabled: false}
      }
      return {...airline, disabled: true}
    }))

    setFilteredAirports(data.airports.map(airport => {
      if (enabledAirports.includes(airport.code)) {
        return {...airport, disabled: false}
      }
      return {...airport, disabled: true}
    }))

  }, [routes])

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

  const selectAirline = (event) => {
    setSelectedAirline(parseInt(event.target.value, 10));
  }

  const selectAirport = (event) => {
    setSelectedAirport(event.target.value);
  }

  const resetFilters = (event) => {
    event.preventDefault();
    setIsFiltered(false);
    setRoutes(data.routes);
    setFilteredAirlines(data.airlines);
    setFilteredAirports(data.airports);
    setSelectedAirline("");
    setSelectedAirport("");
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <form id="filter">
          <label>
            Show routes on
            <Select
              options={filteredAirlines}
              valueKey="id"
              titleKey="name"
              allTitle="All Airlines"
              value={selectedAirline}
              onSelect={selectAirline}
            />
          </label>
          <label>
            flying in or out of
            <Select
              options={filteredAirports}
              valueKey="code"
              titleKey="name"
              allTitle="All Airports"
              value={selectedAirport}
              onSelect={selectAirport}
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
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

    // if (selectedAirline) {
    //   setRoutes(routes.filter(route => route.airline === selectedAirline));
    //   setFilteredAirlines(filteredAirlines.map(airline => {
    //     if (airline.id === selectedAirline) {
    //       return {...airline, disabled: false}
    //     } else {
    //       return {...airline, disabled: true}
    //     }
    //   }))
    //   setIsFiltered(true)
    // } else {
    //   setRoutes(data.routes);
    //   setFilteredAirlines(data.airlines)
    //   setIsFiltered(false)
    // }
  }

  const selectAirport = (event) => {
    setSelectedAirport(event.target.value);
    // if (selectedAirport) {
    //   setRoutes(routes.filter(route => {
    //     return route.src === selectedAirport || route.dest === selectedAirport;
    //   }));
      // let airportCodes;
      // airportCodes = routes.map(route => [route.src, route.dest]).flat();
      // airportCodes = [...new Set(airportCodes)];

      // setFilteredAirports(filteredAirports.map(airport => {
      //   if (airportCodes.includes(airport.code)) {
      //     return {...airport, disabled: false}
      //   } else {
      //     return {...airport, disabled: true}
      //   }
      // }))

    //   setIsFiltered(true)
    // } else {
    //   setRoutes(data.routes);
    //   setFilteredAirports(data.airports);
    //   setIsFiltered(false)
    // }
  }

  const resetFilters = (event) => {
    event.preventDefault();
    setIsFiltered(false);
    setRoutes(data.routes);
    // setFilteredAirlines(data.airlines);
    // setFilteredAirports(data.airports);
    setSelectedAirline("");
    setSelectedAirport("");
    document.getElementById("filter").reset();
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
              valueKey="id" // option[valueKey] == route.id
              titleKey="name" // option[titleKey] == route.name
              allTitle="All Airlines"
              value={selectedAirline} // This is what we want to select (default "")
              onSelect={selectAirline}
            />
          </label>
          <label>
            flying in or out of
            <Select
              options={filteredAirports}
              valueKey="code" // option[valueKey] == route.code
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
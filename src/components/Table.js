import React from 'react';

const Table = ({ columns, rows, format, rowsPerPage, firstRow }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => 
            <th key={column.property}>{column.name}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {rows.slice(firstRow, firstRow + rowsPerPage).map(row => 
          <tr key={columns.map(column => row[column.property]).join('')}>
          {columns.map(column =>
            <td key={column.property}>{format(column.property, row[column.property])}</td>
          )}
          </tr>
        )}
      </tbody>
    </table>
  )
};

export default Table;
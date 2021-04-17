import React from "react";

import { columns, defaultSorted } from "./const";
import Swal from "sweetalert2";
import { useTable } from 'react-table';
import ReactTable from "react-table";


// изменение selected = true при выборе чекбокса
function onSelectRow(row, isChecked, e) {
  let allitems = JSON.parse(localStorage.getItem("items"));

  if (isChecked) {
    allitems.forEach((element) => {
      if (element.id === row.id) {
        element.selected = true;
      }
    });
  } else {
    allitems.forEach((element) => {
      if (element.id === row.id) {
        element.selected = false;
      }
    });
  }
  localStorage.setItem("items", JSON.stringify(allitems));
}
// изменение selected = true при выборе ВСЕХ чекбоксов
function onSelectAllRows(isChecked, row, e) {
  let allitems = JSON.parse(localStorage.getItem("items"));
  if (isChecked) {
    allitems.forEach((element) => {
      element.selected = true;
    });
  } else {
    allitems.forEach((element) => {
      element.selected = false;
    });
  }
  localStorage.setItem("items", JSON.stringify(allitems));
}

const selectRowProp = {
  mode: "checkbox",
  clickToSelect: false,
  unselectable: [2],
  selected: [0],
  onSelect: onSelectRow,
  onSelectAll: onSelectAllRows,
  bgColor: "lightgreen"
};

export default class Table extends React.Component {
 
 
  render() {
    return (
      <ReactTable
      data={this.props.data}
      columns={[
        {
          Header: "First Name",
          accessor: "firstName",
          className: "sticky",
          headerClassName: "sticky"
        },
        {
          Header: "Last Name",
          id: "lastName",
          accessor: d => d.lastName
        },
        {
          Header: "Age",
          accessor: "age"
        },
        {
          Header: "Age",
          accessor: "age"
        },
        {
          Header: "Age",
          accessor: "age"
        },
        {
          Header: "Age",
          accessor: "age"
        },
        {
          Header: "Age",
          accessor: "age"
        },
        {
          Header: "Age",
          accessor: "age"
        },
        {
          Header: "Age",
          accessor: "age"
        },
        {
          Header: "Status",
          accessor: "status"
        },
        {
          Header: "Visits",
          accessor: "visits"
        }
      ]}
      defaultPageSize={10}
      className="-striped -highlight"
    />
        
        
      
    );
  }
}

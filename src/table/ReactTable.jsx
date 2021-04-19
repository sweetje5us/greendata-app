import { Hidden } from '@material-ui/core'
import React from 'react'

import { useTable, useSortBy } from 'react-table'

import makeData from './makeData'


function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20)

  return (
    <>
    <table class="maintable" {...getTableProps()}>
      <tableheader>
          
          <thbox>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
          </thbox>
          <thunder>

          </thunder>
      </tableheader>
      <tablecontent {...getTableBodyProps()}>
      {firstPageRows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tableitem {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tableitem>
              )}
          )}
      </tablecontent>
  </table>      
    </>
  )
}


  const columns = [
      {
        Header: 'id',
        accessor: (id, i) => i+1,
      },
      {
        Header: 'Имя',
        accessor: 'name',
          },
          {
            Header: 'Фамилия',
            accessor: 'surname',
          },
          {
            Header: 'Отчество',
            accessor: 'lastname',
          },
          {
            Header: 'должность',
            accessor: 'position',
          },
          {
            Header: 'дата рождения',
            accessor: 'bdate',
          },
          {
            Header: 'пол',
            accessor: 'sex',
          },
          {
            Header: 'дата приема',
            accessor: 'hdate',
          },
          {
            Header: 'дата увольнения',
            accessor: 'fdate',
          },
          {
            Header: 'наличие прав',
            accessor: 'drive_l',
          },
          {
            Header: 'selected',
            accessor: 'selected',
            
          },
         
       
     
    ];
    
export default class ReactTable1 extends React.Component {
  
  render()  {
    return (
      <Table columns={columns} data={this.props.data}></Table>
    );
    }
  }

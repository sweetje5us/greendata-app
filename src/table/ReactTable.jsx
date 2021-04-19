import { Hidden } from '@material-ui/core'
import React, { useEffect } from 'react'

import { useTable, useSortuseRowSelectBy, useRowSelect } from 'react-table'

import makeData from './makeData'



const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

const getSelectionColumns = (hooks) => {
  hooks.visibleColumns.push(columns => [
    // Let's make a column for selection
    {
      id: 'selection',
      // The header can use the table's getToggleAllRowsSelectedProps method
      // to render a checkbox
      Header: ({ getToggleAllRowsSelectedProps }) => (
        <th>
          <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
        </th>
      ),
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      Cell: ({ row }) => (
        <td>
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        </td>
      ),
    },
    ...columns,
  ])
}

function Table({ columns, data, onSelect }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    useSortuseRowSelectBy,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    getSelectionColumns
  )

  useEffect(() => {
    onSelect(selectedRowIds)
  }, [selectedRowIds, onSelect])
 
  return (
    <>
      <table class="maintable" {...getTableProps()}>
      <tableheader>
      <thbox>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
          </thbox>
          <thunder>

//         </thunder>
       </tableheader>
       <tablecontent {...getTableBodyProps()}>
          {rows.slice(0, 10).map((row, i) => {
            prepareRow(row)
            return (
              <tableitem {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tableitem>
            )
          })}
        </tablecontent>
      </table>
      {/* <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
     <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds,
              'Выделенные строки': selectedFlatRows.map(
                d => d.original
              ),
            },
            null,
            2
          )}
        </code>
        </pre> */}
    </>

  )
}


const columns = [
      {
        Header: 'id',
        accessor: 'id',
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
          }    
    ];

    
    
export default class ReactTable1 extends React.Component {
  
  render()  {
    const { data, onSelect } = this.props
    return (
      <Table columns={columns} data={data} onSelect={onSelect} ></Table>
    );
  }
}

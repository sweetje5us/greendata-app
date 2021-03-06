import React, { useEffect } from 'react';
import { useTable, useRowSelect } from 'react-table'

// Добавляем Столбец с чекбоксами
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
// Взаимодействие с чекбоксами
const getSelectionColumns = (hooks) => {
  hooks.visibleColumns.push(columns => [
    // Let's make a column for selection
    {
      id: 'selection',
      // The header can use the table's getToggleAllRowsSelectedProps method
      // to render a checkbox
      Header: ({ getToggleAllRowsSelectedProps }) => (

        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />


      ),
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      Cell: ({ row }) => (


        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />



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
  //получаем Id выделенных строк
  useEffect(() => {
    const selectedIds = selectedFlatRows.reduce((acc, { original }) => ({
      ...acc,
      [original.id]: true
    }), {})
    onSelect(selectedIds)

  }, [selectedRowIds, selectedFlatRows, onSelect])

  return (
    <>
      <table className="maintable" {...getTableProps()}>
        <thead>

          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <>
                  <th {...column.getHeaderProps()}>{column.render('Header')}<div className="thline"></div></th>

                </>
              ))}

            </tr>
          ))}

          <tr className="thunder" />
        </thead>
        <tbody {...getTableBodyProps()}>

          {rows.map((row, i) => {
            prepareRow(row)
            return (


              <tr className="tableitem" id={i} {...row.getRowProps()}>
                {row.cells.map(cell => {

                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>


            )
          })}


        </tbody>
      </table>

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
    Header: 'Должность',
    accessor: 'position',
  },
  {
    Header: 'Дата рождения',
    accessor: 'bdate',
  },
  {
    Header: 'Пол',
    accessor: 'sex',
  },
  {
    Header: 'Дата приема',
    accessor: 'hdate',
  },
  {
    Header: 'Дата увольнения',
    accessor: 'fdate',
  },
  {
    Header: 'Права',
    accessor: 'drive_l',
  }
];



export default class ReactTable1 extends React.Component {

  render() {
    const { data, onSelect } = this.props
    return (
      <Table columns={columns} data={data} onSelect={onSelect} ></Table>
    );
  }
}



export const columns = [
  {
    accessor: "id",
    Header: "id",
    sort: true,
    isKey: true
  },
  {
    accessor: "name",
    Header: "Имя",
    sort: true
   
  },
  {
    accessor: "surname",
    Header: "Фамилия",
    sort: true
  },
  {
    accessor: "lastname",
    Header: "Отчество",
    sort: true
    
  },
  {
    accessor: "position",
    Header: "Должность",
    sort: true
  },
  {
    accessor: "bdate",
    Header: "Дата рождения",
    sort: true
    
  },
  {
    accessor: "sex",
    Header: "Пол",
    sort: true
    
  },
  {
    accessor: "fdate",
    Header: "Дата приема на работу",
    sort: true
   
  },
  {
    accessor: "hdate",
    Header: "Дата увольнения",
    sort: true
    
  },
  {
    accessor: "drive_l",
    Header: "Наличие прав",
    sort: true
   
  },
  {
    accessor: "selected",
    Header: "Selected",
    sort: true,
    hidden: true
  }
];

export const defaultSorted = [
  {
    dataField: "id",
    order: "asc"
  }
];

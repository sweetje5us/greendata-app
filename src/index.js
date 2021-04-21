import React, { Component } from "react";
import { render } from "react-dom";
import ReactDOM from 'react-dom';
import Modal from "react-modal";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form1, Form2 } from "./modal/Form";
import { Button } from "react-bootstrap";
import makedata from "./table/makeData"
import { columns, data } from "./table/const.js";
import "./index.css";
import ReactTable from "./table/ReactTable";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";




function getNewId() {
  let allItemsString = JSON.parse(localStorage.getItem("items"));
  let maxId = 0;
  allItemsString.forEach((element) => {
    if (element.id > maxId) {
      maxId = element.id;
    }
  });
  return ++maxId;
}

class App extends Component {
  state = {
    items: [],
    selectedIds: {},
    addModalIsOpen: false,
    editModalIsOpen: false

  };

  getItems = (props) => {
    let items;
    try {
      items = JSON.parse(localStorage.getItem("items"));
    } catch (e) {
      console.error(e.message);
    }

    if (!Array.isArray(items)) {
      items = [];
      localStorage.setItem("items", JSON.stringify(items));
    }
    this.setState({ items });
  };

  componentDidMount() {
    this.getItems();
  }

  openAddModal = () => {
    this.setState({ addModalIsOpen: true });
  };

  closeAddModal = () => {
    this.setState({ addModalIsOpen: false });

  };

  openEditModal = () => {
    const selectedIdsList = Object.keys(this.state.selectedIds).filter((key) => this.state.selectedIds[key]);
    const count = selectedIdsList.length;
    if (count > 1) {
      Swal.fire({
        icon: 'error',
        title: 'Ошибка!',
        text: 'Вы выбрали больше одной строки!',
      })
    }
    if (count === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Ошибка!',
        text: 'Вы не выбрали строку!',
      })
    }
    if (count === 1) {
      this.setState({ editModalIsOpen: true });
    }
  };

  getEditPerson = () => {
    const selectedIdsList = Object.keys(this.state.selectedIds).filter((key) => this.state.selectedIds[key])
    const editId = selectedIdsList[0]
    return this.state.items.find(({ id }) => String(id) === String(editId))
  }

  closeEditModal = () => {
    this.setState({ editModalIsOpen: false });

  };

  testGetValue = (value) => () => {
    this.setState({
      sex: value
    });
  };

  handleSubmit = (person) => (event) => {
    let rowArray = {
      ...person,
      drive_l: Boolean(person.drive_l) === true ? "Да" : "Нет",
      id: person.id ? person.id : getNewId()
    };
    let stroke = JSON.stringify(rowArray) + `]`;
    stroke =
      localStorage
        .getItem("items")
        .substring(0, localStorage.getItem("items").length - 1) + stroke;
    stroke = stroke.replace("}{", "},{");
    localStorage.setItem("items", stroke);
    Swal.fire(
      'Готово!',
      'Добавление прошло успешно.',
      'success'
    )
    this.closeAddModal();
    this.getItems();
    event.preventDefault(); //отмена действия браузера, т.е. обновления страницы
  };

  handleSubmitEdit = (person) => (event) => {
    Swal.fire({
      title: 'Вы уверены?',
      text: "Запись будет изменена!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Отмена',
      confirmButtonText: 'Да, изменить!'
    }).then((result) => {
      if (result.isConfirmed) {
    let rowArray = {
      ...person,
      drive_l: Boolean(person.drive_l) === true ? "Да" : "Нет",
    };
    let allitems = JSON.parse(localStorage.getItem("items"));
    let stroke = ({ id: this.state.selectedIds });
    allitems.forEach((item, index, array) => {
      if (allitems[index].id === JSON.parse(Object.keys(stroke.id))) {
        allitems[index] = rowArray;
      }
    });






    localStorage.setItem("items", JSON.stringify(allitems));
    Swal.fire(
      'Готово!',
      'Изменение прошло успешно.',
      'success'
    )
    this.getItems();
    this.closeEditModal();
  }}
  )
    
event.preventDefault(); //отмена действия браузера, т.е. обновления страницы
    
    
  };

  handleDelete = () => {
    
    Swal.fire({
      title: 'Вы уверены?',
      text: "Выбранные записи будут удалены!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Отмена',
      confirmButtonText: 'Да, удалить!'
    }).then((result) => {
      if (result.isConfirmed) {
        const allitems = this.state.items;
   
        const selectedIdsList = Object.keys(this.state.selectedIds).filter((key) => this.state.selectedIds[key])
        if (selectedIdsList.length!== 0){
        const clinedList = allitems.reduce((acc, person) => {
          if(!selectedIdsList.includes(String(person.id))) { 
          acc.push(person) 
          } 
          return acc 
      }, [])
      localStorage.setItem("items", JSON.stringify(clinedList));
    this.getItems();
        Swal.fire(
          'Готово!',
          'Удаление прошло успешно.',
          'success'
        )
      }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Ошибка!',
        text: 'Вы не выбрали строку для удаления!',
      })
    }}
    })
    

  };

  handleSelect = (selectedIds) => {
    this.setState({
      selectedIds,
    })

  }
  handleRandom = ()=>{
    Swal.fire({
      title: 'Вы уверены?',
      text: "Таблица будет очищена и заполнена случайными данными!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Отмена',
      confirmButtonText: 'Да, заполнить!'
    }).then((result) => {
      if (result.isConfirmed) {
localStorage.setItem("items",JSON.stringify(makedata(20)));
Swal.fire(
  'Готово!',
  'Добавлено 20 записей.',
  'success'
)
this.getItems();
  }
}
    )
}

  render() {

    return (
      <>
        <img class="logo" src="https://greendatasoft.ru/wp-content/uploads/2018/05/лого-1.png" alt="greendata logo">
        </img>
        <buttongroup>
          <Button className="btn-success greenbutton buttonadd" onClick={this.openAddModal}>
            Добавить
          </Button>
          <Button id="editb" className="btn-success greenbutton buttonedit" onClick={this.openEditModal}>
            Изменить
          </Button>
          <Button id="buttondelete" className="btn-danger redbutton buttondelete" onClick={this.handleDelete}>
            Удалить
          </Button>
          <Button id="buttonrandom" className="btn-warning buttonrandom" onClick={this.handleRandom}>
            Заполнить
          </Button>
        </buttongroup>
        <Modal
          className="modalcustom"
          isOpen={this.state.addModalIsOpen}
          onRequestClose={this.openAddModal}
          ariaHideApp={false}
        >
          <div>
            <Form1
              onSubmit={this.handleSubmit}
              onCancel={this.closeAddModal}
            />
          </div>
        </Modal>
        <Modal
          className="modalcustom"
          isOpen={this.state.editModalIsOpen}
          onRequestClose={this.openEditModal}
          ariaHideApp={false}
        >
          <div>
            <Form2
              onSubmit={this.handleSubmitEdit}
              onCancel={this.closeEditModal}
              // editPerson={this.state.selectedIds}
              editPerson={this.state.editModalIsOpen && this.getEditPerson()}
            />
          </div>
        </Modal>
        <ContextMenuTrigger id="same_unique_identifier">
        <ReactTable data={this.state.items} onSelect={this.handleSelect}>
        </ReactTable>
        
      </ContextMenuTrigger>

      <ContextMenu id="same_unique_identifier">
        <MenuItem data={{id: '1'}} onClick={this.openEditModal} >
          Изменить
        </MenuItem>
        <MenuItem data={{id: '2'}} onClick={this.handleDelete}>
          Удалить
        </MenuItem>
        <MenuItem data={{id: '2'}} onClick={this.Close}>
          Закрыть меню
        </MenuItem>
      </ContextMenu>
        <footer>
          <copyrights>
            © GreenData|2014-2021
      </copyrights>
          <author>
            Made by Brylove Eugene
      </author>
        </footer>
      </>


    );
  }
}
render(<App />, document.getElementById("root"));


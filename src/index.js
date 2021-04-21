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
      alert('Выберите только 1 запись');
    }
    if (count === 0) {
      alert('Выберите минимум 1 запись');
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
    this.closeAddModal();
    this.getItems();
    event.preventDefault(); //отмена действия браузера, т.е. обновления страницы
  };

  handleSubmitEdit = (person) => (event) => {
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
    this.closeEditModal();
    this.getItems();
    event.preventDefault(); //отмена действия браузера, т.е. обновления страницы
  };

  handleDelete = () => {
    const allitems = this.state.items;
   
    const selectedIdsList = Object.keys(this.state.selectedIds).filter((key) => this.state.selectedIds[key])
    const clinedList = allitems.reduce((acc, person) => {
    if(!selectedIdsList.includes(String(person.id))) { 
    acc.push(person) 
    } 
    return acc 
}, [])

    localStorage.setItem("items", JSON.stringify(clinedList));
    this.getItems();
  };

  handleSelect = (selectedIds) => {
    this.setState({
      selectedIds,
    })
  }
  handleRandom = ()=>{
localStorage.setItem("items",JSON.stringify(makedata(20)));
this.getItems();
  }







  render() {

    return (
      <>
        <img class="logo" src="https://greendatasoft.ru/wp-content/uploads/2018/05/лого-1.png" alt="greendata logo">
        </img>
        <buttongroup>
          <Button className="greenbutton buttonadd" onClick={this.openAddModal}>
            Add
          </Button>
          <Button id="editb" className="greenbutton buttonedit" onClick={this.openEditModal}>
            Edit
          </Button>
          <Button id="buttondelete" className="redbutton buttondelete" onClick={this.handleDelete}>
            Delete
          </Button>
          <Button id="buttonrandom" className="greenbutton buttonrandom" onClick={this.handleRandom}>
            Random data
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
        <ReactTable data={this.state.items} onSelect={this.handleSelect}>
        </ReactTable>
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


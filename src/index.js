import React, { Component } from "react";
import { render } from "react-dom";
import ReactDOM from 'react-dom';
import Modal from "react-modal";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./modal/Form";
import { Button } from "react-bootstrap";
import {columns, data} from "./table/const.js";
import "./index.css";
import ReactTable from "./table/ReactTable";


function unselectData() {
  const storageItems = localStorage.getItem("items");

  if (storageItems) {
    try {
      let allitems = JSON.parse(storageItems);
      if (Array.isArray(allitems)) {
        allitems.forEach((element) => {
          element.selected = false;
        });
        localStorage.setItem("items", JSON.stringify(allitems));
      }
    } catch (e) {
      console.error(e.message);
    }
  }
}
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
    items: []
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
      
      componentDidMount(props){
        unselectData();
        this.getItems();
      }
      openAddModal = () => {
        this.setState({ addModalIsOpen: true });
      };
      closeAddModal = () => {
        this.setState({ addModalIsOpen: false });
        unselectData();
      };
      openEditModal = () => {
        this.setState({ addModalIsOpen: true });
      };
      closeEditModal = () => {
        this.setState({ addModalIsOpen: false });
        unselectData();
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
          selected: Boolean(person.selected),
          id: person.id ? person.id : getNewId()
        };
    
        let stroke = JSON.stringify(rowArray) + `]`;
        console.log(stroke);
        stroke =
          localStorage
            .getItem("items")
            .substring(0, localStorage.getItem("items").length - 1) + stroke;
        stroke = stroke.replace("}{", "},{");
        localStorage.setItem("items", stroke);
        unselectData();
    
        this.closeAddModal();
        this.getItems();
        event.preventDefault(); //отмена действия браузера, т.е. обновления страницы
      };
      handleDelete = (event) => {
        Swal.fire({
          title: "Вы уверены?",
          text: "Записи будут удалены из таблицы!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Да, удалить запись!"
        }).then((result) => {
          if (result.isConfirmed) {
            let allitems = JSON.parse(localStorage.getItem("items"));
            var count = 0;
            allitems.slice(0).forEach((item, index, array) => {
              if (item.selected === true) {
                ++count;
                allitems.splice(allitems.indexOf(item), 1);
              }
    
              localStorage.setItem("items", JSON.stringify(allitems));
            });
    
            if (!allitems?.length) {
              // localStorage.setItem("items", allitems);
              this.setState({ deletedStroke: true });
              Swal.fire({
                icon: "success",
                title: "Успешно!",
                text: "Вы удалили все записи!"
              });
            } else {
              // localStorage.setItem("items", allitems);
              this.setState({ deletedStroke: true });
              Swal.fire(
                "Готово!",
                count + " строк были успешно удалены",
                "success"
              );
            }
    
            if (!count) {
              this.setState({ deletedStroke: false });
              Swal.fire({
                icon: "error",
                title: "Ошибка!",
                text: "Вы не выбрали строку для удаления!"
              });
            }
          }
          this.getItems();
        });
      };
      
 render(){
    return (
      <>
  <img class="logo" src="https://greendatasoft.ru/wp-content/uploads/2018/05/лого-1.png" alt="greendata logo">
    </img>
    <buttongroup>
    <Button className="greenbutton buttonadd" onClick={this.openAddModal}>
    Add
  </Button>
  <Button className="greenbutton buttonedit" onClick={this.openEditModal}>
    Edit
  </Button>
  <Button className="redbutton buttondelete" onClick={this.handleDelete}>
    Delete
  </Button></buttongroup>
  <Modal
            
          
          className="modalcustom"
            isOpen={this.state.addModalIsOpen}
            onRequestClose={this.openAddModal}
            ariaHideApp={false}
          >
            <div>
              <Form
                onSubmit={this.handleSubmit}
                onCancel={this.closeAddModal}
              />
            </div>
          </Modal>
          <ReactTable data={this.state.items}>
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
}}
render(<App />, document.getElementById("root"));


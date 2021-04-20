import React, { useCallback, useState, useEffect  } from "react";
import { Form, Button } from "react-bootstrap";



var today = new Date();
var firstday = "1900-01-01";

var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;



export const Form1 = (props) => {
    const { onSubmit, onCancel,  } = props;
    const [person, setPerson, editPerson ] = useState({
      id: "",
      name: "",
      surname: "",  
      lastname: "",
      position: "",
      bdate: "",
      sex: "",
      fdate: "",
      hdate: "",
      drive_l: ""
    });
    
    //получаем значение input'ов
    const handleChange = useCallback((event) => {
      setPerson((person) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
  
        const name = target.name;
  
        return {
          ...person,
          [name]: value
        };
      });
    }, []);
    //получаем значение radio
    const handleSex = useCallback((event) => {
      setPerson((person) => {
        return {
          ...person,
          sex: event.target.id === "male" ? "Мужчина" : "Женщина"
        };
      });
    }, []);
 
    return (
      <>
      <div class="allModal">
      <div class="modalheader">Режим добавления записи</div>
        
  <div class="modalcontent">
        <Form onSubmit={onSubmit(person)}>
          <Form.Group
            className="was-validated inputtext"
            noValidate
            controlId="formBasicName"
            
          >
            <Form.Label>
               Имя
            </Form.Label>
            <Form.Control
              name="name"
              type="text"
              required={true}
              value={person.name}
              onChange={handleChange}
              pattern="[A-Za-zА-Яа-яЁё]{2,20}"
            />
          </Form.Group>
          <Form.Group
            className="was-validated inputtext"
            noValidate
            controlId="formBasicSurName"
            
          >
            <Form.Label>
               Фамилия
            </Form.Label>
            <Form.Control
              name="surname"
              type="text"
              value={person.surname}
              onChange={handleChange}
              required={true}
              pattern="[A-Za-zА-Яа-яЁё]{2,30}"
            />
          </Form.Group>
          <Form.Group controlId="formBasicLastName" className="inputtext">
            <Form.Label>
              Отчество
            </Form.Label>
            <Form.Control
              type="text"
              
              name="lastname"
              value={person.lastname}
              onChange={handleChange}
              pattern="[A-Za-zА-Яа-яЁё]{2,30}"
            />
          </Form.Group>
          <Form.Group
            className="was-validated inputtext"
            noValidate
            controlId="formBasicPosition"
            
          >
            <Form.Label>
              Должность
            </Form.Label>
            <Form.Control
              as="select"
              name="position"
              value={person.position}
              onChange={handleChange}
              required={true}
            >
              <option defaultValue={true} hidden={true}></option>
              <option>Младший дворник</option>
              <option>Старший охранник</option>
              <option>Дизайнер</option>
              <option>Ведущий специалист</option>
              <option>Тамада</option>
            </Form.Control>
          </Form.Group>
          <Form.Group
            className="was-validated inputtext"
            noValidate
            controlId="formBasicBirthDate"
           
          >
            <Form.Label>
              Дата рождения
            </Form.Label>
            <Form.Control
              name="bdate"
              type="date"
              min={firstday}
              max={today}
              value={person.bdate}
              onChange={handleChange}
              required={true}
            />
          </Form.Group>
          <Form.Group
            controlId="formBasicDriverSex"
            className="was-validated inputtext"
            noValidate
            className="inputtext"
          >
            <Form.Label>
               Пол
            </Form.Label>
            {/* <MDBInput
              type="radio"
              id="female"
              name="radio-stacked"
              selected={person.sex === "Мужчина" ? true : false}
              onChange={handleSex}
              required
              label="Женщина"
              autoComplete="nope"
              style={{
                width: "12px",
                height: "12px",
                marginLeft: "-13px"
              }}
            />
            <MDBInput
              type="radio"
              id="male"
              name="radio-stacked"
              selected={person.sex === "Женщина" ? true : false}
              onChange={handleSex}
              required
              label="Мужчина"
              autoComplete="nope"
              style={{
                width: "12px",
                height: "12px",
                marginLeft: "-13px"
              }}
            /> */}
          </Form.Group>
  
          <Form.Group
            className="was-validated inputtext"
            noValidate
            controlId="formBasicFDate"
            
          >
            <Form.Label>
               Дата приема на работу
            </Form.Label>
            <Form.Control
              type="date"
              name="fdate"
              min={firstday}
              max={today}
              value={person.fdate}
              onChange={handleChange}
              required={true}
            />
          </Form.Group>
          <Form.Group controlId="formBasicHDate" className="inputtext">
              
            <Form.Label>
             Дата увольнения
            </Form.Label>
            <Form.Control
              type="date"
              name="hdate"
              
              min={person.fdate}
              max={today}
              value={person.hdate}
              disabled={!person.fdate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDriverLicence" className="inputtext">
            <Form.Check
              type="checkbox"
              name="drive_l"
              label="Наличие прав"
              checked={person.drive_l}
              onChange={handleChange}
              inline
            />
          </Form.Group>
          <Button className="addbutton" type="submit">
            Добавить
          </Button>
          <Button className="closebutton" type="button" onClick={onCancel}>
            Закрыть
          </Button>
        </Form>
        </div>
        </div>
      </>
    );
  };
  
  export const Form2 = (props) => {
    const { onSubmit, onCancel} = props;
    const [person, setPerson] = useState({ ...props.editPerson })
    useEffect(() => { setPerson({ ...props.editPerson }) }, [props.editPerson])

    //получаем значение input'ов
    const handleChange = useCallback((event) => {
      setPerson((person) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
  
        const name = target.name;
  
        return {
          ...person,
          [name]: value
        };
      });
    }, []);
    //получаем значение radio
    const handleSex = useCallback((event) => {
      setPerson((person) => {
        return {
          ...person,
          sex: event.target.id === "male" ? "Мужчина" : "Женщина"
        };
      });
    }, []);
    // console.log(props.editPerson);
    return (
      <>
      <div class="allModal">
      <div class="modalheader">Режим изменения записи</div>
  <div class="modalcontent">
        <Form onSubmit={onSubmit(person)}>
          <Form.Group
            className="was-validated inputtext"
            noValidate
            controlId="formBasicName"
            
          >
            <Form.Label>
               Имя
            </Form.Label>
            <Form.Control
              name="name"
              type="text"
              required={true}
              value={person.name}
             
              onChange={handleChange}
              pattern="[A-Za-zА-Яа-яЁё]{2,20}"
            />
          </Form.Group>
          <Form.Group
            className="was-validated inputtext"
            noValidate
            controlId="formBasicSurName"
            
          >
            <Form.Label>
               Фамилия
            </Form.Label>
            <Form.Control
              name="surname"
              type="text"
              value={person.surname}
              onChange={handleChange}
              required={true}
              pattern="[A-Za-zА-Яа-яЁё]{2,30}"
            />
          </Form.Group>
          <Form.Group controlId="formBasicLastName" className="inputtext">
            <Form.Label>
              Отчество
            </Form.Label>
            <Form.Control
              type="text"
              
              name="lastname"
              value={person.lastname}
              onChange={handleChange}
              pattern="[A-Za-zА-Яа-яЁё]{2,30}"
            />
          </Form.Group>
          <Form.Group
            className="was-validated inputtext"
            noValidate
            controlId="formBasicPosition"
            
          >
            <Form.Label>
              Должность
            </Form.Label>
            <Form.Control
              as="select"
              name="position"
              value={person.position}
              onChange={handleChange}
              required={true}
            >
              <option defaultValue={true} hidden={true}></option>
              <option>Младший дворник</option>
              <option>Старший охранник</option>
              <option>Дизайнер</option>
              <option>Ведущий специалист</option>
              <option>Тамада</option>
            </Form.Control>
          </Form.Group>
          <Form.Group
            className="was-validated inputtext"
            noValidate
            controlId="formBasicBirthDate"
           
          >
            <Form.Label>
              Дата рождения
            </Form.Label>
            <Form.Control
              name="bdate"
              type="date"
              min={firstday}
              max={today}
              value={person.bdate}
              onChange={handleChange}
              required={true}
            />
          </Form.Group>
          <Form.Group
            controlId="formBasicDriverSex"
            className="was-validated inputtext"
            noValidate
            className="inputtext"
          >
            <Form.Label>
               Пол
            </Form.Label>
            {/* <MDBInput
              type="radio"
              id="female"
              name="radio-stacked"
              selected={person.sex === "Мужчина" ? true : false}
              onChange={handleSex}
              required
              label="Женщина"
              autoComplete="nope"
              style={{
                width: "12px",
                height: "12px",
                marginLeft: "-13px"
              }}
            />
            <MDBInput
              type="radio"
              id="male"
              name="radio-stacked"
              selected={person.sex === "Женщина" ? true : false}
              onChange={handleSex}
              required
              label="Мужчина"
              autoComplete="nope"
              style={{
                width: "12px",
                height: "12px",
                marginLeft: "-13px"
              }}
            /> */}
          </Form.Group>
  
          <Form.Group
            className="was-validated inputtext"
            noValidate
            controlId="formBasicFDate"
            
          >
            <Form.Label>
               Дата приема на работу
            </Form.Label>
            <Form.Control
              type="date"
              name="fdate"
              min={firstday}
              max={today}
              value={person.fdate}
              onChange={handleChange}
              required={true}
            />
          </Form.Group>
          <Form.Group controlId="formBasicHDate" className="inputtext">
              
            <Form.Label>
             Дата увольнения
            </Form.Label>
            <Form.Control
              type="date"
              name="hdate"
              
              min={person.fdate}
              max={today}
              value={person.hdate}
              disabled={!person.fdate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDriverLicence" className="inputtext">
            <Form.Check
              type="checkbox"
              name="drive_l"
              label="Наличие прав"
              checked={person.drive_l}
              onChange={handleChange}
              inline
            />
          </Form.Group>
          <Button className="addbutton" type="submit" >
            Изменить
          </Button>
          <Button className="closebutton" type="button" onClick={onCancel}>
            Закрыть
          </Button>
        </Form>
        </div>
        </div>
      </>
    );
  };
import React, { useCallback, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Radio } from '@material-ui/core';
import { RadioGroup, FormControlLabel } from '@material-ui/core';

// Контроли datepicker'ов по датам
var today = new Date();
var firstday = "1900-01-01";
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;



export const Form1 = (props) => {
  const { onSubmit, onCancel, } = props;
  const [person, setPerson] = useState({
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
        sex: event.target.value === "Мужчина" ? "Мужчина" : "Женщина"
      };
    });
  }, []);

  return (
    <>
      <div className="allModal">
        <div className="modalheader">Режим добавления записи</div>
        <div className="modalcontent">
          <Form onSubmit={onSubmit(person)}>

            <Form.Group
              className="was-validated inputtext"
              noValidate
              controlId="formBasicName"
            >
              <Form.Label>
                Имя<mark>*</mark>
              </Form.Label>
              <Form.Control
                className="inputname"
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
                Фамилия<mark>*</mark>
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
                Должность<mark>*</mark>
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
                Дата рождения<mark>*</mark>
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
              noValidate
              className="was-validated inputtext"
            >
              <Form.Label>
                Пол<mark>*</mark>
              </Form.Label>
              <RadioGroup aria-label="gender" name="gender1">
                <FormControlLabel id="female" value="Женщина" control={<Radio color='primary' required />} label="Женщина" selected={person.sex === "Мужчина" ? true : false} onChange={handleSex} />
                <FormControlLabel id="male" value="Мужчина" control={<Radio color='primary' required />} label="Мужчина" selected={person.sex === "Женщина" ? true : false} onChange={handleSex} />
              </RadioGroup>
            </Form.Group>

            <Form.Group
              className="was-validated inputtext"
              noValidate
              controlId="formBasicFDate"
            >
              <Form.Label>
                Дата приема на работу<mark>*</mark>
              </Form.Label>
              <Form.Control
                type="date"
                name="hdate"
                min={firstday}
                max={today}
                value={person.hdate}
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
                name="fdate"

                min={person.hdate}
                max={today}
                value={person.fdate}
                disabled={!person.hdate}
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

          </Form>
          <Button className="btn-success addbutton" type="submit">
            Добавить
            </Button>
          <Button className="btn-danger closebutton" type="button" onClick={onCancel}>
            Закрыть
            </Button>
        </div>


      </div>
    </>
  );
};

export const Form2 = (props) => {
  const { onSubmit, onCancel } = props;
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
        sex: event.target.value === "Мужчина" ? "Мужчина" : "Женщина"
      };
    });
  }, []);
  return (
    <>
      <div className="allModal">
        <div className="modalheader">Режим изменения записи</div>
        <div className="modalcontent">
          <Form onSubmit={onSubmit(person)}>

            <Form.Group
              className="was-validated inputtext"
              noValidate
              controlId="formBasicName"

            >
              <Form.Label>
                Имя<mark>*</mark>
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
                Фамилия<mark>*</mark>
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
                Должность<mark>*</mark>
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
                Дата рождения<mark>*</mark>
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
            >
              <Form.Label>
                Пол<mark>*</mark>
              </Form.Label>
              <RadioGroup aria-label="gender" name="radio-buttons-group">
                <FormControlLabel id="female" value="Женщина" control={<Radio color='primary' required />} label="Женщина" checked={person.sex === "Женщина" ? true : false} onChange={handleSex} />
                <FormControlLabel id="male" value="Мужчина" control={<Radio color='primary' required />} label="Мужчина" checked={person.sex === "Мужчина" ? true : false} onChange={handleSex} />
              </RadioGroup>
            </Form.Group>

            <Form.Group
              className="was-validated inputtext"
              noValidate
              controlId="formBasicFDate"

            >
              <Form.Label>
                Дата приема на работу<mark>*</mark>
              </Form.Label>
              <Form.Control
                type="date"
                name="hdate"
                min={firstday}
                max={today}
                value={person.hdate}
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
                name="fdate"

                min={person.hdate}
                max={today}
                value={person.fdate}

                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDriverLicence" className="inputtext">
              <Form.Check
                type="checkbox"
                name="drive_l"
                label="Наличие прав"
                checked={person.drive_l === "Да" ? true : false}
                onChange={handleChange}
                inline
              />
            </Form.Group>

            <Button className="btn-success addbutton" type="submit" >
              Изменить
          </Button>
            <Button className="btn-danger closebutton" type="button" onClick={onCancel}>
              Закрыть
          </Button>

          </Form>
        </div>
      </div>
    </>
  );
};
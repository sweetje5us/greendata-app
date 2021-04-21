import namor from 'namor';

var id = 0;

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

// Генерация случайной даты внутри указанного диапазона + приведение к формату
function randomDate(start, end) {
  let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  let dd = String(date.getDate()).padStart(2, "0");
let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = date.getFullYear(); 
  return date=yyyy + "-" + mm + "-" + dd
}

const newPerson = () => {
  const sexChance = Math.random()
  const driveChance = Math.random()
  const fdateChance = Math.random()
  const positionChance = Math.random()
  id++;
  return {
    id: id,
    name: namor.generate({ words: 1, numbers: 0, saltLength: 0 }),
    surname: namor.generate({ words: 1, numbers: 0, saltLength: 0 }),
    lastname: namor.generate({ words: 1, numbers: 0, saltLength: 0 }),
    position: positionChance > 0.66
    ? 'Тамада'
    : positionChance > 0.33
    ? 'Дизайнер'
    : 'Старший охранник',
    bdate: randomDate(new Date(1950, 0, 1), new Date(2003,0,1)),
    sex: sexChance > 0.5
        ? 'Мужчина'
        : 'Женщина',
    hdate:randomDate(new Date(2000, 0, 1), new Date(2019,0,1)),
    fdate:fdateChance > 0.66
    ? randomDate(new Date(2019, 0, 1), new Date())
    : '',
    drive_l:driveChance > 0.5
    ? 'Да'
    : 'Нет',
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}

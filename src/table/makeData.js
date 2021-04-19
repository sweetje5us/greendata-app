// import namor from 'namor';

// const range = len => {
//   const arr = []
//   for (let i = 0; i < len; i++) {
//     arr.push(i)
//   }
//   return arr
// }

// // const newPerson = () => {
// //   const sexChance = Math.random()
// //   const driveChance = Math.random()
// //   return {
    
// //     name: namor.generate({ words: 1, numbers: 0, saltLength: 0 }),
// //     surname: namor.generate({ words: 1, numbers: 0, saltLength: 0 }),
// //     lastname: namor.generate({ words: 1, numbers: 0, saltLength: 0 }),
// //     position: namor.generate({ words: 1, numbers: 0, saltLength: 0 }),
// //     bdate: namor.generate({ words:0, numbers: 4, saltLength: 0 }) + "-"+ namor.generate({ words:0, numbers: 2, saltLength: 0 })+ "-"+ namor.generate({ words:0, numbers: 2, saltLength: 0 }),
// //     sex: sexChance > 0.66
// //         ? 'Мужчина'
// //         : 'Женщина',
// //     fdate:false,
// //     hdate:false,
// //     drive_l:driveChance > 0.66
// //     ? 'Да'
// //     : 'Нет',
// //     selected: "false",
// //   }
// // }

// export default function makeData(...lens) {
//   const makeDataLevel = (depth = 0) => {
//     const len = lens[depth]
//     return range(len).map(d => {
//       return {
//         ...newPerson(),
//         subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
//       }
//     })
//   }

//   return makeDataLevel()
// }

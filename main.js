function main() {


  // Функция рандом для получения рандомной позиции коней
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


  let map = [];

  // создаем шахматную доску 8 на 8 ячеек
  for (let row = 0; row < 8; row++) {
    map.push([]);
    for (let col = 0; col < 8; col++) {
      map[row].push( ( getRandomInt(10) === 1 ) ? 1 : 0 );
    }
  }

  // Оставляем для тестов. Если нужно - комментим цикл сверху 
  // и убираем коммент отсюда
  // map = [
  //   [0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  // ]

  let chessboard = document.getElementById('chessboard');
  let chessboardConstructor = ""

  const rows = map.length, cols = map[0].length;
  for (let row = 0; row < rows; row++) { // визуализируем шахматную доску
    // открываем строку таблицы
    chessboardConstructor += "<tr>";
    for (let col = 0; col < cols; col++) {
      if ( !(col % 2) === !(row % 2) ) {
        // заполняем ячейку коричневым цветом
        chessboardConstructor += 
          `<td style="background-color: #844e00">
            ${map[row][col] ? "K" : ""}
          </td>`;
      } else {
        // заполняем ячейку серым цветом
        chessboardConstructor += 
          `<td style="background-color: #a9a9a9">
            ${map[row][col] ? "K" : ""}
          </td>`;
      }
    }
    // закрываем строку таблицы
    chessboardConstructor += "</tr>";
  }
  
  // показываем шахматную доску с конями пользователю
  chessboard.innerHTML = chessboardConstructor;

  // Вызываем функцию проверки позиций коней и показываем результат
  document.getElementById("result").innerHTML = check(map)
}


function check(map) {
  const rows = map.length, cols = map[0].length;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if ( map[row][col] ) { 
        // Если найден конь на позиции ищем ему пару по его ходу в зависимости 
        // от его положения на доске (сверху, снизу, по центру и тд)

        if (row < 2 && col > 1 && col < 6) { // up
          if (row === 0) {
            if (map[row+1][col-2] || map[row+2][col-1] || 
                map[row+2][col+1] || map[row+1][col+2]) {
              return false
            }
          } else if (row === 1) {
            if (map[row+1][col-2] || map[row+2][col-1] || 
                map[row+2][col+1] || map[row+1][col+2] || 
                map[row-1][col-2] || map[row-1][col+2]) {
              return false
            }
          }
        }

        else if (row > 5 && col > 1 && col < 6) { // down
          if (row === 7) {
            if (map[row-1][col-2] || map[row-2][col-1] || 
                map[row-2][col+1] || map[row-1][col+2]) {
              return false
            }
          } else if (row === 6) {
            if (map[row+1][col-2] || map[row+1][col+2] || 
                map[row-2][col+1] || map[row-1][col+2] || 
                map[row-1][col-2] || map[row-2][col-1]) {
              return false
            }
          }
        }

        else if (col < 2 && row > 1 && row < 6) { // left
          if (col === 0) {
            if (map[row-1][col+2] || map[row-2][col+1] || 
                map[row+2][col+1] || map[row+1][col+2]) {
              return false
            }
          } else if (col === 1) {
            if (map[row-2][col-1] || map[row+2][col-1] || 
                map[row+2][col+1] || map[row+1][col+2] || 
                map[row-2][col+1] || map[row-1][col+2]) {
              return false
            }
          }
        }

        else if (col > 5 && row > 1 && row < 6) { // right
          if (col === 7) {
            if (map[row-1][col-2] || map[row-2][col-1] || 
                map[row+2][col-1] || map[row+1][col-2]) {
              return false
            }
          } else if (col === 6) {
            if (map[row-2][col-1] || map[row+2][col-1] || 
                map[row+2][col+1] || map[row+1][col-2] || 
                map[row-2][col+1] || map[row-1][col-2]) {
              return false
            }
          }
        }

        else if (row < 6 && row > 1 && col > 1 && col < 6) { // center
          if (map[row-1][col-2] || map[row-2][col-1] || 
              map[row-2][col+1] || map[row-1][col+2] || 
              map[row+1][col+2] || map[row+2][col+1] || 
              map[row+2][col-1] || map[row+1][col-2]) {
            return false
          }
        }

      }
    }
  }

  // Если не найдена была ни одна пара - возвращаем true
  return true
}
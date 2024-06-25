<script>
import api from '@/api.ts'
import { userData } from '@/stores/AuthStore.ts'

export default {
  mounted() {
    console.log('Component is mounted and ready')
    const grid = document.querySelector('.grid')
    let field = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const highscoreDisplay = document.querySelector('#highscore')
    const levelDisplay = document.querySelector('#level')
    const startButton = document.querySelector('#start-button')
    const displayWidth = 10
    let timerId
    let score = 0
    let highscore = 0
    let linesCleared = 0
    let level = 1
    let dataObj = []
    const colors = [
      'url(navy_block.png)',
      'url(green_block.png)',
      'url(purple_block.png)',
      'url(yellow_block.png)',
      'url(blue_block.png)',
      'url(peach_block.png)',
      'url(pink_block.png)'

    ]

    async function loadHighscore() {
      try {
        const response = await api.getData(userData.identifier)
        dataObj = response.data
        highscore = dataObj.highscore
        highscoreDisplay.innerHTML = 'Highscore:' + highscore
      } catch (error) {
        console.log(error, 'Fehler beim Laden der Nutzerdaten')
      }
    }

    loadHighscore()


//Tetrominos
    const lTetromino = [
      [1, displayWidth + 1, displayWidth * 2 + 1, 2],
      [displayWidth, displayWidth + 1, displayWidth + 2, displayWidth * 2 + 2],
      [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 2],
      [displayWidth, displayWidth * 2, displayWidth * 2 + 1, displayWidth * 2 + 2]
    ]

    const zTetromino = [
      [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
      [displayWidth + 1, displayWidth + 2, displayWidth * 2, displayWidth * 2 + 1],
      [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
      [displayWidth + 1, displayWidth + 2, displayWidth * 2, displayWidth * 2 + 1]
    ]

    const tTetromino = [
      [1, displayWidth, displayWidth + 1, displayWidth + 2],
      [1, displayWidth + 1, displayWidth + 2, displayWidth * 2 + 1],
      [displayWidth, displayWidth + 1, displayWidth + 2, displayWidth * 2 + 1],
      [1, displayWidth, displayWidth + 1, displayWidth * 2 + 1]
    ]

    const oTetromino = [
      [0, 1, displayWidth, displayWidth + 1],
      [0, 1, displayWidth, displayWidth + 1],
      [0, 1, displayWidth, displayWidth + 1],
      [0, 1, displayWidth, displayWidth + 1]
    ]

    const iTetromino = [
      [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
      [displayWidth, displayWidth + 1, displayWidth + 2, displayWidth + 3],
      [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
      [displayWidth, displayWidth + 1, displayWidth + 2, displayWidth + 3]
    ]

    const jTetromino = [
      [0, 1, displayWidth + 1, displayWidth * 2 + 1],
      [displayWidth * 2, displayWidth * 2 + 1, displayWidth * 2 + 2, displayWidth + 2],
      [0, displayWidth, displayWidth * 2, displayWidth * 2 + 1],
      [0, 1, 2, displayWidth]
    ]

    const sTetromino = [
      [displayWidth, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 2 + 2],
      [displayWidth * 2, displayWidth, displayWidth + 1, 1],
      [displayWidth, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 2 + 2],
      [displayWidth * 2, displayWidth, displayWidth + 1, 1]
    ]

    const tetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino, jTetromino, sTetromino]

    let currentPosition = 4
    let currentRotation = 0
    let nextRandom = 0

//Wählt einen zufälligen Tetromino unrotiert aus
    let random = Math.floor(Math.random() * tetrominos.length)
    let tetromino = tetrominos[random][currentRotation]

    //Zieht ein Tetromino
    function draw() {
      tetromino.forEach(square => {
        let currentSquare = field[currentPosition + square]
        currentSquare.classList.add('tetromino')
        currentSquare.style.backgroundImage = colors[random]
      })
    }

    //Löscht ein Tetromino
    function undraw() {
      tetromino.forEach(square => {
        field[currentPosition + square].classList.remove('tetromino')
        field[currentPosition + square].style.backgroundImage = 'none'
      })
    }

    //Deklariert die Steuerung
    function control(e) {
      if (e.keyCode === 65 && (timerId) || e.keyCode === 37 && (timerId)) {
        moveLeft()
      } else if (e.keyCode === 68 && (timerId) || e.keyCode === 39 && (timerId)) {
        moveRight()
      } else if (e.keyCode === 83 && (timerId) || e.keyCode === 40 && (timerId)) {
        moveDown()
      } else if (e.keyCode === 87 && (timerId) || e.keyCode === 38 && (timerId)) {
        rotate()
      } else if (e.keyCode === 16 && (timerId) || e.keyCode === 86 && (timerId)) {
        instantDrop()
      }
    }

    document.addEventListener('keydown', control)

    //Logik für das Runterfallen des Tetrominos
    function moveDown() {
      if (!tetromino.some(square => field[currentPosition + square + displayWidth].classList.contains('taken'))) {
        undraw()
        currentPosition += displayWidth
        draw()
        createGhost()
      } else {
        freeze()
      }
    }

//Lässt das Tetromino einfrieren, wenn es den Boden oder ein anderes Tetromino trifft
    function freeze() {
      tetromino.forEach(square => {
        let currentSquare = field[currentPosition + square]
        currentSquare.classList.add('taken', 'tetromino')
        currentSquare.classList.remove('ghost')
        currentSquare.style.backgroundImage = colors[random]
      })
      //Lässt das nächste Tetromino fallen
      random = nextRandom
      nextRandom = Math.floor(Math.random() * tetrominos.length)
      tetromino = tetrominos[random][currentRotation]
      currentPosition = 4
      addScore()
      draw()
      displayShape()
      gameOver()
    }

// Funktion, um das Tetromino sofort nach unten zu bewegen
    function instantDrop() {
      while (!tetromino.some(square => field[currentPosition + square + displayWidth].classList.contains('taken'))) {
        undraw()
        currentPosition += displayWidth
        draw()
      }
      freeze()
    }

//Lässt das Tetromino nach links bewegen, es sei denn ein Block oder das Ende des Spielfeldes ist im Weg
    function moveLeft() {
      undraw()
      const isAtLeftEdge = tetromino.some(square => (currentPosition + square) % displayWidth === 0)

      if (!isAtLeftEdge) currentPosition -= 1

      if (tetromino.some(square => field[currentPosition + square].classList.contains('taken'))) {
        currentPosition += 1
      }
      createGhost()
      draw()

    }

//Lässt das Tetromino nach rechts bewegen, es sei denn ein Block oder das Ende des Spielfeldes ist im Weg
    function moveRight() {
      undraw()
      const isAtRightEdge = tetromino.some(square => (currentPosition + square) % displayWidth === displayWidth - 1)

      if (!isAtRightEdge) currentPosition += 1

      if (tetromino.some(square => field[currentPosition + square].classList.contains('taken'))) {
        currentPosition -= 1
      }
      createGhost()
      draw()

    }

//Lässt das Tetromino rotieren
    function rotate() {

      const isAtLeftEdge = tetromino.some(square => (currentPosition + square) % displayWidth === 0)
      const isAtRightEdge = tetromino.some(square => (currentPosition + square) % displayWidth === (displayWidth - 1))

      if (!(isAtLeftEdge | isAtRightEdge)) {
        undraw()
        currentRotation++
        if (currentRotation === tetromino.length) {
          currentRotation = 0
        }
        tetromino = tetrominos[random][currentRotation]
      }
      createGhost()
      draw()

    }

    // Erstellt eine Kopie des aktuellen Tetrominos, der nach unten fällt
    function createGhost() {
      field.forEach(square => {
        if (square.classList.contains('ghost')) {
          square.classList.remove('ghost')
          square.style.backgroundImage = 'none'
        }
      })

      let ghostTetromino = tetromino.slice()

      let ghostPosition = currentPosition
      while (!ghostTetromino.some(square => field[ghostPosition + square + displayWidth].classList.contains('taken'))) {
        ghostPosition += displayWidth
      }

      ghostTetromino.forEach(square => {
        field[ghostPosition + square].classList.add('ghost')
        field[ghostPosition + square].style.backgroundImage = colors[random]
      })
    }

//Logik für das nächste Tetromino in der Box neben dem Spielfeld anzeigen
    const displaySquares = document.querySelectorAll('.next-Tetromino-Grid div')
    const displayNextWidth = 4
    const displayIndex = 0

//Liste mit Tetrominos die als nächstes rankommen können (unrotiert)
    const upNextTetrominos = [
      [1, displayNextWidth + 1, displayNextWidth * 2 + 1, 2], //l Tetromino
      [0, displayNextWidth, displayNextWidth + 1, displayNextWidth * 2 + 1], //z Tetromino
      [1, displayNextWidth, displayNextWidth + 1, displayNextWidth + 2],//t Tetromino
      [0, 1, displayNextWidth, displayNextWidth + 1],//o Tetromino
      [1, displayNextWidth + 1, displayNextWidth * 2 + 1, displayNextWidth * 3 + 1],//i Tetromino
      [0, 1, displayNextWidth + 1, displayNextWidth * 2 + 1],//j Tetromino
      [displayNextWidth * 2, displayNextWidth, displayNextWidth + 1, 1]//s Tetromino
    ]

//Zeigt das nächste Tetromino in der Box neben dem Spielfeld an
    function displayShape() {
      displaySquares.forEach(square => {
        square.classList.remove('tetromino')
        square.style.backgroundImage = 'none'
      })
      upNextTetrominos[nextRandom].forEach(square => {
        displaySquares[displayIndex + square].classList.add('tetromino')
        displaySquares[displayIndex + square].style.backgroundImage = colors[nextRandom]
      })
    }

    var audio = new Audio('tetris_theme.mp3')
    audio.loop = true
    audio.volume = 0.05

//Startet oder pausiert das Spiel
    startButton.addEventListener('click', () => {
      if (timerId) {
        clearInterval(timerId)
        timerId = null
        audio.pause()
      } else {
        draw()
        timerId = setInterval(moveDown, 1100 - level * 100)
        nextRandom = Math.floor(Math.random() * tetrominos.length)
        displayShape()
        audio.play()
      }
    })


//Wenn eine ganze Reihe gefüllt ist, verschwindet diese und der Score wird erhöht
    function addScore() {
      let rowsCleared = 0
      for (let i = 0; i < 199; i += displayWidth) {
        const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]

        if (row.every(square => field[square].classList.contains('taken'))) {
          rowsCleared++
          linesCleared++
          row.forEach(square => {
            field[square].classList.remove('taken')
            field[square].classList.remove('tetromino')
            field[square].style.backgroundImage = 'none'
          })
          const squaresRemoved = field.splice(i, displayWidth)
          field = squaresRemoved.concat(field)
          field.forEach(cell => grid.appendChild(cell))
        }
      }

      let multiplier
      switch (rowsCleared) {
        case 1:
          multiplier = 1
          break
        case 2:
          multiplier = 3
          break
        case 3:
          multiplier = 5
          break
        case 4:
          multiplier = 8
          break
        default:
          multiplier = 0
      }

      score += 100 * multiplier * level
      scoreDisplay.innerHTML = 'Score:' + score
      levelDisplay.innerHTML = 'Level:' + level

      if (linesCleared >= 10) {
        level++
        linesCleared = 0
      }
    }

//Game Over Bildschirm
    function gameOver() {
      if (tetromino.some(square => field[currentPosition + square].classList.contains('taken'))) {
        if (score > highscore) {
          highscore = score
          try {
            api.newHighscore(userData.identifier, highscore)
              .then(response => {
                console.log(response.data)
              })
          } catch (error) {
            console.log(error, 'Fehler beim Laden der Nutzerdaten')
          }
          highscoreDisplay.innerHTML = 'Highscore:' + highscore
        }
        audio.pause();
        clearInterval(timerId);
        alert('Game Over')
      }
    }
  },
}
</script>
<template>
  <button id='start-button'>Start/Pause</button>

  <!-- Spielfeld -->
  <div class='container'>
    <div class='grid'>
      <!-- TODO: Die ganzen div Elemente später durch einen Loop ersetzen -->
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div class='taken'></div>
      <div class='taken'></div>
      <div class='taken'></div>
      <div class='taken'></div>
      <div class='taken'></div>
      <div class='taken'></div>
      <div class='taken'></div>
      <div class='taken'></div>
      <div class='taken'></div>
      <div class='taken'></div>
    </div>
    <div class='info'>
      <div class='numbers'>
        <p id="highscore">Highscore:<span id="highscore">0</span></p>
        <p id="score">Score:<span id="score">0</span></p>
        <p id="level">Level:<span id="level">1</span></p>
      </div>
      <div class='next'>
        <p>Next:</p>
        <div class='next-Tetromino-Grid'>
          <!-- TODO: Die ganzen div Elemente später durch einen Loop ersetzen -->
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

.tetromino.ghost {
  opacity: 100;
}

.numbers {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background-color: #0d1117;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 10px;
}

.info {
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  font-size: 25px;
  color: white;
}

.info p {
  margin: 5px;
}

.tetromino {
  background-size: cover;
}

.ghost {
  z-index: 1;
  opacity: 0.3;
  background-size: cover;
}

.container {
  margin-top: 5vh;
  display: flex;
  justify-content: center; /* horizontal zentrieren */
  align-items: flex-start /* vertikal zentrieren */

}

.grid {
  width: 300px;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  background-color: #0d1117;
  border: 1px solid #30363d;
  border-radius: 10px;
}

.grid div {
  width: 30px;
  height: 30px;

}

.next {
  margin-top: 20px;
  margin-left: 30px;
}

.next p {

  margin-bottom: 15px;
}

.next-Tetromino-Grid {
  width: 120px;
  height: 120px;
  display: flex;
  flex-wrap: wrap;
}

.next-Tetromino-Grid div {
  width: 30px;
  height: 30px;
}

#start-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #19751d;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
}

#start-button:hover {
  background-color: #45a049;
}
</style>
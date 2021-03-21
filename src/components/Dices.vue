<template>
  <div class="dices-container">
    <div class="dices">
      <dice-object ref="diceObject" :color="entity[1]" :piece="entity[0]" />
    </div>

    <div class="buttons">
      <div class="button black-button" @click="roll()">Roll</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue"
import DiceObject from "./DiceObject.vue"

export default defineComponent({
  name: "Dices",
  components: {
    DiceObject,
  },
  setup: () => {
    const diceObject = ref(null)

    const indices: Array<number> = Array.from({ length: 6 }, (_, i) => i + 1)

    const entity = ref<Array<string>>([])

    const squareColor = ref<string>("")

    const entities: Record<number, string> = {
      1: "pawn",
      2: "knight",
      3: "bishop",
      4: "rook",
      5: "queen",
      6: "king",
    }

    let lastPiece = ""

    const rotateValue = ref(0)

    const rollLogic = () => {
      const index = Math.floor(Math.random() * 6)
      const entityKey = indices[index]
      const piece = entities[entityKey]
      if (piece === lastPiece) {
        rollLogic()
        return
      }

      squareColor.value = ""

      entity.value = []

      entity.value.push(piece)
      lastPiece = piece

      if (piece === "bishop") {
        const index = Math.floor(Math.random() * 3)
        if (index === 1) {
          entity.value.push("white")
          return
        }
        if (index === 2) {
          entity.value.push("black")
          return
        }
      }
      entity.value.push("white")
    }

    let pieceUpdatedCount = 0

    const roll = async () => {
      pieceUpdatedCount = 0
      rotateValue.value = 0
      const counter = setInterval(() => {
        if (pieceUpdatedCount < 6) {
          rollLogic()
          rotateValue.value = rotateValue.value + 60
          pieceUpdatedCount += 1
        } else {
          clearInterval(counter)
        }
      }, 100)
    }

    onMounted(() => {
      roll()
    })

    return {
      diceObject,
      indices,
      entity,
      squareColor,
      entities,
      roll,
      rollLogic,
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dices {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;

  .button {
    height: 100px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;

    &.white-button {
      background: white;
      color: rgba(0, 0, 0, 0.8);
    }

    &.black-button {
      background: black;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>

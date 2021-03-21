<template>
  <div class="dices-container">
    <div>
      <div :class="[piece, color, 'square']"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue"

export default defineComponent({
  name: "DiceObject",
  props: {
    piece: {
      type: String,
    },
    color: {
      type: String,
      default: "white",
    },
  },
  setup: () => {
    const isBeingAnimated = ref<boolean>(false)

    return {
      isBeingAnimated,
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.square {
  width: 200px;
  height: 200px;
  transition: transform 0.2s ease-in-out;

  &.animate {
    transform: scale(1.05);
  }
}

.black-square {
  background: rgba(0, 0, 0, 0.7);
}

.white-square {
  background: rgba(255, 255, 255, 0.7);
}
</style>

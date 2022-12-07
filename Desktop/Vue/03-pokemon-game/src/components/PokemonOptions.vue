<template>
    <div class="options-container">
      <ul>
        <li v-for="pokemon in pokemons" 
              :key="pokemon.id"
              @click="$emit( 'selection', pokemon.id )">
          {{ pokemon.name }}
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  props: {
    pokemons: {
      type: Array,
      required: true
    }
  },
  methods: {
    
  },
}
</script>

<style scoped>
/* Pokemon Options */
ul {
  list-style-type: none;
}
li {
  background-color: rgba(80, 216, 157, 0.81);
  border-radius: 5px;
  border: 1px solid none;
  cursor: pointer;
  margin-bottom: 15px;
  width: 250px;
  padding: 10px;
  transition: 0.6s;
  font-size: 20px;
}

li:hover {
  background-color: rgba(71, 194, 140, 0.483);
  transform: scale(1.1);
}

.options-container {
  display: flex;
  justify-content: center;
}

</style>
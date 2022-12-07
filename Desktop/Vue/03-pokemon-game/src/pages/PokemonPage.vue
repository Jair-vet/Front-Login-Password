<template>
    <h1 v-if="!pokemon">Espere por favor...</h1>

    <div v-else>
        <h1>¿Quién es este Pokémon?</h1>
        
        <PokemonPicture 
            :pokemonId="pokemon.id" 
            :showPokemon="showPokemon"/>

        <PokemonOptions 
            :pokemons="pokemonArr"
            @selection="checkAnswer"/>

        <template v-if="showAnswer">
            <h2 v-if="messageError" class="fade-in error-message">{{ message }}</h2>
            <h2 v-if="messageRight" class="fade-in right-message">{{ message }}</h2>
            <button @click="newGame" class="btn">Nuevo Juego</button>
        </template>
    </div>

</template>

<script>
import PokemonPicture from '../components/PokemonPicture.vue'
import PokemonOptions from '../components/PokemonOptions.vue'

import getPokemonsOptions from '@/helpers/getPokemonOptions'


export default {
    components: { PokemonPicture, PokemonOptions },
    data() {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: '',
            messageError: false,
            messageRight: false,
        }
    },
    methods: {
        async mixPokemonArray() {
            this.pokemonArr = await getPokemonsOptions()

            const rndInt = Math.floor( Math.random() * 4 )
            this.pokemon = this.pokemonArr[ rndInt ]
        },
        checkAnswer( selectedId ) {
            this.showPokemon = true
            this.showAnswer = true

            if( selectedId === this.pokemon.id ){
                this.messageRight = true
                this.message = `${ this.pokemon.name } es Correcto`
                this.messageError = false
            } else {
                this.messageError = true
                this.message = `Error el Pokemon era ${ this.pokemon.name }`
                this.messageRight = false
            }
        },
        newGame(){

            this.showPokemon  = false,
            this.showAnswer   = false,
            this.pokemon      = null
            this.pokemonArr   = [],
            this.mixPokemonArray()

        }
    },
    mounted() {
        this.mixPokemonArray()
    },
}
</script>

<style scoped>
/* Pokemon */
.right-message {
    color: #72e668;
    margin-left: 10%;
}
.error-message {
    color: #ed2323b4;
    margin-left: 10%;
}

.btn {
    cursor: pointer;
    display: inline-block;
    background: rgba(80, 216, 157, 0.81);
    padding: 15px;
    font-family: inherit;
    font-size: 16px;
    border: 0;
    border-radius: 5px;
    color: #fff;
    transition: 0.6s;
    margin-left: 10%;
}
.btn:focus {
    outline: 0;
}

.btn:hover {
    transform: scale(1.3);
}


</style>
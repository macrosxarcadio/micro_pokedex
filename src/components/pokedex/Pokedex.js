import './Pokedex.css'
import Finder from '../finder/Finder'
import Pokecard, { accPokemon } from '../pokecard/Pokecard'
import {pokeData} from '../finder/Finder'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

const Pokedex = () => {
    const [pokemonData] = useAtom(pokeData);
    const [selectedPokemons] = useAtom(accPokemon);
    const [pokemonToSelect, setPokemonToSelect] = useState([]);
    const [pokemonSelected, setPokemonSelected] =useState([]);
    useEffect(() => {
        setPokemonToSelect(pokemonData.map((pokemon,index) => index < 5 && <Pokecard title={`${pokemon.name}`} id={pokemon.id} height={pokemon.height} weight={pokemon.weight} abilities={pokemon.abilities} remove={false}/>));
        setPokemonSelected(selectedPokemons.map((pokemon,index) => index < 5 && <Pokecard title={`${pokemon.name}`} id={pokemon.id} height={pokemon.height} weight={pokemon.weight} abilities={pokemon.abilities} remove={true}/>));
    },[pokemonData, selectedPokemons]);    

    return (
        <div className="gridView">
            <div className="search">
               <Finder />
            </div>
            <div className="result gridSearch">
                {pokemonToSelect}               
            </div>
            <div className="accumulator">
                {pokemonSelected}
            </div>
        </div>
    )
}

export default Pokedex
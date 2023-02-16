import { useEffect, useState } from 'react'
import {Input, Tag} from 'antd'
import './Finder.css'
import { atom, useAtom } from 'jotai'
import apiReq from '../../utils/apiReq'
const { Search } = Input
export const pokeData = atom([]);

const Finder = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemonData, setPokemon] = useAtom(pokeData);
    const [load, setLoad] = useState(false);
    const [searchType, setSearchType] = useState([]);
    const [reqTypeList, reqPokemon, reqPokemonList] = apiReq();

    useEffect (() => {
      reqTypeList(setSearchType, setLoad);
    }, []); 

    useEffect (()=> {
      const whaitForclient = setTimeout(() => {
        const pokemon = searchTerm;
        pokemon && reqPokemon(pokemon, setPokemon, setLoad);
        pokemon && reqPokemonList(pokemon, setPokemon, setLoad);
      } ,1000);
      return (() => clearTimeout(whaitForclient));
    },[searchTerm])

    const searchTag = (e) => {
      setSearchTerm(e.target.textContent);
    }

    return (
        <div className='pokeSearch'>
        <Search placeholder='Catch them all'  className='search' onChange={(search) => {setSearchTerm(search.target.value) }
        } value={searchTerm} loading={load}/>
        {searchType && searchType.map((type) => <Tag className='type-tag'  onClick={searchTag}  >{type.name}</Tag>)}
        </div>
    )
}

export default Finder
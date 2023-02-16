const apiReq = () =>  {

    const reqTypeList = async function (set,load) {
        load(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/type/`);
                if (response.ok === true) {
                    let data = await response.json();
                    set(data.results);
                }
                load(false);
            } catch (err){
                alert(err);
                load(false);
            }
    }
    
    const reqPokemon = async function (pokemon, set, load) {
        try {
            load(true);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
            if (response.ok === true) {
                let data = await response.json();
                set(prevList => 
                    prevList.length <= 5 ? 
                    ([
                        ...prevList,
                        {name:data.name.toUpperCase(),
                         id:data.id,
                         height:data.height,
                         weight:data.weight,
                         abilities: data.abilities?.map(pokemon => pokemon.ability.name)
                        },
                    ]):([
                            {
                                name:data.name,
                                id:data.id,
                                height:data.height,
                                weight:data.weight
                            },
                    ])
            )
            }
            load(false);
        } catch (err){
            load(false);
            alert(err);
        }
    }

    const reqPokemonList = async function (type, set, load) {
    try {
        load(true);
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        if (response.ok === true) {
        let data = await response.json();
        data.pokemon.forEach( (unit,index) => {
            index <5 && reqPokemon(unit.pokemon.name, set, load) });
        }
        } catch (err) {
        alert(err);
        }
}
return [reqTypeList ,reqPokemon, reqPokemonList]
}

export default apiReq

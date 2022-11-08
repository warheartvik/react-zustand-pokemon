import './App.css';
import create from "zustand"
import { useEffect } from 'react';

const POKEMON_URL = "https://gist.githubusercontent.com/jherr/23ae3f96cf5ac341c98cd9aa164d2fe3/raw/f8d792f5b2cf97eaaf9f0c2119918f333e348823/pokemon.json"

const useStore = create((set) => ({
  filter: "",
  pokemons: [],
  setFilter: (filter) => set((state) => ({
    ...state,
    filter
  })),
  setPokemon: (pokemons) => set((state) => ({
    ...state,
    pokemons
  }))
}))

const FilterInput = () => {
  const filter = useStore((state) => state.filter)
  const setFilter = useStore((state) => state.setFilter)
  return (
    <input value={filter} onChange={(evt) => setFilter(evt.target.value)}></input>
  )
}

const PokemonTable = () => {
  const pokemons = useStore((state) => state.pokemons)
  const filter = useStore((state) => state.filter)
  return (
    <table width="100%">
      <tbody>
        {
          pokemons
            .filter(({ name: { english } }) => english.toLowerCase().includes(filter.toLowerCase()))
            .map(({ id, name: { english }, type }) => (
              <tr key={id}>
                <td>{english}</td>
                <td>{type.join(",  ")}</td>
              </tr>
            ))
        }
      </tbody>
    </table>
  )
}
function App() {
  const setPokemon = useStore((state) => state.setPokemon)
  useEffect(() => {
    fetch(POKEMON_URL)
      .then(res => res.json())
      .then(pokemons => setPokemon(pokemons))
  })
  return (
    <div className="App">
      <div>
        <FilterInput></FilterInput>
      </div>
      <div>
        <PokemonTable></PokemonTable>
      </div>

    </div>
  );
}

export default App;

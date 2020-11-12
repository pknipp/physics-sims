import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import PokemonDetail from './PokemonDetail';
import LogoutButton from './LogoutButton';

const PokemonBrowser = ({ pokemon }) => {
  return (!pokemon) ? null : (
    <main>
      <LogoutButton />
      <nav>
        {pokemon.map(pokemon => (
            <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
              <div className="nav-entry">
                <div className="nav-entry-image"
                  style={{ backgroundImage: `url('${pokemon.imageUrl}')` }}></div>
                <h1>{pokemon.name}</h1>
              </div>
            </NavLink>
          )
        )}
      </nav>
      <Route path="/pokemon/:id" component={PokemonDetail} />
    </main>
  );
}

export default PokemonBrowser;

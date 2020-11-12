import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import LoginPanel from './LoginPanel';
import PokemonBrowser from './PokemonBrowser';
import { PrivateRoute } from './routesUtil';

const App = props => {
  const authToken = Cookies.get("token");
  let currentUserIdFromToken;
  if (authToken) {
    try {
      currentUserIdFromToken = JSON.parse(atob(authToken.split(".")[1])).data.id;
    } catch (e) {
      Cookies.remove("token");
    }
  }
  const [loaded, setLoaded] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(currentUserIdFromToken);
  const [needLogin, setNeedLogin] = useState(!currentUserIdFromToken);
  const [pokemon, setPokemon] = useState([]);

  const handleCreated = newPokemon => setPokemon([...pokemon, newPokemon]);

  useEffect(() => {(async () => {
    const response = await fetch(`/api/pokemon`);
    setLoaded(true);
    const ok = response.ok;
    setNeedLogin(!ok);
    if (ok) setPokemon(await response.json());
  })()}, [])

  const updateUser = currentUserId => {
    setNeedLogin(false);
    setCurrentUserId(currentUserId);
  //  loadPokemon();
  }

  const cProps = { pokemon, handleCreated, currentUserId };

  return (!loaded) ? null : (
    <BrowserRouter>
      <Switch>
        <Route path="/login"
          render={props => <LoginPanel {...props} updateUser={updateUser} />} />
        <PrivateRoute path="/" exact={true} needLogin={needLogin} component={PokemonBrowser} cProps={cProps} />
        <PrivateRoute path="/pokemon/:pokemonId" exact={true} needLogin={needLogin} component={PokemonBrowser} cProps={cProps} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;

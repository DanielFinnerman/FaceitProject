import React, { useState } from 'react';
import { Button, Card, Form, Image } from 'semantic-ui-react'

const API_KEY = process.env.REACT_APP_API_KEY;

const apiUrl = 'https://open.faceit.com/data/v4/players?nickname=';

const Stats = () => {

  const [isFetched, setFetched] = useState(false);
  const [nick, setNick] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [playerElo, setElo] = useState('');
  const [playerLvl, setLvl] = useState('');
  const [kdRatio, setKD] = useState('');
  const [wlRatio, setWL] = useState('');
  const [steamId, setSteamId] = useState('');
  const [playerCountry, setCountry] = useState('');
  const [faceitLink, setFaceitLink] = useState('');


  const [userInput, setInput] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getData();
      setFetched(true);
    }
  }

  const getData = async () => {
    
  
  const response = await fetch(apiUrl + userInput, {
    headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer ' + API_KEY
    }
  });

  if (response.status === 404) {
    setError('Could not fetch requested user, check spelling');
  } else {
    setError(null)

  const data = await response.json();
  const id = data.player_id;
  //console.log(data);
  setNick(data.nickname);
  setImgSrc(data.avatar);
  setElo(data.games.csgo.faceit_elo);
  setLvl('https://faceitfinder.com/resources/ranks/skill_level_' + data.games.csgo.skill_level + '_lg.png');
  setSteamId('https://steamcommunity.com/profiles/' + data.steam_id_64);
  setCountry('https://faceitfinder.com/resources/flags/svg/' + data.country +'.svg');
  setFaceitLink('https://www.faceit.com/en/players/' + data.nickname);


  const response2 = await fetch('https://open.faceit.com/data/v4/players/' + id + '/stats/csgo', {
    headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer ' + API_KEY
    }
  });

  const data2 = await response2.json();

  let kd_ratio = data2.lifetime['Average K/D Ratio'];
  let wl_ratio = data2.lifetime['Win Rate %'];

  setKD(kd_ratio);
  setWL(wl_ratio);
  
}
  }
  
return(
  <div>
    <h1> Search for Faceit user </h1>
    <div>
    <Form width= "2px" inverted onSubmit={handleSubmit}>
    <div className="ui action input fluid">
      <input 
      type = "text"
      required
      value = {userInput}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder='Search...'
      />
    <Button icon='search' color="orange"
    onClick={() => { getData(); setFetched(true);}}>
    </Button>
    </div>
  </Form>
    </div>
    { error ? ( 
      <div><h2>{ error }</h2></div>) : (<div>{isFetched ? (
        <Card className="segment centered" color='orange' style={{marginTop: 30}}>
        <Image src={imgSrc} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{nick}
          <Image
          floated='right'
          size='mini'
          src={playerCountry}
        />
        <Image
        floated='right'
        size='mini'
        src={playerLvl}
        />
      </Card.Header>
          <Card.Meta>
          </Card.Meta>
          <Card.Description>
          Elo: {playerElo}
          </Card.Description>
          <Card.Description>
          K/D Ratio: {kdRatio}
          </Card.Description>
          <Card.Description>
          W/L Ratio: {wlRatio} %
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <p floated='left'>Links: </p>
          <a href={steamId} target="_blank" rel="noreferrer">
          <Image
          floated='left'
          size='mini'
          src="./images/steam_icon.png"
          />
          </a>
          <a href={faceitLink} target="_blank" rel="noreferrer">
          <Image
          floated='left'
          size='mini'
          src="./images/faceit_icon.png"
          />
          </a>
        </Card.Content>
      </Card>
      ) : (
        <div>
        </div>
      )}</div>)}
    </div>
);
}

export default Stats;
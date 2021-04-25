import React, { useState } from 'react';
import { Button, Card, Image } from 'semantic-ui-react'

const API_KEY = process.env.REACT_APP_API_KEY;

const apiUrl = 'https://open.faceit.com/data/v4/players?nickname=';
//const apiKey = '54e301ca-a1fb-43ee-be0b-e4ca2c786b79';

const Stats = () => {

  const [isFetched, setFetched] = useState(false);
  const [nick, setNick] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [playerElo, setElo] = useState('');
  const [playerLvl, setLvl] = useState('');
  const [kdRatio, setKD] = useState('');
  const [wlRatio, setWL] = useState('');

  const getData = async () => {
  
  const response = await fetch(apiUrl + 'dDaniii', {
    headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer ' + API_KEY
    }
  });

  const data = await response.json();
  const id = data.player_id;
  console.log(data);
  setNick(data.nickname);
  setImgSrc(data.avatar);
  setElo(data.games.csgo.faceit_elo);
  setLvl(data.games.csgo.skill_level);


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
  
return(
  <div>
      <Button icon='search'
    onClick={() => { getData(); setFetched(!isFetched);}} />
      {isFetched ? (
        <Card className="segment centered" color='orange'>
        <Image src={imgSrc} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{nick}</Card.Header>
          <Card.Meta>Level: {playerLvl}</Card.Meta>
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
    ASd
        </Card.Content>
      </Card>
      ) : (
        <div>
          <h2> Search for user </h2>
        </div>
      )}
    </div>
);
}

export default Stats;
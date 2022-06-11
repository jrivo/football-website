import React, { useEffect } from "react";
// import getNextMatch from "../utils";
import axios from "axios";

const API_URL = "http://51.158.122.33:8080";

export function CurrentMatch({ matchId }) {
  const [homeTeamName, setHomeTeamName] = React.useState("");
  const [awayTeamName, setAwayTeamName] = React.useState("");
  const [homeTeamLogoURL, setHomeTeamLogoURL] = React.useState("");
  const [awayTeamLogoURL, setAwayTeamLogoURL] = React.useState("");
  const [homeTeamScore, setHomeTeamScore] = React.useState(0);
  const [awayTeamScore, setAwayTeamScore] = React.useState(0);
  const [homeTeamVictoryOdd, setHomeTeamVictoryOdd] = React.useState("0");
  const [awayTeamVictoryOdd, setAwayTeamVictoryOdd] = React.useState("0");
  const [drawOdd, setDrawOdd] = React.useState(0);
  const [matchTime, setMatchTime] = React.useState("");
  const [matchLeague, setMatchLeague] = React.useState("");
  const [noRights, setNoRights] = React.useState(false);

  useEffect(() => {
    getCurrentMatch(matchId);
  }, []);

  async function getCurrentMatch(id) {
    const response = await axios.get(API_URL + "/getCurrentMatch/" + id);
    // const response = {
    //   data: {
    //     match: {
    //       started: false,
    //       finished: false,
    //       time: "32",
    //       drawOdd: "1.5",
    //       league: "Division 2 - Södra Svealand",
    //     },
    //     homeTeam: {
    //       name: "Enskede",
    //       logo: "https://apiv3.apifootball.com/badges/7398_enskede.jpg",
    //       score: "2",
    //       victoryOdd: "1.15",
    //     },
    //     awayTeam: {
    //       name: "Sleipner",
    //       logo: "https://apiv3.apifootball.com/badges/7400_sleipner.jpg",
    //       score: "1",
    //       victoryOdd: "3.25",
    //     },
    //   },
    // };
    // console.log(response.data.match);
    if (response.data == "No rights for this match") {
      setNoRights(true);
    } else {
      setHomeTeamName(response.data.homeTeam.name);
      setAwayTeamName(response.data.awayTeam.name);
      setHomeTeamLogoURL(response.data.homeTeam.logo);
      setAwayTeamLogoURL(response.data.awayTeam.logo);
      setHomeTeamScore(response.data.homeTeam.score);
      setAwayTeamScore(response.data.awayTeam.score);
      setHomeTeamVictoryOdd(response.data.homeTeam.victoryOdd);
      setAwayTeamVictoryOdd(response.data.awayTeam.victoryOdd);
      setDrawOdd(response.data.match.drawOdd);
      setMatchTime(response.data.match.time + "'");
      setMatchLeague(response.data.match.league);
    }
  }

  return !noRights ? (
    <div className="h-screen bg-blue-400">
      <div className="flex justify-center align-middle">
        <div>
          <div>
            <img src={homeTeamLogoURL}></img>
          </div>
          <div className="flex justify-center">
            {homeTeamName} ({homeTeamVictoryOdd})
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <div className="flex justify-center">{matchLeague}</div>
            <div className="flex justify-center">{matchTime}</div>
          </div>
          <div className="flex justify-center text-6xl font-bold">
            {homeTeamScore}-{awayTeamScore}
          </div>
        </div>
        <div>
          <div>
            <img src={awayTeamLogoURL}></img>
          </div>
          <div className="flex justify-center">
            {awayTeamName} ({awayTeamVictoryOdd})
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen bg-blue-400">
      <div className="flex justify-center align-middle">
        No rights for this match
      </div>
    </div>
  );
}

export default CurrentMatch;

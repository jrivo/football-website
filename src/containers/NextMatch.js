import React, { useEffect } from "react";
// import getNextMatch from "../utils";
import axios from "axios";
import { useNavigate } from "../components/Router";

const API_URL = "https://api.foot.kreyzix.com";

export function NextMatch({ teamId }) {
  const [homeTeamName, setHomeTeamName] = React.useState("");
  const [awayTeamName, setAwayTeamName] = React.useState("");
  const [homeTeamLogoURL, setHomeTeamLogoURL] = React.useState("");
  const [awayTeamLogoURL, setAwayTeamLogoURL] = React.useState("");
  const [matchDate, setMatchDate] = React.useState("");
  const [matchTime, setMatchTime] = React.useState("");
  const [matchLeague, setMatchLeague] = React.useState("");
  const [matchStatus, setMatchStatus] = React.useState("");
  const [noRights, setNoRights] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getNextMatch(teamId);
  }, []);

  async function getNextMatch(teamId) {
    console.log(API_URL+'/getNextMatch/'+teamId)
    const response = await axios.get(API_URL+'/getNextMatch/'+teamId)
    // const response = {
    //   data: {
    //     match: {
    //       id: "1020311",
    //       started: false,
    //       finished: false,
    //       date: "2022-06-11",
    //       time: "14:00",
    //       league: "Division 2 - Södra Svealand",
    //     },
    //     homeTeam: {
    //       name: "Enskede",
    //       logo: "https://apiv3.apifootball.com/badges/7398_enskede.jpg",
    //     },
    //     awayTeam: {
    //       name: "Sleipner",
    //       logo: "https://apiv3.apifootball.com/badges/7400_sleipner.jpg",
    //     },
    //   },
    // };
    if (response.data =="No rights for this team") {
      setNoRights(true);
    } else {
      if(response.data.match.started){
        console.log("match started")
        // console.log(response.data.match)
        navigate('/currentMatch/'+response.data.match.id);
      }
      setHomeTeamName(response.data.homeTeam.name);
      setAwayTeamName(response.data.awayTeam.name);
      setHomeTeamLogoURL(response.data.homeTeam.logo);
      setAwayTeamLogoURL(response.data.awayTeam.logo);
      setMatchDate(response.data.match.date);
      setMatchTime(response.data.match.time);
      setMatchLeague(response.data.match.league);
      setMatchStatus(response.data.match.status);
    }
    }

  return !noRights ? (
    <div className="h-screen bg-white">
      <div className="flex justify-center align-middle">
        <div>
          <div>
            <img src={homeTeamLogoURL} style={{maxWidth:"150px"}}></img>
          </div>
          <div className="flex justify-center">{homeTeamName}</div>
        </div>
        <div className="flex flex-col">
          <div>
            <div className="flex justify-center">{matchLeague}</div>
            <div className="flex justify-center">{matchDate}</div>
            <div className="flex justify-center">{matchTime}</div>
          </div>
          <div className="flex justify-center text-3xl font-bold">VS</div>
          <div className="flex justify-center text-2xl my-2 font-bold uppercase">{matchStatus}</div>
        </div>
        <div>
          <div>
            <img src={awayTeamLogoURL}style={{maxWidth:"150px"}}></img>
          </div>
          <div className="flex justify-center">{awayTeamName}</div>
        </div>
      </div>
    </div>
  ) : ( <div className="h-screen">
  <div className="flex justify-center align-middle">
    No rights for this team
  </div>
</div>);
}

export default NextMatch;

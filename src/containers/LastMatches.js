import React, { useEffect } from "react";
// import getNextMatch from "../utils";
import axios from "axios";
import classnames from "classnames";

const API_URL = "https://api.foot.kreyzix.com";

export function LastMatches({ teamId }) {
  const [matches, setMatches] = React.useState([]);
  const [noRights, setNoRights] = React.useState(false);
  useEffect(() => {
    getLastMatches(teamId);
  }, []);

  async function getLastMatches(id) {
    console.log("will get last matches");
    // console.log(API_URL+'/getLastMatches/'+id)
    const response = await axios.get(API_URL + "/getLastMatches/" + id);
    // console.log(response)
    // const response = {
    //   data: [
    //     {match: {
    //       id: "1020311",
    //       started: false,
    //       finished: false,
    //       winner: "Enskede",
    //       date: "2022-06-11",
    //       time: "14:00",
    //       league: "Division 2 - Södra Svealand",
    //     },
    //     homeTeam: {
    //       name: "Enskede",
    //       logo: "https://apiv3.apifootball.com/badges/7398_enskede.jpg",
    //       score:"2",
    //     },
    //     awayTeam: {
    //       name: "Sleipner",
    //       logo: "https://apiv3.apifootball.com/badges/7400_sleipner.jpg",
    //       score:"1",
    //     },
    //   },
    //   {
    //     "match": {
    //         "id": "1055505",
    //         "started": false,
    //         "finished": false,
    //         "winner": "Cancelled",
    //         "league": "Club Friendlies - Club Friendlies 3",
    //         "date": "2022-06-08",
    //         "time": "18:00"
    //     },
    //     "homeTeam": {
    //         "name": "Rapid Vienna",
    //         "logo": "https://apiv3.apifootball.com/badges/118_rapid-vienna.jpg",
    //         "score": "0"
    //     },
    //     "awayTeam": {
    //         "name": "Dinamo Kiev",
    //         "logo": "https://apiv3.apifootball.com/badges/98_dinamo-kiev.jpg",
    //         "score": "0"
    //     }
    // }
    //   ]};
    // response.data.map(match => {
    //   console.log(match)
    // })
    if (response.data == "No rights for this team") {
      setNoRights(true);
    } else {
      setMatches(response.data);
    }
  }

  return !noRights ? (
    <div className="h-screen bg-white">
      {matches.map((match) => (
        <div
          className={classnames({
            "flex justify-center align-middle border border-2 mx-80": true,
            "bg-yellow-100": match.match.winner === "Draw",
            "bg-red-500": match.match.winner === "Cancelled",
            "bg-green-100": match.match.winner == teamId,
            "bg-red-100": match.match.winner != teamId,
          })}
        >
          <div className="py-2 mx-2">
            <div>
              <img src={match.homeTeam.logo} style={{maxWidth:"150px"}}></img>
            </div>
            <div className="flex justify-center">{match.homeTeam.name}</div>
          </div>
          <div className="flex flex-col">
            <div>
              <div className="flex justify-center">{match.match.league}</div>
              <div className="flex justify-center">{match.match.date}</div>
              <div className="flex justify-center">{match.match.time}</div>
            </div>
            <div className="flex justify-center text-6xl font-bold">
              {match.homeTeam.score}-{match.awayTeam.score}
            </div>
            {match.match.winner === "Cancelled" && (
              <div className="flex justify-center text-2xl my-2 font-bold uppercase">
                {match.match.winner}
              </div>
            )}
            {match.match.winner == teamId && (
              <div className="flex justify-center text-2xl my-2 font-bold uppercase">
                Win
              </div>
            )}
            {match.match.winner != teamId &&
              match.match.winner != "Cancelled" &&
              match.match.winner != "Draw" && (
                <div className="flex justify-center text-2xl my-2 font-bold uppercase">
                  Loose
                </div>
              )}
            {match.match.winner == "Draw" && (
              <div className="flex justify-center text-2xl my-2 font-bold uppercase">
                Draw
              </div>
            )}
          </div>
          <div className="py-2 mx-2">
            <div>
              <img src={match.awayTeam.logo} style={{maxWidth:"150px"}}></img>
            </div>
            <div className="flex justify-center">{match.awayTeam.name}</div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="h-screen">
      <div className="flex justify-center align-middle">
        No rights for this team
      </div>
    </div>
  );
}

export default LastMatches;

import axios from 'axios';

const API_URL = "https://api.foot.kreyzix.com";

async function getCurrentMatch(matchId) {
  const response = await axios.get(API_URL+'/getNextMatch/'+matchId);
  return response.data;
}

async function getNextMatch(teamId) {
  const response = await axios.get(API_URL+'/getNextMatch/'+teamId);
  return response.data;
}

async function getEndedMatch(matchId) {
  const response = await axios.get(API_URL+'/getNextMatch/'+matchId);
  return response.data;
}

export default {
  getCurrentMatch,
  getNextMatch,
  getEndedMatch
}
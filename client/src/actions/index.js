import axios from "axios";

export const FETCH_AUCTIONS = 'fetch_auctions';

const ROOT_URL = 'http://localhost:3000/api';

export function fetchAuctions() {
  const request = axios.get(`${ROOT_URL}/auctions`);

  return {
    type: FETCH_AUCTIONS,
    payload: request
  }
}
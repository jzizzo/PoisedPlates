import axios from "axios";

export const FETCH_AUCTIONS = 'fetch_auctions';
export const FETCH_AUCTION = 'fetch_auction';
export const POST_AUCTION = 'post_auction';

const ROOT_URL = 'http://localhost:3000/api';

export function fetchAuctions() {
  const request = axios.get(`${ROOT_URL}/auctions`);

  return {
    type: FETCH_AUCTIONS,
    payload: request
  }
}

export function postAuction(values, callback) {
  console.log(values)
  const request = axios.post(`${ROOT_URL}/auction`, values)
    .then(() => callback());

  return {
    type: POST_AUCTION,
    payload: request
  };
}

export function fetchAuction(id) {
  const request = axios.get(`${ROOT_URL}/auction/${id}`);
  return {
    type: FETCH_AUCTION,
    payload: request
  };
}
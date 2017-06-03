import axios from "axios";

export const FETCH_AUCTIONS = 'fetch_auctions';
export const POST_AUCTION = 'post_auction';

const ROOT_URL = 'http://localhost:3000/api';

export function fetchAuctions() {
  const request = axios.get(`${ROOT_URL}/auctions`);

  return {
    type: FETCH_AUCTIONS,
    payload: request
  }
}

export function postAuction(values) {
  const request = axios.get(`${ROOT_URL}/auction`, values);

  return {
    type: POST_AUCTION,
    payload: request
  };
}
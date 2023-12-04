import { EasyWatchApiRepository } from "./EasyWatchApiRepository";

const axios = require("axios");

export class EasyWatchApiRepositoryImpl implements EasyWatchApiRepository {
  constructor() {}
  getAreaAllList() {
    axios
      .get("http://localhost:9000/ping-result")
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error.data));
  }
}

import { EasyWatchApiRepository } from "./EasyWatchApiRepository";
import axios from "axios";

class EasyWatchApiRepositoryImpl implements EasyWatchApiRepository {
  getAreaAllList() {
    axios
      .get("http://localhost:9000/ping-result")
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error.data));
  }
}

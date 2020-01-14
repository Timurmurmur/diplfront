import axios from "axios";
import { BaseRestDataProvider } from "./BaseRestDataProvider";
import { useDispatch } from "react-redux";

export class PageDataProvider extends BaseRestDataProvider {
  public loadContent(component: string) {
    return axios
      .get("https://reqres.in/api/users", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Origin: "*"
        }
      })
      .then(res => {
        console.log(res.data);
        return res.data;
      });
  }
}

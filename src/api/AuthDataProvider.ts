import axios from "axios";
import { BaseRestDataProvider } from "./BaseRestDataProvider";
import { Cookie } from "../Components/App/App";

export class AuthDataProvider extends BaseRestDataProvider {
  public login(email: string, password: string) {
    return axios
      .post(
        `${this.host}auth`,
        { email, password },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Origin: "*"
          }
        }
      )
      .then(response =>
        Cookie.set("accessToken", response.data.accessToken, { path: "/" })
      );
  }
}

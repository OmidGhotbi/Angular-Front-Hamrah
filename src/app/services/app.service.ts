import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AppService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get("/api/hamrah");
  }
  post(body) {
    return this.http.post("/api/hamrah", body);
  }
  delete() {
    return this.http.delete("/api/hamrah");
  }
}

import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Favorite } from "./favorite";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class FavoriteService {

    baseUrl: string = "https://" + location.hostname + location.hostname === "localhost" ? ":" + location.port : "";

    constructor(private http: Http) {

    }

    Pesquisar(nome: string): Observable<any> {
        return this.http.get(this.baseUrl + "/api/search/" + nome)
            .map((res: Response) => res.json());
    }

    PesquisarPorIdApi(idApi: number): Observable<any> {
        return this.http.get(this.baseUrl + "/db/favorite/idApi/" + idApi)
            .map((res: Response) => res.json());
    }

    Favoritar(serie: Favorite): Observable<any> {
        let options = new RequestOptions({ headers: new Headers({ "Content-Type": "application/json" }) });

        return this.http.post(this.baseUrl + "/db/favorite", serie, options)
            .map((res: Response) => res.json());
    }

    Desfavoritar(idApi: number): Observable<any> {
        return this.http.delete(this.baseUrl + "/db/favorite/" + idApi)
            .map((res: Response) => res.json());
    }

    PesquisarFavoritos(): Observable<any> {
        return this.http.get(this.baseUrl + "/db/favorites/")
            .map((res: Response) => res.json());
    }
}

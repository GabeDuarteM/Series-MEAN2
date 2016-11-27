import { Component, OnInit, } from "@angular/core";
import { Favorite } from "../favorite";
import { FavoriteService } from "../favorite.service";
import "rxjs/add/operator/map";

@Component({
    selector: "app-pesquisa",
    templateUrl: "./pesquisa.component.html",
    styleUrls: ["./pesquisa.component.scss"]
})
export class PesquisaComponent implements OnInit {
    nomeSerie: string;
    series: Favorite[] = [];
    seriesView: [Favorite[]];

    constructor(private favoriteService: FavoriteService) { }

    ngOnInit() {
        this.nomeSerie = "";
    }

    pesquisar(): void {

        if (!this.nomeSerie) {
            this.series = null;
            this.seriesView = [null];
            return;
        }

        this.favoriteService.Pesquisar(this.nomeSerie)
            .subscribe(data => {
                this.series = [];
                this.seriesView = [null];

                if (!data || Object.prototype.toString.call(data) !== "[object Array]") {
                    return;
                }

                data.forEach(x => {
                    let serie: Favorite = {
                        id: null,
                        nome: x.seriesName as string || "Nome não definido.",
                        sinopse: x.overview as string || "Sinopse não definida.",
                        bannerUrl: "https://thetvdb.com/banners/" + x.banner,
                        idApi: x.id as number,
                        isFavorito: false
                    };

                    this.favoriteService.PesquisarPorIdApi(serie.idApi).subscribe(y => {
                        serie.isFavorito = !!y;
                    });

                    this.series.push(serie);
                });

                let chunk = 3;
                let temparray = [];
                for (let i = 0; i < this.series.length; i += chunk) {
                    temparray = this.series.slice(i, i + chunk);
                    this.seriesView.push(temparray);
                }
            });
    }
}

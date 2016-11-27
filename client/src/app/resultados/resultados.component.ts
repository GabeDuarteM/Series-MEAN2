import { Component, OnInit, Input } from "@angular/core";
import { Favorite } from "../favorite";

@Component({
    selector: "app-resultados",
    templateUrl: "./resultados.component.html",
    styleUrls: ["./resultados.component.scss"]
})
export class ResultadosComponent implements OnInit {
    @Input() series: Favorite[];
    @Input() seriesView: [Favorite[]];

    constructor() { }

    ngOnInit() { }

}

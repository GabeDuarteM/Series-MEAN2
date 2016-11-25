import { Component, OnInit, Input } from '@angular/core';
import { FavoriteService } from '../favorite.service';
import { Favorite } from '../favorite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {
  @Input() serie: Favorite;

  constructor(private favoriteService: FavoriteService, private router: Router) { }

  ngOnInit() {
  }
  
  favoritar(event:any) : void {
    if (!this.serie.isFavorito) {
      this.favoriteService.Favoritar(this.serie).subscribe(data => {
        console.log(data);
        if (data.sucesso) {
          this.serie.isFavorito = true;
          setTimeout(() => { event.target.classList.remove('animated'); event.target.classList.remove('tada'); }, 1000);
          event.target.classList.add('animated');
          event.target.classList.add('tada');
        }
      });
    } else {
      this.favoriteService.Desfavoritar(this.serie.idApi).subscribe(data => {
        console.log(data);
        if (data.sucesso) {
          this.serie.isFavorito = false;
          setTimeout(() => { event.target.classList.remove('animated'); event.target.classList.remove('tada'); }, 1000);
          event.target.classList.add('animated');
          event.target.classList.add('tada');
        }
      });
    }
  }
  
  tratarErroImagem(imagem: any) {
    imagem.onerror = "";
    imagem.src = "./assets/error_banner.jpg";
    return true;
  }
}

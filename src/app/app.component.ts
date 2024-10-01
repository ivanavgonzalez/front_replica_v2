import { StatusService } from './service/status.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TiendasComponent } from "./tiendas/tiendas.component";
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TiendasComponent, FormsModule, NgbModule, HttpClientModule],
  providers: [StatusService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  locales: any[] = [];

  cadena_selected = '';
  cadenas: string[] = ['American Deli',
                       'Baskin Robbins',
                       'Cafe Astoria',
                       'Cajun',
                       'Casa Res',
                       'Cinnabon',
                       'Dolce Incontro',
                       'Embutser',
                       'El Español',
                       'Federer',
                       'Gus',
                       'Il Cappo',
                       'Juan Valdez',
                       'KFC',
                       'Menestras del Negro',
                       'Tropi Burger'];
  tramas: any[] = [];
  local_Selected: any = null;

  constructor(private StatusService: StatusService, private modalService: NgbModal) {}

  get_locales(){
    this.StatusService.getStatus().then((response) => {
          this.locales = response.data.status_shops.map((shop: any) => ({
            tienda: shop.tienda,
            application: shop.aplication ? true : false,
            database: shop.database ? true : false   
          }));
      })
      .catch((error) => {
        console.error('Error al obtener los locales:', error);
      });
  }

  show_modal(local: any, content: any) {
    this.local_Selected = local;
    this.tramas = [
      {id: 1, statement: 'UNA SENTENCIA', result: 'un resultado', rst_id: 15, status: 'ok'},
      {id: 1, statement: 'UNA SENTENCIA', result: 'un resultado', rst_id: 15, status: 'error'},
      {id: 1, statement: 'UNA SENTENCIA', result: 'un resultado', rst_id: 15, status: 'ok'},
      {id: 1, statement: 'UNA SENTENCIA', result: 'un resultado', rst_id: 15, status: 'ok'},
      {id: 1, statement: 'UNA SENTENCIA', result: 'un resultado', rst_id: 15, status: 'ok'},
      {id: 1, statement: 'UNA SENTENCIA', result: 'un resultado', rst_id: 15, status: 'ok'}
    ];
    this.modalService.open(content, { centered: true, fullscreen: true, backdrop: 'static', keyboard: false }).result.then(( response => {
    }), ( r => {}));
  }

  ngOnInit(): void {
    this.get_locales()
  }

}

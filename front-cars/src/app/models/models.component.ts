import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Necesario para hacer peticiones HTTP

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CommonModule, HttpClientModule],  // Aquí debes importar HttpClientModule, no HttpClient directamente
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  models: string[] = [];  // Aquí almacenaremos los modelos que recibimos desde la API

  private apiUrl = 'http://localhost:5178/api/Vehicle/models';  // URL del endpoint

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getVehicleModels();  // Llamamos al método para obtener los modelos al iniciar el componente
  }

  // Método para hacer la solicitud GET y obtener los modelos
  getVehicleModels(): void {
    this.http.get<string[]>(this.apiUrl).subscribe(
      (data) => {
        this.models = data;  // Asignamos los modelos recibidos a la variable 'models'
        console.log('Modelos obtenidos:', this.models);
      },
      (error) => {
        console.error('Error al obtener los modelos', error);
      }
    );
  }
}


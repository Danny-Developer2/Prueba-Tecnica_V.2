import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

export interface Vehicule {
  id: string;
  model: string;
  placas: string;
  doors: number;
}

@Component({
  selector: 'app-delete-vehicule',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './delete-vehicule.component.html',
  styleUrls: ['./delete-vehicule.component.css']
})
export class DeleteVehiculeComponent implements OnInit {

  private apiUrl = 'http://localhost:5178/api/Vehicle'; 
  vehicule: Vehicule | null = null;
  router: any;

  constructor(
    private route: ActivatedRoute,  // Para acceder a los parámetros de la URL
    private http: HttpClient  ) {}

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la URL
    const vehicleId = this.route.snapshot.paramMap.get('id');
    
    if (vehicleId) {
      // Hacer una solicitud GET para obtener los detalles del vehículo
      this.getVehicleDetails(vehicleId);
    }
  }

  // Método para obtener los detalles del vehículo (GET)
  getVehicleDetails(vehicleId: string): void {
    this.http.get<Vehicule>(`${this.apiUrl}/${vehicleId}`).subscribe(
      (data) => {
        this.vehicule = data;  // Asignar los detalles del vehículo a la variable 'vehicule'
        console.log('Detalles del vehículo:', data);
        this.http.delete(`${this.apiUrl}/${vehicleId}`).subscribe(
          () => {
            console.log('Vehículo eliminado con éxito');
            this.vehicule = null;  // Limpiar los detalles del vehículo
          
          },
          (error) => {
            console.error('Error al eliminar el vehículo:', error);
          });
      },
      (error) => {
        console.error('Error al obtener los detalles del vehículo:', error);
      }
    );
  }

  // Método para eliminar el vehículo (DELETE)
  
  
}

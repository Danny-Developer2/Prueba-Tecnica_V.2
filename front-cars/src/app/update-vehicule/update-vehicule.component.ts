import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-vehicule',
  standalone: true,  // Esto hace que el componente sea independiente
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './update-vehicule.component.html',
  styleUrls: ['./update-vehicule.component.css']
})
export class UpdateVehiculeComponent implements OnInit {
  vehicle: any = {
    id: '',
    model: '',
    placas: '',
    doors: '',
    images: []
  };
  
  // Constructor con HttpClient
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del vehículo desde la URL
    this.route.params.subscribe(params => {
      const vehicleId = params['id']; // El 'id' es el parámetro de la URL
      if (vehicleId) {
        this.getVehicleDetails(vehicleId); // Obtener los detalles del vehículo
      }
    });
  }

  // Método para obtener los detalles del vehículo desde la API
  getVehicleDetails(vehicleId: string): void {
    this.http.get(`http://localhost:5178/api/Vehicle/${vehicleId}`).subscribe(
      (data: any) => {
        this.vehicle = data;  // Asignar los datos al objeto vehicle
        // Si es necesario, puedes manejar las imágenes aquí
      },
      (error) => {
        console.error('Error al obtener los detalles del vehículo:', error);
        alert('Hubo un error al obtener los detalles del vehículo.');
      }
    );
  }

  // Agrega un nuevo campo de imagen
  addImage() {
    this.vehicle.images.push({
      url: '',
      vehicleId: this.vehicle.id, // Mantiene el mismo ID del vehículo
    });
  }

  // Función para manejar el submit del formulario
  onSubmit() {
    console.log('Form submitted', this.vehicle);
    // Enviar los datos del vehículo a la API usando HttpClient
    this.updateVehicle(this.vehicle).subscribe(
      (data) => {
        console.log('Vehicle successfully updated:', data);
        alert('Vehicle updated successfully!');
        this.router.navigate(['/vehicles']); // Redirigir a la lista de vehículos después de la actualización
      },
      (error) => {
        console.error('Error updating vehicle:', error);
        alert('Failed to update vehicle!');
      }
    );
  }

  // Método para actualizar el vehículo en la API
  updateVehicle(vehicle: any): Observable<any> {
    return this.http.put(`http://localhost:5178/api/Vehicle/${vehicle.id}`, vehicle);
  }
}

import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  // El vehículo que se creará
  vehicle = {
    id: uuidv4(), // Genera un UUID único
    model: '',
    placas: '',
    doors: '',
    images: [
      {
        url: '',
        vehicleId: uuidv4(), // UUID para las imágenes
      },
    ],
  };

  // Constructor con HttpClient
  constructor(private http: HttpClient) {}

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
    this.addVehicle(this.vehicle).subscribe(
      (data) => {
        console.log('Vehicle successfully added:', data);
        alert('Vehicle added successfully!');
      },
      (error) => {
        console.error('Error submitting vehicle:', error);
        alert('Failed to add vehicle!');
      }
    );
  }

  // Método para enviar el vehículo a la API
  addVehicle(vehicle: any): Observable<any> {
    return this.http.post('http://localhost:5178/api/Vehicle', vehicle);
  }
}

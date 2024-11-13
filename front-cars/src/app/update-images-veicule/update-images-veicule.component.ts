import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-update-images-veicule',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './update-images-veicule.component.html',
  styleUrls: ['./update-images-veicule.component.css'] // Corrección en styleUrls
})
export class UpdateImagesVeiculeComponent {
  vehicle: any = {
    id: '',
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

  // Función para manejar el submit del formulario (solo para actualizar las imágenes)
  onSubmit() {
    console.log('Form submitted', this.vehicle);

    // Actualizar solo las imágenes (para cada imagen)
    this.vehicle.images.forEach((image: any) => {
      this.updateImage(this.vehicle.id, image.id, image).subscribe(
        (data) => {
          console.log('Image successfully updated:', data);
        },
        (error) => {
          console.error('Error updating image:', error);
        }
      );
    });

    alert('Images updated successfully!');
    this.router.navigate(['/vehicles']); 
  }

  // Método para actualizar solo una imagen en la API
  updateImage(vehicleId: string, imageId: [], image: any): Observable<any> {
    
    return this.http.put(`http://localhost:5178/api/Vehicle/${vehicleId}/images/${imageId}`, image);
  }
}

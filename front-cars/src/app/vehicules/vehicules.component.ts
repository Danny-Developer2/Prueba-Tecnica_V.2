import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 

interface Image {
  id: string;
  url: string;
  vehicleId: string;
}

interface Vehicle {
  id: string;
  model: string;
  placas: string;
  doors: string;
  images: Image[];
}

@Component({
  selector: 'app-vehicules',
  standalone: true,
  imports: [CommonModule, HttpClientModule],  
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.css']  
})
export class VehiculesComponent implements OnInit {
  private apiUrl = 'http://localhost:5178/api/Vehicle';  

  vehicles: Vehicle[] = [];  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getVehicles();  
  }

  
  getVehicles(): void {
    this.http.get<Vehicle[]>(this.apiUrl).subscribe(
      (data: Vehicle[]) => {
        this.vehicles = data;  
        console.log('Vehículos obtenidos:', this.vehicles);
      },
      (error) => {
        console.error('Error al obtener los vehículos', error);
      }
    );
  }
}

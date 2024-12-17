import { Component, OnInit } from '@angular/core';
import { TripsService } from '../services/trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.page.html',
  styleUrls: ['./transporte.page.scss'],
})
export class TransportePage implements OnInit {
  tripHistory: any[] = [];  

  constructor(private tripsService: TripsService, private router: Router) {}

  async ngOnInit() {
    await this.loadTripHistory();  
  }

  async loadTripHistory() {
    const driverId = await this.tripsService.getCurrentDriverId(); 
    console.log('ID del conductor:', driverId); 

    if (driverId) {
      this.tripHistory = await this.tripsService.getTrips(driverId); 
      console.log('Historial de viajes:', this.tripHistory); 
    } else {
      console.log('No se encontró el ID del conductor');
    }
  }

  startNewTrip() {
    this.router.navigate(['/viaje']);  
  }
}

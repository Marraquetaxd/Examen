import { Component, OnInit } from '@angular/core';
import { TripsService } from '../services/trip.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular'; 

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.page.html',
  styleUrls: ['./ingresar.page.scss'],
})
export class IngresarPage implements OnInit {
  allTrips: any[] = []; 

  constructor(
    private tripsService: TripsService,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController 
  ) {}

  ngOnInit() {
    this.loadAllTrips(); 
  }

  async loadAllTrips() {
    this.allTrips = await this.tripsService.getTrips(); // Obtener todos los viajes
  }
  async joinTrip(trip: any) {
    const currentUser = await this.authService.getCurrentUser();
    if (currentUser) {
      console.log(`Usuario ${currentUser.username} se unió al viaje ${trip.origin} - ${trip.destination}`);

      const toast = await this.toastController.create({
        message: 'Viaje solicitado con éxito',
        duration: 2000, 
        position: 'bottom', 
        color: 'success', 
      });

      await toast.present();

      this.router.navigate(['/viaje-detalle', trip.id]);
    }
  }

  viewMap(trip: any) {
    this.router.navigate(['/viaje-mapa', trip.id]);
  }
}

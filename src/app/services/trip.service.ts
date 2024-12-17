import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  private trips: any[] = []; 
  private readonly STORAGE_KEY = 'trips'; 

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.loadTrips(); 
  }

  private async loadTrips(): Promise<void> {
    const storedTrips = await this.storageService.get(this.STORAGE_KEY);
    this.trips = Array.isArray(storedTrips) ? storedTrips : []; 
  }
  async getTripById(tripId: string): Promise<any> {
    const trips = await this.getTrips(); 
    return trips.find(trip => trip.id === tripId);  
  }
  
  /**
   * Crea un nuevo viaje y lo guarda en el almacenamiento
   * @param trip Objeto con los datos del viaje
   */
  async createTrip(trip: any): Promise<void> {
    const driverId = await this.getCurrentDriverId(); 
    if (!driverId) {
      console.error('No se pudo obtener el ID del conductor');
      return; 
    }

    const newTrip = { ...trip, driverId, costo: trip.costo || 0 };
    this.trips.push(newTrip);

    await this.storageService.set(this.STORAGE_KEY, this.trips);
    console.log('Nuevo viaje creado y guardado:', newTrip);
  }
  
  /**
   * Se obtiene el ID del chofer actual
   * @returns El ID del chofer actual
   */
  async getCurrentDriverId(): Promise<string> {
    const currentUser = await this.authService.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      console.error('ID de conductor no disponible');
      return '';  
    }
    return currentUser.id;
  }
  
  /**
   * Obtiene los viajes, filtrando por conductor si es necesario
   * @param driverId El ID del conductor para filtrar los viajes
   * @returns Un arreglo de viajes
   */
  async getTrips(driverId?: string): Promise<any[]> {
    await this.loadTrips();
    return driverId ? this.trips.filter((trip) => trip.driverId === driverId) : this.trips;
  }
}

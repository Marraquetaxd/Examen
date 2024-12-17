import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  firstName: string = '';
  usuario: String='';  
  userType: string = ''; 
  profileImage: string = 'https://ionicframework.com/docs/img/demos/avatar.svg'; 

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUserData(); 
  
    this.authService.getCurrentUserType().then((userType) => {
      this.userType = userType;
    }).catch((error) => {
      console.error('Error al obtener el tipo de usuario:', error);
    });
  }
  
  async loadUserData() {
    const currentUser = await this.authService.getCurrentUser(); 
    const isAuthenticated = await this.authService.isAuthenticated(); // Verifica si el usuario está autenticado

    if (currentUser && isAuthenticated) {
      // Si el usuario está autenticado, toma su nombre
      const fullNameParts = (currentUser.fullName || '').split(' ');
      this.firstName = fullNameParts[0] || 'Invitado'; 
      this.usuario= currentUser.tipo_usuario ||'',
      // Establece la imagen de perfil, si es que existe
      this.profileImage = currentUser.profileImage || this.profileImage;
    }
  }
}

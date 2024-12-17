import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  firstName: string = '';  
  lastName: string = '';  
  username: string = '';  
  birthdate: Date | null = null; 
  usuario:String='';
  profileImage: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loadUserData();
  }

  // Cargar los datos del usuario actual
  async loadUserData() {
    const currentUser = await this.authService.getCurrentUser(); 
  
    if (!currentUser || !await this.authService.isAuthenticated()) { 
      this.router.navigate(['/login']).catch(err => console.error('Error al redirigir:', err));
    } else {
      // Verificar que fullName sea una cadena antes de dividir
      const fullNameParts = (currentUser.fullName && typeof currentUser.fullName === 'string') 
        ? currentUser.fullName.split(' ') 
        : [];
  
      this.firstName = fullNameParts[0] || ''; 
      this.lastName = fullNameParts.slice(1).join(' ') || ''; 
      this.username = currentUser.username || '';
      this.birthdate = currentUser.birthdate ? new Date(currentUser.birthdate) : null; 
      this.usuario =currentUser.tipo_usuario || '';
      this.profileImage = currentUser.profileImage || this.profileImage; 
    }
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
  
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        const imageUrl = e.target.result;
        this.profileImage = imageUrl;
        this.authService.updateProfileImage(imageUrl);
        
        this.router.navigateByUrl('/perfil', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/perfil']);
        });
      };
      
      reader.readAsDataURL(file);  
    }
  }
}

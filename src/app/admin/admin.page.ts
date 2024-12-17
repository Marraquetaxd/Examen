import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  users: any[] = [];  

  constructor(private authService: AuthService, private alertController: AlertController) { }

  

  ngOnInit() {
    this.loadUsers(); // Carga los usuarios cuando se inicia
  }

  async loadUsers() {
    this.users = await this.authService.getAllUsers(); 
  }
  async addUser() {
    const alert = await this.alertController.create({
      header: 'Agregar Usuario',
      inputs: [
        { name: 'firstName', type: 'text', placeholder: 'Nombre' },
        { name: 'lastName', type: 'text', placeholder: 'Apellido' },
        { name: 'username', type: 'text', placeholder: 'Nombre de Usuario' },
        { name: 'tipo_usuario', type: 'text', placeholder: 'Tipo de Usuario' }, 
        { name: 'password', type: 'password', placeholder: 'Contraseña' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: async (data) => {
            const isRegistered = await this.authService.register(data.firstName, data.lastName, data.username, data.password, data.tipo_usuario, '');
            if (isRegistered) {
              this.loadUsers(); 
            } else {
              await this.presentAlert('El nombre de usuario ya está en uso');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async modificarUsuario(userId: string) {
    const user = this.users.find(u => u.id === userId); 
    const alert = await this.alertController.create({
      header: 'Modificar Usuario',
      inputs: [
        { name: 'firstName', type: 'text', placeholder: 'Nombre', value: user.firstName },
        { name: 'lastName', type: 'text', placeholder: 'Apellido', value: user.lastName },
        { name: 'username', type: 'text', placeholder: 'Nombre de Usuario', value: user.username },
        { name: 'tipo_usuario', type: 'text', placeholder: 'Tipo de Usuario', value: user.tipo_usuario }, 
        { name: 'password', type: 'password', placeholder: 'Contraseña', value: user.password },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Modificar',
          handler: async (data) => {
            await this.authService.updateUser({...user, ...data}); 
            this.loadUsers(); 
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteUser(username: string) {
    const confirm = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: `¿Estás seguro de que deseas eliminar al usuario ${username}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.authService.deleteUser(username); 
            this.loadUsers(); 
          }
        }
      ]
    });
    await confirm.present();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Registro',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}

import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  constructor(
    public senhasService: SenhasService,
    private alertController: AlertController
  ) {}

  async gerarSenha(tipo: string) {
    this.senhasService.novaSenha(tipo);
    const senhaGerada = this.senhasService.inputNovaSenha;
    const alert = await this.alertController.create({
      header: 'Senha Gerada!',
      message: `Sua senha é: ${senhaGerada}`,
      buttons: ['OK']
    });
    await alert.present();
  }
}

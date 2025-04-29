import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  guiches = [
    { nome: 'Guichê 01', status: 'Livre', senha: '', tempoRestante: 0, intervalId: null },
    { nome: 'Guichê 02', status: 'Livre', senha: '', tempoRestante: 0, intervalId: null },
    { nome: 'Guichê 03', status: 'Livre', senha: '', tempoRestante: 0, intervalId: null },
  ];

  constructor(public senhasService: SenhasService) {}

  chamarProximaSenha(guiche: any) {
    if (guiche.status === 'Livre') {
      const proxima = this.senhasService.obterProximaSenha();

      if (!proxima) {
        alert('Não há senhas disponíveis!');
        return;
      }

      guiche.status = 'Ocupado';
      guiche.senha = proxima.senha;
      guiche.tempoRestante = this.definirTempo(proxima.tipoSenha);

      this.senhasService.registrarAtendimento(proxima.senha, guiche.nome);

      guiche.intervalId = setInterval(() => {
        if (guiche.tempoRestante > 0) {
          guiche.tempoRestante--;
        } else {
          clearInterval(guiche.intervalId);
          guiche.status = 'Livre';
          guiche.senha = '';
          guiche.tempoRestante = 0;
        }
      }, 1000);
    }
  }

  definirTempo(tipo: string): number {
    if (tipo === 'SP') return 900; // 15 minutos
    if (tipo === 'SE') return 600; // 10 minutos
    if (tipo === 'SG') return Math.floor(Math.random() * (600 - 300 + 1)) + 300; // 5 a 10 minutos
    return 600;
  }

  formatarTempo(segundos: number): string {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}m ${segundosRestantes}s`;
  }
}

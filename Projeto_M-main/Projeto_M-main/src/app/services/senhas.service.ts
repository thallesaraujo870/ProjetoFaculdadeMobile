import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {
  inputNovaSenha: string = '';

  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;

  public senhasArray: any = {
    SG: [],
    SP: [],
    SE: [],
  };

  public ultimasChamadas: any[] = [];

  constructor() {}

  somaGeral() {
    this.senhasGeral++;
    this.senhasTotal++;
  }

  somaPrior() {
    this.senhasPrior++;
    this.senhasTotal++;
  }

  somaExame() {
    this.senhasExame++;
    this.senhasTotal++;
  }

  novaSenha(tipoSenha: string = '') {
    const dataHoje = new Date();
    const dataFormatada = dataHoje.getFullYear().toString().substring(2, 4) +
                          (dataHoje.getMonth() + 1).toString().padStart(2, '0') +
                          dataHoje.getDate().toString().padStart(2, '0');

    if (tipoSenha === 'SG') {
      this.somaGeral();
      this.inputNovaSenha = `${dataFormatada}-SG${(this.senhasArray.SG.length + 1).toString().padStart(2, '0')}`;
      this.senhasArray.SG.push(this.inputNovaSenha);

    } else if (tipoSenha === 'SP') {
      this.somaPrior();
      this.inputNovaSenha = `${dataFormatada}-SP${(this.senhasArray.SP.length + 1).toString().padStart(2, '0')}`;
      this.senhasArray.SP.push(this.inputNovaSenha);

    } else if (tipoSenha === 'SE') {
      this.somaExame();
      this.inputNovaSenha = `${dataFormatada}-SE${(this.senhasArray.SE.length + 1).toString().padStart(2, '0')}`;
      this.senhasArray.SE.push(this.inputNovaSenha);
    }
    console.log('Senhas Atualizadas:', this.senhasArray);
  }

  obterProximaSenha() {
    if (this.senhasArray.SP.length)
      return {
        tipoSenha: 'SP',
        senha: this.senhasArray.SP.shift(),
      };

    else if (this.senhasArray.SE.length)
      return {
        tipoSenha: 'SE',
        senha: this.senhasArray.SE.shift(),
      };

    else if (this.senhasArray.SG.length)
      return {
        tipoSenha: 'SG',
        senha: this.senhasArray.SG.shift(),
      };

    else
      return null;
  }

  registrarAtendimento(senha: string, guiche: string) {
    this.ultimasChamadas.unshift({ senha, guiche });
    if (this.ultimasChamadas.length > 5) {
      this.ultimasChamadas.pop();
    }
  }
}

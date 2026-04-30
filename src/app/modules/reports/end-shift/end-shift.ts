import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-end-shift',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './end-shift.html'
})
export class EndShift {
  authService = inject(AuthService);

  // Informações Gerais
  tatico = signal('Luis');
  limpezaBase = signal('Passado pano na base');
  infosPlantao = signal('- O Supervisor informou que todas as O.S abertas precisam ser repassadas para o mesmo');

  // Categorias de QTH (Dicionário de Arrays para facilitar a gestão)
  qthCategories = signal({
    bateriaFraca: ['CRAS EUCALIPTOS', 'J & J PNEUS', 'CMEI MARCIA CLAUDINO'],
    oscilacao: ['OBRA ENKAN'],
    disparos: ['ESC MUNDIAL: Sensor 01', 'CS BARBOSA: Sensor 03 e 05'],
    osAbertas: ['TEATRO: Falha de comunicação'],
    semChave: ['ESC STA FE'],
    naoAtivados: ['OBRA LIMA: Devido a trabalhadores no local'],
    plantoesPassados: ['OBRA GILMAR: Cliente perdeu o controle do alarme', 'Tivemos várias oscilações devido a tempestade']
  });

  // Lista específica de Sem Comunicação (pode ser alimentada pelo relatório anterior)
  semComunicacao = signal([
    { local: 'IBL SKATEBOARDS', motivo: 'Falha Causada por Manutenção no Sistema Zins' },
    { local: 'CS MARCELO ANDRADE', motivo: 'QTH em Obra' }
  ]);

  generatedText = computed(() => {
    const data = new Date().toLocaleDateString('pt-BR');
    const operador = this.authService.currentUser().name;
    const cats = this.qthCategories();

    let text = `*FINAL DE PLANTÃO PUBLICOS/PRIVADOS*\n`;
    text += `*${data}*\n`;
    text += `*OPERADOR:* ${operador}\n`;
    text += `*TÁTICO:* ${this.tatico()}\n`;
    text += `*Limpeza da Base:* ${this.limpezaBase()}\n\n`;

    text += `*Informações sobre o plantão:*\n${this.infosPlantao()}\n\n`;

    text += `*QTH'S COM BATERIA FRACA:*\n-${cats.bateriaFraca.join('\n-')}\n\n`;
    text += `*QTH'S COM MUITA OCISLAÇÃO*\n-${cats.oscilacao.join('\n-')}\n\n`;
    text += `*MULTIPLOS DISPAROS NO SISTEMA:*\n-${cats.disparos.join('\n-')}\n\n`;
    text += `*ORDENS DE SERVIÇOS ABERTAS:*\n-${cats.osAbertas.join('\n-')}\n\n`;
    text += `*QTH QUE O TÁTICO NÃO ENCONTROU A CHAVE:*\n-${cats.semChave.join('\n-')}\n\n`;
    text += `*QTH'S PRIVADOS/PUBLICOS NAO ATIVADOS:*\n-${cats.naoAtivados.join('\n-')}\n\n`;
    text += `*PLANTÕES PASSADOS:*\n-${cats.plantoesPassados.join('\n-')}\n\n`;

    text += `*QTH'S SEM COMUNICAÇÃO:*\n`;
    this.semComunicacao().forEach(c => {
      text += `*-${c.local.toUpperCase()}:* ${c.motivo}\n`;
    });

    return text;
  });

  copyReport() {
    navigator.clipboard.writeText(this.generatedText());
  }

  addItem(category: keyof ReturnType<typeof this.qthCategories>) {
    this.qthCategories.update(prev => ({
      ...prev,
      [category]: [...prev[category], '']
    }));
  }
}
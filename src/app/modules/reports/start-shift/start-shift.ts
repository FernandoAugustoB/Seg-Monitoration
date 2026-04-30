import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-start-shift',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './start-shift.html'
})
export class StartShift {
  authService = inject(AuthService);

  // Informações Gerais
  tatico = signal('Luis');
  sistemaOk = signal(true);
  telefoneOk = signal(true);
  volume = signal(60);

  // Lista de Clientes Sem Comunicação (Mock inicial baseado no seu exemplo)
  clientesSemComunicacao = signal([
    { nome: 'IBL SKATEBOARDS', sc: '18/03 14:18', atendimento: 'FALHA CAUSADO POR MANUTENÇÃO NO SISTEMA ZINS' },
    { nome: 'CS MARCELO ANDRADE', sc: '24/03 08:49', atendimento: 'EM OBRAS' },
    { nome: 'BARRACÃO SERGIO', sc: '24/03 11:22', atendimento: 'TEMPARARIAMENTE SEM SERVIÇO' }
  ]);

  // Função para gerar o texto formatado para WhatsApp
  generatedText = computed(() => {
    const data = new Date().toLocaleDateString('pt-BR');
    const operador = this.authService.currentUser().name;
    
    let text = `*INICIO DE PLANTÃO PUBLICOS/PRIVADOS*\n`;
    text += `*${data}*\n`;
    text += `*Operador:* ${operador}\n`;
    text += `*Tático:* ${this.tatico()}\n`;
    text += `*Sistema:* ${this.sistemaOk() ? 'Ok' : 'Falha'}\n`;
    text += `*Telefone:* ${this.telefoneOk() ? 'Ok' : 'Falha'}\n`;
    text += `*Volume do celular e computador:* ${this.volume()}%\n\n`;
    text += `Clientes privados/Públicos Sem Comunicação:\n\n`;

    this.clientesSemComunicacao().forEach(c => {
      text += `*${c.nome.toUpperCase()}*\n`;
      text += `*S/C:* ${c.sc}\n`;
      text += `*ATENDIMENTO:* ${c.atendimento.toUpperCase()}\n\n`;
    });

    return text;
  });

  copyToClipboard() {
    navigator.clipboard.writeText(this.generatedText());
    alert('Relatório copiado para a área de transferência!');
  }

  removeCliente(index: number) {
    this.clientesSemComunicacao.update(list => list.filter((_, i) => i !== index));
  }
}
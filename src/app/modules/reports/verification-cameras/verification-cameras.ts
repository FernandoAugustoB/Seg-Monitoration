import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';

interface CameraOccurrence {
  id: string;
  cameraName: string;
  issue: string;
  since: string;
  reason: string;
  treated: boolean;
  treatmentNotes?: string;
  ignored: boolean;
}

interface ClientVerification {
  id: string;
  clientName: string;
  ignored: boolean;
  occurrences: CameraOccurrence[];
}

@Component({
  selector: 'app-verification-cameras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verification-cameras.html'
})
export class VerificationCameras {
  authService = inject(AuthService);
  
  // Lista principal de verificação
  clientsVerification = signal<ClientVerification[]>([
    {
      id: '1',
      clientName: 'ESC JOAQUIM MATSUMO',
      ignored: false,
      occurrences: [
        { id: '101', cameraName: 'CAM 02', issue: 'Parou de funcionar', since: '03/03 às 14:32', reason: 'Desconhecido', treated: false, ignored: false },
        { id: '102', cameraName: 'CAM 07', issue: 'Imagem distorcida à noite', since: '09/03 às 21:03', reason: 'Desconhecido', treated: true, treatmentNotes: 'O.S 442 aberta', ignored: false }
      ]
    }
  ]);

  // Gera o texto formatado ignorando o que foi marcado como "Tratado" ou "Ignorado"
  generatedText = computed(() => {
    const data = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    let text = `*VERIFICAÇÃO DAS CÂMERAS PÚBLICAS*\n*${data} - OK*\n\n`;

    this.clientsVerification().filter(c => !c.ignored).forEach(client => {
      const activeIssues = client.occurrences.filter(o => !o.treated && !o.ignored);
      
      if (activeIssues.length > 0) {
        text += `*${client.clientName.toUpperCase()}:* ${activeIssues.map(i => `${i.cameraName} ${i.issue}`).join(', ')}\n`;
        activeIssues.forEach(i => {
          text += `*${activeIssues.length > 1 ? i.cameraName + ' ' : ''}Desde:* ${i.since} *Motivo:* ${i.reason}\n`;
        });
        text += `\n`;
      }
    });

    return text.trim();
  });

  addOccurrence(clientId: string) {
    this.clientsVerification.update(clients => clients.map(c => {
      if (c.id === clientId) {
        c.occurrences.push({
          id: Date.now().toString(),
          cameraName: 'Nova CAM',
          issue: '',
          since: '',
          reason: 'Desconhecido',
          treated: false,
          ignored: false
        });
      }
      return c;
    }));
  }

  removeOccurrence(clientId: string, occId: string) {
    this.clientsVerification.update(clients => clients.map(c => {
      if (c.id === clientId) {
        c.occurrences = c.occurrences.filter(o => o.id !== occId);
      }
      return c;
    }));
  }

  copyReport() {
    navigator.clipboard.writeText(this.generatedText());
  }
}
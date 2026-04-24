import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { Message } from '../models/message.model';
import { MOCK_MESSAGES } from '../../../constants/mock-data';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages = new BehaviorSubject<Message[]>(MOCK_MESSAGES);

  messages$ = this.messages.asObservable();

  constructor() {}

  getMessages(usuarioId: string): Observable<Message[]> {
    const resultado = this.messages.value.filter(
      m =>
        m.destinatatios.usuarioIds?.includes(usuarioId) ||
        (m.destinatatios.grupoIds && m.destinatatios.grupoIds.length > 0)
    );
    return of(resultado).pipe(delay(200));
  }

  getUnreadMessages(usuarioId: string): Observable<Message[]> {
    const resultado = this.messages.value.filter(
      m =>
        (m.destinatatios.usuarioIds?.includes(usuarioId) ||
          (m.destinatatios.grupoIds && m.destinatatios.grupoIds.length > 0)) &&
        !m.visualizado
    );
    return of(resultado).pipe(delay(200));
  }

  sendMessage(message: Omit<Message, 'id' | 'dataEnvio'>): Observable<Message> {
    const novaMensagem: Message = {
      ...message,
      id: this.generateId(),
      dataEnvio: new Date()
    };

    const messagesAtualizadas = [...this.messages.value, novaMensagem];
    this.messages.next(messagesAtualizadas);

    return of(novaMensagem).pipe(delay(300));
  }

  markAsRead(messageId: string): Observable<void> {
    const messagesAtualizadas = this.messages.value.map(m =>
      m.id === messageId
        ? {
            ...m,
            visualizado: true,
            dataVisualizacao: new Date()
          }
        : m
    );

    this.messages.next(messagesAtualizadas);
    return of(void 0).pipe(delay(150));
  }

  deleteMessage(id: string): Observable<void> {
    const messagesAtualizadas = this.messages.value.filter(m => m.id !== id);
    this.messages.next(messagesAtualizadas);
    return of(void 0).pipe(delay(150));
  }

  private generateId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { Card, CardStatus } from '../models/card.model';
import { MOCK_CARDS } from '../../../constants/mock-data';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cards = new BehaviorSubject<Card[]>(MOCK_CARDS);
  private selectedCard = new BehaviorSubject<Card | null>(null);

  cards$ = this.cards.asObservable();
  selectedCard$ = this.selectedCard.asObservable();

  constructor() {}

  getCards(): Observable<Card[]> {
    return this.cards$.pipe(delay(300));
  }

  getCardsByStatus(status: CardStatus): Observable<Card[]> {
    const resultado = this.cards.value.filter(c => c.status === status);
    return of(resultado).pipe(delay(200));
  }

  getCardsByCliente(clienteId: string): Observable<Card[]> {
    const resultado = this.cards.value.filter(c => c.clienteId === clienteId);
    return of(resultado).pipe(delay(200));
  }

  getCardById(id: string): Observable<Card | undefined> {
    return of(this.cards.value.find(c => c.id === id)).pipe(delay(200));
  }

  selectCard(card: Card): void {
    this.selectedCard.next(card);
  }

  getSelectedCard(): Card | null {
    return this.selectedCard.value;
  }

  addCard(card: Omit<Card, 'id' | 'criadoEm' | 'atualizadoEm' | 'comentarios' | 'logs'>): Observable<Card> {
    const novoCard: Card = {
      ...card,
      id: this.generateId(),
      criadoEm: new Date(),
      atualizadoEm: new Date(),
      comentarios: [],
      logs: [
        {
          id: this.generateId(),
          acao: 'criado',
          usuario: card.criadoPor,
          data: new Date(),
          descricao: 'Card criado'
        }
      ]
    };

    const cardsAtualizados = [...this.cards.value, novoCard];
    this.cards.next(cardsAtualizados);

    return of(novoCard).pipe(delay(300));
  }

  updateCard(id: string, dados: Partial<Card>): Observable<Card | null> {
    const cardsAtualizados = this.cards.value.map(c =>
      c.id === id
        ? {
            ...c,
            ...dados,
            id: c.id,
            criadoEm: c.criadoEm,
            atualizadoEm: new Date()
          }
        : c
    );

    const cardAtualizado = cardsAtualizados.find(c => c.id === id) || null;
    this.cards.next(cardsAtualizados);

    if (this.selectedCard.value?.id === id && cardAtualizado) {
      this.selectedCard.next(cardAtualizado);
    }

    return of(cardAtualizado).pipe(delay(300));
  }

  moveCard(cardId: string, novoStatus: CardStatus, usuario: string): Observable<Card | null> {
    const card = this.cards.value.find(c => c.id === cardId) || null;
    if (card) {
      card.status = novoStatus;
      this.cards.next([...this.cards.value]);
    }
    return of(card).pipe(delay(300));
  }

  addCommentToCard(cardId: string, comment: any): Observable<Card | null> {
    const cardsAtualizados = this.cards.value.map(c =>
      c.id === cardId
        ? {
            ...c,
            comentarios: [
              ...c.comentarios,
              {
                id: this.generateId(),
                ...comment,
                data: new Date()
              }
            ]
          }
        : c
    );

    const cardAtualizado = cardsAtualizados.find(c => c.id === cardId) || null;
    this.cards.next(cardsAtualizados);

    if (this.selectedCard.value?.id === cardId && cardAtualizado) {
      this.selectedCard.next(cardAtualizado);
    }

    return of(cardAtualizado).pipe(delay(200));
  }

  deleteCard(id: string): Observable<boolean> {
    const cardsAtualizados = this.cards.value.filter(c => c.id !== id);
    this.cards.next(cardsAtualizados);

    if (this.selectedCard.value?.id === id) {
      this.selectedCard.next(null);
    }

    return of(true).pipe(delay(300));
  }

  private generateId(): string {
    return `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

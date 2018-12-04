import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

// Method to add a message
  add(message: string) {
    this.messages.push(message);
  }

// method to clear a message
  clear() {
    this.messages = [];
  }
}

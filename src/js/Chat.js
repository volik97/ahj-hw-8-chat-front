/* eslint-disable max-len */
/* eslint-disable no-console */
import API from './API';
import { markupUser, markupMessage } from './markup';

function getTime() {
  const date = new Date();
  return (`${String(date.getHours())
    .padStart(2, '0')}:${String(date.getMinutes())
    .padStart(2, '0')} ${String(date.getDate() + 1)
    .padStart(2, '0')}.${String(date.getMonth() + 1)
    .padStart(2, '0')}.${date.getFullYear()}
  `);
}

export default class Chat {
  constructor(container, currentUser) {
    this.currentUser = currentUser;
    this.users = [];
    this.messages = [];

    this.container = container;
    this.listUsers = container.querySelector('.listUsers');
    this.form = container.querySelector('.chatForm');
    this.input = container.querySelector('input');

    this.ws = new WebSocket('ws://localhost:7070/ws');}

  async init() {
    this.ws.addEventListener('open', () => {
      console.log('connected');

      this.ws.send('hello');
    });

    this.ws.addEventListener('message', (evt) => {
      [this.users, this.messages] = JSON.parse(evt.data);

      this.getUsers(this.users);
      this.getMessages(this.messages);
    });

    this.ws.addEventListener('close', async (evt) => {
      console.log('connection closed', evt);
    });

    this.ws.addEventListener('error', () => {
      console.log('error');
    });

    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send('new user');
    }

    this.form.addEventListener('submit', (e) => this.sendMessage(e));
  }

  getUsers(users) {
    const searchUser = this.listUsers.querySelector('.user');

    if (!searchUser) {
      for (const user of users) {
        if (user.name === this.currentUser) {
          this.listUsers.insertAdjacentHTML('beforeend', markupUser(user, 'You'));
        }

        if (user.name !== this.currentUser) {
          this.listUsers.insertAdjacentHTML('beforeend', markupUser(user));
        }
      }
    }
  }

  getMessages(messages) {
    const listMessages = this.container.querySelector('.listMessages');
    listMessages.innerHTML = '';

    messages.forEach((message) => {
      if (message.from === this.currentUser) {
        listMessages.insertAdjacentHTML('beforeend', markupMessage(message, 'You'));
      }

      if (message.from !== this.currentUser) {
        listMessages.insertAdjacentHTML('beforeend', markupMessage(message));
      }
    });
  }

  async sendMessage(e) {
    e.preventDefault();

    const message = {
      message: this.input.value,
      from: this.currentUser,
      date: getTime(),
    };

    const api = new API('http://localhost:7070/message');
    const response = await api.send(message);
    if (response.status === 200 && response.ok) {
      this.input.value = '';
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send('message');
      }
    }
  }
}

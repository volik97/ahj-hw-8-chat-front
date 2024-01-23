/* eslint-disable no-console */
/* eslint-disable no-alert */
import { markupChat } from '../markup';
import Chat from '../Chat';

export default function modalChat(board, nickName) {
  board.insertAdjacentHTML('afterbegin', markupChat());

  const container = board.querySelector('.container');

  const chat = new Chat(container, nickName);
  chat.init();
}

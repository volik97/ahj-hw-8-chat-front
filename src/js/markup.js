/* eslint-disable indent */
export default function markupLoginForm() {
  return `
    <form class="loginForm">
      <h2 class="header">Выберите псевдоним</h2>
      <input class="loginForm_input" name="name">
      <button class="btn">Продолжить</button>
    </form>
  `;
}

export function markupChat() {
  return `
    <div class="container">
      <div class="listUsers"></div>
      <div class="chat">
        <div class="listMessages"></div>
        <form class="chatForm">
          <input type="text" placeholder="Type your message here">
        </form>
      </div>
    </div>
  `;
}

export function markupUser(user, owner) {
  return `
    <div class="user ${owner}" data-id="${user.id}">
      <div class="userAvatar"></div>
      ${owner ? `
        <p class="userName" title="${user.name}">You</p>`
        : `<p class="userName">${user.name}</p>`}
    </div>
  `;
}

export function markupMessage(message, owner) {
  return `
    ${owner
    ? `<div class="message ${owner}">
        <p class="messageAuthor ${owner}">You, 
          <span class="messagedate ${owner}">${message.date.toLocaleString()}</span>
        </p>`

    : `<div class="message">
        <p class="messageAuthor">${message.from}, 
          <span class="messagedate">${message.date.toLocaleString()}</span>
          </p>`
    }
      <p class="messageСontent">${message.message}</p>
    </div>
  `;
}

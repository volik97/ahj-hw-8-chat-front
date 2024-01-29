import markupLoginForm from '../markup';
import modalChat from './modalChat';
import API from '../API';

export default function modalLogin(board, URL) {
  board.insertAdjacentHTML('afterbegin', markupLoginForm());

  const form = board.querySelector('.loginForm');

  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const api = new API(`${URL}/login`);

    const modalInput = evt.target.querySelector('.loginForm_input');

    if (!modalInput.value) {
      modalInput.classList.add('inputEmpty');
      setTimeout(() => modalInput.classList.remove('inputEmpty'), 2000);
    } else {
      const formData = { name: modalInput.value };
      const response = await api.send(formData);

      if (response.status === 204 && response.ok) {
        form.reset();
        form.remove();

        modalChat(board, formData.name);
      } else {
        modalInput.classList.add('inputEmpty');
        form.insertAdjacentHTML('beforeend', '<div class="warning">Пользователь с таким именем уже существует.</div>');
        const warning = document.querySelector('.warning');

        setTimeout(() => {
          modalInput.classList.remove('inputEmpty');
          warning.remove();
        }, 2000);
      }
    }
  });
}

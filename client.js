console.log('Meow!');

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/miaus'

loadingElement.style.display = 'none';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('content');

  const miau = {
    name,
    content
  }

  form.style.display = 'none';
  loadingElement.style.display = '';

  await fetch(API_URL, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(miau)
  }).then(response => response.json())
    .then(nuevoMiau => console.log(nuevoMiau))
    .catch(error => console.log(error));

});

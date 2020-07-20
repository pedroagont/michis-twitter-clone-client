console.log('Meow!');

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const miausElement = document.querySelector('.miaus');
const API_URL = 'http://localhost:5000/miaus'

const getMiaus = async () => {
  miausElement.innerHTML = '';
  await fetch(API_URL)
  .then(response => response.json())
  .then(miaus => {
    miaus.forEach(miau => {
      const div = document.createElement('div');
      div.setAttribute('class', 'card border-primary my-3 p-2');

      const name = document.createElement('h5');
      name.textContent = miau.name
      name.setAttribute('class', 'card-title');

      const content = document.createElement('p');
      content.textContent = miau.content;
      content.setAttribute('class', 'card-text');

      div.appendChild(name);
      div.appendChild(content);
      miausElement.appendChild(div);

      loadingElement.style.display = 'none';
    })
  })
  .catch(error => console.log(error));
}

getMiaus();

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
    .then(nuevoMiau => {
      console.log(nuevoMiau);
      form.reset();
      loadingElement.style.display = 'none';
      form.style.display = '';
      getMiaus();
    })
    .catch(error => console.log(error));

});

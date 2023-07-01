
const form = document.getElementById('cadastrar-form');
const nomeInput = document.getElementById('nome-input');
const telefoneInput = document.getElementById('telefone-input');
const listaContatos = document.getElementById('contatos-lista');

let contatos = [];

let modoEdicao = false;
let contatoIndex = null;

    function renderizarContatos() {
        listaContatos.innerHTML = '';
      
        contatos.sort((a, b) => a.nome.localeCompare(b.nome));
      
        contatos.forEach((contato, index) => {
          const li = document.createElement('li');
          const spanNome = document.createElement('span');
          spanNome.textContent = contato.nome;
          spanNome.style.color = 'yellow';
          const spanTelefone = document.createElement('span');
          spanTelefone.textContent = contato.telefone;
          spanTelefone.style.color = 'yellow';
          const buttonEditar = document.createElement('button');
          buttonEditar.textContent = 'Editar';
          buttonEditar.addEventListener('click', () => editarContato(index));
          const buttonRemover = document.createElement('button');
          buttonRemover.textContent = 'Remover';
          buttonRemover.addEventListener('click', () => removerContato(index));
      
          li.append(spanNome, spanTelefone, buttonEditar, buttonRemover);
          listaContatos.appendChild(li);
        });
      }
      

function cadastrarContato(event) {
    event.preventDefault();

    const nome = nomeInput.value;
    const telefone = telefoneInput.value;

    if (modoEdicao) {
        contatos[contatoIndex].nome = nome;
        contatos[contatoIndex].telefone = telefone;

        nomeInput.value = '';
        telefoneInput.value = '';

        modoEdicao = false;
        contatoIndex = null;

        form.querySelector('button[type="submit"]').innerText = 'Cadastrar';
    } else {
        contatos.push({ nome, telefone });

        nomeInput.value = '';
        telefoneInput.value = '';
    }

    renderizarContatos();
}

function editarContato(index) {
    const contato = contatos[index];

    nomeInput.value = contato.nome;
    telefoneInput.value = contato.telefone;

    modoEdicao = true;
    contatoIndex = index;

    form.querySelector('button[type="submit"]').innerText = 'Salvar';
}


function removerContato(index) {
    if (modoEdicao && index === contatoIndex) {
        
        modoEdicao = false;
        contatoIndex = null;
        nomeInput.value = '';
        telefoneInput.value = '';
        form.querySelector('button[type="submit"]').innerText = 'Cadastrar';
    }

    contatos.splice(index, 1);

    renderizarContatos();
}

form.addEventListener('submit', cadastrarContato);

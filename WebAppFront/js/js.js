var tbody = document.querySelector('table tbody');
var aluno = {};


function Cadastrar() {

  aluno.nome = document.querySelector('#nome').value;
  aluno.sobrenome = document.querySelector('#sobrenome').value;
  aluno.telefone = document.querySelector('#telefone').value;
  aluno.ra = document.querySelector('#ra').value;
  if (aluno.id === undefined || aluno.id === 0) {
    salvarEstudantes('POST', 0, aluno);
  } else {
    salvarEstudantes('PUT', aluno.id, aluno);

  }

  $('#exampleModal').modal('hide')

  carregaEstudantes();
}


function novoAluno() {

  var btnSalvar = document.querySelector('#btnSalvar');
  var btnCancelar = document.querySelector('#btnCancelar');
  var titulo = document.querySelector('#titulo');


  document.querySelector('#nome').value = '';
  document.querySelector('#sobrenome').value = '';
  document.querySelector('#telefone').value = '';
  document.querySelector('#ra').value = '';

  aluno = {};

  btnSalvar.textContent = 'Cadastrar';
  btnCancelar.textContent = 'Limpar';
  titulo.textContent = 'Cadastrar Aluno';

  $('#exampleModal').modal('show')

}




function Cancelar() {
  var btnSalvar = document.querySelector('#btnSalvar');
  var btnCancelar = document.querySelector('#btnCancelar');
  var titulo = document.querySelector('#titulo');


  document.querySelector('#nome').value = '';
  document.querySelector('#sobrenome').value = '';
  document.querySelector('#telefone').value = '';
  document.querySelector('#ra').value = '';

  aluno = {};

  btnSalvar.textContent = 'Cadastrar';
  btnCancelar.textContent = 'Limpar';
  titulo.textContent = 'Cadastrar Aluno';

  $('#exampleModal').modal('hide')
}



function carregaEstudantes() {
  tbody.innerHTML = '';
  var xhr = new XMLHttpRequest();

  xhr.open(`GET`, `http://localhost:50372/api/Aluno/Recuperar`, true);

  xhr.onprogress = function () {
    console.log('LOADING', xhr.readyState);
  }

  xhr.onerror = function () {
    console.log('ERRO', xhr.readyState);
  }

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var estudantes = JSON.parse(this.responseText);
      for (var index in estudantes) {
        adicionaLinha(estudantes[index]);
      }
    }
    else if(this.status == 500){
      var erro = JSON.parse(this.responseText);
      console.log(erro);
      
    }
  }
    xhr.send();
  
}




function salvarEstudantes(metodo, id, corpo) {
  var xhr = new XMLHttpRequest();

  if (id === undefined || id === 0)
    id = '';

  xhr.open(metodo, `http://localhost:50372/api/Aluno/Recuperar/${id}`, false);

  if (corpo !== undefined) {

    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(corpo));
  }
}

function excluirEstudante(id) {
  var xhr = new XMLHttpRequest();

  xhr.open('DELETE', `http://localhost:50372/api/Aluno/${id}`, false);

  xhr.send();
}

function excluir(estudante) {
  bootbox.confirm({
    message: `Excluir o aluno ${estudante.nome}`,
    buttons: {
      confirm: {
        label: 'Sim',
        className: 'btn-success'
      },
      cancel: {
        label: 'Não',
        className: 'btn-danger'
      }
    },
    callback: function (result) {
      if (result) {
        excluirEstudante(estudante.id);
        carregaEstudantes();
      }
    }
  });
}

carregaEstudantes();

function editarEstudante(estudante) {
  var btnSalvar = document.querySelector('#btnSalvar');
  var btnCancelar = document.querySelector('#btnCancelar');
  var titulo = document.querySelector('#titulo');
  var Modaltitulo = document.querySelector('#exampleModalLabel');

  document.querySelector('#nome').value = estudante.nome;
  document.querySelector('#sobrenome').value = estudante.sobrenome;
  document.querySelector('#telefone').value = estudante.telefone;
  document.querySelector('#ra').value = estudante.ra;


  btnSalvar.textContent = 'Salvar';
  btnCancelar.textContent = 'Cancelar';
  //titulo.textContent = `Editar Aluno ${estudante.nome}`;
  Modaltitulo.textContent = `Editar Aluno ${estudante.nome}`;
  aluno = estudante;

  console.log(aluno);
  console.log(estudante);


}

function adicionaLinha(estudante) {
  var trow = `<tr>
                <td>${estudante.nome}</td>
                <td>${estudante.sobrenome}</td>
                <td>${estudante.telefone}</td>
                <td>${estudante.ra}</td>
                <td><button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick ='editarEstudante(${JSON.stringify(estudante)})'>Editar</button></td>
                <td><button class="btn btn-danger" onclick ='excluir(${JSON.stringify(estudante)})'>Excluir</button></td>
              </tr>`

  tbody.innerHTML += trow;
}

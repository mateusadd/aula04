var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res) {

  if(!global.usuariocodigo || global.usuariocodigo == 0) {

    res.redirect('/login')

  }

  const registros = await global.db.listarLivros()
  const usuario = global.usuariologin
  res.render('index', { registros, usuario })
  
});

router.get('/login', function(req,res) {

  res.render('login')

})

router.get('/sair', function (req, res) {

  global.usuariocodigo = 0
  res.redirect('/')

})

router.post('/login', async function(req, res) {

  const usuario = req.body.edtUsuario
  const senha = req.body.edtSenha

  const user = await global.db.buscarUsuario({usuario, senha})

  global.usuariocodigo = user.usucodigo
  global.usuariologin = user.usulogin
  res.redirect('/')

})

router.get('/novoLivro', function(req, res){

  res.render('formLivro', { titulo: 'Novo Livro', acao: '/novoLivro', livro:{} })

});

router.post('/novoLivro', async function(req, res){

  const titulo = req.body.edtTitulo
  const ano = parseInt(req.body.edtAno)
  const genero = parseInt(req.body.selGenero)

  await global.db.inserirLivro({titulo, ano, genero})
  res.redirect('/')

});

router.get('/alteraLivro/:id', async function(req,res){

  const codigo = parseInt(req.params.id)
  const livro = await global.db.recuperarLivro(codigo)
  res.render('formLivro', { titulo:'Alteração de Livro', acao:'/alteraLivro/'+codigo, livro })

})

router.get('/apagaLivro/:id', async function(req,res){

  const codigo = parseInt(req.params.id)
  await global.db.apagarLivro(codigo)
  res.redirect('/')

})

router.post('/alteraLivro/:id', async function(req, res) {

  const codigo = parseInt(req.params.id)
  const titulo = req.body.edtTitulo
  const ano = parseInt(req.body.edtAno)
  const genero = parseInt(req.body.selGenero)

  await global.db.alterarLivro({codigo, titulo, ano, genero})
  res.redirect('/')

})

router.get('/boot', function(req,res) {

  res.render('boot')

})

module.exports = router;

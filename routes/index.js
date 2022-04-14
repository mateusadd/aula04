var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res) {
  const registros = await global.db.listarLivros()
  res.render('index', { registros });
});

router.get('/novoLivro', function(req, res){

  res.render('formLivro', { titulo: 'Novo Livro', acao: '/novoLivro' })

});

router.post('/novoLivro', async function(req, res){

  const titulo = req.body.edtTitulo
  const ano = parseInt(req.body.edtAno)
  const genero = parseInt(req.body.selGenero)

  await global.db.inserirLivro({titulo, ano, genero})
  res.redirect('/')

});

module.exports = router;

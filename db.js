const mysql = require('mysql2/promise')


async function conectarBD()
{
    // 1º verifica se já existe uma conexão ativa no objeto Global
    if (global.connection && global.connection.state !== 'disconnected')
    {
        return global.connection
    }

    // se connection não existe, então será criada e armazenada em global

    // mysql://usuario:senha@servidor:porta/bancodedados
    //const conString = 'mysql://root:@localhost:3306/livraria'
    //const connection = await mysql.createConnection(conString)

    const connection = await mysql.createConnection(
        {
            host     : 'localhost',
            port     : 3306,
            user     : 'root',
            password : '',
            database : 'livraria'
        }
    );

    global.connection = connection
    return global.connection
}


async function listarLivros()
{
    const conexao = await conectarBD()
    const [registros] = await conexao.query('select * from livros;')
    return registros
}

async function inserirLivro(livro){

    const conexao = await conectarBD()
    const sql = "insert into livros (livtitulo, livano, gencodigo) values (?,?,?);"
    return await conexao.query(sql, [livro.titulo, livro.ano, livro.genero])

}

async function apagarLivro(codigo) {

    const conexao = await conectarBD()
    const sql = "delete from livros where livcodigo=?;"
    return await conexao.query(sql,[codigo])

}

async function recuperarLivro(codigo) {

    const conexao = await conectarBD()
    const sql = 'select * from livros where livcodigo=?;'
    //return await conexao.query(sql, [codigo])
    const [livro] = await conexao.query(sql, [codigo])
    return livro[0]

}

async function alterarLivro(livro) {

    const conexao = await conectarBD()
    const sql = "update livros set livtitulo=?, livano=?, gencodigo=? where livcodigo=?;"
    await conexao.query(sql, [livro.titulo, livro.ano, livro.genero, livro.codigo])

}

async function buscarUsuario(us) {

    const conexao = await conectarBD()
    const sql = 'select * from usuarios where usulogin=? and ususenha=?'
    const [user] =  await conexao.query(sql, [us.usuario, us.senha])

    return user && user.length>0 ? user[0] : {}

}

conectarBD()

module.exports = { listarLivros, inserirLivro, apagarLivro, recuperarLivro, alterarLivro, buscarUsuario }
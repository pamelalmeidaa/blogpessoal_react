import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="flex justify-between  bg-indigo-900 px-20 py-3 text-white">
        <div className="text-xl font-bold uppercase">
            <Link to='/home'>Blog Pessoal</Link>
        </div>
        <div>
            <ul className="flex *:px-1">
              <li>Postagem</li>
              <li>Tema</li>
              <li>Cadastrar Tema</li>
              <li>Perfil</li>
              <li>Sair</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
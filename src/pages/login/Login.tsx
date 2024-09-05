import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import UsuarioLogin from '../../models/UsuarioLogin';
import { AuthContext } from '../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';

function Login() {

    /**
     * Cria a constante navigate, que receberá o hook useNavigate().
     * Através da constante navigate, o usuário será redirecionado 
     * para outras rotas da aplicação, conforme a necessidade.
     */
    const navigate = useNavigate()

    /**
     * Criamos uma desestruturação para receber os estados usuario 
     * e isLoading, além da função handleLogin(), disponíveis na
     * Context AuthContext, através do Hook useContext(). 
     */
    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    /**
     * Criamos um estado chamado usuarioLogin, que será inicializado 
     * como um objeto vazio do tipo UsuarioLogin, através do operador
     * as, que declara explicitamente ao TypeScript que o objeto vazio
     * será do tipo informado.
     * 
     * O estado usuarioLogin, será utilizado para armazenar os dados 
     * do usuário, que foram digitados no Formulário da Página de Login. 
     */
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    /**
     * Adicionamos o Hook useEffect, que será executado sempre que houver 
     * uma mudança no estado do usuário autenticado, ou seja, o estado 
     * usuario, que está armazenado na Context, que contém os dados do 
     * usuário autenticado.
     * 
     * Todas as vezes que ocorrer uma mudança no estado usuario, 
     * o Laço Condicional verificará se o token do usuário não está vazio. 
     * Se o token não estiver vazio, significa que o usuário está autenticado,
     * desta forma, a constante navigate será invocada para redirecionar o 
     * usuário para a rota do componente Home (/home). 
     */
    useEffect(() => {
        if(usuario.token !== ''){
            navigate("/home")
        }
    }, [usuario])

    /**
     * 
     * A função atualizarEstado é utilizada para atualizar dinamicamente os dados 
     * dos atributos do Estado usuarioLogin, que será enviado para a autenticação 
     * do usuário no Backend. 
     * 
     * Quando um elemento input do Formulário for modificado, ou seja, o usuário 
     * digitar alguma coisa no input, esta função criará um novo objeto usuarioLogin, 
     * mantendo todos os valores armazenados anteriormente, através do Operador Spread. 
     * Além disso, o atributo associado ao input, que teve o seu valor alterado, 
     * será atualizado com o novo valor digitado pelo usuário.
     * 
     * [e.target.name] 🡪 Propriedade name do input que foi modificado
     * 
     * e.target.value 🡪 Valor atual digitado dentro do input.
     * 
     * Como as propriedades name de todos os inputs, possuem os mesmos nomes dos atributos 
     * definidos no Estado usuarioLogin, o valor do input que foi modificado, será atribuído 
     * ao respectivo atributo do Estado usuarioLogin.
     */
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value,
        })
    }

    /**
     * A função login será responsável por lidar com o processo de autenticação do usuário, 
     * que será executada através do evento onSubmit do Formulário da Página de Login. 
     */
    function login(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        handleLogin(usuarioLogin)
    }

    /**
     * Exibe o conteúdo do Objeto usuarioLogin no console.
     * Em produção esta linha deve ser removida.
     */
    console.log(JSON.stringify(usuarioLogin))

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">

                {/* 
                    Adicionamos o Evento onSubmit no formulário, passando como argumento 
                    a função login, ou seja, quando o usuário enviar o formulário 
                    (clicar no botão entrar), a função definida dentro dos parênteses será
                    executada. 
                */}
                <form className="flex justify-center items-center flex-col w-1/2 gap-4" 
                    onSubmit={login}
                >
                    <h2 className="text-slate-900 text-5xl ">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-slate-700 rounded p-2"
                            /**
                             * Através da propriedade value, definimos que o valor dentro desse 
                             * input será o mesmo valor que estiver armazenado no respectivo 
                             * atributo do Estado usuarioLogin. 
                             */
                            value={usuarioLogin.usuario}
                            /**
                             * Através do evento onChange definiremos a função que será executada, 
                             * todas as vezes que o valor do input for modificado, ou seja, quando 
                             * o usuário digitar alguma coisa no input. 
                             * 
                             * A função (e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e), 
                             * receberá os dados do input que foi modificado, através do parâmetro e (Evento).
                             */
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            /**
                             * Através da propriedade value, definimos que o valor dentro desse 
                             * input será o mesmo valor que estiver armazenado no respectivo 
                             * atributo do Estado usuarioLogin. 
                             */
                            value={usuarioLogin.senha}
                            /**
                             * Através do evento onChange definiremos a função que será executada, 
                             * todas as vezes que o valor do input for modificado, ou seja, quando 
                             * o usuário digitar alguma coisa no input. 
                             * 
                             * A função (e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e), 
                             * receberá os dados do input que foi modificado, através do parâmetro e (Evento).
                             */
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button
                        type='submit'
                        className="rounded bg-indigo-400 flex justify-center
                                   hover:bg-indigo-900 text-white w-1/2 py-2">

                        {/* 
                            Através de uma Expressão Ternária, verificaremos qual é o valor atual do Estado 
                            isLoading, para definir se o Componente loader RotatingLines será exibido ou não, 
                            indicando se existe um processo que está em andamento, ou seja, se o processo de 
                            autenticação (login) do usuário foi ou não concluído. 

                            - Se o Estado isLoading estiver com o valor false, será exibido no botão o texto Entrar. 
                            - Se o Estado isLoading estiver com o valor true, será exibido no botão o Componente 
                              loader RotatingLines. 

                        */}
                        {isLoading ?

                            <RotatingLines
                                strokeColor='white'
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            />

                            :

                            <span>Entrar</span>

                        }
                        
                    </button>

                    <hr className="border-slate-800 w-full" />

                    <p>
                        Ainda não tem uma conta?{' '}
                        {/* 
                            Criamos um link para a Rota /cadastro - Componente Cadastro
                        */}
                        <Link to='/cadastro' className="text-indigo-800 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                <div className="fundoLogin hidden lg:block"></div>
            </div>
        </>
    );
}

export default Login;
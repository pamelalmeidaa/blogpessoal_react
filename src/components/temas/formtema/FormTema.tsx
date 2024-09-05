import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import Tema from '../../../models/Tema';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { RotatingLines } from 'react-loader-spinner';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function FormularioTema() {

const navigate = useNavigate();
const [tema,setTema] = useState<Tema>({} as Tema)
const [isLoading,setIsLoading] = useState<boolean>(false)
const {handleLogout,usuario} = useContext(AuthContext);
const token = usuario.token;
const { id } = useParams<{ id:string }>();

async function buscarPorId(id:string) {
    try {
        await buscar(`/temas/${id}`,setTema, {
            headers: {Authorization:token}
        });
      } catch (error:any) {
        if(error.toString().includes('401')) {
            handleLogout();
        }
      }
}

useEffect(() => {
    if(id !== undefined) {
        buscarPorId(id);
    }
  },[id])

useEffect(() => {
    if(token === '') {
      ToastAlerta('Você precisa estar logado','info');
      navigate('/')
    }
  },[token])

function retornar() {
    navigate('/temas')
}

function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      // Como o target name é igual o nome da propriedade,podemos manter o mesmo nome do input
      [e.target.name] : e.target.value
    })
} 

async function gerarNovoTema (e: FormEvent<HTMLFormElement>){
      e.preventDefault()

      setIsLoading(true)
      // Checar se é uma atualização ou se é um novo cadastro

      if (id !== undefined) {
        try {
            await atualizar('/temas',tema,setTema, {
                headers: {Authorization:token}
            });
            ToastAlerta('Tema atualizado com sucesso','sucesso');
    
          } catch (error:any) {
            if(error.toString().includes('403')) {
                handleLogout();
            }
          }

      } else {
        try {
            await cadastrar('/temas',tema,setTema, {
                headers: {Authorization:token}
            });
            ToastAlerta('Tema cadastrado com sucesso','sucesso');
    
          } catch (error:any) {
            if(error.toString().includes('403')) {
                handleLogout();
            }
          }
      }
      setIsLoading(false)
      retornar();
    } 
  
  
  return (

    <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id=== undefined ? 'Cadastrar tema' : 'Editar Tema'}
            </h1>

            <form onSubmit={gerarNovoTema} className="w-1/2 flex flex-col gap-4" >
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do tema</label>
                    <input
                        type="text"
                        placeholder="Descrição"
                        name='descricao'
                        className="border-2 border-slate-700 rounded p-2"
                        value={tema.descricao}
                        onChange = {(e:ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}

                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                   {isLoading ?
                        <RotatingLines 
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}/> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>}
                </button>
            </form>
    </div>
  )
}

export default FormularioTema
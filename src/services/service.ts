import axios from "axios";

const api = axios.create({
    baseURL : "https://blog-pessoal-nest-idy7.onrender.com",
})

export const cadastrarUsuario = async (url:string, dados: Object,setDados : Function) => {
    const resposta = await api.post(url,dados)
    setDados(resposta.data)
}
export const login = async (url:string, dados: Object,setDados : Function) => {
    const resposta = await api.post(url,dados)
    setDados(resposta.data);
}
// Função que envia requisições do tipo get
export const buscar = async (url:string,setDados : Function,header:Object) => {
    const resposta = await api.get(url,header)
    setDados(resposta.data);
}

// Função que envia requisições do tipo get
export const cadastrar = async (url:string,dados:Object,setDados : Function,header:Object) => {
    const resposta = await api.post(url,dados,header)
    setDados(resposta.data);
}


// Função que envia requisições do tipo get
export const atualizar = async (url:string,dados:Object,setDados : Function,header:Object) => {
    const resposta = await api.put(url,dados,header)
    setDados(resposta.data);
}

// Função que envia requisições do tipo get
export const deletar = async (url:string,header:Object) => {
     await api.delete(url,header)
}
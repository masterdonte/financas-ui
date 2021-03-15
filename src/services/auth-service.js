import storage from './storage-service'

export const USUARIO_LOGADO = '_usuario_logado'

export default class AuthService{
    static isUsuarioAutenticado(){
        const usuario = storage.obterItem(USUARIO_LOGADO)
        return usuario && usuario.id
    }

    static removerUsuarioAutenticado(){
        storage.removerItem(USUARIO_LOGADO)
    }

    static logar = (usuario) => {
        storage.adicionarItem(USUARIO_LOGADO, usuario)
    }

    static obterUsuarioLogado = () => {
        return storage.obterItem(USUARIO_LOGADO)
    }

}
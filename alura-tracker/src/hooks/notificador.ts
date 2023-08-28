import { TipoNotificacao } from "@/interfaces/INotificacao"
import { NOTIFICAR } from "@/store/tipo-mutacoes"
import { store } from "@/store"

type Notificador = {
    notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void
}

export default (): Notificador => {
    const notificar = (tipo, titulo, texto): void => {
        store.commit(NOTIFICAR, {
            titulo: titulo,
            texto: texto,
            tipo: tipo
        })
    }

    return {
        notificar
    }
}
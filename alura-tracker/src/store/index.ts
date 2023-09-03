import { EstadoTarefa, tarefa } from './modulos/tarefa/index';
import { projeto } from './modulos/projeto/index';
import { EstadoProjeto } from './modulos/projeto';
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore} from "vuex";
import { NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import ITarefa from "@/interfaces/ITarefa";

export interface Estado {
    notificacoes: INotificacao[],
    tarefa: EstadoTarefa,
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefa: {
            tarefas: []
        },
        notificacoes: [],
        projeto: {
            projetos: []
        }
    },
    mutations: {
        [NOTIFICAR](state, novaNotificacao:INotificacao){
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id !== novaNotificacao.id)
            }, 3000)
        }
    },
    actions: {},
    modules: {
        projeto, tarefa
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}
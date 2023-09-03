import  http from '@/http/index';
import ITarefa from '@/interfaces/ITarefa';
import { Estado } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";
import {
  ADICIONA_TAREFA,
  ALTERA_TAREFA,
  DEFINIR_TAREFAS,
} from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
  tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  mutations: {
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]){
        state.tarefas = tarefas
    },
    [ADICIONA_TAREFA](state,tarefa: ITarefa){
        state.tarefas.push(tarefa)
    },
    [ALTERA_TAREFA](state,tarefa: ITarefa){
        const index = state.tarefas.findIndex(taref => taref.id == tarefa.id)
        state.tarefas[index] = tarefa
    }
  },
  actions: {
    [OBTER_TAREFAS]({commit}){
        http.get('tarefas')
            .then(response => commit(DEFINIR_TAREFAS,response.data))
    },
    [CADASTRAR_TAREFA]({commit}, tarefa: ITarefa){
        return http.post('/tarefas', tarefa)
        .then(resposta => commit(ADICIONA_TAREFA,resposta.data))
    },
    [ALTERAR_TAREFA] ({commit}, tarefa: ITarefa){
        return http.put(`/tarefas/${tarefa.id}`, tarefa)
            .then(() => commit(ALTERA_TAREFA, tarefa))
    }
  },
};

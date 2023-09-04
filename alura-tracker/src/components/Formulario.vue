<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option
                        :value="projeto.id"
                        v-for="projeto in projetos"
                        :key="projeto.id"
                        >
                        {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @aoTemporizadorFinalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Temporizador from './Temporizador.vue';
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador'

export default defineComponent({
    name: "Formulario",
    emits: ['aoSalvarTarefa'],
    components: { Temporizador },
    setup(props, { emit} ) {
        const store = useStore()
        const { notificar } = useNotificador()
        const descricao = ref("")
        const idProjeto = ref("")
        const projetos  = computed(() => store.state.projeto.projetos)

        const finalizarTarefa = (tempoDecorrido: number): void => {
            const projeto = projetos.value.find((p) => p.id == idProjeto.value);
            if(!projeto) {
                notificar(
                    TipoNotificacao.FALHA,
                    'Ops!',
                    "Selecione um projeto antes de finalizar a tarefa!"
                );
                return;
            }
            emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao,
                projeto: projeto
            })
            descricao.value = ''
        }

        return {
            descricao,
            idProjeto,
            projetos,
            notificar,
            finalizarTarefa
        }
    }
})
</script>
<style>
.formulario{
    background-color: var(--bg-primario);
    color: var(--texto-primario);
}
</style>
<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Tarefa v-for="(tarefa,index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
        <Box v-if="listaEstaVazia">
          Você não está muito produtivo hoje :(
        </Box>
        <div class="modal" :class="{ 'is_active': tarefaSelecionada}" v-if="tarefaSelecionada">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Editando uma tarefa</p>
              <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
              <div class="field">
                <label for="descricaoDaTarefa" class="label">Descrição</label>
                <input
                    type="text"
                    class="input"
                    v-model="tarefaSelecionada.descricao"
                    id="descricaoDaTarefa"
                />
              </div>
            </section>
            <footer class="modal-card-foot">
              <button @click="alterarTarefa" class="button is-suceess">Salvar alterações</button>
              <button @click="fecharModal" class="button">Cancelar</button>
            </footer>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Box from '../components/Box.vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa'
import { useStore } from '@/store';
import { CADASTRAR_TAREFA, OBTER_TAREFAS } from '@/store/tipo-acoes';
import { OBTER_PROJETOS } from '@/store/tipo-acoes';
import { ALTERAR_PROJETO } from '@/store/tipo-acoes';


export default defineComponent({
    name: 'Tarefas',
    components: { Formulario, Tarefa, Box },
    data () {
      return {
        tarefaSelecionada: null as ITarefa | null,
        descricaoDaTarefa: ""
      }
    },
    computed: {
      listaEstaVazia () : boolean {
        return this.tarefas.length === 0
      }
    },
    methods: {
      salvarTarefa(tarefa: ITarefa){
        this.store.dispatch(CADASTRAR_TAREFA,tarefa)
      },
      selecionarTarefa(tarefa: ITarefa){
        this.tarefaSelecionada = tarefa
      },
      fecharModal(){
        this.tarefaSelecionada = null
      },
      alterarTarefa(){
        this.store.dispatch(ALTERAR_PROJETO, this.tarefaSelecionada)
          .then(() => this.fecharModal())
      }
    },
    setup(){
      const store = useStore()
      store.dispatch(OBTER_TAREFAS)
      store.dispatch(OBTER_PROJETOS)
      return {
        tarefas: computed(() => store.state.tarefas),
        store
      }
    }
})
</script>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Clube {
  id: number
  nome: string
}

interface Jogador {
  id: number
  nome: string
  clube: Clube
}

const clubes = ref<Clube[]>([])
const jogadores = ref<Jogador[]>([])

const nomeClube = ref('')
const nomeJogador = ref('')
const clubeSelecionado = ref<number | null>(null)

async function carregarClubes() {
  const response = await axios.get('http://localhost:8080/clubes')
  clubes.value = response.data
}

async function carregarJogadores() {
  const response = await axios.get('http://localhost:8080/jogadores')
  jogadores.value = response.data
}

async function criarClube() {

  await axios.post('http://localhost:8080/clubes', {
    nome: nomeClube.value
  })

  nomeClube.value = ''

  carregarClubes()
}

async function criarJogador() {

  await axios.post('http://localhost:8080/jogadores', {
    nome: nomeJogador.value,
    clube: {
      id: clubeSelecionado.value
    }
  })

  nomeJogador.value = ''

  carregarJogadores()
}

async function deletarClube(id: number) {
  await axios.delete(`http://localhost:8080/clubes/${id}`)

  carregarClubes()
}

async function deletarJogador(id: number) {
  await axios.delete(`http://localhost:8080/jogadores/${id}`)

  carregarJogadores()
}

onMounted(() => {
  carregarClubes()
  carregarJogadores()
})
</script>

<template>
  <div>

    <h1>Criar Clube</h1>

    <input
      v-model="nomeClube"
      placeholder="Nome do clube"
    />

    <button @click="criarClube">
      Criar
    </button>

    <hr>

    <h1>Clubes</h1>

    <ul>
      <li v-for="clube in clubes" :key="clube.id">

        {{ clube.nome }}

        <button @click="deletarClube(clube.id)">
          Deletar
        </button>

        <button @click="clubeSelecionado = clube.id">
          Editar
        </button>

      </li>
    </ul>

    <hr>

    <h1>Criar Jogador</h1>

    <input
      v-model="nomeJogador"
      placeholder="Nome do jogador"
    />

    <select v-model="clubeSelecionado">

      <option
        v-for="clube in clubes"
        :key="clube.id"
        :value="clube.id"
      >
        {{ clube.nome }}
      </option>

    </select>

    <button @click="criarJogador">
      Criar
    </button>

    <hr>

    <h1>Jogadores</h1>

    <ul>
      <li
        v-for="jogador in jogadores"
        :key="jogador.id"
      >

        {{ jogador.nome }}
        -
        {{ jogador.clube.nome }}

        <button @click="deletarJogador(jogador.id)">
          Deletar
        </button>

        <button @click="clubeSelecionado = jogador.clube.id">
          Editar
        </button>

      </li>
    </ul>

  </div>
</template>

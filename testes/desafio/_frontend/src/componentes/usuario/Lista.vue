<template>
    <v-container fluid>
        <v-layout column>
            <v-flex>
                <v-btn color="primary" class="ml-0 mb-4"
                    @click="obterUsuarios">
                    Obter Usuários
                </v-btn>
            </v-flex>
            <v-flex>
                <div v-if="erros" class="mb-4">
                    <Erros :erros="erros" />
                </div>
            </v-flex>
            <v-flex>
                <v-data-table :headers="headers" :items="usuarios"
                    hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.nome }}</td>
                        <td>{{ props.item.email }}</td>
                        <td>{{ props.item.perfis
                                .map(p => p.nome)
                                .join(', ') }}</td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Erros from '../comum/Erros'

export default {
    components: { Erros },
    data() {
        return {
            erros: null,
            usuarios: [],
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Nome', value: 'name' },
                { text: 'E-mail', value: 'email' },
                { text: 'Perfis', value: 'perfis' },
            ],
        }
    },
    methods: {
        obterUsuarios() {
            // Nesse caso, 'this' se trata de uma referência global
            console.log(this.$api) // É comum usar o '$' quando você cria alguma coisa global, isso evita conflitos
        }
    }
}
</script>

<style>

</style>

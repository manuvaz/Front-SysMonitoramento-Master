<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="#0000CD" dark v-on="on">Novo Gatilho</v-btn>
    </template>
    <v-card shaped>
      <v-card-title>
        <span class="headline">Cadastre um Novo Gatilho</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-text-field
              v-model="group.title"
              :counter="30"
              :rules="titleRules"
              label="Título"
              required
            ></v-text-field>

            <v-text-field
              v-model="group.title"
              :counter="30"
              :rules="titleRules"
              label="Emissor"
              required
            ></v-text-field>

            <v-text-field
              v-model="group.title"
              :counter="30"
              :rules="titleRules"
              label="Receptor"
              required
            ></v-text-field>

            <v-text-field
              v-model="group.title"
              :counter="30"
              :rules="titleRules"
              label="Condição"
              required
            ></v-text-field>

            <v-select
              v-model="group.title"
              :counter="30"
              :rules="[v => !!v || 'Tipo do Dispositivo é Obrigatório']"
                label="Tipo de Dispositivo"
                required
            ></v-select>

            

            <v-btn
              :disabled="!valid"
              color="success"
              class="v-btn--block"
              v-on:click="createTrigger"
            >
              Salvar
            </v-btn>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Trigger from "../datamodel/Trigger";
import createTrigger from "../services/createTrigger";

export default {
  name: "RegisterTrigger",
  data() {
    return {
      dialog: false,
      valid: true,
      title: "",
      lazy: false,
      titleRules: [
        (v) => !!v || "Título é Obrigatório",
        (v) =>
          (v && v.length <= 30) || "O título deve ter menos de 30 caracteres",
      ],
      listTriggers: [],
      group: new Trigger(),
    };
  },
  props: {},
  methods: {
    createTrigger() {
      createTrigger
        .createTrigger(this.trigger)
        .then(() => {
          this.group = new Trigger();
          this.dialog = false;
          this.$emit("list-triggers");
          this.$store.commit("SUCCESS", [
            { msg: "Gatilho Cadastrado com Sucesso!" },
          ]);
        })
        .catch((response) => {
          const errors = response.data.errors;
          this.$store.commit("ERROR", errors);
        });
    },
  },
};
</script>

<style scoped>
</style>
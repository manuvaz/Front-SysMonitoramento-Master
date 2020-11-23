<template>
  
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Titulo:
          </th>
          <th class="text-left">
            Emissor:
          </th>
          <th class="text-left">
            Receptor:
          </th>
          <th class="text-left">
            Condição:
          </th>
          <th class="text-left">
            Ação:
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in triggers"
          :key="item.title"
        >
          <td>{{ item.title }}</td>
          <td>{{ item.issuer }}</td>
          <td>{{ item.receiver }}</td>
          <td>{{ item.condition }}</td>
          <td>{{ item.action }}</td>
          <td md="2"><v-btn color="#FFFF00" v-on:click="enterGroup"> Editar </v-btn></td>
          <td><v-btn color="#FF000A" v-on:click="enterGroup"> Excluir </v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
   <!-- <v-list-item>
      <v-list-item-content >
        <v-list-item-title class="headline" >{{triggers.title}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn color="#0000CD" v-on:click="enterGroup"> Entrar </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <remove-trigger
          :group="trigger"
          v-on:list-triggers="listTriggersById"
        ></remove-trigger>
      </v-btn>
    </v-card-actions>--> 
</template>
<script>
//import RemoveTrigger from "./RemoveTrigger";


export default {
  name: "cardTrigger",
  props: {
    group: Object,
  },
  data: function() {
    return {
        triggers : [
          {
            title: 'gatilho 01',
            issuer: 'dispositivo 01',
            receiver: 'dispositivo 02',
            condition: '+15', 
            action: 'ligar'
          },
          {
            title: 'gatilho 02',
            issuer: 'dispositivo 12',
            receiver: 'dispositivo 14',
            condition: '-2', 
            action: 'desligar'
          }
        ]

    };
  },
  components: {
    //RemoveTrigger,
    
  },
  methods: {
    enterTrigger() {
      this.$router.push("/devices/groupId/" + this.group._id);
    },
    listTriggerById() {
      this.$emit("list-triggers");
    },
  },
};
</script>

<style scoped>
</style>
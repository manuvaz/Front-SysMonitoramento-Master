<template>
    <v-card
            elevation="10"
            max-width="344"
            class="mx-auto"
            color="#20B2AA"
            dark
    >

        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="headline">{{group.title}}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-card-actions>
            <v-btn
                    color="#0000CD"
                    v-on:click="enterGroup"
            >
                Entrar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
                <remove-group :group="group" v-on:list-groups="listGroupsById"></remove-group>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
    import RemoveGroup from "./RemoveGroup";
    export default {
        name: "carGroup",
        props: {
            group: Object
        },
        data() {
            return {}
        },
        components:{
            RemoveGroup
        },
        methods: {
            enterGroup() {
                this.$router.push("/devices/groupId/" + this.group._id);
            },
            listGroupsById(){
                this.$emit('list-groups');
            }
        }
    }
</script>

<style scoped>

</style>
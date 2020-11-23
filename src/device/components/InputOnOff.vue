<template>
    <div>
        <!--        <label :for="id + '_button'" :class="{'active': isActive}" class="toggle__button">-->
<!--        <span v-if="isActive" class="spanOnOff">{{ enableText }}</span>-->
<!--        <span v-if="! isActive" class="spanOnOff">{{ disabledText }}</span>-->

        <v-switch background="blue" color="#00ff00" v-model="checkedValue" class="shitch toggle__button"></v-switch>
        <!--        </label>-->
    </div>
</template>

<script>
    import Device from "../model/Device";

    export default {
        name: "InputOnOff",
        data() {
            return {
                expanded: [],
                singleExpand: false,
                currentState: this.defaultState
            }
        },
        methods: {
            publish(data) {
                let comando = {
                    deviceId: this.device._id,
                    msg: ""
                };
                if (data) {
                    comando.msg = "On";
                    this.$emit('event-On-Off',"Ligado");
                } else {
                    comando.msg = "Off";
                    this.$emit('event-On-Off',"Desligado");
                }
                 this.socket.emit("publish", comando);
            }
        },
        props: {
            device: new Device(),
            socket: Object,

            disabled: {
                type: Boolean,
                default: false
            },

            labelEnableText: {
                type: String,
                default: 'On'
            },

            labelDisableText: {
                type: String,
                default: 'Off'
            },

            id: {
                type: String,
                default: 'primary'
            },

            defaultState: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            defaultState: function defaultState() {
                this.currentState = Boolean(this.defaultState)
            }
        },
        computed: {
            // currentState() {
            //     return this.defaultState;
            // },

            isActive() {
                return this.currentState;
            },

            enableText() {
                return this.labelEnableText;
            },

            disabledText() {
                return this.labelDisableText;
            },
            checkedValue: {
                get() {
                    return this.currentState;
                },

                set(newValue) {
                    this.currentState = newValue;
                    //this.$emit('change', newValue);
                    this.publish(this.currentState);

                }
            }

        }
    }
</script>

<style scoped>
    .spanOnOff {
        float: left;
        margin-top: 20px;
        margin-right: 15px;
    }

    .shitch {
        margin-top: 20px;
    }
</style>
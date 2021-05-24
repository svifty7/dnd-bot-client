<template>
    <div id="app"
         class="app"
    >
        <spell-editor/>
    </div>
</template>

<script>
    import SpellEditor from '@/components/SpellEditor';

    export default {
        name: 'App',
        components: {
            SpellEditor
        },
    };
</script>

<style lang="scss">
    #app {
        display: block;
    }
</style>

<template>
  <div>
    {{ value }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, toRefs, onUpdated } from 'vue';
export default defineComponent({
  name: 'Login',
  setup() {
    const state = reactive({
      value: '123456',
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
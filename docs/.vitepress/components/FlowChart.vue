<template>
  <div id="flowchartContainer" ref="flowchartContainer"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import flowchart from 'flowchart.js';

const props = defineProps({
  flow: {
    type: String,
    required: true
  }
});

onMounted(() => {
  console.log(props.flow,  1111)
  const diagram = flowchart.parse(props.flow);
  diagram.drawSVG('flowchartContainer');
});
</script>

<style scoped>
/* 你可以在这里添加流程图的自定义样式 */
</style>
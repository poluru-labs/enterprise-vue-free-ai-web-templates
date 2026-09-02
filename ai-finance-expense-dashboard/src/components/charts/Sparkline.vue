<script setup>
const props = defineProps({
  values: { type: Array, default: () => [] },
  color: { type: String, default: '#047857' },
});

const points = props.values.length
  ? props.values
      .map((value, index) => {
        const max = Math.max(...props.values, 1);
        const min = Math.min(...props.values, 0);
        const span = max - min || 1;
        const x = (index / Math.max(props.values.length - 1, 1)) * 100;
        const y = 28 - ((value - min) / span) * 24;
        return `${x},${y}`;
      })
      .join(' ')
  : '0,14 100,14';
</script>

<template>
  <svg class="mint-spark" viewBox="0 0 100 32" role="img" aria-hidden="true">
    <polyline :points="points" fill="none" :stroke="color" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

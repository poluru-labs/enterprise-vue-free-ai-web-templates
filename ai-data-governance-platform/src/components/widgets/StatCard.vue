<script setup>
import Sparkline from '../charts/Sparkline.vue';

const TONE_COLOR = {
  brand: '#3368A0',
  info: '#4C7EAE',
  success: '#1F7A4D',
  warning: '#9A6700',
  danger: '#B42318',
};

const props = defineProps({
  label: { type: String, default: '' },
  value: { type: [String, Number], default: '' },
  hint: { type: String, default: '' },
  trend: { type: String, default: '' },
  trendValue: { type: String, default: '' },
  icon: { type: String, default: 'bi-graph-up' },
  tone: { type: String, default: 'brand' },
  sparkline: { type: Array, default: () => [] },
});

const color = TONE_COLOR[props.tone] || TONE_COLOR.brand;
const trendClass = props.trend === 'up' ? 'is-up' : props.trend === 'down' ? 'is-down' : 'is-flat';
const trendIcon =
  props.trend === 'up' ? 'bi-arrow-up-right' : props.trend === 'down' ? 'bi-arrow-down-right' : 'bi-dash';
</script>

<template>
  <article class="cbt-stat-card" :class="`tone-${tone}`">
    <div class="cbt-stat-top">
      <span class="cbt-stat-icon" :style="{ color }">
        <i :class="`bi ${icon}`" aria-hidden="true" />
      </span>
      <Sparkline v-if="sparkline.length" :values="sparkline" :color="color" />
    </div>
    <p class="cbt-stat-label">{{ label }}</p>
    <p class="cbt-stat-value">{{ value }}</p>
    <div class="cbt-stat-foot">
      <span v-if="trendValue" class="cbt-stat-trend" :class="trendClass">
        <i :class="`bi ${trendIcon}`" aria-hidden="true" />
        {{ trendValue }}
      </span>
      <span v-if="hint" class="cbt-stat-hint">{{ hint }}</span>
    </div>
  </article>
</template>

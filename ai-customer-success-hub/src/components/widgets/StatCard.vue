<script setup>
import Sparkline from '../charts/Sparkline.vue';

const TONE_COLOR = {
  brand: '#8A6410',
  info: '#C47B4A',
  success: '#3F6B4A',
  warning: '#A16207',
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
  <article class="mrg-stat-card" :class="`tone-${tone}`">
    <div class="mrg-stat-top">
      <span class="mrg-stat-icon" :style="{ color }">
        <i :class="`bi ${icon}`" aria-hidden="true" />
      </span>
      <Sparkline v-if="sparkline.length" :values="sparkline" :color="color" />
    </div>
    <p class="mrg-stat-label">{{ label }}</p>
    <p class="mrg-stat-value">{{ value }}</p>
    <div class="mrg-stat-foot">
      <span v-if="trendValue" class="mrg-stat-trend" :class="trendClass">
        <i :class="`bi ${trendIcon}`" aria-hidden="true" />
        {{ trendValue }}
      </span>
      <span v-if="hint" class="mrg-stat-hint">{{ hint }}</span>
    </div>
  </article>
</template>

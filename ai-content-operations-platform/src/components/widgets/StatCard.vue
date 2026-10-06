<script setup>
import Sparkline from '../charts/Sparkline.vue';

const TONE_COLOR = {
  brand: '#102E50',
  info: '#3D6A96',
  success: '#0F766E',
  warning: '#B45309',
  danger: '#BE123C',
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
  <article class="flo-stat-card">
    <div class="flo-stat-top">
      <span class="flo-stat-icon" :style="{ color }">
        <i :class="`bi ${icon}`" aria-hidden="true" />
      </span>
      <Sparkline v-if="sparkline.length" :values="sparkline" :color="color" />
    </div>
    <p class="flo-stat-label">{{ label }}</p>
    <p class="flo-stat-value">{{ value }}</p>
    <div class="flo-stat-foot">
      <span v-if="trendValue" class="flo-stat-trend" :class="trendClass">
        <i :class="`bi ${trendIcon}`" aria-hidden="true" />
        {{ trendValue }}
      </span>
      <span v-if="hint" class="flo-stat-hint">{{ hint }}</span>
    </div>
  </article>
</template>

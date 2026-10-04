<script setup>
import Sparkline from '../charts/Sparkline.vue';

const TONE_COLOR = {
  brand: '#FF5722',
  info: '#E64A19',
  success: '#059669',
  warning: '#D97706',
  danger: '#E11D48',
};

const TONE_SURFACE = {
  brand: '#ffffff',
  info: '#ffffff',
  success: '#ffffff',
  warning: '#ffffff',
  danger: '#ffffff',
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
const surface = TONE_SURFACE[props.tone] || TONE_SURFACE.brand;
const trendClass = props.trend === 'up' ? 'is-up' : props.trend === 'down' ? 'is-down' : 'is-flat';
const trendIcon =
  props.trend === 'up' ? 'bi-arrow-up-right' : props.trend === 'down' ? 'bi-arrow-down-right' : 'bi-dash';
</script>

<template>
  <article class="aeg-stat-card" :class="`tone-${tone}`">
    <div class="aeg-stat-top">
      <span class="aeg-stat-icon" :style="{ color, background: surface }">
        <i :class="`bi ${icon}`" aria-hidden="true" />
      </span>
      <Sparkline v-if="sparkline.length" :values="sparkline" :color="color" />
    </div>
    <p class="aeg-stat-label">{{ label }}</p>
    <p class="aeg-stat-value">{{ value }}</p>
    <div class="aeg-stat-foot">
      <span v-if="trendValue" class="aeg-stat-trend" :class="trendClass">
        <i :class="`bi ${trendIcon}`" aria-hidden="true" />
        {{ trendValue }}
      </span>
      <span v-if="hint" class="aeg-stat-hint">{{ hint }}</span>
    </div>
  </article>
</template>

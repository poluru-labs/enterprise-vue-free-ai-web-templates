<script setup>
import Sparkline from '../charts/Sparkline.vue';

const TONE_COLOR = {
  brand: '#7C3AED',
  info: '#6D28D9',
  success: '#059669',
  warning: '#D97706',
  danger: '#E11D48',
};

const TONE_SURFACE = {
  brand: '#EDE9FE',
  info: '#F5F3FF',
  success: '#D1FAE5',
  warning: '#FEF3C7',
  danger: '#FFE4E6',
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
  <article class="grove-stat-card" :class="`tone-${tone}`">
    <div class="grove-stat-top">
      <span class="grove-stat-icon" :style="{ color, background: surface }">
        <i :class="`bi ${icon}`" aria-hidden="true" />
      </span>
      <Sparkline v-if="sparkline.length" :values="sparkline" :color="color" />
    </div>
    <p class="grove-stat-label">{{ label }}</p>
    <p class="grove-stat-value">{{ value }}</p>
    <div class="grove-stat-foot">
      <span v-if="trendValue" class="grove-stat-trend" :class="trendClass">
        <i :class="`bi ${trendIcon}`" aria-hidden="true" />
        {{ trendValue }}
      </span>
      <span v-if="hint" class="grove-stat-hint">{{ hint }}</span>
    </div>
  </article>
</template>

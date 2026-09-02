<script setup>
import Sparkline from '../charts/Sparkline.vue';

const TONE_COLOR = {
  brand: '#38BDF8',
  info: '#0EA5E9',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#F43F5E',
};

const TONE_SURFACE = {
  brand: '#E0F2FE',
  info: '#F0F9FF',
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
  <article class="hbr-stat-card" :class="`tone-${tone}`">
    <div class="hbr-stat-top">
      <span class="hbr-stat-icon" :style="{ color, background: surface }">
        <i :class="`bi ${icon}`" aria-hidden="true" />
      </span>
      <Sparkline v-if="sparkline.length" :values="sparkline" :color="color" />
    </div>
    <p class="hbr-stat-label">{{ label }}</p>
    <p class="hbr-stat-value">{{ value }}</p>
    <div class="hbr-stat-foot">
      <span v-if="trendValue" class="hbr-stat-trend" :class="trendClass">
        <i :class="`bi ${trendIcon}`" aria-hidden="true" />
        {{ trendValue }}
      </span>
      <span v-if="hint" class="hbr-stat-hint">{{ hint }}</span>
    </div>
  </article>
</template>

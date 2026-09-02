<script setup>
import Sparkline from '../charts/Sparkline.vue';

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  hint: { type: String, default: '' },
  trend: { type: String, default: '' },
  trendValue: { type: String, default: '' },
  icon: { type: String, default: 'bi-journal-text' },
  tone: { type: String, default: 'brand' },
  sparkline: { type: Array, default: () => [] },
});

const TONE_COLOR = {
  brand: '#3F6212',
  info: '#0F766E',
  success: '#15803D',
  warning: '#A16207',
  danger: '#B91C1C',
};

const TONE_SURFACE = {
  brand: '#ECFCCB',
  info: '#CCFBF1',
  success: '#DCFCE7',
  warning: '#FEF3C7',
  danger: '#FEE2E2',
};

const color = TONE_COLOR[props.tone] || TONE_COLOR.brand;
const surface = TONE_SURFACE[props.tone] || TONE_SURFACE.brand;
const trendClass = props.trend === 'up' ? 'is-up' : props.trend === 'down' ? 'is-down' : 'is-flat';
const trendIcon =
  props.trend === 'up' ? 'bi-arrow-up-right' : props.trend === 'down' ? 'bi-arrow-down-right' : 'bi-dash';
</script>

<template>
  <article class="atlas-stat-card" :class="`tone-${tone}`">
    <div class="atlas-stat-top">
      <span class="atlas-stat-icon" :style="{ color, background: surface }">
        <i :class="`bi ${icon}`" aria-hidden="true" />
      </span>
      <Sparkline v-if="sparkline.length" :values="sparkline" :color="color" />
    </div>
    <p class="atlas-stat-label">{{ label }}</p>
    <p class="atlas-stat-value">{{ value }}</p>
    <div class="atlas-stat-foot">
      <span v-if="trendValue" class="atlas-stat-trend" :class="trendClass">
        <i :class="`bi ${trendIcon}`" aria-hidden="true" />
        {{ trendValue }}
      </span>
      <span v-if="hint" class="atlas-stat-hint">{{ hint }}</span>
    </div>
  </article>
</template>

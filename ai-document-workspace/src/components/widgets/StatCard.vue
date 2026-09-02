<script setup>
import Sparkline from '../charts/Sparkline.vue';

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  hint: { type: String, default: '' },
  trend: { type: String, default: '' },
  trendValue: { type: String, default: '' },
  icon: { type: String, default: 'bi-file-earmark-text' },
  tone: { type: String, default: 'brand' },
  sparkline: { type: Array, default: () => [] },
});

const TONE_COLOR = {
  brand: '#B45309',
  info: '#0891B2',
  success: '#059669',
  warning: '#d97706',
  danger: '#dc2626',
};

const TONE_SURFACE = {
  brand: '#FEF3C7',
  info: '#CFFAFE',
  success: '#d1fae5',
  warning: '#fef3c7',
  danger: '#fee2e2',
};

const color = TONE_COLOR[props.tone] || TONE_COLOR.brand;
const surface = TONE_SURFACE[props.tone] || TONE_SURFACE.brand;
const trendClass = props.trend === 'up' ? 'is-up' : props.trend === 'down' ? 'is-down' : 'is-flat';
const trendIcon =
  props.trend === 'up' ? 'bi-arrow-up-right' : props.trend === 'down' ? 'bi-arrow-down-right' : 'bi-dash';
</script>

<template>
  <article class="vault-stat-card" :class="`tone-${tone}`">
    <div class="vault-stat-top">
      <span class="vault-stat-icon" :style="{ color, background: surface }">
        <i :class="`bi ${icon}`" aria-hidden="true" />
      </span>
      <Sparkline v-if="sparkline.length" :values="sparkline" :color="color" />
    </div>
    <p class="vault-stat-label">{{ label }}</p>
    <p class="vault-stat-value">{{ value }}</p>
    <div class="vault-stat-foot">
      <span v-if="trendValue" class="vault-stat-trend" :class="trendClass">
        <i :class="`bi ${trendIcon}`" aria-hidden="true" />
        {{ trendValue }}
      </span>
      <span v-if="hint" class="vault-stat-hint">{{ hint }}</span>
    </div>
  </article>
</template>

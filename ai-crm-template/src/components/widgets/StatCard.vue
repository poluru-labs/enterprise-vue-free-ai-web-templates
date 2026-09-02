<script setup>
import { computed } from 'vue';
import Sparkline from '../charts/Sparkline.vue';

const TONE_COLOR = {
  brand: '#F13E93',
  info: '#d62e7e',
  success: '#059669',
  warning: '#d97706',
  danger: '#dc2626',
};

const TONE_SURFACE = {
  brand: '#fde8f3',
  info: '#fde8f3',
  success: '#d1fae5',
  warning: '#fef3c7',
  danger: '#fee2e2',
};

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  hint: { type: String, default: '' },
  trend: { type: String, default: '' },
  trendValue: { type: String, default: '' },
  icon: { type: String, default: 'bi-activity' },
  tone: { type: String, default: 'brand' },
  sparkline: { type: Array, default: () => [] },
});

const color = computed(() => TONE_COLOR[props.tone] || TONE_COLOR.brand);
const surface = computed(() => TONE_SURFACE[props.tone] || TONE_SURFACE.brand);
const trendClass = computed(() => (props.trend === 'up' ? 'is-up' : props.trend === 'down' ? 'is-down' : 'is-flat'));
const trendIcon = computed(() =>
  props.trend === 'up' ? 'bi-arrow-up-right' : props.trend === 'down' ? 'bi-arrow-down-right' : 'bi-dash',
);
</script>

<template>
  <article :class="['bloom-stat-card', `tone-${tone}`]">
    <div class="bloom-stat-top">
      <span class="bloom-stat-icon" :style="{ color, background: surface }">
        <i :class="['bi', icon]" aria-hidden="true" />
      </span>
      <Sparkline v-if="sparkline.length" :values="sparkline" :color="color" />
    </div>
    <p class="bloom-stat-label">{{ label }}</p>
    <p class="bloom-stat-value">{{ value }}</p>
    <div class="bloom-stat-foot">
      <span v-if="trendValue" :class="['bloom-stat-trend', trendClass]">
        <i :class="['bi', trendIcon]" aria-hidden="true" />
        {{ trendValue }}
      </span>
      <span v-if="hint" class="bloom-stat-hint">{{ hint }}</span>
    </div>
  </article>
</template>

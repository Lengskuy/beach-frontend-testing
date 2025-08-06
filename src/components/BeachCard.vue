<template>
  <v-card class="my-2" @click="$emit('select', beach)">
    <v-card-title>{{ beach.name }}</v-card-title>
    <v-card-text>
      🌡 Temp: {{ beach.temperature }}°C |
      🌊 Waves: {{ beach.wave_height }}m |
      👥 Crowd: {{ beach.crowd_level }} |
      🚩 Flag: <strong :class="flagColor">{{ beach.safetyFlag }}</strong>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps(['beach']);
const flagColor = computed(() => {
  switch (beach.safetyFlag) {
    case 'Red': return 'text-red';
    case 'Yellow': return 'text-yellow-darken-2';
    case 'Green': return 'text-green';
    default: return '';
  }
});
</script>

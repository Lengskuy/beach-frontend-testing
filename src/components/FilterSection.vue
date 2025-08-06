<template>
  <v-card class="mb-12 filter-card mx-4" elevation="3" rounded="xl">
    <v-card-text class="pa-10">
      <div class="d-flex align-center mb-10">
        <div class="filter-icon-container mr-6">
          <v-icon color="primary" size="24">mdi-filter-variant</v-icon>
        </div>
        <span class="text-h5 font-weight-bold text-grey-darken-2">Filter Beaches</span>
      </div>
      
      <v-row class="mb-8" no-gutters>
        <v-col cols="12" lg="4" md="6" class="pa-3">
          <v-text-field
            :model-value="filters.searchQuery"
            @update:model-value="updateFilter('searchQuery', $event)"
            placeholder="Search beaches..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="comfortable"
            hide-details
            class="search-field"
            bg-color="grey-lighten-5"
          ></v-text-field>
        </v-col>
        
        <v-col cols="12" lg="4" md="6" class="pa-3">
          <v-select
            :model-value="filters.selectedRegion"
            @update:model-value="updateFilter('selectedRegion', $event)"
            :items="options.regions"
            label="All Regions"
            variant="outlined"
            density="comfortable"
            hide-details
            bg-color="grey-lighten-5"
          ></v-select>
        </v-col>
        
        <v-col cols="12" lg="4" md="6" class="pa-3">
          <v-select
            :model-value="filters.selectedCrowdLevel"
            @update:model-value="updateFilter('selectedCrowdLevel', $event)"
            :items="options.crowdLevels"
            label="Crowd Level"
            variant="outlined"
            density="comfortable"
            hide-details
            bg-color="grey-lighten-5"
          ></v-select>
        </v-col>
        

      </v-row>
      
      <div class="d-flex justify-end px-3">
        <v-btn
          variant="text"
          color="primary"
          size="large"
          class="px-8"
          @click="clearAllFilters"
        >
          <v-icon start>mdi-filter-remove</v-icon>
          Clear All Filters
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  filters: {
    type: Object,
    required: true,
    default: () => ({
      searchQuery: '',
      selectedRegion: 'All Regions',
      selectedCrowdLevel: 'Crowd Level'
    })
  },
  options: {
    type: Object,
    required: true,
    default: () => ({
      regions: ['All Regions', 'North', 'South', 'East', 'West Coast'],
      crowdLevels: ['Crowd Level', 'Low', 'Medium', 'High']
    })
  }
})

const emit = defineEmits(['update-filter', 'clear-filters'])

function updateFilter(filterName, value) {
  emit('update-filter', { [filterName]: value })
}

function clearAllFilters() {
  emit('clear-filters')
}
</script>


<style scoped>
.filter-card {
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.filter-icon-container {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-field .v-field {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
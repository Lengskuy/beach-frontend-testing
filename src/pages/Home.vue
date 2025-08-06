<template>
  <v-app>
    <v-main class="primary-bg">
      <v-container class="home-container py-6" fluid>
        <!-- Header -->
        <div class="d-flex align-center justify-space-between mb-8">
          <div class="d-flex align-center">
            <v-icon color="blue" size="32" class="mr-3">mdi-waves</v-icon>
            <div>
              <h1 class="text-h4 font-weight-bold mb-1">Beach Monitor</h1>
              <p class="text-subtitle-1 text-grey-600 ma-0">Real-time beach conditions dashboard</p>
            </div>
          </div>
          
        </div>

        <!-- ADD THIS DIVIDER BELOW HEADER -->
        <v-divider class="my-4"></v-divider>

       <!-- Filter Section -->
          <v-card class="mb-4 filter-card" elevation="1">
            <v-card-text class="py-2 px-3">
              <div class="d-flex align-center mb-2">
                <v-icon size="18" class="mr-2">mdi-filter-variant</v-icon>
                <span class="text-subtitle-2 font-weight-medium">Filter Beaches</span>
              </div>
              
              <v-row class="ma-0">
                <v-col cols="12" md="4" class="pa-1">
                  <v-select
                    v-model="selectedRegion"
                    :items="regions"
                    label="All Regions"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="compact-field"
                  ></v-select>
                </v-col>
                
                <v-col cols="12" md="4" class="pa-1">
                  <v-select
                    v-model="selectedCrowdLevel"
                    :items="crowdLevels"
                    label="Crowd Level"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="compact-field"
                  ></v-select>
                </v-col>
                
                <v-col cols="12" md="4" class="pa-1">
                  <v-select
                    v-model="selectedSafetyFlag"
                    :items="safetyFlags"
                    label="Safety Flag"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="compact-field"
                  ></v-select>
                </v-col>
              </v-row>
              
              <div class="d-flex justify-end mt-2">
                <v-btn
                  variant="text"
                  color="primary"
                  size="small"
                  @click="clearFilters"
                >
                  Clear All
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
          
        <!-- Results Counter -->
        <p class="text-body-2 text-grey-600 mb-4">
          Showing {{ filteredBeaches.length }} of {{ beaches.length }} beaches
        </p>

        <!-- Beach Cards Grid -->
        <v-container class="card-wrapper">
         <v-row justify="center" align="stretch">
          <v-col
            v-for="beach in filteredBeaches"
            :key="beach.id"
            cols="12"
            
            md="4"
          >
            <v-card elevation="2" class="d-flex flex-column">
               <!-- Beach Image Section -->
                <div class="beach-image-container position-relative">
                  <v-img
                    :src="beach.image_url"
                    alt="Beach Image"
                    height="200"
                    class="beach-image"
                    cover
                  />
      
                <!-- Status Indicator -->
                <v-chip
                  :color="getStatusColor(beach.safety_flag)"
                  size="small"
                  class="status-chip"
                  variant="flat"
                >
                </v-chip>
              </div>

              <!-- Beach Info -->
              <v-card-text class="flex-grow-1 d-flex flex-column">
                <div class="d-flex align-center justify-space-between mb-3">
                  <h3 class="text-h6 font-weight-bold">{{ beach.name }}</h3>
                  <div class="d-flex align-center text-caption text-grey-600">
                    <v-icon size="16" class="mr-1">mdi-map-marker</v-icon>
                    {{ beach.region }}
                  </div>
                </div>

                <!-- Conditions Row -->
                <div class="d-flex align-center justify-space-between mb-4">
                  <!-- Temperature -->
                  <div class="d-flex align-center">
                    <v-icon color="orange" size="20" class="mr-2">mdi-thermometer</v-icon>
                    <span class="text-body-1 font-weight-medium">{{ beach.temperature }}°C</span>
                  </div>

                  <!-- Wave Height -->
                  <div class="d-flex align-center">
                    <v-icon color="blue" size="20" class="mr-2">mdi-waves</v-icon>
                    <span class="text-body-1 font-weight-medium">{{ beach.wave_height }}m</span>
                  </div>

                  <!-- Crowd Level -->
                  <div class="d-flex align-center">
                    <v-icon color="purple" size="20" class="mr-2">mdi-account-group</v-icon>
                    <v-chip
                      :color="getCrowdColor(beach.crowd_level)"
                      size="small"
                      variant="tonal"
                    >
                      {{ beach.crowd_level }}
                    </v-chip>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

        <!-- Empty State -->
        <v-card v-if="filteredBeaches.length === 0" class="text-center pa-8" elevation="1">
          <v-icon size="64" color="grey-400" class="mb-4">mdi-beach</v-icon>
          <h3 class="text-h6 mb-2">No beaches found</h3>
          <p class="text-body-2 text-grey-600">Try adjusting your filters to see more results</p>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted,watch} from 'vue';
import api from '@/utils/api'; // adjust path if needed

const beaches = ref([]);
const searchQuery = ref('');
const selectedRegion = ref('All Regions');
const selectedCrowdLevel = ref('Crowd Level');
const selectedSafetyFlag = ref('Safety Flag');


const regions = [
  'All Regions',
  'North',
  'South',
  'East',
  'West'
];

const crowdLevels = [
  'Crowd Level',
  'Low',
  'Medium',
  'High'
];

const safetyFlags = [
  'Safety Flag',
  'Green',
  'Yellow',
  'Red'
];


const fetchBeaches = async () => {
  try {
    const response = await api.get('/beaches/mock'); // get all beaches
    beaches.value = response.data;
  } catch (error) {
    console.error('Failed to fetch beaches:', error);
  }
};


onMounted(() => {
  fetchBeaches();
  setInterval(fetchBeaches, 5000); // Update every 5 seconds
});


const filteredBeaches = computed(() => {
  return beaches.value
    .filter(beach =>
      beach.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .filter(beach =>
      selectedRegion.value === 'All Regions' || beach.regions === selectedRegion.value
    )
    .filter(beach =>
      selectedCrowdLevel.value === 'Crowd Level' || beach.crowd_level  === selectedCrowdLevel.value
    )
    .filter(beach =>
      selectedSafetyFlag.value === 'Safety Flag' || beach.safety_flag === selectedSafetyFlag.value
    );
});

const clearFilters = () => {
  searchQuery.value = '';
  selectedRegion.value = 'All Regions';
  selectedCrowdLevel.value = 'Crowd Level';
  selectedSafetyFlag.value = 'Safety Flag';
};

const getStatusColor = (safetyFlag) => {
  const colors = {
    'Green': 'success',
    'Yellow': 'warning',
    'Red': 'error'
  };
  return colors[safetyFlag] || 'grey';
};

const getCrowdColor = (crowdLevel) => {
  const colors = {
    'Low': 'success',
    'Medium': 'warning',
    'High': 'error'
  };
  return colors[crowdLevel] || 'grey';
};

</script>


<style scoped>
.home-container {
  padding: 24px !important;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 40px !important;
}

.beach-image-container {
  height: 200px;
  overflow: hidden;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.status-chip {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 14px;
  height: 14px;
  border-radius: 100%;
  padding: 0 !important;
  min-width: 0 !important;
  max-width: 14px;
  max-height: 14px;
  line-height: 0 !important;
  font-size: 0 !important;
  background-color: green; /* or red/yellow depending on status */
  border: 2px solid white; /* border around the dot */
}


.v-card {
  transition: transform 0.2s ease-in-out;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.v-card:hover {
  transform: translateY(-2px);
}

.v-card-text {
  padding-bottom: 16px !important;
}

.v-btn {
  border-radius: 8px;
}

.v-container {
  max-width: 1000px !important;
  margin: 0 auto !important;
  padding-left: 16px !important;
  padding-right: 16px !important;
}


.card-wrapper {
  max-width: 1200px; /* Keeps layout tighter */
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
}

.primary-bg {
  background-color: #F0F8FF;
}


</style>

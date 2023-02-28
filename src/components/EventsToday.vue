<template>
  <body>
    <div v-if="this.options.eventLocation === 'NOI'">
      <EventsNOI
        :options="{
          eventLocation: this.options.eventLocation,
          room: this.options.room,
        }"
      />
    </div>
    <div v-else>
      <EventsEurac
        :options="{
          eventLocation: this.options.eventLocation,
          room: this.options.room,
          imageGalleryInterval: this.options.imageGalleryInterval,
        }"
      />
    </div>
  </body>
</template>
<script>
import EventsEurac from "./EventsEurac";
import EventsNOI from "./EventsNOI";

export default {
  name: "EventsToday",
  props: {
    options: Object,
    default: () => {
      return {};
    },
  },
  components: {
    EventsEurac,
    EventsNOI,
  },
};
</script>

<template>
  <EventsToday :options="{ eventLocation: eventLocation, room: room }" />
</template>

<script>
import EventsToday from "./components/EventsToday.vue";

export default {
  name: "App",
  props: {
    eventLocation: {
      type: String,
      default: "NOI",
    },
    room: { type: String, default: "Seminar 2" },
  },
  components: {
    EventsToday,
  },
};
</script>

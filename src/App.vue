<template><EventsToday :options="{ eventLocation: eventLocation }" /></template>

<script>
import EventsToday from "./components/EventsToday.vue";

export default {
  name: "App",
  props: {
    eventLocation: {
      type: String,
      default: "NOI",
    },
  },
  components: {
    EventsToday,
  },
};
</script>

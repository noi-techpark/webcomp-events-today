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
    imageGalleryUrl: {
      type: String,
      default: "",
    },
    room: { type: String, default: "" },
  },
  components: {
    EventsToday,
  },
};
</script>

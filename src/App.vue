<template>
  <EventsToday
    :options="{
      eventLocation: eventLocation,
      room: room,
      imageGalleryInterval: imageGalleryInterval,
    }"
  />
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
    room: { type: String, default: "" },
    imageGalleryUrl: {
      type: String,
      default: "",
    },
    imageGalleryInterval: {
      type: Number,
      default: 2,
    },
  },
  components: {
    EventsToday,
  },
};
</script>

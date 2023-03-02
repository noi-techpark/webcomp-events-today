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
      default: "EC",
    },
    room: { type: String, default: "" },
    imageGalleryUrl: {
      type: String,
      default: "",
    },
    imageGalleryInterval: {
      type: Number,
      default: 60,
    },
  },
  components: {
    EventsToday,
  },
};
</script>

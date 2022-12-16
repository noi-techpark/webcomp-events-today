<script>
import EventsToday from "./components/EventsToday.vue";

export default {
  name: "App",
  props: {
    events: {
      type: Array,
      default: {},
    },
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

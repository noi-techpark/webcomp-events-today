<template>
  <EventsToday
    :options="{
      eventLocation: eventLocation,
      room: room,
      maxEvents: maxEvents,
      eventRotationInterval: eventRotationInterval,
      languageRotationInterval: languageRotationInterval,
      imageGalleryInterval: imageGalleryInterval,
      imageGalleryUrl: imageGalleryUrl,
      fontName: fontName,
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
    maxEvents: { type: Number, default: 4 },
    eventRotationInterval: {
      type: Number,
      default: 60,
    },
    languageRotationInterval: {
      type: Number,
      default: 10,
    },
    imageGalleryUrl: {
      type: String,
      default:
        "https://s3.eu-west-1.amazonaws.com/it.bz.noi.today.eurac.gallery",
    },
    imageGalleryInterval: {
      type: Number,
      default: 60,
    },
    fontUrl: {
      type: String,
      default:
        "https://fonts.testingmachine.eu/source-sans-pro/style.css",
    },
    fontName: {
      type: String,
      default: "Source Sans Pro",
    },
  },
  components: {
    EventsToday,
  },
  created: function () {
    this.fetchFont(this.fontUrl).then((font) => {
      // inject font after creation, because @font-face is not supported by shadow DOM
      let fontFaceSheet = new CSSStyleSheet();
      fontFaceSheet.replaceSync(font);
      document.adoptedStyleSheets = [
        ...document.adoptedStyleSheets,
        fontFaceSheet,
      ];
    });
  },
  methods: {
    async fetchFont(url) {
      const response = await fetch(url);
      return await response.text();
    },
  },
};
</script>

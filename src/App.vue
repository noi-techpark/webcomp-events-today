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
      default: 60,
    },
  },
  data: function () {
    return {
      // add new fonts here
      fontUrls: [
        "https://fonts.testingmachine.eu/source-sans-pro/style.css",
        "https://s3.eu-west-1.amazonaws.com/it.bz.noi.today.eurac.gallery/milo-pro/style.css",
      ],
    };
  },
  components: {
    EventsToday,
  },
  created: function () {
    for (const fontUrl of this.fontUrls) {
      // load from css from url
      this.fetchFont(fontUrl).then((font) => {
        // inject font after creation, because @font-face is not supported by shadow DOM
        let fontFaceSheet = new CSSStyleSheet();
        fontFaceSheet.replaceSync(font);
        document.adoptedStyleSheets = [
          ...document.adoptedStyleSheets,
          fontFaceSheet,
        ];
      });
    }
  },
  methods: {
    async fetchFont(url) {
      const response = await fetch(url);
      return await response.text();
    },
  },
};
</script>

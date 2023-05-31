<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <body>
    <div v-if="this.options.eventLocation === 'NOI'">
      <EventsNOI
        :options="{
          eventLocation: this.options.eventLocation,
          room: this.options.room,
          maxEvents: this.options.maxEvents,
          fontName: this.options.fontName,
        }"
      />
    </div>
    <div v-else>
      <EventsEurac
        :options="{
          eventLocation: this.options.eventLocation,
          room: this.options.room,
          maxEvents: this.options.maxEvents,
          eventRotationInterval: this.options.eventRotationInterval,
          languageRotationInterval: this.options.languageRotationInterval,
          imageGalleryInterval: this.options.imageGalleryInterval,
          imageGalleryUrl: this.options.imageGalleryUrl,
          fontName: this.options.fontName,
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

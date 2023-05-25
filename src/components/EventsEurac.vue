<template>
  <div
    id="base"
    v-bind:style="{ 'font-family': this.options.fontName + ', sans-serif' }"
  >
    <div id="header">
      <div>
        <a href="https://www.eurac.edu/en"
          ><img
            id="eurac-logo"
            :src="require('@/assets/icons/eurac_logo_white_WEB_neg.png')"
        /></a>
      </div>
      <div id="current-date-time">
        <span id="date">{{ currentDate() }}</span>
        <span id="time">{{ timestamp }}</span>
      </div>
    </div>
    <div id="content">
      <div v-if="!this.eventsLoaded || this.events.length > 0">
        <div
          id="event-row"
          class="line line-separation"
          v-for="event in events"
          :key="event.key"
        >
          <div id="event-time">
            {{ event.time }}
          </div>

          <div id="event-details">
            <div id="company">
              {{ event.companyName }}
            </div>

            <div id="event-name">
              {{ event.name[currentLanguage] }}
            </div>
          </div>
          <div id="event-location">
            <div>
              <div id="room">
                {{ getRoomName(event.rooms) }}
              </div>
              <div id="seminar">
                {{ getBigRoomName(event.rooms) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <img :src="this.currentImage" alt="image gallery" id="image-gallery" />
      </div>
    </div>
    <div id="footer">
      <a href="https://opendatahub.com" target="_blank"
        ><span id="footer-text">powered by Open Data Hub</span>
        <img
          :src="require('@/assets/icons/NOI_OPENDATAHUB_NEW_WH-01.png')"
          height="35px"
      /></a>
    </div>
  </div>
</template>

<script>
"use strict";

export default {
  name: "EventsToday",
  props: {
    options: Object,
    default: () => {
      return {};
    },
  },
  data: function () {
    return {
      events: [],
      allEvents: [],
      images: [],
      timestamp: "",
      currentImageIndex: 0,
      currentImage: "",
      eventsLoaded: false,
      languages: ["en", "de", "it"],
      currentLanguage: "en",
    };
  },
  created: function () {
    this.loadImages();
    this.getNow();
    this.fetchData();
    // create cron job
    setInterval(
      this.rotateLanguage,
      this.options.languageRotationInterval * 1000
    );
    setInterval(this.getNow, 1000);
    setInterval(this.fetchData, 300000);
    setInterval(this.rotateEvents, this.options.eventRotationInterval * 1000);
    setInterval(this.nextImage, this.options.imageGalleryInterval * 1000);
  },
  methods: {
    nextImage() {
      this.currentImageIndex++;
      if (this.currentImageIndex > this.images.length - 1) {
        this.currentImageIndex = 0;
      }
      this.currentImage = `${this.options.imageGalleryUrl}/${
        this.images[this.currentImageIndex]
      }`;
    },
    async fetchData() {
      const baseURL =
        "https://tourism.api.opendatahub.com/v1/EventShort/GetbyRoomBooked?";

      const endDate = new Date();
      endDate.setUTCHours(24, 0, 0, 0);

      // to show more events during development
      // set increment to 0 before pushing
      const day = 60 * 40 * 24 * 1000;
      const increment = 0;

      const params = new URLSearchParams([
        ["startdate", new Date().getTime()],
        ["enddate", endDate.getTime() + increment * day],
        ["eventlocation", this.options.eventLocation],
        ["room", this.options.room],
        ["datetimeformat", "uxtimestamp"],
        ["onlyactive", true],
        ["sortorder", "ASC"],
        ["origin", "webcomp-events-today-eurac"],
      ]);

      if (this.options.room != "" && this.options.room != null) {
        params.set(
          "rawfilter",
          "in(RoomBooked.[*].SpaceDescRoomMapping," +
            '"' +
            this.options.room +
            '"' +
            ")"
        );
      }
      const xhttp = new XMLHttpRequest();
      xhttp.open("GET", baseURL + params, false);
      xhttp.send();

      const items = JSON.parse(xhttp.response);

      this.allEvents = [];

      for (let i = 0; i <= items.length - 1; ++i) {
        let element = items[i];

        let startDate = new Date(element.RoomStartDate);
        let endDate = new Date(element.RoomEndDate);

        let event = {
          name: element.EventTitle,
          companyName: element.CompanyName,
          webAddress: element.WebAddress,
          rooms: element.SpaceDesc,
          time: this.formatTime(startDate, endDate),
        };
        this.allEvents.push(event);
      }
      this.events = this.allEvents.slice(0, this.options.maxEvents);
      this.eventsLoaded = true;
    },
    rotateEvents() {
      // don't rotate if ma event is set to 1 or events are less than max events
      if (
        this.options.maxEvents < 2 ||
        this.allEvents.length <= this.options.maxEvents
      )
        return;
      const lastEvent = this.events.pop();
      let index = this.allEvents.indexOf(lastEvent) + 1;
      if (index >= this.allEvents.length) index = 0;
      this.events = this.allEvents.slice(index, index + this.options.maxEvents);
    },
    rotateLanguage() {
      let index = this.languages.indexOf(this.currentLanguage) + 1;

      if (index >= this.languages.length) index = 0;
      this.currentLanguage = this.languages[index];
    },
    loadImages() {
      const parser = new DOMParser();
      const imagesList = [];

      const xhttp = new XMLHttpRequest();
      xhttp.open("GET", this.options.imageGalleryUrl, false);
      xhttp.send();

      const xmlDoc = parser.parseFromString(xhttp.response, "text/xml");
      // search for images
      const keys = xmlDoc.getElementsByTagName("Key");
      const imageFormats = ["png", "jpg", "jpeg"];
      for (const key of keys) {
        const value = key.innerHTML;
        if (imageFormats.some((format) => value.includes(format)))
          imagesList.push(value);
      }
      // save images
      this.images = imagesList;
      // assign next image
      this.nextImage();
    },
    formatTime(startDate, endDate) {
      return String(
        startDate.getHours() +
          ":" +
          String(startDate.getMinutes()).padStart(2, "0") +
          " - " +
          endDate.getHours() +
          ":" +
          String(endDate.getMinutes()).padStart(2, "0")
      );
    },
    currentDate() {
      const current = new Date();
      return current
        .toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
          day: "numeric",
        })
        .replace(",", "")
        .toUpperCase();
    },

    getRoomName(room) {
      // Seminar room special rule
      if (
        room.includes("Seminar") &&
        !room.includes("Seminar 2 and 3 unified") &&
        !room.includes("Seminar 1, 2 and 3 unified")
      )
        return "Seminar";
      return room;
    },
    getBigRoomName(room) {
      if (
        room.includes("Seminar") &&
        !room.includes("Seminar 2 and 3 unified") &&
        !room.includes("Seminar 1, 2 and 3 unified")
      ) {
        let seminarRooms = room.split(" ");
        // Seminar 2
        if (seminarRooms.length == 2) {
          return "S" + seminarRooms[1];
        }
        // Seminar 2 and 3 unified
        else {
          return room;
        }
      }

      return "";
    },
    getNow: function () {
      const today = new Date();
      const time =
        today.getHours() +
        ":" +
        (today.getMinutes() < 10 ? "0" : "") +
        today.getMinutes();
      this.timestamp = time;
    },
  },
};
</script>

<style>
#base {
  color: white;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  min-height: 85vh;
  background-color: #414649;
  padding: 65px;
}

/**********************
HEADER 
**********************/

#header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 60px;
}

#eurac-logo {
  width: 206px;
}

#current-date-time {
  font-size: 64px;
}

#date {
  padding-right: 60px;
  font-size: 64px;
}

#time {
  font-size: 24px;
  color: #b2b5b6;
  font-weight: bold;
  vertical-align: super;
}

/**********************
CONTENT
**********************/

#content {
  flex: 1;
  align-items: flex-end;
}

#event-row {
  display: flex;
  flex-direction: row;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  padding-top: 15px;
  padding-bottom: 15px;
}

#event-details {
  flex: 1;
}

#event-time {
  font-size: 26px;
  justify-content: right;
  flex: 0 0 240px;
  color: #b2b5b6;
}

#event-detail {
  text-align: left;
  height: 80%;
  overflow-wrap: break-word;
  display: flex;
}

#company {
  font-size: 22px;
  color: white;
  background-color: #666b6c;
  max-width: 80vw;
  height: 28px;
  text-transform: uppercase;
  padding: 5px;
  letter-spacing: 0.06em;

  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#event-name {
  font-size: 41.6px;
  max-width: 80vw;
  min-width: 30vw;
  line-height: 1.1 !important;
  letter-spacing: 0.01em;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: initial;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

#event-location {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  background-color: #666b6c;

  font-weight: bold;

  flex: 0 0 110px;
  width: 110px;
  height: 110px;

  padding: 20px;
}

#room {
  color: #ffffff;
  font-size: 24px;
  /* line-height: 16px; */

  text-align: right;
}

#seminar {
  font-size: 60px;
  line-height: 44px;

  text-align: right;
}

#image-gallery {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  object-fit: cover;
  object-position: 0 0;
}

/**********************
FOOTER
**********************/

#footer > a {
  display: flex;
  color: #ffffff;
  text-decoration: none;
  z-index: 100001;
  justify-content: flex-end;
  align-items: center;
}

#footer-text {
  color: white;
  margin-right: 10px;
}

/* @media screen and (min-width: 320px) and (max-width: 812px) {

}

@media screen and (min-width: 320px) and (max-width: 812px) and (orientation: portrait) {

} */

@media screen and (min-width: 992px) and (max-height: 901px) and (orientation: landscape) {
  #base {
    font-size: 10px;
  }
}

@media screen and (max-width: 1441px) and (max-height: 901px) and (orientation: landscape) {
  #base {
    font-size: 12px;
  }
}

@media screen and (max-width: 1280px) and (min-height: 1024px) and (orientation: landscape) {
  #base {
    font-size: 16px;
  }
}

@media screen and (max-width: 1600px) and (min-height: 900px) and (orientation: landscape) {
  #base {
    font-size: 14px;
  }
}

@media screen and (max-width: 992px) and (min-width: 812px) and (orientation: landscape) {
   {
    font-size: 8px;
  }
}
</style>

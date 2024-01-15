<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

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
    <div id="content" :class="contentClass">
      <div v-if="this.allEvents.length > 0">
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
            <div id="event-name" :class="eventNameClass(event)">
              {{ event.name[currentLanguage] }}
            </div>
            <div id="event-subtitle" :class="eventSubtitleClass(event)">
              {{ event.subTitle }}
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
      activePage: 0,
      languages: ["en", "de", "it"],
      currentLanguage: "en",
      // set true to have 'Lorem ipsum' text as title and subtitle
      devMode: false,
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    };
  },
  computed: {
    contentClass() {
      return {
        "content-align-bottom":
          this.options.maxEvents < 4 || this.allEvents.length < 4,
      };
    },
  },
  created: function () {
    this.loadImages();
    this.getNow();
    this.fetchData();
    this.rotateEvents();
    // create cron job
    setInterval(
      this.rotateLanguage,
      this.options.languageRotationInterval * 1000
    );
    setInterval(this.getNow, 1000);
    setInterval(this.rotateEvents, this.options.eventRotationInterval * 1000);
    setInterval(this.nextImage, this.options.imageGalleryInterval * 1000);
  },
  methods: {
    eventNameClass(event) {
      return {
        "event-name-single": this.options.maxEvents == 1,
        "event-name-multiple": this.options.maxEvents > 1,
        "one-line-clamp":
          this.options.maxEvents > 1 && event.subTitle.length > 0,
        "two-line-clamp":
          this.options.maxEvents == 1 || event.subTitle.length === 0,
      };
    },
    eventSubtitleClass(event) {
      return {
        "event-subtitle-single": this.options.maxEvents == 1,
        "event-subtitle-multiple": this.options.maxEvents > 1,
        "one-line-clamp":
          this.options.maxEvents > 1 && event.subTitle.length > 0,
      };
    },
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
      const day = 60 * 60 * 24 * 1000;
      const incrementStart = 0;
      const incrementEnd = 10;

      const params = new URLSearchParams([
        ["startdate", new Date().getTime() + incrementStart * day],
        ["enddate", endDate.getTime() + incrementEnd * day],
        ["eventlocation", this.options.eventLocation],
        // ["room", this.options.room],
        ["datetimeformat", "uxtimestamp"],
        ["onlyactive", true],
        ["sortorder", "ASC"],
        ["origin", "webcomp-events-today-eurac"],
      ]);

      const xhttp = new XMLHttpRequest();
      xhttp.open("GET", baseURL + params, false);
      xhttp.send();

      const items = JSON.parse(xhttp.response);

      this.allEvents = [];

      for (let i = 0; i <= items.length - 1; ++i) {
        let element = items[i];

        // manually filter for rooms, can be removed if raw filter works for EventShort/GetbyRoomBooked
        if (
          this.options.room == null ||
          this.options.room === "" ||
          element.SpaceDescList.indexOf(this.options.room) > -1
        ) {
          let startDate = new Date(element.RoomStartDate);
          let endDate = new Date(element.RoomEndDate);

          let event = {
            name: this.devMode
              ? { en: this.lorem, it: this.lorem, de: this.lorem }
              : element.EventTitle,
            subTitle: this.devMode
              ? { en: this.lorem, it: this.lorem, de: this.lorem }
              : element.Subtitle,
            companyName: element.CompanyName,
            webAddress: element.WebAddress,
            rooms: element.SpaceDesc,
            time: this.formatTime(startDate, endDate),
          };
          this.allEvents.push(event);
        }
      }
    },
    rotateEvents() {
      // first update also events
      this.fetchData();

      // don't rotate if max event is set to 1 or events are less than max events
      if (
        this.options.maxEvents < 2 ||
        this.allEvents.length <= this.options.maxEvents
      ) {
        this.events = this.allEvents.slice(0, this.options.maxEvents);
        return;
      }

      // rotate all events
      const maxPage = Math.ceil(this.allEvents.length / this.options.maxEvents);
      this.activePage++;

      if (this.activePage >= maxPage) {
        this.activePage = 0;
      }

      this.events = this.allEvents.slice(
        this.activePage * this.options.maxEvents,
        this.activePage * this.options.maxEvents + this.options.maxEvents
      );
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
      // show room set in options, if set
      if (this.options.room) room = this.options.room;

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
      // show room set in options, if set
      if (this.options.room) room = this.options.room;

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
  min-height: 93vh;
  background-color: #414649;
  padding-top: 65px;
  padding-left: 65px;
  padding-right: 65px;
  padding-bottom: 25px;

  font-feature-settings: "case" on, "lnum" on, "pnum" on;
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
}

.content-align-bottom {
  display: flex;
  align-items: end;
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
  width: 80vw;
}

#event-time {
  font-size: 32px;
  justify-content: right;
  flex: 0 0 240px;
  color: #b2b5b6;
}

#company {
  font-size: 22px;
  color: white;
  background-color: #666b6c;
  text-transform: uppercase;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  letter-spacing: 0.06em;

  max-width: 55vw;
  line-height: 33px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#event-name {
  line-height: 120% !important;
  letter-spacing: 0.01em;
  margin-top: 10px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: initial;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  max-width: 55vw;
}

.event-name-multiple {
  font-size: 42px;
  line-height: 120% !important;
  letter-spacing: 0.01em;
  margin-top: 10px;
}

.event-name-single {
  font-size: 72px;
  line-height: 120% !important;
  letter-spacing: 0.01em;
  margin-top: 10px;

  -webkit-line-clamp: 4;
}

#event-subtitle {
  font-family: Inter, sans-serif;
  margin-top: 10px;
}

.event-subtitle-multiple {
  font-size: 28px;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: 0.56px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: initial;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  max-width: 55vw;
}

.event-subtitle-single {
  font-size: 46px;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: 0.92px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: initial;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  max-width: 55vw;
  -webkit-line-clamp: 4;
}

.one-line-clamp {
  -webkit-line-clamp: 1;
}

.two-line-clamp {
  -webkit-line-clamp: 2;
}

#event-location {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  background-color: #666b6c;

  font-weight: bold;

  flex: 0 0 130px;
  width: 130px;
  height: 130px;

  padding: 20px;
}

#room {
  color: #ffffff;
  font-size: 24px;

  text-align: right;
}

#seminar {
  font-size: 60px;
  line-height: 44px;
  margin-top: 10px;

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

#footer {
  margin-top: 25px;
}

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

/**********************
SMALL
**********************/
@media only screen and (max-width: 932px) {
  #current-date-time {
    font-size: 54px;
  }

  #event-time {
    font-size: 22px;
    flex: 0 0 80px;
  }

  #company {
    font-size: 20px;
    text-transform: uppercase;
    padding: 5px;
    letter-spacing: 0.06em;

    max-width: 35vw;
  }

  #event-name {
    font-size: 38px;
    line-height: 1.1 !important;
    letter-spacing: 0.01em;
    max-width: 55vw;
  }

  #event-location {
    flex: 0 0 90px;
    width: 90px;
    height: 90px;
    padding: 15px;
  }

  #room {
    font-size: 18px;
  }

  #seminar {
    font-size: 50px;
    line-height: 34px;
  }
}
</style>

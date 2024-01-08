<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <body
    v-bind:style="{ 'font-family': this.options.fontName + ', sans-serif' }"
  >
    <header>
      <h1 class="title"><strong>TODAY</strong>.NOI.BZ.IT</h1>
      <img
        :src="require('@/assets/icons/NOI_2_BK_borderless.png')"
        class="noi-logo"
      />
    </header>
    <div class="slideshow-container full-height">
      <div class="content container-fluid">
        <div class="lines">
          <div class="row line" v-for="event in events" :key="event.key">
            <div class="col-xs-12 col-sm-7 col-lg-7 col-md-7 description">
              <!-- <h2 v-if="event.webAddress != null && event.webAddress != ''">
                <a :href="event.webAddress" target="_blank">
                  <strong> {{ event.title }} </strong>
                </a>
                <br />
                <small> {{ event.companyName }}</small>
              </h2> -->
              <!-- <h2 v-else> -->
              <h2>
                <strong> {{ event.title }} </strong>
                <br />
                <small> {{ event.companyName }} </small>
              </h2>
            </div>
            <div
              class="col-sm-5 col-xs-12 col-lg-5 col-lg-offset-0 col-md-5"
              style="justify-content: flex-end"
            >
              <div class="location">
                <a
                  class="room"
                  href="https://maps.noi.bz.it/en/"
                  target="_blank"
                  >{{ event.room }}</a
                >
              </div>
              <div class="starts-in">
                <div>
                  <small>
                    {{ event.time }}
                    <br />
                  </small>
                  <strong>
                    {{ event.startDate }}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <a href="https://opendatahub.com" target="_blank" class="footer-text"
            >powered by Open Data Hub
            <img
              :src="require('@/assets/icons/NOI_OPENDATAHUB_NEW_WH-01.png')"
              height="35px"
          /></a>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  name: "EventsToday",
  props: {
    options: Object,
    default: () => {
      return {};
    },
  },
  created: function () {
    this.fetchData();
  },
  data: function () {
    return {
      events: [],
      devMode: false,
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    };
  },
  methods: {
    async fetchData() {
      const baseURL =
        "https://tourism.api.opendatahub.com/v1/EventShort/GetbyRoomBooked?";

      const endDate = new Date();
      endDate.setUTCHours(24, 0, 0, 0);

      const params = new URLSearchParams([
        ["startdate", new Date().getTime()],
        ["eventlocation", this.options.eventLocation],
        ["datetimeformat", "uxtimestamp"],
        ["onlyactive", true],
        ["sortorder", "ASC"],
        ["origin", "webcomp-events-today-noi"],
      ]);

      const xhttp = new XMLHttpRequest();
      xhttp.open("GET", baseURL + params, false);
      xhttp.send();

      this.events = [];

      const items = JSON.parse(xhttp.response);
      for (let i = 0; i <= items.length - 1; i++) {
        let element = items[i];
        let startDate = new Date(element.RoomStartDate);
        let endDate = new Date(element.RoomEndDate);

        let event = {
          title: this.devMode
            ? { en: this.lorem, it: this.lorem, de: this.lorem }
            : element.EventTitle.en,
          subTitle: this.devMode
            ? { en: this.lorem, it: this.lorem, de: this.lorem }
            : element.Subtitle,
          companyName: element.CompanyName,
          webAddress: element.WebAddress,
          time: this.formatTime(startDate, endDate),
          room: element.SpaceDescList[0],
          // mapsLink: `https://maps.noi.bz.it/?shared=${}&lang=it`
        };
        this.events.push(event);
      }
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
    formatDate(date) {
      let options = {
        year: "2-digit",
        month: "short",
        day: "numeric",
      };
      let day = date.getDate();
      let formatStartDate = date.toLocaleDateString("it-it", options);
      if (day >= 10)
        formatStartDate =
          formatStartDate.charAt(0) +
          formatStartDate.charAt(1) +
          formatStartDate.charAt(2) +
          formatStartDate.charAt(3).toUpperCase() +
          formatStartDate.slice(4);
      else
        formatStartDate =
          formatStartDate.charAt(0) +
          formatStartDate.charAt(1) +
          formatStartDate.charAt(2).toUpperCase() +
          formatStartDate.slice(3);
      return formatStartDate;
    },
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";

.full-height {
  height: 100%;
}

.content {
  padding: 0;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 5em;
  padding: 25px;
  margin: 0;
}

h2 {
  font-size: 2.3em;
}

h2 small {
  font-size: 65%;
  line-height: 1;
  font-weight: bold;
  color: #8c8c8c;
}

h1.title {
  padding: 5px;
  font-size: 5em;
}

.slideshow-container {
  position: relative;
  padding: 20px;
  background-color: #000;
  min-height: 85vh;
}

.line {
  background-color: white;
  margin: 0;
  margin-bottom: 15px;
  padding: 0 20px;
  position: relative;
  display: block;
  height: 17vh;
}

.line > div {
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
}

body {
  /* font-family: "Source Sans Pro", sans-serif; */
  width: 100%;
  text-align: center;
  color: #000;
  font-size: 16px;
  margin: 0;
  min-height: 100vh;
  height: 100%;
  padding-bottom: 20px;
}

body > div {
  width: 100%;
}

.location {
  color: #fff;
  background-color: #000;
  padding: 10px 26px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 1.6em;
  font-weight: bold;
  max-width: 50%;
}

.location a {
  color: #000000;
}

.description {
  text-align: left;
}

a {
  color: #000;
  text-decoration: underline;
}

a.room {
  color: #ffffff;
}

.noi-logo {
  width: 155px;
  margin: 20px;
}

strong {
  font-weight: 600;
}

.starts-in {
  text-align: right;
  font-size: 2em;
  line-height: 1;
  justify-content: right;
}

.starts-in strong {
  font-size: 1.25em;
}
.footer {
  padding-top: 20px;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: right;
  z-index: 100001;
}
.footer-text {
  color: white;
}

@media screen and (min-width: 320px) and (max-width: 812px) {
  h1 {
    font-size: 2.6em;
  }

  header {
    display: block;
  }

  header .pull-left,
  header .pull-right {
    float: none !important;
  }

  .line {
    font-size: 12px;
    padding: 0;
    height: auto;
  }

  body {
    overflow: auto;
    padding-top: 2vh;
  }

  .clock {
    font-size: 1em;
  }

  .slideshow-container {
    height: max-content;
  }
}

@media screen and (min-width: 320px) and (max-width: 812px) and (orientation: portrait) {
  .location {
    max-width: none;
    margin: 0 40px;
  }

  .line > div {
    display: block;
  }

  .starts-in {
    padding: 15px;
  }

  .starts-in,
  .description {
    text-align: center;
  }

  .slideshow-container {
    height: max-content;
  }
}

@media screen and (min-width: 992px) and (max-height: 901px) and (orientation: landscape) {
  body {
    font-size: 10px;
  }
}

@media screen and (max-width: 1441px) and (max-height: 901px) and (orientation: landscape) {
  body {
    font-size: 12px;
  }
}

@media screen and (max-width: 1280px) and (min-height: 1024px) and (orientation: landscape) {
  body {
    font-size: 16px;
  }
}

@media screen and (max-width: 1600px) and (min-height: 900px) and (orientation: landscape) {
  body {
    font-size: 14px;
  }
}

@media screen and (max-width: 992px) and (min-width: 812px) and (orientation: landscape) {
  body {
    font-size: 8px;
  }
}
</style>

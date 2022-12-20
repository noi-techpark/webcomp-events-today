<template>
  <body>
    <header>
      <h1 class="title"><strong>TODAY</strong>.NOI.BZ.IT</h1>
      <iframe
        class="noi-logo"
        src="https://svgshare.com/f/oT_"
        frameborder="0"
      ></iframe>
    </header>
    <div class="slideshow-container full-height">
      <div class="content container-fluid">
        <div class="lines">
          <div class="row line" v-for="event in events" :key="event.key">
            <div class="col-xs-12 col-sm-7 col-lg-7 col-md-7 description">
              <h2 v-if="event.webAddress != null && event.webAddress != ''">
                <a :href="event.webAddress" target="_blank">
                  <strong> {{ event.shortName }} </strong>
                </a>
                <br />
                <small> {{ event.shortName }}</small>
              </h2>
              <h2 v-else>
                <strong> {{ event.shortName }} </strong>
                <br />
                <small> {{ event.companyName }} </small>
              </h2>
            </div>
            <div
              class="col-sm-5 col-xs-12 col-lg-5 col-lg-offset-0 col-md-5"
              style="justify-content: flex-end"
            >
              <div class="location">
                <span v-for="(room, index) in event.rooms" :key="room.key">
                  <a
                    v-if="index < 3"
                    class="room"
                    href="https://maps.noi.bz.it/en/"
                    target="_blank"
                    >{{ room }}</a
                  >
                  <span v-else>...</span>
                  <span
                    v-if="
                      index >= 0 &&
                      index < 2 &&
                      event.rooms.length >= 2 &&
                      index != event.rooms.length - 1
                    "
                    >,</span
                  >
                </span>
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
  methods: {
    async fetchData() {
      const baseURL = "https://tourism.api.opendatahub.com/v1/EventShort?";

      const params = new URLSearchParams([
        ["startdate", new Date().getTime()],
        ["eventlocation", this.options.eventLocation],
        ["pagesize", 999],
        ["datetimeformat", "uxtimestamp"],
        ["onlyactive", true],
        ["sortorder", "ASC"],
      ]);

      fetch(baseURL + params, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        response.json().then((json) => {
          var items = json.Items;
          for (var i = 0; i <= items.length - 1; ++i) {
            let element = items[i];

            let startDate = new Date(element.StartDate);
            let endDate = new Date(element.EndDate);

            let roomsBooked = element.RoomBooked;
            let roomsSet = new Set();

            for (let i = 0; i < roomsBooked.length; i++)
              roomsSet.add(roomsBooked[i].SpaceDescRoomMapping);

            let rooms = Array.from(roomsSet);

            if (rooms.length > 3) rooms = rooms.splice(0, 4);

            let event = {
              shortName: element.Shortname,
              companyName: element.CompanyName,
              eventText: element.EventTextIT,
              webAddress: element.WebAddress,
              rooms: rooms,
              startDate: this.formatDate(startDate),
              time: this.formatTime(startDate, endDate),
            };

            this.events.push(event);
          }
        });
      });
    },
    formatTime(startDate, endDate) {
      return new String(
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
      var options = {
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
  created: function () {
    this.fetchData();
  },
  data: function () {
    return {
      events: [],
    };
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "../assets/source-sans-pro/style.css";

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
  width: 100%;
  text-align: center;
  font-family: "Source Sans Pro", sans-serif !important;
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
  font-family: "Source Sans Pro", sans-serif !important;
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
  width: 275px;
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

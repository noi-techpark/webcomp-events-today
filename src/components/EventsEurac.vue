<template>
  <body
    v-bind:style="{ 'font-family': this.options.fontName + ', sans-serif' }"
  >
    <header>
      <a href="https://www.eurac.edu/en"
        ><img
          :src="require('@/assets/icons/eurac_logo_white_WEB_neg.png')"
          class="eurac-logo"
      /></a>
      <h1 class="title">
        <span class="date">{{ currentDate() }}</span>
        <span class="time">{{ timestamp }}</span>
      </h1>
    </header>

    <div class="slideshow-container full-height">
      <div class="content container-fluid">
        <div
          v-if="!this.eventsLoaded || this.events.length > 0"
          class="lines"
          v-bind:style="{
            'margin-top': events.length === 1 ? '200px' : '',
          }"
        >
          <div
            class="row line line-separation"
            v-for="event in events"
            :key="event.key"
          >
            <div class="col-xs-8 col-sm-10 col-lg-10 col-md-10 description">
              <div class="starts-in">
                <div>
                  <small>
                    {{ event.time }}
                  </small>
                </div>
              </div>
              <h2 v-if="event.webAddress != null && event.webAddress != ''">
                <a :href="event.webAddress" target="_blank">
                  <strong> {{ event.shortName }} </strong>
                </a>
                <br />
                <small> {{ event.shortName }}</small>
              </h2>
              <h2>
                <small> {{ event.companyName }} </small>

                <br />
                <strong
                  v-bind:style="{
                    'font-size': events.length === 1 ? '72px' : '',
                    'line-height': events.length === 1 ? '1.2em' : '',
                    'letter-spacing': events.length === 1 ? '0.01em' : '',
                  }"
                >
                  {{ event.shortName }}
                </strong>
              </h2>
            </div>
            <div class="nopadding" style="justify-content: flex-end">
              <div class="location">
                <div class="rooms">
                  <span v-for="(room, index) in event.rooms" :key="room.key">
                    <div v-if="index < 2" class="room">
                      {{ getRoomName(room, index, event.rooms.length) }}
                    </div>
                    <div v-if="index < 2" id="seminar">
                      {{ getBigRoomName(room) }}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <img :src="this.currentImage" alt="image" class="imageGallery" />
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
  data: function () {
    return {
      events: [],
      images: [],
      timestamp: "",
      currentImageIndex: 0,
      currentImage: "",
      eventsLoaded: false,
    };
  },
  created: function () {
    this.loadImages();
    this.fetchData(setInterval(300000));
    setInterval(this.nextImage, this.options.imageGalleryInterval * 1000);
    setInterval(this.getNow, 1000);
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
      const baseURL = "https://tourism.api.opendatahub.com/v1/EventShort?";

      const endDate = new Date();
      endDate.setUTCHours(24, 0, 0, 0);

      const params = new URLSearchParams([
        ["startdate", new Date().getTime()],
        ["enddate", endDate.getTime()],
        ["eventlocation", this.options.eventLocation],
        ["room", this.options.room],
        ["pagesize", this.options.maxEvents ? this.options.maxEvents : 999],
        ["datetimeformat", "uxtimestamp"],
        ["onlyactive", true],
        ["sortorder", "ASC"],
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
      fetch(baseURL + params, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        response.json().then((json) => {
          let items = json.Items;
          for (let i = 0; i <= items.length - 1; ++i) {
            let element = items[i];

            let startDate = new Date(element.StartDate);
            let endDate = new Date(element.EndDate);

            let roomsBooked = element.RoomBooked;
            let roomsSet = new Set();

            for (const room of roomsBooked)
              roomsSet.add(room.SpaceDescRoomMapping);

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
          this.eventsLoaded = true;
        });
      });
    },
    loadImages() {
      const parser = new DOMParser();
      const imagesList = [];

      fetch(this.options.imageGalleryUrl, {
        method: "GET",
      }).then((response) => {
        response.text().then((text) => {
          // parse xml
          const xmlDoc = parser.parseFromString(text, "text/xml");

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
        });
      });
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
    currentDate() {
      const current = new Date();
      return current
        .toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
          day: "numeric",
        })
        .replace(",", "");
    },

    getRoomName(room, index, length) {
      // Seminar room special rule
      if (
        room.includes("Seminar") &&
        !room.includes("Seminar 2 and 3 unified") &&
        !room.includes("Seminar 1, 2 and 3 unified")
      )
        return "Seminar";
      if (length > 1 && index < length - 1) return room + ",";
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
      const dateTime = time;
      this.timestamp = dateTime;
    },
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";

body {
  width: 100%;
  line-height: 1.3 !important;
  text-align: right;
  color: white;
  font-size: 18px !important;
  margin: 0;
  min-height: 100vh;
  height: 100%;
  padding-bottom: 20px;
}

body > div {
  width: 100%;
}

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
  background-color: #414649;
}

h1 {
  font-size: 5em;
  padding: 25px;
  margin: 0;
}

h1.title {
  padding: 5px;
  font-size: 5em;
  padding-top: 60px;
}
h2 {
  font-size: 2.6em;
  line-height: 1.1 !important;
  margin: 0 !important;
  width: 1163px;
  letter-spacing: 0.01em;
}

h2 small {
  font-size: 22px;
  color: white;
  background-color: #666b6c;
  padding: 5px 15px;
  max-width: 50%;
  width: 100px;
  height: 100px;
  text-transform: uppercase;
  padding: 5px;
  letter-spacing: 0.06em;
}

.slideshow-container {
  position: relative;
  padding: 15px;
  background-color: #414649;
  min-height: 85vh;
}

.line {
  background-color: #414649;
  margin: 0;
  margin-bottom: 15px;
  position: relative;
  display: block;
}

.line > div {
  height: 80%;
  overflow-wrap: break-word;
  display: flex;
}

.line-separation {
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  margin-right: 20px;
  margin-left: 20px;
  padding-top: 20px;
}

.location {
  color: #fff;
  background-color: #666b6c;
  padding: 19px 7px;

  letter-spacing: 0em;
  line-height: auto;
  position: relative;
  font-weight: bold;
  font-size: 24px;

  width: 154px;
  height: 169px;

  margin-top: 6px;
  justify-content: flex-end !important;
  margin-bottom: 20px;
}

.location a {
  color: #000000;
}

.rooms {
  margin-top: 30px;
}

.room {
  color: #ffffff;
}

#seminar {
  font-size: 60px;

  line-height: 100%;
  right: 10px;
}

.description {
  text-align: left;
}

a {
  color: #000;
}

a:hover {
  text-decoration: none !important;
}

.eurac-logo {
  width: 263px;
  padding-left: 38px;
  padding-top: 35px;
}

strong {
  font-weight: 600;
  font-size: 36px;
}

.starts-in {
  font-size: 32px;
  justify-content: right;
  padding-right: 40px;
  padding-top: 7px;
  width: 220px;
  color: #b2b5b6;
}

.starts-in strong {
  font-size: 1.25em;
}

.date {
  padding-right: 60px;
  font-size: 64px;
  text-transform: uppercase;
}

.time {
  font-size: 24px;
  padding-right: 30px;
  color: #b2b5b6;
  font-weight: bold;
  margin-bottom: 200px;
  vertical-align: super;
}

.picframe img {
  height: none !important;
}

.nopadding {
  padding: 0 !important;
  margin: 0 !important;
}

.imageGallery {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  object-fit: cover;
  object-position: 0 0;
}

.footer {
  position: absolute;
  padding: 0px 30px;
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

  h1.title {
    padding-top: 58px;
  }

  h2 {
    font-size: 2.6em;
    line-height: 1.5 !important;
    margin: 0 !important;
    width: 575px;
    letter-spacing: 0.01em;
    padding-top: 10px;
  }

  h2 small {
    font-size: 15px;
  }

  strong {
    font-size: 36px !important;
  }

  header {
    padding: 30px;
    padding-bottom: 0px;
  }

  header .pull-left,
  header .pull-right {
    float: none !important;
  }

  .line {
    font-size: 8px;
    padding: 0;
    height: auto;
  }

  .line-separation {
    padding-top: 20px;
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
    padding-top: 0px;
  }

  .location {
    color: #fff;
    background-color: #666b6c;
    padding: 10px 7px;
    font-size: 2em;
    font-weight: 700;
    width: 124px;
    height: 134px;
    margin-top: 6px;
    margin-bottom: 20px;
  }
  #seminar {
    font-size: 20px;
  }

  .date {
    font-size: 20px;
  }

  .time {
    padding-right: 0px !important;
    font-size: 12px;
  }

  .starts-in {
    font-size: 20px;
  }

  .eurac-logo {
    padding-left: 6px;
    margin-right: 130px;
    width: 200px;
  }

  .imageGallery {
    position: inherit;
  }

  .date {
    font-size: 20px;
    padding-right: 28px;
  }

  .footer-text {
    font-size: 10px;
  }
}

@media screen and (min-width: 320px) and (max-width: 812px) and (orientation: portrait) {
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

@media screxen and (max-width: 1280px) and (min-height: 1024px) and (orientation: landscape) {
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

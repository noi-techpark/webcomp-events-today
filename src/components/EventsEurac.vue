<template>
  <body>
    <header>
      <a href="https://www.eurac.edu/en"
        ><img src="https://svgshare.com/i/qnx.svg" class="eurac-logo"
      /></a>
      <h1 class="title">
        <span class="date">{{ currentDate() }}</span>
        <span class="time">{{ timestamp }}</span>
      </h1>
    </header>

    <div class="slideshow-container full-height">
      <div class="content container-fluid">
        <div class="line-separation"></div>
        <div v-if="this.events.length > 0" class="lines">
          <div
            class="row line line-separation"
            v-for="event in events"
            :key="event.key"
          >
            <div class="col-xs-8 col-sm-10 col-lg-7 col-md-7 description">
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
              <h2 v-else>
                <small> {{ event.companyName }} </small>

                <br />
                <strong> {{ event.shortName }} </strong>
              </h2>
            </div>
            <div
              class="col-sm-2 col-xs-4 col-lg-5 col-lg-offset-0 col-md-5 nopadding"
              style="justify-content: flex-end"
            >
              <div class="location">
                <span v-for="(room, index) in event.rooms" :key="room.key">
                  <a v-if="index < 3" class="room">{{ room }}</a>
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
            </div>
          </div>
        </div>
        <div v-else>
          <img :src="this.currentImage" alt="image" class="imageGallery" />
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
      timestamp: "",
      currentImageIndex: 0,
      currentImage:
        "https://s3.eu-west-1.amazonaws.com/it.bz.noi.today.eurac.gallery/0.png",
    };
  },
  created: function () {
    // this.events = this.listBucket();
    this.fetchData();
    setInterval(this.nextImage, this.options.imageGalleryInterval * 1000);
    setInterval(this.getNow, 1000);
  },
  methods: {
    nextImage() {
      this.currentImageIndex++;
      if (this.currentImageIndex > 4) {
        this.currentImageIndex = 0;
      }
      this.currentImage = `https://s3.eu-west-1.amazonaws.com/it.bz.noi.today.eurac.gallery/${this.currentImageIndex}.png`;
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
        ["pagesize", 999],
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
    listBucket() {
      const parser = new DOMParser();

      fetch(
        "https://s3.eu-west-1.amazonaws.com/it.bz.noi.today.eurac.gallery",
        {
          method: "GET",
        }
      ).then((response) => {
        const xmlDoc = parser.parseFromString(response, "text/xml");
        console.log(xmlDoc);
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
@import "../assets/source-sans-pro/style.css";
@import "../assets/milo-pro/style.css";

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
  line-height: 1.5 !important;
  margin: 0 !important;
  width: 400px;
}
h2 small {
  font-size: 55%;
  color: white;
  background-color: #666b6c;
  padding: 5px 15px;
  max-width: 50%;
  width: 100px;
  height: 100px;
  text-transform: uppercase;
  padding: 5px;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  margin-right: 20px;
  margin: 20px;
}
body {
  width: 100%;
  text-align: center;
  font-family: "Source Sans Pro", sans-serif !important;
  color: white;
  font-size: 8px !important;
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
  background-color: #666b6c;
  padding: 15px 10px;
  font-size: 2em;
  font-weight: bold;
  width: 120px;
  height: 120px;
  margin-top: 6px;
  justify-content: flex-end !important;
  margin-bottom: 20px;
}
.location a {
  color: #000000;
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
a.room {
  color: #ffffff;
}
.eurac-logo {
  width: 200px;
  padding-left: 38px;
  padding-top: 30px;
}
strong {
  font-weight: 600;
}
.starts-in {
  font-size: 2.4em;
  justify-content: right;
  padding-right: 65px;
  padding-top: 5px;
  width: 200px;
}
.starts-in strong {
  font-size: 1.25em;
}
.date {
  padding-right: 60px;
  font-size: 30px;
}
.time {
  font-size: 15px;
  padding-right: 30px;
  color: #a2a7a6;
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
@media screen and (min-width: 320px) and (max-width: 812px) {
  h1 {
    font-size: 2.6em;
  }
  h1.title {
    padding-top: 62px;
  }
  h2 {
    width: 300px;
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
  .date {
    font-size: 20px;
  }
  .time {
    padding-right: 0px !important;
    font-size: 12px;
  }
  .eurac-logo {
    padding-left: 0px;
    margin-right: 130px;
    padding-bottom: 20px;
  }
  .imageGallery {
    object-fit: fill;
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

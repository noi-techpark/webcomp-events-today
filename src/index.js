import { LitElement, html, css } from "lit";
import logo from "./noi-black.svg";

export class EventsToday extends LitElement {
  static styles = css`
    /* latin-ext */

    @font-face {
      font-family: "Source Sans Pro";
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(./source-sans-pro/sans-pro-ext-400.woff2) format("woff2");
      unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
        U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }

    /* latin */

    @font-face {
      font-family: "Source Sans Pro";
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(./source-sans-pro/sans-pro-400.woff2) format("woff2");
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
        U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
        U+2212, U+2215, U+FEFF, U+FFFD;
    }

    /* latin-ext */

    @font-face {
      font-family: "Source Sans Pro";
      font-style: normal;
      font-weight: 600;
      font-display: swap;
      src: url(./source-sans-pro/sans-pro-ext-600.woff2) format("woff2");
      unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
        U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }

    /* latin */

    @font-face {
      font-family: "Source Sans Pro";
      font-style: normal;
      font-weight: 600;
      font-display: swap;
      src: url(./source-sans-pro/sans-pro-600.woff2) format("woff2");
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
        U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
        U+2212, U+2215, U+FEFF, U+FFFD;
    }

    /* latin-ext */

    @font-face {
      font-family: "Source Sans Pro";
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(./source-sans-pro/sans-pro-ext-700.woff2) format("woff2");
      unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
        U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }

    /* latin */

    @font-face {
      font-family: "Source Sans Pro";
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(./source-sans-pro/sans-pro-700.woff2) format("woff2");
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
        U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
        U+2212, U+2215, U+FEFF, U+FFFD;
    }

    .full-height {
      height: 100%;
    }
    * {
      box-sizing: border-box;
    }
    .content {
      padding: 0;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    h1,
    h2 {
      font-family: inherit;
      font-weight: 500;
      line-height: 1.1;
      margin-top: 20px;
      margin-bottom: 10px;
      color: inherit;
      font-family: "Source Sans Pro", sans-serif !important;
    }
    h1 {
      font-size: 5em;
      padding: 25px;
      margin: 0;
    }
    h1.title {
      padding: 5px;
      font-size: 5em;
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
    .bdy {
      font-family: "Source Sans Pro", sans-serif !important;
      width: 100%;
      text-align: center;
      color: #000;
      font-size: 16px;
      margin: 0;
      min-height: 100vh;
      height: 100%;
      padding-bottom: 20px;
    }
    .bdy.div {
      width: 100%;
    }
    .container-fluid {
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
    }
    .container-fluid:after,
    .row:before,
    .row:after {
      display: table;
      content: " ";
    }
    .container-fluid:after {
      clear: both;
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
    }
    a.room {
      color: #ffffff;
    }
    .noi-logo {
      width: 258px;
    }
    strong {
      font-weigth: 600;
    }
    .col-sm-7,
    .col-xs-12,
    .col-lg-7,
    .col-md-7,
    .col-sm-5,
    .col-lg-5,
    .col-md-5 {
      position: relative;
      min-height: 1px;
      padding-right: 15px;
      padding-left: 15px;
      float: left;
    }
    .col-xs-12 {
      width: 100%;
    }
    .col-lg-7,
    .col-md-7,
    .col-sm-7 {
      width: 58.33333333%;
    }
    .col-sm-5,
    .col-lg-5,
    .col-md-5 {
      width: 41.66666667%;
    }
    .col-lg-offset-0 {
      margin-left: 0;
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
    .clock {
      font-size: 20px;
      line-height: 20px;
      font-family: "Source Sans Pro", sans-serif !important;
    }
    day {
      font-weight: normal;
      font-size: 24px;
      color: #fff;
    }
    .row {
      margin-right: -15px;
      margin-left: -15px;
    }
    *:before,
    *:after {
      box-sizing: border-box;
    }
    @media screen and (min-width: 320px) and (max-width: 812px) {
      h1 {
        font-size: 2.6em;
      }
      header {
        display: block;
      }
      .line {
        font-size: 12px;
        padding: 0;
      }
      .line {
        font-size: 1.3vw;
      }
      .bdy {
        overflow: auto;
        font-size: 1.3vw;
        padding-top: 2vh;
      }
      .clock {
        font-size: 1em;
      }
      .slideshow-container {
        height: max-content;
      }
    }
    @media screen and (min-width: 812px) and (max-width: 830px) {
      .clock {
        font-size: 17px;
      }
      .day {
        font-size: 16px;
      }
    }
    @media screen and (min-width: 769px) and (max-width: 811px) {
      h2 {
        font-size: 2em;
      }
      .clock {
        font-size: 15px;
      }
      .day {
        font-size: 16px;
      }
    }
    @media screen and (min-width: 712px) and (max-width: 768px) {
      .clock {
        font-size: 14px;
      }
      .day {
        font-size: 14px;
      }
      .location {
        font-size: 1.4em;
      }
    }
    @media screen and (min-width: 647px) and (max-width: 711px) {
      .clock {
        font-size: 11px;
      }
      .day {
        font-size: 11px;
      }
      .location {
        font-size: 1.3em;
      }
    }
    @media screen and (min-width: 458px) and (max-width: 646px) {
      .clock {
        font-size: 10px;
      }
      .day {
        font-size: 10px;
      }
      .location {
        font-size: 1.3em;
      }
    }
    @media screen and (min-width: 320px) and (max-width: 458px) {
      .clock {
        font-size: 8px;
      }
      .day {
        font-size: 8px;
      }
      .location {
        font-size: 1.2em;
      }
    }
    @media screen and (max-width: 1441px) and (max-height: 901px) {
      .bdy {
        font-size: 11px;
      }
    }
    @media screen and (max-width: 1280px) and (min-height: 1024px) {
      .bdy {
        font-size: 16px;
      }
    }
    @media screen and (max-width: 1600px) and (min-height: 900px) {
      .bdy {
        font-size: 14px;
      }
    }
    @media screen and (max-width: 992px) and (min-width: 812px) {
      .bdy {
        font-size: 8px;
      }
    }
  `;

  static properties = {
    template: { type: Array },
    language: { type: String },
    eventLocation: { type: String },
    fetched: { type: Boolean },
  };

  constructor() {
    super();
    this.language = "IT";
    this.template = [];
    this.fetched = false;
    this._fetchData();
  }

  render() {
    if (!this.fetched) {
      this._fetchData();
      this.fetched = false;
    }

    return html`
      <div class="bdy">
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
              ${this.template.map((templateItem) => html`${templateItem}`)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _fetchData() {
    const baseURL = "https://tourism.api.opendatahub.com/v1/EventShort?";

    const params = new URLSearchParams([
      ["startdate", new Date().getTime()],
      ["eventlocation", this.eventLocation],
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

          let event = {
            shortName: element.Shortname,
            companyName: element.CompanyName,
            eventText: element.EventTextIT,
            webAddress: element.WebAddress,
            rooms: rooms,
            startDate: this._formatDate(startDate),
            time: this._formatTime(startDate, endDate),
          };

          this._pushEvent(event);
        }
        this.requestUpdate();
        this.fetched = true;
      });
    });
  }

  _pushEvent(event) {
    this.template.push(html`
      <div class="row line">
        <div class="col-xs-12 col-sm-7 col-lg-7 col-md-7 description">
          ${this._webAddressIsNotNull(event)}
        </div>
        <div
          class="col-sm-5 col-xs-12 col-lg-5 col-lg-offset-0 col-md-5"
          style="justify-content:flex-end"
        >
          <div class="location">
            <span>
              ${event.rooms.map((room, index) =>
                this._showLocation(room, index, event.rooms.length)
              )}</span
            >
          </div>
          <div class="starts-in">
            <small class="clock">${event.time}</small>
            <div class="clock day">
              <strong>${event.startDate} </strong>
            </div>
          </div>
        </div>
      </div>
    `);
  }

  _webAddressIsNotNull(event) {
    if (event.webAddress != null && event.webAddress != "")
      return html`<h2>
        <a href="${event.webAddress}" target="_blank">
          <strong class="description"> ${event.shortName} </strong>
        </a>
        <br />
        <small> ${event.companyName} </small>
      </h2>`;
    else
      return html`
        <h2>
          <strong> ${event.shortName} </strong>
          <br />
          <small> ${event.companyName} </small>
        </h2>
      `;
  }

  _showLocation(room, index, length) {
    if (index === 2 || length === 1 || (index === 1 && length === 2))
      return html`<a
        class="room"
        href="https://maps.noi.bz.it/en/"
        target="_blank"
      >
        ${room}</a
      >`;
    else if (index < 2)
      return html`<a
          class="room"
          href="https://maps.noi.bz.it/en/"
          target="_blank"
          >${room}</a
        >, `;
    else if (index === 3) return html`...`;
  }

  _formatTime(startDate, endDate) {
    return new String(
      startDate.getHours() +
        ":" +
        String(startDate.getMinutes()).padStart(2, "0") +
        " - " +
        endDate.getHours() +
        ":" +
        String(endDate.getMinutes()).padStart(2, "0")
    );
  }

  _formatDate(date) {
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
  }
}

customElements.define("events-today", EventsToday);

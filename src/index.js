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
      font-size: 2.6em;
      padding: 25px;
      margin: 0;
    }
    h2 small {
      font-weight: bold;
      color: #8c8c8c;
    }
    small {
      font-size: 65%;
      line-height: 1;
    }
    .slideshow-container {
      height: max-content;
      width: 95%;
      min-height: 100vh;
      position: relative;
      padding: 20px;
      background-color: #000;
    }
    .line {
      background-color: white;
      width: 96%;
      margin: 0;
      margin-bottom: 15px;
      padding: 0 20px;
      position: relative;
      display: block;
      height: 20vh;
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
    .container-fluid {
      width: 100%;
      margin-right: auto;
      margin-left: auto;
      margin-top: auto;
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
    .description {
      text-align: left;
    }
    a {
      color: #000000;
    }
    a.room {
      color: #ffffff;
    }
    .noi-logo {
      width: 150px;
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
    .location a {
      color: #fff;
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
      line-height: 30px;
    }
    .row {
      margin-right: -15px;
      margin-left: -15px;
    }
  `;

  static properties = {
    template: { type: Array },
    language: { type: String },
    eventLocation: { type: String },
  };

  constructor() {
    super();
    this.eventLocation = "NOI";
    this.fetchData();
    this.language = "IT";
    this.template = [];
  }

  render() {
    return html`
      <header>
        <h1 class="title">
          <strong> NOI </strong>
          Events
        </h1>
        <img class="noi-logo" src=${logo} />
      </header>
      <body>
        <div class="slideshow-container full-height">
          <div class=" content container-fluid">
            <div class="lines">
              ${this.template.map((templateItem) => html`${templateItem}`)}
            </div>
          </div>
        </div>
      </body>
    `;
  }

  fetchData() {
    const baseURL = "https://tourism.api.opendatahub.com/v1/EventShort?";

    const params = new URLSearchParams([
      ["startdate", new Date().getTime()],
      ["eventlocation", this.eventLocation],
      ["pagesize", 999],
      ["datetimeformat", "uxtimestamp"],
      ["onlyactive", true],
      ["sortorder", "ASC"],
    ]);

    console.log(baseURL + params);

    console.log(baseURL + params);

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
          var options = {
            year: "2-digit",
            month: "short",
            day: "numeric",
          };

          var element = items[i];

          let startDate = new Date(element.StartDate);
          let endDate = new Date(element.EndDate);

          var event = {
            shortName: element.Shortname,
            companyName: element.CompanyName,
            eventText: element.EventTextIT,
            webAddress: element.WebAddress,
            room: element.AnchorVenueRoomMapping,
            startDate: startDate
              .toLocaleDateString("it-it", options)
              .toUpperCase(),
            time: this._formatTime(startDate, endDate),
          };

          this._pushEvent(event);
        }
        this.requestUpdate();
      });
    });
  }

  _pushEvent(event) {
    console.log(event.time);
    if (
      event.webAddress != undefined &&
      event.webAddress != null &&
      event.webAddress != ""
    )
      this.template.push(html`
        <div class="row line">
          <div class="col-xs-12 col-sm-7 col-lg-7 col-md-7 description">
            <h2>
              <a href="${event.webAddress}" target="_blank">
                <strong class="desc"> ${event.shortName} </strong>
              </a>
              <br />
              <small> ${event.companyName} </small>
            </h2>
          </div>
          <div
            class="col-sm-5 col-xs-12 col-lg-5 col-lg-offset-0 col-md-5"
            style="justify-content:flex-end"
          >
            <div class="location">${event.room}</div>
            <div class="starts-in">
              <div class="clock">${event.startDate}</div>
              <div class="clock">${event.time}</div>
            </div>
          </div>
        </div>
      `);
    else {
      this.template.push(html`
        <div class="row line">
          <div class="col-xs-12 col-sm-7 col-lg-7 col-md-7 description">
            <h2>
              ${event.shortName}
              <br />
              <small> ${event.companyName} </small>
            </h2>
          </div>
          <div
            class="col-sm-5 col-xs-12 col-lg-5 col-lg-offset-0 col-md-5"
            style="justify-content:flex-end"
          >
            <div class="location">
              <a class="room" href="https://maps.noi.bz.it/en/">
                ${event.room}</a
              >
            </div>
            <div class="starts-in">
              <div class="clock">${event.startDate}</div>
              <small class="clock">${event.time}</small>
            </div>
          </div>
        </div>
      `);
    }
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
}

customElements.define("events-today", EventsToday);

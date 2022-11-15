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

    .center {
      margin-top: auto;
      margin-bottom: auto;
      width: 50%;
      padding: 10px;
    }
    h1 {
      font-size: 5em;
      padding: 25px;
      margin: 0;
    }
    h1.title {
      padding: 5px;
      font-size: 3.5em;
    }
    h2 {
      font-size: 1.4em;
    }
    h2.description {
      text-align: left;
      line-break: anywhere;
    }
    .slideshow-container {
      height: max-content;

      min-height: 100vh;
      position: relative;
      padding: 20px;
      background-color: #000;
    }
    .full-height {
      height: 100%;
    }
    .line {
      background-color: white;
      margin: 0;
      margin-bottom: 15px;
      padding: 0 20px;
      position: relative;
      display: block;
      height: 18vh;
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
    .starts-in {
      text-align: right;
      font-size: 2em;
      line-height: 1;
      justify-content: right;
    }
    .container-fluid {
      width: 100%;
      margin-right: auto;
      margin-left: auto;
      margin-top: auto;
    }
    .location {
      color: #fff;
      background-color: #000;
      padding: 10px 26px;
      right: 1em;
      left: 65em;
      bottom: 3.1em;
      position: relative;
      margin-right: 20px;
      font-size: 1em;
      font-weight: bold;
      max-width: 10%;
      line-break: auto;
      text-align: center;
    }
    .description {
      text-align: left;
    }
    small {
      font-size: 0.7em;
      color: grey;
    }
    a {
      color: #000000;
    }
    a.room {
      color: #ffffff;
    }
    .noi-logo {
      width: 275px;
    }
    img {
      position: relative;
      left: 65em;
      bottom: 5em;
      padding: 0px;
    }
    .clock {
      font-size: 80px;
      line-height: 80px;
      font-size: 1em;
      padding: 10px;
      left: 67.5em;
      bottom: 6.5em;
      position: relative;
    }
    .date {
      margin-top: 5px;
      left: 68.2em;
      bottom: 2em;
      position: relative;
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
      <link href="fonts/source-sans-pro/style.css" rel="stylesheet" />
      <header id="header">
        <h1 class="title">
          <strong> NOI </strong>
          Events
        </h1>
        <img class="noi-logo" src=${logo} />
      </header>
      <body>
        <div class="slideshow-container full-height">
          <div class="container-fluid">
            ${this.template.map((templateItem) => html`${templateItem}`)}
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
        <div class="line">
          <div class="description">
            <h2 class="description">
              <a href="${event.webAddress}" target="_blank">
                ${event.shortName}
              </a>
            </h2>
            <h2>
              <small> ${event.companyName} </small>
            </h2>
          </div>
          <div style="justify-content:flex-end">
            <div class="location">
              <a class="room" href="https://maps.noi.bz.it/en/">
                ${event.room}</a
              >
            </div>
          </div>
          <div>${event.startDate}</div>
          <div class="clock">${event.time}</div>
        </div>
      `);
    else {
      this.template.push(html`
        <div class="line">
          <div class="description">
            <h2 class="description">
              ${event.shortName}
              <br />
              <small> ${event.companyName} </small>
            </h2>
          </div>
          <div style="justify-content:flex-end">
            <div class="location">
              <a class="room" href="https://maps.noi.bz.it/en/">
                ${event.room}</a
              >
            </div>
          </div>
          <div class="date">${event.startDate}</div>
          <div class="clock">${event.time}</div>
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

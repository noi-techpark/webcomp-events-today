import { LitElement, html, css } from "lit";

export class EventsToday extends LitElement {
  static styles = css`
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
    h2 {
      font-size: 1.4em;
    }
    h2.description {
      text-align: left;
      line-break: anywhere;
    }
    h1.title {
      padding: 5px;
      font-size: 3.5em;
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
      --bs-gutter-x: 1.5rem;
      --bs-gutter-y: 0;
      width: 100%;
      padding-right: calc(var(--bs-gutter-x) * 0.5);
      padding-left: calc(var(--bs-gutter-x) * 0.5);
      margin-right: auto;
      margin-left: auto;
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
      <header id="header">
        <h1 class="title">
          <strong> NOI </strong>
          Events
        </h1>
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
          var element = items[i];

          var event = {
            shortName: element.Shortname,
            companyName: element.CompanyName,
            eventText: element.EventTextIT,
            webAddress: element.WebAddress,
            room: element.AnchorVenueRoomMapping,
            startDate: new Date(element.StartDate),
          };

          this._pushEvent(event);
        }
        this.requestUpdate();
      });
    });
  }

  _pushEvent(event) {
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
        </div>
      `);
    }
  }
}

customElements.define("events-today", EventsToday);

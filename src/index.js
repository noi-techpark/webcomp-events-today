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
      padding: 15px;
      margin-bottom: 50px;
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
      margin-left: 1000px;
      margin-right: 20px;
      font-size: 1.6em;
      font-weight: bold;
      max-width: 10%;
    }
    .description {
      text-align: left;
    }
    small {
      font-size: 0.7em;
      color: grey;
    }
  `;

  static properties = {
    template: { type: Array },
    language: { type: String },
  };

  constructor() {
    super();
    this.fetchData("NOI");
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

  fetchData(eventLocation) {
    const baseURL = "https://tourism.api.opendatahub.com/v1/EventShort?";

    const params = new URLSearchParams([
      ["startdate", new Date().getTime()],
      ["eventlocation", eventLocation],
      ["pagesize", 999],
      ["datetimeformat", "uxtimestamp"],
      ["onlyactive", true],
      ["sortorder", "ASC"],
    ]);

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

          var NOIevent = {
            shortName: element.Shortname,
            companyName: element.CompanyName,
            eventText: element.EventTextIT,
            webAddress: element.WebAddress,
            room: element.AnchorVenueRoomMapping,
            startDate: new Date(element.StartDate),
          };

          this._pushEvent(NOIevent);
        }
        this.requestUpdate();
      });
    });
  }

  _pushEvent(NOIevent) {
    if (
      NOIevent.webAddress != undefined &&
      NOIevent.webAddress != null &&
      NOIevent.webAddress != ""
    )
      this.template.push(html`
        <div class="line">
          <div class="description">
            <h2 class="description">
            <a href="${NOIevent.webAddress} target="_blank">
              ${NOIevent.shortName}
              </a></h2>
            <h2>
              <small> ${NOIevent.companyName} </small>
            </h2>
          </div>
          <div style="justify-content:flex-end">
            <div class="location">
            ${NOIevent.room}
            </div>
          </div>
        </div>
      `);
    else {
      this.template.push(html`
        <div class="line">
          <div class="description">
            <h2 class="description">
              ${NOIevent.shortName}
              <br />
              <small> ${NOIevent.companyName} </small>
            </h2>
          </div>
          <div style="justify-content:flex-end">
            <div class="location">
              <span>${NOIevent.room}</span>
            </div>
          </div>
        </div>
      `);
    }
  }
}

customElements.define("events-today", EventsToday);

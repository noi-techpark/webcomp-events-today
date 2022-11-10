import { LitElement, html, css } from "lit";
import axios from "axios";

export class EventsToday extends LitElement {
  static styles = css`
    .slideshow-container {
      height: max-content;
      padding: 0 20px;
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
      height: 17vh;
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
    .col-sm-7 {
      flex: 0 0 auto;
      width: 58.33333333%;
    }
    .col-lg-7 {
      flex: 0 0 auto;
      width: 58.33333333%;
    }
    .col-md-7 {
      flex: 0 0 auto;
      width: 58.33333333%;
    }
    .col-12 {
      flex: 0 0 auto;
      width: 100%;
    }
    .col-sm-7 {
      flex: 0 0 auto;
      width: 58.33333333%;
    }
    .col-lg-5 {
      flex: 0 0 auto;
      width: 41.66666667%;
    }
    .offset-lg-0 {
      margin-left: 0;
    }
    .col-lg {
      flex: 1 0 0%;
    }
    .col-md-5 {
      flex: 0 0 auto;
      width: 41.66666667%;
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
      margin-left: 20px;
      margin-right: 20px;
      font-size: 1.6em;
      font-weight: bold;
      max-width: 50%;
    }
    .description {
      text-align: left;
    }
  `;

  static properties = {
    NOIevent: {
      ShortName: "",
      CompanyName: "",
      EventText: "",
      WebAddress: "",
      Room: "",
    },
    template: { type: Array },
    language: { type: String },
  };

  constructor() {
    super();
    this.fetchData();
    this.language = "IT";
    this.template = [];
  }

  render() {
    return html`
      <header id="header">
        <h1>
          <strong> NOI </strong>
          Events
        </h1>
      </header>
      <body>
        <div class="slideshow-container" class="full-height">
          <div class="container-fluid">
            ${this.template.map((templateItem) => html`${templateItem}`)}
          </div>
        </div>
      </body>
    `;
  }

  fetchData() {
    const params = new URLSearchParams([
      ["startdate", new Date().getTime()],
      ["eventlocation", "NOI"],
      ["datetimeformat", "uxtimestamp"],
      ["onlyactive", true],
    ]);

    fetch("https://tourism.api.opendatahub.com/v1/EventShort?" + params, {
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

          this.NOIevent = {
            ShortName: element.Shortname,
            CompanyName: element.CompanyName,
            EventText: element.EventTextIT,
            WebAddress: element.WebAddress,
            Room: element.AnchorVenueRoomMapping,
          };

          this._pushEvent();

          console.log(this.NOIevent);
        }
      });
    });
  }

  _pushEvent() {
    this.template.push(html`
      <div class="line">
        <div class="col-sm-7 col-12 description col-lg-7 col-md-7">
          <h2>
            ${this.NOIevent.ShortName}
            <br />
            <small> ${this.NOIevent.CompanyName} </small>
          </h2>
        </div>
        <div
          class="col-sm-5 col-12 col-lg-5 col-lg offset-lg-0 col-md-5"
          style="justify-content:flex-end"
        >
          <div class="location">
            <span>${this.NOIevent.Room}</span>
          </div>
        </div>
      </div>
    `);
  }
}

customElements.define("events-today", EventsToday);

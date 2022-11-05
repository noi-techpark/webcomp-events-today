import {LitElement, html, _$LE} from 'lit'
import axios from 'axios';

class EventsToday extends LitElement {
    static get properties(){
        return{
            events: {type: JSON},
        }
    }

    constructor(){
        super();
        this.events = this.fetchData();   
    }

    render() {
        return html`
        <p>Hello World </p>
        <button type="button"@click="${this._handleClick}"> Console log</button>
        `;
    }

    _handleClick(){
        console.log(this.events);
    }

    async fetchData() {
        const params = new URLSearchParams([['startdate', new Date().getTime()],
         ['eventlocation','NOI'],
         ['datetimeformat','uxtimestamp'],
         ['onlyactive', true]
         ]);

        let data = await axios.get("https://tourism.api.opendatahub.com/v1/EventShort", {params});

        return data;
    }
}



// Register our first Custom Element named <hello-world>
customElements.define('events-today', EventsToday);

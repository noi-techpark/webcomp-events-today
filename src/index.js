import {LitElement, html, css} from 'lit'
import axios from 'axios';


export class EventsToday extends LitElement {
    static get properties(){
        return{
            language:{type: String},
        }
    }

    constructor(){
        super();
        this.language = "IT"
    }

    render() {
        return html`
        <p> Hello World! </p>`
    }

    fetchData() {
        return new Promise((resolve,reject) => {
            var events = [];
            const params = new URLSearchParams([['startdate', new Date().getTime()],
             ['eventlocation','NOI'],
            ['datetimeformat','uxtimestamp'],
            ['onlyactive', true]
            ]);
       
            axios.get("https://tourism.api.opendatahub.com/v1/EventShort", {params})
            .then((response) =>{
                var items = response.data.Items;

                if(items.length != 0){
                    for(var i = 0; i <= items.length - 1; ++i){
                        var element = items[i];

                        events.push({
                            ShortName: element.Shortname,
                            CompanyName: element.CompanyName,
                            EventText: element.EventTextIT,
                            WebAddress: element.WebAddress
                        });
                    }
                    resolve(events);
                }
                else
                    reject("Error");       
                });
            });
        }

    _showEvents(){
        this.eventsPromise.then((items)=>{
            return html `
            <ul>
                ${items.map((item) => html`<li>${item.WebAddress}</li>`)}
            </ul>`
        }).catch(error => {
            console.log(error);
        }); 
    }

}

customElements.define('events-today', EventsToday);

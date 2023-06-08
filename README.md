<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# Events Today

![REUSE Compliance](https://github.com/noi-techpark/webcomp-events-today/actions/workflows/reuse.yml/badge.svg)

Events Today is a web component that displays a list of events that are happening. It fetches data from the [EventShort API](https://tourism.opendatahub.bz.it/swagger/index.html#/EventShort)  and displays the events in a simple, easy-to-read format.<br>


**Table of Contents**
- [Usage](#usage)
- [License](#license)
- [Support](#support)

## Usage
To use the "Events Today" web component, you need to include the following code in your HTML file: 
```html
<events-today></events-today>
```
### Attributes
#### <b>eventLocation</b>

The attribute eventLocation shows an abbreviation of the event location that is displayed. 
Only events that take place in the NOI Techpark building are displayed. 

Example:

````
eventLocation: {
      type: String,
      default: "NOI",
    }
````



#### <b>room</b>
The room attribute allows you to select events based on the specific room or location where the event will be held. The room attribute can be used as a filter to narrow down the search results and show only events that are taking place in a particular room or location.

Example:
````
room: {
      type: Sring,
      default: "Seminar 1",
    }
````

#### <b>maxEvents</b>

The maxEvents attribute controls the limit on the number of events that can be shown on a page.

Example:
````
maxEvents: {
      type: Number,
      default: 100,
    }
````

#### <b>imageGalleryInterval</b>

The imageGalleryInterval attribute's functionality is dependent on the theme that has been selected. When this attribute is used in a compatible theme, it creates a time delay, which is measured in seconds,  between the display of one image and the next one in an image gallery. 

Example:
````
imageGalleryInterval: {
      type: Number,
      default: 60,
    }
````

## License
The code in this project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3 license. See the [LICENSE.md](LICENSE.md) file for more information.

## Support
For support, please contact [help@opendatahub.com](mailto:help@opendatahub.com).

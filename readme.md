# Trybe SDK (Node)

## Installation
``bash
npm run build
npm install ../sdk_location
``

## Usage

```typescript
import Trybe from "trybe_node_sdk"

//Credenials & IsSandbox
const trybe = new Trybe({token: process.env.TOKEN, siteId: process.env.SITE_ID}, false);

const sessionsTypes = trybe.sessions.getTypes();

```

## Methods

- [Sessions](#.sessions)



### .sessions

**[getTypes](https://openapi.try.be/#operation/sessionTypeIndex)**

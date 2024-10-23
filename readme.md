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
- [Availability](#.availability)
- [Memberships](#.memberships)
- [Orders](#.orders)
- [Customers](#.customers)
- [Payments](#.payments)
- [Webhooks (BETA)](#.webhooks)


### .sessions

- [getTypes](https://openapi.try.be/#operation/sessionTypeIndex)
  - Params: (query: {})
- [addRecuring](https://openapi.try.be/#operation/sessionRecurrenceGroupStore)

### .availability

### .memberships

### .orders

### .customers

### .payments

### .webhooks

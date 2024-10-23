# Trybe Node SDK

## Installation
```bash
npm run build
npm install ../sdk_location
```

## Usage

```typescript
import Trybe from "trybe_node_sdk"

//Credenials & IsSandbox
const trybe = new Trybe({token: process.env.TOKEN, siteId: process.env.SITE_ID}, false);

const sessionsTypes = trybe.sessions.getTypes();

```

## Resources (WIP)

- [Sessions](#sessions)
- [Availability](#availability)
- [Memberships](#memberships)
- [Orders](#orders)
- [Customers](#customers)
- [Payments](#payments)
- [Webhooks (BETA)](#webhooks)


### .sessions

- [getTypes](https://openapi.try.be/#operation/sessionTypeIndex)
  - **GET** All Session Types
  - Params: (query: {})
- [addRecuring](https://openapi.try.be/#operation/sessionRecurrenceGroupStore)
  - **POST** New Recurence Group
- [getAllDetails](https://openapi.try.be/#operation/sessionsIndex)
  - **GET** Session Details

### .availability

- [sessions](https://openapi.try.be/#operation/getSessionAvailability)
  - **GET** Session Availability

### .memberships

- [addToCustomer](https://openapi.try.be/#operation/createMembershipOrder)
  - **POST** Attach Membership to Customer
- [getTypes](https://openapi.try.be/#operation/listMembershipTypes)
  - **GET** Membership Types
- [getRates](https://openapi.try.be/#operation/listMembershipRates)
  - **GET** Membership Rates
- [sendBillMandate](https://openapi.try.be/#operation/requestMandate)
  - **POST** Email Payment Request to Member

### .orders
- [addItem](https://openapi.try.be/#operation/orderAddItem)
  - **POST** Item to Order
- [addPayment](https://openapi.try.be/#operation/orderPaymentStore)
  - **POST** Payment to Order

### .customers
- [create](https://openapi.try.be/#operation/createCustomer)
- [getAll](https://openapi.try.be/#operation/listCustomers)
- [resetPassword](https://openapi.try.be/#operation/resetCustomerPassword)
  - **POST** Email Reset Password Prompt

### .payments
- [getAll](https://openapi.try.be/#operation/listPaymentMethods)

### .webhooks
- [create](https://docs.try.be/endpoints/WebhookConfig#createWebhookConfig)

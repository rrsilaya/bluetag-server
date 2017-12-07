<h1 align="center">
  <br />
  <img src="./assets/bt_original.png" alt="icon" width="450px" />
  <br/>
  <br/>
  BlueTag
  <br/>
  <img src="https://img.shields.io/badge/status-development-yellow.svg" />
  <img src="https://img.shields.io/badge/node-v8.3.0-green.svg" />
  <img src="https://img.shields.io/badge/express-v^4.16.2-green.svg" />
  <img src="https://img.shields.io/badge/mysql-v^2.15.0-green.svg" />
  <img src="https://img.shields.io/badge/MariaDB-v10.1.28-green.svg" />
  <br/>
</h1>
<h4 align="center">An open source retail shop monitoring system</h4>

## Installation
1. Clone this repository.
2. Install all the dependencies by running `yarn install`.
3. Run `yarn seed` to setup the database and `yarn populate` to populate with seed data. You will be prompted twice for your password.
4. Run the server using `yarn start`.
5. Access the API at `http://localhost:3001/api`.

## Available Routes
API root route is at `/api`.

|      Entity      |                Route                |
|------------------|-------------------------------------|
| apparel          | `/apparel`                          |
| auth             | `/login` or `/logout` or `/session` |
| discount         | `/discount`                         |
| employee         | `/employee`                         |
| log              | `/log`                              |
| orderRequest     | `/order`                            |
| orderRequestItem | `/item`                             |
| sale             | `/sale`                             |
| stock            | `/stock`                            |

> There are entities that are in plural which returns an array of that entity (i.e. apparel has `/apparels`).

## Payload Structure
All payload that will be sent by the server will be of the same structure as follows:
##### Success
```javascript
{
  status: 200,
  message: 'Successfully fetched logs',
  data: [...]
}
```

##### Failure
```javascript
{
  status: 500,
  message: 'Internal server error while fetching logs'
}
```

## Entities
* [Apparel](#apparel)
  - [Get Apparel List](#get-apparelspage)
  - [Get Apparel by ID](#get-apparelid)
  - [Add Apparel](#post-apparel)
  - [Edit Apparel](#put-apparelid)
  - [Delete Apparel](#delete-apparelid)
* [Authentication](#authentication)
  - [Login](#post-login)
  - [Logout](#post-logout)
  - [Get Current Session](#get-session)
* [Discount](#discount)
  - [Get Discount per Apparel](#get-discountsapparel)
  - [Add Discount per Apparel](#post-discountapparel)
  - [Edit Discount](#put-discountid)
  - [Delete Discount](#delete-discountid)
* [Employee](#employee)
  - [Get Employee List](#get-employeespage)
  - [Add Employee User](#post-employee)
  - [Delete Employee User](#delete-employeeusername)
* [Log](#log)
  - [Get Logs](#get-logspage)
  - [Get Logs per Employee](#get-logsemployeeusername)
  - [Get Log by ID](#get-logid)
* [Order](#order)
  - [Get Orders List](#get-orderspage)
  - [Get Order by ID](#get-orderid)
  - [Edit Order](#put-orderid)
  - [Delete Order](#delete-orderid)
* [Order Item](#order-item)
  - [Get Order Items per Request](#get-itemsrequest)
  - [Add Order Item per Request](#post-itemrequest)
  - [Edit Order Item](#put-itemid)
  - [Delete Order Item](#delete-itemid)
* [Sale](#sale)
  - [Get Sales per Apparel](#get-salesapparel)
  - [Add Sales per Apparel](#post-saleapparel)
  - [Delete Sale](#delete-saleid)
* [Statistics](#statistics)
  - [Get Statistics](#get-statistics)
* [Stock](#stock)
  - [Get Stocks per Apparel](#get-stocksapparel)
  - [Add Stock](#post-stock)
  - [Edit Stock](#put-stockid)
  - [Delete Stock](#delete-stockid)

### Apparel
#### `GET /apparels/:page`
##### Available Queries
* `category` - column to apply the sorting rules (DEFAULT: `brand`)
* `order` - `asc` (ascending) or `desc` (descending)
* `classification` - `fast` (fast-moving), `slow` (slow-moving) or `disposal` (disposal items)
* `label` - filter label (DEFAULT: `id`)
* `q` - filter query

##### Working Queries
```
/api/apparels/1
/api/apparels/1?category=id
/api/apparels/1?category=sellingPrice&order=desc
/api/apparels/1?label=brand&q=B
/api/apparels/1?q=a
```

#### `GET /apparel/:id`
*No other required information.*

#### `POST /apparel`
##### Request Body
* id
* brand
* type
* size
* color
* price

#### `PUT /apparel/:id`
##### Request Body (all are optional)
* brand
* type
* color
* price 

##### `DELETE /apparel/:id`
***Warning:*** `ON DELETE CASCADE` *is enabled for apparel entity.*

### Authentication
#### `POST /login`
##### Request Body
* username
* password

#### `POST /logout`
*No other required information.*

#### `GET /session`
*No other required information.*

### Discount
#### `GET /discounts/:apparel`
*No other required information.*

#### `POST /discount/:apparel`
##### Request Body
* rate

#### `PUT /discount/:id`
##### Request Body (all are optional)
* rate
* isActive

#### `DELETE /discount/:id`
*No other required information.*

### Employee
#### `GET /employees/:page`
*No other required information.*

#### `POST /employee`
##### Request Body
* username
* password
* type (`manager` or `employee`)

#### `DELETE /employee/:username`
*No other required information.*

### Log
#### `GET /logs/:page`
##### Available Queries
* category - column to apply the sorting rules (DEFAULT: `timestamp`)
* `order` - `asc` (ascending) or `desc` (descending) (DEFAULT: `desc`)

##### Working Queries
```
/api/logs/1
/api/logs/1?category=id
/api/logs/1?order=desc
/api/logs/1?category=employee&order=desc
```

#### `GET /logs/employee/:username`
*No other required information.*

#### `GET /log/:id`
*No other required information.*

### Order
#### `GET /orders/:page`
##### Available Queries
* `category` - column to apply the sorting rules (DEFAULT: `timestamp`)
* `order` - `asc` (ascending) or `desc` (descending) (DEFAULT: `desc`)
* `filter` - `cancelled`, `delivered`, or `pending`

##### Working Queries
```
/api/orders/1
/api/orders/1?category=id
/api/orders/1?category=company&order=desc
/api/orders/filter=cancelled
```

#### `GET /order/:id`
*No other required information.*

#### `PUT /order/:id`
##### Request Body (all are optional)
* status
* company

#### `DELETE /order/:id`
*No other required information.*

### Order Item
#### `GET /items/:request`
*No other required information.*

#### `POST /item/:request`
##### Request Body
* item
* qty

#### `PUT /item/:id`
##### Request Body (all are optional)
* item
* qty

#### `DELETE /item/:id`
*No other required information.*

### Sale
#### `GET /sales/:apparel`
*No other required information.*

#### `POST /sale/:apparel`
##### Request Body
* qty
* stock (stock id)

#### `DELETE /sale/:id`
*No other required information.*

### Statistics
#### `GET /statistics`
*No other required information.*

### Stock
#### `GET /stocks/:apparel`
*No other required information.*

#### `POST /stock`
##### Request Body
* qty
* apparel
* delivery

#### `PUT /stock/:id`
##### Request Body
* qty

#### `DELETE /stock/:id`
*No other required information.*

## Project Structure
```
.
├── assets/
├── build/
├── LICENSE
├── package.json
├── README.md
├── src/
│   ├── database
│   │   ├── entities
│   │   │   └── <entity>
│   │   │       ├── _views.sql
│   │   │       ├── indeces.sql
│   │   │       ├── procedures.sql
│   │   │       └── triggers.sql
│   │   ├── index.js
│   │   ├── schema.sql
│   │   └── seed.sql                        # seed data
│   ├── entities
│   │   ├── <entity>
│   │   │   ├── controller.js
│   │   │   └── router.js
│   │   └── _utils                          # utility functions for queries
│   │       ├── controller.js
│   │       ├── index.js
│   │       └── method.js
│   ├── index.js
│   └── router.js
└── yarn.lock
```

## Developers
* Afable, Lorenz Matthew
* Roxas, Harold James
* Silaya, Ralph Lawrence

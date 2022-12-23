<p align="center">
  <img width="460" height="300" src="https://user-images.githubusercontent.com/52816688/209206803-e714fa89-93bc-4e5f-bea9-875b27baaad3.svg">
</p>

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) ![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)


---
# Ecommerce Rest APIs :fire:

It is a rest api that i have created for learning purpose

## Run Locally :white_check_mark:

Clone the project

```bash
  git clone https://github.com/shivakumar139/ecommerce-rest-api-node.git
```

Go to the project directory

```bash
  cd ecommerce-rest-api-node
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn run dev
```
Create a new file called ```.env``` Copy all the content from ```.env.example``` and paste it into .env Change all url.


## Environment Variables :mushroom:

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

`APP_PORT` 

`DEBUG_MODE`

`DB_URL`

`JWT_SECRET` 

`REFRESH_SECRET` 

`APP_URL`

# API References :key:

## Variables

| Key | Value | Type |
| --- | ------|-------------|
| localhost | http://localhost:5000/api | default |



## Endpoints :point_left:
### [Auth](#auth)

* 
    1. [Login](#1-login)
    2. [Register](#2-register)
    3. [Who am I](#3-who-am-i)
    4. [Refresh Token](#4-refresh-token)
    5. [Log out](#5-log-out)


### [Products](#products)
* 
    1. [Create a product](#1-create-a-product)
    2. [Update product](#2-update-product)
    3. [Delete Product](#3-delete-product)
    4. [Get Single Product](#4-get-single-product)
    5. [Get All Products](#5-get-all-products)

--------



## Auth :seedling:



### 1. Login



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{localhost}}/login
```



***Body:***

```js        
{
    "email": "shiva@gmail.com",
    "password": "12345"
}
```



### 2. Register



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{localhost}}/register
```



***Body:***

```js        
{
    "name": "Shiva Kumar",
    "email": "shiva@gmail.com",
    "password": "12345",
    "repeat_password": "12345"
}
```



### 3. Who am I



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{localhost}}/me
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer {{access_token}} | **access_token** must be a valid JWT token. |



### 4. Refresh Token



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{localhost}}/refresh
```



***Body:***

```js        
{
    "refresh_token": "{{refresh_token}}"
}
```



### 5. Log out



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{localhost}}/logout
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer {{access_token}} | **access_token** must be a valid JWT token. |



***Body:***

```js        
{
    "refresh_token": "{{refresh_token}}"
}
```



## Products :moneybag:



### 1. Create a product



***Endpoint:***

```bash
Method: POST
Type: FORMDATA
URL: {{localhost}}/products
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer {{access_token}} | **access_token** must be a valid JWT token. |



***Body:***

| Key | Value | Type |
| --- | ------|-------------|
| image |  | img |
| name | margarita | string |
| price | 4099 | number |
| size | medium | string |



### 2. Update product



***Endpoint:***

```bash
Method: PUT
Type: FORMDATA
URL: {{localhost}}/products/63a1cadc57dffda2abe4e492
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer {{access_token}} | **access_token** must be a valid JWT token. |



***Body:***

| Key | Value | Type |
| --- | ------|-------------|
| name | Chicken Dominator | string |
| price | 909 | number |
| size | Medium | string |



### 3. Delete Product



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{localhost}}/products/63a1ce70106068dfed0dd378
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer {{access_token}} | **access_token** must be a valid JWT token. |



### 4. Get Single Product



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{localhost}}/products/63a1cf824c547ec296581085
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer {{access_token}} | **access_token** must be a valid JWT token. |



### 5. Get All Products



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{localhost}}/products
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer {{access_token}} | **access_token** must be a valid JWT token. |



---

## Tech Stack :heart:


**Server:** Node, Express

## [Postman](https://documenter.getpostman.com/view/24887117/2s8Z6savNK) ![postman-logo-icon-orange](https://user-images.githubusercontent.com/52816688/209198935-d0bfdd57-c236-4ed4-b717-90ca6dd4e290.svg) 
Get the postman files [here.](https://documenter.getpostman.com/view/24887117/2s8Z6savNK)



## Support :beer:

For support, connect on [linkedin](https://www.linkedin.com/in/shiva-kumar-8a2438175/)


## Feedback :pray:

If you have any feedback, please reach out to us at [linkedin](https://www.linkedin.com/in/shiva-kumar-8a2438175/)


# API Doc
> Good software is always opening its api to others.

## Introduction
Here are the APIs that power this `u2b.eu` , you can just use them in your software or even build your own URL shorter.

## API List
### Redirect
#### Introduction
- Adress: `/{shortened}`
- Description: redirect short url to corresponding long url.
- Method: `GET`

#### Parameters:

|field|type|detail|
|:-|:-|:-|
|shorten|string|From url, shortened URL.|

#### Response
Targeted URL is included in `location` headers, no response body.
### Shorten
#### Introduction
- Adress: `/`
- Description: shorten a long url, use `body` to pass parameters.
- Method: `PUT`
#### Parameters:

|field|type|detail|
|:-|:-|:-|
|urls|string|Long URL to shorten|
#### Response
```jsonc
{
    "code": 201, // error code
    "data": {
        "shortUrl": "https://u2b.eu/xxx", // shortened url
        "revokePwd": "aabbccdd" // revoke password
    }
}
```

### Revoke
#### Introduction
- Adress: `/{shortened}?revokePwd={revokepwd}`
- Description: Revoke a URL.
- Method: `DELETE`
#### Parameters:

|field|type|detail|
|:-|:-|:-|
|shorten|string|From url, shortened URL.|
|revokepwd|string|From query, revoke password.|

#### Response
```jsonc
{
    "code": 201,
    "msg": "Deleted"
}
```
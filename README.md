# emma-cat
A cat that follows me around Virtual RC https://recurse.rctogether.com/

## Setup
Get an app id and secret from Virtual RC. Then replace the placeholders in `emma-cat.js`.

Install dependencies with `npm install`.

## Run it locally
Run `node emma-cat.js`.

## How emma-cat is deployed
I have emma-cat running on a little Digital Ocean server. It uses the same command as above (`node emma-cat.js`) but I use `pm2` to keep it alive.

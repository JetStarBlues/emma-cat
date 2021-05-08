const axios = require("axios");
const ActionCable = require("actioncable-nodejs/src/actioncable.js");

const APP_ID =
  "put your app id here";
const APP_SECRET =
  "put your app secret here";

const uri = `wss://recurse.rctogether.com/cable?app_id=${APP_ID}&app_secret=${APP_SECRET}`;

let cable = new ActionCable(uri, {
  origin: "https://recurse.rctogether.com",
});

let subscription = cable.subscribe("ApiChannel", {
  connected() {
    console.log("connected");
  },

  disconnected() {
    console.log("disconnected");
  },

  rejected() {
    console.log("rejected");
  },

  received(data) {
    /* `data` looks like this:
    {
        type: 'entity',
        payload: {
          id: 6658,
          type: 'Avatar',
          pos: { x: 108, y: 60 },
          direction: 'right',
          muted: false,
          updated_at: '2021-03-19T22:45:03.235Z',
          image_path: 'https://d29xw0ra2h4o4u.cloudfront.net/assets/people/sonja_heinze_150-8143dddca992efbaa27b30bda80f5cfb656cbfae647d4aedc73131c2738936c9.jpg',
          person_name: 'Sonja Heinze',
          user_id: 889,
          last_present_at: '2021-03-19T21:04:56.591Z',
          last_idle_at: '2021-03-19T22:45:03.232Z',
          zoom_user_display_name: null,
          zoom_meeting_topic: null,
          message: {
            text: 'ouups! I might have missunderstood the virtual RC chat here',
            sent_at: '2021-02-22T17:35:36Z',
            mentioned_entity_ids: []
          }
        }
      }
      */

    // Move cat near Emma
    if (data?.payload?.person_name === "Emma Smith") {
      const emma = data.payload;
      const x = emma.pos.x + 1;
      const y = emma.pos.y + 1;
      moveEmmaCat(x, y)
    }

    // Move cat near fish
    if (data?.payload?.note_text?.includes("🐟")) {
        const { x: fishX, y: fishY } = data?.payload?.pos
        moveEmmaCat(fishX + 1, fishY)
    }
  },
});

function moveEmmaCat(x, y) {
    console.log(`moving to ${x}, ${y}`)
    const catBotId = "43253"
    const options = {
        method: "PATCH",
        url: "https://recurse.rctogether.com/api/bots/" + catBotId,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic ZDk1MzRiNmE4NDg3MzNjNDYwZTY2NTE1MDExOTAyMTBmZmYwNGIyMGI1YmMwNDhiOTA3NDMyNDViNTc5Y2EwZTowZWJjMDBjOTIwYWM2OTFmNGFiZmE1MzUyYzU1YTNlNDAwMjI3NDM3ZGZkYTU5ZTU0MmQ4NTU3ZmQxNjY4Zjhi",
        },
        data: { bot: { name: "emma-cat", x, y, emoji: "🐈" } },
    }
    axios
        .request(options)
        .then(function (response) {
              console.log("moveEmmaCat::response");
              console.log(response.data);
        })
        .catch(function (error) {
              console.log("moveEmmaCat::error");
              console.log(error.message);
        })
}


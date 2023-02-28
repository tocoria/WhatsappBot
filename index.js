import { dirname } from 'path';
import { fileURLToPath } from 'url';
import "dotenv/config.js";
import { gTTS } from 'simple-gtts';
import venom from 'venom-bot'
import fs from 'fs'
import { responseAi } from './services/generate.js';
import { decryptMedia } from '@open-wa/wa-decrypt';
import mime from 'mime-types';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { transcription, textRequest } from './services/transcript.js'
venom
  .create({
    session: 'ai-chat', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage(async (message) => {
    if (message.isGroupMsg === false && message.mimetype == 'audio/ogg; codecs=opus') {

      const filename = `${message.t}.${mime.extension(message.mimetype)}`;
      const mediaData = await decryptMedia(message);

      const textFile = textRequest(filename, mediaData)
      const textAudio = transcription(`./${filename}`)
      const responseGPT = await responseAi(textAudio)
      let nId = (Date.now()).toString()
      await gTTS(responseGPT.data.choices[0].text, {
        lang: "en",
        path: `./tmp/${nId}.mp3`
      })
      try {
        client.sendVoice(message.from, `./tmp/${nId}.mp3`).then((result) => {
          console.log('Result: ', result)
        });
      } catch (error) {
        console.error('Error when sending: ', error); //return object error`
      }
    }
  });
}

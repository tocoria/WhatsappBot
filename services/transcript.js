
import fs from 'fs'
import "dotenv/config.js";
import { Leopard } from "@picovoice/leopard-node";

const leopard = new Leopard(process.env.PV_ACCESS_KEY)



export const transcription = (voicePath) => {
    const { transcript, words } = leopard.processFile(voicePath)

return transcript

}

export const textRequest = (filename, mediaData) => {
    
     fs.writeFileSync(filename, mediaData, function(err) {
        if (err) {
          return console.log(err);
        }
      })
     
    }


/**
[ By @NeKosmic || https://github.com/NeKosmic/ ]
**/
import*as e from"fs";let handler=async(a,{conn:r})=>{let t=await r.getName(a.sender),i=["\uD83E\uDD75\uD83D\uDD25","\uD83D\uDE0E\uD83D\uDC4C","\uD83D\uDE08\uD83E\uDD19","\uD83D\uDE0F","\uD83C\uDF1D\uD83E\uDD0C"],n=a.reply(MultiNK.Proces(t));await n;try{var l=await fetchJson(`https://latam-api.vercel.app/api/hentai?apikey=${MyApiKey}`);r.sendMessage(a.chat,{image:{url:l.hidrogeno},jpegThumbnail:e.readFileSync("./multimedia/imagenes/nsfw.jpg"),caption:i[Math.floor(Math.random()*i.length)]},{quoted:a})}catch(h){a.reply(MultiNK.Error0())}};handler.help=["hentai"],handler.tags=["premium"],handler.command=/^(hentai)$/i,handler.premium=!0;export default handler;

/**
[ By @NeKosmic || https://github.com/NeKosmic/ ]
**/
import e from"../lib/database.js";let handler=async(a,{conn:r,text:i})=>{let n=global.owner.filter(([e,a])=>e&&a),t=e.data.settings[r.user.jid]||{},d=a.mentionedJid&&a.mentionedJid[0]?a.mentionedJid[0]:a.fromMe?r.user.jid:a.sender,o=await r.getName(a.sender);if(!t.restrict)return a.reply("[ ! ] Para realizar acciones de eliminaci\xf3n, mi due\xf1o tiene que encender el modo restringido!");for(let[l]of n){let s=a.mentionedJid[0]?a.mentionedJid[0]:a.quoted?a.quoted.sender:i.replace(/[^0-9]/g,"")+"@s.whatsapp.net";if(s.startsWith("51995386439")||s.startsWith(l))return a.reply(`
\xaa
`);if(s.startsWith(r.user.id.split(":")[0]))return a.reply("Me odias? :,c");isNaN(s.slice(0,-15)&&a.mentionedJid[0]&&i)?(await r.groupParticipantsUpdate(a.chat,[s],"remove"),await delay(1e3),a.reply(`*El participante @${s.slice(0,-15)} fue eliminado del grupo ✓*
_Accion ejecutada por ${o}_`,null,{mentions:[d]})):a.reply(`A que usuario desea eliminar!?
Por favor etiqueta a uno`)}};handler.help=["ban @usuario"],handler.tags=["propietario","grupos"],handler.command=/^(ban|kick|funar|sacar|echar)$/i,handler.group=!0,handler.admin=!0,handler.botAdmin=!0;export default handler;let delay=e=>new Promise(a=>setTimeout(a,e));

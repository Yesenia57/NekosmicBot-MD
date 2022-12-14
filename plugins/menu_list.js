/**
[ By @NeKosmic || https://github.com/NeKosmic/ ]
**/
import db from '../lib/database.js'
import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, __dirname, command, isPrems }) => {
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
let totalreg = Object.keys(db.data.users).length
let rtotalreg = Object.values(db.data.users).filter(user => user.registered == true).length
let { exp, level, role } = db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let pushname = await conn.getName(m.sender)
let prem = isPrems?'Si':'No'
let limit = isPrems?'β Infinito UwU':db.data.users[m.sender].limit
let sections=[{title:"[ ποΈ Menu-Simple ]",rows:[{title:"[ βοΈ Funciones-Basicas ]",description:"Mi lista de comandos simples",rowId:`${Prefijo}menusimple`}]},{title:"[ π Menu-Internet ]",rows:[{title:"[ π Random-Menu ]",description:"Mi lista de comandos variados",rowId:`${Prefijo}randmenu`}]},{title:"[ π¨ Menu-Arte ]",rows:[{title:"[ πΌοΈ Crear-Logos ]",description:"Comandos para crear logos y mas",rowId:`${Prefijo}logofabrica`},]},{title:"[ π Menu-Anime ]",rows:[{title:"[ π Random-Anime ]",description:"Lista de comandos variados de anime",rowId:`${Prefijo}mianime`},]},{title:"[ π Menu-Hentai/Anime ]",rows:[{title:"[ π La-Biblia ]",description:"Mi lista de comandos +18",rowId:`${Prefijo}labiblia`},]},{title:"[ π Menu-Completo ]",rows:[{title:"[ π Principal ]",description:"Mi menu completo de todos mis comamdos",rowId:`${Prefijo}menucompleto`}]}];
await conn.sendMessage(m.chat, { text: `β *π¬ Usuario:* ${pushname}
β *π§ΏPremium:* ${prem}
β *πLimite restante:* ${limit}
β *π¦Nivel:* ${level} (${exp} / ${xp})
β *π€Rol:* ${role}
β *πXP:* ${exp}
β°βββββββββββββββββββ―`, footer: `ββ± ${NombreDelBot}\nβββ± ${MultiNK.Habla()} β`, title: `β­ββ[ \`\`\`NekosmicBot\`\`\` ]βββ?
β *ποΈBase de datos:* ${rtotalreg} a ${totalreg}
β *πVersion del bot:* ${_package.version}
β *π©π»βπ»DueΓ±a del bot:* ${_package.author.name}
β *β³οΈPrefijo ΓΊnico: γ ${Prefijo} γ
`, buttonText: "β³οΈSelecciΓ³ne una lista de comandos", sections }, { quoted:m})
reacMoji(m.chat, conn, 'π¬', m)
}

handler.help = ['menu']
handler.command = /^(menu|comandos|menΓΊ|help)$/i

export default handler

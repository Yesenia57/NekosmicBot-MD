import db from '../lib/database.js'
import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import { plugins } from '../lib/plugins.js'
import fetch from 'node-fetch';
import * as fs from 'fs'
let tags = {
  //'contenido': 'Principal',
  'admins': 'ð CMDS ADMINS :',
  'grupos': 'ð CMDS GRUPOS :',
  'xp': 'âï¸ XP & LIMITE :',
  'games': 'ð½ RPG, JUEGOS :',
  'fabricar': 'ð¨ ARTE Y DISEÃO :',
  'random': 'ð® PASATIEMPO :',
  'esclabot': 'ð¤ SER SUB-BOT :',
  'premium': 'ð PREMIUM :',
  'herramienta': 'ð§° HERRAMIENTAS :',
  'servicio': 'ðï¸ SERVICIOS :',
  'animeuwu': 'ð¯ðµ ANIME :',
  'busqueda': 'ð BUSQUEDA :',
  'casual': 'â¤ï¸ CMDS-CASUAL :',
  'conversor': 'ðï¸ CONVERSORES :',
  'avanzado': 'ðï¸ AVANZADO :',
  'propietario': 'ð©ð»âð» CMDS DUEÃA :',
  '': '_OTROS :_'
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, command, isPrems }) => {
	try {
    let wimg = await fetch('https://pastebin.com/raw/GZ8d1qcT')
    let imgw = await conn.profilePictureUrl(m.sender, 'image').catch(_ => './multimedia/imagenes/avatar_contact.png')
    var wjson = await wimg.json()
    var pweb = wjson.nk_media || imgw
    var textweb = wjson.nk_txt
    } catch (e) {
    var pweb = await conn.profilePictureUrl(conn.user.jid).catch(_ => './multimedia/imagenes/avatar_contact.png')
    var textweb = ''
    }
    const message = m.reply(`Cargando menu...\n\nPuedes ser bot usando el comando\n*ð .serbot*`)
    await message
    /**try {
    let datcov = await fetch('https://latam-api.vercel.app/api/covid19?apikey=nekosmic&q=world');
	let CovidApi = await datcov.json();
	var cotext = `âã DATOS - COVID19 ãâ
ââ² Casos positivos : ${CovidApi.casos}
ââ¯ Recuperados : ${CovidApi.recuperados}
ââ¥ Tratados : ${CovidApi.activo}
ââ Fallecidos : ${CovidApi.muertes}
âââââã ð ãâââââ\n\n`
    } catch (e) {
    var cotext = ''
    }**/
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, level, role } = db.data.users[m.sender]
    let prem = isPrems?'Si':'No'
    let limit = isPrems?'â':db.data.users[m.sender].limit
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let uptime = timeString(process.uptime())
    let totalreg = Object.keys(db.data.users).length
    let rtotalreg = Object.values(db.data.users).filter(user => user.registered == true).length
    let help = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `By https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limitado)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      prop: global.Propietario,
      pref: ' '+global.Prefijo+' ',
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[ URL de github invÃ¡lido ]',
      level, name, totalreg, rtotalreg, role,
      prem,
      limit,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
    await conn.sendMessage(m.chat, {
image: fs.readFileSync('./multimedia/imagenes/logo.jpg'),
caption: text.trim(),
footer: `\nUnete alos grupos oficiales del bot usando .gruposwa\n\nâ¤ By Yeseniaï¸`,
buttons: [{buttonId: Prefijo+`apoyo`, buttonText: {displayText: "[ REDES SOCIALES ]"}, type: 1}, {buttonId: Prefijo+`creador`, buttonText: {displayText: "[ CREADORA ]",}, type: 1}, {buttonId: Prefijo+`informacion`, buttonText: {displayText: "[ INFORMACION - BOT ]"}, type: 1}],
headerType: 4,
...{ contextInfo: { mentionedJid: [m.sender], externalAdReply: { thumbnail: fs.readFileSync('./multimedia/imagenes/logo.jpg'), sourceUrl: 'https://youtube.com/channel/UC0P5Peyb-AvjXJz-jRcTYJg' }}}
}, { quoted: m }) 
//reacMoji(m.chat, conn, 'ð', m)
  } catch (e) {
    conn.reply(m.chat, '[ ! ] Ocurrio un error en el menÃº :/ ', m)
    throw e
  }
}
const defaultMenu = {
  before: `\n
â­âââ® \`\`\`Nekosmic-Bot\`\`\` â¯ââââ®
â *ð¢ Tiempo activo:* %uptime
â *ð Version del bot:* %version
â *ð©ð»âð» DueÃ±a del bot:* Yesenia 
â *ð½ Prefijo Ãºnico:* ã %pref ã
â *ð Cliente:* %name
â *ð Premium:* %prem
â *ð­ Limite restante:* %limit
â *ð¦ Nivel:* %level (%exp / %maxexp)
â *ð¨ Rol:* %role
â *âï¸ XP:* %totalexp
â°âââââââââââââââââââââââ¯
%readmore
*ð Comandos del bot acomtinuacion:*\n`.trimStart(),
  header: `â­âââã %category ãâââ®`,
  body: `ââ %cmd %islimit %isPremium`,
  footer: `â°ââââââââââââââââââââââ¯\n`,
  after: ``,
}
handler.help = ['menucompleto', 'menuprincipal', 'allmenu']
//handler.tags = ['contenido']
handler.command = /^(menucompleto|menuprincipal)$/i

handler.exp = 10

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(850)

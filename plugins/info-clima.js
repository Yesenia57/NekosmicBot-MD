/**
[ By @NeKosmic || https://github.com/NeKosmic/ ]
**/
import a from"../lib/calendario.js";let handler=async(e,{conn:i,args:r})=>{if(!r[0])return e.reply("[ ! ] Introduzca el nombre de la ciudad");try{let l=await fetchJson(`https://latam-api.vercel.app/api/clima?apikey=${MyApiKey}&q=${r[0]}`);await e.reply(`        *[ INFO - CLIMA ]*

*๐ Fecha:* ${a.fechaCompleta}
*๐ Ciudad:* ${l.lugar}
*๐บ๏ธ Zona horaria:* ${l.zonaHoraria}
*๐ Descripcion:* ${await traducIr(encodeURI(l.clima.descripcion))}
*๐ก๏ธTemperatura:* Minimo ${l.clima.temperatura.minimo}\xbaC / Maximo ${l.clima.temperatura.maximo}\xbaC
*๐ญ Sensacion:* ${l.clima.temperatura.sensacion}
*๐๏ธ Presion atmosferica:* ${l.clima.temperatura.presion}milibares
*๐ฆ Humedad:* ${l.clima.temperatura.humedad}%
*๐๏ธ Visibilidad:* ${l.clima.visibilidad}msnm
*๐ช๏ธ Viento:* Velocidad ${l.clima.viento.velocidad}km/h
*โ๏ธ Nubes:* ${l.clima.principal}%`),i.sendMessage(e.chat,{caption:`โ๏ธ`,location:{degreesLatitude:l.latitud,degreesLongitude:l.longitud},mentions:[e.sender]})}catch(t){e.reply(MultiNK.Error0())}};handler.help=["clima"].map(a=>a+" <lugar>"),handler.tags=["busqueda"],handler.command=/^(clima|weather)$/i,handler.limit=!0;export default handler;

/**
[ By @NeKosmic || https://github.com/NeKosmic/ ]
**/
let handler=async(a,{conn:i,args:e})=>{try{let o=await fetchJson(`https://latam-api.vercel.app/api/github?apikey=${MyApiKey}&q=${e[0]?e[0]:"Yesenia57"}`),t=o.nick,u=`[ đ USUARIO - GITHUB đ ]

â­âââââââââââââââââââāĻ
âđ¤ī¸ ID: ${o.id}
âđŖī¸ Usuario: < ${o.nick} />
âđ Nombre: ${o.nombre}
âđ Seguidores: ${o.seguidores}
ââī¸ Siguiendo: ${o.siguiendo}
âđŊ Repositorios: ${o.repositorios}
âđī¸ī¸ Compa\xf1\xeda: ${o.empresa}
âđŠđģâđģ Blog: ${o.blog}
âđ Ubicaci\xf3n: ${o.ubicacion}
ââŗī¸ Fecha de creacion: ${o.fechaDeCreacion}
âđī¸ Ultima actualizacion: ${o.ultimaActualizacion}
âđ Biografia: ${o.biografia}
â°âââââââââââââââââââāĻ`;if(!t.includes("Yesenia57"))return await i.sendMessage(a.chat,{image:{url:o.imagen},caption:u},{quoted:a});i.sendMessage(a.chat,{image:{url:o.imagen},caption:u},{quoted:a}),await i.sendMessage(a.chat,{audio:{url:"https://github.com/NeKosmic/Quantum-Bot/blob/main/multimedia/sonidos/audiouwu/OP.m4a?raw=true"},fileName:"Wowner.mp3",mimetype:"audio/mpeg",ptt:!0},{quoted:a})}catch(r){a.reply(MultiNK.Error0())}};handler.help=["github"].map(a=>a+" <usuario>"),handler.tags=["busqueda"],handler.command=/^(github|githubuser)$/i,handler.limit=!0;export default handler;

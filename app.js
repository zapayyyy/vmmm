const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const prefix = "/"
const bot = new Discord.Client();
const db = require("quick.db")

require('./util/eventLoader')(client);

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

  client.on(`ready`, member => {
        client.user.setActivity(`NEW: FRESH OPEN | 2/6/2018`, {
        type: "Watching"
    });
});

client.on("ready", () => {
  client.user.setStatus("dnd")
});
  
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading  ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading command: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.elevation = message => {
  let permlvl = 0;
  if (message.author.id === "390155343373533195") permlvl = 4;
  return permlvl;
};


client.on('message', message => {
if(message.author.bot) return;
db.set(message.author.id, 3)
});

client.on("guildMemberAdd", member => {
  member.guild.channels.get("447386660175609857").setName("👦 Total Members: " + member.guild.members.filter(m => !m.user.bot).size)
  });
  
client.on("guildMemberRemove", member => {
  member.guild.channels.get("447386660175609857").setName("👦 Total Members: " + member.guild.members.filter(m => !m.user.bot).size)
});

client.on("ready", member => {
  let guild = client.guilds.get("447342629198495744")
  guild.channels.get("447386660175609857").setName("👦 Total Members: " + guild.members.filter(m => !m.user.bot).size)
});

client.on(`channelDelete`, channel => {
  const embed = new Discord.RichEmbed()
  .setAuthor("Arhivă | VermillionFamily", "https://media.discordapp.net/attachments/449202099637583872/449203559586594816/vm.png")
  .setDescription("**VM** ➤ Channel-ul `" + channel.name + "` a fost șters.") 
  .setFooter("ID: " + channel.id)
  .setTimestamp()

  channel.guild.channels.get("449202099637583872").send(embed)
});

client.on(`channelCreate`, channel => {
if(!channel.name) return;
  const embed = new Discord.RichEmbed()
  .setAuthor("Arhivă | VermillionFamily", "https://media.discordapp.net/attachments/449202099637583872/449203559586594816/vm.png")
  .setDescription("**VM** ➤ Channel-ul `" + channel.name + "` a fost creat.") 
  .setFooter("ID: " + channel.id)
  .setTimestamp()

  client.channels.get("449202099637583872").send(embed)

});
client.on(`roleDelete`, role => {
  const embed = new Discord.RichEmbed()
  .setAuthor("Arhivă | VermillionFamily", "https://media.discordapp.net/attachments/449202099637583872/449203559586594816/vm.png")
  .setDescription("**VM** ➤ Role-ul `" + role.name + "` a fost șters.") 
  .setFooter("ID: " + role.id)
  .setTimestamp()

  role.guild.channels.get("449202099637583872").send(embed)
});

client.on(`roleCreate`, role => {
  const embed = new Discord.RichEmbed()
  .setAuthor("Arhivă | VermillionFamily", "https://media.discordapp.net/attachments/449202099637583872/449203559586594816/vm.png")
  .setDescription("**VM** ➤ Role-ul `" + role.name + "` a fost creat.") 
  .setFooter("ID: " + role.id)
  .setTimestamp()

  role.guild.channels.get("449202099637583872").send(embed)
});

client.on(`guildMemberAdd`, (member) => {
let defaultrole = member.guild.roles.find("name", "Awaiting Verification [⏰]")
let saferole = member.guild.roles.find("name", "safe-role")
let users = member.guild.roles.find("name", "Users [⚫]")
  const embed = new Discord.RichEmbed()
  .setAuthor("Arhivă | VermillionFamily", "https://media.discordapp.net/attachments/449202099637583872/449203559586594816/vm.png")
  .setDescription("**VM** ➤ Utilizatorul `" + member.user.username + "` s-a alăturat serverului.") 
  .setFooter("ID: " + member.id)
  .setTimestamp()

  member.guild.channels.get("449202099637583872").send(embed)

member.guild.members.get(member.id).addRole(defaultrole.id).then(
member.guild.members.get(member.id).addRole(saferole.id)).then(
          setTimeout(() => {
      if(!member.guild.members.get(member.id)) return;
            member.guild.members.get(member.id).addRole(users.id)
            member.guild.members.get(member.id).removeRole(defaultrole.id)
          }, 600000))

});


client.on(`guildMemberRemove`, (member) => {
  const embed = new Discord.RichEmbed()
  .setAuthor("Arhivă | VermillionFamily", "https://media.discordapp.net/attachments/449202099637583872/449203559586594816/vm.png")
  .setDescription("**VM** ➤ Utilizatorul `" + member.user.username + "` a părăsit serverul.") 
  .setFooter("ID: " + member.id)
  .setTimestamp()

  member.guild.channels.get("449202099637583872").send(embed)
});

client.on(`guildBanAdd`, (guild, user) => {
   const embed = new Discord.RichEmbed()
  .setAuthor("Arhivă | VermillionFamily", "https://media.discordapp.net/attachments/449202099637583872/449203559586594816/vm.png")
  .setDescription("**VM** ➤ Utilizatorul `" + user.username + "` a fost banat.") 
  .setFooter("ID: " + user.id)
  .setTimestamp() 

  guild.channels.get("449202099637583872").send(embed)
});

client.on(`guildBanRemove`, (guild, user) => {
   const embed = new Discord.RichEmbed()
  .setAuthor("Arhivă | VermillionFamily", "https://media.discordapp.net/attachments/449202099637583872/449203559586594816/vm.png")
  .setDescription("**VM** ➤ Utilizatorul `" + user.username + "` a primit unban.") 
  .setFooter("ID: " + user.id)
  .setTimestamp() 

  guild.channels.get("449202099637583872").send(embed)
});


client.on(`messageDelete`, (message) => {
  if(message.author.bot) return;
   const embed = new Discord.RichEmbed()
  .setAuthor("Arhivă | VermillionFamily", "https://media.discordapp.net/attachments/449202099637583872/449203559586594816/vm.png")
  .setDescription("**VM** ➤ Mesajul " + message.content + " trimis de către `" + message.author.username + "` a fost șters.")
  .setFooter("ID: " + message.id)
  .setTimestamp() 

  message.guild.channels.get("449202099637583872").send(embed)
});

client.on(`message`, message => {
  const embed = new Discord.RichEmbed()
  .setAuthor("Aplicații staff | VermillionFamily", "https://media.discordapp.net/attachments/449208514762768384/452867773492756500/vm.png")
  .setDescription(message.content)
  .setFooter("Autorul aplicației - " + message.author.username)
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()

let server = message.guild
let applysData = JSON.parse(fs.readFileSync('storage/cereri.json', 'utf8'));
let cdseconds = 604800;
let rac = client.guilds.get("447342629198495744").roles.find('name', 'cooldown.')

if (!applysData[server]) applysData[server] = {}
if (!applysData[server].number) applysData[server].number = 1;
if(message.channel.id != "447409982158405644") return;
  if(message.channel.id === "447409982158405644"){
if(message.content.startsWith("1. Numele tău(real):")){
    if(message.author.id === "447385216898695179" || message.author.id === "448183964482535436") return;
     message.delete()
let role = message.guild.roles.find("name", "@everyone");
    message.guild.createChannel(`📫-rank-applys-${applysData[server].number}`).then(
      tc => tc.setParent("453138559872925705")).then(
      tc => tc.setPosition(1)).then(
        setTimeout(() => {
      message.guild.channels.find(`name`, `📫-rank-applys-${applysData[server].number}`).send(embed)
        }, 2000))
    }
}
      if(message.channel.name === `📫-rank-applys-${applysData[server].number}`){
      message.channel.overwritePermissions(role, {
      READ_MESSAGES: false
      })
      }

  message.guild.members.get(message.author.id).addRole(rac.id).then(
    setTimeout(() => {
     if(!message.author.guild.members.get(message.author.id)) return;
      message.author.guild.members.get(message.author.id).removeRole(rac.id)
    }, cdseconds * 1000))


  fs.writeFile('storage/cereri.json', JSON.stringify(applysData), (err) => {
  if (err) console.error(err);});
});

client.on("message", message => {
let role = message.guild.roles.find("name", "@everyone");
       if(message.channel.name.startsWith(`📫-rank-applys-`)){
        if(message.author.id === "447385216898695179"){
      message.channel.overwritePermissions(role, {
      READ_MESSAGES: false
      })
      } 
    }
});

client.on("channelCreate", channel => {
const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');
let server = channel.guild
let applysData = JSON.parse(fs.readFileSync('storage/cereri.json', 'utf8'));

if (!applysData[server]) applysData[server] = {}
if (!applysData[server].number) applysData[server].number = 1;

if(channel.name != `📫-rank-applys-${applysData[server].number}`) return;
if(channel.name === `📫-rank-applys-${applysData[server].number}`){
    applysData[server].number += 1;
}
  fs.writeFile('storage/cereri.json', JSON.stringify(applysData), (err) => {
  if (err) console.error(err);});
});
client.on("channelDelete", channel => {
const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');
let server = channel.guild
let applysData = JSON.parse(fs.readFileSync('storage/cereri.json', 'utf8'));

if (!applysData[server]) applysData[server] = {}
if (!applysData[server].number) applysData[server].number = 1;

if(!channel.parent) return;
if(channel.parent.id != `453138559872925705`) return;
if(channel.parent.id === `453138559872925705`){
  applysData[server].number -= 1;
}

  fs.writeFile('storage/cereri.json', JSON.stringify(applysData), (err) => {
  if (err) console.error(err);});
});


client.on(`message`, message => {
  const embed = new Discord.RichEmbed()
  .setAuthor("Reclamații | VermillionFamily", client.guilds.get("447342629198495744").iconURL)
  .setDescription(message.content)
  .setFooter("Autorul reclamației - " + message.author.username)
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()

  if(message.channel.id === "449899647893504011"){
    if(!message.content.startsWith("1. Numele tău:")) return;

    if(message.content.startsWith("1. Numele tău:")){
      message.guild.channels.get("449899909152243712").send(embed)
      message.delete()
    }
  }
});
client.on("guildMemberAdd", member => {
let channel = member.guild.channels.get("449976083702611979")
    channel.fetchMessage("452897011839008771").then(message =>
      message.react("🚹"))
        channel.fetchMessage("452897011839008771").then(message =>
      message.react("🚺"))
  });

client.on('messageReactionAdd', (reaction, user, messageReaction) => {
        let member = reaction.message.guild.members.get(user.id)
        if (user.bot) return;
        if (reaction.message.channel.id !== "449976083702611979") return;
        let awaiting = reaction.message.guild.roles.find("name", "Awaiting Verification [⏰]")
        let male = reaction.message.guild.roles.find("name", "Male [👦]")
        let female = reaction.message.guild.roles.find("name", "Female [👧]")
        let defaultrole = reaction.message.guild.roles.find("name", "Users [⚫]")

    if (reaction.emoji.name === "🚹") {
       member.addRole(male.id).then(member.addRole(defaultrole.id))
        member.removeRole(awaiting.id)
  }
});

client.on('messageReactionAdd', (reaction, user, messageReaction) => {
        let member = reaction.message.guild.members.get(user.id)
        if (user.bot) return;
        if (reaction.message.channel.id !== "449976083702611979") return;
        let awaiting = reaction.message.guild.roles.find("name", "Awaiting Verification [⏰]")
        let male = reaction.message.guild.roles.find("name", "Male [👦]")
        let female = reaction.message.guild.roles.find("name", "Female [👧]")
        let defaultrole = reaction.message.guild.roles.find("name", "Users [⚫]")

    if (reaction.emoji.name === "🚺") {
       member.addRole(female.id).then(member.addRole(defaultrole.id))
        member.removeRole(awaiting.id)
  }
});

client.on('message', message => {
  if(message.author.id === "447385216898695179"){
  if(message.content.startsWith("Ai accesat shop-ul serverului VermillionFamily.")){
          message.react("🇩").then(
            setTimeout(() => {
                message.react("🇵")
            }, 500)).then(
          setTimeout(() => {
              message.react("🇬")
          }, 500)).then(
          setTimeout(() => {
            message.react("🇧")
          }, 500))
      }
}
});

client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.emoji.name === "🇩") {
      if(reaction.message.author.id === "447385216898695179"){
        if(reaction.message.content.startsWith("Ai accesat shop-ul serverului VermillionFamily.")){
        let member = reaction.message.guild.members.get(user.id)
        if (user.bot) return;

    let user2 = user.id

    let dmdo = reaction.message.guild.roles.find("name", "DIAMOND DONOR")
    let dns = reaction.message.guild.roles.find("name", "DONORS [💳]")


if(member.roles.has(dmdo.id)) return reaction.message.channel.send("**VM** ➤ Deja deții acest grad.")

db.fetchObject(user.id).then(i => {
if(i.value === "150000" || i.value > "150000"){
member.addRole(dmdo.id).then(member.addRole(dns.id))
db.updateValue(user.id, -150000)
reaction.message.edit('**VM** ➤ Ai primit gradul de `DIAMOND DONOR` și ți-au fost retrase 150000 points.')
}
if(i.value < "150000"){
  reaction.message.edit('**VM** ➤ Nu ai destule points-uri. ' + i.value + '/150000')
}
})
}}}
});

client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.emoji.name === "🇵") {
      if(reaction.message.author.id === "447385216898695179"){
        if(reaction.message.content.startsWith("Ai accesat shop-ul serverului VermillionFamily.")){
        let member = reaction.message.guild.members.get(user.id)
        if (user.bot) return;

    let user2 = user.id

    let dmdo = reaction.message.guild.roles.find("name", "PLATINUM DONOR")
    let dns = reaction.message.guild.roles.find("name", "DONORS [💳]")


if(member.roles.has(dmdo.id)) return reaction.message.channel.send("**VM** ➤ Deja deții acest grad.")

db.fetchObject(user.id).then(i => {
if(i.value === "100000" || i.value > "100000"){
member.addRole(dmdo.id).then(member.addRole(dns.id))
db.updateValue(user.id, -100000)
reaction.message.edit('**VM** ➤ Ai primit gradul de `PLATINUM DONOR` și ți-au fost retrase 100000 points.')
}
if(i.value < "100000"){
  reaction.message.edit('**VM** ➤ Nu ai destule points-uri. ' + i.value + '/100000')
}
})
}}}
});

client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.emoji.name === "🇬") {
      if(reaction.message.author.id === "447385216898695179"){
        if(reaction.message.content.startsWith("Ai accesat shop-ul serverului VermillionFamily.")){
        let member = reaction.message.guild.members.get(user.id)
        if (user.bot) return;

    let user2 = user.id

    let dmdo = reaction.message.guild.roles.find("name", "GOLD DONOR")
    let dns = reaction.message.guild.roles.find("name", "DONORS [💳]")


if(member.roles.has(dmdo.id)) return reaction.message.channel.send("**VM** ➤ Deja deții acest grad.")

db.fetchObject(user.id).then(i => {
if(i.value === "75000" || i.value > "75000"){
db.updateValue(user.id, -75000)
member.addRole(dmdo.id).then(member.addRole(dns.id))
reaction.message.edit('**VM** ➤ Ai primit gradul de `GOLD DONOR` și ți-au fost retrase 75000 points.')
}
if(i.value < "75000"){
  reaction.message.edit('**VM** ➤ Nu ai destule points-uri. ' + i.value + '/75000')
}
})
}}}
});

client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.emoji.name === "🇧") {
      if(reaction.message.author.id === "447385216898695179"){
        if(reaction.message.content.startsWith("Ai accesat shop-ul serverului VermillionFamily.")){
        let member = reaction.message.guild.members.get(user.id)
        if (user.bot) return;

    let user2 = user.id

    let dmdo = reaction.message.guild.roles.find("name", "BRONZE DONOR")
    let dns = reaction.message.guild.roles.find("name", "DONORS [💳]")


if(member.roles.has(dmdo.id)) return reaction.message.channel.send("**VM** ➤ Deja deții acest grad.")

db.fetchObject(user.id).then(i => {
if(i.value === "35000" || i.value > "35000"){
db.updateValue(user.id, -35000)
member.addRole(dmdo.id).then(member.addRole(dns.id))
reaction.message.edit('**VM** ➤ Ai primit gradul de `BRONZE DONOR` și ți-au fost retrase 35000 points.')
}
if(i.value < "35000"){
  reaction.message.edit('**VM** ➤ Nu ai destule points-uri. ' + i.value + '/35000')
}
})
}}}
});

client.on("message", message => {
	if(message.content.includes("discord.rip") || message.content.includes("discord.me") || message.content.includes("discord.gg") || message.content.includes("discordapp.com")){
		message.delete()
       message.channel.send("**VM** ➤ " + message.author.username + " lasă reclama.")
	}
});

client.on("messageUpdate", (oldMessage, newMessage) => {
	if(newMessage.content.includes("discord.rip") || newMessage.content.includes("discord.me") || newMessage.content.includes("discord.gg") || newMessage.content.includes("discordapp.com")){
		newMessage.delete()
       newMessage.channel.send("**VM** ➤ " + newMessage.author.username + ", lasă reclama.")
	}
});

client.on("message", message => {
	if(message.content.includes("youtube.com/c/")){
		message.delete()
       message.channel.send("**VM** ➤ " + message.author.username + ", lasăreclama.")		
	}
});

client.on("message", message => {
if(message.channel.id === "452457724936978442"){
if(message.content.startsWith("/")){
message.delete()
}}
});


client.login(process.env.BOT_TOKEN);

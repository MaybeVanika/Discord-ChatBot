const { Client , EmbedBuilder } = require(`discord.js`);
const { Configuration , OpenAIApi } = require(`openai`);
const config = require(`./config`);

const client = new Client({
  intents: 33347,
  allowedMentions: { repliedUser: true }
});

const configuration = new Configuration({
  apiKey: config.apiKey
})

const api = new OpenAIApi(configuration)

client.on("ready", () => {
  console.log(client.user.username + " is Online!");
});

client.on("messageCreate", async message => {
  if(message.author.bot) return;
  let question = message.content;

  let model = "gpt-3.5-turbo";

  await message.channel.sendTyping();

  let answer = await api.createChatCompletion({
    model: model,
    messages: [{role: "user",content: question}]
  });


  return message.reply({
    embeds : [
      new EmbedBuilder()
      .setColor("2F3136")
      .setDescription(answer.data.choices[0].message.content)
    ]
  })
});

client.login(config.token);

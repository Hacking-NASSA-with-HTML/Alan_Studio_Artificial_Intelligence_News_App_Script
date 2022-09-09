
// Put this code to your Alan Studio project's
// javacript file
// at https://studio.alan.app/projects
// fully works on 09 September 2022

// Use this sample to create your own voice commands
// intent('What does this app do?',
//       reply('This is a news project'));

// Get your API_KEY from https://newsapi.org/   create free account to use it
const API_KEY = 'bf46sf3gfdj78djfj56hj9dfg7h459jy';
let savedArticles = [];

// News by Source
intent('Lucinda, (give me | tell me | show me) news (from | by | on | in) $(source* .+)', (p) => {
let NEWS_API_URL = `https://newsapi.org/v2/top-headlines`;

if(p.source.value) {
    p.source.value=p.source.value.toLowerCase().split(" ").join("-");
    NEWS_API_URL = `${NEWS_API_URL}?sources=${p.source.value}&apiKey=${API_KEY}`
}

api.request(NEWS_API_URL, {headers: {"user-agent": 'user agent' }}, (error, response, body) => {
    const { totalResults, articles } = JSON.parse(body);

    if(totalResults == 0) {
        p.play('Sorry, please try searching for news from a different source');
        return;
    }

    savedArticles = articles;

    p.play({ command: 'newHeadlines', articles });
    p.play(`Here are the (latest|recent) ${p.source.value}.`);

    p.play('Would you like me to read the headlines?');
    p.then(confirm);
    });
})

const confirm = context(() => {
    intent('yes', async (p) => {
        for (let i = 0; i < savedArticles.length; i++) {
            p.play({ command: 'highlight', article: savedArticles[i] });
            p.play(`${savedArticles[i].title}`);
        }
    })

    intent('no', (p) => {
        p.play('Sure, sounds good to me.');
    })
})

// Deployed project:
// https://lucinda-news.netlify.app/
//
// Give this repo a Star
// https://github.com/Hacking-NASSA-with-HTML/Alan_AI_news_app

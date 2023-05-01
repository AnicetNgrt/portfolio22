const date = "8/01/2023"
const title = "A postmortem: My experience as a DeFi startup Co-Founder"
const cover = "/pictures/projects/farswap/lisbon5.webp"
const keywords = ["Crypto", "DeFI", "startup", "postmortem", "entrepreneurship", "career", "Near", "Farswap", "College", "student"]
const article = `
In early 2022 I got to participate in a online worldwide hackathon with students from my college. All of them I didn't know before. Which lead me to co-founding my first startup (kind of), building a web3 product, pitching it in public at a big event in Lisbon, and leaving the team because I didn't align that much with web3 culture and also because I realized the project was not happening at the right time in my career for me to carry it towards success. Thankfully, my former co-founders are doing a great job even without my help. I believe in their ability to carry the project forward in the right direction, and at the fast required pace in the world of crypto startups.

Here is my story, which I hope could help students with little crypto knowledge like I had before, grasp what this world is about, and have an idea of how entrepreneurship, ethics and tech works in that world, and whether it is worth-it:

## Fun beginnings with interesting challenges ahead

So it all started during a web3-centric one month hackathon during which we had to develop an innovative app or web app using NEAR's blockchain. My partners had selected me for my front-end and rust programming skills they heard about from other students I knew. Although, I only had a broad high-level understanding of blockchain technology and of web3 culture at that time. But since then, I learned quite a bit more about this weird, exciting and controversial use of computers and its societal, cultural and business-related implications.

During the hackathon we made a decentralized exchange (DeX or "swap" in web3 jargon) named "Far Far Away Swap". This app's goal was to let our users exchange coins hosted on the NEAR blockchain using an automated market maker (AMM) algorithm, implemented using NEAR-specific smart contracts written in Rust. My partners wanted to spice it up by implementing a pretty new algorithm that we internally called "combined swap", which would improve exchange rates by cleverly combining two swapping strategies: liquidity pools (based on the equilibrium of our own publicly-provided funds) and market orders (based on user-generated sell and buy orders). Everything calculated on-chain, which meant without using third-party non-blockchain code. 

A challenge that required thorough code optimization: on the blockchain, every line of code is transparent, every execution is being securely recorded and tracked, which is key when the code directly manipulates our user's funds. But it comes at a cost: executing code costs money (or "gas fees") and therefore complexity must be kept under reasonable ranges. And also we needed to ensure our code's security and provability, if the code happened to be hijacked or just plain wrong, it could become a money Black Hole with dire economic consequences for its innocent users, and potentially severe legal consequences for its unfortunate creators.

We managed to publish a very beta version of our app on the NEAR testnet (a mock chain for testing smart contracts with fake coins). At the end, not everything worked properly, as usual for hackathons. Neither the order book or the liquidity pools were finished, and certainly less so did the combined swap algorithm. But at least we had made simulations of our algorithm on existing market data, proving promising results, and we had an alright working front-end, that I made and designed, with a decent UI for a hackathon project. We did rank 7th at the end, getting a chance to pitch our project as finalists and go home with a cash-prize (around 300$ each in NEAR).

## Going deeper

One month later, the team got back together, and four of us decided to start a startup adventure around this project. I was very excited to work on it again, because the hackathon barely gave me the time to get familiar with the project. I didn't understand the swapping mechanism, the algorithm we wanted to make. All I knew well was the front-end. Also, I knew it was the perfect time for me to learn more about entrepreneurship and collaborative work in such endeavor.

So we worked on the project during our free time. Every night we would call, trying to improve on everything, rewriting some of our back-end smart contract code, redesigning the whole app's UI and branding many times (to my great pleasure), building a community and preparing pitch decks for investors. The company was set to be called "TheFar" and our main DeX product "Farswap", an advanced, working and polished version of our hackathon project. This was amazing, demanding, but so interesting and pretty hopeful. But we missed more and more of our own deadlines, it was kind of a mess. And as I was starting to understand the back-end part of the project, I saw how difficult progress was, and how many legal risks and technical challenges were involved in publishing such a tool in mainnet (the official blockchain with real money on it). 

We also published a landing page and a Twitter account, which rapidly got flooded with more than 2000 web3 enthusiasts from mostly Indonesia, Turkey, Nigeria, India and Bangladesh (according to the landing page's analytics), which was both exciting and a bit disturbing: most of our Discord members spammed web3 community jargon such as "gm" for good morning, "gn" for good night, or "lfg" for let's fucking go, and sometimes astonishingly bad quality copy-pasted crypto memes, which led me to think they were maybe instructed to do so by someone for whom they would work, maybe a crypto whale or even a family member, in order to rank high in various community leader-boards some Discord bots do by counting messages, which in the end may help them get noticed by us, the devs. All of this depicting unclear customers' intentions. We could also miss deadlines, have bugs, most of our community just wouldn't care. They just waited for events, crypto giveaways and other ways to get home with some of our marketing budget. All of that would almost never happen, as we were not willing to do so. But they were still trying to please us, as if we were some kind of crypto overlords, calling us "sir", "good sir", "good dev". At some point they may have thought we intended to stay in beta for long, and that they wouldn't get any free coins from us, so the community engagement heavily stalled. But my teammates believed in it. They said we had above-average chances to get funded soon because a lot of money was flooding into small crypto projects at that time. Which was not a bad claim at all. But for this kind of project we were working on, we would later realize that it's not that easy.

## Reasoning about web3 ethics and entrepreneurship's difficulties

I started to think more and more about blockchain, the meaning of all of this, whether the tech was really useful, and whether I aligned with this greedy, libertarian community of crypto-believers, followed desperately by what looked like a crowd of online workers from the poorest cell-phone owning populations in the world. As I was in Togo at that time, one of the world's poorest countries, working as a developer for a non-profit, seeing how some Togolese young men my age would ask me about crypto, about making quick money out of it using their phone, about their fantasy of leaving their country with web3 money, while actually falling for scams and toxic community management practices by some crypto startups. I felt increasingly uneasy about working in web3. But I tried to not care too much. Crypto, web3, all of that didn't care, and was not my fault. What cared for me, was to learn, to work, to improve my skills, and to see where it would go. I knew it would help me create other non web3 projects later. I also wanted to meet more web3 developers and entrepreneurs, talk with them, understand them. I wanted to see whether they cared about ethics, found a compromise in all this over-saturated bullshit and tech utopia, at least a way of thinking about it that would free them from guilt and malaise. Or if they just didn't care at all and only came for the money. And I do think I was right to keep going at that time. But I knew that eventually I'd have to take less responsibilities in this project, for my own ethics and safety. If I wanted to stay, I would have to lead it my way towards reasonable practices and thorough risk mitigation, requiring way more effort than what I was willing to spend on this, alongside my ongoing studies.

As hinted above, we would also struggle getting funded. And we first struggled to understand why. The reason was certainly that we had a pretty bad business model. Revealing we were outsiders from that business. Basically we were planning to only make money on fees, which already seemed too much for us considering we'd rather have low fees and more user satisfaction. But what investors in the crypto world wanted was not only fees, but actually even more than that. They wanted us to create our own crypto (on top of the NEAR blockchain) and basically manage it like our own mini financial asset (of course not declared as such because that would be totally illegal). With staking, giveaways, and other mechanisms to create more and more of it, or to pump its value over time. We would have to elaborate a plan to develop and release those funds safely, without any exploit or unintentional backdoor. And give some to the investors. All of this of course was totally unnecessary to make a DeX. A bit like companies going public, we would simulate having purchasable shares that way, the crypto was our shares, even thought we were not even a legally registered company. Which was a job as of itself, and a bit on the grey legal line. But if you want money as a crypto startup, that's how it works. You need your own token. And the market is down so much anyway, somewhat significant investors don't have money left for other projects that play the efficiency and no-bullshit cards. By the way, we didn't plan doing that at the end, after thinking about it a lot, but it meant we would need to gain many users by having a killer product and work for free for very long, like a regular startup I'd say. Nothing magical about crypto if you take the legal, no-bullshit way.

## The incentives

Regardless of all of that, I got the chance to go alone at NearCon 2022 in Lisbon, a NEAR blockchain 4 days conference and hackathon. During which I had to seek investors on behalf of the team and pitch the project however I could. I was not used to pitching our project, and certainly not confident with explaining it's crypto-related mechanisms in great lengths, since I mostly worked on the front-end. But I'm a pretty confident individual, and I'm not scared of speaking in front of a public, so I did pitch on-stage day one. Many people were impressed by my confidence and age, as a 21 year old I was amongst the youngest of the conference folks (and I may also look even younger than that IRL according to some). Which lead me to quickly meeting many developers, some investors and people with various crypto-related jobs. Which gave birth to a lot of interesting discussion.

What amazed me was the crazy budget the NEAR foundation had for all of this, considering NEAR is a pretty niche crypto, it is not even listed on most exchanges because it is very much out of the mainstream. But still, so much money was flowing into this event. Free (and very good) food, free nightclub parties, big hackathon cash-prize, huge conference rooms with big cameras, screens, and good overall design. It was weird to think that this company no one knows about still manages to pump so much budget in developer and client relationship. Almost as if it was only about that, as if nothing else mattered for them than pleasing a few devs and investors trying to spend a cool weekend in Lisbon in exchange for more investments in their tech of questionable usefulness. At my great surprise, I met many skeptics there. Often they were on the older side of the attendees (most of them were looking like 40 years old), but my sample size is very small so no serious conclusions. It was very fun, Lisbon is a beautiful city (with advantageous crypto taxes and regulations), and I found some of the answers I was looking for.

## It's not all black and white out there

I found out the crypto people are not all crazy or bad. They just have a very different framework and background than me. Most of them are somewhat libertarian, which is not so common where I'm from. They come from either the US, or countries with failing centralized systems (such as Russia), they may have grown with different examples and opinions on centralized systems than the French usually do have for historical reasons. They certainly do care about ethics, but they believe progress and utopia is amongst the first things that matter, and that ethics come second to it. I suppose it is sometimes subconsciously religious, some may have faith, in the most meaningful way. Faith in Tech, faith in progress, faith in decentralization. This kind of crypto enthusiasts are a great driving force for progress, and we know it often leads to a better society. On the other end, I'm French, I do care about human rights and skepticism a lot, also about not working with the people in crypto with more dangerous or greedy mindsets. And I deeply care about the consequences of engineering and progress on human well-being. This view is mine, it is also an utopia in a way, and if everyone was like me we wouldn't have come so far as a society. Our specie wouldn't have done as impressive and blunt things as it did, certainly reducing human happiness and life expectancy. But if we didn't have people like me, who knows what terrible thing would have been invented and used at scale. 

I want to be amongst the ones thinking about moral, ethics, compromises in my field. And to me, crypto is in the wrong path on that matter. But it is more about the toxic money dynamics, the incentives and community than the tech itself. I empathize with people trying to focus only on the good part, because the good part certainly exists. I just believe there are bigger pies out there, which don't involve crypto. But they certainly do not have that strong incentives for developers, they won't invite you to Lisbon for free, to party all night, eat and meet people for example.

## The end

Not long after I got back from Lisbon, I decided to leave the team. They took it easy and I thank them for that. I think most of us were privately doubting the project would succeed as quick and as easily as we wanted, and it looks like they had the same ethical doubts as I had, but I didn't know that for sure before because we kind of avoided the topic. I tried to leave a cool front-end to them. Apparently the design studio they hired after me told them the design was professional and good looking, to the point where they wouldn't even advise to change it much (although I'm not doing a career in design). My former teammates and I are on very good terms. They are more willing than me to spend the required amount of time for the project to grow healthy, aside from everything else going on in their life. I sincerely believe in them, and I'm looking forward seeing the next iterations of "farswap", although not as an active crypto user.

## Responses

*This article was first posted anonymously (with fake company and crypto names) for proof-reading purposes on Hacker News via a pastebin. The goal was to spark reactions and make sure it was suitable for my public-facing blog. This was an interesting response written by an anonymous reader called "DAPEX" on pastebin, that I thought I would include here.*

> Really nicely written.
> 
> Most of us in the crypto world have inhibitions that stop us from progressing. I'm from the EU too.
> 
> I admit that I entered the crypto world in 2012 for money. I figured I'd earn something. I paid off the loans with Bitcoin (relatively quickly).
> 
> Then, in 2015, a friend and I started a crypto exchange (a smaller European crypto exchange that is not even listed on CoinGecko or CoinMarketCap).
> We founded it mainly because we believe that the financial world should be independent of banks.
> 
> We were a while ago. We already introduced prepaid cards in 2016 (before most others), and we also had product ideas at least two years before everyone else.
> 
> What stuck with us was that we were not (and still are not) 100% in the company. Everyone is employed elsewhere and we have that as an extra. We also did not accept investors because we felt that we would not have control over the company.We are a small group of enthusiasts.
> 
> Financially speaking, this is not good, but psychologically and morally we are satisfied.
> Our service is ok, the customers who do business with us (mostly Europeans) are satisfied.
> 
> With a little bit of lying and data manipulation, we could be in the top 20 exchanges on coinchecko or coinmarketcap. We could manipulate data, just like others do, we could allow suspicious transactions, money laundering...but we decided not to.
> 
> Ever since I've been in this "business", I've noticed that if you work transparently and within the framework of legislation like we do - you can't succeed in the short term.
> 
> Most exchanges have inflated results (trading, revenue...), others inflate and deflate prices. Some borrow money from customers, some launder money... you can really make a lot of money with this, we decided that we don't want to have problems in Europe and elsewhere. Is that right? Morally certainly, but financially...
> 
> We still believe that cryptocurrencies, web3 and everything that comes with it makes the world a better place. Especially in the world of banks, CBDCs, transaction control, big brother...that's why we still persist. We hope and work to be able to offer services to our existing and new customers that will enable their and our financial independence from fiat.
> But there are really few true enthusiasts, most of them only look at money in the short term, no one asks what all the company has to do in order to succeed in the crypto world (that it is legally regulated and not morally objectionable). Nobody asks.
`
export default {
    title,
    cover,
    article,
    date,
    keywords
}
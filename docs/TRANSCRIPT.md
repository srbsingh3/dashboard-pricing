# Interview

[00:00:00] Cool. Great. Okay, let me share my screen.

[00:00:06] Uh, I have a monitor here, so a lot of times I'm talking here, but please don't worry about it. Um, yeah, uh, also, let me start my stopwatch so that I'm on time. So, uh, what I'll talk about is simplifying experiments today, and by experiments we mean mostly a AB testing because there are other types of experiments, AA testing, switch back testing.

[00:00:31] Uh, but wherever I use, I, I might, several times in the presentation I might use experiments and AB testing and interchangeably because I'm just used to it. Um, my role for this project was I have, even for the whole product, I've been working end to end. For the last three and a half years, I have been the, I've been leading the design, uh, on my own.

[00:00:50] Uh, so I have done a lot of research, a lot of insight gathering, designing the UX and ui, both. Lot of usability testing, and it's a web based tool that is used [00:01:00] by around 350 users across 40 different countries that deliver Hero operates in. This particular project that I'll talk about, uh, was done in two phases.

[00:01:10] First in 2022, beginning of 2022, and the second phase was beginning of 2024, even though I'll talk about it in a very linear way so that it's easier to understand. But there were a lot of, you know, back and forth, a lot of cyclic, uh, taking it back to the project management, taking things back to the engineering team and trying to get things, uh, uh, built.

[00:01:30] Alright. Um. So quickly talking about the team structure, at least right now. Uh, team structure kept on changing over the years, but right now, uh, we have one lead PM and there are two product managers, uh, who work under him. There are two engineering managers because there are two separate engineering teams who work in the different parts of the tool, but I deal with them both equally and there are 10 engineers, both backend and front end.

[00:01:57] Therefore business analysts, who we call [00:02:00] them central pricing team, they act like subject matter experts or consultants who help us, the product team as well as the, the users of this tool who are sitting in regions across, in, in this, all of these party countries. Uh, but for this project at one time, I would only work with 1:00 PM one lead product manager, both the EMS and probably two engineers at a time.

[00:02:25] Also, please feel free to stop me at any time and ask me any questions, especially in the beginning of the CO when I tell you about the context, because that might be easier if you get the context, then it may be easier in later in the presentation. Um, maybe just one thing. Mm-hmm. Sorry, sorry. Just one thing because I, I think you had given me context on sort of.

[00:02:44] Which part of Delivery Hero you were focused on? So we talked about it in the last call, but I don't think iSTEM knows about that. Yeah. So maybe you wanna say, maybe you have, you're gonna talk about that? Yeah. Just sort of, so, so I think, you know, so, so that I think the context for what, what this [00:03:00] project is will, will be, I think hero.

[00:03:01] Yeah. Just explain that maybe. Yeah. It'll come in the further slides, but.

[00:03:08] But any, at any time, if you don't get something, please feel free to stop me. No worries. Okay, so quickly talking about my process, I have been, for the last eight and a half years, I think I have been following this process and I've been trying to master it, which we call the lean UX process. It. Uh, so it always starts with declaring some assumptions or getting the overview of a problem.

[00:03:27] And then based on that, as a designer, I always try to create a lot of options, a lot of prototypes, and then I try to validate it internally with the board manager, engineering team, subject matter experts. Update the prototype, then do some research, do some usability testing, and based on that build, get it built by the engineers and then it keeps going on in cycles.

[00:03:47] And I would like to point out that I often act like the product manager by contributing to the product roadmap, uh, once per the lead PM Also, you know, in, in, in between lines, he tried to poach me as a product manager too, but I was [00:04:00] just still interested in creating prototypes. Um, yeah. Now about the context.

[00:04:05] Uh, we, the, the tool that I work on is called DPS, it's called Dynamic Pricing Service. Again, I'll use it, use the acronym several times it. So it's, it's a web-based tool used by business analysts to create pricing configuration. So to give you a little bit of context, um, so, and if you order from world or any other delivery, food delivery app you see there, the final delivery fee is not just one.

[00:04:28] It's comprised of several delivery, several different types of delivery fees. And there it can be something like this. The final, and this final piece keeps changing depending a lot of factors. How far away you are from the restaurant, what, how much basket value are you adding? Are you ordering just one burger or are you adding ordering for the full party of hundred euros, for example?

[00:04:50] Then there are several discounts going on. Uh, then there is, there are weather conditions depending on that. We want to reduce the demand, so we make things expensive. For example, if it's very rainy [00:05:00] or it's snowing, we would not, we can't. Fulfill so many orders, so we try to increase the pricing and also search fee.

[00:05:05] You would've seen a lot of search in Uber, for example, so when there's a lot of demand, price automatically increases. And so these are things in the context of the tool, we call these components. Each factor of the pricing is called a component, which will come in handy later. Now imagine that you have to configure all of this for hundreds of restaurant in Berlin, for example.

[00:05:28] So the classic way would be to go to each restaurant and say, this is the fee, but at scale, you can't do that, right? You need some dynamic way of doing it at scale, and that's what the tool does. It lets you create rules and and conditions so that this pricing can be automated. Uh, so now imagine you have to do it.

[00:05:47] So how the tool works is all the different types of fees that I showed you are called components. I'll use it later in the, in the presentation. And it, there's an internal construct called schemes, which is sort of a group of these components. [00:06:00] And then there's another internal construct called assignment.

[00:06:03] So when you take these group of components or these group of pricings and you attach it to a restaurant or a group of restaurants that we call an assignment, uh, does that make sense? Great. Um, yeah, so basically this is what the tool is doing and, and on top of it, it's doing AB testing, which is simply that, oh, if I can I increase the price.

[00:06:25] So this is the slide that I'll, I'll explain. So what is experimentation? It is a very, I'm taking a very simple example so that we, we can, we can follow each other. So for example, a classic case, this is called um. So example, for example, if I want to increase in Berlin, my goal is to make more profit, make more money.

[00:06:42] So what I would want to experiment with is that I would like to see how much can I increase the delivery fee while capping the order loss by 10%. Because that is what is going to happen if you change. If you make things more expensive, fewer and fewer people will order. But since my goal. For the business goal is to increase profit.[00:07:00] 

[00:07:00] I would like to create a balance and this in the class, in in the analyst terms, it's called elasticity test. How elastic can you make your price without losing out on your business goals? Um, now a little bit about the user and yeah, here it is in yellow Sweater is the user. I met him in Sweden. Uh, the, we call them pricing analysts.

[00:07:21] But they are classic business analysts that you would have worked with. Uh, they just always, they have been working in the pricing domain. They have been creating pricing for hotels in the past or for flights. So they, they, they know a lot about it. Uh, so they usually what they do is they're defining the strategy based on what they get from in their regions.

[00:07:40] Different regions ha could have different strategy. For example, where we are market leaders, we try to create more and more revenue, generate more and more profit. But where we have a lot of competitors, we try to be competitive and we, uh, aim for growth. So different regions have different strategies and that results in different kind of configurations.

[00:07:57] Then they also adjust these prices [00:08:00] every month, at least every month, so that they can keep up with the business goals and business targets. And last but not the least, testing different pricing mechanisms. And it's usually a one man circus. They're not, they work in a team, but one person always handles one city or one country, depending on how big they are in that country.

[00:08:17] And if you can see, yeah, they have like these two big, uh, monitors and one laptop. So they're usually always working with three screens. Um. Alright, let me drink some water.

[00:08:30] Alright, now coming down. So this was all overall context about the tool and how it works and who the users are. And now coming down to the experimentation part of it, um, I think it's, it's true everywhere in all startups, in all businesses that we want to make more and more data driven decisions. And how can we get more data is with experimentation, with doing a lot of ab tests.

[00:08:52] So one of the major goals when, when I joined of the company was to reduce the complexity of setting AB [00:09:00] tests in order to democratize it. So what we mean by democratizing it is to, so that each region can handle their own experiments because it's very complex. Even a single mistake can render the experiment useless.

[00:09:11] Also, they have to follow a lot of, you know, good practices so that you get, uh, good data so that you can take action on it. We always like to generate insights into our customer's behavior because that lets us be competitive. So this was the overall goal. Now, the business goal that I got was, you know, simplify the experiment configuration experience in order to increase its usage.

[00:09:33] We could see that there, the usage was not increasing, but the goal was to increase it by at least 30% so that 30% more experiments are being created by users and reduce the time on tasks. So each a standard experiment was taking three hours. Of, of one user's time to create, which was a lot because these are also expensive employees.

[00:09:54] They are, if they're three hours of them, if it takes three hours to generate just one experiment, they can't do it at scale. [00:10:00] Uh, so if you just, uh, distill it into problems, it would be, uh, that the configuration experience was so complex that it was holding users back from creating, from using experiments.

[00:10:11] So there was a lack of growth. PM told me that over quarter by quarter, the number of experiments being created was not increasing. And the other problem was handholding. So I talked about the central pricing team, right, who sit in Berlin, but they had to create a lot of experiments for the regions. And there are just four or five.

[00:10:29] Members in the central pricing team, they can't go around creating, uh, you know, for, for experiments for 40 different regions. So we wanted to make it simple so that it can be democratized. Uh, does, does that make sense? Alright. So yeah, I, I was also at that time new and it was my first time thinking about looking at AB tests.

[00:10:50] So I started with discovery. And I found more four major themes of problems. I'll get into those one by one. But basically what I did was I did, again, this was [00:11:00] not linear. It happened over time and it was not always targeted to just this problem, but rather also just trying to understand their workflows better.

[00:11:08] So I did not nine user interviews with 14 different users. Why 14 different users? Because a lot of times they brought their colleagues with them. So several times I was talking to two users at once. Then I also did two workshops with 15 users. Where we found a lot of usability issues and the numerous slack conversations.

[00:11:25] This I'm quite proud about because I have, over time, I've created this relationship with a lot of users in different regions where they are open enough to just text me on Slack whenever they feel that, that something is missing or they think something when a new feature goes in. Even me without asking them, they're just texting me with problems that they're facing.

[00:11:42] So a lot of these, I also distill these conversations into these four major problems. So I'll start with the first one, or before that I'll show you the old ui. So when I joined the UI looked something like this. I am not sure why, because there was no designer involved. [00:12:00] It was built by a PM and an engineer.

[00:12:01] I think it was just a MVP product, and it was bare bones, black and white experience built without a designer. And the biggest problem here was that it lacked affordances. There was no color. So I, even as a designer, it was very hard for me to design a link, for example, because link and text everything looked the same.

[00:12:19] But that was a more of a overall problem, overarching problem, rather than just a problem of experiments. And this is what the experiment configuration, oops. Screen looked like very bare bones, black and white. Uh, I, I'm just trying to show you what the beginning was. Okay, so how are we on the time? Yes. Let me quickly show you the old way of configuration in a very quick way so that you understand what usually they have to do.

[00:12:44] So this is something that, the UI looks like this right now. So to create, I spoke about, uh, component schemes and assignments, right? So, so let's say you want to check the elasticity of price in Berlin, for example, or in mid, in all the McDonald's in midday, you want to see how [00:13:00] elastic you can be with pricing.

[00:13:01] So what you would have to do is you create a component, you configure all of this, you save it, then you create another kind of component. You configure it, you save it. Similarly, you can probably create four or five different types of components. Then you go on schemes, you create a new scheme and you choose all those components that you created in the previous step.

[00:13:21] And you make a group, which is a scheme. Then you go to an assignment and assign the price you choose in the vendor group filter. You say that, okay, my uh, I choose McDonald's here and I chose all the schemes. And that's it. That is a very simple way. Now it, the prices are active. Now you want to experiment on it.

[00:13:38] You do the previous steps five more times because you have to create so many versions, so many variations of pricing. And then you do a similar thing as you, you choose the zones, let's say, uh, and Prince lava bag. And you start adding vendor filters saying McDonald's, and you start choosing schemes. And this, this is the classic process that they follow in [00:14:00] the tool.

[00:14:00] It's very, it, it's very broken. Let me go back to presentation. Yeah, so the biggest problem that I found, which I identified during my research was that there was a lot of duplicate duplication of effort. So in automatic assignment screen, you create those five line items and then you create it again in the experiment screen because the UI was not supporting them to, you know, to create templates, for example.

[00:14:29] So that's what the first problem was. Uh, there was a lot of duplication of effort. Users had to repetitive, configure the same things in several different task flows. And this, I also, uh, I, I asked my users to, while they were doing, creating their experiment, I asked them to record their screen so that I can see how much time was just being spent in duplicate duplication.

[00:14:50] Well, it was around one and a half hours in making duplicate configuration. So what I did next was that to solve this problem, I tried to create three [00:15:00] different solutions, which I thought would work. I could get into the detail of each, but we have only 10 minutes left. But if you ask me, I can also get to it later.

[00:15:09] Um, and then I took these three options to the team, to the product management and the engineering team, and we decided to go for the last one. Why? Because it was the easiest to build and had the most impact. The second one also had a lot of impact, which we actually built later. But at that time, it also needed a lot of backend changes.

[00:15:30] That's why it took us around one and a half years to actually build it later. And the first option was totally disregarded because it was just creating more problems. So now I'll just talk about the, the, the first problem, how I solved it. Also, you now see a cleaner ui because as a side project, I also initiated a UI redesign that resulted in a 92% user satisfaction.

[00:15:53] Just made it more elegant looking, more affordances cleaner. Uh, but that's just a side project. [00:16:00] Okay, so first thing, oops. A lot of different, I don't know why this happens. Yeah. So first what I did the same kind of popup, but different looking. Here I added a few, uh, a few, uh, design changes. First of all, full screen pop-up as you, if you remember, the, the other pop-up was a side draw, even though for was such a con complex configuration.

[00:16:23] I don't know why we were not using the full real estate space, so I just made it a full screen pop-up. Also, I split the configuration into two pa two pages so that I, I assume that it would be easier for the user, but when I tested it with users, they rejected it. They said that we like the whole long scroll.

[00:16:40] So, uh, we stuck with it. And also I added this information, chunking, and a lot of it, I didn't just add an experiment, I added it to other parts of the tool as well. So information chunking. Why? Because it just improves readability and reduces over information over road users when they see they can, you know, chunk by chunk, do the consider.[00:17:00] 

[00:17:00] And the solution that we chose was basically to import automatic assignments. The assignments that I spoke about, they're, at the end of the day when they're creating pricing, for example, for McDonald's, they're, they are actually testing the same kind of price. So it was a very simple solution, but it had a huge impact.

[00:17:17] So what you can do is when, since you have already created five different assignments, you can choose, choose those assignments here. And just import, and it imports the whole configuration for you. Now, you can go through it and change a little bit that you want, but overall it saves a lot of time. I did some usability testing for some edge cases that what happens when you, if there's already an existing configuration, do we need to show a alert saying that, Hey, your, uh, configuration will be replaced?

[00:17:44] And that's what, again, my second assumption was that they would want to replace the existing configuration when they import it again. For example, here you have already imported 10 different target groups. What if what happens if I choose something else and import it again? So I assume that it would replace.[00:18:00] 

[00:18:00] During usability testing, I found that they didn't want to replace, they just wanted to add to it. And one user even went so far as to show me the impact of comma separated values. So our tool had nowhere was allowing them to do, uh, to taste comma separated values. And this is where the delight was added, that I suggested the option of adding comma separated values to the tool.

[00:18:25] One user. He was so excited about it that he did this analysis saying that without comma separated values, he had to click on the UI 332 times for a very large experiment and with, with comma separated values just reduced to three actions. The impact of this first, this just import feature was already huge.

[00:18:44] We could see 35% increase in experimentation in the upcoming quarters. The time on task, which was one and a half hours before. For just for the duplicate effort reduced to less than a minute, because now you can just select and import. And the great thing that we saw was that [00:19:00] 90% of the new experiments that were created in the upcoming quarters had used the import functionality, which meant that even with, even though I just tested it to five users, people, the users across the globe were using it.

[00:19:13] Um, so now I'll talk about some more problems in the next seven minutes. Uh, do you have any questions? Still now?

[00:19:22] So the first one was the, the problem that we solved first was duplication of effort, but there was a lot of other problems here as well. For example, the grouping mechanism that I told you about schemes, and here I feel like I did great because. I was the one who first suggested this to the team that schemes are, are cumbersome for the users because I could see it when I, whenever I saw them using the tool, they, they found it very cumbersome.

[00:19:44] But engineering, uh, had to, you know, regroup and think about it because it was a fundamental change in the tool. So they had to take some time. They take a year, took a year to actually build it. Um, so schemes are cumbersome. User's mental model was different from the ui. I'll show you later why. [00:20:00] And UI was very prone to mistakes because it was not helping you review your, uh, your configuration.

[00:20:05] And a single mistake can lead to a huge loss. And this was a, this was an example. One user told me that once he made a mistake and over a week he couldn't, he didn't identify it, and there was a loss of a hundred k Euros. So we wanted to reduce, uh, mistakes. So again, I'll show you the other, uh, other, uh, design changes that I made.

[00:20:25] Again, the same ui, same configuration. But now again here. So you start with adding a filter. You say that I have all McDonald's, I want to target all McDonald's in Berlin, and I want to test how much I can change the basket value and make the most money. For example, I'm again talking in a very crude terms.

[00:20:46] So, and there are three different components that I want to test together. So first thing that I changed, and that was the biggest change, was that I made. Linear selection into a tabular input, [00:21:00] which, so this kind of table, because it matches, matched the mental model of the users. They were always, whenever I spoke to the users, whenever they shared their screens, they always were doing a lot of their analysis.

[00:21:10] And any business analyst that you speak to, you'll see that they do a lot, a lot of their analysis in Excel sheets. So they were used to this kind of, uh, ui. Um. Where is it? Okay, maybe it comes later. So now what you can do is you start choosing the control, uh, which is your, which is a regular, uh, assignment.

[00:21:33] So basically what I chose here is that a delivery fee, distance based delivery fee, some minimum order value, which is probably 12 euros here, and a service fee of, let's say 50 cents. So another delight that I added was that I added this default of same as control. So earlier what the users had to do is they had to choose all these nine.

[00:21:55] Uh, dropdowns, they would have to repeat the configuration again, but just [00:22:00] adding the same as control as a simple default already improved this UI a lot. It also improved the readability. You don't have to figure out, because sometimes they have like 10 variations. You don't have to figure out if I change something or not, because by default it is the same as control because what they want to only test is the minimum order value.

[00:22:16] So they want, what they want to, in this case, want to test. Is that, what can I do 10, 11, or 12? What will be the best? Minimum order value that will, uh, achieve my goal. So again, the table view is easier to overview and review, especially at scale, because I'm just showing you a simple example. But at scale, this works even better.

[00:22:35] And why The table view? Again, this is two screenshots from, uh, my conversation with the users. You can see that a lot of their analysis that they're doing is an Excel sheet and is in a very tabular way. So they, they really loved it when I showed them the table configuration in the UI as well. Alright, a few more things that I added.

[00:22:55] Okay. Now going back to here. So here you, so even here, it's very easy at scale to [00:23:00] see that I'm only testing minimum order value without having to, uh, you know, squint and see if I have selected every component correctly or not. Um. Another thing that I added was this hover view. So earlier what they had to do.

[00:23:15] For example, I want to see, oh, I wanna see what is my Central London sf, because it's not showing you the detail. So they had to open another tab, go find that component in the list that I showed you, open it and see if it's correct or not. But for one component it's fine, but when you have to do it for 50 different components, it just takes a lot of time.

[00:23:32] So this was a simple solution that I added, this H view where you could just click and see. What the value of this component is right here. If you just want to review it, and they can just, so without leaving this flow, you can now review what you want to, and if you see something, if you see that, okay, this was not what I was going for, you could just, I also added this edit button, which you could just click and it opens a new tab and takes you to the, the component [00:24:00] directly, and you can change it.

[00:24:00] You want it to change from 2% to maybe, let's say 1% of the basket value. And you, you save and you go back here. So this at scale worked really well. Now another thing that I did was that I added some controls in the ui, which were not there. For example, this collapse all button, but what I showed you in one box are basically, they're doing it for 20 different boxes here.

[00:24:23] So a few things here. So expand all, collapse all was a button that I added. Then I also added this duplicate button that you see. So a lot of, even among within these target groups, each of this box is called a target group. Even within these target groups, a lot of, uh, information is repetitive. So it was.

[00:24:42] So we this along with, yeah, along with the team, we figured out that it would be great to add duplicate, and we added it in several different places in the UI and now you can just duplicate it, change a few things. Again, duplicate the target group, make a few edits, and it just totally improves your time on task.

[00:24:58] Another thing that I added [00:25:00] was this, um. Rearrange button, rearrange, uh, icon. So now you can just drag and drop and change the priority. Priority is quite important. I'll not get into the details of that. So earlier when you had to prop, for example, if you are, you added 10 different target groups and you realize that, oh, this is, this had to be the last priority, what you had to do, which is very stupid, that you had to delete all the ones before it.

[00:25:26] Only then you could put it in the last priority. So it was a very simple solution, but it totally helped them recover from errors. And one was, yeah, the last thing, the reviewing the UI was difficult. So already with the table view, reviewing became easier, but I al also added this chips in this target groups so that in the end you can just quickly review everything and see if everything is in place and then go and save experiment.

[00:25:52] So all of it together had a lot of great impact. So I tested this UI on several different stages with the [00:26:00] users and there was a 50% increase in the ease of use. And what I mean by ease of use is the perception how the users perceive this new UI is as compared to the old one. So users thought it's 50% more easier to use than the old one.

[00:26:14] Also have some great comments from the user. The floating clutter is gone, which I like. So I think they meant by floating clutter is the side draw. They love the, the full screen view. They said Love the table form because it's exactly how we do in our Excel sheets. And this user even went as far as to say that this pretty much solves the main pain of experiments.

[00:26:34] So there was great validation and that's why I could also convince the engineering team to spend so much time in removing schemes and changing their backend and which resulted in amazing results. The number of experiments, which is in the last one year after we built it. Has totally doubled. Now I, last I checked it, now you, the experiments are, and this doubling is after the 35% increase that we saw earlier.

[00:26:58] So, and [00:27:00] again, I did, I asked users to record their screen earlier. It was around, uh, three hours for one standard experiment of a medium sized experiment, and now it takes only 1.5 hours. So it, so we did see the impact for it. I think we are on 26 minutes. If a few more minutes, I can just close this presentation.

[00:27:21] There are some constraints and challenges. Uh, the biggest constraint, I think this, this is a problem with internal tools is that since the U users are employees of the internal employees, it often led to the reduced focus on UX quality because we said, uh, they are, they are our colleagues. They'll use whatever we serve them.

[00:27:38] And the other biggest problem was that constantly building a minimum of MVP. So whatever, uh, at least I, as a designer would take to the team that this is what I think the MVP is. Engineering team would always, you know, distill it even further because they wanted always to be, you know, be very effective with the bandwidth of engineers.

[00:27:56] And, and last problem was that design exploration was [00:28:00] ly limited by the MUI Component library. The material UI component library by Google. I'm not sure why it was originally decided to be used because it is totally, it's really not fit for web-based complex tools. It is good for simple components, but yeah, I could not, I could never change this.

[00:28:15] And the last one was difficult to measure the financial impact. I'm still working on it. I'm not sure how to do it. So even though, for example, experimentation doubled. But did it lead to increase in profit or did it lead to increase in revenue? I'm really not sure. Yeah. One thing I'm sure is that if man hours have reduced, we at least have saved that money.

[00:28:36] Alright. Uh, a couple of more minutes. I've also wanted to show you the future. So basically. Even though this was lot of improving the configuration experience, but there's a lot that goes before and after this in the user journey. So even creating hypothesis, the tool is really not helping them. So this, I'll not get into the detail because this is more of still a concept, even though I've validated with a couple of users, we have not started working on it.

[00:28:59] [00:29:00] So one thing I I added was adding a dashboard in the UI so that you can easily track within the ui, you can track your, uh, key metrics. And you can track what I want to achieve so that you, so that from here you start and you can start making changes. The other thing that I'm proposing is a visualization view.

[00:29:18] Again, if I, I need like half an hour to show you why this, this works, but I validated the users and they love it. Uh, so, so this basically gives you a overview. If you're sitting, let's say if you, if this tool is in Germany, this gives you an overview of all the prices that you have done. You can filter it, you can add filters and also see it for.

[00:29:37] McDonald's and Prince Berg, for example. And if you click on it, it shows you all the details that you have done. And it also shows you performance, MA metrics, how they are changing over time. And this was the key thing because based on performance metrics, you try to create new experiments so you can even click on something.

[00:29:55] You see, if I want to change the service fee, it can predict [00:30:00] because we have systems in place where we can a little bit of, make a little bit of prediction that based on the past data, so if you change something, how much will it impact these key metrics? And if you're convinced you change it, otherwise you can still create an experiment out of it.

[00:30:13] So this is something about the future. We can get into details later if you would still like it. Um, and that's it. Uh, any questions, any, I'm open to any questions, feedback.

[00:30:27] Amazing. Awesome. Thank you so much for working through this, uh, in, in, in so much detail. Uh, really, really cool and, uh, yeah, cool to understand in detail something that is definitely complex, uh, to start with, uh, to sort of dive into. So appreciate all the details. Um, yeah, I mean, I have a couple question.

[00:30:45] Isam, do you want, do you wanna, do you wanna jump in? Uh, if you, if you do you wanna start or otherwise, I'm happy to start. Uh, yeah, you, you go on and I can go after you. Um, okay. Yeah. Uh, I mean, [00:31:00] um, bunch of, bunch of things were, were really interesting. I'd love to maybe talk a bit more about the, you, you mentioned, I think there, there's a bunch of times where you did like user testing.

[00:31:09] Like you sort of like created, you had, you identified a problem, you created a hypothesis on like different solutions, and you went and like test study with users to validate. Tell us more, a bit about. How did you do that? Like, did you, like, what did that look like? Was it like, so yeah, I guess that in general, like how did you, how did you go about this?

[00:31:27] Yeah, I should have kept some, uh, maybe we, I can, maybe I can show you something very, yeah. So let me share my screen again. This is for the dashboard that I showed you. Just to show you, not going into details, but this is something like kind of a, uh, you know, uh, the process that I have. And so I, since I say call it lean ux, I always just test with, uh, five or six users who already start seeing patterns.

[00:31:54] And when you have like an engineering team, when we are where you are quick, you can, you know, make some mistakes and change it over [00:32:00] time. So what I do is that always first start internally, I try to understand the problem, stop speaking to stakeholders, subject matter experts. I work very closely with them.

[00:32:09] So once we have a problem. I, most of the times I already have some context from my past conversations with the users. So I, I start with some, so I create this document where I have some questions regarding more like a formative user research where I have some questions regarding this problem. I create that questions and in the same research, I also create what I think would be the solution before even going to a single user.

[00:32:33] So I, based on my internal, uh, discussions, I create some, uh, prototypes. So I, then I scheduled the interviews with these users and I start with these questions, and in the end, I, I give them the prototype and see what they, uh, how they use it. So it's kind of this hybrid model that works well for me in smaller teams that.

[00:32:55] I'm not just doing just this huge formative user research, then making the [00:33:00] prototypes and then doing usability testing. Sometimes I do it when it's necessary, but a lot of times I combine it together and you get a lot of insights from, initially they don't even know if I'm going to show them some prototype, but I'm just asking general questions and then I show them the prototype and get their reactions out of it.

[00:33:16] Does that answer your question? Yeah. Makes sense. And how do you, so that, that's super, uh, helpful on the, on the sort of like, process and, and do you sometimes, like, you know, there's a few times I think in, in your presentation where you talked about sort of okay, the solution to a particular problem, like, um.

[00:33:34] I think one time you mentioned you had like different options, right? Like, or you, do you sometimes like look at, show different options to, to a particular user or to different users? Like how do you sort of go about sort of making the decision between different ways of solving a problem? Yeah, and yeah, I, I have done it several times, so a lot of times.

[00:33:54] Even though I create like three or four options several times after discussing internally, we are already able [00:34:00] to, you know, with the existing constraints and understanding of the product and users, we are already able to distill it down to, let's say, two options. I don't think I've ever tested more than two options with the users, so we try to, at least even I try to distillate down to two options that we think are the best, and then I alternate it with the users.

[00:34:18] And see which, which works better, what kind of comments am I getting? And that's how we usually decide which option is better. At least that's how I decide which option is better. But several times it also gets down to what is easier to build, uh, what is quicker to build for the engineering team. So I have to definitely keep the engineering constraints in mind.

[00:34:36] I can also show you some of my, I can't get into the details, but for example here, I had three different options. But then we decided that import would be the easiest. So then I finalized the A SA import and detailed it out, and then we built it and we got results. But then since I really, I really wanted this component where we removed the schemes, then [00:35:00] I did another later in the, later in the, in my work I did, for example, created these different options.

[00:35:09] For just one of those solution options. I created more variations where I was trying out different, uh, micro interactions. For example, you know, this is a different micro interaction for the same flow. This is a completely different micro interaction for the same flow. And then the table that you saw was the third different micro interaction.

[00:35:26] And then again, the same process. Discuss it internally, see what works best. And we, I'm always discussing it, taking it to back to the engineering and product management, not doing it on my own. I try to put my points forward with what I think would be the best for the users and the usability, but a lot of times we're definitely in the realities of business and engineering.

[00:35:45] You have to keep the constraints in mind. Does that answer your question? Yeah. Makes sense.

[00:35:54] I wanna ask question. So, um, so as far as I understand for this dynamic [00:36:00] pricing part, you're the only designer, right? Yeah. And, um, I wanna understand more about your impact on understanding the whole picture. Like we, we talked about, okay, how do I create experiments and then creating experiments, uh, journey, but, uh, as a pricing analyst or like what, uh, as a user.

[00:36:19] How can I connect this part? Like this? The part that you designed to the other side, for example. Can I like, what is the impact of your design on me analyzing the experiments I already created? Like can you tell about the bigger picture and if your new design impacted other layers on the platform? Like what was the impact or like, if, if it's a case.

[00:36:42] Yeah, that makes sense. So. So overall, yeah, I have done a lot of research and in the past, uh, in the beginning of the last year, I also did this project called DPS of the Future. Where I wanted to see how two years down the line, where do we want to reach and I'm just trying in a minute moment I can file, [00:37:00] show you the documentation so that you can see the kind of work that I did.

[00:37:03] So where the goal of that pro project was, or in general, when I'm also going to the users, I'm not just trying to understand how do they do experimentation in the tool. I'm trying to understand what their workflow is, and especially this tool is just one part of their larger workflow. So. We actively decided as a team that we don't want to be another, uh, dashboard.

[00:37:25] Uh, what is this tool called? Um, Tableau, for example. So I saw in my research that. They, there are three parts of this whole experimentation process there, or even the whole process of assigning, uh, pricing to vendors. This first you hypothesize, you say that, okay, McDonald's, I want, I can increase more price in meta because rich people live in meta, for example.

[00:37:48] Uh, very crude in very crude terms. Then you try to test it. They do a lot of Excel sheet. Magic they, and then the middle part comes, which is creating experiments, configuring where the tool [00:38:00] helps. And after the experiment, there's this analysis part where they have a lot of dashboards that I have screenshots of videos of, which is mostly Tableau dashboards that each region has created.

[00:38:09] So even, and this was one of my solutions that can be at least try to incorporate the analysis part into the flow from that. You saw the dashboard that I had created that was the result of it. So, but we actively decided we'll just show. The bare minimum. We just want to be the link between these two flows and we don't want to build another Tableau internally.

[00:38:29] And that was an active engineering product decision. And let me find this. How do I find it?

[00:38:39] It have product already, but does that kind of answer your question? Yeah, yeah, yeah. I just wanna understand your, uh, yeah. Thinking behind that. Yeah. So, to, to summarize. Um, am I, yes. To summarize, I. [00:39:00] I try to understand the whole flow. A lot of times, due to the constraints and due to product decisions, we only impact, we only build some limited things, but with, especially with the addition of the metrics in line that I showed you, there was some inline metrics wherever you have your editing, something that is, that was kind sort of the result of this research because I, I could go to the users and find out the kind of metrics.

[00:39:23] I also have a sheet that I can't find out where I listed all the different metrics at different regions. Look at, and then I worked with the data analyst in the engineering team to see which of those would be the easiest to show in the ui. So that's how I distilled those, let's say 10 different metrics into five that we were showing in the dashboard.

[00:39:44] Yeah. Okay. Thank you. Can I ask one more question? Yeah, go for it. Okay. So, um, how, how do you like. Maybe I should ask this question as well. So you also [00:40:00] mentioned that you, uh, sorry. Yeah, yeah, no, I just found that document. Yeah. Okay. I can quickly show you. So the details of the future thing where I wanted to impact.

[00:40:09] Across the user journey. This was the project, and it was like a six month long project where I started with, oops, it zooms in very quickly where I started with a lot of, you know, did some internal research on, uh, strategy documents, on business documents. Then I spoke to each, the, each group that you see, this big one is talking to.

[00:40:31] A certain kind of stakeholder. I had a lot of questions, a lot of sticky notes. I also have grouped it together to find out what their vision for the tool is. Then I also did this workshop, then I did some. Um, so based on this understanding, I made some, uh, user journey that I think should be the ideal user journey.

[00:40:49] So this is what I think would be the ideal user journey. Then I did this one day workshop with the internal stakeholders, where I showed them what I think is the user journey [00:41:00] and asked them to make their in groups. They may did their own user journey, and that's, and similarly then this led to more explorations, how we could show the ui.

[00:41:08] So this kind of, you know, first I went across, then I went. Uh, uh, uh, conversed on dashboard. There are certain things if have to get into the detail of this project. This is, again, another conversation, but this is how to answer your question. This is how I, one of the ways I try to impact the whole product and not just one part of it.

[00:41:24] Yeah. Please go ahead. Amazing. No. Amazing. Thank you. Thank you for showing this, uh, this mirror board got me excited. And so, um, you also mentioned that you, um, you work together with users and like approach and workshops and so on. Like, um, how, how is the relation, like how is the approach that you follow on the research part?

[00:41:47] Like do you continue to do it? Do you do it by project? I understand that you kind of sketch the end, end user journey, which gives me an idea that you have a certain, that like research [00:42:00] approach or, yeah. Um, just a second. Let me, so, um,

[00:42:10] yeah, so how I, so it has been like a long. It's more like a marathon. How I have done it, it's basically when I first joined, I had really no idea about the tool. So I was asking, I, I remember that I was, I couldn't even understand sometimes the basic concept. So with each feature, my understanding became better, and I, whenever I go to the user, I, not, I, I'm.

[00:42:32] I try to focus on the, uh, the task at hand, but I do ask, you know, questions around it so that I can try to understand. So my understanding of the user journey has increased over time. The deeper you go, the more you learn about them. And one thing that I have done, like I showed you, let me show you again here and please, uh, let me know if I'm not answering the correct question.

[00:42:56] Um, can you see my slack? Yes. So here you can see [00:43:00] the user groups. This is just, this is like, I'm regularly talking to them. They are sending me a lot of messages. So even, you know, I have like this sort of a personal connection with all these users. So a lot of times I'm just asking them a simple question that, Hey, how would this work?

[00:43:16] Or what do you think in this case? So, so overall o over time it has increased my understanding. But, but usually I've, I've not done a huge research with 20 users. I've always done it with five or six. But over time, this has led to me having more and more understanding of the user journey. But the two workshops, for example, that I did with the, that I mentioned here, those workshops are not just about, uh, experimentation.

[00:43:42] We call those workshop usability improvement. So there, we had this, me with my design manager, we prepared this. Where we had, we let them, we kind of did co-design workshops with them where they brought up their pain points. So sometimes we go by it, sometimes we go, [00:44:00] you know, very pointed questions. Uh, but overall, I will say that I have spoken to at least one user every month that I've been here, and a lot of times even more, but always point, it has always been around the task that I'm working on, but.

[00:44:14] Slightly increasing my impact or slightly increasing my understanding as I go along. Does that answer my que answer your question? Yes, absolutely. And, um, yeah, maybe before the session ends, I will, uh, hand over to Toma. Maybe you have more questions. Uh, yeah. Um, one more question. Um, I'm curious, you, you mentioned, uh, a few times, you know, that part of sort of defining, uh, defining the, the, the scope that you ultimately gets implemented is sort of, you know, the negotiation or the discussion with engineering and product.

[00:44:49] And, you know, this, Tim and I go through these conversations on a regular basis. Um, so of course, um, that that's sort of part of the. Curious how you approach these, um, you [00:45:00] know, in particular, like how do you make sort of the case for something you, you know, if you, there's like, okay, you got good validation in like a, I don't know, user research about something.

[00:45:09] Like, like, and, and you, you mentioned, maybe you can take an example. I think there, there's, this meant you talk about this, you know, removing the, uh, the, the, the, the groups or the configuration, like Yeah, yeah. We would love to hear a bit more about that. Yeah, so I can give you two examples and one great example is the schemes.

[00:45:25] So I, I remember that I proposed it in 2022 and it got really built in the middle of 2024. So, and the only reason was that, uh, because I, I think at that time I was also new and I thought that this is great, but I also didn't, myself was, had strong points. I only had this basic user validation with five users.

[00:45:44] And I think product management team usually likes. Big data. Mm-hmm. There I had this validation, but how I approach it, and engineering clearly said that this is a big project. We have to fundamentally change the backend to really remove schemes because it was tied everywhere. So it makes [00:46:00] sense. So at that time I was, I was fine.

[00:46:02] Yeah, sure, let's not go for it. But over time, when I was doing more research and speaking to more users, every time I got some kind of feedback which supported my case, yeah, I would take it to them and every, you know, because we are working closely and there are like these ceremonies, like quarterly planning and all, I always put up my voice and eventually everyone agreed that this is something, you know, that we should work on.

[00:46:23] Because I'm not the only voice of the user, the central pricing team, I always used them because I also, they also kind of are a lot into usability and they don't understand product building processes so much. They understand pricing analysis a lot. So they also saw value in this and they also hear from the users.

[00:46:40] So it was like, you know, multi, uh, I don't know, in a battle. Like we had multiple fronts and ultimately it. Converted. And the second example that I can give you where I did like really solo work was this changing the UI into the blue colored UI that I showed you. So when I took it the first time, I said, Hey, let's change it because it's, [00:47:00] it's because it was like purely a UI change.

[00:47:03] People, like internal stakeholders were not very excited about it because it was not a business, it was not really adding any business value. So there, what I did was that I installed the code base. In my own laptop by working with a UI engineer and I tried changing how we could, like, with the minimum effort, how we could make the UI more elegant.

[00:47:26] And I, I worked with it and it was very complex because the UI was, had really bad code. You change one, you, let's say you want to change the color of the button. It should be easy as changing the color of a button. But it was, for example, going and changing the whole background, making the background blue, for example.

[00:47:41] So I did that and I worked with a UI engineer in that. And ultimately we could, we went to the, uh, product management and engineering leads and said that, Hey, this is like a two week effort. And this was already greatly improved all of our lives. Engineers, designers and users. And that's how I could convince them.

[00:47:58] And in the end, [00:48:00] after I changed the UI to that, I call it the blue ui, because overall I think that was the major thing that changed. And when I did it, I, uh, initiated this, um. Um, survey internally, uh, around 40 users had responded and 92% of the users said that they really love this new ui. So I again, took it to the product management to, to show that this was worth our effort, and so that they, and eventually I could see, you know, that trust also increases.

[00:48:29] Initially when someone asks you bring more data over time, they, they trust your decision making and a lot of times they don't ask you so much. Does that answer your question? Yeah. Super good. Great, great. Uh, awesome, awesome example. Thanks for sharing that. Um, cool. Well maybe we, uh, we can sort of, uh, end here on, on our questions and give you a bit of time for any questions you may have for us.

[00:48:51] Yeah, yeah. I have some questions. Let me open this list and yeah, we have like seven minutes. [00:49:00] Yeah, I think, uh, some of the questions I had already asked you Toma last time, and, uh, some of my questions would be for stem. Feel, ask free to only ask questions to them if you want. I won't be offended. Yeah. So how often do you validate your designs with users, or how often do you do user research?

[00:49:21] Um, I think more or less, um, how you defined your approach on user, uh, research. I guess like we have different resources that we conduct user research. Yes. We, we go ahead and then like, um, have meetings with our users, um, personally, um, after the designs, but we also have different resources that we get, uh, user inputs.

[00:49:43] Like for instance, we sometimes like put some time to, uh, watch some sales calls or like customer success calls. They personally talk to users. So we get idea about like, what is not working, what is it, what is good, what is, uh, not good? So we are not really like using, um, [00:50:00] like, uh, direct meetings with users as user research part, but like different resources.

[00:50:05] I will say, I think personally, I, I put time every, every other week to gather data from the users, but when it comes to like, okay, how often you go ahead and then have meeting with users. Then I will say like this, this is less maybe like, um, maybe once in two weeks, three weeks, depending on the project and so on.

[00:50:26] Like for, for my case, like it's more like, okay, I go ahead and then design, do I quick, uh, design iteration and then quickly reach out to users five or six. Okay. Yeah. And like, this is kind of it like this, like every, like right after each design process. Fair enough. Yeah, I understand. And yeah, great thing about, you know, using like the secondary sources like customer success and sales to understand more about users.

[00:50:51] And the second question, I think this is also like a very tricky thing, especially as a designers, I think you would understand that how data driven is the design team. Are there any tools in place to [00:51:00] gather, uh, especially the behavioral data of the users? Yeah. Um, I, I think we're. Like, uh, putting a lot of effort on this, like also, uh, aligning with product team.

[00:51:14] Like for instance, I, I can have many cases, like, I go ahead and then ask product. Okay. I wanna validate, like I wanna, I, I'm designing some sort of like, for instance, like a note like we have on our platform. But first I need to understand our current data, like. For instance, like how many characters do they use for this piece of code block or like what type of code do they use?

[00:51:37] Like what type of parameters do they use? Like for instance, for these part, these part of aspects, uh, our product team really, uh, support us, uh, for the behavioral part. Uh, can you elaborate more or like, is it something that you're asking this? Yeah. Yeah. And this is I think, uh, also a challenge everywhere that behavioral, behavioral, I mean that sometimes you want to make very.

[00:51:59] [00:52:00] Seemingly trivial decisions. For example, what should be the default of this one dropdown, for example, and this, most of the times we are just discussing internally, and I have seen in my experience that I have been incorrect several times. Like me as a, me and the team have been incorrect several times.

[00:52:15] If only we had some behavioral data, we could choose which thing to put for default. Yeah, I, I, I think, I think most of the time in this cases, um, personally I choose the way to ask, um, our customer success team, because they're also the ones, like they're using the tools internally. Okay. What should be default by this?

[00:52:35] Um, and we also use, I don't know if you have used, but we have post hoc connection that we can go ahead and then watch recordings of the users. Mm-hmm. So that gave, gives as many, uh, good data source. Makes sense. Yeah. Yeah. And but also, please go ahead. No, sorry, go ahead. Maybe that will also create some excitement, but, and I, because I think this is great, [00:53:00] and for each and every project we defined what we wanna calculate as metrics.

[00:53:04] And then, uh, after the project, we al always have the dashboard that like how many users use it, like, um, how many organizations use this tool. Like, like whatever we wanna define basically. And then we collect this data on the meta on meta base too. So anytime you can go ahead and access, um, yeah. Numerical metrics as well.

[00:53:25] Yeah. Makes sense. That is good to know. And yeah. Related to this, I wanted to know that, are there any subject matter experts internally that you can always refer or understand more? Yeah. And is customer success team the subject matter expert? Absolutely, yes. They're, uh, what we call internal users and like power users, they, they're.

[00:53:46] There are some sort of users like do all the things, uh, what our users do and also help our users or guide our users and, uh mm-hmm. They're very approachable. And then, uh, we always collaborate, like we, we sometimes also [00:54:00] do user research directly with them actually like us testing and so on. Amazing.

[00:54:04] Sounds good. And, and there. I think the, the one thing I would add on this is they're an amazing resource, but sometimes we have to be careful to not just go by what they said because they're like the power users that know the, the product better than any other real user. And so they sometimes, you know, their feedback is like, I mean.

[00:54:24] Most, most of the time it's like really useful. But it's important for us to sometimes be like, okay, yeah, you get this because you're so deep into details, but some user that like looks at this once a week, like, are they actually gonna get this? And sort of balance that as well. So that's also something we, we often talk about at Ticket Mind is like, how much do we use them versus sort of going, which obviously easier to get access to them so they're always available.

[00:54:46] Mm-hmm. So that's, that's a great source, but it's important to balance that with also direct, direct feedback. Mm-hmm. From your real user. I understand, and also I saw on tactile website somewhere that I think your goal is also to democratize this decision making automation. So I think, yeah, power [00:55:00] users probably are not always the key key users.

[00:55:03] Yeah. Um, t Yeah. Okay. I'll try to, uh, just one minute. Yeah. And how, again, to question to stem, how often do designers contribute to the product roadmap? And is there like a process to do it? Is it easy to do?

[00:55:29] No, I, I, I, I think, I think yes. I mean, at tactile, I think this is, this is great that everyone is like, everyone has a place to raise their voice and opinions. This is great. And then you have like bunch of, um, search to basically collect information and then come up with different ideas. Like this is, uh, very welcome.

[00:55:48] When you come up with, uh, any suggestion, anything regarding this. Um, I'll say tactile is quite, quite fast paced, so, um. Maybe it's not that [00:56:00] much. You have that much time to just like, uh, go and like, create bunch of, uh, ideation and so on. Mm-hmm. But I think we have some great tricks to do many things with a limited time.

[00:56:11] Like for instance, we have, um, like you're using linear to track our, um, track the things, track director tasks that we don't like. It's something like Jira for instance. And we have, uh, there like a project called Ideal Spec Log. And whenever you have an idea, you go ahead and then basically put. Stem to get to there.

[00:56:28] And then we basically collect like, uh, a bunch of like, okay, in the future we can do this, this, that thing. And uh, I would say like, designers also collaborate really closely with product team. And, uh, we also have like weekly meetings with, uh, personally like product and design. And also internally as design team, we also, um, like put, um, how to say, like put, uh, the things that we think that we should be building and then share with, with the team as well.

[00:56:57] Mm-hmm. So I think, yeah, we put [00:57:00] effort on that. Okay. And yeah. Sorry, Toma again, more questions for, I guess in the interest of time. Yeah. This, the follow up question for this would be, and I was interested to know, since I'm, I'm, I'm assuming that one, one designer would, uh, like own this one part of the, the bigger workflow, but how mm-hmm.

[00:57:19] Is, are there opportunities to contribute across the workflow or horizontally. Uh, I think, uh, first of all, thank you for asking this question because I also wanted to ask the same to you, like similar question to you because now you, you're, uh, the only designer, but, uh, yeah. Like you're owning the entire platform, I guess.

[00:57:37] Mm-hmm. Like in our context. Yes, we collaborate closely, like we have, um, weekly meetings with design team and so on. But I think in our case it's important to, even though we lead the squads, it's important to, okay, I'm designing this, but like, is it touching your, your, your, uh, project, any of your projects or like how the, how did these two projects really talk to each other?

[00:57:58] And I think. [00:58:00] Pretty important. And lately, like I can say that we, um, started collaborating more closely. Like for instance, we, we do some internal workshops and like quick ID ideas. Okay. Uh, thank you Toma. Yeah. Um. Yeah. Ideation sessions and then we bring some ideas together to productive, like this is not something set in stone.

[00:58:24] And we, we do always at tactile, I can't say this mm-hmm. But personally I saw that that impacted the both, uh, collaboration of design team and then the quality of the designs, like design outputs we brought together as well. So, um, I would say we are trying to build a dynamic also, like team culture.

[00:58:43] Mm-hmm. Um, working together. But, um, I can also say that, um, we kind of all in one squad and then lead the squad as well. Yeah. I also also want to hear maybe one or two words, like, how keen are you? Or like, is it something you find [00:59:00] exciting to collaborate together with other designers and how do you stand there?

[00:59:04] Definitely. And yeah, I think now I also understand your question better when you ask me about horizontal. So since I own this, uh, the tool. It's not always that I have another designer who will also work with the tool. Mm-hmm. But we are a design team, which are, uh, which owns other pro. For example, my tool is only about pricing, right?

[00:59:22] But then there is also time estimation and there is other, other squad called, uh, delivery areas. And that in itself completes the whole, uh, delivery experience for the end, end customer. Yeah. We have, in my team, there are other designers who work on that. So we collaborate quite often, closely together. We don't really work on each other's projects, but we are reviewing it with each other weekly.

[00:59:43] And to answer your previous question, how I contributed to all of them was at one time I worked with another designer for one project when she needed help. Mm-hmm. So there I contributed in another squad where I actually didn't even know any engineers yet.

[01:00:05] Another way that I contributed was that when I talked about that when I changed the UI from gray to blue, there was also this gray Figma library. And all these three squads that I talked about, the three teams, had their own Figma library, which their designers were managing. So as part of that, what I did was that when I changed the UI to blue, the other squads also did it.

[01:00:28] And then I had the time to also create a unified Figma library, which all the three-- so basically now we contribute to a common Figma library and we take from a common Figma library. And I checked the insights for it. There was a-- in the usage, I calculated how often were the individual Figma libraries being used and how often this common is being used. There was an increase of 400% in addition of components. So that was, I think, one way where I contributed horizontally across even outside my product.

[01:00:58] Yeah, amazing, amazing. Yeah, also like on the design system or like design apps part, like I think all designers take part, collaborating that things. Yeah, and yeah, we also have like this weekly meetings as I mentioned, and then everyone just raises point that needs to get a feedback and so on. And then whenever you basically raise your hand or like whenever someone raises their hand, just we're always open to just, okay, let's solve this problem together and so on.

[01:01:22] I mean, personally, I like it a lot, working together and then ideating together and so on. I'm very open for it. And glad that you also mentioned that you're on the same page. OK. Yeah. And I feel like in tactile, I think, even though there would be different squads, I think the common goal would probably be the same, right? You would-- like, different designers would easily understand the context of another designer. I'm guessing that.

[01:01:45] Yeah. Yeah, yeah, yeah. We're not really different pieces, but we're always on top of each other's work. And also, we also put some time-- whenever I ask feedback, I also give context like what I'm building or where it's going to stand, what is the goal of this. So if one designer leaves or one designer thinks about switching context, we are always on top.

[01:02:08] Yeah. Amazing. Yeah, I think for now, we are already 10 minutes over time. But I'll let you go, Sam. And if you have any more questions, please feel free to ask me. No, I don't have. It's all OK. I really enjoyed meeting with you. And thank you for your time. Thank you. Thank you so much. Looking forward to hearing back from Valentino. Yeah, OK. Then good evening. Talk to you again. Bye. Bye.


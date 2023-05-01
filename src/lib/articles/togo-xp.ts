const date = "1/05/2023"
const title = "My experience as a Volunteer teacher & back-end developer for a Togolese non-profit"
const cover = "/pictures/projects/tingo/photo1.webp"
const keywords= ["Togo", "education", "internship", "volunteering", "computer science", "insa", "tingo", "AJVDEC", "Lome"]
const article = `
From mid-June to mid-August 2022 I traveled to Togo for my first industry internship as a Computer Science engineering student at INSA de Lyon.
 
For about two and a half months, I got to go way beyond my comfort zone. Traveling abroad for work for the first time, in an area of the world I knew very little about. With only television and the few second generation Sub Saharan African migrants I knew, as a shaky basis for understanding Togo. 

I have to admit that it was an incredible journey, giving birth to personal experiences and discoveries that I couldn't ever have anticipated, despite my best efforts to not be going there blindly.

<div class="picture">
    <img src="/pictures/projects/tingo/photo%20(2).webp">
    <div class="caption">A market in Lome</div>
</div>

Togo, for those of you who never heard about it, as I shamefully did previously, is a coastal Sub Saharan Country located in the middle-western part of the African continent, between Ghana and Benin. It is a fairly small country and a former French colony, with a population of around 8 millions, speaking mostly French, Arabic, a native language called "Ewe" around the south of the country where I stayed, and many others in different parts of the country. The population was composed of many ethnic groups whose borders were not really well taken into account during European colonization, as expected. It has a human development index of 0.515, being the 167th country on that list. 

It is not an over-exaggeration to say that it was quite an unreal trip for a clueless French Parisian like me. As I got the chance to live with the locals in a mostly authentic average income suburb of Lomé, the capital, and also travel to even humbler places such as small cities and villages.

Aside from the eye-opening discovery of Togolese culture, society, landscapes and very welcoming people, I got to experience an interesting technical internship, volunteering as a computer teacher in a middle school and later as a back-end developer with two of my fellow students from INSA de Lyon.
 
<div class="picture">
    <img src="/pictures/projects/tingo/photo%20(1).webp">
    <div class="caption">Teaching a young Togolese girl how to use the trackpad</div>
</div>

During the first three weeks, we were teamed up with nine CS engineering students from Pau, France, to teach boys and girls aged 10 to 16 how to use computers, most of them having access to a few computers with low speed internet in their school, thanks to foreign donations, but obviously not at home. Their parents, if by chance they still had one, were mostly working as "travailleurs informels" (informal workers), such as food sellers on the street or motorcycle taximen, with totally unregulated income, earning almost certainly less than 10 euros a day of benefits. Despite all of the misery, the kids were curious and totally capable. They learned from scratch how to use the mouse, the keyboard, create, move and delete files, comprehend file extensions, use a search engine and Wikipedia, use open-source text editors, make presentations and even do their math homework in a spreadsheet for the fastest learning students. Some older students also learned some HTML and some Python. I also personally got to teach the school's computer guy how to create and host for free a static web page for the school.
 
<div class="picture">
    <img src="/pictures/projects/tingo/photo%20(3).webp">
    <div class="caption">A street in a south-eastern Togolese village</div>
</div>

One thing that we found out is that the Togolese are largely more prominent phone owners than personal computer owners, and more used to oral social interactions than written ones, considering the non-written property of their native languages. Thereby their high consumption of video and audio content. Sadly for them, the mobile internet prices being not less expensive there than in France, they monitor their consumption thoroughly.
 
Which is why, for the rest of the internship we attempted to create an audio-only Youtube alternative aimed only towards the Togolese mobile users, for a local solar energy entrepreneur. Although we were only three people and often suffering from illness and electricity shortages, we still managed to conceive, architecture, and do the UI/UX design for the full planned app. And also implement a Flutter mobile app front-end and C# ASP.Net back-end for registration, authentication, Togolese phone number verification, content upload and even a work-in-progress moderation dashboard.

<div class="picture">
    <img src="/pictures/projects/tingo/classes.webp">
    <div class="caption">Excerpt of the class diagram for the back-end. (Don't worry it's not secret)</div>
</div>

We were being tutored by a volunteer programmer working for Togo's main mobile network company: Togo Com. The entrepreneur for whom we volunteered, who acted more like our client than our boss, was a very interesting guide and interlocutor, as he was the only Togolese we knew lucky enough to have studied in Europe, worked in the US. Hence, he knew very well the huge gap between our way of life and his. He gave us insights on how the economy works in this part of the world, how businesses there attempt to survive and strive. Amongst many other eye-opening discussion topics and city trips. Giving me a lot of thought food for a long time to come.

<div class="picture">
    <img src="/pictures/portraits/portrait0.webp">
    <div class="caption">Visiting Lome's only skyscrapper and luxury hotel with the entrepreneur. What looks like a typical lounge to me is very out of place in comparison with the rest.</div>
</div>

`
export default {
    title,
    cover,
    article,
    date,
    keywords
}
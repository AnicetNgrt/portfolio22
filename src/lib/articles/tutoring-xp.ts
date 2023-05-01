const date = "25/12/2022"
const title = "My experience as a Computer Science & programming private tutor"
const cover = "/pictures/tutoring/tutoring%20(1).png"
const keywords = ["tutoring", "computer science", "student", "teaching", "programming"]
const article = `
Since September 2021 I've been giving weekly private tutoring lessons, mostly programming and Computer Science related courses, to six students aged 12 to 21.

Most of my courses are remote, reaching French students willing to learn programming at a young age or overcome their struggle with Computer Science thaught in highschool. I have students coming from the whole country and even abroad. I have displayed here some of my live lesson notes that I draw on my drawing tablet and display by screen sharing them to my students. They are kind of a mess, and obviously lack all the live commentary I did alongside them, but they have an interesting and hidden beauty for me.

<div class="caroussel">
    <div class="picture">
        <img src="/pictures/tutoring/tutoring%20(1).webp">
        <div class="caption">Basic Python course notes with a 16 years old highschool student</div>
    </div>
    <div class="picture">
        <img src="/pictures/tutoring/tutoring%20(5).webp">
        <div class="caption">Statistical text generation project course notes with my surprisingly talented and curious 12 years old student</div>
    </div>
    <div class="picture">
        <img src="/pictures/tutoring/tutoring%20(4).webp">
        <div class="caption">This time optimizing our algorithm with the 12 years old student. Teaching him the math needed on the fly (that he obviously didn't know yet)</div>
    </div>
</div>

Tutoring is such a great job. In Computer Science it pays well since the demand for young, confident and pedagogical tutors is way higher than the supply. Most engineering students I know are not feeling confident enough and would rather give tutoring on more classic highschool topics that they think they know better, such as Maths or Physics. While actually the parents are willing to pay the price and their children are asking for help on mostly basic CS topics that my fellow university students know well. 

<div class="picture">
    <img src="/pictures/tutoring/tutoring%20(7).webp">
    <div class="caption">Recursion course (and Knapsack solving) notes with a 17 years old highschool student</div>
</div>
<div class="picture">
    <img src="/pictures/tutoring/tutoring%20(2).webp">
    <div class="caption">Data modeling course notes with the same student</div>
</div>

Don't get me wrong, teaching CS is far from easy, and requires greater confidence on advanced topics than what you'd think in order to actually be able to teach the basic stuff. But it is also an incredible way to get a better understanding yourself. Creating unique and measurable value in the process for your students. Seeing them improve and understand each topic that you put real effort and passion into explaining is such a joy for me.

<div class="caroussel">
    <div class="picture">
        <img src="/pictures/tutoring/tutoring%20(3).webp">
        <div class="caption">Dynamic programing coin problem notes with a 17 years old highschool student</div>
    </div>
    <div class="picture">
        <img src="/pictures/tutoring/tutoring%20(6).webp">
        <div class="caption">Statistical text generation again</div>
    </div>
</div>

`

export default {
    title,
    cover,
    article,
    date,
    keywords
}
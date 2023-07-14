const date = "14/07/2023"
const title = "Talking about jiro-nn at Scientific Computing in Rust 2023 by University College of London"
const cover = "/pictures/projects/jironn/scicomprust2023_cover.png"
const keywords = ["Deep Learning", "JIRO", "UCL", "Scientific Computing", "Regression", "Example", "Machine Learning", "Rust", "Neural Networks"]
const article = `
<div style="position: relative; width: 100%; height: 0; padding-top: 56.2500%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 0em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
    src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFm7O6Z5dE&#x2F;view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
  </iframe>
</div>

*tl;dr: Presenting is stressful, Rust community is great, I now have load of ideas, this framework could be onto something after some more work (AMD support, portability, ease of use), I need to do a PhD on it or something, contact me for opportunities.*

--- 

I got the great opportunity to present [\`jiro-nn\`](https://github.com/AnicetNgrt/jiro-nn), my Deep Learning framework for Rust, during a 7 minutes talk at the [Scientific Computing in Rust 2023](https://scientificcomputing.rs/) online workshop (you'd call it a conference but the organizers prefered the more relaxed term "workshop") organized by postdocs and professors from University College of London and also members of the currently blooming scientific computing in Rust community.

It was my first public talk, and the first time I shared a piece of work I so deeply (no pun intended) invested myself into, so it was a bit stressful. Also, considering I was also presenting my humble work as a master student live in front of around 140 post-docs, industry veterans, professors and other enthusiasts. But it went well and it sparked a lot of interesting discussions afterwards. People felt welcoming and curious, and even though my experience was smaller than theirs to say the least, they were interested in my work and my ideas.

So after discussing in great length with the audience during the following networking session, I am now sure of a few things:

- Supporting universal formats like ONNX will be a challenge but would instantly make it a way more useful tool to the community.
- If I can make it work on AMD GPUs through RISC-V support via Rust native compute shaders using \`wgpu\` I'll really get onto something. I'll have to improve a lot upon my rather graphics-focused understanding of shaders and GPU computing to get there, but it would trully unlock single-executable cross-platform Deep Learning on the GPU, and in Rust, which is barely partially a thing today, even in the Python world.
- Rust has no good notebooks support so it's the right place to be innovative by first identifying what working with notebooks really brings to the table and then inventing something different in term of Developer Experience and UX, trully tailored for Rust. That would give us the best of both worlds, and I feel that I'm at a rare spot were I have both Deep Learning, Rust and UX experience and I need to harness that.
- The API design choices I made are quite unique and ergonomic and thankfully appreciated for that.
- I don't have much time to make it right because I'll soon finish my engineering studies, so I really must invest the next year on this project until I'm sure I can work on it during possibly a PhD or a R&D job (whichever will be the most interesting or available to me at that time. If you have opportunities, please contact me!)
- I need to allow and attract potential contributors, because there are people interested in the project and willing to help. 
- An unchanged Rust cargo project may compile and run instantly if already compiled once, but under Zoom screen sharing expect it to compile for very long anyway.

A youtube upload of my talk will come soon.
`
export default {
    title,
    cover,
    article,
    date,
    keywords
}
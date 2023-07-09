const date = "9/07/2023"
const title = "I'm building a low-friction, high-detail, deep learning framework for Rust"
const cover = "/pictures/projects/jironn/introducing_jiro_cover.png"
const keywords = ["Deep Learning", "Machine Learning", "Rust", "Neural Networks"]
const article = `
For the past few months, I have been building a Deep Learning and data preprocessing framework in Rust. The initial goal was only to learn how these tools and algorithms work. But as it kept growing, it progressively became the perfect opportunity to put something out in the world that would be useful to the community.

<div class="picture">
    <img src="/pictures/projects/jironn/jiro_logo_bg.webp">
</div>

It is currently a work in progress framework with a focus on crafting APIs which make it Python-level easy to build small to medium-sized Deep Learning workflows in Rust. While still allowing plenty customization via hopefully simple enough and well-documented APIs, and of course leveraging compile-time features whenever possible. Because, sure, everyone loves Rust and compile-time guarantees, and everyone hates ambiguity and run-time shapes mismatch. But I simply can't keep my sanity with stuff like \`SizedMatrix<Rank6<A, B, Dyn, Dyn, Dyn, Dyn>, f64, Backend=Cuda>\` that requires \`impl<'a, const A:usize, const B:usize, T: Scalar, M: MatrixCore<A, B, T>> DotProductTrait<'a, A, B, T, M>\`.

With [\`jiro-nn\`](https://github.com/AnicetNgrt/jiro-nn) just rely on auto-complete and keep your sanity while following this MNIST workflow example:

\`\`\`rust
use jiro_nn::{
    dataset::*, preprocessing::*, model::*, 
    loss::*, trainers::kfolds::*};

pub fn main() {
    let dataset_path = "mnist.parquet";

    // preprocessing without messing with polars
    let mut dataset_config = Dataset::from_file(dataset_path);
    let dataset_config = dataset_config
        .tag_feature("id", FeatureTags::IsId)
        .tag_feature("label", FeatureTags::Predicted)
        .tag_feature("label", FeatureTags::OneHotEncode)
        .tag_all(FeatureTags::Normalized.except(&["label", "id"]));

    let mut pipeline = Pipeline::basic_single_pass();
    let (dataset_config, data) = pipeline
        .load_data(dataset_path, Some(dataset_config))
        .run();

    // model building without looking everywhere 
    // for the right structs
    let model = ModelBuilder::new(dataset_config)
        .neural_network()
            .conv_network(1)
                .full_dense(32, 5)
                    .relu()
                    .adam()
                    .dropout(0.4)
                .end()
                .avg_pooling(2)
                .full_dense(64, 5)
                    .relu()
                    .adam()
                    .dropout(0.5)
                .end()
                .avg_pooling(2)
            .end()
            .full_dense(128)
                .relu()
                .adam()
            .end()
            .full_dense(10)
                .softmax()
                .adam()
            .end()
        .end()
        .epochs(20)
        .batch_size(128)
        .loss(Losses::BCE)
        .build();

    // training without installing a dedicated k-folds crate 
    // nor messing with hairy tensors
    let mut kfolds = KFolds::new(10);
    let (predictions_by_id, model_eval) = kfolds.run(&model, &data);

    // saving the model
    model_eval.to_json_file("mnist_eval.json");
    kfolds.take_best_model().to_json("mnist_weights.json");

    // saving the predictions alongside the original data
    let predictions_by_id = pipeline.revert(&predictions_by_id);
    pipeline.revert(&data)
        .inner_join(&predictions_by_id, "id", "id", Some("pred"))
        .to_parquet_file("mnist_values_and_preds.parquet");
}
\`\`\`

Here you go, preprocessing, model building, training, with extensive customization in just 60 lines. Yeah, I mean, it's Rust, what did you expect? Sadly I can't do magic but I've probably saved you hundreds of lines, even if you were using other Rust Deep Learning frameworks, which are good at what they do, but don't go the extra mile to make preprocessing easy too.

It is probably not the fastest nor the most compliant framework ever, but it is enough to toy with. My goal with it for now is to improve it and learn a ton in the process while giving good ideas and inspiration to the Rust community.

Check out [\`jiro-nn\`](https://github.com/AnicetNgrt/jiro-nn) and tell me what you think!

For more details, a long article sprinkled with insights and friendly hot takes about this weird world of Rust awaits you below:

### Table of contents:

- [From web dev and game dev to making a Deep Learning framework: how it went wrong](#from-web-dev-and-game-dev-to-making-a-deep-learning-framework-how-it-went-wrong)
- [Why another Deep Learning framework?](#why-another-deep-learning-framework)
- [The landscape of Deep Learning tools in Rust : Why I'm focusing on the Framework Experience](#the-landscape-of-deep-learning-tools-in-rust--why-im-focusing-on-the-framework-experience)
- [The future of JIRO](#the-future-of-jiro)

## From web dev and game dev to making a Deep Learning framework: how it went wrong

The last time I had a personal project with such public traction was quite some time ago (we are talking about couple dozen Github stars and couple thousands website views kind of traction, so I'll stay humble with that lol). 

Back in 2021, I was making tiny indie games in Godot Engine, and releasing web fullstack apps, sometimes toying with obscure languages and paradigms in the process (e.g Elixir). I always published the cool stuff on Reddit, and got used to getting useful feedback. This kind of interaction with the community was a significant drive for me, and it helped me work on marketing, writing, designing. But for the last two years, I had no motivation to build really cool stuff again. I was stuck contemplating what I already knew how to build, notably in web dev, and not feeling motivated either to create small games as they wouldn't help me grow professionally. Furthermore, I had just started studying in my dream engineering school, and I felt increasingly overwhelmed with new experiences. Also, I had to satisfy my urge to socialize after the Covid-19 pandemic.

Thankfully, since that time, I've come back to reasonable behaviors, such as coding until early in the morning and talking weird maths and programming stuff with anyone daring to approach me, grinding hard until I could brag with my Reddit karma again.

No, of course not. In all seriousness, I just regularly spent the required time in order to learn Rust, to get harder into low-level programming, math (mostly motivated by my impostor syndrome relative to my engineering school), Data Science because that's new and shiny, and API design because I never stopped being a perfectionist. By building upon my fundamentals in software from 6 years of programming, and giving hundreds of hours of private programming lessons during the past two years, I finally got to a point where I felt I had stepped-up significantly. 

I wasn't feeling like contemplating my past anymore. So I just went and dove irremediably into a more niche and hard-core kind of programming than Back-end, Front-end and light game dev: research engineer kind of programming. You know, with the notebooks and stuff. I was no longer scared by the amount of math and science needed to upgrade my general programming and software engineering skills into research engineering ones. 

And although I am still a huge beginner at that, with absolutely zero credibility to be very clear, I believe I can carve my unique path in there and build stuff. To the point where I don't see myself working on client-facing web apps or games professionally anymore, unless I don't have the choice.

So here it is, I took the opportunity of a traditional Machine Learning course at my university to build a Deep Learning framework in Rust, as a side-quest of a regression problem I had to solve. No, it is absolutely not the longest and most reckless side-quest I ever embarked on, I don't see what you are talking about. Who never spent his whole vacations on the French riviera by a perfect 21°C coding a Deep Learning framework in Rust?

Three months in, a big project report and a few thousand lines of code later, I now feel good and ready to share this *work-in-progress* *alpha* *early-access* framework with *no guarantee whatsoever*. I hope you'll enjoy it! (You know how Rust crates never reach \`1.0\`... yeah, see you in twenty years then)

## Why another Deep Learning framework?

Well, it's because Rust is *blazingly fast* right? Right...?

In all honesty, I had no good reasons before starting. Except knowing it would be hard and reckless. But let's try to argue that anyway because there would be actual reasons to do it.

First, to give you a primer on the world of Deep Learning frameworks, let's be shamefully reductive for a second and say that there are two kind of users in the Machine Learning libraries world:

\`<sarcasm>\`

The first kind, we'll call them the Data Scientists, they are the ones who use the frameworks at work, I mean, for their real work. They can be very good at coding, but most of the time they just don't care. They want their code to work and do what they want, often it's some business requirement like plotting xyz or predicting foo and bar with accuracy > some %. Which is possibly the best mindset to have in this crazy world. So logically their language of choice is Python because R is old, Matlab is proprietary garbageware, and most importantly because with Python's ~~cutting-edge~~ package management system they are one \`pip install\` away from gigantic industry-standard tools such as PyTorch or TensorFlow with peak performance on the GPU (modulo the nightmare which is setting up CUDA on WSL). And as a small bonus they can also have 3D interactive plots on the web after only 2 lines of code, while C++ developers are still specifying their Vulkan pipeline after three months of coding in order to show a single triangle on the screen. Which is definitely a guilty pleasure of mine as well.

Data Scientists also love committing their notebooks (that annoys everyone), they sometime hate static types (while everyone else only pretend to love them), they hate Makefiles (even Bjarne Stroustrup may agree on that one), and they tend to make the software team pull its hair out because of course they may have no interest in CI/CD, unit testing, and books on Java design patterns. Which quite frankly would basically be trying to specialize in something else than management, design, math, C89 compilers, or youtube as a programmer with 10+ years of experience. Which of course is boring.

The second kind, we'll call them the P.H.D.s in Maths and Machine Learning. They may have started working on Convolutional Neural Networks way before I was born, like back in 1994 for example (Sorry for *le coup de vieux*). First, they didn't have PyTorch back then. And second, they are probably the ones who created PyTorch. After dipping my toe in the effort needed, I must say that it must have been a crazy amount of work from a very large number of experienced people to get there. 

Except the ones who actually created PyTorch and Tensorflow (these projects are so massive they can't suffer from one person's madness), the others may sometime create small Deep Learning frameworks for their specific needs. Maybe they have an idea for some kind of new layer, or they want to see what happens if you plug the output of the 3rd layer's 5726th neuron to the input of the 1st layer's 42nd neuron, which obviously is both the pinnacle of Science and a non-trivial thing to do in your usual frameworks (unless you have built it yourself). So their Category Theory starved brains start embarking them on a crazy journey of compile-time size checked Recursive Neural Networks with shiny Automatic Differentiation, whether in C++ via unspeakable template metaprogramming, or in Rust by losing their sanity with highly unstable const generics expressions, often resulting in repeated high subtyping covariance dopamine shots until they realize they have no time in their busy life to finish such a project. There is also Zig which would be perfect for the job, but sadly no one uses Zig except some Jonathan Blow like genius probably coding 100 hours a week since he's 8 years old in order to make yet another game engine for a triple-A Sokoban clone. Which is yet another kind of obsessive awesomeness.

\`</sarcasm>\`

The ideal thing to do in my opinion would be to take some of the expertise, energy and pure awesome madness of the second kind in order to build better tools for the more rational and down to Earth first kind. And it looks like Rust is a good candidate for that. In Rust, you have the power to create both strict, compile-time checked, and still high-level abstractions. Which will never be the case of Python. And you benefit from easy-to-use and unified tooling which will never be the case of C++. So basically you can have everything well made like in C++ and easy to use like in Python. Incredible right?

But isn't Rust super hard to learn? Well... it depends, but no actually if you put in the work. Sadly of course Data Scientists can't be forced to learn such a niche language. So the goal wouldn't be for most of them to code in Rust. Like in C++, in Rust you can create Python bindings using a tool called PYO3. So the goal would be mostly to replace existing C++ frameworks with more maintainable and still as powerful Rust ones. And as a bonus we could also have a good Machine Learning ecosystem for Rust users.

Some may say that now that Mojo is announced, all of this is just dead. I don't believe it. We obviously still don't know everything about Mojo, and it is yet to be open-sourced. But it looks like it will not be focused on compile-time features, embedded systems, web assembly, and beautiful abstractions as much as Rust does. So we may keep some moat if Mojo ends up taking over the world like most niche languages do. We'll have to see.

## The landscape of Deep Learning tools in Rust : Why I'm focusing on the Framework Experience

While I am not an expert in Rust Deep Learning tools, I've still done my research and found a couple interesting libraries, each taking a different approach than me. Which is great because it means I still have plenty ideas to steal and that I succeeded at being an original eccentric nerd for once.

Most libraries I've seen have between 100 and 1000 Github stars, are a few years old at most, and tend to focus on a few key points, which are also some of Rust's selling points:

- Speed on the CPU (on the GPU we mostly have wrappers around C++ libraries or CUDA, so no competition here, and wgpu is too immature for now)
- Compile-time checks, notably the shapes of the tensors and the layers' sizes
- Compliance with the Python frameworks (which is great, I should be doing it)
- What they call "simple APIs" but to me that's not great
- Automatic Differentiation

While my own framework focuses mainly on the "Framework experience":

- Really trying to minimize the amount of code needed to do something basic
- Possibility to go deeper when needed
- Relying on autocomplete and minimizing codebase-digging to get things done
- Introspection, logging, performance monitoring
- Extensive tools from opening the dataset and preprocessing to evaluating the model
- Possibility to configure and save everything via/to files

Most of these points obviously required wrapping libraries and custom code into some amount of abstractions. Which was more boring than doing some fancy generics, but actually that's what you want a framework to do I believe.

To me all of these points are basically mandatory for a Deep Learning framework to exist in Rust. Because Rust is such a melting pot of hairy libraries that try to go deep and be super precise on everything (error handling, safety, compile-time checks), it is basically always so verbose and difficult to take all the necessary libraries together and build something. Yes, you do always want fine-grained control over everything at some point. But you can make APIs that permit both, using sensible and documented defaults. That's what I'm trying to do, and actually am succeeding at doing with \`jiro-nn\`. It takes a lot of time, boring code, and back and forth API changes to get there, but it's worth it. And for once it justifies not reaching \`1.0\` any time soon.

This hairiness problem in the Rust ecosystem is why programmers struggle so much with Backend dev in Rust. No big project can be built by normal people, despite Rust being a pretty accessible language at it's core. Indeed, libraries focus on cool low-level features and over-engineered generics, so people give up and can't benefit from Rust's simpler and yet super interesting features in order to write better software. Which would benefit even for simple CRUD or Data engineering use-cases. I like to believe that in an ideal world Rust could replace both C++ and Java alike, for now it only replaces metaprogramming object-oriented C89 people. 

Hairy APIs, believe it or not, may not be what most of the developers whom vote Rust as their "Most loved language" on the Stack Overflow survey want out of the language. Maybe they just like the semantics, maybe they want the unique trait system, maybe they want the nice WASM support, maybe they want the \`no_std\` stuff, maybe they want pattern matching without having to grasp over-engineered functional languages. But they certainly don't want to spend 3 days trying to figure out how to use a library which is maintained by one guy and therefore can't have a very good documentation. At least I don't want to (and everyone thinks like me that's well known). So we have to get better at designing APIs. Once more people can grasp and collaborate on Rust code, performance will come, compliance will come. At least that's what my bet is. And I hope it is right because I'm too dumb to write a *blazingly fast* piece of code. Whatever it actually means.

Also there are many things you can get rid of in your API and handle at compile-time. Why would the tensors be generic over the backend (may it be choosing between CPU or GPU, or between two linear algebra libraries) or scalar type (\`f32\` or \`f64\`) for example? Aren't you going to use only one backend and scalar type in your program anyway? I prefer to set all of that at compile time using cargo features. People who need that level of control directly in the generics may very well be better off coding their own framework at that point.

Some people may agree with all of that, except concerning compile-time size checks on tensors and layers. Why would you want to get rid of that like I did? Aren't other libraries able to do it perfectly well? Actually, to be honest, I've tried. I've tried making that feature work with a minimal cost for the API's ease of use. I can't do it with the current Rust we have. 

Certainly, adding size checks to tensors and to the dot product is not difficult. 

\`\`\`rust
struct Tensor<const ROWS: usize, const COLS: usize> {
    // ...
}

// Allowing dot product for tensors of compatible sizes
// Already a bit unreadable, but at that point it's still worth it
pub fn dot<
    const ROWS1: usize, 
    const COLS2: usize, 
    const S: usize
>(t1: &Tensor<ROWS1, S>, t2: &Tensor<S, COLS2>) -> 
    Tensor<ROWS1, COLS2> {
    // ...
}
\`\`\` 

For the end user, this won't necessarily mean more code to write, because most const generics are inferred automatically. But once you get to building abstractions over tensors parametrized with const sizes, then, you have to propagate these const generics everywhere, it becomes a mess in your code and it makes your documentation and type hints even more esoteric for the end user. And I'm not even talking about having layers with const generics for specifying input and output sizes. For Dense layers it works well, but for convolution layers where the output size is some formula depending on the input size, the strides and the kernel's size, you can't really do that yet in Rust. Const generics can't be added, multiplied and so on. You would need nightly Rust and experimental features. But then, you ask me, how do the others do? Well they use a trick. You see, Rust's trait and type system is so permissive that you can emulate arithmetics within it. So instead of coding something like:

\`\`\`rust
impl<const IN: usize, const KERN: usize> 
    ConvLayer<Tensor<IN>, Tensor<IN - KERN + 1>> {
    // ...
}
\`\`\`

You could create a crate that has generic traits with a lot of conditions, macros and other very complex constructs to emulate that behavior: 

\`\`\`rust
impl<const IN: usize, const KERN: usize, OUT: SizeTrait> 
    ConvLayer<Tensor<Size<IN>>, Tensor<OUT>
    where
        OUT: Add<Sub<IN,KERN>,1>>
    {
    // ...
}
\`\`\`

Which obviously turns huge parts of your API into a mess in my opinion. And often it isn't even as permissive as you would hope for that sheer amount of added complexity. There are more clever tricks than that of course, but to me it always feels cluttered in the end. Zig would be perfect for that as I said, but in Rust we'll just hope the Data Scientists know what size the layers in their networks should be. Which actually is a crucial part of their job, and certainly not the one they need the most help with. Of course for the guy like me implementing the framework, it would be super cool to have such compile-time checks. I truly have suffered from not having them while debugging some of the internals, but figuring out how to avoid bugs without these compile-time guarantees is my part of the job, and I'll do it harder anyway if it is better in the end for my users.

Concerning Automatic Differentiation (AD), the fact that my framework lacks it comes initially from me not knowing that AD existed at all. But after speaking with a maintainer of the Enzyme project, which is an AD plugin for LLVM (so it optimizes LLVM code and does derivatives code generation from it), it looks like even faster AD is currently being added on the compiler side of Rust via Enzyme. And therefore, any AD implementation directly on the language-side like other Neural Networks libraries do, will soon become sub-optimal. So I'll stick to good old hand-coded derivatives from now.

## The future of JIRO

Currently I'm working a lot on documentation, API changes and adding more backends for the convolution part, as it still requires ArrayFire which is a very annoying C++ library to install (but the only option I had initially to go fast).

Future goals of the project are in no particular order:

- Adding more layers (Recurrent, LSTM, Dimensionality Reduction, Transformers, etc.)
- Adding more model evaluation metrics for classification (past focus was on regression)
- Adding more documentation and examples
- Adding a somewhat Rusty GPU backend (at least some kind of wrapper around a CUDA wrapper)
- Wrapping some plotting libraries as we are in deep need of easy to use plotting libraries in Rust
- Benchmarks against Python frameworks for correctness and performance
- WASM support
- Enzyme support once it's stable

I will not accept any PRs from stranger for now, but I'm absolutely open to advice, knowledge and collaboration requests (presenting yourself and what you want to contribute to).

I will also soon speak about JIRO at the [Scientific Computing in Rust 2023 online workshop](https://scientificcomputing.rs/) on the 13th of July. If you've read all of that thought you may not need to attend just for my silly jokes, as I'll only have 7 minutes to speak about it and therefore I shall go straight to the point.

If you want to follow the project, you can star the repo on [Github](https://github.com/AnicetNgrt/jiro-nn) or follow me on Twitter [\`@AniC_dev\`](https://twitter.com/AniC_dev).

Thanks for reading!

`
export default {
    title,
    cover,
    article,
    date,
    keywords
}
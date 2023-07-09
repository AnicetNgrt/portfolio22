const date = "9/07/2023"
const title = "JIRO: a low-friction, high-detail, deep learning framework for Rust"
const cover = "/pictures/projects/jironn/introducing_jiro_cover.png"
const keywords = ["Deep Learning", "Machine Learning", "Rust", "Neural Networks"]
const article = `
For the past few months, I have been building a Deep Learning and data preprocessing framework in Rust. The initial goal was only to learn how these tools and algorithms work. But it also became the perfect opportunity to put something out in the world that would be useful to others.

It is currently a work in progress framework with a focus on crafting APIs which make it Python-level easy to build small to medium-sized Deep Learning workflows in Rust. While still allowing plenty customization via hopefully simple enough and well-documented APIs, and of course leveraging compile-time features whenever possible. Because, sure, everyone loves Rust and compile-time guarantees, and everyone hates ambiguity and run-time shapes mismatch. But I simply can't keep my sanity with stuff like \`SizedMatrix<Rank6<A, B, Dyn, Dyn, Dyn, Dyn>, f64, Backend=Cuda>\` that requires \`impl<'a, const A:usize, const B:usize, T: Scalar, M: MatrixCore<A, B, T>> DotProductTrait<'a, A, B, T, M>\`.

With [\`jiro-nn\`](https://github.com/AnicetNgrt/jiro-nn) just rely on auto-complete and keep your sanity while following this MNIST workflow example:

\`\`\`rust
let dataset_path = "mnist.parquet";

// preprocessing without messing with polars
let mut dataset_config = Dataset::from_file(dataset_path);
dataset_config
    .tag_feature("id", FeatureTags::IsId)
    .tag_feature("label", FeatureTags::Predicted)
    .tag_feature("label", FeatureTags::OneHotEncode)
    .tag_all(Normalized.except(&["label", "id"]));

let mut pipeline = Pipeline::basic_single_pass();
let (dataset_config, data) = pipeline
    .load_data(dataset_path, Some(dataset_config))
    .run();

// model building without looking everywhere for the right structs
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
training.take_model().to_json_file("mnist_weights.json");

// saving the predictions alongside the original data
let predictions_by_id = pipeline.revert(&predictions_by_id);
pipeline.revert(&data)
    .inner_join(&predictions_by_id, "id", "id", Some("pred"))
    .to_file("mnist_values_and_preds.parquet");
\`\`\`

Here you go, preprocessing, model building, training, with extensive customization in just a few lines. 

It is probably not the fastest nor the most compliant framework ever, but it is enough to toy with. My goal with it for now is to improve it and learn a ton in the process while giving good ideas and inspiration to the Rust community.

Check out [\`jiro-nn\`](https://github.com/AnicetNgrt/jiro-nn) and tell me what you think!

For more details, a big article awaits you below:

### Table of contents:

- [Taking a new path in my professional growth](#taking-a-new-path-in-my-professional-growth)
- [Why another Deep Learning framework?](#why-another-deep-learning-framework)
- [The landscape of Deep Learning tools in Rust](#the-landscape-of-deep-learning-tools-in-rust)
- [The features and goals of JIRO](#the-features-and-goals-of-jiro)
- [Wrapping up](#wrapping-up)

## Taking a new path in my professional growth

The last time I had a personal project with such public traction was quite some time ago (we are talking about couple dozen Github stars and couple thousand website views kind of traction, so I'll stay humble with that lol). 

Back in 2021, I was making tiny indie games in Godot Engine, and releasing web fullstack apps, sometimes toying with obscure languages and paradigms in the process (e.g Elixir). I always published the cool stuff on Reddit, and got used to getting useful feedback. This kind of interaction with the community was a significant drive for me, and it helped me work on marketing, writing, designing. But for the last two years I had no motivation to build really cool stuff again. I was stuck contemplating what I already knew how to do in web dev and not feeling motivated to create small games as they wouldn't help me grow professionally. Also I had just started studying in one of my country's top engineering schools, and I felt increasingly overwhelmed with new experiences and my urge to socialize after the Covid-19 pandemic.

Thankfully, since that time, I've come back to reasonable behaviors such as coding until early in the morning and talking weird maths and programming stuff with anyone daring to approach me, grinding hard until I could brag with my reddit karma again.

No, of course not. In all seriousness, I just spent the required time regularly in order to learn Rust, to get harder into low-level programming, math (mostly thanks to the engineering school and my impostor syndrome), data science, and API design. By building upon my fundamentals in software from 6 years of programming, and giving hundreds of hours of private programming lessons during the past two years, I started recently feeling like I had stepped-up significantly. 

I wasn't feeling like contemplating my past anymore. So I just went and dove irremediably into a more niche and hard-core kind of programming than Back-end, Front-end and light game dev: research engineer kind of programming. I was no longer scared by the not so large amount of math and science needed to upgrade my general programming and software engineering skills into research engineering ones. 

And although I am still a huge beginner at that, with absolutely zero credibility to be very clear, I believe I can carve my unique path in there and build stuff. To the point where I don't see myself working on client-facing web apps or games professionally anymore, unless I don't have the choice.

So here it is, I took the opportunity of a traditional Machine Learning course at my university to build a Deep Learning framework in Rust, as a side-quest of a regression problem I had to solve. No, it is absolutely not the longest and most reckless side-quest I ever embarked on, I don't see what you are talking about. Who never spent his whole vacations on the French riviera by a perfect 21°C coding a Deep Learning framework in Rust?

Three months, a big project report and a few thousand lines of code later, I now feel good and ready to share this *work-in-progress* *alpha* *early-access* framework with *no guarantee whatsoever*. I hope you'll enjoy it! (You know how Rust crates never reach \`1.0\`... yeah, see you in twenty years.)

## Why another Deep Learning framework?

Well, it's because Rust is *blazingly fast* right? Right...?

In all honesty I had no good reasons before starting except knowing it would be hard and reckless. But let's try to argue that anyway.

To give you a primer on the world of Deep Learning frameworks, let's be shamefully reductive for a second and say that there are two kinds of persons in the Machine Learning world:

\`<sarcasm>\`

The first kind, we'll call them the Data Scientists, they are the ones who use the frameworks. They can be very good at coding, but most of the time they just don't care. They want their code to work and do what they want. Which is possibly the best mindset to have in this crazy world. So logically their language of choice is Python because R is old, Matlab is garbage, and of course they are one \`pip install\` away from gigantic industry-standard tools such as PyTorch, TensorFlow with peak performance on the GPU (modulo setting up CUDA on WSL). And as a small bonus they can have 3D interactive plots after only 2 lines of code while C++ developers are still specifying the thousandth micro-step of their Vulkan pipeline in order to show a single triangle on the screen. 

Data Scientists also love committing their notebooks, they sometime hate static types, they always hate Makefiles (I couldn't agree more), and they tend to make the software team pull its hair out because of course they may have no interest for CI/CD, unit testing, and books on Java design patterns. Which quite frankly would basically be trying to specialize in something else than management, design, math, C89 compilers, or youtube as a programmer with 10+ years of experience. Which of course is boring.

The second kind, well call them the P.H.D.s in Maths and Machine Learning. They may have started working on Convolutional Neural Networks before it was hype, like back in 1994 for example, and first, they didn't have PyTorch back then, and second, they are probably the ones who created PyTorch. After dipping my toe in the effort needed, I must say they do impress me. 

Except the ones who actually created PyTorch and Tensorflow (these projects are so massive they can't suffer from one person's madness), the others may sometime create small Deep Learning frameworks for their specific needs. Maybe they have an idea for some kind of new layer, or they want to see what happens if you plug the output of the 3rd layer's 5726th neuron to the input of the 1st layer's 42nd neuron, which obviously is non-trivial in frameworks. So their Category Theory starved brain starts embarking them on a crazy journey of compile-time size checked Recursive Neural Networks with shiny Automatic Differentiation, whether in C++ via unspeakable template metaprogramming, or in Rust if they want to keep a semblance of sanity by only using highly unstable const generics expressions. There is also Zig which would be perfect for the job, but sadly no one uses Zig except some Jonathan Blow like genius probably coding 100 hours a week in order to make yet another game engine in 15 years.

\`</sarcasm>\`

The ideal thing to do in my opinion would be to take some of the expertise, energy and pure madness of the second kind in order to build better tools for the more rational and down to Earth first kind. And it looks like Rust is a good candidate for that. In Rust, you have the power to create both strict, compile-time checked, and still high-level abstractions. Which will never be the case of Python. And you benefit from easy-to-use and unified tooling which will never be the case of C++ (nor Python for the most regarding peoples). So basically you can have everything well made like in C++ and easy to use like in Python. Incredible right?

But isn't Rust super hard to learn? Well... it depends, but no actually if you put in the work. Sadly of course Data Scientists can't be forced to learn such a niche language. So the goal wouldn't be for most of them to code in Rust. Like in C++, in Rust you can create Python bindings using a tool called PYO3. So the goal would be mostly to replace existing C++ frameworks with more maintainable and still as powerful Rust ones. And as a bonus we could also have a good Machine Learning ecosystem for Rust users.

Some may say that now that Mojo is announced, all of this is just dead. I don't believe it. We obviously still don't know everything about Mojo, and it is yet to be open-sourced. But it looks like it will not focus on compile-time features, embedded systems, web assembly, and beautiful abstractions as much as Rust does. We'll have to see.

## The landscape of Deep Learning tools in Rust

But you see the big issue that the first kind have is exactly that 
`
export default {
    title,
    cover,
    article,
    date,
    keywords
}
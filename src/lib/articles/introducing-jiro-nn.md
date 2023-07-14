Hi! I'm Anicet, a Master CS student at INSA Lyon in France, and for the past few months, I have been building a Deep Learning and data preprocessing framework in Rust. The initial goal was only to learn how these tools and algorithms work. But as it kept growing, it progressively became the perfect opportunity to put something out in the world that would be useful to the community.

It is currently a work in progress framework with a focus on small to medium-sized workflows and on the ergonomics above all. Because, sure, everyone loves Rust and compile-time guarantees, and everyone hates ambiguity and run-time shapes mismatch. But I simply can't keep my sanity with stuff like `SizedMatrix<Rank6<A, B, Dyn, Dyn, Dyn, Dyn>, f64, Backend=Cuda>` that requires `impl<'a, const A:usize, const B:usize, T: Scalar, M: MatrixCore<A, B, T>> DotProductTrait<'a, A, B, T, M>`.

With [`jiro-nn`](https://github.com/AnicetNgrt/jiro-nn) just rely on auto-complete and keep your sanity while following this King County houses sales regression workflow example using a Deep Neural Network:

## Solving King County houses sales regression with JIRO

The goal here is to predict the price of a house given a bunch of its features. For this task we could preprocess and clean the data, then train a Neural Network to make the right guesses. And for the whole process, JIRO comes in handy.

- Init the project, import the necessary modules and download the [dataset](https://www.kaggle.com/datasets/harlfoxem/housesalesprediction).

```bash
cargo new --bin king_county
cd king_county
cargo add jiro-nn
```

- Put the dataset in the project's root directory
- Tweak the compile-time features a little bit to make sure we have everything we need:

```toml
[dependencies]
jiro-nn = { version = "0.8.1", features = ["data", "ndarray"] }
```

- From now on we'll edit `src/main.rs`

```rust
use jiro_nn::dataset::Dataset;
use jiro_nn::model::ModelBuilder;
use jiro_nn::monitor::TM;
use jiro_nn::preprocessing::Pipeline;
use jiro_nn::preprocessing::attach_ids::AttachIds;
use jiro_nn::preprocessing::map::*;
use jiro_nn::trainers::kfolds::KFolds;
use jiro_nn::dataset::FeatureTags::*;
```

- Now let's "tag" our features. Basically it is telling our framework which column of our dataset needs which  kind of preprocessing, and any kind of metadata that the Network may need after the preprocessing phase. Our preprocessing pipeline would need to consist of the following steps:
   - Remove the features we don't need
   - Extract the timestamp and month from the date
   - Replace the 0 values of yr_renovated with the yr_built value on the same rows
   - Log10 some of the features
   - For each feature, add its squared value, so for instance if we have the feature "surface" we'll add the feature "surface^2" alongside it
   - Filter out the outliers using Tukey's fence method
   - Normalize everything so it's all in the same [0;1] range

```rust
let mut dataset_config = Dataset::from_file("kc_house_data.csv");
dataset_config
    // The code describes itself
    .remove_features(&["zipcode", "sqft_living15", "sqft_lot15"])
    .tag_feature("id", IsId)
    .tag_feature("date", DateFormat("%Y%m%dT%H%M%S"))
    // The AddExtracted* tags create new features out of 
    // existing ones.
    .tag_feature("date", AddExtractedMonth)
    .tag_feature("date", AddExtractedTimestamp)
    // Here, we don't care about the date, only the features 
    // we will create from it.
    // But we can't remove it unlike the zipcode, because 
    // we need it during the pipeline.
    .tag_feature("date", Not(&UsedInModel))
    // This part is a bit trickier: 
    // We replace the 0 values of yr_renovated with the yr_built 
    // value on the same rows.
    .tag_feature(
        "yr_renovated",
        Mapped(
            MapSelector::equal_scalar(0.0),
            MapOp::replace_with_feature("yr_built"),
        ),
    )
    // Indicate which features need to be predicted of course
    .tag_feature("price", Predicted)
    .tag_all(Log10.only(&["sqft_living", "sqft_above", "price"]))
    // incl_added_features tells the framework to also tag 
    // all the features created previously during the pipeline
    // (e.g. resulting from the AddExtracted* tags)
    .tag_all(AddSquared.except(&["price", "date"])
        .incl_added_features())
    .tag_all(FilterOutliers.except(&["date"]).incl_added_features())
    .tag_all(Normalized.except(&["date"]).incl_added_features());
```

- Now that we specified everything we can run our pipeline

```rust
// Since from now on computations may take a while, we start 
// monitoring the tasks.
// This will launch a nice TUI just for that
TM::start_monitoring();

// We take a generic pipeline, which will try to do most steps 
// if needed. 
// But you may need to customize it by appending/prepending 
// steps in some cases.
let mut pipeline = Pipeline::basic_single_pass();
let (dataset_config, data) = pipeline
    .load_data("dataset/kc_house_data.csv", Some(&dataset_config))
    .run();
```

- Now that our data is well and clean, let's build our Neural Network which consists of 4 hidden layers and one output layer. We use the builder pattern which is one way to make your Rust APIs both simple and flexible.

```rust
let hidden_neurons = 22;
let output_size = 1; // only the price is predicted

let mut nn = ModelBuilder::new(dataset_config)
    .neural_network();
        // We declare our layers and add customization calls like 
        // .relu() or .momentum().
        // These calls are optional.
        // Many exist to override all sorts of defaults.
        .full_dense(hidden_neurons)
            .relu()
            .momentum()
        .end()
        .full_dense(hidden_neurons)
            .relu()
            .momentum()
        .end()
        .full_dense(hidden_neurons)
            .relu()
            .momentum()
        .end()
        .full_dense(hidden_neurons)
            .relu()
            .momentum()
        .end()
        .full_dense(output_size)
            .linear()
            .momentum()
        .end()
    .end()
    .batch_size(128)
    .epochs(100)
    .build();

// The model and the dataset configurations could be saved 
// in a .json file for later use.
// The model really tries to embody everything (dataset + 
// network + training).
// The idea is to tie the model to its result, and changing 
// any of these things would change its results.
```

- Now let's train using K-Folds cross validation

```rust
let mut kfold = KFolds::new(4);

// Since we use k-folds, all the training data will get 
// predicted as validation over the course of the 4 folds.
// So we both get how the model performed and which predictions 
// it made on the last epoch for each fold.
let (preds_and_ids, model_eval) = kfold
    // Tell it to keep the best model at the end
    .compute_best_model()
    .run(&model, &data);

// Its the end of long computations, we can stop monitoring.
TM::stop_monitoring();
```

- And save everything necessary to disk

```rust
// The best model is the one from the fold with the 
// lowest loss on the last epoch.
let best_model_params = kfold.take_best_model();
// Learned parameters of the network can be saved/loaded 
// in/from a compressed format.
best_model_params.to_binary_compressed("best_model_params.gz");

// Predictions come tied to the ids.
// We need to revert the preprocessing and join the 
// predictions with the original data.
let preds_and_ids = pipeline.revert(&preds_and_ids);
let data = pipeline.revert(&data);
let data_and_preds = data.inner_join(
    &preds_and_ids, 
    "id", "id", 
    Some("pred")
);

data_and_preds.to_csv_file("data_and_preds.csv");
model_eval.to_json_file("model_eval.json");
```

Here you go, preprocessing, model building, training, with extensive customization in just 80 lines. Yeah, I mean, it's Rust, what did you expect? Sadly I can't do magic but I've probably saved you hundreds of lines, even if you were using other Rust Deep Learning frameworks, which are good at what they do, but don't go the extra mile to make preprocessing easy too.

It is probably not the fastest nor the most compliant framework ever, but it is enough to toy with. My goal with it for now is to improve it and learn a ton in the process while giving good ideas and inspiration to the Rust community.

Check out [`jiro-nn`](https://github.com/AnicetNgrt/jiro-nn) and tell me what you think!

For more details and a MNIST example, [a longer article](https://anicetnougaret.fr/blog/introducing-jiro-nn) sprinkled with insights and friendly hot takes about this weird world of Rust awaits you on my personal blog.

Thank you for reading!
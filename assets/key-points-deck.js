(() => {
const deck = document.getElementById('deck');
if (!deck) return;
const SLIDES = [
  { type: "cover", kicker: "ALML-500 \u00b7 AI LEARNING PORTFOLIO", title: "Key Points",
    subtitle: "Neural networks \u00b7 Learning with AI \u00b7 Leading change \u00b7 Showing the work",
    chips: ["ANN","CNN","RNN","GAN","Activation functions","Deepfakes","Professor Predict","Change leadership","Portfolio"],
    accent: "#2EC4B6" },
  { kicker: "Neural networks \u00b7 1 of 4", title: "Artificial Neural Networks \u2014 how they learn", accent: "#5B8DEF",
    bullets: ["Each neuron: weighted sum + bias, then an activation function.",
      "Learns by backpropagation \u2014 error flows back, gradient descent nudges every weight.",
      "The source deck reports 68.8% for a single neuron in a two-spirals example.",
      "Depth and width buy curved boundaries \u2014 hidden layers combine lines into shapes."],
    image: "key-points-ann.png", imageAlt: "Three-layer neural network: inputs, hidden layer, output, with backpropagation",
    footnote: "Source deck result: 2\u201332\u201332\u20131 MLP, 99.8% test accuracy. Experiment code and data are not included." },
  { kicker: "Neural networks \u00b7 2 of 4", title: "Convolutional Networks \u2014 built for images", accent: "#2EC4B6",
    bullets: ["Small filters slide across the image, each learning one local pattern.",
      "Shared weights: fewer parameters, and a feature is found wherever it appears.",
      "Pooling downsamples feature maps; max pooling keeps the largest value in each region.",
      "AlexNet won ImageNet in 2012; ResNet's skip connections (2015) made very deep nets trainable."],
    diagramNote: "Image → convolution → pooling → convolution → pooling → dense layer → prediction (cat or not cat). Convolution is equivariant to discrete shifts under suitable boundary and stride conditions; it does not guarantee an unchanged prediction.",
    image: "key-points-cnn.png", imageAlt: "CNN pipeline: image, convolution, pooling, convolution, pooling, dense layer, prediction",
    footnote: "Artifact 02: CNN for medical image analysis vs a traditional ML baseline." },
  { kicker: "Neural networks \u00b7 3 of 4", title: "Recurrent Networks \u2014 memory for sequences", accent: "#9B7EDE",
    bullets: ["A hidden state carries information from earlier steps into later ones.",
      "Built for text, speech, and time series \u2014 output depends on the whole sequence.",
      "Long sequences can cause vanishing gradients; LSTM / GRU gates help retain information.",
      "Transformers (2017) replaced RNNs for most language work \u2014 but the memory idea stays."],
    image: "key-points-rnn.png", imageAlt: "Unrolled recurrent network: three steps with the hidden state passing forward" },
  { kicker: "Neural networks \u00b7 4 of 4", title: "Generative Adversarial Networks \u2014 two nets, one game", accent: "#F4A259",
    bullets: ["Generator creates fakes from noise; discriminator judges real vs fake.",
      "Training alternates updates to the two networks; improvement is not guaranteed.",
      "Introduced by Ian Goodfellow, 2014.",
      "Watch for mode collapse: the generator repeating a few safe outputs."],
    image: "key-points-gan.png", imageAlt: "GAN: generator sends fakes to the discriminator, which also sees real images",
    footnote: "GANs are one approach to realistic synthetic data \u2014 and deepfakes." },
  { kicker: "Neural networks \u00b7 core idea", title: "Activation functions \u2014 the non-linearity", accent: "#5B8DEF",
    bullets: ["Without them, stacking layers is pointless: linear + linear is still linear.",
      "Sigmoid squashes to 0\u20131 but saturates; tanh is zero-centered, \u22121 to 1.",
      "ReLU \u2014 max(0, x) \u2014 maps negative inputs to zero and has a linear positive branch.",
      "Softmax turns raw scores into probabilities for classification outputs."],
    diagramNote: "Horizontal axis: weighted sum plus bias. Vertical axis: activation output. Sigmoid ranges from 0 to 1, tanh from −1 to 1, and ReLU equals max(0, x).",
    image: "key-points-activations.png", imageAlt: "Curves for sigmoid, tanh, and ReLU activation functions",
    footnote: "The source deck's spirals example uses tanh in its hidden layers; its experiment code is not included." },
  { kicker: "Neural networks \u00b7 ethics", title: "Synthetic data & deepfakes \u2014 same tech, two edges", accent: "#E4572E",
    bullets: ["Consent is the sharpest harm: real people in scenes that never happened.",
      "Misinformation gets cheap \u2014 fake speeches, endorsements, events.",
      "Detection is an arms race; watermarking and provenance help but don't settle it.",
      "The useful side is real: augmenting scarce medical data, privacy-preserving sets."],
    image: "key-points-ethics.png", imageAlt: "Two panels: genuinely useful uses of synthetic data vs harmful uses without guardrails" },
  { kicker: "Professor Predict \u00b7 LLM training", title: "Learning with AI \u2014 plausible is not verified", accent: "#2EC4B6",
    bullets: ["An LLM's core job in pretraining: predict the next token.",
      "The Velmora trap: a confident answer to a fictional president \u2014 hallucination.",
      "Fluency and truth overlap often \u2014 but there is no guaranteed fact-checker inside.",
      "Danger Zone means: needs a source, a tool, an expert, or verification."],
    image: "key-points-fit_danger.png", imageAlt: "Good Fit tasks vs Danger Zone tasks for a language model",
    footnote: "Stage 4 verdicts: Good Fit = drafting, explaining, brainstorming \u00b7 Danger Zone = live, rare, private, exact, high-stakes." },
  { kicker: "Change leadership \u00b7 AI/ML integration", title: "Leading change \u2014 communication first", accent: "#4CAF7D",
    bullets: ["10 communication strategies: clear messaging, two-way channels, tailored audiences, open resistance.",
      "12 presentation principles: chunking, visuals, spaced repetition, peer learning.",
      "Where they overlap: tailored approach, storytelling, multimodal delivery, feedback loops.",
      "Payoff: clarity, engagement, learning that sticks \u2014 and trust."],
    image: "key-points-overlap.png", imageAlt: "Venn diagram: communication strategies overlapping presentation principles",
    footnote: "A communication framework for AI/ML integration; no implemented healthcare rollout is claimed." },
  { kicker: "Portfolio \u00b7 showing the work", title: "Artifacts \u2014 chosen and customized per audience", accent: "#9B7EDE",
    bullets: ["Pick artifacts that prove competencies \u2014 tangible deliverables, not descriptions.",
      "Same artifact, different framing: outcomes for recruiters, process for managers, method for peers.",
      "Every artifact carries the 10-field template: Title \u2192 References.",
      "Reflections go to the professor in Brightspace \u2014 not on the portfolio page."],
    diagramNote: "Recruiters look for outcomes; engineering managers examine process and quality; technical peers examine method. Frame the same artifact for the reader’s question.",
    image: "key-points-audience.png", imageAlt: "Three audiences: recruiters, engineering managers, technical peers",
    footnote: "Course target: at least 5 artifacts \u00b7 This portfolio currently presents 3." },
  { type: "closing", kicker: "HOW IT CONNECTS", title: "Build the models. Learn with AI. Lead the change. Show the work.", accent: "#2EC4B6",
    rows: [
      { label: "Build the models", body: "ANN \u00b7 CNN \u00b7 RNN \u00b7 GAN \u2014 how they learn, and where each one fits.", color: "#5B8DEF" },
      { label: "Learn with AI", body: "Professor Predict \u2014 next-token prediction, the Velmora trap, Good Fit vs Danger Zone.", color: "#2EC4B6" },
      { label: "Lead the change", body: "Communication strategies + presentation principles \u2014 the overlap is where adoption happens.", color: "#4CAF7D" },
      { label: "Show the work", body: "Three portfolio entries, each presented with its evidence and context.", color: "#9B7EDE" } ],
    footer: "ALML-500 \u00b7 Vrund Patel \u00b7 Fall 2026" }
];
const total = SLIDES.length;
let index = 0;
const slideEl = deck.querySelector("#slide");
const dotsEl = deck.querySelector("#dots");
const counterEl = deck.querySelector("#counter");
const progressEl = deck.querySelector("#progress");
const prevBtn = deck.querySelector("#prev");
const nextBtn = deck.querySelector("#next");
function esc(s){ return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
dotsEl.innerHTML = SLIDES.map(function(_, i){ return '<button type="button" class="kpd-dot' + (i === index ? ' active' : '') + '" data-i="' + i + '" aria-label="Go to slide ' + (i + 1) + '"></button>'; }).join("");
function render(){
  const s = SLIDES[index];
  let html = "";
  if (s.type === "cover") {
    html = '<div class="kpd-cover"><p class="kpd-kicker" style="color:' + s.accent + '">' + esc(s.kicker) + '</p><h3>' + esc(s.title) + '</h3><p class="kpd-subtitle">' + esc(s.subtitle) + '</p><div class="kpd-rule" style="background:' + s.accent + '"></div><p class="kpd-chips">' + s.chips.map(function(c){ return '<span class="kpd-chip">' + esc(c) + '</span>'; }).join("") + '</p></div>';
  } else if (s.type === "closing") {
    html = '<div class="kpd-closing"><p class="kpd-kicker" style="color:' + s.accent + '">' + esc(s.kicker) + '</p><h3>' + esc(s.title) + '</h3><div class="kpd-rule" style="background:' + s.accent + '"></div>' + s.rows.map(function(r){ return '<div class="kpd-row"><span class="kpd-row-label" style="color:' + r.color + '">' + esc(r.label) + '</span><span class="kpd-row-body">' + esc(r.body) + '</span></div>'; }).join("") + '<p class="kpd-footer">' + esc(s.footer) + '</p></div>';
  } else {
    html = '<div class="kpd-slide"><p class="kpd-kicker" style="color:' + s.accent + '">' + esc(s.kicker) + '</p><h3>' + esc(s.title) + '</h3><div class="kpd-rule" style="background:' + s.accent + '"></div><div class="kpd-body"><ul>' + s.bullets.map(function(b){ return '<li>' + esc(b) + '</li>'; }).join("") + '</ul><figure class="kpd-figure"><img src="' + s.image + '" alt="' + esc(s.imageAlt) + '" class="kpd-diagram">' + (s.diagramNote ? '<figcaption>' + esc(s.diagramNote) + '</figcaption>' : '') + '</figure></div>' + (s.footnote ? '<p class="kpd-footnote">' + esc(s.footnote) + '</p>' : '') + '</div>';
  }
  slideEl.innerHTML = html;
  progressEl.style.width = ((index + 1) / total * 100) + "%";
  counterEl.textContent = (index + 1) + " / " + total;
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === total - 1;
  dotsEl.querySelectorAll('button').forEach(function(button, i){
    button.classList.toggle('active', i === index);
    button.setAttribute('aria-current', String(i === index));
  });
  slideEl.setAttribute('aria-label', 'Slide ' + (index + 1) + ': ' + s.title);
}
function goTo(i){ index = ((i % total) + total) % total; render(); }
deck.addEventListener("click", function(e){ if (e.target.closest("#nav")) return; goTo(index + 1); });
dotsEl.addEventListener("click", function(e){ const b = e.target.closest("button"); if (b) goTo(Number(b.dataset.i)); });
prevBtn.addEventListener("click", function(){ goTo(index - 1); });
nextBtn.addEventListener("click", function(){ goTo(index + 1); });
deck.addEventListener("keydown", function(e){
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.key === ' ' && e.target.closest('button, a')) return;
  if (['ArrowRight', 'ArrowLeft', ' ', 'Home', 'End'].includes(e.key)) e.preventDefault();
  if (e.key === "ArrowRight" || e.key === " ") goTo(index + 1);
  if (e.key === "ArrowLeft") goTo(index - 1);
  if (e.key === "Home") goTo(0);
  if (e.key === "End") goTo(total - 1);
});
render();

const autoplay = deck.querySelector("#autoplay");
if (!autoplay || !("IntersectionObserver" in window)) return;

const motion = matchMedia("(prefers-reduced-motion: reduce)");
let visible = false;
let paused = false;
let timer;
function syncAutoplay() {
  clearInterval(timer);
  const running = visible && !paused && !motion.matches && !document.hidden;
  autoplay.hidden = motion.matches;
  autoplay.textContent = paused ? "Play slides" : "Pause autoplay";
  counterEl.setAttribute("aria-live", running ? "off" : "polite");
  if (running) timer = setInterval(() => goTo(index + 1), 4000);
}
autoplay.addEventListener("click", () => {
  paused = !paused;
  syncAutoplay();
});
deck.addEventListener("focusin", () => {
  if (!deck.matches(":focus-visible, :has(:focus-visible)")) return;
  paused = true;
  syncAutoplay();
});
document.addEventListener("visibilitychange", syncAutoplay);
motion.addEventListener("change", syncAutoplay);
new IntersectionObserver(([entry]) => {
  visible = entry.intersectionRatio >= 0.5;
  syncAutoplay();
}, { threshold: 0.5 }).observe(deck);
syncAutoplay();
})();

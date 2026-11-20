# Graph Report - vrund-portfolio 2  (2026-11-19)

## Corpus Check
- Local code extraction plus manually verified nodes for Artifact 4 and its links. Other document and image semantics carry forward from the earlier snapshot.

## Summary
- 312 nodes · 408 edges · 16 communities (14 shown, 2 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `89ea2f55`
- Includes local working-tree changes beyond the recorded commit.
- Run `graphify update .` after code changes. HTML and other document changes need a semantic refresh.

## Community Hubs (Navigation)
- Slide presentation
- test_build.py
- Documentation and workflow
- Documentation and workflow 2
- ScreenWise prototype
- ML and DL coursework
- Browser interaction
- Browser interaction 2
- Documentation and workflow 3
- Build and validation 2
- deploy
- key-points-deck.test.cjs
- build
- Data Challenge Scenarios (Artifact 4)

## God Nodes (most connected - your core abstractions)
1. `Current authoring, validation, audit and map workflow` - 39 edges
2. `November 13 complete-file audit and verified fixes` - 25 edges
3. `ScreenWise team prototype, evidence and reflection` - 25 edges
4. `Machine learning versus deep learning analysis` - 22 edges
5. `build()` - 17 edges
6. `PortfolioBuildTests` - 14 edges
7. `ML and deep learning hierarchy, workflows and example applications` - 12 edges
8. `Project constraints and durable memory workflow` - 12 edges
9. `Healthcare software and AI-learning social preview` - 11 edges
10. `validate_site()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `render_pages()` --renders--> `Data Challenge Scenarios (Artifact 4)`  [EXTRACTED]
  pages.py → artifacts/data-challenge-scenarios.html
- `Machine learning versus deep learning analysis` --references--> `ML and deep learning hierarchy, workflows and example applications`  [EXTRACTED]
  artifacts/ml-vs-dl.html → assets/ml-vs-dl-infographic.png
- `Current authoring, validation, audit and map workflow` --references--> `Artifact 3: Key Concepts in AI and Machine Learning`  [EXTRACTED]
  README.md → artifacts/key-concepts.html
- `November 13 complete-file audit and verified fixes` --references--> `Artifact 3: Key Concepts in AI and Machine Learning`  [EXTRACTED]
  AUDIT.md → artifacts/key-concepts.html
- `Current authoring, validation, audit and map workflow` --references--> `Jobs, expertise groups and trusted historical notes`  [EXTRACTED]
  README.md → content-data.json

## Import Cycles
- None detected.

## Communities (16 total, 2 thin omitted)

### Community 0 - "Slide presentation"
Cohesion: 0.09
Nodes (23): Recruiter, engineering manager and peer audiences, Convolution, pooling and classification pipeline, Activation functions — the non-linearity, Artifacts — chosen and customized per audience, Artificial Neural Networks — how they learn, Build the models. Learn with AI. Lead the change. Show the work., Convolutional Networks — built for images, esc() (+15 more)

### Community 1 - "test_build.py"
Cohesion: 0.12
Nodes (5): ANN input, hidden and output layers with backpropagation, main(), load_content(), generate_resume(), main()

### Community 2 - "Documentation and workflow"
Cohesion: 0.07
Nodes (32): Base layout and responsive structure, Jobs, expertise groups and trusted historical notes, Trusted dated AI timeline HTML, Technical expertise groups, Named job summaries and private resume text, Non-interactive, reduced-motion-aware cursor decoration, Shared accessibility, responsive and workstation styles, Glass surfaces, transparency fallbacks and light theme (+24 more)

### Community 3 - "Documentation and workflow 2"
Cohesion: 0.08
Nodes (22): Private/local environment and cache exclusions, Artifact 3: Key Concepts in AI and Machine Learning, From model foundations to adoption., Key Concepts in AI & Machine Learning: From Neural Networks to Leading Change, Key Points, November 13 complete-file audit and verified fixes, No deployment authorized by this audit, File-by-file coverage (+14 more)

### Community 4 - "ScreenWise prototype"
Cohesion: 0.08
Nodes (24): ScreenWise team prototype, evidence and reflection, Define, Empathize, define, ideate, prototype, test, Empathize, Family Coach, Fast conversational prototyping., From a short input to an offline game., From screen-time limits to practical alternatives. (+16 more)

### Community 5 - "ML and DL coursework"
Cohesion: 0.06
Nodes (29): Machine learning versus deep learning analysis, A next step toward AI integration., Convolutional neural network, Email spam detection, Coursework ML versus DL infographic, Logistic regression, Machine learning.Deep learning. Different tradeoffs., Medical image analysis (+21 more)

### Community 7 - "Browser interaction"
Cohesion: 0.29
Nodes (13): mount(), draw(), hide(), leave(), move(), resize(), schedule(), visibility() (+5 more)

### Community 8 - "Browser interaction 2"
Cohesion: 0.15
Nodes (9): assert, events, fine, fs, reduced, scene, source, values (+1 more)

### Community 9 - "Documentation and workflow 3"
Cohesion: 0.17
Nodes (12): Project constraints and durable memory workflow, Native cursor, keyboard access, reduced motion and touch exclusions, Before you write, Portfolio preservation constraints, ECC project memory, Persistent project memory, Ponytail, lazy senior dev mode, Portfolio project context (+4 more)

### Community 10 - "Build and validation 2"
Cohesion: 0.10
Nodes (13): Portfolio lavender v and teal-dot favicon, Favicon: lavender v and teal dot on rounded dark square, Healthcare software and AI-learning social preview, Case Studies, FHIR, Healthcare Software and AI Learning, Java, ML vs. Deep Learning (+5 more)

### Community 11 - "deploy"
Cohesion: 0.06
Nodes (36): runs-on, steps, concurrency, cancel-in-progress, group, environment, if, needs (+28 more)

### Community 14 - "key-points-deck.test.cjs"
Cohesion: 0.10
Nodes (10): Sigmoid, tanh and ReLU activation curves, assert, buttons, deck, elements, fs, images, motion (+2 more)

### Community 15 - "build"
Cohesion: 0.25
Nodes (4): build(), render_pages(), PortfolioBuildTests, validate_site()

### Community 16 - "Data Challenge Scenarios (Artifact 4)"
Cohesion: 0.25
Nodes (8): Data Challenge Scenarios (Artifact 4), Bias and responsible scaling, Data Challenge Scenarios artifact information, Privacy in collaborative learning, Data quality and cluster-aware splitting, Data Challenge Scenarios references, chip(), setSplit()

## Knowledge Gaps
- **137 isolated node(s):** `Activation functions — the non-linearity`, `Artifacts — chosen and customized per audience`, `Artificial Neural Networks — how they learn`, `Build the models. Learn with AI. Lead the change. Show the work.`, `Convolutional Networks — built for images` (+132 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 217 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Current authoring, validation, audit and map workflow` connect `Documentation and workflow` to `test_build.py`, `Documentation and workflow 2`, `Browser interaction 2`, `Build and validation 2`, `key-points-deck.test.cjs`?**
  _High betweenness centrality (0.271) - this node is a cross-community bridge._
- **What connects `Activation functions — the non-linearity`, `Artifacts — chosen and customized per audience`, `Artificial Neural Networks — how they learn` to the rest of the system?**
  _137 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Slide presentation` be split into smaller, more focused modules?**
  _Cohesion score 0.09420289855072464 - nodes in this community are weakly interconnected._
- **Why does `November 13 complete-file audit and verified fixes` connect `Documentation and workflow 2` to `Slide presentation`, `test_build.py`, `Documentation and workflow`, `Documentation and workflow 3`, `Build and validation 2`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Should `test_build.py` be split into smaller, more focused modules?**
  _Cohesion score 0.11692307692307692 - nodes in this community are weakly interconnected._
- **Why does `ScreenWise team prototype, evidence and reflection` connect `ScreenWise prototype` to `test_build.py`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Should `Documentation and workflow` be split into smaller, more focused modules?**
  _Cohesion score 0.06507936507936508 - nodes in this community are weakly interconnected._
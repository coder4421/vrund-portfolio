# Graph Report - vrund-portfolio 2  (2026-11-13)

## Corpus Check
- Corpus is ~11,603 words - fits in a single context window. You may not need a graph.

## Summary
- 245 nodes · 328 edges · 14 communities (12 shown, 2 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.86)
- Token cost: unmeasured host-agent extraction; numeric zero counters are placeholders, not a claim of free execution.

## Community Hubs (Navigation)
- Slide presentation
- Build and validation
- Documentation and workflow
- Documentation and workflow 2
- ScreenWise prototype
- ML and DL coursework
- ML and DL coursework 2
- Browser interaction
- Browser interaction 2
- Documentation and workflow 3
- Build and validation 2
- Portfolio rendering

## God Nodes (most connected - your core abstractions)
1. `Current authoring, validation, audit and map workflow` - 39 edges
2. `November 13 complete-file audit and verified fixes` - 25 edges
3. `ScreenWise team prototype, evidence and reflection` - 25 edges
4. `Machine learning versus deep learning analysis` - 22 edges
5. `build()` - 15 edges
6. `PortfolioBuildTests` - 13 edges
7. `Project constraints and durable memory workflow` - 12 edges
8. `ML and deep learning hierarchy, workflows and example applications` - 12 edges
9. `load_content()` - 11 edges
10. `Healthcare software and AI-learning social preview` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Machine learning versus deep learning analysis` --references--> `ML and deep learning hierarchy, workflows and example applications`  [EXTRACTED]
  artifacts/ml-vs-dl.html → assets/ml-vs-dl-infographic.png
- `November 13 complete-file audit and verified fixes` --references--> `Artifact 3: Key Concepts in AI and Machine Learning`  [EXTRACTED]
  AUDIT.md → artifacts/key-concepts.html
- `Current authoring, validation, audit and map workflow` --references--> `Artifact 3: Key Concepts in AI and Machine Learning`  [EXTRACTED]
  README.md → artifacts/key-concepts.html
- `Current authoring, validation, audit and map workflow` --references--> `Jobs, expertise groups and trusted historical notes`  [EXTRACTED]
  README.md → content-data.json
- `November 13 complete-file audit and verified fixes` --references--> `Private/local environment and cache exclusions`  [EXTRACTED]
  AUDIT.md → .gitignore

## Import Cycles
- None detected.

## Communities (14 total, 2 thin omitted)

### Community 0 - "Slide presentation"
Cohesion: 0.06
Nodes (31): Sigmoid, tanh and ReLU activation curves, Recruiter, engineering manager and peer audiences, Convolution, pooling and classification pipeline, Activation functions — the non-linearity, Artifacts — chosen and customized per audience, Artificial Neural Networks — how they learn, Build the models. Learn with AI. Lead the change. Show the work., Convolutional Networks — built for images (+23 more)

### Community 1 - "Build and validation"
Cohesion: 0.12
Nodes (9): ANN input, hidden and output layers with backpropagation, build(), main(), load_content(), render_pages(), generate_resume(), main(), PortfolioBuildTests (+1 more)

### Community 2 - "Documentation and workflow"
Cohesion: 0.08
Nodes (28): Base layout and responsive structure, Non-interactive, reduced-motion-aware cursor decoration, Shared accessibility, responsive and workstation styles, Glass surfaces, transparency fallbacks and light theme, Scoped slide presentation, touch targets and entrance animation, Current authoring, validation, audit and map workflow, Accessibility and behavior, Vanilla JavaScript and favicon (+20 more)

### Community 3 - "Documentation and workflow 2"
Cohesion: 0.08
Nodes (22): Private/local environment and cache exclusions, Artifact 3: Key Concepts in AI and Machine Learning, From model foundations to adoption., Key Concepts in AI & Machine Learning: From Neural Networks to Leading Change, Key Points, November 13 complete-file audit and verified fixes, No deployment authorized by this audit, File-by-file coverage (+14 more)

### Community 4 - "ScreenWise prototype"
Cohesion: 0.08
Nodes (24): ScreenWise team prototype, evidence and reflection, Define, Empathize, define, ideate, prototype, test, Empathize, Family Coach, Fast conversational prototyping., From a short input to an offline game., From screen-time limits to practical alternatives. (+16 more)

### Community 5 - "ML and DL coursework"
Cohesion: 0.10
Nodes (20): Machine learning versus deep learning analysis, A next step toward AI integration., Convolutional neural network, Email spam detection, Coursework ML versus DL infographic, Logistic regression, Machine learning.Deep learning. Different tradeoffs., Medical image analysis (+12 more)

### Community 6 - "ML and DL coursework 2"
Cohesion: 0.11
Nodes (12): Portfolio lavender v and teal-dot favicon, Favicon: lavender v and teal dot on rounded dark square, ML and deep learning hierarchy, workflows and example applications, Artificial Intelligence, Machine Learning vs. Deep Learning Infographic, Decision Tree, Deep Learning, Deep Neural Network (+4 more)

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
Cohesion: 0.20
Nodes (10): Healthcare software and AI-learning social preview, Case Studies, FHIR, Healthcare Software and AI Learning, Java, ML vs. Deep Learning, Portfolio Social Preview, ScreenWise (+2 more)

### Community 11 - "Portfolio rendering"
Cohesion: 0.50
Nodes (4): Jobs, expertise groups and trusted historical notes, Trusted dated AI timeline HTML, Technical expertise groups, Named job summaries and private resume text

## Knowledge Gaps
- **132 isolated node(s):** `Private/local environment and cache exclusions`, `Recruiter, engineering manager and peer audiences`, `Convolution, pooling and classification pipeline`, `Potential synthetic-data uses and consent/misinformation harms`, `LLM Good Fit and Danger Zone task examples` (+127 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 177 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Current authoring, validation, audit and map workflow` connect `Documentation and workflow` to `Slide presentation`, `Build and validation`, `Documentation and workflow 2`, `ML and DL coursework 2`, `Browser interaction 2`, `Portfolio rendering`?**
  _High betweenness centrality (0.345) - this node is a cross-community bridge._
- **What connects `Private/local environment and cache exclusions`, `Recruiter, engineering manager and peer audiences`, `Convolution, pooling and classification pipeline` to the rest of the system?**
  _132 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Slide presentation` be split into smaller, more focused modules?**
  _Cohesion score 0.06417112299465241 - nodes in this community are weakly interconnected._
- **Why does `November 13 complete-file audit and verified fixes` connect `Documentation and workflow 2` to `Slide presentation`, `Build and validation`, `Documentation and workflow`, `ML and DL coursework 2`, `Documentation and workflow 3`?**
  _High betweenness centrality (0.188) - this node is a cross-community bridge._
- **Should `Build and validation` be split into smaller, more focused modules?**
  _Cohesion score 0.12121212121212122 - nodes in this community are weakly interconnected._
- **Why does `ScreenWise team prototype, evidence and reflection` connect `ScreenWise prototype` to `Build and validation`?**
  _High betweenness centrality (0.173) - this node is a cross-community bridge._
- **Should `Documentation and workflow` be split into smaller, more focused modules?**
  _Cohesion score 0.07741935483870968 - nodes in this community are weakly interconnected._
## Audit scope and limitations

- All detected current source/doc/image files were inspected; six CSS files and .gitignore have manual file-level nodes because the detector does not parse CSS selectors.
- Generated dist, the deployment checkout, environments, private memory, file census and generated architecture SVG are excluded from the semantic corpus.
- AST relations whose endpoints were unresolved were not promoted into verified graph facts. The raw diagnostic is in UPDATE_HEALTH.txt. External and dynamic calls can therefore be absent from this map.
- Machine-readable JSON retains resolved relation records; the undirected interactive overview can visually combine parallel relations. It is a maintenance map, not proof of complete runtime behavior.
- No external LLM service was used. Token usage for inline host extraction is unavailable.

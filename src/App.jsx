import { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Droplets,
  RotateCcw,
  Thermometer,
  Trophy,
  XCircle,
} from "lucide-react";

const examData = [
  {
    id: 1,
    paper: "June 2023",
    topic: "Fluids",
    type: "fluids",
    question:
      "A technician measures the pressure of oil flowing through a pipe. Which one of these is a unit of pressure?",
    options: ["kg m⁻³", "N m", "N m⁻²", "kg s⁻¹"],
    correctAnswer: 2,
    explanation:
      "Pressure is defined as force applied per unit area (P = F / A). The unit of force is the Newton (N) and area is in square meters (m²), resulting in N m⁻².",
  },
  {
    id: 2,
    paper: "January 2022",
    topic: "Thermal Physics",
    type: "thermal",
    question:
      "When an energy transfer takes place in a system, what happens to the entropy of the system according to thermodynamic principles?",
    options: [
      "It decreases as the system becomes more organized.",
      "It remains constant.",
      "It increases, meaning more disorder.",
      "It becomes exactly zero.",
    ],
    correctAnswer: 2,
    explanation:
      "According to the Second Law of Thermodynamics, during any real energy transfer, the entropy (disorder) of an isolated system always increases.",
  },
  {
    id: 3,
    paper: "January 2022",
    topic: "Fluids",
    type: "fluids",
    question:
      "A lorry and a car move fast next to each other. Air flows between them. What happens to the air pressure between the vehicles?",
    options: [
      "Pressure decreases due to Bernoulli's principle.",
      "Pressure increases due to Archimedes' principle.",
      "Pressure decreases due to Pascal's law.",
      "Pressure remains the same but temperature drops.",
    ],
    correctAnswer: 0,
    explanation:
      "Bernoulli's principle states that an increase in fluid speed results in a decrease in pressure. Faster air between vehicles creates a low-pressure zone.",
  },
  {
    id: 4,
    paper: "January 2022",
    topic: "Thermal Physics",
    type: "thermal",
    question:
      "Sunlight heats a puddle of water, causing it to evaporate. What happens to the water molecules?",
    options: [
      "Molecules lose kinetic energy and bonds are formed.",
      "Molecules gain kinetic energy, move faster, break bonds and escape.",
      "Kinetic energy stays the same but potential energy drops.",
      "The water molecules undergo nuclear fission.",
    ],
    correctAnswer: 1,
    explanation:
      "Molecules absorb thermal energy, increasing their kinetic energy until they can overcome intermolecular forces and escape as gas.",
  },
  {
    id: 5,
    paper: "January 2022",
    topic: "Thermal Physics",
    type: "thermal",
    question:
      "Calculate the mass of water evaporated if 2.00 × 10⁶ J of energy is supplied. (Latent heat of vaporization = 2.26 × 10⁶ J/kg)",
    options: ["0.885 kg", "1.130 kg", "4.520 kg", "1.000 kg"],
    correctAnswer: 0,
    explanation: "Using m = E / L: (2.00 × 10⁶) / (2.26 × 10⁶) ≈ 0.885 kg.",
  },
  {
    id: 6,
    paper: "January 2022",
    topic: "Thermal Physics",
    type: "thermal",
    question:
      "If the volume of a cylinder containing air is increased at constant temperature, what happens to the pressure?",
    options: [
      "Increases; molecules move faster.",
      "Decreases; molecules collide less frequently with walls.",
      "Stays the same; kinetic energy is constant.",
      "Increases; more frequent collisions.",
    ],
    correctAnswer: 1,
    explanation:
      "Boyle's Law: As volume increases, the frequency of collisions with the walls decreases, leading to lower pressure.",
  },
  {
    id: 7,
    paper: "June 2023",
    topic: "Fluids",
    type: "fluids",
    question:
      "Oil flows steadily through a pipe (laminar flow). Which describes the velocity across the pipe?",
    options: [
      "Velocity is highest at the walls.",
      "Velocity is uniform across the pipe.",
      "Velocity is highest in the center and zero at the walls.",
      "Velocity fluctuates randomly.",
    ],
    correctAnswer: 2,
    explanation:
      "In laminar flow, friction at the walls creates a velocity gradient where the speed is zero at the boundary and maximum at the center.",
  },
  {
    id: 8,
    paper: "January 2025 (Model)",
    topic: "Materials",
    type: "materials",
    question:
      "What does the gradient of the initial straight-line portion of a stress-strain graph represent?",
    options: [
      "Yield point",
      "Tensile strength",
      "Plastic deformation",
      "Young's modulus",
    ],
    correctAnswer: 3,
    explanation:
      "The gradient of the elastic region is Stress/Strain, which is the definition of Young's Modulus (E).",
  },
  {
    id: 9,
    paper: "January 2025 (Model)",
    topic: "Materials",
    type: "materials",
    question:
      "Which material exhibits 'hysteresis' during loading and unloading on a stress-strain graph?",
    options: ["Polythene", "Copper wire", "Steel wire", "Glass"],
    correctAnswer: 0,
    explanation:
      "Polymers like polythene exhibit hysteresis, where energy is dissipated as heat during a deformation cycle.",
  },
  {
    id: 10,
    paper: "January 2025 (Model)",
    topic: "Thermal Physics",
    type: "thermal",
    question: "Why can a heat engine's efficiency never reach 100%?",
    options: [
      "Friction creates extra energy.",
      "The specific heat capacity is too high.",
      "Energy must always be expelled to a cold reservoir.",
      "Energy is destroyed during work.",
    ],
    correctAnswer: 2,
    explanation:
      "The Second Law of Thermodynamics requires a temperature difference; some heat must be rejected to the sink.",
  },
  {
    id: 11,
    paper: "Past Paper Mix",
    topic: "Thermal Physics",
    type: "thermal",
    question:
      "A 2.0 kg copper block needs 7700 J to raise temp by 10 °C. What is the specific heat capacity?",
    options: ["385 J/kg°C", "770 J/kg°C", "3850 J/kg°C", "15400 J/kg°C"],
    correctAnswer: 0,
    explanation: "c = Q / (mΔT) = 7700 / (2.0 * 10) = 385 J/kg°C.",
  },
  {
    id: 12,
    paper: "Past Paper Mix",
    topic: "Fluids",
    type: "fluids",
    question:
      "How does the dynamic viscosity of a liquid change as temperature increases?",
    options: [
      "It increases.",
      "It decreases.",
      "It remains constant.",
      "It drops to zero.",
    ],
    correctAnswer: 1,
    explanation:
      "Increased kinetic energy allows molecules to overcome cohesive forces, reducing internal friction (viscosity).",
  },
  {
    id: 13,
    paper: "Past Paper Mix",
    topic: "Materials",
    type: "materials",
    question: "A 2.0 m wire extends by 4.0 mm under force. What is the strain?",
    options: ["0.002", "0.008", "2.0", "8.0"],
    correctAnswer: 0,
    explanation: "Strain = extension / length = 0.004m / 2.0m = 0.002.",
  },
  {
    id: 14,
    paper: "Past Paper Mix",
    topic: "Fluids",
    type: "fluids",
    question: "According to Archimedes' principle, upthrust is equal to...",
    options: [
      "Object volume.",
      "Object mass.",
      "Weight of fluid displaced.",
      "Fluid density.",
    ],
    correctAnswer: 2,
    explanation:
      "Upthrust equals the weight of the fluid displaced by the submerged part of the object.",
  },
  {
    id: 15,
    paper: "Past Paper Mix",
    topic: "Thermal Physics",
    type: "thermal",
    question:
      "What is an advantage of a thermocouple over a liquid-in-glass thermometer?",
    options: [
      "It is fragile.",
      "Slow response.",
      "Measures rapidly changing temperatures.",
      "No calibration needed.",
    ],
    correctAnswer: 2,
    explanation:
      "Small thermal mass allows thermocouples to track rapid changes and reach thermal equilibrium quickly.",
  },
];

const topicMeta = {
  all: {
    label: "All topics",
    type: "all",
    description:
      "Mixed-paper revision session across fluids, thermal physics, and materials.",
  },
  fluids: {
    label: "Fluids",
    type: "fluids",
    description: "Pressure, viscosity, upthrust, Bernoulli, and laminar flow.",
  },
  thermal: {
    label: "Thermal Physics",
    type: "thermal",
    description:
      "Entropy, latent heat, heat engines, Boyle’s law, and temperature measurements.",
  },
  materials: {
    label: "Materials",
    type: "materials",
    description:
      "Stress-strain behaviour, modulus, hysteresis, and strain calculations.",
  },
};

function TopicIcon({ type }) {
  switch (type) {
    case "fluids":
      return <Droplets size={18} />;
    case "thermal":
      return <Thermometer size={18} />;
    case "materials":
      return <Activity size={18} />;
    default:
      return <BookOpen size={18} />;
  }
}

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questionSet = useMemo(() => {
    if (selectedTopic === "all") {
      return examData;
    }

    return examData.filter((question) => question.type === selectedTopic);
  }, [selectedTopic]);

  const papers = useMemo(
    () => [...new Set(questionSet.map((question) => question.paper))],
    [questionSet],
  );

  const accuracy =
    questionSet.length === 0
      ? 0
      : Math.round((score / questionSet.length) * 100);
  const answeredCount = finished
    ? questionSet.length
    : index + (isAnswered ? 1 : 0);
  const progress =
    questionSet.length === 0 ? 0 : (answeredCount / questionSet.length) * 100;
  const current = questionSet[index];
  const currentTopic = topicMeta[selectedTopic];

  const resetSession = (nextTopic = selectedTopic) => {
    setSelectedTopic(nextTopic);
    setStarted(false);
    setIndex(0);
    setSelected(null);
    setIsAnswered(false);
    setScore(0);
    setFinished(false);
  };

  const startSession = () => {
    setStarted(true);
    setIndex(0);
    setSelected(null);
    setIsAnswered(false);
    setScore(0);
    setFinished(false);
  };

  const handleTopicChange = (topic) => {
    resetSession(topic);
  };

  const handleChoice = (choiceIndex) => {
    if (isAnswered || !current) {
      return;
    }

    setSelected(choiceIndex);
    setIsAnswered(true);

    if (choiceIndex === current.correctAnswer) {
      setScore((previousScore) => previousScore + 1);
    }
  };

  const handleNext = () => {
    if (index + 1 < questionSet.length) {
      setIndex((previousIndex) => previousIndex + 1);
      setSelected(null);
      setIsAnswered(false);
      return;
    }

    setFinished(true);
  };

  const getOptionState = (optionIndex) => {
    if (!isAnswered) {
      return "idle";
    }

    if (optionIndex === current.correctAnswer) {
      return "correct";
    }

    if (optionIndex === selected) {
      return "wrong";
    }

    return "muted";
  };

  return (
    <div className="page-shell">
      <div className="page-aura page-aura-left" />
      <div className="page-aura page-aura-right" />

      <div className="page-content">
        <header className="hero panel">
          <div>
            <p className="eyebrow">BTEC Unit 5 Physics</p>
            <h1>Exam practice turned into a real revision website.</h1>
            <p className="hero-copy">
              This site uses the full question bank from your source file and
              packages it as a focused study tool for GitHub Pages.
            </p>
          </div>

          <div className="hero-stats">
            <div>
              <span>Questions</span>
              <strong>{examData.length}</strong>
            </div>
            <div>
              <span>Papers</span>
              <strong>
                {new Set(examData.map((question) => question.paper)).size}
              </strong>
            </div>
            <div>
              <span>Topics</span>
              <strong>3</strong>
            </div>
          </div>
        </header>

        <section className="dashboard-grid">
          <aside className="panel side-panel">
            <div className="panel-heading">
              <h2>Study mode</h2>
              <p>Pick a focused topic or revise the full mixed paper set.</p>
            </div>

            <div className="topic-list">
              {Object.entries(topicMeta).map(([key, value]) => {
                const count =
                  key === "all"
                    ? examData.length
                    : examData.filter((question) => question.type === key)
                        .length;

                return (
                  <button
                    key={key}
                    type="button"
                    className={`topic-button ${selectedTopic === key ? "topic-button-active" : ""}`}
                    onClick={() => handleTopicChange(key)}
                  >
                    <span className="topic-button-label">
                      <TopicIcon type={value.type} />
                      {value.label}
                    </span>
                    <span className="topic-count">{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="topic-card">
              <div className="topic-card-header">
                <TopicIcon type={currentTopic.type} />
                <h3>{currentTopic.label}</h3>
              </div>
              <p>{currentTopic.description}</p>
            </div>

            <dl className="session-facts">
              <div>
                <dt>Questions in session</dt>
                <dd>{questionSet.length}</dd>
              </div>
              <div>
                <dt>Papers included</dt>
                <dd>{papers.length}</dd>
              </div>
              <div>
                <dt>Current score</dt>
                <dd>{score}</dd>
              </div>
            </dl>

            <div className="panel-actions">
              <button
                type="button"
                className="primary-button"
                onClick={startSession}
              >
                {started ? "Restart this session" : "Start revision"}
                <ArrowRight size={18} />
              </button>

              {(started || finished) && (
                <button
                  type="button"
                  className="ghost-button"
                  onClick={() => resetSession()}
                >
                  <RotateCcw size={18} />
                  Reset
                </button>
              )}
            </div>
          </aside>

          <main className="panel question-panel">
            <div className="question-topbar">
              <div>
                <p className="eyebrow">31627H/1P Exam Prep</p>
                <h2>
                  {started && !finished
                    ? `Question ${index + 1} of ${questionSet.length}`
                    : finished
                      ? "Session summary"
                      : "Ready to begin"}
                </h2>
              </div>

              <div className="score-chip">
                <Trophy size={18} />
                <span>{score} marks</span>
              </div>
            </div>

            <div className="progress-track" aria-hidden="true">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>

            {!started && (
              <div className="empty-state">
                <BookOpen size={30} />
                <h3>Launch a timed-feel practice round</h3>
                <p>
                  You can switch topics at any point. Starting a new topic
                  automatically resets the score so each revision run stays
                  clean.
                </p>
              </div>
            )}

            {started && finished && (
              <div className="results-card">
                <div className="results-icon">
                  <CheckCircle2 size={34} />
                </div>

                <h3>Practice complete</h3>
                <p className="results-copy">
                  You answered {score} out of {questionSet.length} correctly in
                  the {currentTopic.label.toLowerCase()} set.
                </p>

                <div className="results-grid">
                  <article>
                    <span>Accuracy</span>
                    <strong>{accuracy}%</strong>
                  </article>
                  <article>
                    <span>Questions done</span>
                    <strong>{questionSet.length}</strong>
                  </article>
                  <article>
                    <span>Papers covered</span>
                    <strong>{papers.length}</strong>
                  </article>
                </div>

                <button
                  type="button"
                  className="primary-button"
                  onClick={startSession}
                >
                  <RotateCcw size={18} />
                  Try again
                </button>
              </div>
            )}

            {started && !finished && current && (
              <div className="question-card">
                <div className="question-meta">
                  <span className="question-tag question-tag-topic">
                    <TopicIcon type={current.type} />
                    {current.topic}
                  </span>
                  <span className="question-tag question-tag-paper">
                    {current.paper}
                  </span>
                </div>

                <h3 className="question-title">{current.question}</h3>

                <div className="answers-grid">
                  {current.options.map((option, optionIndex) => {
                    const optionState = getOptionState(optionIndex);

                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleChoice(optionIndex)}
                        className={`answer-button answer-button-${optionState}`}
                      >
                        <span>{option}</span>
                        {optionState === "correct" && (
                          <CheckCircle2 size={18} />
                        )}
                        {optionState === "wrong" && <XCircle size={18} />}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="feedback-card">
                    <p>
                      <strong>Explanation:</strong> {current.explanation}
                    </p>

                    <button
                      type="button"
                      className="primary-button"
                      onClick={handleNext}
                    >
                      {index + 1 === questionSet.length
                        ? "Finish session"
                        : "Next question"}
                      <ArrowRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>
        </section>
      </div>
    </div>
  );
}

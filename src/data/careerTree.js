import { projectEnrichment } from "./excelEnrichment.js";
import { courseResearchByTitle } from "./courseResearch.js";
import bikeImageOne from "../assets/media/bombay-boston-bike/bike-01.jpeg";
import bikeImageTwo from "../assets/media/bombay-boston-bike/bike-02.jpeg";
import bikeImageThree from "../assets/media/bombay-boston-bike/bike-03.jpeg";
import bikeImageFour from "../assets/media/bombay-boston-bike/bike-04.jpeg";
import bikeImageFive from "../assets/media/bombay-boston-bike/bike-05.jpeg";

const classProfessorPlaceholder = {
  name: "Professor name to be added",
  headshot: "",
  website: "",
  linkedin: "",
};

const projectPlaceholders = (titles) =>
  titles.map((title) => ({
    title,
    line: "Placeholder for final story text, evidence, links, references, and photo/video.",
    ...(projectEnrichment[title] || {}),
    title,
  }));

const classPlaceholders = (titles) =>
  titles.map((title) => {
    const courseResearch = courseResearchByTitle[title] || {};

    return {
      title,
      type: "class",
      line: "Class taken during the Global Exposure phase. Add learning notes, professor details, links, and reflections here.",
      professor: classProfessorPlaceholder,
      ...courseResearch,
      professor: {
        ...classProfessorPlaceholder,
        ...(courseResearch.professor || {}),
      },
      title,
    };
  });

const bombayBostonBikeGallery = [
  {
    src: bikeImageOne,
    alt: "Ronak with a blue bicycle on a Boston street at sunset.",
    caption: "Boston street ride with the restored bike.",
  },
  {
    src: bikeImageTwo,
    alt: "Ronak repairing a bicycle wheel indoors.",
    caption: "Repairing and rebuilding the bicycle in Cambridge.",
  },
  {
    src: bikeImageThree,
    alt: "A bicycle frame installed as a wall clock with Boston and Mumbai time.",
    caption: "The Bombay Boston Bike clock installation.",
  },
  {
    src: bikeImageFour,
    alt: "Ronak sitting near the blue bicycle by the Charles River.",
    caption: "The bike in Boston, between movement and memory.",
  },
  {
    src: bikeImageFive,
    alt: "A room with the bicycle clock mounted above a sofa.",
    caption: "The bike clock as part of the Cambridge living space.",
  },
];

export const stages = [
  {
    id: "roots",
    title: "Roots",
    short: "Origin",
    color: "#0197F6",
    icon: "roots",
    description:
      "A journey from childhood constraint to creative agency where tinkering, identity, agency, and education first began to take shape.",
    roles: ["origins", "identity", "agency", "education"],
  },
  {
    id: "early-career",
    title: "Early Career",
    short: "Practice",
    color: "#8EE968",
    icon: "graduation",
    description:
      "The first professional stage where making, teaching, coaching, and execution became visible forms of work.",
    roles: ["innovation-coach", "makerspace-builder", "stem-educator", "project-manager"],
  },
  {
    id: "program-leadership",
    title: "Program Leadership",
    short: "Scale",
    color: "#F4DA2D",
    icon: "wrench",
    description:
      "The shift from delivering activities to leading complex public programs, operations, partners, and learning systems.",
    roles: ["federal-grant-operations", "program-management", "stakeholder-orchestration", "learning-design"],
  },
  {
    id: "policy-innovation",
    title: "Policy Innovation",
    short: "Policy",
    color: "#FE9920",
    icon: "network",
    description:
      "Where innovation moved from projects into strategy, advocacy, public institutions, and government systems.",
    roles: ["innovation-lead", "policy-design-advocacy", "strategic-ideation", "government-relations"],
  },
  {
    id: "global-exposure",
    title: "Global Exposure",
    short: "World",
    color: "#A41034",
    icon: "brain",
    description:
      "The Harvard and MIT phase, where lived experience met global theory, systems, AI, and new ways of learning.",
    roles: ["bombay-boston-bike", "expert-learner", "systems-thinker", "hackathon-hacker", "ai-research-fellow"],
  },
  {
    id: "systems-thinking",
    title: "Systems Thinking",
    short: "Ecosystem",
    color: "#7F00FF",
    icon: "orbit",
    description:
      "The canopy of the work, where ecosystems, strategy, policy entrepreneurship, and storytelling become one connected practice.",
    roles: ["ecosystem-architect", "strategic-advisor", "policy-entrepreneur", "author-storyteller"],
  },
  {
    id: "lifelong-learning",
    title: "Lifelong Learning",
    short: "Seeker",
    color: "#D946EF",
    icon: "sparkles",
    description:
      "The continuing seed of the journey, where expertise returns to humility, inquiry, and service.",
    roles: ["seeker"],
  },
];

export const roleOrder = stages.flatMap((stage) => stage.roles);

export const roleData = {
  origins: {
    id: "origins",
    title: "Origins",
    stage: "roots",
    opening: "Where childhood, scarcity, and jugaad first shaped the instinct to make.",
    details: ["Childhood", "Scarcity", "Jugaad", "Family"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Cardboard Prototyping - Race Track",
      "Cardboard Prototyping - Comics TV",
      "Making Legal Documents",
      "Fixing Bicycles",
    ]),
    method: ["Observe", "Repair", "Learn", "Make", "Serve"],
    reflection:
      "Before innovation became policy, it was simply the act of making something work with what we had.",
  },
  identity: {
    id: "identity",
    title: "Identity",
    stage: "roots",
    opening: "How repair, craft, and constraint became a way of seeing the world.",
    details: ["Repair", "Craft", "Constraint", "Selfhood"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Aircraft Engines",
      "Fixing Photocopier Machines",
      "Fixing Computers",
      "Tinkering Identity",
    ]),
    method: ["Take Apart", "Understand", "Rebuild", "Improve"],
    reflection: "Tinkering gave me identity. It made me useful, confident, and able to create value.",
  },
  agency: {
    id: "agency",
    title: "Agency",
    stage: "roots",
    opening: "The confidence and dignity that come from solving with your own hands.",
    details: ["Confidence", "Dignity", "Ownership", "Usefulness"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Confidence Gain with AIESEC",
      "Curiosity as a Lifestyle and Curriculum",
      "Resilience and Jugaad Innovation",
      "Hands-on Learning, Learning to Serve",
    ]),
    method: ["Notice", "Act", "Solve", "Serve"],
    reflection:
      "Agency is the first freedom. The day I believed I could do something about a problem, my life changed.",
  },
  education: {
    id: "education",
    title: "Education",
    stage: "roots",
    opening: "Learning not as instruction alone, but as curiosity, making, and purpose.",
    details: ["Mechanical Engineering", "Curiosity", "Making", "Purpose"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Mechanical Engineering",
      "Indian Railways Internship",
      "Bharat Petroleum Internship",
      "Graduation Project on Magnetic Levitation",
    ]),
    method: ["Observe", "Question", "Make", "Reflect", "Apply"],
    reflection:
      "Education became meaningful when it moved from instruction to curiosity, from marks to making, and from learning to purpose.",
  },
};

export const defaultRoleContent = {
  "innovation-coach": {
    title: "Innovation Coach",
    opening: "Helping learners and teams move from raw ideas to prototypes, confidence, and action.",
    details: ["Ideation", "Prototyping", "Mentoring", "Confidence"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Building the First Atal Tinkering Lab",
      "Advocacy for Tinkering",
      "Teacher Training and Capacity Building",
      "Publications and Achievements",
    ]),
  },
  "makerspace-builder": {
    title: "Makerspace Manager",
    opening: "Building spaces where tools, curiosity, and community help people learn by making.",
    details: ["Tools", "Space", "Community", "Hands-on"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Community Management",
      "Makerspace Operations",
      "STEAM School",
      "Fixed Wing Drones, Soapbox Race",
    ]),
  },
  "stem-educator": {
    title: "STEM Educator",
    opening: "Making science, technology, engineering, and mathematics tangible, joyful, and useful.",
    details: ["STEM", "Projects", "Students", "Joy"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Robotics Coaching and Mentoring",
      "Competition Participation and Design",
      "STEM Mentoring",
      "Teaching Models Design",
    ]),
  },
  "project-manager": {
    title: "Project Manager",
    opening: "Turning ideas into action through people, timelines, resources, and disciplined follow-through.",
    details: ["Planning", "Teams", "Execution", "Outcomes"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Letsintern.com",
      "Mumbai Developer Circles Curator",
      "Light and Kinetic Artwork",
      "Creative Projects and Failed Realtor",
    ]),
  },
  "federal-grant-operations": {
    title: "Federal Grant Operations",
    opening: "Designing and managing grant systems that turn public intent into institutional action.",
    details: ["Grant Systems", "Compliance", "Operations", "Public Impact"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Financial Compliance and GFR",
      "Beneficiary Management",
      "Screening and Selection",
      "Government Funding Mechanisms",
    ]),
  },
  "program-management": {
    title: "Program Management",
    opening: "Turning ambition into timelines, teams, budgets, field execution, and measurable outcomes.",
    details: ["Execution", "Teams", "Timelines", "Outcomes"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Authoring Federal Guidelines",
      "Competitions and Contests",
      "National Level Competition",
      "National Level Program for Teachers",
    ]),
  },
  "stakeholder-orchestration": {
    title: "Stakeholder Orchestration",
    opening:
      "Bringing government, schools, corporates, mentors, educators, and civil society into one shared rhythm of action.",
    details: ["Government", "Partners", "Schools", "Mentors"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Designing the MoU Strategy for the Government",
      "Partnership Management",
      "Strategic Engagement and Mentor of Change",
      "International Collaborations",
    ]),
  },
  "learning-design": {
    title: "Learning Design",
    opening: "Designing learning experiences that move from curiosity to confidence, from activity to capability.",
    details: ["Curriculum", "Activities", "Teachers", "Learners"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Curriculum Design",
      "Learning Strategy",
      "Capacity Building of Educators",
      "Objective Based Curriculum",
    ]),
  },
  "innovation-lead": {
    title: "Innovation Lead",
    opening: "Driving innovation strategy, program design, and ecosystem action at scale.",
    details: ["Innovation", "Strategy", "Ecosystem", "Scale"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "San Sadhan Hackathon and Zootopia",
      "ATL Analytical Paper",
      "Mentoring Next Generation of Team Members",
      "Culture Building of Innovation Arm of a Nation",
    ]),
  },
  "policy-design-advocacy": {
    title: "Policy Design and Advocacy",
    opening:
      "Translating evidence, field experience, and public purpose into policy arguments, frameworks, and adoption pathways.",
    details: ["Evidence", "Advocacy", "Frameworks", "Adoption"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "ATL Handbook 1.0 and 2.0",
      "AIM Curriculum and Guidelines for Next Schools",
      "Procurement Strategy",
      "State Level Adoption",
    ]),
  },
  "strategic-ideation": {
    title: "Strategic Ideation",
    opening: "Generating, testing, and shaping ideas that can become programs, partnerships, and policy instruments.",
    details: ["Ideas", "Strategy", "Pilots", "Scale"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Language Inclusive Program for Innovation",
      "AIM 2.0 Ideation",
      "Strategy for Viksit Bharat",
      "To Be Defined",
    ]),
  },
  "government-relations": {
    title: "Government Relations",
    opening:
      "Working with public institutions, administrators, and leaders to build trust, alignment, and implementation pathways.",
    details: ["Trust", "Alignment", "Governance", "Execution"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Rashtrapati Bhawan and International Programs",
      "Inspreneur",
      "Global Adoption for Makerspaces",
      "State-Centre Partnerships - Jammu and Kashmir Frontier Innovation",
    ]),
  },
  "expert-learner": {
    title: "Expert Learner",
    opening: "Learning from global institutions, mentors, and frameworks to sharpen lived experience.",
    details: ["Harvard", "MIT", "Global Ideas", "Application"],
    projectsTitle: "Classes Taken",
    projects: classPlaceholders([
      "How People Learn",
      "Evidence",
      "Leading Change",
      "Language Equity",
      "Education Policy and Analysis",
      "Global International Comparative Education",
      "Leadership, Entreprenurship, and Learning",
      "Product Management and Society",
      "Public Narrative",
      "Informal Learning for Children",
      "Data for Impact",
      "Building and Sustaining a Successful Enterprise",
      "System Dynamics",
      "Learning Creative Learning",
      "Negotiation",
      "Social Entreprenurship and Systems Change",
      "Power and Influence for Positive Impact",
      "Launching Technology Ventures",
      "AI Venture Studio",
    ]),
  },
  "systems-thinker": {
    title: "Systems Thinker",
    opening: "Seeing connections between people, policies, institutions, incentives, culture, and time.",
    details: ["Systems", "Leverage", "Feedback", "Change"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "LearnLaunch Accelerator Mentor",
      "Adoption of Tinkering in Egypt",
      "Policy in Finland",
      "System Dynamics",
    ]),
  },
  "hackathon-hacker": {
    title: "Hackathon Hacker",
    opening: "Using time-bound creation to test ideas, build teams, and turn urgency into prototypes.",
    details: ["Speed", "Teams", "Prototypes", "Pitch"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "MIT Policy Hackathon Winner",
      "Smart India Hackathon Jury",
      "Smart India Hackathon Mentor",
      "Hacknation Formal Team",
    ]),
  },
  "ai-research-fellow": {
    title: "AI Research Fellow",
    opening: "Exploring how AI can support education, work, policy, and public innovation responsibly.",
    details: ["AI", "Education", "Policy", "Responsibility"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "EDSAFE AI Alliance",
      "Managing the Future of Work",
      "Code.org TeachAI",
      "AI Venture Studio at MIT",
    ]),
  },
  "bombay-boston-bike": {
    title: "The Bombay Boston Bike",
    opening:
      "A Cambridge bicycle became transport, repair project, memory object, and a bridge between Bombay and Boston time.",
    details: ["Bike Repair", "Cambridge", "Memory Object", "Making"],
    projectsTitle: "Story and Gallery",
    gallery: bombayBostonBikeGallery,
    projects: [
      {
        title: "The Bombay Boston Bike",
        line: "A visual story of repair, movement, home-making, and a bicycle clock between Bombay and Boston. Description text will be added later.",
        context: "Global Exposure phase in Cambridge and Boston.",
        myRole: "Maker, repairer, rider, and storyteller.",
        work: "Restored and reused bicycle parts, then transformed the frame into a wall clock and living-space artifact.",
        impact: "Turns global exposure into a tangible maker story about place, memory, and adaptation.",
        gallery: bombayBostonBikeGallery,
        mediaCaption: "Slideshow of the Bombay Boston Bike journey.",
        sourceReference: "User-provided photo set",
        confidence: "High",
        gaps: "Final description text pending.",
      },
    ],
  },
  "ecosystem-architect": {
    title: "Ecosystem Architect",
    opening: "Designing environments where institutions, people, capital, knowledge, and culture reinforce one another.",
    details: ["Ecosystems", "Partners", "Platforms", "Scale"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Senior Fellow - Viksit Bharat Program",
      "Google for Education",
      "Future of Work and Economic Mobility",
      "World Bank WDR",
    ]),
  },
  "strategic-advisor": {
    title: "Strategic Advisor",
    opening:
      "Advising organizations and leaders on innovation systems, education strategy, partnerships, and long-term impact.",
    details: ["Strategy", "Institutions", "Leaders", "Impact"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "STEMpedia",
      "CreatED",
      "The Innovation Story",
      "Erehwon",
    ]),
  },
  "policy-entrepreneur": {
    title: "Policy Entrepreneur",
    opening: "Combining public purpose, institutional design, partnerships, and action to move ideas into systems.",
    details: ["Policy", "Action", "Partners", "Scale"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Government of NZ",
      "Hi AI Framework",
      "Awinya Innovation Institute",
      "Using AI for Innovation Policy Programming",
    ]),
  },
  "author-storyteller": {
    title: "Author and Storyteller",
    opening: "Turning experience into memory, memory into meaning, and meaning into stories that travel.",
    details: ["Book", "Essays", "Stories", "Legacy"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Book 10 to 10K",
      "Substack",
      "Talk at UX India Conference",
      "Articles and Op-Eds",
    ]),
  },
  seeker: {
    title: "Seeker",
    opening: "After every system, a question remains. I continue to learn, build, reflect, and serve.",
    details: ["Still Learning", "Still Building", "Still Questioning", "Still Becoming"],
    projectsTitle: "Definitive Projects",
    projects: projectPlaceholders([
      "Friends as Antidote Community",
      "Mentors Who Said Yes",
      "Bache-log and Student Legacy",
    ]),
  },
};

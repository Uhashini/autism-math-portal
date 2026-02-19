# Lab Evaluation - 2: Autism Math Learning Portal

## 1. Student Details
- **Name:** N. Uhashini
- **Roll No:** CB.SC.U4CSE23352
- **Course Code:** 22CSE314
- **Course Name:** Full Stack Web Development

---

## 2. About the Use Case
### Why this portal is Required for autism kids
Children with Autism Spectrum Disorder (ASD) often face significant challenges in traditional learning environments. They may struggle with abstract concepts, sensory overload, and unpredictable routines. This digital portal provides a controlled, predictable, and highly visual environment that caters to their specific cognitive styles, allowing them to learn at their own pace without the anxiety of a crowded classroom or complex interfaces.

### Challenges in autism kids that need to be improved using this portal
- **Sensory Sensitivity:** Many autistic children are overwhelmed by bright lights, loud noises, or complex UI. This portal addresses this through "Calm Mode".
- **Executive Functioning:** Difficulty in following multi-step instructions is mitigated by clear, singular task goals.
- **Abstract Mathematical Thinking:** Transitioning from "3" to the concept of "three items" is hard. The portal uses coins and snacks to make this concrete.
- **Social Anxiety:** Learning math through real-world scenarios (like shopping) prepares them for social interactions in a low-stakes environment.

### Highlights and novelty proposed in this portal
- **Dual-Mode Sensory UI:** Users can toggle between standard engagement mode and a sensory-friendly "Calm Mode" with a single click.
- **Adaptive Gamification:** The portal uses a star-based reward system that adjusts difficulty based on the child's success rate, preventing frustration.
- **Real-world Metaphors:** Math is taught through "Snack Shop" (currency) and "Pizza Builder" (fractions), making it immediately applicable to life.

### Importance of visualisation in relevance to the portal aspects
Visualization is the bridge between abstract numbers and tangible understanding. In this portal, a fraction like "1/2" is not just a symbol; it is half a pizza. A debt of "₹5" is represented by missing coins. By seeing mathematical relationships visually, autistic children can build a strong foundational mental model that text-based learning often fails to provide.

---

## 3. List of operations in the portal
| Operation Name | Expected Output | List of concepts used from ReactJS | How the concept has helped to improve the application |
| :--- | :--- | :--- | :--- |
| **Navigation Hub** | Centralized access to all learning modules. | `React Router`, `Link`, `Components` | Provided a predictable and consistent entry point, which reduces navigational anxiety. |
| **Snack Shop Game** | Interactive currency calculation challenges. | `useState`, `props`, `Event Handling` | Enabled real-time update of prices and coin totals without page reloads, providing instant feedback. |
| **Pizza Fraction Builder** | Visual construction of fractions using pizza slices. | `State Management`, `Conditional Rendering` | Linked abstract fraction symbols to visual parts, making the logic tangible for the user. |
| **Calm Mode Toggle** | Instant UI shift to muted colors and no animations. | `Context API`, `CSS Variables`, `useEffect` | Allowed a global UI change across all pages instantly to accommodate sensory sensitivities. |
| **Performance Dashboard** | Real-time tracking of stars, accuracy, and streaks. | `Context API`, `Local Storage`, `Array Mapping` | Persisted progress data across sessions, allowing the child to feel a sense of continuous achievement. |
| **Session Timer** | Real-time tracking of time spent in learning. | `useEffect`, `setInterval`, `useState` | Helps parents monitor engagement duration and prevents over-stimulation. |

---

## 4. Improvement the application brings to the autism kids
- **Memory Improvement:** The repetitive yet engaging nature of the currency games helps strengthen short-term memory through visual patterns.
- **Contextual Learning:** By simulating a shop and a kitchen, the application teaches "Functional Math"—knowing how much change to get back or how to share food.
- **Attention Span:** The minimal, focused UI helps keep the child on-task for longer durations.
- **Confidence Building:** The error-free feedback mechanism ensures that "wrong" answers are treated as opportunities to try again, reducing the fear of failure.

---

## 5. Outputs with Explanation
### A. Product Description Page
**Explanation:** This page contains the detailed documentation of the project, including student info, teacher details, and the strategic vision of the portal. It serves as the primary technical reference.

### B. Member Details Page
**Explanation:** A dedicated professional profile page showing the student's name, roll number, photo, and academic affiliation, fulfilling the "member detail" requirement.

### C. Snack Shop Module
**Explanation:** An interactive game where children buy items and calculate change. It uses high-contrast icons for currency to facilitate easy identification.

### D. Pizza Builder Module
**Explanation:** A visual fraction builder. It uses "Ghost Outlines" to help the child understand where parts of a whole belong.

### E. Dashboard
**Explanation:** Displays the child's collection of stars and accuracy levels in different games. It uses positive reinforcement to encourage daily play.

---

## 7. List of similar products
| URL | Description | Features |
| :--- | :--- | :--- |
| [Proloquo2Go](https://www.assistiveware.com/products/proloquo2go) | Symbol-based communication & learning. | 1. Visual symbols, 2. Multilingual support, 3. Custom boards, 4. Research-based vocabulary, 5. High-quality voices |
| [Khan Academy Kids](https://learn.khanacademy.org/khan-academy-kids/) | Interactive educational games for early learners. | 1. Adaptive learning, 2. Interactive books, 3. Reward system, 4. Multi-subject, 5. Offline access |
| [ABCmouse](https://www.abcmouse.com/) | Comprehensive learning portal for young children. | 1. Step-by-step path, 2. 10,000+ activities, 3. Tickets & Rewards, 4. Progress tracking, 5. Child-friendly UI |
| [Starfall](https://www.starfall.com/) | Phonemic awareness and early math portal. | 1. Audio-visual cues, 2. Game-based learning, 3. Minimalist design, 4. Incremental difficulty, 5. Printable resources |

---

## 8. List of research labs working in the same area
| Lab Name | URL | Professor Details |
| :--- | :--- | :--- |
| **Affective Computing Group** | [MIT Media Lab](https://www.media.mit.edu/groups/affective-computing/) | Prof. Rosalind Picard (Focus: Emotion AI for Autism) |
| **Interactive Media Lab** | [University of Toronto](https://iml.utoronto.ca/) | Prof. Mark Chignell (Focus: Healthcare UI/UX) |
| **CREATE Lab** | [NYU Steinhardt](https://steinhardt.nyu.edu/create) | Prof. Jan Plass (Focus: Educational Game Design) |

---

## 9. What are the algorithms implemented in this product?
- **Global State Synchronization:** Uses the React Context API to ensure that game scores, stars, and user settings are synchronized across all five pages in real-time.
- **Adaptive Level Scaling:** A logic that calculates the user's "Accuracy Percentage" and adjusts the range of numbers in the Snack Shop (e.g., shifting from ₹10 targets to ₹50 targets).
- **Spaced Repetition Logic:** The question generator ensures that previously failed concepts are reintroduced after three successful simple tasks.
- **Persistence Algorithm:** Use of LocalStorage serialization to ensure user progress (stars/streak) is not lost when the browser is closed.

---

## 10. Feature enhancements and justification
1. **Bio-feedback Stress Detection:** Use webcam-based pulse detection to identify when a child is getting frustrated and automatically suggest a "Calm Mode" break.
2. **AR-Integrated Pizza Builder:** Using Augmented Reality to let children place virtual pizza slices on their real kitchen table, bridging the gap between digital and physical world.
3. **Voice-Activated Navigation:** To support children with fine motor impairments who find clicking difficult.
4. **Parental Real-time Mirroring:** Allow a parent to see the child's screen on their phone and provide subtle "hints" through the portal.

---

## 11. Laboratory Details
- **Lab Name:** Full Stack Web Development Lab
- **Course Code:** 22CSE314
- **Course Name:** Full Stack Web Development
- **Course Teacher:** 
  **Dr. T. Senthil Kumar**
  Professor, Amrita School of Computing
  Amrita Vishwa Vidyapeetham, Coimbatore - 641112
  **Email:** t_senthilkumar@cb.amrita.edu
- **GitHub Repository:** [https://github.com/uhashini/autism-math-portal](https://github.com/uhashini/autism-math-portal)
- **Collaborator - Academic:** Amrita Vishwa Vidyapeetham
- **Collaborator - Industry:** Microsoft Philanthropies / Education AI Division

const page = (eyebrow, heading, body, visual = 'image', extra = {}) => ({
  eyebrow, heading, body, visual, ...extra
})

export const activities = [
  {
    id: 1, title: 'STARS ACTIVITY', short: 'Stars Photo', building: 'observatory',
    x: 410, y: 300, color: '#f4c66a',
    description: 'A record of the questions answered during class and the 18.5 stars awarded for participation.',
    pages: [
      page('CLASS PARTICIPATION · 01', 'Earning stars through questions', 'During class, the faculty asked questions randomly and awarded stars to students who answered. I earned 18.5 stars through my participation.', 'photo', {images:[{src:'/portfolio/activity-01/image-00.jpeg',caption:'Stars activity photograph'}]}),
      page('QUESTIONS I ANSWERED · 02', 'Topics covered along the way', 'Some of the questions I answered included:', 'question', {bullets:['Explain method overloading','What is the __init__ function?','Basics of Python','Why is Python preferred over other languages?','NumPy array','Draw the Venn diagram for intersection'],note:'A small collection of class questions and participation evidence.'})
    ]
  },
  {
    id: 2, title: 'STORYBOARDING', short: 'Storyboard', building: 'cottage',
    x: 790, y: 230, color: '#e9a76e',
    description: 'A creative storyboard task: turn a given concept into a simple, innovative and catchy comic-style scenario.',
    pages: [
      page('CREATIVE TASK · 01', 'Turning a concept into a story', 'The task was to create a comical storyboard around a scenario. The aim was to make the idea innovative, simple to understand and catchy, using a sequence of visual scenes rather than a conventional explanation.', 'story'),
      page('STORYBOARD ART · 02', 'The visual sequence', 'The storyboard presents the task through a visual narrative. The supplied board is included here as the activity record.', 'gallery', {images:[{src:'/portfolio/activity-02/image-00.png',caption:'Storyboard created for the activity'}]})
    ]
  },
  {
    id: 3, title: 'PYTHON TUTORIAL AND FRONTEND DESIGN', short: 'Python Discussion', building: 'school',
    x: 1160, y: 390, color: '#a8d4ed',
    description: 'A team activity to design a frontend for LinguaConnect, a concept for Tamil speakers learning Telugu and Telugu speakers learning Tamil.',
    pages: [
      page('TEAM DESIGN TASK · 01', 'Introducing LinguaConnect', 'We were split into teams and asked to create a frontend for a project idea. Our idea was LinguaConnect, a platform where people could learn Telugu if they speak Tamil, and vice versa.', 'classroom', {links:[{label:'Open the LinguaConnect prototype',url:'https://prize-pink-18918455.figma.site/',kind:'external'}]}),
      page('DESIGN GALLERY · 02', 'Screens from the design process', 'These photographs document the frontend design activity and its visual work.', 'gallery', {images:[{src:'/portfolio/activity-03/image-00.jpeg',caption:'Frontend design screenshot 1'},{src:'/portfolio/activity-03/image-02.jpeg',caption:'Frontend design screenshot 2'},{src:'/portfolio/activity-03/image-01.jpeg',caption:'Frontend design screenshot 3'}]})
    ]
  },
  {
    id: 4, title: 'SLEEP & CIRCADIAN RHYTHM SOLUTION', short: 'Circadia', building: 'lab',
    x: 1510, y: 270, color: '#91d9c1',
    description: 'Circadia is a proposed IoT-based sleep and circadian rhythm support system. It monitors sleep patterns and the surrounding environment, then helps users build more consistent sleep routines through personalized schedules, smart lighting and reminders.',
    pages: [
      page('SLEEP TECHNOLOGY · 01', 'Introducing Circadia', 'Circadia is a proposed smart sleep and circadian rhythm regulation system. It combines wearable and environmental sensors with a mobile application to monitor sleep patterns, identify irregular routines and support healthier sleep-wake schedules through personalized guidance and automated environmental adjustments.', 'blueprint', {note:'A proposed assistive IoT concept, not a medical diagnostic device.'}),
      page('SYSTEM COMPONENTS · 02', 'What makes the system work', 'An ESP32 acts as the central controller. A MAX30102 sensor monitors heart rate and blood oxygen levels, while an MPU6050 tracks movement during sleep. An LDR measures ambient light, and a DHT22 monitors temperature and humidity. A smart LED strip, buzzer or smart speaker, and relay-controlled devices provide environmental adjustments and reminders. The mobile application and Firebase store readings and present the user’s sleep history.', 'document', {bullets:['ESP32 microcontroller','MAX30102 heart-rate and SpO₂ sensor','MPU6050 motion sensor','LDR light sensor','DHT22 temperature and humidity sensor','Smart LED strip, buzzer / smart speaker and relay','Mobile application and Firebase cloud storage']}),
      page('DATA FLOW · 03', 'From monitoring to guidance', 'The sensors collect sleep and room-environment readings and send them to the ESP32. The controller transfers the data to the mobile application and cloud service over Wi-Fi or Bluetooth. The application reviews sleep duration, interruptions, routine consistency and environmental conditions, then provides a personalized sleep schedule and reminders. Smart lighting can gradually adjust in the evening and morning to support the planned sleep-wake routine.', 'diagram', {bullets:['Monitor sleep-related movement and available physiological readings','Measure room light, temperature and humidity','Send readings to the app and Firebase','Review sleep duration, interruptions and schedule consistency','Provide reminders and a personalized routine','Adjust smart lighting and trigger alarms at scheduled times']}),
      page('USER EXPERIENCE · 04', 'How Circadia helps', 'For someone with an inconsistent sleep schedule, Circadia can track the timing and continuity of sleep, highlight patterns in the collected readings, and suggest a gradual shift toward a more regular routine. In the evening, lighting can be dimmed according to the schedule; in the morning, lights and alarms can help signal wake-up time. The app displays sleep summaries and sends notifications so the user can follow the routine consistently.', 'document', {note:'The system supports sleep-habit monitoring and routine management. It does not diagnose or treat sleep disorders; sensor readings and schedule suggestions should be treated as guidance.'})
    ]
  },
  {
    id: 5, title: 'CLASS QUIZ', short: 'Class Quiz', building: 'quiz',
    x: 1780, y: 650, color: '#f0cf75',
    description: 'A class quiz conducted in 10 teams on topics covered up to that point. Our team secured 7th place.',
    pages: [
      page('CLASS CHALLENGE · 01', 'Ten teams, one quiz', 'The class was divided into 10 teams and a quiz was conducted on the topics covered till then. I attempted the quiz and contributed answers with my team using the Quizizz platform.', 'quiz', {images:[{src:'/portfolio/activity-05/image-00.jpeg',caption:'Class quiz screenshot'}]}),
      page('QUIZ RECORD · 02', 'Our result', 'Our team finished in 7th place. The screenshots preserve the quiz activity and its result.', 'gallery', {images:[{src:'/portfolio/activity-05/image-00.jpeg',caption:'Quiz activity'},{src:'/portfolio/activity-05/image-01.jpeg',caption:'Quiz result / question view'}],note:'Team position: 7th out of 10 teams.'})
    ]
  },
  {
    id: 6, title: 'MEDIUM BLOG', short: 'Medium Blog', building: 'library',
    x: 1510, y: 1010, color: '#e9b2c5',
    description: 'A Medium blog reflecting on my experience with Python from schooling to college.',
    pages: [
      page('PERSONAL REFLECTION · 01', 'A programming journey', 'I wrote a blog about my experience with Python, looking back from my schooling years through college. The article is published on Medium.', 'book', {links:[{label:'Read the Medium article',url:'https://medium.com/@ganeshprakadesh.p2023/i-used-to-code-for-fun-somewhere-along-the-way-i-forgot-how-395349b73e92',kind:'external'}]}),
      page('PUBLISHED ARTICLE · 02', 'The article preview', 'A screenshot from the published blog is included below. Open the article link to read the complete reflection.', 'document', {images:[{src:'/portfolio/activity-06/image-00.png',caption:'Medium article screenshot'}],links:[{label:'Open the full article on Medium',url:'https://medium.com/@ganeshprakadesh.p2023/i-used-to-code-for-fun-somewhere-along-the-way-i-forgot-how-395349b73e92',kind:'external'}]})
    ]
  },
  {
    id: 7, title: 'BUSINESS THESIS FOR PROJECT', short: 'Audio Website', building: 'studio',
    x: 1120, y: 1190, color: '#d2b3f2',
    description: 'A business thesis and recorded explanation for LogScope, a lightweight platform intended to make application log analysis and error diagnosis easier.',
    pages: [
      page('BUSINESS THESIS · 01', 'The idea behind LogScope', 'The thesis explains the problem of manually inspecting large application logs and presents LogScope as a way to upload logs, identify and group errors, and review possible causes and fixes. The recording and submitted transcript are available below.', 'audio', {audio:'/portfolio/activity-07/recording-01.mp3',audioLabel:'Business thesis recording',previews:[{src:'/portfolio/activity-07/document-preview.png',href:'/portfolio/activity-07/document-00.pdf',label:'Business thesis submission · PDF preview'}],links:[{label:'Open / download the business thesis PDF',url:'/portfolio/activity-07/document-00.pdf',kind:'file'},{label:'Open the business thesis recording online',url:'https://drive.google.com/file/d/1eIwubqMVQA8M6GdsszXqrdCntXqyXUHL/view?usp=drive_link',kind:'external'}]}),
      page('LISTEN & REVIEW · 02', 'The recorded explanation', 'Listen to the submitted audio recording here, or open the accompanying PDF to view its transcript.', 'document', {audio:'/portfolio/activity-07/recording-01.mp3',audioLabel:'Listen to the business thesis',links:[{label:'View the transcript and submission PDF',url:'/portfolio/activity-07/document-00.pdf',kind:'file'}]})
    ]
  },
  {
    id: 8, title: 'PROJECT PRESENTATION', short: 'Website PPT', building: 'hall',
    x: 730, y: 1110, color: '#f2a987',
    description: 'A presentation for LogScope: a lightweight log analysis and error diagnosis platform.',
    pages: [
      page('PROJECT PRESENTATION · 01', 'Introducing LogScope', 'The presentation introduces LogScope as a platform for turning application logs into actionable insights. It outlines the problem of manually searching through large log files and the idea of grouping related errors with severity, context and next steps.', 'slides', {previews:[{src:'/portfolio/activity-08/document-preview.png',href:'/portfolio/activity-08/document-00.pdf',label:'LogScope presentation · slide preview'}],links:[{label:'Open / download the complete LogScope presentation',url:'/portfolio/activity-08/document-00.pdf',kind:'file'}]}),
      page('PRESENTATION FILE · 02', 'Explore the complete deck', 'The supplied LogScope PDF contains the full presentation. Open it to browse all slides.', 'document', {links:[{label:'View the complete LogScope presentation (PDF)',url:'/portfolio/activity-08/document-00.pdf',kind:'file'}]})
    ]
  },
  {
    id: 9, title: 'PROJECT DEMONSTRATION', short: 'Demo Video', building: 'cinema',
    x: 350, y: 930, color: '#f0d28a',
    description: 'A recorded demonstration of LogScope, the lightweight log analysis and error diagnosis platform.',
    pages: [
      page('PROJECT WALKTHROUGH · 01', 'See LogScope in action', 'LogScope is designed to accept application log files, parse their entries, identify and group error patterns, and present possible causes and troubleshooting suggestions through a dashboard.', 'video', {links:[{label:'Watch the LogScope project demonstration',url:'https://drive.google.com/file/d/1tdbSxT50BcWl81pf8k5mmy-lZzn9hnsx/view?usp=drive_link',kind:'external'}]}),
      page('WHAT THE DEMO COVERS · 02', 'From raw logs to diagnosis', 'The project focuses on making large log files easier to investigate by organizing detected errors, severity information, repeated patterns and possible next steps. The demonstration video is hosted on Google Drive.', 'document', {links:[{label:'Open the demonstration video on Google Drive',url:'https://drive.google.com/file/d/1tdbSxT50BcWl81pf8k5mmy-lZzn9hnsx/view?usp=drive_link',kind:'external'}]})
    ]
  },
  {
    id: 10, title: 'LEETCODE QUESTIONS WITH OOPS', short: 'Padlet', building: 'digital',
    x: 300, y: 590, color: '#9bc6ed',
    description: 'A Padlet activity in which six selected LeetCode questions were rephrased to incorporate OOP concepts, with answers.',
    pages: [
      page('PROBLEM REFRAMING · 01', 'Six questions, an OOP perspective', 'We selected six unique LeetCode questions and rephrased them to include object-oriented programming concepts. Answers were prepared for the reworked questions and uploaded to Padlet.', 'question'),
      page('SUBMISSION PREVIEW · 02', 'Assessment document', 'The supplied assessment PDF is available as a preview and as a complete document. It contains the submitted question-and-solution work.', 'document', {previews:[{src:'/portfolio/activity-10/document-preview.png',href:'/portfolio/activity-10/document-00.pdf',label:'Assessment submission · PDF preview'}],links:[{label:'Open / download the complete assessment PDF',url:'/portfolio/activity-10/document-00.pdf',kind:'file'}]})
    ]
  },
  {
    id: 11, title: 'LOGSCOPE PROJECT WRITE-UP', short: 'LogScope Write-up', building: 'loglab',
    x: 1870, y: 930, color: '#73d9d0',
    description: 'The final project write-up documents LogScope, a lightweight log analysis and error diagnosis platform, including its motivation, architecture, technology stack, API integration, intended users, inputs and outputs.',
    pages: [
      page('FINAL PROJECT · 01', 'LogScope: from logs to insights', 'LogScope aims to help developers and support teams turn raw application logs into organized diagnostic information. It parses logs, identifies and groups errors, examines potentially related events, and presents rule-based explanations and troubleshooting suggestions. Its intended community knowledge feature keeps user-submitted fixes separate from normal diagnosis.', 'document', {previews:[{src:'/portfolio/activity-11/document-preview.png',href:'/portfolio/activity-11/logscope-project-writeup.pdf',label:'LogScope project write-up · cover preview'}],links:[{label:'Open / download the complete 6-page project write-up',url:'/portfolio/activity-11/logscope-project-writeup.pdf',kind:'file'}]}),
      page('MOTIVATION & USP · 02', 'Why LogScope was proposed', 'Large application logs can contain hundreds or thousands of lines. Finding an ERROR line is not the same as understanding whether the cause is a missing table, unknown column, connection limit, programming exception or network timeout. LogScope proposes a lightweight upload-and-analysis workflow with grouped errors, readable diagnosis and a community knowledge mechanism.', 'book'),
      page('ARCHITECTURE · 03', 'A layered analysis workflow', 'The frontend accepts a log upload. Flask validates the request and coordinates parsing, error detection and analysis. The system extracts available timestamps, severity levels, messages, exceptions and stack-trace elements, groups repeated patterns, calculates statistics, and uses deterministic rules plus relevant stored knowledge to return structured results. Neon-hosted PostgreSQL stores reusable generalized knowledge; uploaded raw logs are intended to remain temporary.', 'blueprint'),
      page('TECH STACK & DATA · 04', 'Tools behind the platform', 'The documented stack includes HTML, CSS and JavaScript for the interface; Python and Flask for parsing, analysis and API routes; PostgreSQL hosted through Neon for reusable knowledge; HTTP APIs and JSON for application communication; and Vercel as the deployment platform. The core workflow analyzes user-supplied SQL/database, Minecraft, Python and Java logs. The write-up does not identify a fixed machine-learning training dataset.', 'document'),
      page('INTEGRATION · 05', 'LogScope and LogHealth', 'The write-up describes two API directions: LogHealth can send an error to LogScope for further analysis, and LogScope can send structured analysis results to LogHealth for import. API secrets are intended to remain server-side in environment variables. Cross-application operation requires testing against the implemented API contracts.', 'diagram'),
      page('USERS & OUTPUTS · 06', 'Who it is designed to help', 'Intended users include software developers, database administrators, Minecraft server administrators, IT support teams, students and small software teams. Inputs include uploaded log files and individual error details from LogHealth. Outputs include detected errors and warnings, severity and category information, grouped patterns, statistics, likely causes, troubleshooting suggestions, matching community fixes and structured JSON responses. Diagnosis is advisory and proposed fixes should be validated before use.', 'question', {links:[{label:'Read the complete project write-up (PDF)',url:'/portfolio/activity-11/logscope-project-writeup.pdf',kind:'file'}],note:'The full write-up contains the references and detailed component descriptions.'})
    ]
  }
]

export const world = { width: 2100, height: 1500 }

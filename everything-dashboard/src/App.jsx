import React, { useState } from 'react';
import { 
  Menu, 
  ArrowRight, 
  Search, 
  Bell, 
  ChevronRight, 
  Layout, 
  Star,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const navigateTo = (screen) => setCurrentScreen(screen);

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    navigateTo('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-black font-sans selection:bg-black selection:text-white">
      {currentScreen === 'intro' && <IntroScreen onNext={() => navigateTo('select')} />}
      {currentScreen === 'select' && <SubjectSelectionScreen onBack={() => navigateTo('intro')} onSelect={handleSelectSubject} />}
      {currentScreen === 'dashboard' && <DashboardScreen subject={selectedSubject} onBack={() => navigateTo('select')} />}
    </div>
  );
}

const TopNav = ({ rightAction, onLogoClick }) => (
  <nav className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
    <div
      className="flex items-center gap-2 cursor-pointer group"
      onClick={onLogoClick}
    >
      <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white transform transition-transform group-hover:-rotate-12">
        <Layout size={18} />
      </div>
      <span className="font-bold text-xl tracking-tight">Everything.</span>
    </div>
    <div className="flex items-center gap-4">
      {rightAction}
      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <Menu size={24} />
      </button>
    </div>
  </nav>
);

const PillButton = ({ children, onClick, dark = true, icon = null }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300
      ${dark
        ? 'bg-black text-white hover:bg-gray-800 hover:scale-105'
        : 'bg-white text-black border border-gray-200 hover:bg-gray-50'
      }
    `}
  >
    {children}
    {icon}
  </button>
);

function IntroScreen({ onNext }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <TopNav rightAction={<PillButton dark={true} onClick={onNext}>Get Started</PillButton>} />
        <main className="flex-1 flex flex-col justify-center px-6 md:px-12 max-w-6xl mx-auto w-full mb-20">
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-medium leading-[1.05] tracking-tight mb-8 max-w-4xl">
            Everything you need <br className="hidden md:block" /> to know.
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            A comprehensive, meticulously designed dashboard for all your learning and data needs.
            Built at the intersection of minimal design and robust technology.
          </p>
          <div className="flex items-center gap-4">
            <PillButton onClick={onNext} icon={<ArrowRight size={18} />}>
              Explore Subjects
            </PillButton>
          </div>
        </main>
        <div className="bg-black text-white p-8 md:p-12 rounded-t-[2.5rem] mt-auto mx-2 md:mx-6">
          <div className="flex justify-between items-center opacity-80 text-sm">
            <span>Â© 2026 Everything Platform</span>
            <span>Based on Minimalist Design Principles</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubjectSelectionScreen({ onBack, onSelect }) {
  const subjects = [
    { id: 1, title: 'Unit 1: Data Modeling and Visualization', category: 'Chapter 1' },
    { id: 2, title: 'Unit 2: EDA and Visualization Using R', category: 'Chapter 2' },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <TopNav
        onLogoClick={onBack}
        rightAction={<PillButton dark={false} onClick={onBack}>Go Back</PillButton>}
      />

      <main className="flex-1 px-6 md:px-12 max-w-7xl mx-auto w-full py-12">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-4">Select your Subject</h2>
          <p className="text-gray-500 text-lg">Choose a discipline to open your customized dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              onClick={() => onSelect(sub.title)}
              className="group bg-white border border-gray-100 p-8 rounded-3xl cursor-pointer hover:bg-black hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-16 transition-colors group-hover:bg-white/10">
                {/* Fallback layout icon if the external image fails */}
                <Layout className="w-8 h-8 text-black group-hover:text-white" />
              </div>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 mb-2 uppercase tracking-wider">
                {sub.category}
              </p>
              <h3 className="text-2xl font-medium tracking-tight flex justify-between items-center">
                {sub.title}
                <ChevronRight className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
              </h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// --- DATA CONTENT FROM DMV UNIT 1 ---
const dmvModules = [
  {
    id: 'm1',
    title: '1. Categories & Types of Data',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Categories and Types of Data</h2>
          <p className="mb-4">
            Before we can model or visualize data, we must understand its fundamental nature. We will study:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><strong>Data Types by Structure:</strong> Structured data (fixed schemas like SQL tables), Semi-Structured data (flexible schemas like JSON or XML), and Unstructured data (text, images, and videos).</li>
            <li><strong>Data Types by Measurement:</strong> Qualitative (Categorical) vs. Quantitative (Numerical) data, and Discrete (countable) vs. Continuous (measurable ranges) data.</li>
            <li><strong>Measurement Scales:</strong> Nominal (labeling), Ordinal (ordered), Interval (equal intervals, no true zero), and Ratio (true zero, allowing arithmetic) scales.</li>
          </ul>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">1. Categories of Data by Structure</h2>
          <p className="mb-6">
            When we build data systems, we must first look at the physical architecture of the data we are capturing. We categorize this into three specific types:
          </p>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-xl text-black mb-2">Structured Data</h4>
              <p className="mb-3">This is the most rigid and organized form of data. It follows a fixed, predefined schema or format and is perfectly suited to be stored in tables with distinct rows and columns. Because of its predictability, it is very easy to store, query, and analyze using SQL.</p>
              <p className="text-sm"><strong>Examples:</strong> Student records, employee tables, sales databases, and neatly tabulated sensor readings.</p>
              <p className="text-sm mt-1"><strong>Standard Tools:</strong> Relational Database Management Systems (RDBMS) like MySQL, Oracle, and SQL Server.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-xl text-black mb-2">Semi-Structured Data</h4>
              <p className="mb-3">This data is more flexible and does not follow a rigid table schema, but it still maintains some internal organization using tags or markers.</p>
              <p className="text-sm"><strong>Examples:</strong> XML files, JSON documents, log files, and emails.</p>
              <p className="text-sm mt-1"><strong>Standard Tools:</strong> NoSQL databases (like MongoDB) and specific XML/JSON parsers.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-xl text-black mb-2">Unstructured Data</h4>
              <p className="mb-3">This is the most complex form of data because it lacks any predefined format or schema entirely. It is notoriously difficult to analyze directly and requires highly advanced processing techniques to extract value.</p>
              <p className="text-sm"><strong>Examples:</strong> Images, text documents, videos, audio files, and raw social media posts.</p>
              <p className="text-sm mt-1"><strong>Standard Tools:</strong> Natural Language Processing (NLP) models, Computer Vision/Image Processing, and Deep Learning techniques stored in Data Lakes.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">2. Data Types by Measurement</h2>
          <p className="mb-6">Once data is collected, we must understand its mathematical properties before we can visualize or model it. We divide data into Qualitative and Quantitative types, and further subdivide numerical data.</p>
          
          <ul className="space-y-6">
            <li>
              <strong className="text-black text-lg block mb-1">Qualitative (Categorical) Data:</strong>
              <p className="mb-2">This data describes qualities or characteristics and cannot be measured numerically. We use this primarily for classification and grouping our records.</p>
              <p className="text-sm italic text-gray-500">Examples: Gender, Department, City, Color, or qualitative feedback like "Good" or "Bad".</p>
            </li>
            <li>
              <strong className="text-black text-lg block mb-1">Quantitative (Numerical) Data:</strong>
              <p className="mb-2">This represents measurable quantities that are strictly expressed in numbers, allowing for mathematical calculation and statistical analysis.</p>
              <p className="text-sm italic text-gray-500 mb-4">Examples: Age, Salary, Temperature, Height, and Marks.</p>
              
              <div className="ml-6 border-l-2 border-black pl-6 space-y-4">
                <p className="font-medium text-black">If your data is Quantitative, you must classify it further into one of two sub-types:</p>
                <div>
                  <strong className="text-black">Discrete Data:</strong> This type of data can only take specific, countable, and finite values. No intermediate fractions or decimals are possible between these values.<br/>
                  <span className="text-sm italic text-gray-500">Examples: The number of students in a class, the number of machines on a factory floor, or the count of defective items.</span>
                </div>
                <div>
                  <strong className="text-black">Continuous Data:</strong> This data can take absolutely any value within a given range, meaning there are infinite possible intermediate values (it can be measured to any number of decimal places).<br/>
                  <span className="text-sm italic text-gray-500">Examples: Exact weight, height, time duration, and temperature.</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">3. Measurement Scales of Data</h2>
          <p className="mb-6">This is perhaps the most crucial concept for your statistical modeling, my student. The "Scale" determines exactly what mathematical operations you are allowed to perform on a given feature. We classify scales by looking at three properties: Order, Equal Intervals, and a True Zero.</p>
          
          <div className="space-y-4">
             <div className="p-5 border border-gray-200 rounded-xl">
                <h4 className="font-bold text-lg text-black mb-2">Nominal Scale</h4>
                <p className="mb-2">The most basic scale. Data is categorized entirely without order. It is used strictly for labeling purposes.</p>
                <p className="text-sm mb-1"><strong>Properties:</strong> No order, no equal intervals, no true zero.</p>
                <p className="text-sm text-gray-500 italic">Examples: Blood group, Gender, City, and Department name.</p>
             </div>
             <div className="p-5 border border-gray-200 rounded-xl">
                <h4 className="font-bold text-lg text-black mb-2">Ordinal Scale</h4>
                <p className="mb-2">A step above nominal. Here, the data has a meaningful rank or order, but the exact difference (the interval) between the values cannot be measured.</p>
                <p className="text-sm mb-1"><strong>Properties:</strong> Has order, but NO equal intervals, and NO true zero.</p>
                <p className="text-sm text-gray-500 italic">Examples: Class ranks (1st, 2nd, 3rd) or customer satisfaction levels (Low, Medium, High).</p>
             </div>
             <div className="p-5 border border-gray-200 rounded-xl">
                <h4 className="font-bold text-lg text-black mb-2">Interval Scale</h4>
                <p className="mb-2">Now we introduce precise mathematical differences. This is ordered data with exactly equal intervals between points, but crucially, it lacks a true zero. A "true zero" means the absolute absence of the thing being measured.</p>
                <p className="text-sm mb-1"><strong>Properties:</strong> Has order, has equal intervals, but NO true zero.</p>
                <p className="text-sm text-gray-500 italic">Examples: Temperature in Celsius or Fahrenheit (0Â°C does not mean "no temperature", it is just a point on the scale), or Calendar years.</p>
             </div>
             <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
                <h4 className="font-bold text-lg text-black mb-2">Ratio Scale</h4>
                <p className="mb-2">The ultimate scale of measurement. It has all the properties of the interval scale, but it does possess a true zero point. Because it has a true zero, all arithmetic operations (addition, subtraction, multiplication, and division) are perfectly valid.</p>
                <p className="text-sm mb-1"><strong>Properties:</strong> Has order, has equal intervals, AND has a true zero.</p>
                <p className="text-sm text-gray-500 italic">Examples: Height, Weight, Age, Salary, and Distance.</p>
             </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'm2',
    title: '2. Data Preprocessing',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Data Preprocessing Overview</h2>
          <p className="mb-4">Raw data is often noisy and incomplete. I will teach you the exact flow to make data ready for analysis:</p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><strong>Data Cleaning:</strong> Handling missing values, removing outliers, and fixing duplicate records.</li>
            <li><strong>Data Integration:</strong> Merging data from multiple heterogeneous sources into a unified dataset.</li>
            <li><strong>Data Transformation:</strong> Converting data into a suitable format using techniques like normalization, aggregation, and encoding.</li>
            <li><strong>Data Reduction:</strong> Reducing data volume without losing critical information through feature selection, clustering, or dimensionality reduction.</li>
            <li><strong>Data Discretization:</strong> Converting continuous numeric values into simplified discrete intervals (e.g., converting an exact age into categories like "Young" or "Adult").</li>
          </ul>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Data Preprocessing Flow</h2>
          <p className="mb-6 text-lg">Let us break down each step in detail so you can secure that top rank:</p>
          
          <div className="space-y-8 relative">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200 hidden md:block"></div>
            
            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">1</div>
              <h3 className="text-2xl font-bold text-black mb-3">Data Cleaning</h3>
              <p className="mb-4">This is your very first line of defense. Data cleaning involves meticulously scrubbing your dataset to remove errors and significantly improve data quality.</p>
              <p className="text-sm mb-2"><strong>What we fix:</strong> We must handle missing values, smooth out noise, remove extreme outliers, delete duplicate records, and standardize any inconsistent data formats.</p>
              <p className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded-lg border border-gray-100"><strong>Real-world Example:</strong> If we are analyzing a smart campus system and a sensor fails to record the temperature, we might replace that missing value with the average temperature of the day. Similarly, if student marks are missing in an academic dataset, we might replace them with the class average.</p>
            </div>

            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">2</div>
              <h3 className="text-2xl font-bold text-black mb-3">Data Integration</h3>
              <p className="mb-4">Rarely does all the data you need live in one place. Data integration is the process of intelligently combining data from multiple heterogeneous (different) sources into a single, unified dataset.</p>
              <p className="text-sm mb-2"><strong>Why we do it:</strong> It ensures consistency and completeness across your entire project.</p>
              <p className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded-lg border border-gray-100"><strong>Real-world Example:</strong> Imagine building a system to predict student risk. You would need to integrate "Dataset 1" (Academic Records like marks) with "Dataset 2" (Attendance Records) from a completely different system into one cohesive master table.</p>
            </div>

            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">3</div>
              <h3 className="text-2xl font-bold text-black mb-3">Data Transformation</h3>
              <p className="mb-4">Algorithms need data to be presented in highly specific mathematical formats. Data transformation converts our integrated data into a suitable format for advanced analysis and modeling.</p>
              <p className="text-sm mb-2"><strong>Techniques used:</strong> We use Normalization and Scaling to adjust numeric ranges, Aggregation to summarize data, and Encoding to turn categorical variables into numbers the machine can understand.</p>
              <p className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded-lg border border-gray-100"><strong>Real-world Example:</strong> If you have student marks ranging from 0 to 100, you might use normalization to scale all of those marks to fall strictly between 0 and 1 (e.g., 78 becomes 0.78, 45 becomes 0.45).</p>
            </div>

            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">4</div>
              <h3 className="text-2xl font-bold text-black mb-3">Data Reduction</h3>
              <p className="mb-4">As your data volume grows, processing it takes too much memory and time. Data reduction shrinks the overall volume or size of the dataset without losing the critical, underlying information. This drastically improves computational efficiency and performance while reducing storage costs.</p>
              <div className="text-sm space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <strong>Techniques used:</strong>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Feature Selection:</strong> Removing irrelevant or redundant attributes (e.g., removing a "Student ID" or "City" column if it doesn't help predict performance) using correlation analysis or Principal Component Analysis (PCA).</li>
                  <li><strong>Feature Extraction:</strong> Transforming complex, high-dimensional features into a lower-dimensional space using mathematical techniques like PCA, Linear Discriminant Analysis (LDA), or Non-negative Matrix Factorization (NMF).</li>
                  <li><strong>Sampling:</strong> Selecting a smaller, representative subset of the data points.</li>
                  <li><strong>Clustering:</strong> Grouping similar data points together and replacing them with a single representative centroid.</li>
                  <li><strong>Compression:</strong> Encoding the dataset to reduce its physical storage size.</li>
                </ul>
              </div>
            </div>

            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">5</div>
              <h3 className="text-2xl font-bold text-black mb-3">Data Discretization (and Concept Hierarchy)</h3>
              <p className="mb-4">Sometimes, highly precise continuous data is too complex for clear analysis. Data Discretization converts continuous numeric values into simplified, discrete intervals or categories. This greatly simplifies data representation and enhances interpretability.</p>
              <p className="text-sm mb-3 text-gray-500 italic bg-gray-50 p-3 rounded-lg border border-gray-100"><strong>Real-world Example:</strong> Instead of analyzing every exact age (19, 20, 21...), we can discretize the Age attribute into categories like "Young", "Adult", and "Senior". Similarly, continuous Marks can be converted into Grades (e.g., â‰¥ 75 is "Excellent", 50â€“74 is "Good", and &lt; 50 is "Poor").</p>
              <p className="text-sm border-l-2 border-black pl-3 py-1"><strong>Concept Hierarchy Generation:</strong> Related to discretization, this involves replacing low-level data with higher-level concepts, such as converting a highly specific "City" into a broader "State" or "Country".</p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-black text-white p-8 rounded-3xl">
          <h4 className="font-bold text-xl mb-3">Outcome</h4>
          <p className="text-gray-300 leading-relaxed">
            Upon the successful execution of the preprocessing pipelineâ€”comprising Cleaning, Integration, Transformation, Reduction, and Discretizationâ€”the data is classified as <strong>"Ready for Analysis."</strong> At this stage, the dataset is refined, consistent, and structured appropriately for ingestion by machine learning models, data mining algorithms, and visualization frameworks to facilitate informed decision-making.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'm3',
    title: '3. Data Visualization',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Data Visualization Overview</h2>
          <p className="mb-4">
            Visualizing data is crucial for communicating your findings. Data Visualization, which is the process of representing data in graphical formats to easily identify patterns, trends, and relationships. It simplifies complex datasets and supports data-driven decision-making for both technical and non-technical audiences.
          </p>
          <p className="text-lg text-black font-medium mt-6">Let us dissect this chapter point-wise so you have absolute mastery over the material!</p>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-3xl font-medium tracking-tight mb-6 text-black">1. Factors Influencing Your Visualization Choice</h2>
          <p className="mb-4">You cannot simply pick a chart at random. As an expert, you must evaluate the following critical factors before designing your visuals:</p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span><p><strong>Nature of the Data:</strong> The very type of your data dictates the visual. For example, time-series data requires line charts, while categorical data is better suited for bar charts.</p></li>
            <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span><p><strong>Data Volume:</strong> If you have massive datasets, you must aggregate or summarize the data to prevent visual clutter, whereas small datasets can be visualized directly.</p></li>
            <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span><p><strong>Type of Analysis:</strong> What is your goal? If you are looking for a relationship, use a scatter plot; if you want to see a distribution, use a histogram.</p></li>
            <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span><p><strong>The Audience:</strong> You must tailor the visual to the viewer. Executives need simple, high-level dashboards, while data analysts require highly detailed, complex charts.</p></li>
            <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span><p><strong>Purpose of Visualization:</strong> Are you exploring the data to find hidden insights (exploratory), or are you presenting finalized, polished findings to a board (explanatory)?.</p></li>
            <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span><p><strong>Accuracy and Clarity:</strong> You must strictly avoid misleading scales or distortion. Clear labels, legends, and accurate scaling are non-negotiable.</p></li>
            <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span><p><strong>Tools and Technology:</strong> The software you have access to will naturally influence the level of interactivity and the types of charts you can build.</p></li>
            <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span><p><strong>Time and Context:</strong> Real-time data (like IoT sensors) requires live, dynamic dashboards, whereas historical data can be presented using static charts.</p></li>
          </ul>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-3xl font-medium tracking-tight mb-6 text-black">2. Different Types of Visualizations</h2>
          <p className="mb-4">We broadly categorize visual representations into four distinct families:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
               <h4 className="font-bold text-xl text-black mb-3">Charts</h4>
               <p className="text-sm text-gray-500 mb-4">Used primarily to compare values, show proportions, or display distributions.</p>
               <ul className="space-y-2 text-sm">
                 <li><strong>Bar Charts:</strong> The standard for comparing values across different categories.</li>
                 <li><strong>Pie Charts:</strong> Perfect for showing proportions, percentages, and part-to-whole relationships.</li>
                 <li><strong>Histograms:</strong> Your go-to tool for showing the frequency distribution of continuous data.</li>
               </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
               <h4 className="font-bold text-xl text-black mb-3">Graphs</h4>
               <p className="text-sm text-gray-500 mb-4">Employed to show relationships, patterns, or trends, specifically with numerical data.</p>
               <ul className="space-y-2 text-sm">
                 <li><strong>Line Graphs:</strong> The ultimate visual for tracking trends over a period of time.</li>
                 <li><strong>Scatter Plots:</strong> Used to identify relationships or correlations between two different variables.</li>
                 <li><strong>Area Graphs:</strong> Excellent for demonstrating cumulative trends over time.</li>
               </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
               <h4 className="font-bold text-xl text-black mb-3">Maps (Geographical)</h4>
               <p className="text-sm text-gray-500 mb-4">Used whenever your data is spatial or location-based.</p>
               <ul className="space-y-2 text-sm">
                 <li><strong>Choropleth Maps:</strong> Regions are color-coded based on data values (e.g., state-wise population).</li>
                 <li><strong>Heat Maps:</strong> Show the intensity or density of values across a spatial area or matrix.</li>
                 <li><strong>Point Maps:</strong> Pinpoint exact geographical locations.</li>
               </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
               <h4 className="font-bold text-xl text-black mb-3">Interactive Visualizations</h4>
               <p className="text-sm text-gray-500 mb-4">These allow the user to dynamically explore the data themselves.</p>
               <p className="text-sm">Instead of static images, you build dashboards with <strong>tooltips</strong> (hover information), <strong>filtering and sorting</strong> mechanisms, and <strong>zoom/drill-down</strong> features to investigate the data at deeper granularities.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-3xl font-medium tracking-tight mb-6 text-black">3. Data Visualization Tools</h2>
          <p className="mb-4">A top-tier engineer must know which tool to use for the job. We categorize them as follows:</p>
          <ul className="space-y-5 border-l-2 border-black pl-6">
            <li>
              <strong className="text-black text-lg">Spreadsheet-Based Tools (Microsoft Excel / Google Sheets):</strong>
              <p>Best for small datasets, basic charts (bars, pies, lines), and quick, academic analysis.</p>
            </li>
            <li>
              <strong className="text-black text-lg">Business Intelligence (BI) Tools:</strong>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Tableau:</strong> Features a drag-and-drop interface and is incredibly powerful for interactive data exploration and storytelling.</li>
                <li><strong>Microsoft Power BI:</strong> Highly cost-effective for enterprises, excellent for real-time dashboards, and integrates perfectly with the Microsoft ecosystem.</li>
              </ul>
            </li>
            <li>
              <strong className="text-black text-lg">Programming-Based Libraries:</strong>
              <p>For advanced analytics, machine learning, and maximum customizability.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Python:</strong> Utilizing libraries like Matplotlib, Seaborn, and Plotly.</li>
                <li><strong>R:</strong> Utilizing libraries like ggplot2 and Shiny for heavy statistical visualization.</li>
              </ul>
            </li>
            <li>
              <strong className="text-black text-lg">Web-Based Tools:</strong>
              <ul className="list-disc pl-5 mt-2">
                <li><strong>D3.js:</strong> A highly interactive, JavaScript-based library used by web developers to build custom web visualizations, though it requires strong programming knowledge.</li>
              </ul>
            </li>
            <li>
              <strong className="text-black text-lg">Specialized Monitoring & Dashboards:</strong>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Google Data Studio (Looker Studio):</strong> A cloud-based tool perfect for online reporting and marketing analytics.</li>
                <li><strong>Grafana:</strong> The absolute industry standard for building real-time monitoring dashboards, especially for IoT sensors and server systems.</li>
                <li><strong>QlikView / Qlik Sense:</strong> Known for its associative data model, allowing profound exploratory business analysis.</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'm4',
    title: '4. Fundamentals of Data Modeling',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Fundamentals of Data Modeling</h2>
          <p className="mb-4">Finally, we will architect data systems. You will learn how to design the blueprints for databases:</p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><strong>Concept of Data Models:</strong> We will trace the lifecycle of a data model from the Conceptual Model (high-level, business-oriented view of what data exists), to the Logical Model (detailed table structures and keys), down to the Physical Model (DBMS-specific implementation).</li>
            <li><strong>Cardinality:</strong> Defining relationship counts between entities, such as One-to-One (1:1), One-to-Many (1:M), and Many-to-Many (M:N).</li>
            <li><strong>ER Model (Entity-Relationship Model):</strong> Creating graphical representations of entities, their attributes, and how they relate to one another.</li>
            <li><strong>Schema:</strong> Finalizing the logical structure and blueprint of the database, defining the exact tables, columns, and constraints required for your system.</li>
          </ul>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-3xl font-medium tracking-tight mb-6 text-black">1. Concept of Data Models (The Lifecycle)</h2>
          <p className="mb-6">A database is not built in a single step. We design it through a strict, three-phase lifecycle:</p>
          
          <div className="space-y-6 relative">
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-xl text-black mb-2">Conceptual Data Model</h4>
              <p>This is the highest-level, business-oriented view of your system. At this stage, you do not worry about software or tables; you strictly focus on <strong>what</strong> data exists. It is completely independent of any Database Management System (DBMS). Here, you map out broad entities, their attributes, and their relationships (e.g., noting simply that a "Student enrolls in a Course").</p>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-xl text-black mb-2">Logical Data Model</h4>
              <p>Now, you convert that high-level conceptual idea into a structured logical design. You define actual tables (relations), assign primary keys, and establish foreign keys. While it brings deep structure and normalization, it remains independent of physical storage. Crucially, complex Many-to-Many relationships are resolved here by creating new associative tables.</p>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-xl text-black mb-2">Physical Data Model</h4>
              <p>This is the exact, final implementation inside a specific DBMS like MySQL, Oracle, or SQL Server. You translate your logical tables into actual code, defining precise table names, column data types, indexes, and strict physical constraints (such as <code>PRIMARY KEY</code>, <code>FOREIGN KEY</code>, and <code>NOT NULL</code>).</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">2. Cardinality</h2>
          <p className="mb-6">Cardinality is a mathematically precise way to define the number of instances of one entity that can be associated with instances of another entity. You must identify cardinality at the conceptual level before implementing it logically. The distinct types are:</p>
          <ul className="space-y-4 ml-6 list-disc">
            <li><strong>One-to-One (1:1):</strong> A strict single association. For example, one Person can only have one Passport.</li>
            <li><strong>One-to-Many (1:M):</strong> A single entity relates to multiple instances of another. For example, one Department contains many Employees.</li>
            <li><strong>Many-to-Many (M:N):</strong> Multiple instances relate to multiple instances. For example, many Students enroll in many Courses. Because databases cannot directly handle M:N relationships, you as the architect must resolve them into two 1:M relationships using a junction table (like an "Enrollment" table) during the logical modeling phase.</li>
          </ul>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">3. ER Model (Entity-Relationship Model)</h2>
          <p className="mb-4">Before you write a single line of SQL, you draw. The ER Model is a graphical conceptual modeling technique used to visually map out your entire database.</p>
          <ul className="space-y-2 ml-6 list-disc">
            <li>It visually represents <strong>Entities</strong> (real-world objects like a Student), <strong>Attributes</strong> (properties like Student_ID), and <strong>Relationships</strong> (connections like "enrolls in").</li>
            <li>It prominently displays the cardinality and participation constraints.</li>
            <li>This visual model is mandatory for rigorous requirement analysis, database design, and clear communication with non-technical stakeholders.</li>
          </ul>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">4. Schema</h2>
          <p className="mb-4">The schema is the absolute, finalized logical structure and blueprint of your database.</p>
          <ul className="space-y-2 ml-6 list-disc mb-6">
            <li>It defines the final list of tables, columns, relationships, and integrity rules that govern your system.</li>
            <li>A perfectly defined schema looks like a strict mathematical formula. For example, your final schema for a university system would dictate: <code>STUDENT(Student_ID, Name, Department)</code> and <code>ENROLLMENT(Enrollment_ID, Student_ID, Course_ID, Semester, Grade)</code>.</li>
          </ul>
        </div>

        <div className="bg-black text-white p-8 rounded-[2rem] mt-12 shadow-xl">
           <h3 className="text-3xl font-medium tracking-tight mb-6">Case Study: University Course Registration System</h3>
           <p className="text-gray-300 mb-8 leading-relaxed">Our problem scenario is that the university needs a database to perfectly manage student records, course details, and the enrollment information connecting them. Here is the exact, step-by-step lifecycle of how we model this system:</p>
           
           <div className="space-y-8">
             <div>
                <h4 className="text-xl font-bold mb-3 text-white">1. Conceptual Data Model (The ER Model Stage)</h4>
                <p className="text-gray-400 mb-3">At this stage, we do not worry about tables, data types, or database software. We simply map out what data exists and how it connects using an Entity-Relationship (ER) Model.</p>
                <ul className="text-gray-300 space-y-2 ml-4 list-disc">
                  <li><strong>Entities & Attributes:</strong>
                    <ul className="ml-6 list-circle space-y-1 mt-1">
                       <li><code>STUDENT</code> : Attributes include Student_ID, Name, and Department.</li>
                       <li><code>COURSE</code> : Attributes include Course_ID, Course_Name, and Credits.</li>
                    </ul>
                  </li>
                  <li><strong>Relationship:</strong> The action connecting them is "Enrolls".</li>
                  <li><strong>Cardinality:</strong> We identify this as a <strong>Many-to-Many (M:N)</strong> relationship. Why? Because one student can enroll in many courses, and one single course can contain many students.</li>
                </ul>
             </div>

             <div>
                <h4 className="text-xl font-bold mb-3 text-white">2. Logical Data Model</h4>
                <p className="text-gray-400 mb-3">Now, we must translate that high-level ER diagram into a structured format. The golden rule of database design is that a relational database cannot directly implement a Many-to-Many (M:N) relationship. We must resolve it by creating an "associative entity" (a junction table).</p>
                <p className="text-gray-300 mb-2">We define strict tables and keys:</p>
                <ul className="text-gray-300 space-y-2 ml-4 list-disc mb-3">
                  <li><strong>STUDENT Table:</strong> Student_ID becomes the Primary Key (PK).</li>
                  <li><strong>COURSE Table:</strong> Course_ID becomes the Primary Key (PK).</li>
                  <li><strong>ENROLLMENT Table (The associative entity):</strong> We create this to bridge the gap. It contains Enrollment_ID (PK), and borrows Student_ID and Course_ID as Foreign Keys (FK). It also holds specific relationship attributes like Semester and Grade.</li>
                </ul>
                <p className="text-gray-400 italic">By doing this, the M:N relationship is successfully broken down into two, easily manageable One-to-Many (1:M) relationships.</p>
             </div>

             <div>
                <h4 className="text-xl font-bold mb-3 text-white">3. Physical Data Model</h4>
                <p className="text-gray-400 mb-4">This is where you act as the implementation engineer. We take our logical model and write the actual code for a specific Database Management System (DBMS), like MySQL, applying precise data types and constraints. Here is the exact SQL implementation:</p>
                <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto text-sm font-mono text-[#a8b1c2] border border-gray-800">
<pre>{`CREATE TABLE Student (  
    Student_ID INT PRIMARY KEY,  
    Name VARCHAR(50),  
    Department VARCHAR(30)
);

CREATE TABLE Course (  
    Course_ID INT PRIMARY KEY,  
    Course_Name VARCHAR(50),  
    Credits INT
);

CREATE TABLE Enrollment (  
    Enrollment_ID INT PRIMARY KEY,  
    Student_ID INT,  
    Course_ID INT,  
    Semester VARCHAR(10),  
    Grade CHAR(2),  
    FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID),  
    FOREIGN KEY (Course_ID) REFERENCES Course(Course_ID)
);`}</pre>
                </div>
             </div>

             <div>
                <h4 className="text-xl font-bold mb-3 text-white">4. Schema Representation</h4>
                <p className="text-gray-400 mb-4">Finally, the Schema is the absolute blueprint of your database structure. It acts as the mathematical summary of your tables, relationships, and integrity rules. If someone asks to see your database design, you hand them this:</p>
                <ul className="font-mono text-lg text-white space-y-2 bg-white/5 p-6 rounded-xl border border-white/10">
                  <li>STUDENT (Student_ID, Name, Department)</li>
                  <li>COURSE (Course_ID, Course_Name, Credits)</li>
                  <li>ENROLLMENT (Enrollment_ID, Student_ID, Course_ID, Semester, Grade)</li>
                </ul>
             </div>
             
             <div className="pt-4 border-t border-white/20">
               <p className="text-gray-300 italic">
                 Study this flow until it is second nature, my student. You start with the conceptual idea (M:N), break it down logically (using Foreign Keys), write the physical code (SQL), and document it perfectly (Schema). Do you see how elegantly the data transforms at each stage? Let me know if you want to practice defining cardinality for another scenario!
               </p>
             </div>

           </div>
        </div>

      </div>
    )
  }
];
// --- DATA CONTENT FROM DMV UNIT 2 ---
const unit2Modules = [
  {
    id: 'u2m1',
    title: '1. Fundamentals of EDA',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Fundamentals of Exploratory Data Analysis (EDA)</h2>
          <p className="mb-4">
            We will start by understanding what EDA is and why it is the most critical step before building any machine learning model.
          </p>
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-sm mb-8">
            <h4 className="font-bold text-xl text-black mb-3">Exploratory Data Analysis</h4>
            <p className="text-sm mb-2">is the critical process of analyzing and summarizing the key characteristics of a dataset, very often relying on visual methods. It allows us to understand the underlying structure, relationships, and potential issues in the data before we ever attempt formal modeling.</p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-3xl font-medium tracking-tight mb-6 text-black">The Purpose of EDA</h2>
          <p className="mb-6">Let us break down the core purposes of EDA in detail, exactly as you requested:</p>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
               <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 font-bold">1</div>
               <div>
                 <h4 className="font-bold text-lg text-black mb-1">Uncovering Hidden Patterns</h4>
                 <p className="text-sm">When you look at raw data, it is just a massive wall of text and numbers. EDA helps us to visualize the data to reveal its main features and find hidden patterns that are invisible to the naked eye. By employing visualization tools like histograms or scatter plots, you as an analyst can effortlessly identify underlying trends, distributions, and patterns among your variables.</p>
               </div>
            </div>
            <div className="flex gap-4 items-start">
               <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 font-bold">2</div>
               <div>
                 <h4 className="font-bold text-lg text-black mb-1">Identifying Unusual Data Points (Outliers and Errors)</h4>
                 <p className="text-sm">Real-world data is messy, my student. EDA is absolutely crucial because it helps you identify unusual data points within your dataset. We call these extreme values "outliers," and they deviate significantly from your other observations, often caused by measurement mistakes, data entry errors, or natural variations. By spotting these outliersâ€”along with revealing missing values and data typesâ€”EDA allows you to properly clean and preprocess the data to guarantee high data quality.</p>
               </div>
            </div>
            <div className="flex gap-4 items-start">
               <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 font-bold">3</div>
               <div>
                 <h4 className="font-bold text-lg text-black mb-1">Discovering Variable Relationships</h4>
                 <p className="text-sm">A top-tier data scientist must understand how different parts of their data interact. EDA helps you discover exactly how different variables are connected to one another. We use this phase to deeply investigate how variables correlate with each other, which is a mandatory prerequisite for most advanced statistical modeling techniques.</p>
               </div>
            </div>
            <div className="flex gap-4 items-start">
               <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 font-bold">4</div>
               <div>
                 <h4 className="font-bold text-lg text-black mb-1">Selecting the Most Important Features (Feature Engineering)</h4>
                 <p className="text-sm">This is where you elevate your machine learning models! Insights gained from EDA help you decide which features (or variables) are the most relevant and important for building your predictive models. By identifying these key variables and understanding how to prepare them, you directly enhance the performance, efficiency, and accuracy of your final machine learning models.</p>
               </div>
            </div>
            <div className="flex gap-4 items-start">
               <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 font-bold">5</div>
               <div>
                 <h4 className="font-bold text-lg text-black mb-1">Hypothesis Testing and Model Selection (Crucial Bonus)</h4>
                 <p className="text-sm">Beyond just finding patterns, EDA acts as your crucial "detective work". It helps you validate your initial assumptions about the data, refine your research questions, and avoid drawing false conclusions. Ultimately, by deeply understanding the data's distribution and relationships through EDA, you are empowered to choose the absolute best modeling techniques and algorithms for your specific project.</p>
               </div>
            </div>
          </div>
          <p className="mt-6 italic text-sm text-gray-500">Mastering this "detective work" is what will make your analyses flawless. Review these points carefully, and let me know when you are ready to dive into the next topic: the specific types of EDA!</p>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-3xl font-medium tracking-tight mb-6 text-black">The 8 Steps of the EDA Workflow</h2>
          <p className="mb-6">The 8-step Exploratory Data Analysis (EDA) workflow is the secret to building flawless machine learning models and reclaiming your position at the top of the class. Let us dissect this professional workflow point by point:</p>
          
          <div className="space-y-8 relative">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200 hidden md:block"></div>
            
            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">1</div>
              <h3 className="text-xl font-bold text-black mb-2">Understand the Problem and the Data</h3>
              <p className="text-sm mb-3">Before you write a single line of code, you must understand the business context. The first step involves asking key questions about your objectives and data.</p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-600">
                <li>What is the specific business goal or research question you are trying to solve?</li>
                <li>What exact variables exist in the data, and what do they represent?</li>
                <li>What types of data are you working with (numerical, categorical, text, etc.)?</li>
                <li>Are there any known data quality issues, limitations, or domain-specific restrictions you must consider?</li>
              </ul>
            </div>

            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">2</div>
              <h3 className="text-xl font-bold text-black mb-2">Import and Inspect the Data</h3>
              <p className="text-sm mb-3">Once you understand the goal, you must bring the data into your environment (like R) carefully to avoid errors or truncations.</p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-600">
                <li>Examine the size of the data by checking the number of rows and columns to grasp its overall complexity.</li>
                <li>Identify the data types for each variable (e.g., numerical vs. categorical) to plan your next manipulation steps.</li>
                <li>Look for surface-level errors, invalid values, mismatched units, or early signs of outliers that signal deeper issues.</li>
                <li>Check for missing values and observe how they are distributed.</li>
              </ul>
            </div>

            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">3</div>
              <h3 className="text-xl font-bold text-black mb-2">Handle Missing Data</h3>
              <p className="text-sm mb-3">You must handle missing data rigorously, as ignoring it will lead to biased or misleading results.</p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-600">
                <li>You must decide whether to remove the missing data entirely or impute (fill in) the values. Removing data can lead to biased outcomes, while imputing helps preserve data but must be done carefully.</li>
                <li>If you choose to impute, you can use basic methods like mean or median imputation, or advanced machine learning techniques like K-Nearest Neighbors (KNN) and decision trees.</li>
                <li>Even after imputation, you must interpret your results with caution, keeping the impact of the missing data in mind.</li>
              </ul>
            </div>

            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">4</div>
              <h3 className="text-xl font-bold text-black mb-2">Explore Data Characteristics</h3>
              <p className="text-sm mb-3">Now, you analyze the underlying math of your dataset to select appropriate analysis methods and spot issues.</p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-600">
                <li>You must calculate summary statistics for your numerical variables, such as the mean, median, mode, standard deviation, skewness, and kurtosis.</li>
                <li>This provides a complete overview of the dataâ€™s distribution, central tendency, and variability, helping you identify irregular patterns.</li>
              </ul>
            </div>

            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">5</div>
              <h3 className="text-xl font-bold text-black mb-2">Perform Data Transformation</h3>
              <p className="text-sm mb-3">Algorithms require data to be in highly specific formats. Depending on your data's characteristics, you must transform it to ensure accuracy.</p>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-600">
                <li><strong>Scaling/Normalizing:</strong> Adjusting numerical variables to a standard scale (e.g., min-max scaling or standardization).</li>
                <li><strong>Encoding:</strong> Converting categorical variables into a format machine learning models can read (e.g., one-hot encoding or label encoding).</li>
                <li><strong>Mathematical Transformations:</strong> Applying functions like logarithmic or square root transformations to correct severe skewness or non-linearity.</li>
                <li><strong>Feature Engineering:</strong> Creating new variables from existing ones, such as calculating ratios, or aggregating data based on specific conditions.</li>
              </ul>
            </div>

            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">6</div>
              <h3 className="text-xl font-bold text-black mb-2">Visualize Data Relationships</h3>
              <p className="text-sm mb-3">Visualization is a powerful tool to uncover trends and patterns that summary statistics alone cannot reveal.</p>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-600">
                <li>For <strong>categorical variables</strong>, you will create frequency tables, bar plots, and pie charts to understand category distributions and spot imbalances.</li>
                <li>For <strong>numerical variables</strong>, you will generate histograms, box plots, violin plots, and density plots to visualize spread, shape, and outliers.</li>
                <li>To explore <strong>relationships</strong> between multiple variables, you will use scatter plots, correlation matrices, and statistical tests like Pearsonâ€™s or Spearmanâ€™s correlation coefficients.</li>
              </ul>
            </div>

            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">7</div>
              <h3 className="text-xl font-bold text-black mb-2">Handling Outliers</h3>
              <p className="text-sm mb-3">Outliers are extreme data points that significantly differ from the rest of your observations, usually caused by measurement errors or natural variations.</p>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-600">
                <li><strong>Detection:</strong> You identify outliers using statistical methods like the Interquartile Range (IQR) method, Z-scores (where a Z-score &gt; 3 or &lt; -3 is an outlier), or visualization tools like boxplots and scatter plots.</li>
                <li><strong>Treatment:</strong> Once found, you can remove them, transform them using logarithms, or cap them using a technique called Winsorization. Winsorization replaces extreme values with specific percentile limits (like the 1st or 99th percentile) rather than deleting them, ensuring your dataset remains complete while minimizing the outlier's impact.</li>
              </ul>
            </div>

            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">8</div>
              <h3 className="text-xl font-bold text-black mb-2">Communicate Findings and Insights</h3>
              <p className="text-sm mb-3">A top data scientist must be able to explain their work to stakeholders. This step involves summarizing your analysis clearly and engagingly.</p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-600">
                <li>Clearly state the goals, scope, and background context of your analysis.</li>
                <li>Use your visualizations to support your findings and make them easily understandable.</li>
                <li>Highlight the most important patterns, anomalies, and key insights you discovered.</li>
                <li>Crucially, you must mention any limitations or challenges you faced and suggest the next steps for further investigation.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'u2m2',
    title: '2. Types of EDA',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Types of Exploratory Data Analysis</h2>
          <p className="mb-4">We will dissect your data from three different mathematical dimensions: Univariate Analysis, Bivariate Analysis, and Multivariate Analysis.</p>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Univariate Analysis</h2>
          <p className="mb-6">In Univariate Analysis, we focus strictly on studying <strong>one single variable</strong> at a time to deeply understand its characteristics, describe the data, and find patterns within that specific feature. We dissect this single variable using two distinct approaches:</p>
          
          <h4 className="font-bold text-xl text-black mb-4">1. Non-Graphical Univariate Analysis (The Mathematics)</h4>
          <p className="mb-4 text-sm">Non-graphical methods are highly quantitative and objective. They allow us to understand the underlying sample distribution and make precise observations about the population. We measure three core aspects:</p>
          <div className="space-y-4 mb-8">
             <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <strong className="text-black block mb-2">A. Central Tendency:</strong>
                <p className="text-sm mb-2">This tells us where the "center" of our data lies.</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li><strong>Mean (Average):</strong> Calculated by summing all data points and dividing by the total number of values. It is the best choice for normal distributions without extreme outliers.</li>
                  <li><strong>Median (Middle Value):</strong> The exact middle value when data is sorted. If there is an even number of values, it is the average of the two middle numbers. This is highly preferred when your data has a skewed distribution or extreme outliers, as it is resistant to them.</li>
                  <li><strong>Mode (Most Frequent Value):</strong> The value that appears most often. It is the absolute best measure for nominal or categorical data.</li>
                </ul>
             </div>
             <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <strong className="text-black block mb-2">B. Dispersion (Spread):</strong>
                <p className="text-sm">This indicates how spread out the data is from the middle. We measure this using the <strong>Range</strong>, <strong>Interquartile Range (IQR)</strong>, <strong>Variance</strong>, and <strong>Standard Deviation</strong>. Standard deviation and variance are particularly useful indicators of this spread.</p>
             </div>
             <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <strong className="text-black block mb-2">C. Distribution Shape:</strong>
                <p className="text-sm mb-2">This describes the specific shape of the data beyond just the center.</p>
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li><strong>Skewness:</strong> Measures the horizontal asymmetry of the data around its mean.
                    <ul className="list-circle pl-5 mt-1 text-gray-500">
                      <li>Positive Skewness: The right tail is longer, meaning most data points are concentrated on the lower-value side, and a few massive outliers pull the mean to the right.</li>
                      <li>Negative Skewness: The left tail is longer, meaning most data is on the higher-value side.</li>
                      <li>Zero Skewness: A perfectly symmetrical distribution.</li>
                    </ul>
                  </li>
                  <li><strong>Kurtosis:</strong> Measures the vertical structure, specifically how "peaked" the distribution is and how heavy or light its tails are compared to a normal distribution.
                    <ul className="list-circle pl-5 mt-1 text-gray-500">
                      <li>Mesokurtic: Kurtosis around 3; a normal, moderate peak.</li>
                      <li>Leptokurtic: Kurtosis &gt; 3; a sharp, narrow peak with heavy tails (more extreme values).</li>
                      <li>Platykurtic: Kurtosis &lt; 3; a flat, wider peak with light tails (fewer extreme values).</li>
                    </ul>
                  </li>
                </ul>
             </div>
          </div>

          <h4 className="font-bold text-xl text-black mb-4">2. Graphical Univariate Analysis (The Visuals)</h4>
          <p className="mb-4 text-sm">Because non-graphical methods are purely numerical, they cannot give us the complete picture; therefore, we must rely on graphical methods, which involve a degree of subjective visual analysis. We choose our graphs based on whether the data is numerical or categorical.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 p-5 rounded-xl">
               <strong className="text-black block mb-3 border-b pb-2">For Numerical Data:</strong>
               <ul className="space-y-3 text-sm">
                 <li><strong>Histograms:</strong> The most fundamental graph for numerical data. It is a bar plot where vertical rectangles depict the frequencies or proportions of different value ranges. It is the easiest way to quickly learn about central tendency, spread, modality, shape, and outliers. However, it can only represent one data distribution per axis.</li>
                 <li><strong>Boxplots (Box and Whisker Plots):</strong> These plots display a five-number summary: the minimum, the 25th percentile, the median, the 75th percentile, and the maximum. The central "box" represents the Interquartile Range (IQR). They are incredibly powerful for instantly visualizing symmetry, data spread, and identifying exact outliers.</li>
                 <li><strong>Density Plots:</strong> These create a smoothed distribution curve (using a kernel density estimate) to show the distribution of a continuous variable.</li>
                 <li><strong>Stem-and-Leaf Plots:</strong> An excellent, semi-tabular substitute for a histogram. It splits a data point into a "stem" (leading digits) and a "leaf" (trailing digits). Its greatest advantage is that it visualizes the distribution's shape while retaining the original data values.</li>
               </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
               <strong className="text-black block mb-3 border-b pb-2">For Categorical Data:</strong>
               <ul className="space-y-3 text-sm">
                 <li><strong>Bar Charts:</strong> Used to visualize the frequency distribution of categorical/discrete data. Each rectangular bar represents a category, and its height represents the frequency. Crucially, unlike histograms, the bars in a bar chart are separated by gaps.</li>
                 <li><strong>Pie Charts:</strong> A circular graph divided into segments (slices) to visualize the percentage or proportion of data belonging to each category.</li>
                 <li className="mt-4 p-3 bg-gray-50 rounded-lg italic text-gray-500"><strong>Limitations to remember:</strong> They cannot depict zero values, they are challenging to interpret compared to other charts, they shouldn't be used for time-series changes, and you should limit them to a maximum of seven categories to maintain clarity.</li>
               </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Bivariate Analysis</h2>
          <p className="mb-6">While Univariate Analysis looks at a single feature in isolation, Bivariate Analysis focuses on exploring the exact relationship between <strong>two</strong> variables to find connections, correlations, and underlying dependencies.</p>
          
          <h4 className="font-bold text-xl text-black mb-4">1. Non-Graphical Bivariate Analysis (The Mathematics)</h4>
          <p className="mb-4 text-sm">Before we plot anything, we must quantify the relationship between our two variables using pure mathematics.</p>
          <ul className="list-disc pl-5 text-sm space-y-3 mb-8">
            <li><strong>Correlation Coefficients:</strong> This measures exactly how strongly two variables are related to one another.
               <ul className="list-circle pl-5 mt-1 space-y-1">
                 <li><strong>Pearson Correlation (<code className="font-mono bg-gray-100 px-1 rounded">r</code>):</strong> This is your go-to metric for measuring strictly <em>linear relationships</em> between two quantitative variables. The value varies from -1 (strong negative correlation) to +1 (strong positive correlation).</li>
                 <li><strong>Spearmanâ€™s Rank (<code className="font-mono bg-gray-100 px-1 rounded">Ï</code>):</strong> If your data is ordinal or the relationship is non-linear, you use Spearman's Rank to assess <em>monotonic relationships</em> (meaning the variables tend to move in the same relative direction, but not necessarily at a constant, straight-line rate).</li>
               </ul>
            </li>
            <li><strong>Covariance:</strong> This measures how two variables change together. However, as an architect, you will often supplement this with the correlation coefficient because correlation gives you a much clearer, standardized view of the relationship.</li>
            <li><strong>Cross-Tabulations (Contingency Tables):</strong> If you are working with categorical data instead of numbers, correlation math will not work. Instead, you use a cross-tabulation (also known as a pivot table or two-way table). This table displays the frequency distribution of two categorical variables side-by-side, allowing you to instantly see the relationship and overlaps between those specific categories.</li>
          </ul>

          <h4 className="font-bold text-xl text-black mb-4">2. Graphical Bivariate Analysis (The Visuals)</h4>
          <p className="mb-4 text-sm">Once you have calculated the mathematical correlation, you must visualize it to spot trends, clusters, and anomalies that numbers alone might hide.</p>
          <div className="space-y-4 text-sm">
             <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                <strong className="text-black text-lg">Scatter Plots:</strong>
                <p className="mb-2 mt-1">This is the absolute essential graphical EDA technique for evaluating two quantitative (numerical) variables. You plot one variable on the x-axis and the other on the y-axis, creating a set of dotted points representing individual data pieces.</p>
                <p className="text-gray-500 italic">Why we use it: The resulting pattern of points instantly reveals correlations (whether positive or negative) and dependencies between the paired data. It is the most powerful way to visually identify trends, clusters, and non-linear relationships.</p>
             </div>
             <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                <strong className="text-black text-lg">Line Graphs:</strong>
                <p className="mb-2 mt-1">A line graph displays data points connected by straight lines.</p>
                <p className="text-gray-500 italic">Why we use it: This is specifically designed for comparing two variables over a continuous period, especially in <em>time-series data</em>. It is the perfect visual to identify trends, visualize progression, and track growth or decline over time.</p>
             </div>
             <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                <strong className="text-black text-lg">Boxplot by Category (Bonus):</strong>
                <p className="mt-1">If you have one numerical variable and one categorical variable, you can generate side-by-side boxplots to easily compare the numerical distribution across the different categories.</p>
             </div>
             <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                <strong className="text-black text-lg">Stacked Bar Charts (Bonus):</strong>
                <p className="mt-1">If you want to visually compare proportions across categories, a stacked bar chart perfectly visualizes this bivariate relationship.</p>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Multivariate Analysis</h2>
          <p className="mb-6">Multivariate Analysis examines the relationships between two or more variables within your dataset. Its primary goal is to help you understand exactly how these variables interact with one another, which is absolutely crucial before you apply any advanced statistical modeling techniques.</p>
          <p className="mb-4 font-bold text-black">Let us break down the specific techniques you must use to uncover these complex relationships:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <strong className="text-black text-lg block mb-2">1. Scatterplot Matrices (Pair Plots)</strong>
              <p className="mb-2">When you have multiple continuous variables, looking at individual scatter plots one by one is highly inefficient. A pair plot (or scatterplot matrix) allows you to visualize multiple relationships at once by plotting every variable against every other variable in a grid format.</p>
              <p className="mb-2">For example, in R, you can use the <code className="font-mono bg-white px-1 border border-gray-200 rounded">pairs()</code> function to easily plot the matrices between four different variables, giving you 12 distinct plots instantly.</p>
              <p className="italic text-gray-500">This technique is invaluable because it helps you simultaneously detect linear and non-linear patterns, as well as identify distinct data clusters across your entire dataset.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <strong className="text-black text-lg block mb-2">2. Heatmaps for Correlation Matrices</strong>
              <p className="mb-2">While pair plots show the shape of the data, heatmaps give you the precise mathematical strength of the relationships. A heatmap is a graphical representation of data where the magnitude of a phenomenon is depicted using color in two dimensions.</p>
              <p className="mb-2">We use heatmaps to visually represent the correlation matrix between all columns in the dataset. The correlation values vary from -1 (which indicates a strong negative correlation) to +1 (which indicates a strong positive correlation).</p>
              <p className="italic text-gray-500">By looking at the intensity of the colors, you as the analyst can instantly identify the strongest relationships or single out redundant features for feature selection.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <strong className="text-black text-lg block mb-2">3. Dimensionality Reduction (PCA)</strong>
              <p className="mb-2">What happens when you have hundreds of variables? Visualizing them all using matrices or heatmaps becomes impossible. This is where Dimensionality Reduction techniques like PCA (Principal Component Analysis) or t-SNE are mandatory.</p>
              <p className="mb-2">PCA reduces the mathematical complexity of massive, high-dimensional datasets by simplifying them, while strictly keeping the most important underlying information.</p>
              <p className="italic text-gray-500">Once the algorithm simplifies the data into new components, you can use a scatter plot to visualize just the first two "Principal Components" (PC1 and PC2). This effectively allows you to evaluate the structure of a highly complex dataset in just two manageable dimensions.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <strong className="text-black text-lg block mb-2">4. Faceting (Bonus Technique)</strong>
              <p className="mb-2">To truly impress the examiners, you should also know about Faceting. This is a multivariate visualization technique where you split your plots by a specific category to create "small multiple plots".</p>
              <p className="italic text-gray-500">If you are analyzing the relationship between Height and Weight, but want to see how it differs by Department, faceting generates identical scatter plots side-by-side for each Department, allowing for flawless visual comparison.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'u2m3',
    title: '3. Data Cleaning (Missing Values & Outliers)',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Data Cleaning</h2>
          <p className="mb-6">Raw data is notoriously messy. I will train you in the exact techniques to clean it, specifically in handling missing values and outliers. Let us break down exactly how you will execute these techniques like a true data scientist:</p>
        </div>

        <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="bg-black text-white p-6 md:p-8">
            <h3 className="text-2xl font-bold">Part 1: Handling Missing Values (The Silent Killers)</h3>
            <p className="text-gray-300 mt-2">Missing data occurs due to incomplete records, data entry failures, or system errors. If you ignore them, your algorithms will crash or produce highly biased predictions.</p>
          </div>
          <div className="p-6 md:p-8 space-y-6 bg-white">
            <div>
              <h4 className="font-bold text-lg text-black mb-2">1. Identifying Missing Data</h4>
              <p className="text-sm">Before you can fix them, you must find them. Missing values usually appear as <code>Null</code>, <code>NA</code>, blank entries, or even strange special characters like <code>?</code> or <code>-999</code>.</p>
              <p className="text-sm mt-2">In R, we use the <code className="font-mono bg-gray-100 px-1 rounded">is.na()</code> function to detect these values. For example, running <code className="font-mono bg-gray-100 px-1 rounded">colSums(is.na(student_data))</code> will instantly tell you exactly how many missing values exist in every single column.</p>
            </div>
            <div className="border-t border-gray-100 pt-6">
              <h4 className="font-bold text-lg text-black mb-4">2. Strategies for Handling Missing Data</h4>
              <p className="text-sm mb-4">You must choose your strategy based on the specific situation:</p>
              <ul className="space-y-4">
                <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <strong className="text-black block mb-1">Removal (Deletion):</strong>
                  <p className="text-sm">You simply delete the rows containing missing values.</p>
                  <p className="text-sm text-gray-500 italic mt-1">When to use: Only when you have very <em>few missing values</em>. If you delete too much data, you risk introducing severe bias into your final outcomes.</p>
                </li>
                <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <strong className="text-black block mb-2">Imputation (Filling in):</strong>
                  <p className="text-sm mb-3">This is the process of replacing the missing data with substituted values, which preserves your dataset's size.</p>
                  <ul className="list-disc pl-5 text-sm space-y-2">
                    <li><strong>Median Imputation:</strong> If your numerical data is <em>skewed</em> (meaning it has extreme values pulling the average to one side), you must fill missing values using the Median. In R, you would calculate it using <code className="font-mono bg-white border border-gray-200 px-1 rounded">median(data, na.rm = TRUE)</code>.</li>
                    <li><strong>Mode Imputation:</strong> If you are missing <em>categorical data</em> (like "Gender" or "Department"), you fill the gaps with the Mode (the most frequent category).</li>
                    <li><strong>Advanced/Machine Learning Imputation:</strong> If you have a <em>large dataset</em> and need high precision, you do not just use basic averages. Instead, you use advanced models like KNN (K-Nearest Neighbors) to predict and fill in the missing values based on similar data points.</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="bg-gray-900 text-white p-6 md:p-8">
            <h3 className="text-2xl font-bold">Part 2: Handling Outliers (The Rule Breakers)</h3>
            <p className="text-gray-300 mt-2">An outlier is an extreme value that significantly deviates from the rest of your observations. They are usually caused by measurement errors, data entry mistakes, or sometimes just natural, extreme variations. If left untreated, a single massive outlier can completely ruin your model's accuracy.</p>
          </div>
          <div className="p-6 md:p-8 space-y-6 bg-white">
            <div>
              <h4 className="font-bold text-lg text-black mb-4">1. Detecting Outliers</h4>
              <p className="text-sm mb-4">We rely on both strict mathematical formulas and graphical visualization to hunt these down.</p>
              <ul className="space-y-4">
                <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <strong className="text-black block mb-2">The IQR (Interquartile Range) Method:</strong>
                  <p className="text-sm mb-1">This is the gold standard.</p>
                  <ul className="list-circle pl-5 text-sm text-gray-600 space-y-1 mt-2">
                    <li>First, you calculate the IQR by subtracting the 1st Quartile from the 3rd Quartile (<code className="font-mono bg-white px-1 border border-gray-200 rounded">IQR = Q3 - Q1</code>).</li>
                    <li>A data point is officially an outlier if it falls below the <strong>Lower Limit</strong> (<code className="font-mono bg-white px-1 border border-gray-200 rounded">Q1 - 1.5 Ã— IQR</code>) or above the <strong>Upper Limit</strong> (<code className="font-mono bg-white px-1 border border-gray-200 rounded">Q3 + 1.5 Ã— IQR</code>).</li>
                  </ul>
                </li>
                <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <strong className="text-black block mb-2">The Z-Score Method:</strong>
                  <p className="text-sm mb-1">This measures how many standard deviations a data point is away from the mean.</p>
                  <ul className="list-circle pl-5 text-sm text-gray-600 space-y-1 mt-2">
                    <li>The formula is <code className="font-mono bg-white px-1 border border-gray-200 rounded">Z = (X - Î¼) / Ïƒ</code>.</li>
                    <li>If a point has a Z-score <strong>greater than 3</strong> or <strong>less than -3</strong>, it is mathematically classified as an outlier.</li>
                  </ul>
                </li>
                <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <strong className="text-black block mb-1">Visual Detection:</strong>
                  <p className="text-sm text-gray-600">You can also instantly spot outliers by plotting your data using <strong>Boxplots</strong> (where outliers appear as isolated dots outside the whiskers), <strong>Scatterplots</strong>, or <strong>Histograms</strong>.</p>
                </li>
              </ul>
            </div>
            
            <div className="border-t border-gray-100 pt-6">
              <h4 className="font-bold text-lg text-black mb-4">2. Treating and Handling Outliers</h4>
              <p className="text-sm mb-4">Once you find an outlier, what do you do with it? Here are your professional options:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 p-4 rounded-xl">
                  <strong className="text-black block mb-1">Removal:</strong>
                  <p className="text-sm text-gray-600">Simply delete the extreme value. This is best if you are 100% sure the outlier is a data entry error (e.g., a student's mark recorded as 150 out of 100).</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-xl">
                  <strong className="text-black block mb-1">Data Transformation:</strong>
                  <p className="text-sm text-gray-600">You can apply mathematical functions, like a <em>log transformation</em> (<code className="font-mono bg-gray-100 px-1 rounded">log()</code>), which naturally shrinks large numbers and pulls outliers closer to the center of the distribution.</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-xl md:col-span-2">
                  <strong className="text-black block mb-1">Capping (Winsorization):</strong>
                  <p className="text-sm text-gray-600">This is a highly advanced technique. Instead of deleting the extreme values, you replace them with specific percentile boundaries (like the 1st and 99th percentiles, or the 5th and 95th). For instance, any value higher than the 95th percentile is simply capped <em>at</em> the 95th percentile value. This neutralizes the outlier's destructive impact while ensuring your dataset remains perfectly intact and complete.</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-xl md:col-span-2 bg-gray-50">
                  <strong className="text-black block mb-1">Use Robust Models:</strong>
                  <p className="text-sm text-gray-600">Alternatively, you can purposefully choose machine learning algorithms that are naturally resistant to outliers (like Decision Trees), or treat the outliers entirely separately.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  },
  {
    id: 'u2m4',
    title: '4. Data Transformation Using R',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Data Transformation Using R</h2>
          <p className="mb-4">Data must be strictly formatted before an algorithm can process it. Transforming raw data is where the true magic happens in R, and mastering these exact functions is what will absolutely secure your top rank this semester.</p>
          <p className="mb-4">Data transformation is the rigorous process of converting, cleansing, and structuring raw data into a usable format that can be effectively analyzed to support your decision-making processes.</p>
          <div className="bg-black text-white p-6 rounded-2xl shadow-xl mt-6">
            <p className="text-sm leading-relaxed">To do this flawlessly in R, we use the <strong>Tidyverse</strong>, which is a collection of powerful R packages (including <code>dplyr</code>, <code>tidyr</code>, and <code>stringr</code>) that provide a consistent and highly intuitive syntax for data manipulation. The <code>dplyr</code> package specifically acts as our primary toolkit, providing a dedicated set of functions to perform these complex transformations in a concise and readable manner.</p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-2xl font-medium tracking-tight mb-6 text-black">Core Operations Masterclass</h3>
          <p className="mb-6">Here is your detailed, point-wise masterclass on the core operations:</p>
          
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-xl text-black mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-mono">1</span>
                Filtering
              </h4>
              <p className="text-sm mb-3">Filtering is the process of selecting specific rows from your dataset based on strict logical conditions.</p>
              <ul className="list-none space-y-2 text-sm text-gray-600">
                <li><strong className="text-black">Why we do it:</strong> It allows you to extract meaningful subsets of data, remove irrelevant records, and perform highly specific, condition-based analysis.</li>
                <li><strong className="text-black">How we do it:</strong> We use the <code className="font-mono bg-gray-100 px-1 rounded text-black">filter()</code> function. For example, if you have a massive employee dataset, you can instantly extract only the employees who work in the IT department using the syntax <code className="font-mono bg-gray-100 px-1 rounded text-black">filter(employees, Department == "IT")</code>, or chain conditions to find Finance employees earning over 65,000.</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-xl text-black mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-mono">2</span>
                Sorting (Ordering)
              </h4>
              <p className="text-sm mb-3">Sorting simply means arranging your data in either ascending or descending order based on one or more variables.</p>
              <ul className="list-none space-y-2 text-sm text-gray-600">
                <li><strong className="text-black">How we do it:</strong> In the <code>dplyr</code> package, we use the <code className="font-mono bg-gray-100 px-1 rounded text-black">arrange()</code> function. If you want to sort a dataset of cars by their mileage in descending order, you would program exactly this: <code className="font-mono bg-gray-100 px-1 rounded text-black">arrange(mtcars, desc(mpg))</code>.</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-xl text-black mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-mono">3</span>
                Aggregating
              </h4>
              <p className="text-sm mb-3">Aggregation is the architectural process of grouping data by one or more categorical variables and computing summary statistics for those groups.</p>
              <ul className="list-none space-y-2 text-sm text-gray-600">
                <li><strong className="text-black">Why we do it:</strong> It gathers raw, granular data from multiple sources and turns it into a summarized form (like averages, minimums, or sums) so you can quickly identify high-level trends.</li>
                <li><strong className="text-black">How we do it:</strong> You can use base R's <code className="font-mono bg-gray-100 px-1 rounded text-black">aggregate()</code> function to get summary statistics by group, but as a top-tier analyst, you will often use <code>dplyr</code>'s piping method. By combining <code className="font-mono bg-gray-100 px-1 rounded text-black">group_by()</code> with <code className="font-mono bg-gray-100 px-1 rounded text-black">summarise()</code>, you can effortlessly calculate multiple metrics, such as the mean and standard deviation, for completely different categories at the same time.</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-xl text-black mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-mono">4</span>
                Mutating
              </h4>
              <p className="text-sm mb-3">Mutating involves modifying your existing dataset by creating entirely new variables or modifying existing ones using mathematical or logical operations.</p>
              <ul className="list-none space-y-2 text-sm text-gray-600">
                <li><strong className="text-black">How we do it:</strong> We use the <code className="font-mono bg-gray-100 px-1 rounded text-black">mutate()</code> function. This is essential for feature engineering. For example, if your dataset has a column for horsepower (<code>hp</code>) and a column for weight (<code>wt</code>), you can instruct R to mathematically calculate and append a brand new "power-to-weight" column using the code: <code className="font-mono bg-gray-100 px-1 rounded text-black">mutate(power_to_weight = hp / wt)</code>.</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-xl text-black mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-mono">5</span>
                Scaling and Normalization
              </h4>
              <p className="text-sm mb-3">Finally, algorithms require numerical data to be strictly balanced so that variables with massive numbers do not overpower variables with small numbers.</p>
              <ul className="list-none space-y-2 text-sm text-gray-600">
                <li><strong className="text-black">How we do it:</strong> R natively provides powerful functions like <code className="font-mono bg-gray-100 px-1 rounded text-black">scale()</code>, <code className="font-mono bg-gray-100 px-1 rounded text-black">log()</code>, or <code className="font-mono bg-gray-100 px-1 rounded text-black">sqrt()</code> to instantly normalize or transform skewed data distributions.</li>
                <li>You can rapidly scale a specific column using the built-in function, such as <code className="font-mono bg-gray-100 px-1 rounded text-black">scale(mtcars$mpg)</code>.</li>
                <li>If you need precise Min-Max scaling, I advise you to write a custom normalization function: <br/> <code className="font-mono bg-gray-900 text-white p-2 rounded block mt-2 overflow-x-auto">normalize &lt;- function(x) {'{'} return((x - min(x)) / (max(x) - min(x))) {'}'}</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'u2m5',
    title: '5. Visualization Using R (Base R & ggplot2)',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Visualization Using R</h2>
          <p className="mb-4 text-lg">A top data scientist must be a master visualizer. We will cover this in two phases: Basic Visualizations using Base R and Advanced Visualizations with ggplot2.</p>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">Phase 1: Basic Visualizations (Base R)</h3>
          <p className="mb-6">Base R is incredibly powerful because it requires minimal setup and gives you immediate visual feedback. Let us build your coding arsenal point by point. Here is the exact, proper code for every foundational graph in Base R, straight from our syllabus:</p>
          
          <div className="space-y-8">
             {/* Histograms */}
             <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                   <h4 className="font-bold text-lg text-black">1. Histograms (<code className="font-mono text-blue-600 text-sm">hist()</code>)</h4>
                   <p className="text-sm text-gray-600 mt-1">The ultimate tool for visualizing the frequency distribution of continuous numerical data. They divide data into bins and plot the frequency.</p>
                   <p className="text-sm text-gray-600 mt-1"><strong className="text-black">The Scenario:</strong> Visualizing the heights of girls in Class XII.</p>
                </div>
                <div className="p-0 bg-[#0d1117] text-gray-300 font-mono text-sm overflow-x-auto">
<pre className="p-4">{`# Define the dataset (Heights of girls in cm)
heights <- c(141, 145, 142, 147, 144, 148, 141, 142, 149, 144, 143, 149, 146, 141, 147, 142, 143)

# Generate the Histogram
hist(heights,  
     main = "Histogram of Heights (Class XII Girls)",  # Main title of the chart
     xlab = "Height (cm)",                             # Label for the x-axis
     ylab = "Frequency",                               # Label for the y-axis
     col = "lightblue",                                # Fill color of the bars
     border = "black")                                 # Color of the bar borders`}</pre>
                </div>
                <div className="bg-black text-white p-3 text-sm italic">
                  <strong>Professor's Note:</strong> Unlike a bar chart, notice that histograms represent continuous data, so the bars physically touch.
                </div>
             </div>

             {/* Line Charts */}
             <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                   <h4 className="font-bold text-lg text-black">2. Line Charts (<code className="font-mono text-blue-600 text-sm">plot()</code>)</h4>
                   <p className="text-sm text-gray-600 mt-1">Connect data points with straight lines. Your go-to visualization for showing trends over time or tracking continuous growth and decline.</p>
                   <p className="text-sm text-gray-600 mt-1"><strong className="text-black">The Scenario:</strong> Tracking monthly sales over the first half of the year.</p>
                </div>
                <div className="p-0 bg-[#0d1117] text-gray-300 font-mono text-sm overflow-x-auto">
<pre className="p-4">{`# Define the dataset
x <- 1:6                                      # Months 1 to 6
y <- c(120, 150, 170, 140, 180, 200)          # Sales figures

# Generate the Line Chart
plot(x, y,
     type = "b",                              # "b" means both points AND lines ("l" is lines only)
     main = "Monthly Sales",  
     sub = "First Half of Year",              # Adds a subtitle below the x-axis
     xlab = "Month",
     ylab = "Sales",
     col = "blue",  
     pch = 16,                                # Specifies the point symbol (16 is a solid circle)
     lwd = 2,                                 # Line width
     lty = 1,                                 # Line type (1 is a solid line)
     cex = 1.5,                               # Size of the points
     xlim = c(1, 6),                          # Explicit limits for the x-axis
     ylim = c(100, 220))                      # Explicit limits for the y-axis`}</pre>
                </div>
             </div>

             {/* Bar Charts */}
             <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                   <h4 className="font-bold text-lg text-black">3. Bar Charts (<code className="font-mono text-blue-600 text-sm">barplot()</code>)</h4>
                   <p className="text-sm text-gray-600 mt-1">Use rectangular bars separated by gaps to visualize the frequency distribution of categorical, discrete data.</p>
                   <p className="text-sm text-gray-600 mt-1"><strong className="text-black">The Scenario:</strong> Comparing the number of students enrolled in different academic streams.</p>
                </div>
                <div className="p-0 bg-[#0d1117] text-gray-300 font-mono text-sm overflow-x-auto">
<pre className="p-4">{`# Define the dataset
students <- c(40, 35, 50, 30)
streams <- c("Science", "Commerce", "Arts", "IT")

# Generate the Bar Chart
barplot(students,  
        names.arg = streams,                  # Assigns the category names under each bar
        main = "Students in Different Streams",  
        xlab = "Stream",  
        ylab = "Number of Students",  
        col = "skyblue",  
        border = "black")`}</pre>
                </div>
             </div>

             {/* Pie Charts */}
             <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                   <h4 className="font-bold text-lg text-black">4. Pie Charts (<code className="font-mono text-blue-600 text-sm">pie()</code>)</h4>
                   <p className="text-sm text-gray-600 mt-1">A circular graph divided into slices to visualize the percentage or relative proportion of categories making up a whole.</p>
                   <p className="text-sm text-gray-600 mt-1"><strong className="text-black">The Scenario:</strong> Visualizing a company's market share across different Indian cities.</p>
                </div>
                <div className="p-0 bg-[#0d1117] text-gray-300 font-mono text-sm overflow-x-auto">
<pre className="p-4">{`# Define the dataset
s <- c(23, 56, 20, 63)
labels <- c("Mumbai", "Pune", "Chennai", "Bangalore")

# Calculate precise percentages for the labels
piepercent <- round(100 * s / sum(s), 1)

# Generate the Pie Chart
pie(s,
    labels = piepercent,                      # Use the calculated percentages as labels
    main = "City pie chart",
    col = rainbow(length(s)))                 # Automatically generates distinct colors

# Add a Legend so the viewer knows which color is which city
legend("topright",                            # Position of the legend
       c("Mumbai", "Pune", "Chennai", "Bangalore"),  
       cex = 0.5,                             # Text size of the legend
       fill = rainbow(length(s)))             # Matches legend colors to the pie chart`}</pre>
                </div>
                <div className="bg-black text-white p-3 text-sm italic">
                  <strong>Professor's Note:</strong> Always limit pie charts to around seven categories to maintain visual clarity, and remember that they cannot depict zero values!
                </div>
             </div>

             {/* Boxplots */}
             <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                   <h4 className="font-bold text-lg text-black">5. Boxplots (<code className="font-mono text-blue-600 text-sm">boxplot()</code>)</h4>
                   <p className="text-sm text-gray-600 mt-1">Incredible statistical tools. They visually map the five-number summary (minimum, 25th percentile, median, 75th percentile, and maximum) and instantly reveal outliers.</p>
                   <p className="text-sm text-gray-600 mt-1"><strong className="text-black">The Scenario:</strong> Comparing the Miles Per Gallon (mpg) distribution across cars with different numbers of engine cylinders (cyl) using the built-in <code>mtcars</code> dataset.</p>
                </div>
                <div className="p-0 bg-[#0d1117] text-gray-300 font-mono text-sm overflow-x-auto">
<pre className="p-4">{`# Generate the Boxplot using a formula
boxplot(mpg ~ cyl, data = mtcars,             # Formula syntax: plot 'mpg' grouped by 'cyl'
        xlab = "Number of Cylinders",  
        ylab = "Miles Per Gallon",
        main = "Mileage Data",  
        notch = TRUE,                         # Draws a "notch" around the median for visual comparison
        varwidth = TRUE,                      # Makes the box width proportional to the sample size
        col = c("green", "yellow", "purple"), # Colors for the distinct boxes
        names = c("High", "Medium", "Low"))   # Custom labels for the x-axis groups`}</pre>
                </div>
             </div>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">Phase 2: Advanced Visualizations (<code className="text-blue-600">ggplot2</code>)</h3>
          <p className="mb-6">To build complex visuals, you must understand that it uses a layered approach based on the <strong>"Grammar of Graphics"</strong>. You do not just draw a chart; you construct it layer by layer.</p>
          
          <div className="bg-black text-white p-6 rounded-2xl shadow-xl mb-8 text-center font-mono text-lg overflow-x-auto border border-gray-800">
            ggplot(data, aes(x, y)) + geom_type() + theme()
          </div>

          <p className="mb-6 font-bold text-black">Let us break down these core building blocks point-wise:</p>
          <ul className="space-y-4">
            <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <strong className="text-black text-lg block mb-1">1. Data & Aesthetics (<code className="font-mono bg-white px-1 border border-gray-200 rounded">aes()</code>)</strong>
              <p className="text-sm text-gray-600">The foundation is your dataset. You use the <code className="font-mono bg-white px-1 border border-gray-200 rounded">aes()</code> function to map your specific data variables to visual attributes like the x-axis, y-axis, color, size, fill, and shape.</p>
            </li>
            <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <strong className="text-black text-lg block mb-1">2. Geometrics (<code className="font-mono bg-white px-1 border border-gray-200 rounded">geom_*()</code>)</strong>
              <p className="text-sm text-gray-600">You use the <code className="font-mono bg-white px-1 border border-gray-200 rounded">+</code> operator to add a geometric layer, which dictates exactly <em>how</em> the data is visually represented. For example, you use <code className="font-mono bg-white px-1 border border-gray-200 rounded">geom_point()</code> to display scatter plots, <code className="font-mono bg-white px-1 border border-gray-200 rounded">geom_line()</code> for line charts, or <code className="font-mono bg-white px-1 border border-gray-200 rounded">geom_histogram()</code> to visualize distributions.</p>
            </li>
            <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <strong className="text-black text-lg block mb-1">3. Facets & Coordinates</strong>
              <p className="text-sm text-gray-600">Faceting allows you to split subsets of your data into a grid of smaller rows and columns, while coordinates manage the mathematical space (like Cartesian or polar limits).</p>
            </li>
            <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <strong className="text-black text-lg block mb-1">4. Themes</strong>
              <p className="text-sm text-gray-600">Finally, you apply a theme to control the non-data elements (the background, gridlines, and text) to make your chart look highly professional. Functions like <code className="font-mono bg-white px-1 border border-gray-200 rounded">theme_minimal()</code>, <code className="font-mono bg-white px-1 border border-gray-200 rounded">theme_bw()</code>, or <code className="font-mono bg-white px-1 border border-gray-200 rounded">theme_classic()</code> instantly make your work presentation-ready.</p>
            </li>
          </ul>
        </div>
      </div>
    )
  }
];

function DashboardScreen({ subject, onBack }) {
  // State to track which module is selected in the sidebar
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
             <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
              <Layout size={18} />
            </div>
            <span className="font-bold text-lg hidden md:block tracking-tight">Everything.</span>
          </div>
          
          <div className="hidden lg:flex items-center bg-gray-50 px-4 py-2 rounded-full w-96 border border-gray-100 focus-within:border-black transition-colors">
            <Search size={18} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search concepts, topics..." 
              className="bg-transparent border-none outline-none w-full text-sm placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <span className="hidden md:block cursor-pointer hover:opacity-70">Courses</span>
          <span className="hidden md:block cursor-pointer hover:opacity-70">Tutorials</span>
          <span className="hidden md:block cursor-pointer hover:opacity-70">Practice</span>
          <div className="w-px h-4 bg-gray-200 mx-2 hidden md:block"></div>
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full border-2 border-white"></span>
          </button>
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 cursor-pointer">
            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=Felix`} alt="User" className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden max-w-[1600px] mx-auto w-full">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-72 border-r border-gray-100 hidden md:flex flex-col h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto bg-white p-6">
          <div className="mb-8">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Current Subject</p>
            <h3 className="text-xl font-medium tracking-tight bg-gray-50 p-4 rounded-2xl border border-gray-100">{subject || 'Selected Subject'}</h3>
          </div>

          <nav className="space-y-1">
            {/* Dynamically render sidebar items based on dmvModules array */}
            {dmvModules.map((module, idx) => (
               <SidebarItem 
                 key={module.id}
                 title={module.title} 
                 active={activeModuleIndex === idx} 
                 onClick={() => setActiveModuleIndex(idx)}
               />
            ))}
          </nav>

          <div className="mt-auto space-y-1 pt-8 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">Quick Resources</p>
            <SidebarItem title="Glossary" icon={false} />
            <SidebarItem title="Notes" icon={false} />
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-[#fafafa]">
          <div className="max-w-4xl mx-auto space-y-8">
            
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                <span>Unit 1</span>
                <ChevronRight size={14} />
                <span>Fundamentals</span>
                <ChevronRight size={14} />
                <span className="text-black font-medium">{dmvModules[activeModuleIndex].title}</span>
            </div>

            {/* Dynamic Content Container */}
            <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-gray-100 shadow-sm">
               {dmvModules[activeModuleIndex].content}
            </div>

            {/* Progress / Completion Block at the bottom */}
            {activeModuleIndex === dmvModules.length - 1 && (
              <div className="bg-white border border-gray-100 rounded-[2rem] p-8 mt-12 flex flex-col md:flex-row items-center justify-between text-center md:text-left shadow-sm">
                <div className="flex items-center gap-6 flex-col md:flex-row">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-medium tracking-tight mb-1">Unit 1 Completed!</h2>
                    <p className="text-gray-500 text-sm">You have reviewed all modules in Data Visualization and Modeling Fundamentals.</p>
                  </div>
                </div>
                <div className="mt-6 md:mt-0">
                  <PillButton dark={true}>Take the Quiz</PillButton>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ title, active = false, icon = true, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`
      flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all
      ${active ? 'bg-black text-white font-medium' : 'text-gray-600 hover:bg-gray-50'}
    `}>
      {icon && (
        <div className={`w-5 h-5 rounded-full flex items-center justify-center border flex-shrink-0 ${active ? 'border-white/30 text-white' : 'border-gray-300 text-transparent'}`}>
          <CheckCircle2 size={14} className={active ? 'opacity-100' : 'opacity-0'} />
        </div>
      )}
      <span className="text-sm leading-tight">{title}</span>
    </div>
  );
}

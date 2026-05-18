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
            <span>© 2026 Everything Platform</span>
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
    { id: 3, title: 'Unit 3: Regression, Classification & Clustering', category: 'Chapter 3' },
    { id: 4, title: 'Unit 4: Advanced Data Visualization', category: 'Chapter 4' },
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
                <p className="text-sm text-gray-500 italic">Examples: Temperature in Celsius or Fahrenheit (0°C does not mean "no temperature", it is just a point on the scale), or Calendar years.</p>
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
              <p className="text-sm mb-3 text-gray-500 italic bg-gray-50 p-3 rounded-lg border border-gray-100"><strong>Real-world Example:</strong> Instead of analyzing every exact age (19, 20, 21...), we can discretize the Age attribute into categories like "Young", "Adult", and "Senior". Similarly, continuous Marks can be converted into Grades (e.g., ≥ 75 is "Excellent", 50–74 is "Good", and &lt; 50 is "Poor").</p>
              <p className="text-sm border-l-2 border-black pl-3 py-1"><strong>Concept Hierarchy Generation:</strong> Related to discretization, this involves replacing low-level data with higher-level concepts, such as converting a highly specific "City" into a broader "State" or "Country".</p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-black text-white p-8 rounded-3xl">
          <h4 className="font-bold text-xl mb-3">Outcome</h4>
          <p className="text-gray-300 leading-relaxed">
            Upon the successful execution of the preprocessing pipeline—comprising Cleaning, Integration, Transformation, Reduction, and Discretization—the data is classified as <strong>"Ready for Analysis."</strong> At this stage, the dataset is refined, consistent, and structured appropriately for ingestion by machine learning models, data mining algorithms, and visualization frameworks to facilitate informed decision-making.
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
                 <p className="text-sm">Real-world data is messy, my student. EDA is absolutely crucial because it helps you identify unusual data points within your dataset. We call these extreme values "outliers," and they deviate significantly from your other observations, often caused by measurement mistakes, data entry errors, or natural variations. By spotting these outliers—along with revealing missing values and data types—EDA allows you to properly clean and preprocess the data to guarantee high data quality.</p>
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
                <li>This provides a complete overview of the data’s distribution, central tendency, and variability, helping you identify irregular patterns.</li>
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
                <li>To explore <strong>relationships</strong> between multiple variables, you will use scatter plots, correlation matrices, and statistical tests like Pearson’s or Spearman’s correlation coefficients.</li>
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
                 <li><strong>Spearman’s Rank (<code className="font-mono bg-gray-100 px-1 rounded">ρ</code>):</strong> If your data is ordinal or the relationship is non-linear, you use Spearman's Rank to assess <em>monotonic relationships</em> (meaning the variables tend to move in the same relative direction, but not necessarily at a constant, straight-line rate).</li>
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
                    <li>A data point is officially an outlier if it falls below the <strong>Lower Limit</strong> (<code className="font-mono bg-white px-1 border border-gray-200 rounded">Q1 - 1.5 × IQR</code>) or above the <strong>Upper Limit</strong> (<code className="font-mono bg-white px-1 border border-gray-200 rounded">Q3 + 1.5 × IQR</code>).</li>
                  </ul>
                </li>
                <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <strong className="text-black block mb-2">The Z-Score Method:</strong>
                  <p className="text-sm mb-1">This measures how many standard deviations a data point is away from the mean.</p>
                  <ul className="list-circle pl-5 text-sm text-gray-600 space-y-1 mt-2">
                    <li>The formula is <code className="font-mono bg-white px-1 border border-gray-200 rounded">Z = (X - μ) / σ</code>.</li>
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

// --- DATA CONTENT FROM DMV UNIT 3 ---
const unit3Modules = [
  {
    id: 'u3m1',
    title: '1. Supervised vs. Unsupervised Models',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Supervised VS Unsupervised Learning</h2>
          <p className="mb-4">This is where your data science skills truly evolve into machine learning! Before coding, we must understand the core architecture of machine learning.</p>
          <p className="mb-6 font-bold text-black">If you fundamentally misunderstand which architecture to apply to your data, your entire model will fail. Let us dissect these two paradigms point by point so you can architect flawless systems.</p>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm mb-8">
             <div className="bg-black text-white p-6">
                <h3 className="text-2xl font-bold">1. Supervised Learning (The Guided Approach)</h3>
                <p className="text-gray-300 mt-2">In this architecture, you act as the "supervisor" to the algorithm. You train the model using <strong>labeled data</strong>, meaning your dataset consists of both the input features and the exact, accurate output (the answer key).</p>
             </div>
             <div className="p-6 space-y-6 bg-white">
                <div>
                   <h4 className="font-bold text-lg text-black mb-2">The Core Process</h4>
                   <p className="text-sm text-gray-600">The algorithm learns the mathematical mapping from the input to the output, actively adjusting itself to minimize prediction errors. For example, if you feed the model pictures of apples (the input data) alongside explicit annotations stating "These are apples" (the labels), the model learns the exact patterns required to predict "It's an apple!" when shown new data.</p>
                </div>
                <div>
                   <h4 className="font-bold text-lg text-black mb-2">The Primary Goal</h4>
                   <p className="text-sm text-gray-600">To predict known outcomes or explicitly classify new, unseen data points based on historical examples.</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                   <h4 className="font-bold text-lg text-black mb-3">The Two Major Tasks</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <strong className="text-black block mb-1">Regression:</strong>
                        <p className="text-sm text-gray-600 mb-2">Used when the output you want to predict is <em>continuous</em> (numerical data).</p>
                        <p className="text-sm text-gray-500 italic">Example: Predicting exact house prices based on features like square footage and location.</p>
                     </div>
                     <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <strong className="text-black block mb-1">Classification:</strong>
                        <p className="text-sm text-gray-600 mb-2">Used when the output you want to predict is <em>discrete</em> (categorical data).</p>
                        <p className="text-sm text-gray-500 italic">Example: Identifying whether an incoming email should be marked as "spam" or "not spam".</p>
                     </div>
                   </div>
                </div>
                <div className="pt-2">
                   <strong className="text-black text-sm">Key Algorithms:</strong> <span className="text-sm text-gray-600">Linear Regression, Logistic Regression, K-Nearest Neighbors (KNN), Decision Trees, Support Vector Machines (SVM), and Neural Networks.</span>
                </div>
             </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
             <div className="bg-gray-900 text-white p-6">
                <h3 className="text-2xl font-bold">2. Unsupervised Learning (The Discovery Approach)</h3>
                <p className="text-gray-300 mt-2">In this architecture, the algorithm is entirely on its own. You feed the model strictly <strong>unlabeled data</strong>, meaning it consists only of raw input features without any predefined answers or target outputs.</p>
             </div>
             <div className="p-6 space-y-6 bg-white">
                <div>
                   <h4 className="font-bold text-lg text-black mb-2">The Core Process</h4>
                   <p className="text-sm text-gray-600">Because there are no labels to map to, the model must autonomously find inherent groupings or structures within the data. For example, if you feed the model a mixed dataset containing images of apples, bananas, and peaches without any labels, the model will automatically group them into three distinct clusters based purely on their structural similarities (like color and shape).</p>
                </div>
                <div>
                   <h4 className="font-bold text-lg text-black mb-2">The Primary Goal</h4>
                   <p className="text-sm text-gray-600">To discover hidden patterns, underlying structures, or unknown relationships within raw data.</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                   <h4 className="font-bold text-lg text-black mb-3">The Three Major Tasks</h4>
                   <div className="space-y-4">
                     <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <strong className="text-black block mb-1">Clustering:</strong>
                        <p className="text-sm text-gray-600 mb-2">Automatically grouping unlabelled data points into clusters based on their similarity.</p>
                        <p className="text-sm text-gray-500 italic">Example: Grouping a massive database of customers into distinct segments for targeted marketing.</p>
                     </div>
                     <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <strong className="text-black block mb-1">Association:</strong>
                        <p className="text-sm text-gray-600 mb-2">Discovering rules that describe relationships between variables in large databases.</p>
                        <p className="text-sm text-gray-500 italic">Example: Market basket analysis (e.g., discovering that customers who buy bread also frequently buy butter).</p>
                     </div>
                     <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <strong className="text-black block mb-1">Dimensionality Reduction:</strong>
                        <p className="text-sm text-gray-600">Simplifying the dataset by reducing the number of random variables under consideration.</p>
                     </div>
                   </div>
                </div>
                <div className="pt-2">
                   <strong className="text-black text-sm">Key Algorithms:</strong> <span className="text-sm text-gray-600">K-Means Clustering, DBSCAN, and Autoencoders.</span>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-gray-100 border border-gray-200 p-6 rounded-2xl shadow-sm mt-8">
           <h4 className="font-bold text-xl text-black mb-2">The Architect's Summary:</h4>
           <p className="text-gray-700">If you have a specific target variable you want to predict (like "Sales" or "Disease Yes/No"), you must build a <strong>Supervised</strong> model. If you simply have a massive ocean of data and want to know "What natural patterns exist in here?", you deploy an <strong>Unsupervised</strong> model.</p>
        </div>
      </div>
    )
  },
  {
    id: 'u3m2',
    title: '2. Regression Models (Linear & Logistic)',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Regression Models</h2>
          <p className="mb-4">We will learn how to quantify relationships between variables and predict future outcomes. Let us break down Linear and Logistic Regression point by point so you can architect these models flawlessly.</p>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">1. Linear Regression (Predicting Continuous Outcomes)</h3>
          <p className="mb-6">Linear regression is a powerful statistical method used when your dependent variable (the outcome you want to predict) is continuous, such as forecasting exact house prices or a student's exam score based on study hours.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
               <h4 className="font-bold text-lg text-black mb-2">The Mathematical Architecture</h4>
               <p className="text-sm mb-3">The goal is to fit a mathematical equation (a straight line) to your data. For a simple linear regression with one independent variable, the equation is:</p>
               <div className="bg-white border border-gray-200 p-3 rounded-lg text-center font-mono font-bold text-black mb-3 text-lg">
                 ŷ = b · x + a
               </div>
               <p className="text-sm text-gray-600">where <strong>'b'</strong> is the slope of the line and <strong>'a'</strong> is the y-intercept.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
               <h4 className="font-bold text-lg text-black mb-2">The Line of Best Fit</h4>
               <p className="text-sm text-gray-600">You do not just draw a line arbitrarily. We calculate this straight line using the <strong>method of least squares</strong>. This mathematical technique strictly minimizes the sum of the squares of the vertical distances between your actual observed data points and the line.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-gray-200 p-5 rounded-xl">
               <h4 className="font-bold text-lg text-black mb-2">2. Visualizations for Linear Regression</h4>
               <p className="text-sm text-gray-600 mb-2">A top-tier data scientist must prove their mathematical models visually.</p>
               <p className="text-sm text-gray-600"><strong className="text-black">Scatter Plots with Regression Lines:</strong> To visualize the linear relationship, we plot the independent variable on the X-axis and the dependent variable on the Y-axis to create a scatter plot. Then, we overlay our calculated regression line directly over the points. The closer your data points lie to this straight red line, the stronger the linear relationship.</p>
            </div>

            <div className="border border-gray-200 p-5 rounded-xl">
               <h4 className="font-bold text-lg text-black mb-2">3. Residual Analysis (Model Interrogation)</h4>
               <p className="text-sm text-gray-600 mb-3">You must never trust your regression model blindly. You must interrogate it using Residual Analysis.</p>
               <p className="text-sm text-gray-600 mb-4"><strong className="text-black">What are Residuals?</strong> Residuals are the observable, calculated differences between the actual observed values in your dataset and the estimated values predicted by your regression line.</p>
               <div className="bg-gray-50 p-4 rounded-lg">
                 <strong className="text-black block mb-2 text-sm">Residual Plots: Look for specific patterns:</strong>
                 <ul className="list-disc pl-5 text-sm space-y-2 text-gray-600">
                   <li><strong>The Perfect Scenario (Random Scatter):</strong> If the points are scattered completely randomly around the zero line with no discernible trend, your linear model is appropriate and fits well.</li>
                   <li><strong>U-Shaped or Curved Pattern:</strong> If the residuals form a curve, it indicates a systematic flaw—specifically, that a linear model is not appropriate because the underlying relationship is non-linear.</li>
                   <li><strong>Cone-Shaped Pattern (Fanning Out):</strong> If the residuals spread out like a funnel or cone, it indicates <em>heteroscedasticity</em>. This means the variance of your errors is not constant, which violates a core assumption of linear regression.</li>
                 </ul>
               </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">4. Logistic Regression (Predicting Categorical Probabilities)</h3>
          <p className="mb-6">If your goal is to predict a category—such as deciding if a tumor is malignant/not malignant, or if an email is spam/not spam—Linear Regression will fail. You must use <strong>Logistic Regression</strong>.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
               <h4 className="font-bold text-lg text-black mb-2">The Sigmoid Curve</h4>
               <p className="text-sm text-gray-600">Instead of fitting a straight line, logistic regression uses a sigmoid function (the cumulative distribution function of the logistic distribution). This mathematical transformation bends the line into an "S" shape, ensuring that the output prediction is strictly a probability value confined between 0 and 1.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
               <h4 className="font-bold text-lg text-black mb-2">Classification Threshold</h4>
               <p className="text-sm text-gray-600">Once the probability is calculated, we apply a threshold (often 0.5) to lock the prediction into a discrete binary category (e.g., if probability &gt; 0.5, predict Class 1).</p>
            </div>
          </div>

          <div className="border border-gray-200 p-5 rounded-xl">
             <h4 className="font-bold text-lg text-black mb-4">5. Evaluation & Visualizations for Classification</h4>
             <p className="text-sm text-gray-600 mb-4">Evaluating a Logistic Regression model requires entirely different metrics than Linear Regression. We use two ultimate tools:</p>
             
             <div className="space-y-6">
                <div>
                  <strong className="text-black text-base block mb-2 border-b pb-1">The Confusion Matrix:</strong>
                  <p className="text-sm text-gray-600 mb-3">A table that rigorously evaluates your predictions by mapping them into four quadrants: True Positives (TP), True Negatives (TN), False Positives (FP), and False Negatives (FN). From this matrix, we calculate strict performance metrics:</p>
                  <ul className="list-disc pl-5 text-sm space-y-2 text-gray-600">
                    <li><strong>Accuracy:</strong> The total percentage of correctly classified test tuples.</li>
                    <li><strong>Precision:</strong> The ratio of correctly predicted positive observations to the total predicted positive observations <code className="font-mono bg-gray-100 px-1 rounded">TP / (TP + FP)</code>.</li>
                    <li><strong>Recall (Sensitivity):</strong> The ratio of correctly predicted positive observations to all actual positive observations <code className="font-mono bg-gray-100 px-1 rounded">TP / (TP + FN)</code>.</li>
                  </ul>
                </div>
                
                <div>
                  <strong className="text-black text-base block mb-2 border-b pb-1">ROC Curves (Receiver Operating Characteristic):</strong>
                  <p className="text-sm text-gray-600 mb-3">This is a graphical tool used to evaluate how perfectly your model distinguishes between the two classes. It plots the <strong>False Positive Rate (FPR)</strong> on the X-axis against the <strong>True Positive Rate (TPR)</strong> on the Y-axis.</p>
                  <ul className="list-disc pl-5 text-sm space-y-2 text-gray-600">
                    <li><strong>Visual Interpretation:</strong> The closer your curve hugs the top-left corner of the plot, the better your model is performing. A curve following the diagonal line represents a useless model that is merely guessing randomly.</li>
                    <li><strong>AUC (Area Under the Curve):</strong> This is the ultimate mathematical summary of the ROC curve. It calculates the exact physical area beneath the curve, resulting in a value between 0 and 1. A score of 1.0 means you have built a perfect classifier, while an AUC between 0.9 and 1.0 is considered "Excellent".</li>
                  </ul>
                </div>
             </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'u3m3',
    title: '3. Classification Models (KNN)',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Classification Models (K-Nearest Neighbors - KNN)</h2>
          <p className="mb-4">We will explore instance-based learning, where a new data point is classified by taking a "majority vote" from its 'K' closest neighbors.</p>
          <p className="mb-4">Unlike linear regression which builds a mathematical equation, KNN is an "instance-based" or "lazy" learner. It does not learn a strict equation; instead, it learns by pure analogy.</p>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">1. The Architecture of K-Nearest Neighbors (KNN)</h3>
          <p className="mb-4 text-sm">When we feed the algorithm a brand new, unknown data point, it searches the entire training dataset to find the 'K' number of points that are physically closest to it.</p>
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-sm mb-6">
             <strong className="text-black block mb-2">The Majority Vote:</strong>
             <p className="text-sm text-gray-600">Once it finds these 'K' nearest neighbors, it simply counts their class labels. The new data point is assigned to the class that has the highest frequency (the majority vote) among those neighbors.</p>
          </div>
          <div className="bg-black text-white p-4 rounded-xl text-sm italic">
             <strong>Professor's Warning:</strong> Because KNN relies entirely on distance, you <strong>must</strong> normalize your data (using Min-Max normalization) before running the algorithm. If you do not, variables with large numbers (like Salary) will completely overpower variables with small numbers (like Age).
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">2. Distance Metrics (The Mathematics of Closeness)</h3>
          <p className="mb-4 text-sm">How exactly does the algorithm calculate what is "closest"? You must act as the architect and choose the correct distance formula based on your data type. Here are the six metrics you must master:</p>
          <ul className="space-y-4">
             <li className="p-4 border border-gray-200 rounded-xl">
               <strong className="text-black block mb-1">1. Euclidean Distance:</strong>
               <p className="text-sm text-gray-600 mb-2">The absolute standard. It measures the ordinary straight-line distance between two points. It is best for continuous numerical data.</p>
               <p className="text-sm font-mono bg-gray-50 p-2 rounded text-black text-center">d(x,y) = √[Σ(x_i - y_i)²]</p>
             </li>
             <li className="p-4 border border-gray-200 rounded-xl">
               <strong className="text-black block mb-1">2. Manhattan Distance:</strong>
               <p className="text-sm text-gray-600 mb-2">It calculates the absolute differences of the coordinates, akin to a taxi navigating the grid of city blocks. It is highly effective for high-dimensional data.</p>
               <p className="text-sm font-mono bg-gray-50 p-2 rounded text-black text-center">d(x,y) = Σ|x_i - y_i|</p>
             </li>
             <li className="p-4 border border-gray-200 rounded-xl">
               <strong className="text-black block mb-1">3. Minkowski Distance:</strong>
               <p className="text-sm text-gray-600">This is the ultimate generalized distance measure. It uses a parameter 'p'. If you set p=1, it becomes the Manhattan distance. If you set p=2, it becomes the Euclidean distance.</p>
             </li>
             <li className="p-4 border border-gray-200 rounded-xl">
               <strong className="text-black block mb-1">4. Cosine Similarity / Distance:</strong>
               <p className="text-sm text-gray-600">Instead of measuring the physical distance, this measures the <em>angle</em> between two vectors. It is perfect for Text Mining and NLP (e.g., comparing two documents regardless of their length).</p>
             </li>
             <li className="p-4 border border-gray-200 rounded-xl">
               <strong className="text-black block mb-1">5. Hamming Distance:</strong>
               <p className="text-sm text-gray-600">Used specifically for binary strings or DNA sequences. It simply counts the number of positions where two strings of equal length differ.</p>
             </li>
             <li className="p-4 border border-gray-200 rounded-xl">
               <strong className="text-black block mb-1">6. Jaccard Index:</strong>
               <p className="text-sm text-gray-600">A set-based distance that measures the ratio of unique elements to common elements. It is widely used for categorical data or comparing shopping carts.</p>
             </li>
          </ul>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">3. Visualizations and Model Tuning</h3>
          <p className="mb-4 text-sm">A top-tier data scientist does not just guess the value of 'K'. We prove it visually.</p>
          
          <div className="space-y-4">
             <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <strong className="text-black text-lg block mb-2">Decision Boundaries:</strong>
                <p className="text-sm text-gray-600 mb-2">This is a visualized line or surface that divides different classification groups in your feature space.</p>
                <p className="text-sm text-gray-600"><strong>Impact of K:</strong> If you choose a very <em>small K</em> (like K=1), the boundary becomes highly complex and jagged, closely wrapping around every single data point. This causes severe <em>overfitting</em>. If you choose a very <em>large K</em>, the boundary smooths out completely, which can lead to <em>underfitting</em>.</p>
             </div>
             <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <strong className="text-black text-lg block mb-2">Error Rate vs. Accuracy Plots:</strong>
                <p className="text-sm text-gray-600 mb-2">To perfectly tune the 'K' hyperparameter, we plot the Error Rate (or Accuracy, which is <code className="font-mono bg-white px-1 rounded">1 - Error Rate</code>) across a range of K values (e.g., from 1 to 40).</p>
                <p className="text-sm text-gray-600"><strong>The Elbow Point:</strong> As K increases from 1, the error rate initially drops. You must look for the "elbow point" on the graph where the error rate hits its absolute lowest value before it begins to stabilize or rise again. That exact point is your mathematically optimal K value.</p>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">4. R Programming Implementation</h3>
          <p className="mb-4 text-sm">Here is the exact, professional R code to execute KNN, evaluate it using a Confusion Matrix, and plot the Accuracy curve to find your optimal 'K'.</p>
          
          <div className="bg-[#0d1117] text-gray-300 font-mono text-sm overflow-x-auto rounded-2xl shadow-xl">
<pre className="p-6">{`# 1. Load the necessary libraries 
library(e1071) 
library(caTools) 
library(class)     # The primary library for the knn() function 
library(ggplot2) 


# 2. Load and split the dataset 
data(iris) 
set.seed(123) # Ensure reproducibility 
split <- sample.split(iris$Species, SplitRatio = 0.7) 
train_data <- subset(iris, split == TRUE) 
test_data <- subset(iris, split == FALSE) 


# 3. Train the KNN model (Testing with K = 3) 
k <- 3  
# Notice we remove the 5th column (the target labels) from train and test sets 
knn_model <- knn(train = train_data[, -5], 
                 test = test_data[, -5], 
                 cl = train_data$Species, 
                 k = k) 



# 4. Evaluate the model 
conf_matrix <- table(knn_model, test_data$Species) 
accuracy <- sum(diag(conf_matrix)) / sum(conf_matrix) 

print(conf_matrix) 
cat("\\nAccuracy:", accuracy, "\\n") 

# 5. Hyperparameter Tuning: Loop through K values 1 to 20 
k_values <- 1:20 
accuracy_values <- numeric(length(k_values)) 

for (i in 1:length(k_values)) { 
  knn_model_loop <- knn(train = train_data[, -5], 
                        test = test_data[, -5], 
                        cl = train_data$Species, 
                        k = k_values[i]) 

  c_matrix <- table(knn_model_loop, test_data$Species) 
  accuracy_values[i] <- sum(diag(c_matrix)) / sum(c_matrix) 
} 




# 6. Visualize Accuracy vs. K to find the optimal 'K' 
accuracy_df <- data.frame(K = k_values, Accuracy = accuracy_values) 

ggplot(accuracy_df, aes(x = K, y = Accuracy)) + 
  geom_line(color = "blue") + 
  geom_point(color = "blue") + 
  labs(title = "Accuracy vs. Number of Neighbors (K)", 
       x = "Number of Neighbors (K)", 
       y = "Accuracy") + 
  theme_minimal() `}</pre>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'u3m4',
    title: '4. Clustering Models (K-Means)',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Clustering Models (K-Means Clustering)</h2>
          <p className="mb-4">Moving to unsupervised learning, we will logically group similar unlabelled data points. Let us dissect the mathematics, the initialization strategies, the visual proofs, and the exact R code you need to build this flawlessly.</p>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">1. The Architecture of the K-Means Algorithm</h3>
          <p className="mb-4 text-sm">K-Means is a centroid-based partitioning technique. Its primary mathematical objective is to achieve high <em>intracluster similarity</em> (points in the same group are very close to each other) and low <em>intercluster similarity</em> (different groups are far apart).</p>
          
          <div className="space-y-4">
             <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                <strong className="text-black text-lg block mb-1">The Centroid:</strong>
                <p className="text-sm text-gray-600">Each cluster is represented by a "centroid," which is the exact center point or mean value of all the objects assigned to that cluster.</p>
             </div>
             <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
                <strong className="text-black text-lg block mb-3">The Iterative Process:</strong>
                <p className="text-sm text-gray-600 mb-2">The algorithm works in a strict loop:</p>
                <ul className="list-decimal pl-5 text-sm space-y-2 text-gray-700">
                  <li>It arbitrarily chooses 'K' objects from the dataset to act as the initial cluster centers.</li>
                  <li>It calculates the Euclidean distance between every data point and these centers, assigning each point to the centroid it is most similar to (closest to).</li>
                  <li>Once all points are assigned, it recalculates and updates the cluster means (the new centroids).</li>
                  <li>It repeats this reassignment and updating process until the centroids stop moving (no change).</li>
                </ul>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">2. Centroid Initialization (The Critical First Step)</h3>
          <p className="mb-4 text-sm">Where you place your very first, initial centroids drastically alters your final results. If you initialize them poorly, the algorithm may converge to a "local optimum," resulting in completely incorrect clustering. Here are the architectural methods you must know:</p>
          <ul className="space-y-3">
             <li className="flex items-start gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0"></div>
               <div>
                 <strong className="text-black">1. Random Initialization:</strong> <span className="text-sm text-gray-600">Selecting 'K' random data points. It is simple and fast, but highly risky because results will vary every single time you run the code, potentially leading to poor clustering.</span>
               </div>
             </li>
             <li className="flex items-start gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
               <div>
                 <strong className="text-black">2. K-Means++ (Best Practice):</strong> <span className="text-sm text-gray-600">This is the industry standard. You select the first centroid completely randomly, but the remaining centroids are chosen based on the maximum distance from the already existing centroids. This drastically improves clustering accuracy and convergence speed.</span>
               </div>
             </li>
             <li className="flex items-start gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0"></div>
               <div>
                 <strong className="text-black">3. Forgy Method:</strong> <span className="text-sm text-gray-600">Randomly selecting 'K' actual observations from the dataset to serve as the initial centroids (very similar to random initialization).</span>
               </div>
             </li>
             <li className="flex items-start gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0"></div>
               <div>
                 <strong className="text-black">4. Random Partition:</strong> <span className="text-sm text-gray-600">Assigning every data point randomly to a cluster first, and then computing the centroids based on those random groups. It is often mathematically unstable.</span>
               </div>
             </li>
             <li className="flex items-start gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0"></div>
               <div>
                 <strong className="text-black">5. Manual Initialization:</strong> <span className="text-sm text-gray-600">As an architect, if you already have prior domain knowledge about the data, you manually dictate exactly where the initial centroids should be.</span>
               </div>
             </li>
          </ul>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">3. Visualizations for Clustering</h3>
          <p className="mb-4 text-sm">In unsupervised learning, visual proof is everything. We rely on three primary visual techniques:</p>
          
          <div className="grid grid-cols-1 gap-6">
             <div className="border border-gray-200 p-5 rounded-xl">
                <strong className="text-black text-lg block mb-2 border-b pb-1">Multi-Colored Scatter Plots:</strong>
                <p className="text-sm text-gray-600">Once the algorithm assigns the clusters, we plot our data points on a 2D grid and color-code them based on their assigned cluster. We also overlay a distinct marker (like a black 'X') to clearly show the final centroid positions.</p>
             </div>
             
             <div className="border border-gray-200 p-5 rounded-xl">
                <strong className="text-black text-lg block mb-2 border-b pb-1">The Elbow Method (Finding 'K'):</strong>
                <p className="text-sm text-gray-600 mb-2">How do you know if you should create 3 clusters or 10? You must calculate the <strong>Within-Cluster Sum of Squares (WCSS)</strong>, which measures how close data points are to their centroids. WCSS always decreases as 'K' increases.</p>
                <p className="text-sm text-gray-600">You plot 'K' (x-axis) against WCSS (y-axis). The exact point on the curve where the improvement drops off sharply and becomes marginal is called the "elbow." That point mathematically dictates your optimal number of clusters.</p>
             </div>
             
             <div className="border border-gray-200 p-5 rounded-xl">
                <strong className="text-black text-lg block mb-2 border-b pb-1">Silhouette Plots (Evaluating Quality):</strong>
                <p className="text-sm text-gray-600 mb-2">This measures exactly how well each data point fits within its assigned cluster compared to other clusters. The Silhouette Score ranges from <strong>-1 to +1</strong>.</p>
                <ul className="list-disc pl-5 text-sm space-y-1 text-gray-600 mt-2">
                   <li><strong>+1</strong> means the point is perfectly clustered.</li>
                   <li><strong>0</strong> means the point is dangerously close to the boundary of another cluster.</li>
                   <li><strong>-1</strong> means the point has been misclassified into the wrong cluster entirely.</li>
                </ul>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">4. R Programming Implementation</h3>
          <p className="mb-4 text-sm">Here is the exact, professional R code to execute the K-Means algorithm, visualize the clusters, find the elbow, and plot the silhouette scores using the <code>iris</code> dataset.</p>
          
          <div className="bg-[#0d1117] text-gray-300 font-mono text-sm overflow-x-auto rounded-2xl shadow-xl">
<pre className="p-6">{`# 1. Load Necessary Libraries 
library(ggplot2) 
library(cluster) 

# 2. Prepare the Data 
data("iris") 
# We remove the labels to make it strictly Unsupervised 
iris_data <- iris[, c("Petal.Length", "Petal.Width")] 

# --------------------------------------------------------- 
# PART A: THE ELBOW METHOD (Finding Optimal K) 
# --------------------------------------------------------- 
# Calculate WCSS for k values from 1 to 10 
wss <- sapply(1:10, function(k) { 
  kmeans(iris_data, centers = k, nstart = 10)$tot.withinss 
}) 

# Plot the Elbow Curve 
elbow_plot <- data.frame(k = 1:10, wss = wss) 
ggplot(elbow_plot, aes(x = k, y = wss)) + 
  geom_line(color = "blue") + 
  geom_point(size = 3, color = "red") + 
  labs(title = "Elbow Method for Optimal k", 
       x = "Number of Clusters (k)", 
       y = "Total Within-Cluster Sum of Squares (WSS)") + 
  theme_minimal() 

# --------------------------------------------------------- 
# PART B: APPLYING K-MEANS ALGORITHM (Assuming K=3) 
# --------------------------------------------------------- 
set.seed(123)  # Ensure exact reproducibility 
# centers = 3 dictates 'K', nstart = 10 dictates random initial configurations tried 
kmeans_model <- kmeans(iris_data, centers = 3, nstart = 10) 

# Add the resulting clusters back to the original dataset for plotting 
iris$Cluster <- as.factor(kmeans_model$cluster) 

# Visualize the Scatter Plot with Cluster Centers 
centers <- as.data.frame(kmeans_model$centers) 
ggplot(iris, aes(x = Petal.Length, y = Petal.Width, color = Cluster)) + 
  geom_point(size = 3) + 
  geom_point(data = centers, aes(x = Petal.Length, y = Petal.Width), 
             color = "black", size = 5, shape = 4) +  # The Centroids 
  labs(title = "K-Means Clustering with Cluster Centers", 
       x = "Petal Length", 
       y = "Petal Width") + 
  theme_minimal() +  
  scale_color_manual(values = c("red", "blue", "green")) 

# --------------------------------------------------------- 
# PART C: SILHOUETTE PLOT EVALUATION 
# --------------------------------------------------------- 
# Scale the data and calculate the distance matrix (squared Euclidean) 
data_scaled <- scale(iris[, 1:4]) 
km_result <- kmeans(data_scaled, centers = 3, nstart = 25) 
cluster_assignment <- km_result$cluster 
distance_matrix <- dist(data_scaled)^2 

# Compute and plot the silhouette values 
sil_values <- silhouette(cluster_assignment, distance_matrix) 
plot(sil_values, main = "Silhouette Plot for K-Means Clustering") `}</pre>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'u3m5',
    title: '5. Performance Evaluation Metrics',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Performance Evaluation Metrics (Cross-Cutting Topic)</h2>
          <p className="mb-4">A top-tier data scientist proves their model's worth with hard math. Metrics for final model evaluation and outward presentation to stakeholders are strictly different from <em>loss functions</em> that algorithms use internally for optimization.</p>
          <p className="mb-6 font-bold text-black">Let us master the absolute mathematical proofs for all three domains:</p>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm mb-8">
             <div className="bg-black text-white p-6">
                <h3 className="text-2xl font-bold">1. Regression Metrics (Evaluating Continuous Predictions)</h3>
                <p className="text-gray-300 mt-2">When evaluating models like Linear Regression, we measure the physical distances between our predicted values and the actual ground truth.</p>
             </div>
             <div className="p-6 space-y-4 bg-white">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <strong className="text-black text-lg block mb-1">MSE (Mean Squared Error):</strong>
                  <p className="text-sm text-gray-600">This is the most common metric for regression. It calculates the average of the squared differences between your estimated values and the actual values. Because the errors are squared, it heavily penalizes large mistakes.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <strong className="text-black text-lg block mb-1">RMSE (Root Mean Square Error/Deviation):</strong>
                  <p className="text-sm text-gray-600">This is simply the square root of the MSE. We use this to evaluate overall prediction accuracy because taking the square root converts the error back into the original units of the target variable, making it much easier to interpret.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <strong className="text-black text-lg block mb-1">MAE (Mean Absolute Error):</strong>
                  <p className="text-sm text-gray-600">Instead of squaring the differences, this calculates the average <em>absolute</em> difference between the estimated and actual values. It is highly useful when you do not want to aggressively penalize extreme outliers.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <strong className="text-black text-lg block mb-1">R² (Coefficient of Determination):</strong>
                  <p className="text-sm text-gray-600">This is a master metric. It represents the ratio between the variance of your model's predictions and the variance of the ground truth. It essentially tells you exactly how much of the variation in the dataset is successfully explained by your model.</p>
                </div>
             </div>
          </div>

          <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm mb-8">
             <div className="bg-gray-900 text-white p-6">
                <h3 className="text-2xl font-bold">2. Classification Metrics (Evaluating Categorical Predictions)</h3>
                <p className="text-gray-300 mt-2">For models like Logistic Regression and KNN, we cannot measure "distance" to an error. Instead, we derive our metrics from the <strong>Confusion Matrix</strong>, which counts True Positives (TP), True Negatives (TN), False Positives (FP), and False Negatives (FN).</p>
             </div>
             <div className="p-6 space-y-4 bg-white">
                <div className="border border-gray-200 p-4 rounded-xl">
                  <strong className="text-black block mb-1">Precision:</strong>
                  <p className="text-sm text-gray-600">This answers the question: <em>Out of all the items the model claimed were positive, how many were actually positive?</em> It is calculated as <code className="font-mono bg-gray-100 px-1 rounded">TP / (TP + FP)</code>.</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-xl">
                  <strong className="text-black block mb-1">Recall:</strong>
                  <p className="text-sm text-gray-600">This answers: <em>Out of all the truly positive samples in the real world, how many did our model successfully find?</em> It is calculated as <code className="font-mono bg-gray-100 px-1 rounded">TP / (TP + FN)</code>.</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-xl">
                  <strong className="text-black block mb-1">Sensitivity:</strong>
                  <p className="text-sm text-gray-600">This is another term for the True Positive recognition rate, measuring how well the model identifies the positive class (<code className="font-mono bg-gray-100 px-1 rounded">TP / P</code>).</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-xl">
                  <strong className="text-black block mb-1">Specificity:</strong>
                  <p className="text-sm text-gray-600">This is the True Negative recognition rate, measuring how flawlessly your model identifies the negative class (<code className="font-mono bg-gray-100 px-1 rounded">TN / N</code>).</p>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                  <strong className="text-black block mb-1">F1-Score (F-measure):</strong>
                  <p className="text-sm text-gray-700">Often, Precision and Recall are at odds with each other. The F1-Score acts as the ultimate balancing metric by calculating the <em>harmonic mean</em> of precision and recall. Its strict mathematical formula is <code className="font-mono bg-white border border-gray-200 px-1 rounded">2 × (Precision × Recall) / (Precision + Recall)</code>.</p>
                </div>
             </div>
          </div>

          <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
             <div className="bg-gray-800 text-white p-6">
                <h3 className="text-2xl font-bold">3. Clustering Metrics (Evaluating Unsupervised Groupings)</h3>
                <p className="text-gray-300 mt-2">In unsupervised models like K-Means, we do not have an "answer key" (no actual labels) to compare our predictions against. Therefore, we evaluate the geometric structure of the clusters themselves:</p>
             </div>
             <div className="p-6 space-y-4 bg-white text-sm">
                <div className="border-l-4 border-gray-400 pl-4 py-2">
                  <strong className="text-black block mb-1 text-base">Davies-Bouldin Index:</strong>
                  <p className="text-gray-600">This measures the average similarity between each cluster and its most similar neighboring cluster. "Similarity" here is defined as the ratio of within-cluster distances to between-cluster distances. A score of zero is the absolute minimum; <em>lower</em> values indicate much better grouping because it means the clusters are tightly packed and physically further apart from each other.</p>
                </div>
                <div className="border-l-4 border-gray-400 pl-4 py-2">
                  <strong className="text-black block mb-1 text-base">Dunn Index:</strong>
                  <p className="text-gray-600">This calculates the ratio of the minimum inter-cluster distance (the distance between different clusters) to the maximum intra-cluster distance (the spread within a single cluster). It is the ultimate measure of cluster compactness and separation.</p>
                </div>
                <div className="border-l-4 border-gray-400 pl-4 py-2">
                  <strong className="text-black block mb-1 text-base">Silhouette Score:</strong>
                  <p className="text-gray-600">This measures exactly how similar a data point is to its own assigned cluster compared to other clusters. The value strictly ranges from -1 to +1. A score close to +1 means the point is perfectly clustered, 0 indicates dangerous cluster overlap, and -1 indicates the point has been completely misclassified into the wrong group.</p>
                </div>
                <div className="border-l-4 border-gray-400 pl-4 py-2">
                  <strong className="text-black block mb-1 text-base">Inertia (Sum of Squared Errors):</strong>
                  <p className="text-gray-600">This measures the sum of the squared distances between each individual data point and its assigned cluster centroid, strictly evaluating the internal compactness of your clusters.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    )
  }
];

// --- DATA CONTENT FROM DMV UNIT 4 ---
const unit4Modules = [
  {
    id: 'u4m1',
    title: '1. Storytelling with Data',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Storytelling with Data</h2>
          <p className="mb-4">Advanced Data Visualization and mastering this is what separates a standard coder from an elite data architect. Data alone is not enough; you must build a narrative to influence your audience.</p>
          <div className="bg-black text-white p-6 rounded-2xl shadow-xl mt-6">
            <p className="text-sm leading-relaxed">Data storytelling is the structured, narrative approach to communicating insights from data, combining compelling visuals with a clear, engaging storyline to make complex data understandable and actionable. It goes far beyond simply displaying graphs; it provides crucial context, reveals trends, and highlights the "why" behind the numbers.</p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-6 text-black">1. The Key Elements of Data Storytelling</h3>
          <p className="mb-6">To build a compelling narrative, you must perfectly balance four intersecting elements:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
               <strong className="text-black text-lg block mb-2 border-b border-gray-200 pb-2">Data (The Foundation)</strong>
               <p className="text-sm text-gray-600">Without solid, accurate, and relevant data, your story loses all credibility. Your raw facts and figures must be rigorously cleaned and processed before they can form the foundation of your narrative.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
               <strong className="text-black text-lg block mb-2 border-b border-gray-200 pb-2">Visuals (The Lens)</strong>
               <p className="text-sm text-gray-600">Visuals, such as charts and dashboards, make complex data easily digestible. They highlight hidden patterns, trends, and outliers that would otherwise remain buried in a spreadsheet.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
               <strong className="text-black text-lg block mb-2 border-b border-gray-200 pb-2">Narrative (The "Why")</strong>
               <p className="text-sm text-gray-600">The story provides the necessary context. It uses the data to explain exactly what happened, why it matters, and what the business should do next (the call to action). A strong narrative shapes your information into a story that informs and influences the viewer.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
               <strong className="text-black text-lg block mb-2 border-b border-gray-200 pb-2">Audience (The Target)</strong>
               <p className="text-sm text-gray-600">You must tailor your presentation to guide audience understanding and connect insights with a real-world context. For example, executives need the "big picture," while engineers demand to know the exact "how".</p>
            </div>
          </div>
          <div className="mt-6 p-5 border-l-4 border-black bg-gray-50">
             <strong className="text-black block mb-1">The Intersection:</strong>
             <p className="text-sm">When you successfully combine narrative, visuals, and data, you simplify complicated information so your audience can engage with your content. Pairing emotion with hard evidence helps your audience understand the impact and make highly confident decisions.</p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">2. The Importance of a Strong Data Story</h3>
          <p className="mb-4">Why must a top-tier data scientist master this?</p>
          <ul className="space-y-3">
             <li className="flex items-start gap-3">
               <CheckCircle2 size={18} className="text-black mt-0.5 flex-shrink-0" />
               <span className="text-sm text-gray-700">It simplifies complexity and makes intricate data easy to understand for non-technical stakeholders.</span>
             </li>
             <li className="flex items-start gap-3">
               <CheckCircle2 size={18} className="text-black mt-0.5 flex-shrink-0" />
               <span className="text-sm text-gray-700">It adds a vital human touch and contextual relevance to raw, cold numbers.</span>
             </li>
             <li className="flex items-start gap-3">
               <CheckCircle2 size={18} className="text-black mt-0.5 flex-shrink-0" />
               <span className="text-sm text-gray-700">It dramatically speeds up decision-making and supports core business strategies by communicating actionable insights clearly.</span>
             </li>
          </ul>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-6 text-black">3. The 5 Strict Steps to Visual Data Storytelling</h3>
          <p className="mb-6">You must memorize this exact professional workflow, my student:</p>
          <div className="space-y-6 relative">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200 hidden md:block"></div>
            
            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">1</div>
              <h4 className="text-lg font-bold text-black mb-2">Identify Your Story (Define Objective)</h4>
              <p className="text-sm text-gray-600">Before analyzing any data, define the core message or the "why" behind your research. You must identify the specific question you are trying to answer, define your ultimate goal, and establish a narrative structure with a clear beginning (context), middle (data insights), and end (actionable advice).</p>
            </div>
            
            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">2</div>
              <h4 className="text-lg font-bold text-black mb-2">Collect & Prepare Data</h4>
              <p className="text-sm text-gray-600">Gather the necessary data from reliable sources like internal databases or external reports. You must rigorously clean the data by removing errors and duplicates to ensure absolute reliability. Crucially, you must look at the whole picture and filter irrelevant information without "cherry-picking" data just to support a predetermined theory.</p>
            </div>

            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">3</div>
              <h4 className="text-lg font-bold text-black mb-2">Beware of Your Audience</h4>
              <p className="text-sm text-gray-600">Tailor your story entirely to the needs and expertise of your viewers. Identify your stakeholders, gauge their specific data literacy to determine how complex your charts can be, and focus your narrative strictly around the pain points they care about most.</p>
            </div>

            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">4</div>
              <h4 className="text-lg font-bold text-black mb-2">Transform Data into Visualization</h4>
              <p className="text-sm text-gray-600">Select the absolute best visual representation to convey your insights efficiently. Use line charts for trends, bar charts for comparisons, and scatter plots for correlations. You must highlight key elements using color and size, and ruthlessly declutter your charts by removing unnecessary grids, 3D effects, and excessive colors.</p>
            </div>

            <div className="relative z-10 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm md:ml-12">
              <div className="absolute -left-12 top-6 w-6 h-6 bg-black text-white rounded-full hidden md:flex items-center justify-center text-xs font-bold ring-4 ring-white">5</div>
              <h4 className="text-lg font-bold text-black mb-2">Generate Insights & Narrate</h4>
              <p className="text-sm text-gray-600">Finally, do not just show a chart; explain the real-world context and the "why" behind the visualization. Provide a strict "So What?" by concluding with highly actionable recommendations based on your findings. Lastly, iterate and refine your presentation based on stakeholder feedback to ensure the story remains perfectly clear and compelling.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'u4m2',
    title: '2. Interactive & Dynamic Visualizations',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Interactive and Dynamic Visualizations</h2>
          <p className="mb-4">We will move beyond static charts and learn how to build systems where users can explore data in real-time. Let us rigorously dissect the four core architectural pillars of interactive systems so you can build flawless applications:</p>
        </div>

        <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="bg-black text-white p-6 md:p-8">
            <h3 className="text-2xl font-bold">1. Dashboards (The Command Center)</h3>
            <p className="text-gray-300 mt-2">A dashboard is a consolidated visual display of the most important information needed to achieve specific objectives, strictly arranged on a single screen.</p>
          </div>
          <div className="p-6 md:p-8 space-y-6 bg-white">
            <div>
              <strong className="text-black text-lg block mb-1">The Architecture:</strong>
              <p className="text-sm text-gray-600">Unlike standard reports that span multiple pages, a true dashboard is a single-page view. It combines various components like <strong>KPI Cards</strong> (to track the most critical business metrics like Total Sales or Profit in real time), <strong>Charts</strong> (like Bar or Line graphs), and <strong>Maps</strong> for regional analysis.</p>
            </div>
            <div>
              <strong className="text-black text-lg block mb-1">The Advantage:</strong>
              <p className="text-sm text-gray-600">Dashboards consolidate data from multiple different sources into a unified view, enabling executives to perform real-time monitoring and make incredibly fast decisions. Because they are highly interactive, a single well-designed dashboard can answer multiple business questions, completely eliminating the need to create dozens of separate, static reports.</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">2. Hierarchies & Drill-Downs (Managing Data Depth)</h3>
          <p className="mb-4 text-sm">If you try to show every single data point at once, your dashboard will become cluttered and unreadable. You must structure your data using Hierarchies.</p>
          <div className="space-y-4">
             <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
                <strong className="text-black block mb-2">Hierarchies:</strong>
                <p className="text-sm text-gray-600">This is a structured arrangement of data into multiple logical levels. For example, a Time Hierarchy moves strictly from <code className="font-mono px-1">Year → Quarter → Month → Day</code>, and a Location Hierarchy moves from <code className="font-mono px-1">Country → State → City</code>. This keeps dashboards clean by showing highly aggregated, summary information first.</p>
             </div>
             <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
                <strong className="text-black block mb-2">Drill-Downs:</strong>
                <p className="text-sm text-gray-600">This is the interactive feature that makes hierarchies powerful. It allows a user to click on a summary data point and dive directly into the granular details. For instance, if an executive clicks on the "2024" bar in a chart, the visual instantly drill-downs to reveal the individual monthly sales for that specific year. You can also use <strong>Drill-Up</strong> to reverse the action and return to the summary view.</p>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">3. Filters & Slicers (Targeting Specific Insights)</h3>
          <p className="mb-4 text-sm">You must give your users the power to isolate specific scenarios without permanently altering your underlying dataset. We do this using two specific controls:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="border border-gray-200 p-5 rounded-xl">
                <strong className="text-black block mb-2 border-b pb-2">Slicers (The Canvas Tools):</strong>
                <p className="text-sm text-gray-600 mt-2">Slicers are interactive visual controls placed directly on the report canvas. They provide a highly user-friendly way for non-technical users to filter data (like selecting a specific region or time period) without needing to open hidden menus. You can format them as dropdowns, interactive buttons, or sliding scales for continuous dates.</p>
             </div>
             <div className="border border-gray-200 p-5 rounded-xl">
                <strong className="text-black block mb-2 border-b pb-2">Filters (The Backend Logic):</strong>
                <p className="text-sm text-gray-600 mt-2">Filters operate to explicitly control what data is shown across the visuals. As the architect, you will apply <strong>Basic Filtering</strong> (selecting checkboxes from a list), <strong>Advanced Filtering</strong> (applying strict mathematical conditions, such as only showing sales "greater than $10,000"), and <strong>TOP N Filtering</strong> (restricting the visual to only show the absolute highest or lowest performers, such as the Top 3 Regions).</p>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">4. Animations (Visualizing Change)</h3>
          <p className="mb-4 text-sm">Animations bring your data to life by applying visual transitions and dynamic effects that show exactly how data changes over time or responds to user interaction.</p>
          <ul className="space-y-4">
             <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
               <strong className="text-black block mb-1">Time-Based Animations:</strong>
               <p className="text-sm text-gray-600">By using a custom visual like a "Play Axis", you can add a play button to your dashboard that automatically animates a chart's growth from, for example, 2020 to 2025.</p>
             </li>
             <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
               <strong className="text-black block mb-1">Cross-Filtering Animations:</strong>
               <p className="text-sm text-gray-600">When a user clicks on one specific chart (like selecting "Electronics" in a pie chart), all other charts on the dashboard dynamically animate and update to show only the data related to Electronics.</p>
             </li>
          </ul>
          <div className="mt-4 p-4 border-l-4 border-black">
             <strong className="text-black block mb-1">The Purpose:</strong>
             <p className="text-sm text-gray-600">These smooth transitions do more than just look impressive; they improve the audience's understanding of data flow, highlight trends over time, and massively enhance user engagement.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'u4m3',
    title: '3. Geospatial Visualization',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Geospatial Visualization</h2>
          <p className="mb-4">You will learn to map complex datasets to physical, real-world locations to identify regional patterns.</p>
        </div>

        <div className="space-y-8">
           <div className="pt-6 border-t border-gray-100">
              <h3 className="text-2xl font-bold tracking-tight mb-3 text-black">1. Maps and Spatial Analysis</h3>
              <p className="text-sm text-gray-600 mb-3">Before we draw anything, we must understand the analytics behind it. Spatial analysis examines relationships, patterns, and trends in data with respect to its geographic location.</p>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-600">
                <li><strong className="text-black">The Techniques:</strong> As a data architect, you will use techniques like proximity analysis, clustering, interpolation, and density mapping to understand exactly how phenomena vary over physical space.</li>
                <li><strong className="text-black">The Business Application:</strong> In the business world, this analysis is crucial because it helps identify market potential, service coverage gaps, and specific risk zones.</li>
              </ul>
           </div>

           <div className="pt-6 border-t border-gray-100">
              <h3 className="text-2xl font-bold tracking-tight mb-3 text-black">2. Filled Maps & Choropleth Maps</h3>
              <p className="text-sm text-gray-600 mb-3">When you need to show aggregated values across distinct regions, you will use Choropleth (or filled) maps.</p>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-600">
                <li><strong className="text-black">The Architecture:</strong> These maps use shading, tinting, or patterns to display how a value differs in proportion across a specific geography. They shade geographic areas—like countries, states, or districts—based strictly on numerical values or categories.</li>
                <li><strong className="text-black">The Visual Engine:</strong> Color gradients represent magnitude; for example, darker colors indicate higher sales or greater frequency, while light colors indicate lower values.</li>
                <li><strong className="text-black">The Purpose:</strong> Crucially, choropleth maps show us how values change across defined geographical or political boundaries, rather than molding continuous areas according to value. They are incredibly intuitive for high-level comparisons across regions.</li>
              </ul>
           </div>

           <div className="pt-6 border-t border-gray-100">
              <h3 className="text-2xl font-bold tracking-tight mb-3 text-black">3. ArcGIS Maps</h3>
              <p className="text-sm text-gray-600 mb-3">When standard maps are not enough, a top-tier data scientist relies on ArcGIS for Power BI. This is an Esri visual that adds highly advanced geospatial capabilities well beyond standard maps.</p>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-600">
                <li><strong className="text-black">Advanced Features:</strong> It allows you to use custom basemaps (like satellite or street views), reference layers, demographic data, and complex spatial analysis tools like drive-time areas.</li>
                <li><strong className="text-black">Clustering:</strong> You can perform advanced clustering to group nearby points together, making it effortless to identify hotspots or underlying patterns in massively large point datasets.</li>
                <li><strong className="text-black">Integration:</strong> Its tight integration with ArcGIS Online lets you bring external geographic datasets directly into your dashboards for richer, real-world insight.</li>
              </ul>
           </div>

           <div className="pt-6 border-t border-gray-100">
              <h3 className="text-2xl font-bold tracking-tight mb-3 text-black">4. Heatmaps (Spatial)</h3>
              <p className="text-sm text-gray-600 mb-3">If you plot thousands of individual customers on a map, it becomes an unreadable mess. This is where you deploy a Heatmap.</p>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-600">
                <li><strong className="text-black">The Architecture:</strong> Heatmaps depict the density or intensity of spatial data using continuous color gradients.</li>
                <li><strong className="text-black">Hotspots:</strong> High-density areas appear in visually "warmer" colors, instantly drawing the viewer's attention to critical hotspots that may require immediate action.</li>
                <li><strong className="text-black">The Purpose:</strong> They are mathematically necessary when individual data points (such as crime incidents or customer visits) are too numerous to interpret on a standard point map. They support high-level decisions, such as where to open a new service location or increase security.</li>
              </ul>
           </div>

           <div className="pt-6 border-t border-gray-100 bg-black text-white p-6 rounded-2xl shadow-xl mt-6">
              <h3 className="text-2xl font-bold tracking-tight mb-3 text-white">5. 3D Maps</h3>
              <p className="text-sm text-gray-300 mb-4">Finally, to truly impress your stakeholders and add a new dimension to your data, you must understand 3D mapping. <strong>The Architecture:</strong> 3D visualizations utilize height, depth, and perspective to accurately display location-based data, density, magnitude, and trends over time.</p>
              <strong className="block mb-2 text-white border-b border-gray-700 pb-1">Core Types:</strong>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-400">
                <li><strong className="text-white">3D Column Maps:</strong> Vertical bars physically rise from the map to represent values (e.g., a higher bar equals higher sales in a specific city).</li>
                <li><strong className="text-white">3D Bubble Maps:</strong> Hovering bubbles represent magnitude, such as population density.</li>
                <li><strong className="text-white">3D Heatmaps:</strong> These use color to represent data density in a 3D space, making areas of high and low concentration easily identifiable for applications like tracking disease outbreak patterns or traffic congestion.</li>
              </ul>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 'u4m4',
    title: '4. Network Visualization & Case Studies',
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-4 text-black">Network Visualization</h2>
          <p className="mb-4">Finally, we will visualize complex many-to-many relationships that are impossible to see in standard tables.</p>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">1. Graph Theory Concepts: Nodes and Edges</h3>
          <p className="mb-4 text-sm">A network is fundamentally built on two core components: Nodes and Edges. Correctly defining these is essential because it determines exactly what patterns your analysis will reveal.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
                <strong className="text-black text-lg block mb-2 border-b pb-2">Nodes (The Entities)</strong>
                <p className="text-sm text-gray-600 mb-2">Nodes represent the individual entities within your network, such as people, computers, or bank accounts. In your visual layouts, nodes will typically appear as points, circles, or icons.</p>
                <div className="bg-black text-white p-3 rounded-lg text-xs italic">
                  <strong>Architectural Tip:</strong> You can encode deep information into nodes by changing their visual attributes. For example, you can change a node's size or color to represent its category or its mathematical importance.
                </div>
             </div>
             <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
                <strong className="text-black text-lg block mb-2 border-b pb-2">Edges (The Relationships)</strong>
                <p className="text-sm text-gray-600 mb-2">Edges are the connections linking your entities together, visually represented as lines or arrows.</p>
                <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                  <li><strong>Weighted Edges:</strong> Edges are not always equal. They can be "weighted" to carry critical additional information, such as the frequency of communication, the cost of a transaction, or the capacity of a network route. You can visually represent this by changing the thickness or style of the line.</li>
                  <li><strong>Network Integrity:</strong> You must understand the structural difference between the two: if you remove an edge, you only break one specific relationship, but if you remove a crucial node, you can disconnect entire sections of the network.</li>
                </ul>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-black">2. Centrality: Finding the "Hubs"</h3>
          <p className="mb-4 text-sm">Once you have mapped the nodes and edges, you must use pure mathematics to find the most powerful entities in the network. We do this using <strong>Centrality</strong>, which quantifies the exact importance or influence of a node based purely on its geometric position within the network. Nodes with high centrality act as the ultimate hubs, brokers, or authorities.</p>
          <div className="space-y-4">
             <div className="border border-gray-200 p-5 rounded-xl">
                <strong className="text-black text-lg block mb-1">A. Degree Centrality (The Immediate Hubs)</strong>
                <p className="text-sm text-gray-600 mb-2">This is the strict mathematical count of how many direct connections a node possesses. If you are analyzing a directed graph (where relationships have a specific direction), this is split into <em>indegree</em> (incoming edges) and <em>outdegree</em> (outgoing edges).</p>
                <p className="text-sm text-gray-500 italic bg-gray-50 p-2 rounded"><strong>Business Application:</strong> Nodes with high degree centrality are "immediate hubs" that can reach many other nodes quickly. In a company, this might be a highly connected key employee or a central call center. In fraud detection, a node with an unusually high or low degree can instantly flag suspicious behavior.</p>
             </div>
             <div className="border border-gray-200 p-5 rounded-xl">
                <strong className="text-black text-lg block mb-1">B. Betweenness Centrality (The Bridges)</strong>
                <p className="text-sm text-gray-600 mb-2">This is a highly advanced metric that measures exactly how often a specific node lies on the <em>shortest paths</em> between other pairs of nodes. Nodes with high betweenness act as critical "bridges" or "brokers." They control the flow of information between completely different, isolated groups in the network.</p>
                <p className="text-sm text-gray-500 italic bg-gray-50 p-2 rounded"><strong>Business Application:</strong> Because these nodes control the flow, removing them can completely fragment the network into disconnected pieces. In a fraud ring, these actors are essential to operation.</p>
             </div>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-100">
          <h3 className="text-3xl font-bold tracking-tight mb-6 text-black text-center">Real-Time Case Studies</h3>
          <p className="text-center mb-8 text-gray-600">Let us rigorously dissect how network visualization is applied in two critical real-time case studies.</p>

          <div className="space-y-8">
             <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-md">
                <div className="bg-red-600 text-white p-6">
                   <h4 className="text-xl font-bold">Case Study 1: Detecting Fraud Rings</h4>
                   <p className="text-red-100 text-sm mt-1">In the financial and cybersecurity sectors, fraudsters rarely act alone; they create sophisticated webs of deception. Standard relational databases often fail to catch them, but network visualization exposes their entire operation.</p>
                </div>
                <div className="p-6">
                   <ul className="space-y-3 text-sm text-gray-600">
                     <li><strong className="text-black">The Network Architecture:</strong> In this scenario, nodes represent entities like bank accounts or individuals, and the edges represent the financial transactions or intermediaries connecting them.</li>
                     <li><strong className="text-black">Spotting the Anomalies:</strong> By visualizing the network, you can instantly identify highly unusual geometric structures that indicate organized crime, such as tightly knit fraud rings, star-shaped transaction patterns, or long chains of "mule" accounts used to launder money.</li>
                     <li><strong className="text-black">Applying Centrality:</strong> We use our mathematical centrality measures (like degree and betweenness) to clearly distinguish normal, everyday users from suspicious actors who act as hubs or bridges for illegal funds.</li>
                     <li><strong className="text-black">Dynamic Tracking:</strong> Because fraud evolves, a top data scientist uses time-based filtering to watch exactly how fraudulent behavior spreads across the network over time.</li>
                     <li><strong className="text-black">The Ultimate Solution:</strong> By combining these visual network patterns with advanced machine learning models, institutions can drastically improve the early detection of fraudulent transactions before the money disappears.</li>
                   </ul>
                </div>
             </div>

             <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-md">
                <div className="bg-blue-600 text-white p-6">
                   <h4 className="text-xl font-bold">Case Study 2: Social Network Analysis (SNA)</h4>
                   <p className="text-blue-100 text-sm mt-1">Companies use network visualization to understand exactly how information, trends, and influence flow through platforms like Twitter, LinkedIn, or Facebook.</p>
                </div>
                <div className="p-6">
                   <ul className="space-y-3 text-sm text-gray-600">
                     <li><strong className="text-black">The Network Architecture:</strong> Here, the nodes represent individual people or user accounts, while the edges represent their social relationships, such as friendships, follows, or direct messages.</li>
                     <li><strong className="text-black">Mapping the Communities:</strong> The visual layout of the graph allows you to instantly see hidden social structures, including distinct clusters (tight communities), bridges connecting different groups, and isolated users who do not interact much.</li>
                     <li><strong className="text-black">Finding the True Influencers:</strong> This is where you apply Centrality! By calculating centrality measures, you can mathematically highlight the true influencers and brokers—the exact nodes that have the power to spread information or viral content most widely across the network.</li>
                     <li><strong className="text-black">Adding Context (Attribute Overlay):</strong> To take your analysis to the next level, you can overlay specific attributes—like user demographics or sentiment—directly onto the nodes. This allows you to deeply understand the characteristics and emotions of different social groups.</li>
                     <li><strong className="text-black">The Business Value:</strong> Armed with this network map, a company can design highly targeted marketing campaigns or plan strategic interventions within specific online communities, maximizing their return on investment.</li>
                   </ul>
                </div>
             </div>
             
             <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl mt-6 text-center">
                <h4 className="font-bold text-lg text-white mb-2">Bonus Application: Communication Networks</h4>
                <p className="text-sm text-gray-300">To further impress your examiners, you should also note that these exact same principles apply to IT and Communication Networks. By mapping devices and routers as nodes, network visualization reveals network topology, dangerous bottlenecks, and single points of failure. Applying centrality here reveals critical routers whose failure would severely crash the entire communication system.</p>
             </div>
          </div>
        </div>
      </div>
    )
  }
];

function DashboardScreen({ subject, onBack }) {
  // State to track which module is selected in the sidebar
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  const activeData = subject?.includes('Unit 4') 
    ? unit4Modules
    : subject?.includes('Unit 3') 
      ? unit3Modules 
      : subject?.includes('Unit 2') 
        ? unit2Modules 
        : dmvModules;

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
            {/* Dynamically render sidebar items based on activeData array */}
            {activeData.map((module, idx) => (
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
                <span>{subject?.split(':')[0] || 'Unit'}</span>
                <ChevronRight size={14} />
                <span>Fundamentals</span>
                <ChevronRight size={14} />
                <span className="text-black font-medium">{activeData[activeModuleIndex].title}</span>
            </div>

            {/* Dynamic Content Container */}
            <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-gray-100 shadow-sm">
               {activeData[activeModuleIndex].content}
            </div>

            {/* Progress / Completion Block at the bottom */}
            {activeModuleIndex === activeData.length - 1 && (
              <div className="bg-white border border-gray-100 rounded-[2rem] p-8 mt-12 flex flex-col md:flex-row items-center justify-between text-center md:text-left shadow-sm">
                <div className="flex items-center gap-6 flex-col md:flex-row">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-medium tracking-tight mb-1">{subject?.split(':')[0] || 'Unit'} Completed!</h2>
                    <p className="text-gray-500 text-sm">You have reviewed all modules in this chapter.</p>
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
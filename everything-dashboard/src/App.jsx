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
    { id: 1, title: 'Data Modeling and Visualization', category: 'Subject' },
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
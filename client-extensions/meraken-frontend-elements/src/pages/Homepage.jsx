import React, { useState } from "react";
import GenerativeAi from "./services/AiDataScience/GenerativeAi";
import AiSolutions from "./services/AiDataScience/AiSolutions";
import MachineLearning from "./services/AiDataScience/MachineLearning";
import BusinessIntelligence from "./services/AiDataScience/BusinessIntelligence";
import ComputerVision from "./services/AiDataScience/ComputerVision";
import DataAnnotation from "./services/AiDataScience/DataAnnotation";
import DataScience from "./services/AiDataScience/DataScience";
import NLP from "./services/AiDataScience/NLP";

function Homepage() {
  const [selectedComponent, setSelectedComponent] = useState("GenerativeAi");

  return (
    <div>
      <select
        value={selectedComponent}
        onChange={e => setSelectedComponent(e.target.value)}
        style={{ marginBottom: "1rem" }}
      >
        <option value="GenerativeAi">Generative AI</option>
        <option value="AiSolutions">AI Solutions</option>
        <option value="MachineLearning">Machine Learning</option>
        <option value="BusinessIntelligence">Business Intelligence</option>
        <option value="ComputerVision">Computer Vision</option>
        <option value="DataAnnotation">Data Annotation</option>
        <option value="DataScience">Data Science</option>
        <option value="NLP">NLP</option>
      </select>
      {selectedComponent === "GenerativeAi" && <GenerativeAi />}
      {selectedComponent === "AiSolutions" && <AiSolutions />}
      {selectedComponent === "MachineLearning" && <MachineLearning />}
      {selectedComponent === "BusinessIntelligence" && <BusinessIntelligence />}
      {selectedComponent === "ComputerVision" && <ComputerVision />}
      {selectedComponent === "DataAnnotation" && <DataAnnotation />}
      {selectedComponent === "DataScience" && <DataScience />}
      {selectedComponent === "NLP" && <NLP />}
    </div>
  );
}

export default Homepage;

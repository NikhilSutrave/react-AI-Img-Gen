import React from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: process.env.REACT_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '256x256',
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };

  return (
    <div className="main">
      {loading ? (
        <h2>
          Image generation in progress Please wait ... <span>😊</span>
        </h2>
      ) : (
        <></>
      )}
      <h1>React AI Image Generator</h1>

      <div className="body">
        <textarea
          cols="50"
          row="10"
          className="textarea"
          placeholder="Enter here to generate images..."
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="btndiv">
          <button className="button" onClick={generateImage}>
            Generator Image
          </button>
        </div>
        {result.length > 0 ? (
          <img className="image" src={result} alt="AI-Gen" />
        ) : (
          <></>
        )}
      </div>
      <p className="power">Powered by OpenAI</p>
    </div>
  );
}

export default App;


import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import WordList from './components/WordList';
import WordDetail from './components/WordDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<WordList />} />
          <Route path="/sign/:word" element={<WordDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

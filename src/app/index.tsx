import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Editor } from '../pages/editor';

function App() {
  return (
    <Routes>
      <Route path="/editor" element={<Editor />} />
      <Route path="*" element={<Navigate to="/editor" replace />} />
    </Routes>
  );
}

export default App;

import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard';
import { Jogo } from '../components/Jogo';

export const GlobalRoute: React.FC = () => (
  <Routes>
    <Route path="/" element={ < Dashboard /> } />
    <Route path="/categoria/:id" element={ < Jogo  />} />
  </Routes>
);

import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { Categorias } from '../components/Categorias';
import { Jogo } from '../components/Jogo';

export const GlobalRoute: React.FC = () => (
  <Routes>
    <Route path="/" element={ < Categorias /> } />
    <Route path="/categoria/:id" element={ < Jogo  />} />
  </Routes>
);

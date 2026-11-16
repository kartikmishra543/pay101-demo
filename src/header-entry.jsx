import React from 'react';
import {createRoot} from 'react-dom/client';
import Pay101Header from './Pay101Header.jsx';
import './header-scoped.css';
const target=document.getElementById('pay101-shared-header');if(target)createRoot(target).render(<Pay101Header/>);

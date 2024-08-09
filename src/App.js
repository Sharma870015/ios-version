import React, { useEffect, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { TodosProvider } from './components/TodosContext';
import './App.css';

// Use React.lazy to dynamically import components
const LoginPage = lazy(() => import('./components/LoginPage'));
const About = lazy(() => import('./components/About'));
const TodoList = lazy(() => import('./components/TodoList'));

const App = () => {
  useEffect(() => {
    // Register the service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then((registration) => {
            console.log('ServiceWorker registered with scope:', registration.scope);
          })
          .catch((error) => {
            console.error('ServiceWorker registration failed:', error);
          });
      });
    }
  }, []);

  return (
    <TodosProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="content">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/todos" element={<TodoList />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </TodosProvider>
  );
};

export default App;

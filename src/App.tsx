import React, { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { CoursesListPage } from './pages/admin/CoursesListPage';
import { SetupPage } from './pages/admin/SetupPage';
import { CourseFormPage } from './pages/admin/CourseFormPage';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple router implementation
  const renderPage = () => {
    if (currentPath === '/') {
      return <HomePage />;
    } else if (currentPath === '/cursos') {
      return <CoursesPage />;
    } else if (currentPath.startsWith('/curso/')) {
      return <CourseDetailPage />;
    } else if (currentPath === '/admin/login') {
      return <LoginPage />;
    } else if (currentPath === '/admin/setup') {
      return <SetupPage />;
    } else if (currentPath === '/admin') {
      return <DashboardPage />;
    } else if (currentPath === '/admin/courses') {
      return <CoursesListPage />;
    } else if (currentPath === '/admin/courses/new') {
      return <CourseFormPage />;
    } else if (currentPath.startsWith('/admin/courses/edit/')) {
      const courseId = currentPath.split('/').pop();
      return <CourseFormPage courseId={courseId} />;
    } else {
      return <HomePage />;
    }
  };

  return (
    <>
      {renderPage()}
    </>
  );
}

export default App;
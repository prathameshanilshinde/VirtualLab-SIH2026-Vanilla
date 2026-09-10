import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import {
  FacultyDashboard, FacultyPracticalsPage, LabsPage, LandingPage, LinkedListLabPage,
  LoginPage, StudentDashboard,
} from '@/pages/virtuallab-pages';
import NotFound from '@/pages/not-found';
import { ErrorBoundary } from '@/components/error-boundary';

const queryClient = new QueryClient();

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return <RoutedErrorBoundary>
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/student/dashboard" component={StudentDashboard} />
      <Route path="/student/labs" component={LabsPage} />
      <Route path="/student/lab/linked-list" component={LinkedListLabPage} />
      <Route path="/faculty/dashboard" component={FacultyDashboard} />
      <Route path="/faculty/practicals" component={FacultyPracticalsPage} />
      <Route component={NotFound} />
    </Switch>
  </RoutedErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter></QueryClientProvider>;
}

export default App;
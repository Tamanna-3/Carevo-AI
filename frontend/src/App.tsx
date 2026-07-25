import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Dashboard } from '@/pages/Dashboard';
import { ResumeAnalyzer } from '@/pages/ResumeAnalyzer';
import { JobAnalyzer } from '@/pages/JobAnalyzer';
import { AICareerAgent } from '@/pages/AICareerAgent';
import { CareerProgress } from '@/pages/CareerProgress';
import { Settings } from '@/pages/Settings';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/resume" component={ResumeAnalyzer} />
      <Route path="/jobs" component={JobAnalyzer} />
      <Route path="/agent" component={AICareerAgent} />
      <Route path="/progress" component={CareerProgress} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
export default App;

import { Switch, Route } from "wouter";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/lib/apollo";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import OrdersPage from "@/pages/orders";

function Router() {
  return (
    <Switch>
      <Route path="/" component={OrdersPage} />
    </Switch>
  );
}

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </ApolloProvider>
  );
}

export default App;

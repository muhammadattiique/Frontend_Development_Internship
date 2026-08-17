import React, { Component } from "react";
import { Card, CardHeader, CardContent } from "../task3/Card";
import Button from "../task3/Button";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log error telemetry or reporting services here
    console.error("[Error Boundary Caught]:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 max-w-xl mx-auto mt-10">
          <Card className="border-red-500/50 bg-red-950/10">
            <CardHeader
              title="Something went wrong on this page"
              description="An unexpected error occurred in this view. The rest of your application remains safe."
            />
            <CardContent className="space-y-4">
              <div className="bg-red-950/30 border border-red-900/50 p-3 rounded text-xs text-red-300 font-mono overflow-auto max-h-32">
                {this.state.error && this.state.error.toString()}
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="primary" onClick={this.handleReset}>
                  Reload Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

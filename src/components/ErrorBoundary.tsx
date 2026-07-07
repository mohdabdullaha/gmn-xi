"use client";
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary — catches render-phase errors in the React tree and shows
 * a user-friendly fallback instead of a blank white screen.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <App />
 *   </ErrorBoundary>
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // In production, replace with a real error reporter (Sentry, Datadog, etc.)
    console.error('[ErrorBoundary] Uncaught error:', error, info.componentStack);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8fafc',
            color: '#0a1d37',
            fontFamily: 'Segoe UI, Arial, sans-serif',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#64748b', maxWidth: '480px', marginBottom: '1.5rem' }}>
            An unexpected error occurred. Please try
            refreshing the page or clicking the button below.
          </p>
          {(import.meta as { env?: { DEV?: boolean } }).env?.DEV && this.state.error && (
            <pre
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1rem',
                fontSize: '0.75rem',
                color: '#ef4444',
                maxWidth: '600px',
                overflowX: 'auto',
                marginBottom: '1.5rem',
                textAlign: 'left',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            >
              {this.state.error.message}
              {'\n\n'}
              {this.state.error.stack}
            </pre>
          )}
          <button
            onClick={this.handleReset}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#0a1d37',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 10px 15px -3px rgba(10, 29, 55, 0.2)',
            }}
          >
            REFRESH VIEW
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

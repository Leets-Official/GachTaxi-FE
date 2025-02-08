import ErrorPage from '@/components/error';
import { ErrorBoundary } from 'react-error-boundary';

interface Props {
  children: React.ReactNode;
}

const ReactErrorBoundary: React.FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>
  );
};

export default ReactErrorBoundary;

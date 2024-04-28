import { Alert } from "react-bootstrap";

export const ErrorLoading = () => {
  return (
    <div className="error-component">
      <Alert variant="danger">
        <Alert.Heading>Oops! Something went wrong...</Alert.Heading>
        <p>Please try again later.</p>
      </Alert>
    </div>
  );
};

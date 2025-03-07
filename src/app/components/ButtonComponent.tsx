import Spinner from "react-bootstrap/Spinner";
export default function ButtonComponent(props: any) {
  return (
    <button
      disabled={props?.disabled}
      onClick={props?.action}
      className={`btn btn-blue ${props?.classes}`}
      type={props?.type}
    >
      {props.loading && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
      {props?.name}
    </button>
  );
}

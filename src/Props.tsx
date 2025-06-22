interface Props {
  name: string;
}

function Welcome(props: Props) {
  // Noncompliant: The component props are not read-only
  return <div>Hello {props.name}</div>;
}

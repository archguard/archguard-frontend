import ReactJson from "react-json-view";

export function JsonView(props: { data: any}) {
  return <ReactJson src={props.data} theme="monokai" collapsed={true}/>
}

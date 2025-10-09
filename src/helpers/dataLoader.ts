import {useLocation} from "react-router-dom";

export function loadData<T>(fn: ()=> T): [T, boolean] {
  const {state} = useLocation();
  if (state) {
    console.log("using existing state! ", state);
    return [state, true]
  }
  return [fn(), false];
}


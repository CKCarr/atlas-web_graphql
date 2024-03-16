import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { getProjectsQuery, addProjectMutation } from "../queries/queries";

import {
  useState,
  //useEffect
} from "react";

function AddProject(props) {
  const [inputsProject, setInputsProject] = useState({
    title: "",
    weight: 1,
    description: "",
  });

  const handleChange = (e) => {
    const newInputsProject = {
      ...inputsProject,
    };
    if (e.target.name === "weight")
      newInputsProject[e.target.name] = parseInt(e.target.value);
    else newInputsProject[e.target.name] = e.target.value;
    setInputsProject(newInputsProject);
  };

  return (
    <form
      className="project"
      id="add-project"
      /*onSubmit = {...}*/
    >
      <div className="field">
        <label> Project title: </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={inputsProject.title}
        />{" "}
      </div>
      <div className="field">
        <label> Weight: </label>
        <input
          type="number"
          name="weight"
          onChange={handleChange}
          value={inputsProject.weight}
        />{" "}
      </div>
      <div className="field">
        <label> description: </label>
        <textarea
          name="description"
          onChange={handleChange}
          value={inputsProject.description}
        />
      </div>
      <button> + </button>
    </form>
  );
}

export default compose(
  graphql(getProjectsQuery, { name: "getProjectsQuery" }),
  graphql(addProjectMutation, { name: "addProjectMutation" })
)(AddProject);

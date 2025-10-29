import type { ReactElement } from "react";

import React from "react";

import ResponsiveTextField from "@/components/ResponsiveTextfield";

type ProjectNameProps = {
  id?: number;
  defaultValue?: string;
};

function ProjectNameField(props: ProjectNameProps): ReactElement {
  const { id, defaultValue } = props;
  return (
    <ResponsiveTextField
      name={`projectName-${id}` as const}
      label="Project Name"
      defaultValue={defaultValue}
    />
  );
}

export default ProjectNameField;

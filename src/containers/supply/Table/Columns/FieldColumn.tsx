import type { ReactElement } from "react";

import React from "react";

import TextField from "@/components/ResponsiveTextfield";
import CareerLevel from "@/shared/Fields/CareerLevel";
import DatePicker from "@/shared/Fields/DatePicker";
import HeadCount from "@/shared/Fields/HeadCount";
import RoleFamily from "@/shared/Fields/RoleFamily";

type ProjectNameProps = {
  defaultValue: string;
  fieldName: string;
  id?: number;
  name?: string;
};

const components: Record<string, any> = {
  "career-level": CareerLevel,
  "role-family": RoleFamily,
  "date-picker": DatePicker,
  "head-count": HeadCount,
};

function FieldColumn(props: ProjectNameProps): ReactElement {
  const { name, fieldName = "", defaultValue = "" } = props;
  const Component = components[fieldName] ?? TextField;

  return (
    <Component name={name} defaultValue={defaultValue} />
  );
}

export default FieldColumn;

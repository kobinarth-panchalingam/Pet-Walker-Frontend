import { rankWith, uiTypeIs } from '@jsonforms/core';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms, JsonFormsInitStateProps, JsonFormsReactProps } from '@jsonforms/react';

import FileUploadControl from './FileUploadControl';

type JsonFormsProps = JsonFormsInitStateProps & JsonFormsReactProps;

export interface CustomJsonFormsProps extends Omit<JsonFormsProps, 'renderers' | 'cells'> {
}

const renderers = [
	...materialRenderers,
	{
		tester: rankWith( 3, uiTypeIs( 'FileUpload' ) ),
		renderer: ( props: any ) =>
			<FileUploadControl {...props} label={props.uischema.label} accept={props.uischema.accept} />
	}
];

const CustomJsonForms = ( { schema, uischema, data, readonly, onChange }: CustomJsonFormsProps ) => {
	return (
		<JsonForms
			renderers={renderers}
			cells={materialCells}
			readonly={readonly}
			schema={schema}
			uischema={uischema}
			data={data}
			onChange={onChange}
		/>
	);
};

export default CustomJsonForms;

import React from 'react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms, JsonFormsInitStateProps, JsonFormsReactProps } from '@jsonforms/react';

type JsonFormsProps = JsonFormsInitStateProps & JsonFormsReactProps;

interface CustomJsonFormsProps extends Omit<JsonFormsProps, 'renderers' | 'cells'> {}

const CustomJsonForms: React.FC<CustomJsonFormsProps> = ( { schema, uischema, data, onChange } ) => {
	return (
		<JsonForms
			schema={schema}
			uischema={uischema}
			data={data}
			onChange={onChange}
			renderers={materialRenderers}
			cells={materialCells}
		/>
	);
};

export { CustomJsonForms };

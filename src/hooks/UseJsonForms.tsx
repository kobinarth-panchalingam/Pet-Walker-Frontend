import { useState } from 'react';
import { rankWith, scopeEndsWith, uiTypeIs } from '@jsonforms/core';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms, JsonFormsInitStateProps, JsonFormsReactProps } from '@jsonforms/react';

import FileUploadControl from '../components/jsonforms/FileUploadControl';
type JsonFormsProps = JsonFormsInitStateProps & JsonFormsReactProps;

interface UseJsonFormsProps extends Omit<JsonFormsProps, 'renderers' | 'cells'> {}

interface OnChangeParams {
    errors: any[];
    data: any;
}

const renderers = [
	...materialRenderers,
	{
		tester: rankWith( 3, uiTypeIs( 'Control' ) && scopeEndsWith( 'file' ) ),
		renderer: ( props:any ) => <FileUploadControl {...props} label={props.uischema.label} accept={props.uischema.accept} />

	}
];

const useJsonForms = ( { schema, uischema, data, readonly }: UseJsonFormsProps ) => {
	const [ formData, setFormData ] = useState( data );
	const [ errors, setErrors ] = useState<any[]>( [] );
	const isFormValid = errors.length === 0;

	const onChange = ( { errors, data }: OnChangeParams ) => {
		setFormData( data );
		setErrors( errors );
	};

	const Form = <JsonForms
		schema={schema}
		uischema={uischema}
		data={formData}
		onChange={onChange}
		renderers={renderers}
		cells={materialCells}
		readonly={readonly}
	/>
;

	return  { Form, formData, errors, isFormValid };
};

export default useJsonForms;

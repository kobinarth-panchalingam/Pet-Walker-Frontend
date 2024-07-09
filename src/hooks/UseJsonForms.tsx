import { useState } from 'react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms, JsonFormsInitStateProps, JsonFormsReactProps } from '@jsonforms/react';

type JsonFormsProps = JsonFormsInitStateProps & JsonFormsReactProps;

interface UseJsonFormsProps extends Omit<JsonFormsProps, 'renderers' | 'cells'> {}

interface OnChangeParams {
    errors: any[];
    data: any;
}

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
		renderers={materialRenderers}
		cells={materialCells}
		readonly={readonly}
	/>
;

	return  { Form, formData, errors, isFormValid };
};

export default useJsonForms;

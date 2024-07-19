import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { ErrorObject } from 'ajv';

import { CustomJsonForms, CustomJsonFormsProps } from '../jsonforms/CustomJsonForms';
interface FormProps extends CustomJsonFormsProps{
	handleSubmit: ( data: any ) => void;
	isLoading?: boolean;
}

const Form = ( { schema, uischema, data, readonly, handleSubmit, isLoading }: FormProps ) => {
	const [ errors, setErrors ] = useState<ErrorObject []>( [] );
	const [ formData, setFormData ] = useState( data );
	const isFormDirty = useMemo( () => JSON.stringify( data ) !== JSON.stringify( formData ), [ data, formData ] );

	const onChange = ( { data, errors }:any ) => {
		setFormData( data );
		setErrors( errors );
	};

	const onSubmit = ( event: React.FormEvent ) => {
		event.preventDefault();
		if ( errors.length ) {
			toast.error( errors[0].message );
			return;
		}
		handleSubmit( formData );
	};

	return (
		<>
			<form className='w-100' onSubmit={onSubmit}>
				<CustomJsonForms schema={schema} uischema={uischema} data={formData} readonly={readonly} onChange={onChange} />
				<div className="d-flex justify-content-end gap-2 mt-2 mb-4">
					<button type="submit" className={'btn btn-primary mobile-full-width'} disabled={isLoading || !isFormDirty}>
						{isLoading ? 'Saving...' : 'Save & Continue'}
					</button>
				</div>
			</form>
		</>

	);
};

export { Form };


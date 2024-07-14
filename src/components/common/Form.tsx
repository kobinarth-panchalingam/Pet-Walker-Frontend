import { useState } from 'react';

import CustomJsonForms, { CustomJsonFormsProps } from '../jsonforms/CustomJsonForms';
interface FormProps extends CustomJsonFormsProps{
	handleSubmit: ( data: any ) => void;
	isLoading?: boolean;
}

const Form = ( { schema, uischema, data, readonly, handleSubmit, isLoading }: FormProps ) => {
	const [ formData, setFormData ] = useState( data );
	const [ isFormValid, setIsFormValid ] = useState( true );

	const onChange = ( { data, errors }:any ) => {
		setFormData( data );
		setIsFormValid( errors.length === 0 );
	};

	const onSubmit = ( event: React.FormEvent ) => {
		event.preventDefault();
		handleSubmit( formData );
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<CustomJsonForms schema={schema} uischema={uischema} data={formData} readonly={readonly} onChange={onChange} />
				<div className="d-flex justify-content-end gap-2 mt-2 mb-4">
					<button type="submit" className={'btn btn-primary'} disabled={!isFormValid || isLoading}>
						{isLoading ? 'Loading...' : 'Save & Continue'}
					</button>
				</div>
			</form>
		</>

	);
};

export { Form };


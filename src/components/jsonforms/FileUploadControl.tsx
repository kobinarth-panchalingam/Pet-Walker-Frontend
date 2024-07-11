import React, { useRef } from 'react';
import { ControlProps } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { InputLabel } from '@mui/material';

interface FileUploadControlProps extends ControlProps {
    label: string;
}

const FileUploadControl = ( { data, handleChange, path, label }: FileUploadControlProps ) => {
	console.log( data );
	const fileInputRef = useRef<HTMLInputElement>( null );
	const onFileChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
		if ( event.target.files && event.target.files[0] ) {
			const reader = new FileReader();
			reader.onload = ( e: ProgressEvent<FileReader> ) => {
				if ( e.target?.result ) {
					handleChange( path, e.target.result );
				}
			};
			reader.readAsDataURL( event.target.files[0] );
		}
	};

	const onFrameClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className='d-flex flex-column align-items-center justify-content-center'>
			<InputLabel>{label}</InputLabel>
			<div onClick={onFrameClick} style={{
				border: '2px dashed #ccc',
				width: '200px',
				height: '200px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundImage: `url(${data})`,
				backgroundSize: 'cover',
				cursor: 'pointer',
				margin: '10px 0'
			}}>
				{!data && <span>Click to upload</span>}
			</div>
			<input
				ref={fileInputRef}
				type="file"
				hidden
				onChange={onFileChange}
			/>
		</div>
	);
};

export default withJsonFormsControlProps( FileUploadControl );
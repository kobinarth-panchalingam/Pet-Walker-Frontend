import React, { useRef } from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { InputLabel } from '@mui/material';

interface FileUploadControlProps{
	data: any;
	handleChange: ( path: string, value: any ) => void;
	path: string;
    label: string;
	accept?: string;
}

const FileUploadControl = ( { data, handleChange, path, label, accept }: FileUploadControlProps ) => {
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
		<div className='file-upload-container'>
			<InputLabel>{label}</InputLabel>
			<div onClick={onFrameClick}
				className='file-upload-frame mt-2'
				style={{ backgroundImage: `url(${data})` }}
			>
				{!data && <span>Click to upload</span>}
			</div>
			<input
				ref={fileInputRef}
				type="file"
				hidden
				accept={accept}
				onChange={onFileChange}
			/>
		</div>
	);
};

export default withJsonFormsControlProps( FileUploadControl );
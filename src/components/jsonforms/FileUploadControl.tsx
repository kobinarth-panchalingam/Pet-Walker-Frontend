import React, { useRef } from 'react';
import { ControlProps } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon
import { Button, InputLabel } from '@mui/material';

interface FileUploadControlProps extends ControlProps {
	data: any;
	handleChange: ( path: string, value: any ) => void;
	path: string;
	label: string;
	accept?: string;
}

const FileUploadControl: React.FC<FileUploadControlProps> = ( { data, handleChange, path, label, accept } ) => {
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

	const onRemovePhoto = () => {
		handleChange( path, '' );
	};

	return (
		<div className='file-upload-container'>
			<InputLabel>{label}</InputLabel>
			<div className='frame-container' style={{ position: 'relative' }}>
				<div onClick={onFrameClick}
					className='file-upload-frame mt-2'
					style={{ backgroundImage: `url(${data})`, cursor: 'pointer' }}
				>
					{!data && <span>Click to upload</span>}
				</div>
				{data &&
					<Button onClick={onRemovePhoto} variant="contained" color="secondary" size="small"
						style={{
							position: 'absolute',
							bottom: '10px',
							right: '10px',
							opacity: 1,
							transition: 'opacity 0.3s'
						}}
						className="remove-photo-button"
					>
						<DeleteIcon />
					</Button>
				}
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

export default withJsonFormsControlProps( FileUploadControl as React.FC<ControlProps> );
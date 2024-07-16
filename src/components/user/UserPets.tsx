import { useNavigate } from 'react-router-dom';
import { PETS } from '@constants/routes';
import { AddCircleOutline } from '@mui/icons-material';

import dogProfile from '../../assets/images/dog-profile.svg';

const UserPets:React.FC = ( ) => {
	const navigate = useNavigate();
	const pets = [
		{ id: 1, name: 'Puppy', profilePhoto: 'https://via.placeholder.com/150' }
	];
	const handleAddPetClick = () => {
		navigate( `${PETS}/1` );
	};

	return (
		<div className="container px-0 py-3">
			<div className="row">
				<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
					<div className="card ">
						<img src={dogProfile} className="card-img-top" alt={'dogProfile'} />
						<div className="card-body border-top">
							<h5 className="card-title" style={{ cursor: 'pointer' }} onClick={handleAddPetClick}>
								<AddCircleOutline /> &nbsp; Add New Pet
							</h5>
						</div>
					</div>
				</div>
				{pets.map( ( pet ) =>
					<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={pet.id}>
						<div className="card">
							<img src={pet.profilePhoto} className="card-img-top" alt={pet.name} />
							<div className="card-body border-top">
								<h5 className="card-title">{pet.name}</h5>
							</div>
						</div>
					</div>
				)}

			</div>
		</div>
	);
};

export { UserPets };

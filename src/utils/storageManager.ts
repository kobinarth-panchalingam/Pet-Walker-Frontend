interface IStorage {
    setItem: ( key: string, value: any ) => void;
    getItem: ( key: string ) => any;
    removeItem: ( key: string ) => void;
    clear: () => void;
  }

class SessionStorage implements IStorage {
	setItem( key: string, value: any ) {
		window.sessionStorage.setItem( key, JSON.stringify( value ) );
	}

	getItem( key: string ) {
		const item = window.sessionStorage.getItem( key );
		return item ? JSON.parse( item ) : null;
	}

	removeItem( key: string ) {
		window.sessionStorage.removeItem( key );
	}

	clear() {
		window.sessionStorage.clear();
	}
}

class LocalStorage implements IStorage {
	setItem( key: string, value: any ) {
		window.localStorage.setItem( key, JSON.stringify( value ) );
	}

	getItem( key: string ) {
		const item = window.localStorage.getItem( key );
		return item ? JSON.parse( item ) : null;
	}

	removeItem( key: string ) {
		window.localStorage.removeItem( key );
	}

	clear() {
		window.localStorage.clear();
	}
}

class StorageManager {
	storage: IStorage;

	constructor( storage: IStorage ) {
		this.storage = storage;
	}

	setItem( key: string, value: any ) {
		this.storage.setItem( key, value );
	}

	getItem( key: string ) {
		return this.storage.getItem( key );
	}

	removeItem( key: string ) {
		this.storage.removeItem( key );
	}

	clear() {
		this.storage.clear();
	}

	switchStorage( storage: IStorage ) {
		this.storage = storage;
	}
}

export { StorageManager, SessionStorage, LocalStorage };
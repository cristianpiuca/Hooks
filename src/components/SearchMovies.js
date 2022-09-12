import React from 'react';
import { useState, useEffect } from 'react'

// import noPoster from '../assets/images/no-poster.jpg';

function SearchMovies(){

	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetch(`http://www.omdbapi.com/?s=action&apikey=${apiKey}`)
			.then(response => response.json())
			.then(data => {
				console.log(data.Search);
				setMovies(data.Search)
			})
			.catch(error => console.log(error))
	}, [])

	useEffect(() => {
		console.log('%cse actualizó', 'color: salmon');
	},[movies])

		// Credenciales de API
		const apiKey = 'e13ba5f'; // Intenta poner cualquier cosa antes para probar

		let keyword = '';

	const buscarPeliculas = async (e) => {
		e.preventDefault();
		try {
			keyword = e.target.nuevaBusqueda.value
			const response = await fetch(`http://www.omdbapi.com/?s=${keyword}&apikey=${apiKey}`)
			const data = await response.json()
			if(data.Search === undefined){
				setMovies([])
			}else{
				setMovies(data.Search)
			}
			e.target.nuevaBusqueda.value = null

		} catch (error) {
			console.log(error)
		}
	}

	return(
		<div className="container-fluid">
			{
				apiKey !== '' ?
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form onSubmit={buscarPeliculas} method="GET">
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input name='nuevaBusqueda' type="text" className="form-control" />
								</div>
								<button className="btn btn-info" >Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							{/* <h2>Películas para la palabra: {keyword}</h2> */}
						</div>
						{/* Listado de películas */}
						{
							movies.length > 0 && movies.map((movie, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={movie.Poster}
														alt={movie.Title} 
														style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
													/>
												</div>
												<p>{movie.Year}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{ movies.length === 0  && <div className="alert alert-warning text-center">No se encontraron películas</div>}
				</>
				:
				<div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
			}
		</div>
	)
}

export default SearchMovies;

import axios from 'axios';
import { useEffect, useState } from 'react'
import Head from 'next/head';

export default function PV(){
	let [provinces, setProvinces] = useState([]),
	[circonscriptions, setCirconscription] = useState([]),
	[disabled,setDisabled] = useState(false),
	[data, setData] = useState(null);

	useEffect(()=>{
		axios.get('/api/province').then((response)=>{
			let payload = response.data;

			setProvinces(payload.data);
		}).catch((error)=>{
			alert("Erreur lors de la rechere des provinces");
			console.error(error);
		})
	},[true]);

	function handleProvinceChange(event){
		event.preventDefault();

		let target = event.target,
		province = target.selectedOptions[0].value;

		if(province){
			axios.get(`/api/circonscription?province=${province}`).then((response)=>{
				let payload = response.data;

				setCirconscription(payload.data);
			}).catch((error)=>{
				alert("Erreur lors de la recherche des circonscription");
				console.error(error);
			})
		}
	}

	function fetchData(event){
		event.preventDefault();

		let form = event.target,
		els = form.elements,
		province = els.province.value,
		cirDiv = els.cir,
		cir = (cirDiv)? cirDiv.value: null,
		cirOption, cirName;

		if(province && cir){
			cirOption = cirDiv.selectedOptions[0];
			cirName = cirOption.getAttribute('cirname');
			setDisabled(true);
			setData(null);

			axios.get(`/api/calcul?province=${province}&cir=${cir}&cirName=${cirName}`).then((response)=>{
				let payload = response.data;

				setData(payload);
			}).catch((error)=>{
				alert("FetchData error");
				console.error(error);
			}).finally(()=>{
				setDisabled(false);
			})
		}
		else{
			alert("Completer toute les valeurs");
		}
	}

	return <div className='text-center'>
		<div className='mb-3 text-black px-5 inline-block text-left'>
			<Head>
				<link rel='stylesheet' href='/css/layout.css' />
			</Head>
			<form className='mb-3' onSubmit={fetchData}>
				<select onChange={handleProvinceChange} name='province'>
					<option value=''>Selectionner une province</option>
					{provinces.map(({nom})=>{
						return <option key={nom} value={nom}>{nom}</option>
					})}
				</select>
				<select name='cir'>
					<option value=''>Selectionner une circonscription</option>
					{circonscriptions.map(({id,nom})=>{
						return <option key={id} cirname={nom} value={id}>{nom}</option>
					})}
				</select>

				<button disabled={disabled} type='submit'>Generer Pv</button>
				<div className='fixed right-0 w-40'>
					{(data)? Object.keys(data).map((link)=>{
						return <p><a href={`#${link}`}>{link}</a></p>
					}): null}
				</div>
			</form>
			{(data)? Object.keys(data).map((domain)=>{
				let current = data[domain];
				return <div className='bg-white p-4'>
					<p className='text-end text-info'><a className='invisible' name={domain}>{domain}</a></p>
					<HeadRef refe={current.headRef} />
					<HeadRef refe={current.headSum} />
					<Label domain={domain} />
					<Voix candidats={current.candidats} />
				</div>
			}): null}
		</div>
	</div>
}

function HeadRef({refe}){
	return <div className='mb-4'>
		{Object.keys(refe).map((r)=>{
			return <div className='' key={r}>
				<span className='font-medium  capitalize mr-2'>{r}: </span>
				<span className='capitalize'>{refe[r]}</span>
			</div>
		})}
	</div>
}

function Label({domain}){
	return <div className='text-center mb-3'>
		<p className='font-medium'>FICHE DES RESULATS</p>
		<p className='font-medium'>Elections Législatives <span>{domain}</span></p>
		<p className='font-medium'>{(new Date()).getFullYear()}</p>
	</div>
}

function Voix({candidats}){
	return <div>
		<table>
			<thead>
				<tr className=''>
					<th className='border-t border-b text-center px-3'>No.</th>
					<th className=' border-t border-b text-center'>Organisations</th>
					<th className='border-t border-b text-center'>Candidats</th>
					<th className='border-t border-b text-center px-3 border-r border-dashed'>Voix</th>
					<th>Voix urne</th>
				</tr>
			</thead>
			<tbody>
				{candidats.map(({id,noms,numero,voix,org='Dataxell'})=>{
					return <tr className='text-center border-b border-dashed' key={id}>
						<td>{numero}</td>
						<td>{org}</td>
						<td>{noms}</td>
						<td className='border-r border-dashed'>{voix}</td>
						<td></td>
					</tr>
				})}
			</tbody>
		</table>
	</div>
}
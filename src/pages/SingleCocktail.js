import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);
  
  const getCocktail = async ()=>{
    const response = await fetch(`${url}${id}`);
    const data = await response.json();
    
    if(data.drinks){
      const {
        strDrink:name, 
        strDrinkThumb:image,
        strAlcoholic:info, 
        strCategory:category, 
        strGlass:glass, 
        strInstructions:instructions, 
        strIngredient1: ingredient
      } = data.drinks[0];
      const ingredients = [
        ingredient
      ]

      const newCocktails = {
        name,
        image,
        info,
        category,
        glass,
        instructions,
        ingredients
      }
      console.log(newCocktails);
      setCocktail(newCocktails);
    }else{
      setCocktail(null)
    }

  }
  React.useEffect(()=>{
    setLoading(true);
    getCocktail()
    setLoading(false);
  },[id])
  if(loading){
    return <Loading />
  }
  if(!cocktail){
    return <h2 className='section-title'>no cocktail to display</h2>
  }
  const {name, image, category, info, glass, instructions, ingredients} = cocktail;
  return (
    <section className='section cocktail-section'>
      <Link to="/" className='btn btn-primary'>
        back home
      </Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={image} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drunk-data'>name :</span>
            {name}
          </p>
          <p>
            <span className='drunk-data'>category :</span>
            {category}
          </p>
          <p>
            <span className='drunk-data'>info :</span>
            {info}
          </p>
          <p>
            <span className='drunk-data'>glass :</span>
            {glass}
          </p>
          <p>
            <span className='drunk-data'>instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail

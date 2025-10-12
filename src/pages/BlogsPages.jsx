import React from 'react'
import ArticuloBlogsComponent from '../components/ArticuloBlogsComponent'
import HeaderComponents from '../components/HeaderComponents'
import FooterComponent from '../components/FooterComponent'

function BlogsPages() {
  return (
    <>
      <HeaderComponents/>

      <h1 className="text-center my-4">
        Noticias Importantes
      </h1>
      
      <ArticuloBlogsComponent 
      tituloBlog='La Torta Más Grande del Mundo: Un Hito para 1000 Sabores' 
      descripcionBlog='Recordando un momento histórico, Pastelería 1000 Sabores fue clave en la creación de la torta más grande del mundo en 1995, un récord Guinness. Este logro subraya su innovación y maestría en la repostería. Este espíritu pionero impulsa ahora su visión de liderar el mercado online chileno, ofreciendo dulces experiencias a todos sus clientes.' 
      fotoBlog='./src/assets/react.svg'
      />
      <ArticuloBlogsComponent 
      tituloBlog='Pastelero Viñamarino Triunfa en Concurso Internacional con Torta Cuadrada de Frutas'
      descripcionBlog='Ricardo Morales, un talentoso pastelero de Viña del Mar, se llevó el máximo galardón en el prestigioso Concurso Mundial de Repostería celebrado en París. Su innovadora "Torta Cuadrada de Frutas", que combina bizcocho de vainilla, frutas frescas y crema chantilly, cautivó al jurado por su frescura y equilibrio. Esta creación es, de hecho, una de las tortas más vendidas de la página web de Pastelería 1000 Sabores. Morales, de 35 años, dedicó su victoria a la inspiración de los sabores costeros de su ciudad natal."'
      fotoBlog='./src/assets/react.svg'
      />
      <ArticuloBlogsComponent 
      tituloBlog='¿Un Pastel Podría Impulsar Tu Creatividad?'
      descripcionBlog='Un estudio de la Universidad de Chile ha revelado una sorprendente conexión entre el consumo de postres y el aumento de la creatividad. La investigación sugiere que disfrutar de un dulce, como una torta, puede potenciar las áreas del cerebro relacionadas con el pensamiento lateral y la resolución de problemas. En Pastelería 1000 Sabores, siempre hemos sabido que nuestros postres alegran el espíritu, y ahora sabemos que también podrían inspirar la mente.'
      fotoBlog='./src/assets/react.svg'
      />
      <FooterComponent/>
    </>
  )
}

export default BlogsPages
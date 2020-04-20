import React, { Component } from 'react';
import './bootstrapStyle.min.css';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';

  class App extends Component {

    state = {
      termino : '',
      imagenes : [],
      pagina : ''
    }

    scroll = () => {
      const elemento = document.querySelector('.jumbotron');
      elemento.scrollIntoView('smooth', 'start');
    }

    paginaAnterior = () => {
      //leer state de pagina actual
      var pagina = this.state.pagina;
      if(pagina === 1) return null;
      //Sumar uno a la pagina actual
      pagina -= 1;

      //agregar el cambio de state
      this.setState({
        pagina
      }, () => {
        this.consultarAPI();
        this.scroll();
      });
    }

    paginaSiguiente = () => {
      //leer state de pagina actual
      var pagina = this.state.pagina;

      //Sumar uno a la pagina actual
      pagina += 1;

      //agregar el cambio de state
      this.setState({
        pagina
      }, () => {
        this.consultarAPI();
        this.scroll();
     });
    }

    consultarAPI = () => {
      const termino = this.state.termino;
      const pagina = this.state.pagina
      const url = `https://pixabay.com/api/?key=15784029-b1788ef67fc2b69e1146c9d66&q=${termino}&per_page=30&page=${pagina}`;
      
      fetch(url)
        .then(respuesta => respuesta.json() )
        .then(resultado => this.setState({ imagenes : resultado.hits}) )
    }
    
    datosBusqueda = (termino) => {
      this.setState({
        termino : termino,
        pagina : 1
      }, () => {
        this.consultarAPI();
      })
    }

    render(){
      return(
        <div className="app container">
          <div className="jumbotron">
            <p className="lead text-center">Buscador de Imágenes</p>

            <Buscador 
              datosBusqueda={this.datosBusqueda}
            />
          </div>
          <div className="row justify-content-center">
            <Resultado
              imagenes={this.state.imagenes}
              paginaAnterior={this.paginaAnterior}
              paginaSiguiente={this.paginaSiguiente}
            />
          </div>
        </div>
      );
    }
  }
export default App;

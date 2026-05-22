import Card from "./Card";
import Categories from "./Categories";
import Header from "./Header";
import Home from "./Home";
import NavBar from "./Navbar";
import Slideshow from "./Slideshow";

function App() {
    return (
      

     
      <>
      <Slideshow />
      <Header />
      <NavBar />
    
      

      <main> 

      <section id="home">
        <Home />
        
        
      </section>
      <section id="categories">
        <Categories />
        
      </section>
      <section id="card">
        <Card />
        
      </section>
      </main>
      
      </>

    );
  
}

export default App

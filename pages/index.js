import styles from '../styles/Home.module.css'
import React ,{Component} from 'react'
import  Layout from '../components/layout'


class Home extends Component{
  render(){ 
    return(
      <Layout>
          <div className="container">
          <header className="hero container-fluid border-bottom">
            <div className="hero__content container mx-auto">
              <div className="row px-0 mx-0 align-items-center">
                <div className="col-lg-6 px-0">
                  <h1 className="hero__title mb-3">
                    OUR PRODUCT IS <span className="highlight">BETTER</span> THAN OTHER
                  </h1>
                  <p className="hero__paragraph mb-5">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's
                    standard
                  </p>
                  <div className="hero__btns-container">
                    <a className="hero__btn btn btn-primary mb-2 mb-lg-0" href="#">
                      Get Free App
                    </a>
                    <a className="hero__btn btn btn-secondary mx-lg-3" href="#">
                      Go Premium
                    </a>
                  </div>
                </div>
                <div className="col-lg-5 mt-5 mt-lg-0 mx-0">
                  <div className="hero__img-container" >
                    <img src="/images/hero.svg" className="hero__img w-150" />
                  </div>
                </div>
              </div>
            </div>
            </header>
          </div>
      </Layout>
    );
  }
}

export default Home;

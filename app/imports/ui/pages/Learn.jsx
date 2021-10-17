import React from 'react';
import 'bootstrap/dist/css/bootstrap';

/** A simple static component to render some text for the landing page. */
class Learn extends React.Component {
  render() {
    const colStyle = { backgroundColor: '#ffd3b6' };
    const colStyle2 = { backgroundColor: '#a8e6cf' };
    const colStyle3 = { backgroundColor: '#dcedc1' };
    const colStyle4 = { backgroundColor: '#ffaaa5' };
    return (
      <div className="container-fluid">
        <div className="row pt-5 justify-content-center">
          <div className="col-lg-9 col-11 pb-5">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-12 mx-5 my-auto text-center">
                <img src="/images/pet-facts-1.png" className="img-responsive img-circle" />
              </div>
              <div className="col-lg-6 col-12 rounded mt-lg-0 mt-5 px-5 py-5" style={colStyle}>
                <h1 className="text-center">Pet Homelessness</h1>
                <hr className="text-center mb-3" />
                Approximately 6.3 million pets are put into U.S. animal shelters
                nationwide every year (ASPCA 2017). That is approximately 720 pets
                each hour. While numbers for animals accepted into shelters each
                year has seen a small decline, pet homelessness and euthanization
                is still an issue. Of the number of pets in the shelter, approximately
                65% are adopted. About 25% of dogs obtained as pets are sourced through
                shelters, and 31% of cats respectively. Many pets who are surrendered
                and overlooked for adoption have problematic behaviors.
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-11 pb-5">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-12 mx-5 my-auto text-center order-lg-2">
                <img src="/images/pet-facts-2.png" className="img-responsive img-circle" />
              </div>
              <div className="col-lg-6 col-12 rounded mt-lg-0 mt-5 px-5 py-5 order-lg-1" style={colStyle2}>
                <h1 className="text-center">Population Control</h1>
                <hr className="text-center mb-3" />
                With about 6.5 million animals arriving at U.S. shelters each year, shelters
                struggle to adopt out all pets -- resulting in otherwise adoptable cats and dogs
                being euthanized. Unplanned litters are often a contributer to such high intake
                numbers (ASPCA). Local shelters often offer spay and neuter programs to help
                prevent such measures, however, it is also the responsibility of pet owners to
                take initiative. For more information on population control, please contact your
                local animal shelter.
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-11 pb-5">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-12 mx-5 my-auto text-center">
                <img src="/images/pet-facts-3.png" className="img-responsive img-circle" />
              </div>
              <div className="col-lg-6 col-12 rounded mt-lg-0 mt-5 px-5 py-5" style={colStyle3}>
                <h1 className="text-center">Breed Discrimination</h1>
                <hr className="text-center mb-3" />
                Breed discrimination is a leading cause to many bull-type breeds being
                surrendered and euthanized in shelters all over the world. The Human Society of the United States
                (HSUS) has been working campaigns to lift breed specific laws in various states
                throughout the U.S. They believe that dogs should not be judged by the way he or she
                looks and how the animal behaves. There is a common misconception that bull type
                breeds are dangerous, and this belief has led to a large number of their population
                being euthanized in shelters each year. The HSUS, American Veterinary Medical Association to the
                U.S. Centers for Disease Control and Prevention, do not support breed-specific legislation.
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-11 pb-5">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-12 mx-5 my-auto text-center order-lg-2">
                <img src="/images/pet-facts-4.png" className="img-responsive img-circle" />
              </div>
              <div className="col-lg-6 col-12 rounded mt-lg-0 mt-5 px-5 py-5 order-lg-1" style={colStyle4}>
                <h1 className="text-center">The Solution</h1>
                <hr className="text-center mb-3" />
                The ASPCA identified key issues for what contributes to problematic behavior, including:
                economic issues, behavioral issues, and housing concerns. Many pet owners are unaware
                that most communities provide affordable veterinary services for eligible pet parents. When
                caring for a pet becomes costly, parents are forced to surrender their companions. Behavioral
                issues such as barking, pawing, jumping, energy and destruction are frustrating traits. And
                proper training by pet owners, or trained professionals should be utilized. Lack of awareness
                leads pet owners to surrender pets. Housing concerns such as breed or weight restrictions can
                hinder a pet parent`&apos;`s ability to keep a companion, this cannot be helped if options are limited
                or unavailable.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Learn;

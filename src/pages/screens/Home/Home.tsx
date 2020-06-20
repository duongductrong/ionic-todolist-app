import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSlides,
  IonSlide,
  IonButton,
  IonIcon,
} from "@ionic/react";
import React from "react";
import "./Home.css";

const Home: React.FC = () => {
  // console.log("Home");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer /> */}

        <IonSlides>
          <IonSlide>
            <div className="slide">
              <h1></h1>
              <h2>Welcome</h2>
              <p>
                The <b>ionic conference app</b> is a practical preview of the
                ionic framework in action, and a demonstration of proper code
                use.
              </p>
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Home;

import React from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
} from "@ionic/react";

import { settings, logOutOutline } from "ionicons/icons";

import JwtService from '../../../core/services/jwt/jwt.service';

import "./About.css";
import { useDispatch } from "react-redux";
import * as userActions from '../../../redux/actions/user.action';

const About: React.FC<any> = ({ ...props }) => {

  const dispatch = useDispatch();

  const onLogout = () => {
    JwtService.removeToken();
    dispatch(userActions.setLogout());
  };

  // console.log("About");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">About</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="about">
          <div className="about-cover"></div>

          <img
            className="about-avt"
            src="https://avatars1.githubusercontent.com/u/39333905?s=400&u=668a70d02d61891484e2298b91b7fc117fb601a9&v=4"
            alt=""
          />
        </div>

        <div className="about-profile">
          <IonTitle className="about-title" size="large">
            Dương Đức Trọng
          </IonTitle>

          <small className="about-title" style={{ marginTop: "8px" }}>
            <b>Github</b>: <i>github.com/duongductrong</i>
          </small>
          <small className="about-title" style={{ marginTop: "8px" }}>
            <b>Facebook</b>:<i> fb.com/trong.duong.77398</i>
          </small>
        </div>
      </IonContent>

      <IonFab vertical="top" horizontal="end" color="asdsad">
        <IonFabButton>
          <IonIcon icon={settings} />
        </IonFabButton>
        <IonFabList side="bottom">
          <IonFabButton onClick={onLogout}>
            <IonIcon icon={logOutOutline} />
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </IonPage>
  );
};

export default About;

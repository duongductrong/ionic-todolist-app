import React from "react";
import { connect, useSelector } from "react-redux";
import {
  withIonLifeCycle,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonItemDivider,
  IonButton,
  IonSpinner,
} from "@ionic/react";
import "./Login.css";
import { Redirect } from "react-router";

import JwtService from "../../../core/services/jwt/jwt.service";
import AuthenticateService from "../../../core/services/authenticate/authenticate.service";

// redux
import { RootState } from "../../../redux/reducers";
import { setLogin } from "../../../redux/actions/user.action";

interface InterfaceState {
  username: string | null | undefined;
  password: string | null | undefined;

  error: {
    username: string | null | undefined;
    password: string | null | undefined;
  };

  isLoading: boolean;
  isLogin: boolean | null | undefined;
}

class Login extends React.Component<any, InterfaceState> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLogin: false,

      error: {
        username: null,
        password: null,
      },

      isLoading: false,
    };

    this.onChangeValue = this.onChangeValue.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onChangeValue = (type: any) => {
    return (e: any) => {
      switch (type) {
        case "username":
          this.setState({
            username: e.detail.value,
          });
          break;

        case "password":
          this.setState({
            password: e.detail.value,
          });
          break;

        default:
      }
    };
  };

  onLogin(e: any): void {
    e.preventDefault();

    const { username, password } = this.state;

    // validates something
    if (!username || !password) {
      if (!username) {
        this.setState((prevState) => {
          return {
            error: {
              ...prevState.error,
              username: "Your username is blank",
            },
          };
        });
      } else {
        this.setState((prevState) => {
          return {
            error: {
              ...prevState.error,
              username: null,
            },
          };
        });
      }

      if (!password) {
        this.setState((prevState) => {
          return {
            error: {
              ...prevState.error,
              password: "Your password is blank",
            },
          };
        });
      } else {
        this.setState((prevState) => {
          return {
            error: {
              ...prevState.error,
              password: null,
            },
          };
        });
      }

      return;
    }

    this.setState({
      isLoading: true,
    });

    // fake call api login
    AuthenticateService.login({ username, password })
      .then((response) => {
        // oop! login successfully

        // dispatch to set authenticated state = true
        this.props.rxDispatchLogin({
          username: "",
        });

        // turn of loading and redirect to home
        this.setState({
          isLogin: true,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  ionViewWillLeave() {
    // clear value
    this.setState({
      isLogin: false,
      isLoading: false,
      username: "",
      password: "",
      error: {
        username: null,
        password: null,
      },
    });
  }

  render() {
    const { username, password, isLogin, error, isLoading } = this.state;

    return (
      <IonPage>
        {(isLogin || this.props.rxUser.isAuthenticated) && (
          <Redirect to="/home" />
        )}
        <IonHeader>
          <IonToolbar>
            <IonTitle style={{ textAlign: "center" }}>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle>Login</IonTitle>
            </IonToolbar>
          </IonHeader>
          <div className="container">
            <img
              className="logo"
              src="https://miro.medium.com/max/1000/1*Yafu7ihc1LFuP4azerAa4w.png"
              alt=""
            />

            <form onSubmit={this.onLogin} className="form">
              <IonItemDivider
                style={{ color: error.username ? "red" : "inherit" }}
                class="devider"
              >
                {error.username ? error.username : `The account name`}
              </IonItemDivider>
              <IonItem className="text-fields">
                <IonLabel position="stacked">Your username</IonLabel>
                <IonInput
                  placeholder="Your username"
                  value={username}
                  onIonChange={this.onChangeValue("username")}
                  required
                  disabled={isLoading}
                />
              </IonItem>

              <IonItemDivider
                style={{ color: error.password ? "red" : "inherit" }}
                class="devider"
              >
                {error.password ? error.password : `The account password`}
              </IonItemDivider>
              <IonItem className="text-fields">
                <IonLabel position="stacked">Your password</IonLabel>
                <IonInput
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onIonChange={this.onChangeValue("password")}
                  required
                  disabled={isLoading}
                />
              </IonItem>

              <IonButton
                type="submit"
                className="btn-login"
                disabled={isLoading}
              >
                {isLoading ? <IonSpinner name="crescent" /> : "Sign in"}
              </IonButton>
            </form>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  rxDispatchLogin: (data: any) => dispatch(setLogin(data)),
});

const mapStateToProps = (state: RootState) => ({
  rxUser: state.userReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withIonLifeCycle(Login));
